import { useMutation } from "@tanstack/react-query";
import { AgregarJobProgramadoComand, Respuesta } from "../../Nucleo/Dominio/Model";
import { JobProgramadoImplementacion } from "../../Nucleo/api/Implementacion/JobProgramadoImplementacion";

// Extendemos el comando base para incluir el ID
export interface EditarJobProgramadoComand extends AgregarJobProgramadoComand {
  id: string;
}

export const useEditarJob = () => {
  const implementacion = new JobProgramadoImplementacion();

  const mutation = useMutation<Respuesta, Error, EditarJobProgramadoComand>({
    mutationFn: async (param: EditarJobProgramadoComand) => {
      const { id, ...datosJob } = param;
      const formData = new FormData();
      
      // Construir FormData con los datos del job
      Object.entries(datosJob).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });

      return await implementacion.ActualizarJobProgramado(formData);
    },
  });

  return {
    ejecutar: mutation.mutate,
    ejecutarAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  };
}; 