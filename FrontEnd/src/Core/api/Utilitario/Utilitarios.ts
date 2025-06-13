import { AxiosError } from "axios";
interface ErrorConMensaje {
    mensaje?: string;
  }
  
export const Utilitarios = {
    async ManejarError<T>(error: any): Promise<T> {
        console.error("ERROR: ", error);

        if (error instanceof AxiosError) {
            if (error.response?.status === 401) {
                throw error; 
            }

            return {
                completado: false,
                mensaje: "Ha Ocurrido Un Error",
                errorTecnico: error.response?.data || error.message
            } as unknown as T;
        }

        return {
            completado: false,
            mensaje: "Ha Ocurrido Un Error Desconocido",
            errorTecnico: error
        } as unknown as T;
    },

    ConstruirQueryParams(obj: Record<string, any>): URLSearchParams {
        const params = new URLSearchParams();
    
        Object.entries(obj).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((item) => {
                    params.append(key, item.toString());
                });
            } else if (value !== undefined && value !== null && value !== "") {
                params.append(key, value.toString());
            }
        });
    
        return params;
    },

    EjecutarConDelay(tiempoEspera: number, callback: () => void | Promise<void>): () => void {
        const timer = setTimeout(async () => {
            try {
                await callback();
            } catch (error) {
                console.error("Error en ejecutarCoDelay:", error);
            }
        }, tiempoEspera);

        return () => clearTimeout(timer);
    },
    construirFormulario<T>(solicitud: T, asignaciones: { llave: string; propiedad: keyof T }[]): FormData {
        return asignaciones.reduce((formulario, { llave, propiedad }) => {
          const valorCampo = solicitud[propiedad];
          formulario.append(llave, valorCampo != null ? String(valorCampo) : "");
          return formulario;
        }, new FormData());
      },
    construirFormularioAutomatico<T extends object>(solicitud: T): FormData {
      const formulario = new FormData();

      Object.keys(solicitud).forEach((key) => {
        const valorCampo = solicitud[key as keyof T];
        formulario.append(key, valorCampo != null ? String(valorCampo) : "");
      });

      return formulario;
    },
    procesarMensajeError(error: unknown): string {
        const axiosError = error as AxiosError<ErrorConMensaje>;
      
        if (axiosError?.isAxiosError) {
          return axiosError.response?.data?.mensaje || axiosError.message || "Error desconocido del servidor";
        }
      
        return "Error inesperado en la aplicación";
    }
      
      
      
};
