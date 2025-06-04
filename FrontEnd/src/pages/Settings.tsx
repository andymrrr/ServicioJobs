import { useForm } from 'react-hook-form';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { Contenedor } from '../components/UI/Contenedor';
import Tarjeta from '../components/UI/Tarjeta';
import HookFormInput from '../components/FormulariosControles/React-Hook-Form/HookFormInput';
import HookFormTextarea from '../components/FormulariosControles/React-Hook-Form/HookFormTextarea';
import HookFormCheckbox from '../components/FormulariosControles/React-Hook-Form/HookFormCheckbox';
import HookFormFile from '../components/FormulariosControles/React-Hook-Form/HookFormFile';
import EtiquetaEstado from '../components/UI/Etiqueta-Estado';
import { FaCamera, FaCheck, FaCog, FaEnvelope, FaGlobe, FaLock, FaSave, FaTimes, FaUser } from 'react-icons/fa';

interface SettingsFormData {
  nombreCompleto: string;
  email: string;
  biografia: string;
  ubicacion: string;
  sitioWeb: string;
  contraseñaActual: string;
  nuevaContraseña: string;
  confirmarContraseña: string;
  notificacionesEmail: boolean;
  notificacionesPush: boolean;
  fotoPerfil: FileList;
}

const Settings = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SettingsFormData>({
    defaultValues: {
      notificacionesEmail: true,
      notificacionesPush: false
    }
  });

  const onSubmit = (data: SettingsFormData) => {
    console.log('Datos del formulario:', data);
  };

  // Validaciones
  const emailValidation = {
    required: 'El email es requerido',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Email inválido'
    }
  };

  const passwordValidation = {
    minLength: {
      value: 8,
      message: 'La contraseña debe tener al menos 8 caracteres'
    }
  };

  return (
    <Contenedor>
      <Breadcrumb pageName="Configuración" />

         <Tarjeta
              titulo={
                <div className="flex items-center gap-2.5">
                  <FaUser className="text-primary" />
                  <span>Información Personal</span>
                </div>
              }
              subtitulo="Actualiza tu información personal"
              variante="defecto"
              lineaHeader={{
                mostrar: true,
                grosor: '2px',
                color: 'blue'
              }}
              piePagina={
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded bg-gray-200 px-4 py-2 font-medium text-gray-600 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                  >
                    <FaTimes /> Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded bg-primary px-4 py-2 font-medium text-white hover:bg-opacity-90"
                  >
                    <FaSave /> Guardar Cambios
                  </button>
                </div>
              }
              tamano={6}
            >
       
          {/* Información Personal */}
          <form onSubmit={handleSubmit(onSubmit)}>
        
             
                {/* Foto de Perfil */}
              
                    <HookFormFile
                      label={
                        <div className="flex items-center gap-2 rounded bg-primary px-4 py-2 font-medium text-white hover:bg-opacity-90">
                          <FaCamera /> Cambiar Foto
                        </div>
                      }
                      name="fotoPerfil"
                      register={register}
                      errors={errors}
                      accept="image/*"
                      colSpan='6'
                    />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      PNG, JPG o GIF (Max. 2MB)
                    </p>
              
                
                  <HookFormInput
                    label="Nombre Completo"
                    name="nombreCompleto"
                    register={register}
                    errors={errors}
                    placeholder="John Doe"
                    tooltipMessage="Tu nombre completo como aparecerá en tu perfil"
                  />
                  <HookFormInput
                    label="Email"
                    name="email"
                    register={(name) => register(name, emailValidation)}
                    errors={errors}
                    type="email"
                    placeholder="ejemplo@correo.com"
                    tooltipMessage="Tu dirección de correo principal"
                  />
               

                
                  <HookFormTextarea
                    label="Biografía"
                    name="biografia"
                    register={register}
                    errors={errors}
                    placeholder="Cuéntanos sobre ti..."
                    tooltipMessage="Una breve descripción sobre ti"
                  />
                

              
                  <HookFormInput
                    label="Ubicación"
                    name="ubicacion"
                    register={register}
                    errors={errors}
                    placeholder="Ciudad, País"
                    tooltipMessage="Tu ubicación actual"
                  />
                  <HookFormInput
                    label="Sitio Web"
                    name="sitioWeb"
                    register={register}
                    errors={errors}
                    placeholder="https://tusitio.com"
                    tooltipMessage="Tu sitio web personal o profesional"
                  />
              
         
            
          </form>
          </Tarjeta>
          {/* Cambiar Contraseña */}
            <Tarjeta
            titulo={
              <div className="flex items-center gap-2.5">
                <FaLock className="text-primary" />
                <span>Cambiar Contraseña</span>
              </div>
            }
            subtitulo="Actualiza tu contraseña de acceso"
            variante="defecto"
            lineaHeader={{
              mostrar: true,
              grosor: '2px',
              color: 'red'
            }}
            tamano={6}
          >
           
                <HookFormInput
                  label="Contraseña Actual"
                  name="contraseñaActual"
                  type="password"
                  register={register}
                  errors={errors}
                  placeholder="••••••••"
                  tooltipMessage="Ingresa tu contraseña actual"
                />
                <HookFormInput
                  label="Nueva Contraseña"
                  name="nuevaContraseña"
                  type="password"
                  register={(name) => register(name, passwordValidation)}
                  errors={errors}
                  placeholder="••••••••"
                  tooltipMessage="Mínimo 8 caracteres"
                />
                <HookFormInput
                  label="Confirmar Nueva Contraseña"
                  name="confirmarContraseña"
                  type="password"
                  register={register}
                  errors={errors}
                  placeholder="••••••••"
                  tooltipMessage="Repite tu nueva contraseña"
                />
             
          </Tarjeta>
          {/* Configuración de Notificaciones */}
          <Tarjeta
            titulo={
              <div className="flex items-center gap-2.5">
                <FaEnvelope className="text-primary" />
                <span>Notificaciones</span>
              </div>
            }
            subtitulo="Gestiona tus preferencias de notificación"
            variante="defecto"
            lineaHeader={{
              mostrar: true,
              grosor: '2px',
              color: 'green'
            }}
            tamano={6}
          >
            
                <HookFormCheckbox
                  label="Notificaciones por Email"
                  name="notificacionesEmail"
                  register={register}
                  errors={errors}
                />
                <HookFormCheckbox
                  label="Notificaciones Push"
                  name="notificacionesPush"
                  register={register}
                  errors={errors}
                />
            
          </Tarjeta>
       
          {/* Cambiar Contraseña */}
        

          {/* Configuración Avanzada */}
          <Tarjeta
            titulo={
              <div className="flex items-center gap-2.5">
                <FaCog className="text-primary" />
                <span>Configuración Avanzada</span>
              </div>
            }
            subtitulo="Opciones avanzadas de tu cuenta"
            variante="defecto"
            lineaHeader={{
              mostrar: true,
              grosor: '2px',
              color: 'yellow'
            }}
            tamano={6}
          >
            <div className="p-6.5">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-black dark:text-white">
                    Estado de la Cuenta
                  </span>
                  <EtiquetaEstado
                    texto="Activa"
                    estado="exito"
                    icono={<FaCheck size={12} />}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-black dark:text-white">
                    Visibilidad del Perfil
                  </span>
                  <EtiquetaEstado
                    texto="Público"
                    estado="info"
                    icono={<FaGlobe size={12} />}
                  />
                </div>
              </div>
            </div>
          </Tarjeta>

    </Contenedor>
  );
};

export default Settings;
