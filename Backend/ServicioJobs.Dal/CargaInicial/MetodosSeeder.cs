using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using ServicioJobs.Modelos;
using ServicioJobs.Dal.Contexto;

namespace ServicioJobs.Dal.CargaInicial
{
    public static class MetodosSeeder
    {
        /// <summary>
        /// Carga los métodos iniciales desde el archivo JSON
        /// </summary>
        /// <param name="context">Contexto de base de datos</param>
        /// <param name="logger">Logger para registrar eventos</param>
        /// <returns>Tarea asíncrona</returns>
        public static async Task SembrarMetodosAsync(ContextServicioJobs context, ILogger logger)
        {
            try
            {
                if (!context.Metodo.Any())
                {
                    var rutaArchivo = Path.Combine(Directory.GetCurrentDirectory(), "..", "ServicioJobs.Dal", "CargaInicial", "Metodos.json");
                    
                    if (File.Exists(rutaArchivo))
                    {
                        var json = await File.ReadAllTextAsync(rutaArchivo);
                        var metodos = JsonConvert.DeserializeObject<List<Metodo>>(json);

                        if (metodos != null && metodos.Any())
                        {
                            await context.Metodo.AddRangeAsync(metodos);
                            await context.SaveChangesAsync();
                            
                            logger.LogInformation($"Se cargaron {metodos.Count} métodos iniciales correctamente.");
                        }
                        else
                        {
                            logger.LogWarning("El archivo Metodos.json está vacío o no tiene un formato válido.");
                        }
                    }
                    else
                    {
                        logger.LogError($"No se encontró el archivo de métodos en la ruta: {rutaArchivo}");
                    }
                }
                else
                {
                    logger.LogInformation("Los métodos ya han sido cargados previamente.");
                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error al cargar los métodos iniciales: {Message}", ex.Message);
                throw;
            }
        }

        /// <summary>
        /// Agrega un nuevo método si no existe
        /// </summary>
        /// <param name="context">Contexto de base de datos</param>
        /// <param name="nombre">Nombre del método</param>
        /// <returns>El método creado o existente</returns>
        public static async Task<Metodo> AgregarMetodoSiNoExisteAsync(ContextServicioJobs context, string nombre)
        {
            var metodoExistente = await context.Metodo
                .FirstOrDefaultAsync(m => m.Nombre.ToLower() == nombre.ToLower());

            if (metodoExistente == null)
            {
                var nuevoMetodo = new Metodo
                {
                    IdMetodo = Guid.NewGuid(),
                    Nombre = nombre
                };

                context.Metodo.Add(nuevoMetodo);
                await context.SaveChangesAsync();
                
                return nuevoMetodo;
            }

            return metodoExistente;
        }

        /// <summary>
        /// Obtiene todos los métodos disponibles
        /// </summary>
        /// <param name="context">Contexto de base de datos</param>
        /// <returns>Lista de todos los métodos</returns>
        public static async Task<List<Metodo>> ObtenerTodosLosMetodosAsync(ContextServicioJobs context)
        {
            return await context.Metodo.ToListAsync();
        }

        /// <summary>
        /// Verifica si un método existe por su ID
        /// </summary>
        /// <param name="context">Contexto de base de datos</param>
        /// <param name="idMetodo">ID del método</param>
        /// <returns>True si existe, False si no existe</returns>
        public static async Task<bool> ExisteMetodoAsync(ContextServicioJobs context, Guid idMetodo)
        {
            return await context.Metodo.AnyAsync(m => m.IdMetodo == idMetodo);
        }

        /// <summary>
        /// Obtiene un método por su nombre HTTP (GET, POST, etc.)
        /// </summary>
        /// <param name="context">Contexto de base de datos</param>
        /// <param name="nombreHttp">Nombre del método HTTP</param>
        /// <returns>El método encontrado o null si no existe</returns>
        public static async Task<Metodo?> ObtenerMetodoPorNombreAsync(ContextServicioJobs context, string nombreHttp)
        {
            return await context.Metodo
                .FirstOrDefaultAsync(m => m.Nombre.ToUpper() == nombreHttp.ToUpper());
        }

        /// <summary>
        /// Crea métodos HTTP predeterminados programáticamente
        /// </summary>
        /// <returns>Lista de métodos HTTP predeterminados</returns>
        public static List<Metodo> CrearMetodosHttpPredeterminados()
        {
            return new List<Metodo>
            {
                new Metodo { IdMetodo = Guid.Parse("550e8400-e29b-41d4-a716-446655440001"), Nombre = "GET" },
                new Metodo { IdMetodo = Guid.Parse("550e8400-e29b-41d4-a716-446655440002"), Nombre = "POST" },
                new Metodo { IdMetodo = Guid.Parse("550e8400-e29b-41d4-a716-446655440003"), Nombre = "PUT" },
                new Metodo { IdMetodo = Guid.Parse("550e8400-e29b-41d4-a716-446655440004"), Nombre = "DELETE" },
                new Metodo { IdMetodo = Guid.Parse("550e8400-e29b-41d4-a716-446655440005"), Nombre = "PATCH" },
                new Metodo { IdMetodo = Guid.Parse("550e8400-e29b-41d4-a716-446655440006"), Nombre = "HEAD" },
                new Metodo { IdMetodo = Guid.Parse("550e8400-e29b-41d4-a716-446655440007"), Nombre = "OPTIONS" }
            };
        }
    }
} 