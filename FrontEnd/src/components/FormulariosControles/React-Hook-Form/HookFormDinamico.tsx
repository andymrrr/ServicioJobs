import React, { useState } from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { FaPlus, FaTrash, FaCode, FaKey, FaGlobe } from 'react-icons/fa';

// Tipos de campos permitidos
export type TipoCampoHook = 'input' | 'select' | 'checkbox' | 'textarea' | 'json';

// Tamaños de campo
export type TamanoCampoHook = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';

// Interfaz para definir un tipo de campo permitido
export interface ConfiguracionCampoHook {
  tipo: TipoCampoHook;
  label: string;
  tamaño: TamanoCampoHook;
  opciones?: string[]; // Para selects
  placeholder?: string;
  required?: boolean;
  icono?: React.ReactNode;
}

// Interfaz para un campo individual
export interface CampoFormulario {
  id: string;
  nombre: string;
  valor: string;
  tipo: TipoCampoHook;
  activo?: boolean; // Para checkboxes
}

// Interfaz para los datos del formulario por pestaña
export interface FormularioDatos {
  [key: string]: CampoFormulario[];
}

// Props del componente principal
export interface HookFormDinamicoProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  pestañas?: string[];
  tiposCamposPermitidos: ConfiguracionCampoHook[];
  cantidadMaximaCampos?: number;
  onSubmit?: (datos: FormularioDatos) => void;
  onChange?: (datos: FormularioDatos) => void;
  valoresIniciales?: FormularioDatos;
  className?: string;
  textoBotonEnvio?: string;
  mostrarBotonEnvio?: boolean;
  titulo?: string;
  subtitulo?: string;
}

