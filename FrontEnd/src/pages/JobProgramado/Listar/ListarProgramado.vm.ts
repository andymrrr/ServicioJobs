import { JobProgramado } from "../../../Core/Dominio/Model";

export function useListarProgramadoVM() {
    const handleEditar = (job: JobProgramado) => {
        console.log('Editar job:', job);
      };
    
      const handleEliminar = (job: JobProgramado) => {
        console.log('Eliminar job:', job);
      };
    
      const handleEjecutar = (job: JobProgramado) => {
        console.log('Ejecutar job:', job);
      };

      return {
        handleEditar,
        handleEliminar,
        handleEjecutar,
      }

}