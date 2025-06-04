import React from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

interface DonutChartProps {
  title: string;
  data: { name: string; value: number }[];
  colors?: string[];
}

const DonutChart: React.FC<DonutChartProps> = ({ title, data, colors }) => {
  const defaultColors = ['#3C50E0', '#6577F3', '#8FD0EF', '#0FADCF'];

  return (
    <div className="rounded-sm border bg-white p-5 shadow-default dark:bg-boxdark">
      <h5 className="text-xl font-semibold text-black dark:text-white mb-4">{title}</h5>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="60%"
            outerRadius="80%"
            paddingAngle={2}
            label={false}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors?.[index] ?? defaultColors[index % defaultColors.length]} />
            ))}
          </Pie>
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-2">
            <span
              className="block h-3 w-3 rounded-full"
              style={{ backgroundColor: colors?.[index] ?? defaultColors[index % defaultColors.length] }}
            />
            <span className="text-sm font-medium text-black dark:text-white">
              {entry.name} - {entry.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;
