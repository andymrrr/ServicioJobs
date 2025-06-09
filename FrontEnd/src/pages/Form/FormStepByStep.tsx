import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaCheck, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { Contenedor } from '../../components/UI/Contenedor';
import Tarjeta from '../../components/UI/Tarjeta';
import StepByStep from '../../components/UI/StepByStep';
import HookFormInput from '../../components/FormulariosControles/React-Hook-Form/HookFormInput';
import HookFormTextarea from '../../components/FormulariosControles/React-Hook-Form/HookFormTextarea';
import HookFormCheckbox from '../../components/FormulariosControles/React-Hook-Form/HookFormCheckbox';
import EtiquetaEstado from '../../components/UI/Etiqueta-Estado';

interface FormularioData {
  // Paso 1: Información Personal
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  
  // Paso 2: Información de Contacto
  empresa: string;
  mensaje: string;
  
  // Paso 3: Dirección
  direccion: string;
  ciudad: string;
  pais: string;
  codigoPostal: string;
  
  // Paso 4: Confirmación
  terminosCondiciones: boolean;
  notificacionesEmail: boolean;
}

const FormStepByStep = () => {
  const [pasoActual, setPasoActual] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
    setValue
  } = useForm<FormularioData>({
    defaultValues: {
      terminosCondiciones: false,
      notificacionesEmail: true
    }
  });

  const pasos = [
    {
      id: 1,
      titulo: 'Información Personal',
      descripcion: 'Datos básicos del usuario',
      icono: <FaUser size={16} />
    },
    {
      id: 2,
      titulo: 'Contacto',
      descripcion: 'Empresa y mensaje',
      icono: <FaEnvelope size={16} />
    },
    {
      id: 3,
      titulo: 'Dirección',
      descripcion: 'Información de ubicación',
      icono: <FaMapMarkerAlt size={16} />
    },
    {
      id: 4,
      titulo: 'Confirmación',
      descripcion: 'Revisar y confirmar',
      icono: <FaCheck size={16} />
    }
  ];

  // Validaciones
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

  const camposPorPaso = [
    ['nombre', 'apellido', 'email', 'telefono'], // Paso 1
    ['empresa', 'mensaje'], // Paso 2
    ['direccion', 'ciudad', 'pais', 'codigoPostal'], // Paso 3
    ['terminosCondiciones'] // Paso 4
  ];

  const validarPasoActual = async () => {
    const campos = camposPorPaso[pasoActual];
    const resultado = await trigger(campos as any);
    return resultado;
  };

  const siguientePaso = async () => {
    const esValido = await validarPasoActual();
    if (esValido && pasoActual < pasos.length - 1) {
      setPasoActual(pasoActual + 1);
    }
  };

  const pasoAnterior = () => {
    if (pasoActual > 0) {
      setPasoActual(pasoActual - 1);
    }
  };

  const irAPaso = async (numeroPaso: number) => {
    // Solo permitir ir a pasos anteriores o al siguiente si es válido
    if (numeroPaso < pasoActual) {
      setPasoActual(numeroPaso);
    } else if (numeroPaso === pasoActual + 1) {
      await siguientePaso();
    }
  };

  const onSubmit = (data: FormularioData) => {
    console.log('Datos del formulario:', data);
    alert('¡Formulario enviado exitosamente!');
  };

  const renderPaso = () => {
    switch (pasoActual) {
      case 0:
        return (
          <div className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-2 gap-4">
              <HookFormInput
                label="Nombre"
                name="nombre"
                register={(name) => register(name, { required: 'El nombre es requerido' })}
                errors={errors}
                placeholder="Juan"
              />
              <HookFormInput
                label="Apellido"
                name="apellido"
                register={(name) => register(name, { required: 'El apellido es requerido' })}
                errors={errors}
                placeholder="Pérez"
              />
            </div>
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
        );

      case 1:
        return (
          <div className="grid grid-cols-1 gap-6">
            <HookFormInput
              label="Empresa"
              name="empresa"
              register={register}
              errors={errors}
              placeholder="Nombre de tu empresa"
            />
            <HookFormTextarea
              label="Mensaje"
              name="mensaje"
              register={(name) => register(name, { required: 'El mensaje es requerido' })}
              errors={errors}
              placeholder="Cuéntanos sobre tu proyecto o consulta..."
            />
          </div>
        );

      case 2:
        return (
          <div className="grid grid-cols-1 gap-6">
            <HookFormInput
              label="Dirección"
              name="direccion"
              register={(name) => register(name, { required: 'La dirección es requerida' })}
              errors={errors}
              placeholder="Calle y número"
            />
            <div className="grid grid-cols-2 gap-4">
              <HookFormInput
                label="Ciudad"
                name="ciudad"
                register={(name) => register(name, { required: 'La ciudad es requerida' })}
                errors={errors}
                placeholder="Ciudad"
              />
              <HookFormInput
                label="Código Postal"
                name="codigoPostal"
                register={(name) => register(name, { required: 'El código postal es requerido' })}
                errors={errors}
                placeholder="12345"
              />
            </div>
            <HookFormInput
              label="País"
              name="pais"
              register={(name) => register(name, { required: 'El país es requerido' })}
              errors={errors}
              placeholder="México"
            />
          </div>
        );

      case 3:
        return (
          <div className="grid grid-cols-1 gap-6">
            {/* Resumen de la información */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Resumen de tu información
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Nombre:</strong> {getValues('nombre')} {getValues('apellido')}</p>
                  <p><strong>Email:</strong> {getValues('email')}</p>
                  <p><strong>Teléfono:</strong> {getValues('telefono')}</p>
                  <p><strong>Empresa:</strong> {getValues('empresa')}</p>
                </div>
                <div>
                  <p><strong>Dirección:</strong> {getValues('direccion')}</p>
                  <p><strong>Ciudad:</strong> {getValues('ciudad')}</p>
                  <p><strong>País:</strong> {getValues('pais')}</p>
                  <p><strong>C.P.:</strong> {getValues('codigoPostal')}</p>
                </div>
              </div>
              <div className="mt-4">
                <p><strong>Mensaje:</strong></p>
                <p className="text-gray-600 dark:text-gray-300">{getValues('mensaje')}</p>
              </div>
            </div>

            {/* Checkboxes de confirmación */}
            <div className="space-y-4">
              <HookFormCheckbox
                label="Acepto los términos y condiciones"
                name="terminosCondiciones"
                register={(name) => register(name, { required: 'Debes aceptar los términos y condiciones' })}
                errors={errors}
              />
              <HookFormCheckbox
                label="Deseo recibir notificaciones por email"
                name="notificacionesEmail"
                register={register}
                errors={errors}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Contenedor>
      <Breadcrumb pageName="Formulario Step by Step" />
      
      <div className="col-span-12">
        <Tarjeta
          titulo={
            <div className="flex items-center justify-between">
              <span>Registro de Usuario</span>
              <EtiquetaEstado
                texto={`Paso ${pasoActual + 1} de ${pasos.length}`}
                estado="info"
                tamaño="pequeño"
              />
            </div>
          }
          subtitulo="Complete los siguientes pasos para completar su registro"
          variante="defecto"
          lineaHeader={{
            mostrar: true,
            grosor: '2px',
            color: 'blue'
          }}
        >
          <div className="p-6">
            {/* Componente Step by Step */}
            <div className="mb-8">
              <StepByStep
                pasos={pasos}
                pasoActual={pasoActual}
                onPasoClick={irAPaso}
                tema="horizontal"
                className="mb-8"
              />
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="min-h-[400px]">
                {renderPaso()}
              </div>

              {/* Botones de navegación */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={pasoAnterior}
                  disabled={pasoActual === 0}
                  className="flex items-center gap-2 rounded bg-gray-200 px-4 py-2 font-medium text-gray-600 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                >
                  <FaArrowLeft size={14} /> Anterior
                </button>

                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Paso {pasoActual + 1} de {pasos.length}
                </div>

                {pasoActual === pasos.length - 1 ? (
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded bg-green-600 px-6 py-2 font-medium text-white hover:bg-green-700"
                  >
                    <FaCheck size={14} /> Finalizar
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={siguientePaso}
                    className="flex items-center gap-2 rounded bg-primary px-4 py-2 font-medium text-white hover:bg-opacity-90"
                  >
                    Siguiente <FaArrowRight size={14} />
                  </button>
                )}
              </div>
            </form>
          </div>
        </Tarjeta>
      </div>
    </Contenedor>
  );
};

export default FormStepByStep; 