import { IJobProgramadoImplementacion } from "../../../api/Interfaz/IJobProgramadoImplementacion";
import { Respuesta } from "../../Model";
import { AgregarJobProgramadoComand } from "../../Model/JobProgramado/AgregarJobProgramadoComand";
import { Debug } from '../../../../utils/debugSystem';

export class CrearJobProgramadoCasoUso {
    private readonly repositorio: IJobProgramadoImplementacion;

    constructor(repositorio: IJobProgramadoImplementacion) {
        if (!repositorio) {
            throw new Error('El repositorio es requerido');
        }
        this.repositorio = repositorio;
    }

    async ejecutar(comando: AgregarJobProgramadoComand): Promise<Respuesta> {
        Debug.info('CASO_USO', 'Iniciando creación de job programado', { 
            jobNombre: comando.nombre,
            url: comando.url,
            metodoHttp: comando.metodoHttp,
            hasJobParametro: !!comando.jobParametro,
            jobParametroLength: Array.isArray(comando.jobParametro) ? comando.jobParametro.length : 'N/A'
        });
        
        try {
            this.validarComando(comando);
            
            const resultado = await this.repositorio.CrearJobProgramadoConJSON(comando);
            
            Debug.success('CASO_USO', 'Job programado creado exitosamente', {
                jobId: resultado.datos?.id,
                jobNombre: comando.nombre,
                completado: resultado.completado,
                mensaje: resultado.mensaje
            });
            
            return resultado;
            
        } catch (error) {
            // 🔍 Debug detallado del error
            const errorDetails = {
                errorType: error?.constructor?.name || 'Unknown',
                errorMessage: error instanceof Error ? error.message : String(error),
                errorStack: error instanceof Error ? error.stack : undefined,
                comando: {
                    nombre: comando.nombre,
                    url: comando.url,
                    metodoHttp: comando.metodoHttp,
                    correoNotificar: comando.correoNotificar,
                    hasJobParametro: !!comando.jobParametro
                }
            };

            Debug.error('CASO_USO', 'Error al crear job programado', errorDetails);
            
            throw this.crearErrorEstructurado(error, comando);
        }
    }

    private validarComando(comando: AgregarJobProgramadoComand): void {
        const errores: string[] = [];

        if (!comando.nombre?.trim()) {
            errores.push('El nombre del job es requerido');
        }

        if (!comando.url?.trim()) {
            errores.push('La URL es requerida');
        }

        if (!comando.crontab?.trim()) {
            errores.push('La expresión cron es requerida');
        }

        if (!comando.correoNotificar?.trim()) {
            errores.push('El correo de notificación es requerido');
        }

        if (comando.url && !this.esUrlValida(comando.url)) {
            errores.push('La URL no tiene un formato válido');
        }

        if (comando.correoNotificar && !this.esEmailValido(comando.correoNotificar)) {
            errores.push('El correo electrónico no tiene un formato válido');
        }
        
        if (comando.jobParametro && !Array.isArray(comando.jobParametro)) {
            errores.push('Los parámetros del job deben ser un array');
        }

        if (errores.length > 0) {
            const error = new Error(`Validación fallida: ${errores.join(', ')}`);
            error.name = 'ValidationError';
            throw error;
        }
    }

    private esUrlValida(url: string): boolean {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    private esEmailValido(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    private crearErrorEstructurado(error: unknown, comando: AgregarJobProgramadoComand): Error {
        if (error instanceof Error) {
            const errorEstructurado = new Error(
                `Error al crear job '${comando.nombre}': ${error.message}`
            );
            errorEstructurado.name = error.name;
            errorEstructurado.stack = error.stack;
            return errorEstructurado;
        }

        return new Error(
            `Error desconocido al crear job '${comando.nombre}': ${String(error)}`
        );
    }
}