const HookFormDinamico = <T extends FieldValues>({
  name,
  control,
  pestañas = ['Headers', 'Query Params', 'Body Params'],
  tiposCamposPermitidos,
  cantidadMaximaCampos = 15,
  onSubmit,
  onChange,
  valoresIniciales = {},
  className = '',
  textoBotonEnvio = 'Guardar',
  mostrarBotonEnvio = false,
  titulo = "Configuración de Parámetros",
  subtitulo = "Configura headers, query params y body parameters para tu job"
}: HookFormDinamicoProps<T>) => {
  const [pestañaActiva, setPestañaActiva] = useState(pestañas[0]);

  // Helper para placeholders de headers comunes
  const getPlaceholderPorHeader = (headerName: string): string => {
    const placeholders: { [key: string]: string } = {
      'Authorization': 'Bearer your-token-here',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': 'MyApp/1.0',
      'X-API-Key': 'your-api-key-here'
    };
    return placeholders[headerName] || 'Valor del header';
  };

  // Helper para validar JSON
  const isValidJSON = (str: string): boolean => {
    try {
      JSON.parse(str);
      return true;
    } catch {
      return false;
    }
  };

  // Generar ID único para campos
  const generarId = () => `campo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // Configuraciones predefinidas para diferentes tipos de pestañas
  const configuracionesPorPestaña = {
    'Headers': [
      { tipo: 'input' as TipoCampoHook, label: 'Header', tamaño: '12' as TamanoCampoHook, placeholder: 'Authorization, Content-Type, etc.', icono: <FaKey className="text-blue-500" /> },
      { tipo: 'select' as TipoCampoHook, label: 'Header Común', tamaño: '12' as TamanoCampoHook, opciones: ['Authorization', 'Content-Type', 'Accept', 'User-Agent', 'X-API-Key'], icono: <FaKey className="text-green-500" /> }
    ],
    'Query Params': [
      { tipo: 'input' as TipoCampoHook, label: 'Query Param', tamaño: '12' as TamanoCampoHook, placeholder: 'page, limit, search, etc.', icono: <FaGlobe className="text-purple-500" /> }
    ],
    'Body Params': [
      { tipo: 'input' as TipoCampoHook, label: 'Campo Simple', tamaño: '12' as TamanoCampoHook, placeholder: 'id, name, email, etc.', icono: <FaCode className="text-orange-500" /> },
      { tipo: 'textarea' as TipoCampoHook, label: 'Campo Texto', tamaño: '12' as TamanoCampoHook, placeholder: 'description, message, etc.', icono: <FaCode className="text-orange-600" /> },
      { tipo: 'json' as TipoCampoHook, label: 'JSON Object', tamaño: '12' as TamanoCampoHook, placeholder: '{"key": "value"}', icono: <FaCode className="text-red-500" /> }
    ]
  };

  // Renderizar campo según su tipo con Controller
  const renderizarCampo = (campo: CampoFormulario, configuracion: ConfiguracionCampoHook, value: FormularioDatos, onChange: (value: FormularioDatos) => void) => {
    const claseInput = "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-black focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white transition-colors";
    const claseLabel = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

    const actualizarCampo = (propiedad: 'nombre' | 'valor' | 'activo', nuevoValor: string | boolean) => {
      const nuevosDatos = { ...value };
      nuevosDatos[pestañaActiva] = (nuevosDatos[pestañaActiva] || []).map(c =>
        c.id === campo.id ? { ...c, [propiedad]: nuevoValor } : c
      );
      onChange(nuevosDatos);
    };

    const eliminarCampo = () => {
      const nuevosDatos = { ...value };
      nuevosDatos[pestañaActiva] = (nuevosDatos[pestañaActiva] || []).filter(c => c.id !== campo.id);
      onChange(nuevosDatos);
    };

    switch (configuracion.tipo) {
      case 'input':
        return (
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-5">
              <label className={claseLabel}>
                <div className="flex items-center gap-2">
                  {configuracion.icono}
                  Nombre/Clave
                </div>
              </label>
              <input
                type="text"
                value={campo.nombre}
                onChange={(e) => actualizarCampo('nombre', e.target.value)}
                className={claseInput}
                placeholder="Ej: Authorization, Content-Type"
              />
            </div>
            <div className="col-span-5">
              <label className={claseLabel}>Valor</label>
              <input
                type="text"
                value={campo.valor}
                onChange={(e) => actualizarCampo('valor', e.target.value)}
                className={claseInput}
                placeholder={configuracion.placeholder || "Valor del campo"}
              />
            </div>
            <div className="col-span-2 flex items-end">
              <button
                type="button"
                onClick={eliminarCampo}
                className="w-full h-10 flex items-center justify-center rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
                title="Eliminar campo"
              >
                <FaTrash size={14} />
              </button>
            </div>
          </div>
        );

      case 'select':
        return (
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-5">
              <label className={claseLabel}>
                <div className="flex items-center gap-2">
                  {configuracion.icono}
                  Header Predefinido
                </div>
              </label>
              <select
                value={campo.nombre}
                onChange={(e) => actualizarCampo('nombre', e.target.value)}
                className={claseInput}
              >
                <option value="">Seleccionar header...</option>
                {configuracion.opciones?.map((opcion, idx) => (
                  <option key={idx} value={opcion}>
                    {opcion}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-5">
              <label className={claseLabel}>Valor</label>
              <input
                type="text"
                value={campo.valor}
                onChange={(e) => actualizarCampo('valor', e.target.value)}
                className={claseInput}
                placeholder={getPlaceholderPorHeader(campo.nombre)}
              />
            </div>
            <div className="col-span-2 flex items-end">
              <button
                type="button"
                onClick={eliminarCampo}
                className="w-full h-10 flex items-center justify-center rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
                title="Eliminar campo"
              >
                <FaTrash size={14} />
              </button>
            </div>
          </div>
        );

      case 'textarea':
        return (
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-5">
              <label className={claseLabel}>
                <div className="flex items-center gap-2">
                  {configuracion.icono}
                  Nombre del Campo
                </div>
              </label>
              <input
                type="text"
                value={campo.nombre}
                onChange={(e) => actualizarCampo('nombre', e.target.value)}
                className={claseInput}
                placeholder="Ej: description, message"
              />
            </div>
            <div className="col-span-5">
              <label className={claseLabel}>Valor</label>
              <textarea
                value={campo.valor}
                onChange={(e) => actualizarCampo('valor', e.target.value)}
                className={`${claseInput} min-h-[80px] resize-y`}
                placeholder={configuracion.placeholder || "Texto del campo"}
                rows={3}
              />
            </div>
            <div className="col-span-2 flex items-end">
              <button
                type="button"
                onClick={eliminarCampo}
                className="w-full h-10 flex items-center justify-center rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
                title="Eliminar campo"
              >
                <FaTrash size={14} />
              </button>
            </div>
          </div>
        );

      case 'json':
        return (
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-5">
              <label className={claseLabel}>
                <div className="flex items-center gap-2">
                  {configuracion.icono}
                  Clave JSON
                </div>
              </label>
              <input
                type="text"
                value={campo.nombre}
                onChange={(e) => actualizarCampo('nombre', e.target.value)}
                className={claseInput}
                placeholder="Ej: user, config, data"
              />
            </div>
            <div className="col-span-5">
              <label className={claseLabel}>Objeto JSON</label>
              <textarea
                value={campo.valor}
                onChange={(e) => actualizarCampo('valor', e.target.value)}
                className={`${claseInput} min-h-[100px] resize-y font-mono text-xs`}
                placeholder='{"key": "value", "nested": {"prop": "val"}}'
                rows={4}
              />
              {campo.valor && !isValidJSON(campo.valor) && (
                <p className="text-xs text-red-500 mt-1">⚠️ JSON no válido</p>
              )}
            </div>
            <div className="col-span-2 flex items-end">
              <button
                type="button"
                onClick={eliminarCampo}
                className="w-full h-10 flex items-center justify-center rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
                title="Eliminar campo"
              >
                <FaTrash size={14} />
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <Controller
        name={name}
        control={control}
        defaultValue={valoresIniciales as any}
        render={({ field: { value = {} as FormularioDatos, onChange } }) => {
          const agregarCampo = (configuracion: ConfiguracionCampoHook) => {
            const camposActuales = (value as FormularioDatos)[pestañaActiva] || [];
            if (camposActuales.length >= cantidadMaximaCampos) {
              alert(`Máximo ${cantidadMaximaCampos} campos permitidos por pestaña`);
              return;
            }

            const nuevoCampo: CampoFormulario = {
              id: generarId(),
              nombre: '',
              valor: configuracion.tipo === 'checkbox' ? 'false' : configuracion.tipo === 'json' ? '{}' : '',
              tipo: configuracion.tipo,
              ...(configuracion.tipo === 'checkbox' && { activo: false })
            };

            const nuevosDatos = { ...(value as FormularioDatos) };
            nuevosDatos[pestañaActiva] = [...(nuevosDatos[pestañaActiva] || []), nuevoCampo];
            onChange(nuevosDatos);
          };

          const camposActuales = (value as FormularioDatos)[pestañaActiva] || [];
          const tiposDisponibles = configuracionesPorPestaña[pestañaActiva as keyof typeof configuracionesPorPestaña] || tiposCamposPermitidos;

          const totalCampos = Object.values(value as FormularioDatos).reduce((total: number, campos: CampoFormulario[]) => {
            return total + (Array.isArray(campos) ? campos.length : 0);
          }, 0);

          return (
            <div className="bg-white dark:bg-boxdark rounded-lg border border-stroke dark:border-strokedark shadow-sm">
              {/* Header */}
              <div className="border-b border-stroke dark:border-strokedark p-6">
                <h3 className="text-lg font-semibold text-black dark:text-white">{titulo}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{subtitulo}</p>
                {totalCampos > 0 && (
                  <div className="mt-2 inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {totalCampos} parámetro{totalCampos !== 1 ? 's' : ''} configurado{totalCampos !== 1 ? 's' : ''}
                  </div>
                )}
              </div>

              {/* Pestañas */}
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex px-6">
                  {pestañas.map((pestaña) => {
                    const camposPestaña = (value as FormularioDatos)[pestaña] || [];
                    return (
                      <button
                        key={pestaña}
                        type="button"
                        onClick={() => setPestañaActiva(pestaña)}
                        className={`whitespace-nowrap border-b-2 py-4 px-4 text-sm font-medium transition-colors ${
                          pestañaActiva === pestaña
                            ? 'border-primary text-primary'
                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                        }`}
                      >
                        {pestaña}
                        {Array.isArray(camposPestaña) && camposPestaña.length > 0 && (
                          <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-white">
                            {camposPestaña.length}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Contenido */}
              <div className="p-6">
                {/* Campos existentes */}
                {camposActuales.length > 0 ? (
                  <div className="space-y-4 mb-6">
                    {camposActuales.map((campo, index) => {
                      const tipoConfigurado = tiposDisponibles.find(config => config.tipo === campo.tipo) || 
                                            tiposCamposPermitidos.find(config => config.tipo === campo.tipo);
                      if (!tipoConfigurado) return null;

                      return (
                        <div
                          key={campo.id}
                          className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                              Campo #{index + 1} - {tipoConfigurado.label}
                            </span>
                          </div>
                          {renderizarCampo(campo, tipoConfigurado, value, onChange)}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <div className="text-4xl mb-4">📝</div>
                    <h4 className="text-lg font-medium mb-2">No hay parámetros en {pestañaActiva}</h4>
                    <p className="text-sm">Utiliza los botones de abajo para agregar campos</p>
                  </div>
                )}

                {/* Botones para agregar campos */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Agregar Campo a {pestañaActiva}
                    </h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {camposActuales.length}/{cantidadMaximaCampos}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {tiposDisponibles.map((configuracion, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => agregarCampo(configuracion)}
                        disabled={camposActuales.length >= cantidadMaximaCampos}
                        className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700">
                          {configuracion.icono || <FaPlus size={14} />}
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {configuracion.label}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {configuracion.placeholder}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Información de resumen */}
                {totalCampos > 0 && (
                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start gap-3">
                      <div className="text-blue-500">
                        <FaCode size={16} />
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                          Resumen de Configuración
                        </h5>
                        <div className="text-xs text-blue-700 dark:text-blue-300 mt-1 space-y-1">
                          {Object.entries(value as FormularioDatos).map(([pestaña, campos]) => 
                            Array.isArray(campos) && campos.length > 0 ? (
                              <div key={pestaña}>
                                <strong>{pestaña}:</strong> {campos.length} campo{campos.length !== 1 ? 's' : ''}
                              </div>
                            ) : null
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Botón de envío opcional */}
                {mostrarBotonEnvio && onSubmit && (
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={() => onSubmit(value as FormularioDatos)}
                      className="inline-flex items-center gap-2 rounded bg-green-600 px-6 py-3 text-sm font-medium text-white hover:bg-green-700 transition-colors"
                    >
                      {textoBotonEnvio}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default HookFormDinamico;