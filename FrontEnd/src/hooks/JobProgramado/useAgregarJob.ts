import { useMutation } from "@tanstack/react-query";
import { AgregarJobProgramadoComand, Respuesta } from "../../Core/Dominio/Model";
import { CrearJobProgramadoCasoUso } from "../../Core/Dominio/CasoUso/JobProgramado/CrearJobProgramadoCasoUso";
import { JobProgramadoImplementacion } from "../../Core/api/Implementacion/JobProgramadoImplementacion";
import { Debug } from "../../utils/debugSystem";

const repositorio = new JobProgramadoImplementacion();
const casoUso = new CrearJobProgramadoCasoUso(repositorio);

export const useAgregarJob = () => {
    const mutation = useMutation<Respuesta, Error, AgregarJobProgramadoComand>({
        mutationFn: async (param: AgregarJobProgramadoComand) => {
            Debug.info('HOOK', 'Iniciando mutación de agregar job', param);
            try {
                const resultado = await casoUso.ejecutar(param);
                Debug.success('HOOK', 'Job agregado exitosamente', resultado);
                return resultado;
                
            } catch (error) {
                Debug.error('HOOK', 'Error al agregar job', error);
                throw error;
            }
        },
        onSuccess: (data) => {
            Debug.success('HOOK', 'Mutación completada exitosamente', data);
        },
        onError: (error) => {
            Debug.error('HOOK', 'Error en mutación', error);
        }
    });

    return {
        ejecutar: mutation.mutate,
        ejecutarAsync: mutation.mutateAsync,
        isPending: mutation.isPending,
        isSuccess: mutation.isSuccess,
        isError: mutation.isError,
        error: mutation.error,
        data: mutation.data,
    };
};