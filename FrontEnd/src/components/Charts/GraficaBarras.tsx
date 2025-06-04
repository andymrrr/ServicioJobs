import React from 'react';
import {
  BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Cell, ResponsiveContainer
} from 'recharts';

interface Props {
  data: { name: string; value: number }[];
  colors?: string[];
}

const GraficoBarras: React.FC<Props> = ({ data, colors = [] }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="value">
          {data.map((_, index) => (
            <Cell key={`bar-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GraficoBarras;

