import { useAgregarJob } from "../../../hooks/JobProgramado/useAgregarJob";
import { AgregarJobProgramadoComand } from "../../../Nucleo/Dominio/Model";

export function useAgregarJobVM() {
   const { ejecutarAsync , isPending, isSuccess, isError, error, data } = useAgregarJob();

   const handleAgregarJob = async (job: AgregarJobProgramadoComand) => {
    await ejecutarAsync(job);
   }

    return {
        ejecutarAsync,
        isPending,
        isSuccess,
        isError,
        error,
        data,
        handleAgregarJob

    }
}
