import React from 'react';
import { parseCronDescription } from './cronUtils';

interface CronDescriptionProps {
  cronExpression: string;
}

const CronDescription: React.FC<CronDescriptionProps> = ({ cronExpression }) => {
  const description = parseCronDescription(cronExpression);

  if (!cronExpression) return null;

  return (
    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-stroke dark:border-form-strokedark">
      <p className="text-sm">
        <span className="font-medium text-primary">📝 Descripción:</span>{' '}
        <span className="text-bodydark2">{description}</span>
      </p>
    </div>
  );
};

export default CronDescription; 