using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ServicioJobs.Dal.Migrations
{
    /// <inheritdoc />
    public partial class MigracionInicial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "programado",
                columns: table => new
                {
                    IdProgramado = table.Column<Guid>(type: "uuid", nullable: false),
                    Nombre = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Descripcion = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    Url = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    Crontab = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    CorreoNotificar = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    FechaEjecucion = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    FechaReintento = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    UltimaEjecucion = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Timeout = table.Column<int>(type: "integer", nullable: true),
                    EstadoEjecucion = table.Column<int>(type: "integer", nullable: false),
                    UltimaEjecucionExitosa = table.Column<bool>(type: "boolean", nullable: true),
                    ReintentosPermitidos = table.Column<int>(type: "integer", nullable: true),
                    PeriodoReintento = table.Column<int>(type: "integer", nullable: true),
                    Reintentos = table.Column<int>(type: "integer", nullable: true),
                    Habilitado = table.Column<bool>(type: "boolean", nullable: false),
                    MetodoHttp = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_programado", x => x.IdProgramado);
                });

            migrationBuilder.CreateTable(
                name: "historico",
                columns: table => new
                {
                    IdHistorico = table.Column<Guid>(type: "uuid", nullable: false),
                    IdProgramado = table.Column<Guid>(type: "uuid", nullable: false),
                    Estado = table.Column<int>(type: "integer", nullable: false),
                    FechaEjecucion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaEjecucionFin = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    EstadoHttp = table.Column<int>(type: "integer", nullable: false),
                    MensajeError = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_historico", x => x.IdHistorico);
                    table.ForeignKey(
                        name: "FK_historico_programado_IdProgramado",
                        column: x => x.IdProgramado,
                        principalTable: "programado",
                        principalColumn: "IdProgramado",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "parametro",
                columns: table => new
                {
                    IdParametroa = table.Column<Guid>(type: "uuid", nullable: false),
                    IdProgramado = table.Column<Guid>(type: "uuid", nullable: false),
                    Propiedad = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Valor = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    Tipo = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_parametro", x => x.IdParametroa);
                    table.ForeignKey(
                        name: "FK_parametro_programado_IdProgramado",
                        column: x => x.IdProgramado,
                        principalTable: "programado",
                        principalColumn: "IdProgramado",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_historico_IdProgramado",
                table: "historico",
                column: "IdProgramado");

            migrationBuilder.CreateIndex(
                name: "IX_parametro_IdProgramado",
                table: "parametro",
                column: "IdProgramado");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "historico");

            migrationBuilder.DropTable(
                name: "parametro");

            migrationBuilder.DropTable(
                name: "programado");
        }
    }
}
