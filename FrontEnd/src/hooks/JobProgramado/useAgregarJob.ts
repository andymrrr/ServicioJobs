import { useMutation } from "@tanstack/react-query";
import { AgregarJobProgramadoComand, Respuesta } from "../../Nucleo/Dominio/Model";
import { CrearJobProgramadoCasoUso } from "../../Nucleo/Dominio/CasoUso";


export const useAgregarJob = () => {
    const mutation = useMutation<Respuesta, Error, AgregarJobProgramadoComand>({
      mutationFn: (param: AgregarJobProgramadoComand) => CrearJobProgramadoCasoUso(param),
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