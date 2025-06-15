import React from 'react';

interface CronBuilderProps {
  showBuilder: boolean;
}

const CronBuilder: React.FC<CronBuilderProps> = ({ showBuilder }) => {
  if (!showBuilder) return null;

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-stroke dark:border-form-strokedark">
      <p className="text-sm text-bodydark2 mb-2">🚧 Constructor visual próximamente...</p>
      <div className="grid grid-cols-5 gap-2 text-xs">
        <div className="text-center">
          <p className="font-medium">Minuto</p>
          <p className="text-bodydark2">0-59</p>
        </div>
        <div className="text-center">
          <p className="font-medium">Hora</p>
          <p className="text-bodydark2">0-23</p>
        </div>
        <div className="text-center">
          <p className="font-medium">Día</p>
          <p className="text-bodydark2">1-31</p>
        </div>
        <div className="text-center">
          <p className="font-medium">Mes</p>
          <p className="text-bodydark2">1-12</p>
        </div>
        <div className="text-center">
          <p className="font-medium">Día Sem.</p>
          <p className="text-bodydark2">0-7</p>
        </div>
      </div>
    </div>
  );
};

export default CronBuilder; 