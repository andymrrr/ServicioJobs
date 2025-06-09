import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface SeriesData {
  name: string;
  'Product One': number;
  'Product Two': number;
}

interface Props {
  data: SeriesData[];
  colors?: string[];
}

const GraficoArea: React.FC<Props> = ({
  data,
  colors = ['#3C50E0', '#80CAEE'],
}) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorOne" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={colors[0]} stopOpacity={0.8} />
            <stop offset="95%" stopColor={colors[0]} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorTwo" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={colors[1]} stopOpacity={0.8} />
            <stop offset="95%" stopColor={colors[1]} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="Product One"
          stroke={colors[0]}
          fillOpacity={1}
          fill="url(#colorOne)"
        />
        <Area
          type="monotone"
          dataKey="Product Two"
          stroke={colors[1]}
          fillOpacity={1}
          fill="url(#colorTwo)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default GraficoArea;
