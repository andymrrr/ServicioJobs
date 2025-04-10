using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using ServicioJobs.Aplicacion;
using ServicioJobs.Dal;
using ServicioJobs.Middleware;
using Serilog;

var builder = WebApplication.CreateBuilder(args);


ConfiguracionLogger.AgregarLogging(builder);

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
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.UseSerilogRequestLogging();
app.MapControllers();
app.UseMiddleware<ValidationExceptionMiddleware>();

app.Run();
