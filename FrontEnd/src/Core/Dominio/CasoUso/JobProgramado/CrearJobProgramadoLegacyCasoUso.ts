import { IJobProgramadoImplementacion } from "../../../api/Interfaz/IJobProgramadoImplementacion";
import { Respuesta } from "../../Model";
import { AgregarJobProgramadoComand } from "../../Model/JobProgramado/AgregarJobProgramadoComand";
import { Utilitarios } from "../../../api/Utilitario";
import { Debug } from '../../../../utils/debugSystem';

/**
 * 🔄 Caso de Uso Legacy: Crear Job Programado con FormData
 * 
 * ⚠️ DEPRECATED: Este caso de uso existe solo para compatibilidad hacia atrás.
 * Se recomienda usar CrearJobProgramadoCasoUso que utiliza JSON.
 * 
 * Responsabilidades:
 * - Convertir comando a FormData
 * - Ejecutar creación usando el método legacy
 * - Manejar errores específicos de FormData
 * 
 * @deprecated Usar CrearJobProgramadoCasoUso en su lugar
 */
export class CrearJobProgramadoLegacyCasoUso {
    private readonly repositorio: IJobProgramadoImplementacion;

    constructor(repositorio: IJobProgramadoImplementacion) {
        if (!repositorio) {
            throw new Error('El repositorio es requerido');
        }
        this.repositorio = repositorio;
    }

    /**
     * 🔄 Ejecutar creación usando FormData (método legacy)
     * 
     * @param comando - Comando con los datos del job
     * @returns Promise<Respuesta> - Resultado de la operación
     * @throws Error - Si hay problemas en la conversión o ejecución
     */
    async ejecutar(comando: AgregarJobProgramadoComand): Promise<Respuesta> {
        Debug.warning('CASO_USO_LEGACY', 'Usando método legacy con FormData', {
            jobNombre: comando.nombre,
            deprecationWarning: 'Considerar migrar a CrearJobProgramadoCasoUso'
        });
        
        try {
            // 🔄 Convertir a FormData
            const formData = Utilitarios.construirFormularioConArraysComplejos(comando);
            
            Debug.info('CASO_USO_LEGACY', 'FormData construido', {
                originalComando: {
                    nombre: comando.nombre,
                    url: comando.url
                },
                formDataKeys: Array.from(formData.keys())
            });
            
            // 🚀 Ejecutar con FormData
            const resultado = await this.repositorio.CrearJobProgramado(formData);
            
                         Debug.success('CASO_USO_LEGACY', 'Job creado con FormData', {
                 jobId: resultado.datos?.id,
                 jobNombre: comando.nombre
             });
            
            return resultado;
            
        } catch (error) {
            Debug.error('CASO_USO_LEGACY', 'Error en método legacy', {
                error: error instanceof Error ? error.message : 'Error desconocido',
                comando: {
                    nombre: comando.nombre,
                    url: comando.url
                }
            });
            
            // Usar el manejo de errores existente para FormData
            return Utilitarios.ManejarError<Respuesta>(error);
        }
    }
} 