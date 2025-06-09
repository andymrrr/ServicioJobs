import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

interface Props {
  data: any[];
  lines: { key: string; color: string; name: string }[];
  xKey?: string;
}

const GraficoLineas: React.FC<Props> = ({ data, lines, xKey = 'index' }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={xKey} />
      <YAxis />
      <Tooltip />
      <Legend />
      {lines.map((line, idx) => (
        <Line
          key={idx}
          type="monotone"
          dataKey={line.key}
          stroke={line.color}
          name={line.name}
        />
      ))}
    </LineChart>
  </ResponsiveContainer>
);

export default GraficoLineas;
