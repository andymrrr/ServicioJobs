import { CronPreset } from './types';

export const CRON_PRESETS: CronPreset[] = [
  { name: 'Cada minuto', value: '* * * * *', description: 'Se ejecuta cada minuto', icon: '⚡' },
  { name: 'Cada 5 minutos', value: '*/5 * * * *', description: 'Se ejecuta cada 5 minutos', icon: '🔄' },
  { name: 'Cada hora', value: '0 * * * *', description: 'Se ejecuta al inicio de cada hora', icon: '⏰' },
  { name: 'Diario (medianoche)', value: '0 0 * * *', description: 'Se ejecuta diariamente a las 00:00', icon: '🌙' },
  { name: 'Diario (9 AM)', value: '0 9 * * *', description: 'Se ejecuta diariamente a las 09:00', icon: '☀️' },
  { name: 'Semanal (Lunes)', value: '0 0 * * 1', description: 'Se ejecuta los lunes a medianoche', icon: '📅' },
  { name: 'Mensual (día 1)', value: '0 0 1 * *', description: 'Se ejecuta el primer día de cada mes', icon: '📆' },
  { name: 'Personalizado', value: '', description: 'Crear expresión personalizada', icon: '⚙️' },
];

export function parseCronDescription(cronExpression: string): string {
  if (!cronExpression) return '';
  
  const parts = cronExpression.split(' ');
  if (parts.length !== 5) return 'Expresión cron inválida';
  
  const [minute, hour, day, month, dayOfWeek] = parts;
  
  // Casos comunes
  if (cronExpression === '* * * * *') return 'Cada minuto';
  if (cronExpression === '0 * * * *') return 'Cada hora';
  if (cronExpression === '0 0 * * *') return 'Diariamente a medianoche';
  if (cronExpression === '0 9 * * *') return 'Diariamente a las 9:00 AM';
  if (cronExpression === '0 0 * * 1') return 'Semanalmente los lunes';
  if (cronExpression === '0 0 1 * *') return 'Mensualmente el día 1';
  if (cronExpression.startsWith('*/')) {
    const interval = cronExpression.split('/')[1];
    return `Cada ${interval} minutos`;
  }
  
  return `Minuto: ${minute}, Hora: ${hour}, Día: ${day}, Mes: ${month}, Día semana: ${dayOfWeek}`;
} 