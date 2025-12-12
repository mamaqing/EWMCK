import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { MetricData } from '../types';

interface ComparisonChartProps {
  metrics: Record<string, MetricData>;
}

export const ComparisonChart: React.FC<ComparisonChartProps> = ({ metrics }) => {
  const data = [
    { name: '记忆', value: metrics.memory.value, color: metrics.memory.color },
    { name: '逻辑', value: metrics.logic.value, color: metrics.logic.color },
    { name: '注意', value: metrics.attention.value, color: metrics.attention.color },
    { name: '执行', value: metrics.executive.value, color: metrics.executive.color },
  ];

  return (
    <div className="h-[180px] w-full mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 0, bottom: 0, left: -25 }} barSize={32}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} 
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            domain={[0, 100]} 
            tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }} 
            axisLine={false}
            tickLine={false}
            tickCount={5}
          />
          <Tooltip 
             cursor={{ fill: '#f8fafc' }}
             contentStyle={{ backgroundColor: '#1e293b', borderRadius: '4px', border: 'none', color: '#fff' }}
             itemStyle={{ fontSize: '12px' }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
