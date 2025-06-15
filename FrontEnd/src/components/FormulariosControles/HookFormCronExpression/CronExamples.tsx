import React from 'react';

const CronExamples: React.FC = () => {
  return (
    <details className="group">
      <summary className="cursor-pointer text-sm text-primary hover:text-primary/80 font-medium">
        📚 Ver ejemplos de expresiones cron
      </summary>
      <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-xs space-y-1">
        <p><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">0 0 * * *</code> - Diario a medianoche</p>
        <p><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">0 */6 * * *</code> - Cada 6 horas</p>
        <p><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">0 9 * * 1-5</code> - Días laborables a las 9 AM</p>
        <p><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">0 0 1 */3 *</code> - Cada 3 meses</p>
      </div>
    </details>
  );
};

export default CronExamples; 