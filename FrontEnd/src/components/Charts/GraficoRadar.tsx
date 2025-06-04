import React from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, ResponsiveContainer
} from 'recharts';

interface Props {
  data: { metric: string; value: number }[];
  color?: string;
}

const GraficoRadar: React.FC<Props> = ({ data, color = "#8884d8" }) => (
  <ResponsiveContainer width="100%" height={300}>
    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="metric" />
      <PolarRadiusAxis />
      <Tooltip />
      <Radar name="Métricas" dataKey="value" stroke={color} fill={color} fillOpacity={0.6} />
    </RadarChart>
  </ResponsiveContainer>
);

export default GraficoRadar;
