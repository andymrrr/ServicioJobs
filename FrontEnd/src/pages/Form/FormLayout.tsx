import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useForm } from 'react-hook-form';
import { Contenedor } from '../../components/UI/Contenedor';
import Tarjeta from '../../components/UI/Tarjeta';
import HookFormInput from '../../components/FormulariosControles/React-Hook-Form/HookFormInput';
import HookFormTextarea from '../../components/FormulariosControles/React-Hook-Form/HookFormTextarea';
import HookFormCheckbox from '../../components/FormulariosControles/React-Hook-Form/HookFormCheckbox';
import EtiquetaEstado from '../../components/UI/Etiqueta-Estado';
import { FaInfoCircle, FaSave, FaTimes } from 'react-icons/fa';



interface FormularioData {
  nombreCompleto: string;
  email: string;
  empresa: string;
  telefono: string;
  mensaje: string;
  direccion: string;
  ciudad: string;
  pais: string;
  codigoPostal: string;
  terminosCondiciones: boolean;
  nombre: string;
  apellido: string;
}

const FormLayout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormularioData>({
    defaultValues: {
      email: '',
      telefono: '',
      terminosCondiciones: false
    }
  });

  // Validaciones personalizadas
  const emailValidation = {
    required: 'El email es requerido',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Email inválido'
    }
  };

  const telefonoValidation = {
    pattern: {
      value: /^[0-9]{10}$/,
      message: 'Teléfono inválido (10 dígitos)'
    }
  };



  const onSubmit = (data: FormularioData) => {
    console.log(data);
  };

  return (
    <Contenedor>
      <Breadcrumb pageName="Layouts de Formulario" />

       <div className="col-span-12  ">
      
          {/* Formulario Simple */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Tarjeta
              titulo="Formulario Simple"
              subtitulo="Layout básico de una columna"
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
                    <FaSave /> Guardar
                  </button>
                </div>
              }
              tamano={6}
            >
          
                <HookFormInput
                  label="Nombre Completo"
                  name="nombreCompleto"
                  register={register}
                  errors={errors}
                  placeholder="John Doe"
                />
                <HookFormInput
                  label="Email"
                  name="email"
                  register={(name) => register(name, emailValidation)}
                  errors={errors}
                  placeholder="ejemplo@correo.com"
                  type="email"
                  tooltipMessage="Ingresa un email válido"
                />
                <HookFormTextarea
                  label="Mensaje"
                  name="mensaje"
                  register={register}
                  errors={errors}
                  placeholder="Escribe tu mensaje aquí..."
                />
         
            </Tarjeta>
          </form>

          {/* Formulario con Validación */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Tarjeta
              titulo={
                <div className="flex items-center justify-between">
                  <span>Formulario con Validación</span>
                  <EtiquetaEstado
                    texto="Requerido"
                    estado="info"
                    icono={<FaInfoCircle size={12} />}
                    tamaño="pequeño"
                  />
                </div>
              }
              subtitulo="Incluye validación de campos"
              variante="defecto"
              lineaHeader={{
                mostrar: true,
                grosor: '2px',
                color: 'green'
              }}
            >
              <div className="flex flex-col gap-5.5 p-6.5">
                <HookFormInput
                  label="Email"
                  name="email"
                  register={(name) => register(name, emailValidation)}
                  errors={errors}
                  placeholder="ejemplo@correo.com"
                  type="email"
                  tooltipMessage="Ingresa un email válido"
                />
                <HookFormInput
                  label="Teléfono"
                  name="telefono"
                  register={(name) => register(name, telefonoValidation)}
                  errors={errors}
                  placeholder="1234567890"
                  tooltipMessage="Ingresa un número de 10 dígitos"
                />
              </div>
            </Tarjeta>
          </form>
       

        
          {/* Formulario en Columnas */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Tarjeta
              titulo="Formulario en Columnas"
              subtitulo="Layout de dos columnas"
              variante="defecto"
              lineaHeader={{
                mostrar: true,
                grosor: '2px',
                color: 'yellow'
              }}
              lineaDivisora={{
                mostrar: true,
                grosor: '1px',
                color: 'gray'
              }}
            >
              <div className="p-6.5">
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <HookFormInput
                    label="Nombre"
                    name="nombre"
                    register={register}
                    errors={errors}
                    placeholder="John"
                  />
                  <HookFormInput
                    label="Apellido"
                    name="apellido"
                    register={register}
                    errors={errors}
                    placeholder="Doe"
                  />
                </div>

                <div className="mb-4 grid grid-cols-2 gap-4">
                  <HookFormInput
                    label="Email"
                    name="email"
                    register={register}
                    errors={errors}
                    placeholder="ejemplo@correo.com"
                    type="email"
                  />
                  <HookFormInput
                    label="Teléfono"
                    name="telefono"
                    register={register}
                    errors={errors}
                    placeholder="1234567890"
                  />
                </div>

                <HookFormTextarea
                  label="Dirección"
                  name="direccion"
                  register={register}
                  errors={errors}
                  placeholder="Ingresa tu dirección completa"
                />

                <div className="mt-4">
                  <HookFormCheckbox
                    label="Acepto los términos y condiciones"
                    name="terminosCondiciones"
                    register={register}
                    errors={errors}
                  />
                </div>
              </div>
            </Tarjeta>
          </form>

          {/* Formulario de Dirección */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Tarjeta
              titulo="Formulario de Dirección"
              subtitulo="Información de envío"
              variante="defecto"
              lineaHeader={{
                mostrar: true,
                grosor: '2px',
                color: 'red'
              }}
            >
              <div className="grid grid-cols-1 gap-4 p-6.5">
                <HookFormInput
                  label="Dirección"
                  name="direccion"
                  register={register}
                  errors={errors}
                  placeholder="Calle y número"
                />
                <div className="grid grid-cols-2 gap-4">
                  <HookFormInput
                    label="Ciudad"
                    name="ciudad"
                    register={register}
                    errors={errors}
                    placeholder="Ciudad"
                  />
                  <HookFormInput
                    label="Código Postal"
                    name="codigoPostal"
                    register={register}
                    errors={errors}
                    placeholder="12345"
                  />
                </div>
                <HookFormInput
                  label="País"
                  name="pais"
                  register={register}
                  errors={errors}
                  placeholder="País"
                />
              </div>
            </Tarjeta>
          </form>
      </div>
    </Contenedor>
  );
};

export default FormLayout;
