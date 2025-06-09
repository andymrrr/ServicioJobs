interface KPICardProps {
  titulo: string;
  valor: string | number;
  unit?: string;
  variante?: 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'dark';
}

const KPICard: React.FC<KPICardProps> = ({
  titulo,
  valor,
  unit,
  variante = 'dark',
}) => {
  const bgColorClass = {
    primary: 'bg-blue-600',
    success: 'bg-green-600',
    danger: 'bg-red-600',
    warning: 'bg-yellow-500',
    info: 'bg-cyan-600',
    dark: 'bg-gray-800',
  }[variante] || 'bg-gray-800';

  return (
    <div
      className={`rounded-xl p-6 shadow-md text-center min-w-[180px] flex flex-col gap-2 justify-center text-white ${bgColorClass}`}
    >
      <h4 className="text-sm font-medium opacity-80">{titulo}</h4>
      <p className="text-3xl font-bold">
        {valor}
        {unit && <span className="text-base font-normal opacity-90"> {unit}</span>}
      </p>
    </div>
  );
};
export default KPICard;