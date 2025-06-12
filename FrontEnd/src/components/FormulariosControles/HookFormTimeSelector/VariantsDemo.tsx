import { useForm } from 'react-hook-form';
import HookFormTimeSelector from './HookFormTimeSelector';

interface FormData {
  timePill: string;
  timeButton: string;
  timeTabs: string;
  timeCards: string;
}

/**
 * Componente de demostración para mostrar las diferentes variantes del HookFormTimeSelector
 */
export const VariantsDemo: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log('Form data:', data);
  };

  const timeOptions = [
    { value: '5m', label: '5 min' },
    { value: '15m', label: '15 min' },
    { value: '30m', label: '30 min' },
    { value: '1h', label: '1 hora' },
    { value: '4h', label: '4 horas' },
    { value: 'D', label: '1 día' },
  ];

  return (
    <div className="p-6 space-y-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">
        Variantes del HookFormTimeSelector
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12 gap-6">
        
        {/* Variante Pill (Por defecto) */}
        <div className="col-span-12">
          <h2 className="text-xl font-semibold mb-4">🟦 Variante Pill (Por defecto)</h2>
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <HookFormTimeSelector
              label="Intervalo de tiempo - Pill"
              name="timePill"
              register={register}
              errors={errors}
              options={timeOptions}
              defaultSelected="15m"
              variant="pill"
              tooltipMessage="Selecciona el intervalo de tiempo en formato pill"
              colSpan="12"
            />
          </div>
        </div>

        {/* Variante Button */}
        <div className="col-span-12">
          <h2 className="text-xl font-semibold mb-4">🔵 Variante Button</h2>
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <HookFormTimeSelector
              label="Intervalo de tiempo - Button"
              name="timeButton"
              register={register}
              errors={errors}
              options={timeOptions}
              defaultSelected="30m"
              variant="button"
              tooltipMessage="Selecciona el intervalo de tiempo en formato botón"
              colSpan="12"
            />
          </div>
        </div>

        {/* Variante Tabs */}
        <div className="col-span-12">
          <h2 className="text-xl font-semibold mb-4">📑 Variante Tabs</h2>
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <HookFormTimeSelector
              label="Intervalo de tiempo - Tabs"
              name="timeTabs"
              register={register}
              errors={errors}
              options={timeOptions}
              defaultSelected="1h"
              variant="tabs"
              tooltipMessage="Selecciona el intervalo de tiempo en formato tabs"
              colSpan="12"
            />
          </div>
        </div>

        {/* Variante Cards */}
        <div className="col-span-12">
          <h2 className="text-xl font-semibold mb-4">🃏 Variante Cards</h2>
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <HookFormTimeSelector
              label="Intervalo de tiempo - Cards"
              name="timeCards"
              register={register}
              errors={errors}
              options={timeOptions}
              defaultSelected="4h"
              variant="cards"
              tooltipMessage="Selecciona el intervalo de tiempo en formato tarjetas"
              colSpan="12"
            />
          </div>
        </div>

        {/* Botón de envío */}
        <div className="col-span-12 text-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
          >
            Ver valores seleccionados (Consola)
          </button>
        </div>
      </form>
    </div>
  );
};

export default VariantsDemo; 