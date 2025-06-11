using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using ServicioJobs.Aplicacion;
using ServicioJobs.Dal;
using ServicioJobs.Middleware;
using Serilog;
using ServicioJobs.Aplicacion.Servicios.Wolker;
using Hangfire;

var builder = WebApplication.CreateBuilder(args);

ConfiguracionLogger.AgregarLogging(builder);

builder.Logging.AddConsole();

// Configuración de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:5173", "http://localhost:4173") // Puertos comunes de Vite/React
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

builder.Services.AddControllers(opcion =>
{
    var politica = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    opcion.Filters.Add(new AuthorizeFilter(politica));
}).AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddServicioDatos(builder.Configuration);
builder.Services.AddServicioAplicacion(builder.Configuration);
builder.Services.AddHangfireServer(); // <-- Agrega esto aquí
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Usar CORS antes de autorización
app.UseCors("AllowFrontend");

app.UseHangfireDashboard();
app.UseAuthorization();
app.UseSerilogRequestLogging();
app.MapControllers();
app.UseMiddleware<ValidationExceptionMiddleware>();

await app.AplicarMigracion();
await app.InicializarBaseDeDatosAsync();

using (var scope = app.Services.CreateScope())
{
    var jobExecutor = scope.ServiceProvider.GetRequiredService<JobExecutor>();
    RecurringJob.AddOrUpdate<JobExecutor>(
       "ejecutar-jobs-programados",
       x => x.EjecutarJobs(),
       "* * * * *"
   );
}

app.Run();
