import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { useForm } from "react-hook-form";
import HookFormInput from "../../components/FormulariosControles/React-Hook-Form/HookFormInput";
import HookFormTextarea from "../../components/FormulariosControles/React-Hook-Form/HookFormTextarea";
import HookFormCheckbox from "../../components/FormulariosControles/React-Hook-Form/HookFormCheckbox";
import HookFormFile from "../../components/FormulariosControles/React-Hook-Form/HookFormFile";
import HookFormSwitcher from "../../components/FormulariosControles/React-Hook-Form/HookFormSwitcher";
import Tarjeta from "../../components/UI/Tarjeta";
import { Contenedor } from "../../components/UI/Contenedor";
import EtiquetaEstado from "../../components/UI/Etiqueta-Estado";
// Importamos algunos iconos para los ejemplos
import {
  FaCheck,
  FaTimes,
  FaExclamationTriangle,
  FaInfoCircle,
  FaClock,
  FaPowerOff,
  FaStar,
} from "react-icons/fa";

interface FormData {
  defaultInput: string;
  activeInput: string;
  disabledInput: string;
  defaultTextarea: string;
  activeTextarea: string;
  disabledTextarea: string;
  acceptTerms: boolean;
  notifications: boolean;
  file: FileList;
}

const FormElements = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
  };

  return (
    <Contenedor>
      <Breadcrumb pageName="Form Elements" />
      <div className="col-span-12 flex items-center justify-between gap-4 mb-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-9 sm:grid-cols-2"
        >
          <div className="flex flex-col gap-9">
            {/* <!-- Estado Labels --> */}
            <Tarjeta
              titulo="Etiquetas de Estado"
              subtitulo="Diferentes variantes y estilos de etiquetas"
              variante="defecto"
              lineaHeader={{
                mostrar: true,
                grosor: "2px",
                color: "blue",
              }}
            >
              <div className="space-y-6">
                {/* Estados Básicos */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-300 mb-3">
                    Estados Básicos
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <EtiquetaEstado texto="Activo" estado="exito" />
                    <EtiquetaEstado texto="Error" estado="error" />
                    <EtiquetaEstado texto="Pendiente" estado="advertencia" />
                    <EtiquetaEstado texto="Info" estado="info" />
                    <EtiquetaEstado texto="Inactivo" estado="inactivo" />
                  </div>
                </div>

                {/* Con Iconos */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-300 mb-3">
                    Con Iconos
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <EtiquetaEstado
                      texto="Completado"
                      estado="exito"
                      icono={<FaCheck size={12} />}
                    />
                    <EtiquetaEstado
                      texto="Rechazado"
                      estado="error"
                      icono={<FaTimes size={12} />}
                    />
                    <EtiquetaEstado
                      texto="Advertencia"
                      estado="advertencia"
                      icono={<FaExclamationTriangle size={12} />}
                    />
                    <EtiquetaEstado
                      texto="Información"
                      estado="info"
                      icono={<FaInfoCircle size={12} />}
                    />
                    <EtiquetaEstado
                      texto="En Proceso"
                      estado="pendiente"
                      icono={<FaClock size={12} />}
                    />
                  </div>
                </div>

                {/* Diferentes Tamaños */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-300 mb-3">
                    Tamaños
                  </h3>
                  <div className="flex flex-wrap gap-3 items-center">
                    <EtiquetaEstado
                      texto="Pequeño"
                      estado="exito"
                      tamaño="pequeño"
                      icono={<FaCheck size={10} />}
                    />
                    <EtiquetaEstado
                      texto="Normal"
                      estado="exito"
                      tamaño="normal"
                      icono={<FaCheck size={12} />}
                    />
                    <EtiquetaEstado
                      texto="Grande"
                      estado="exito"
                      tamaño="grande"
                      icono={<FaCheck size={14} />}
                    />
                  </div>
                </div>

                {/* Personalizados */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-300 mb-3">
                    Personalizados
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <EtiquetaEstado
                      texto="Premium"
                      colorPersonalizado="indigo-500"
                      icono={<FaStar size={12} />}
                      conBorde={true}
                    />
                    <EtiquetaEstado
                      texto="Offline"
                      colorPersonalizado="rose-500"
                      icono={<FaPowerOff size={12} />}
                      conAnimacion={true}
                    />
                    <EtiquetaEstado
                      texto="Beta"
                      colorPersonalizado="cyan-500"
                      conBorde={true}
                      conAnimacion={true}
                    />
                  </div>
                </div>

                {/* Ancho Completo */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-300 mb-3">
                    Ancho Completo
                  </h3>
                  <div className="space-y-2">
                    <EtiquetaEstado
                      texto="Estado del Sistema"
                      estado="exito"
                      anchoCompleto={true}
                      icono={<FaCheck size={12} />}
                    />
                    <EtiquetaEstado
                      texto="Error de Conexión"
                      estado="error"
                      anchoCompleto={true}
                      icono={<FaTimes size={12} />}
                    />
                  </div>
                </div>
              </div>
            </Tarjeta>

            {/* <!-- Input Fields --> */}
            <Tarjeta
              titulo="Input Fields"
              subtitulo="Diferentes tipos de campos de entrada"
              variante="defecto"
              lineaHeader={{
                mostrar: true,
                grosor: "2px",
                color: "blue",
              }}
              lineaDivisora={{
                mostrar: true,
                grosor: "1px",
                color: "gray",
                className: "my-6",
              }}
            >
              <div className="flex flex-col gap-5.5">
                <HookFormInput
                  label="Default Input"
                  name="defaultInput"
                  register={register}
                  errors={errors}
                  placeholder="Default Input"
                  tooltipMessage="Este es un campo de entrada predeterminado"
                />

                <HookFormInput
                  label="Active Input"
                  name="activeInput"
                  register={register}
                  errors={errors}
                  placeholder="Active Input"
                  tooltipMessage="Este campo está activo"
                />

                <HookFormInput
                  label="Disabled Input"
                  name="disabledInput"
                  register={register}
                  errors={errors}
                  placeholder="Disabled Input"
                  disabled={true}
                  tooltipMessage="Este campo está deshabilitado"
                />
              </div>
            </Tarjeta>

            {/* <!-- Toggle switch input --> */}
            <Tarjeta
              titulo="Toggle switch input"
              subtitulo="Control de interruptor personalizado"
              variante="defecto"
              lineaHeader={{
                mostrar: true,
                grosor: "2px",
                color: "green",
              }}
            >
              <div className="flex flex-col gap-5.5">
                <HookFormSwitcher
                  label="Activar notificaciones"
                  name="notifications"
                  register={register}
                  errors={errors}
                  tooltipMessage="Activa o desactiva las notificaciones"
                />
              </div>
            </Tarjeta>

            {/* <!-- File upload --> */}
            <Tarjeta
              titulo="File upload"
              subtitulo="Carga de archivos con previsualización"
              variante="defecto"
              lineaHeader={{
                mostrar: true,
                grosor: "2px",
                color: "yellow",
              }}
            >
              <div className="flex flex-col gap-5.5">
                <HookFormFile
                  label="Adjuntar archivo"
                  name="file"
                  register={register}
                  errors={errors}
                  accept=".pdf,.doc,.docx"
                  tooltipMessage="Formatos permitidos: PDF, DOC, DOCX"
                />
              </div>
            </Tarjeta>
          </div>

          <div className="flex flex-col gap-9">
            {/* <!-- Textarea Fields --> */}
            <Tarjeta
              titulo="Textarea Fields"
              subtitulo="Campos de texto multilínea"
              variante="defecto"
              lineaHeader={{
                mostrar: true,
                grosor: "2px",
                color: "red",
              }}
              lineaDivisora={{
                mostrar: true,
                grosor: "1px",
                color: "gray",
                className: "my-6",
              }}
            >
              <div className="flex flex-col gap-5.5">
                <HookFormTextarea
                  label="Default Textarea"
                  name="defaultTextarea"
                  register={register}
                  errors={errors}
                  placeholder="Default textarea"
                  tooltipMessage="Este es un área de texto predeterminada"
                />

                <HookFormTextarea
                  label="Active Textarea"
                  name="activeTextarea"
                  register={register}
                  errors={errors}
                  placeholder="Active textarea"
                  tooltipMessage="Esta área de texto está activa"
                />

                <HookFormTextarea
                  label="Disabled Textarea"
                  name="disabledTextarea"
                  register={register}
                  errors={errors}
                  placeholder="Disabled textarea"
                  disabled={true}
                  tooltipMessage="Esta área de texto está deshabilitada"
                />
              </div>
            </Tarjeta>

            {/* <!-- Checkbox --> */}
            <Tarjeta
              titulo="Checkbox"
              subtitulo="Casillas de verificación personalizadas"
              variante="defecto"
              lineaHeader={{
                mostrar: true,
                grosor: "2px",
                color: "blue",
              }}
            >
              <div className="flex flex-col gap-5.5">
                <HookFormCheckbox
                  label="Acepto los términos y condiciones"
                  name="acceptTerms"
                  register={register}
                  errors={errors}
                  tooltipMessage="Debes aceptar los términos para continuar"
                />
              </div>
            </Tarjeta>
          </div>
        </form>
      </div>
    </Contenedor>
  );
};

export default FormElements;
