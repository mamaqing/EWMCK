import React from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import { MetricData, TrendDataPoint } from '../types';

// --- Radar Chart ---

interface CognitiveRadarProps {
  metrics: Record<string, MetricData>;
}

export const CognitiveRadar: React.FC<CognitiveRadarProps> = ({ metrics }) => {
  const normalizedReaction = Math.max(0, Math.min(100, (2.0 - metrics.reaction.value) / (2.0 - 0.1) * 100));

  const data = [
    { subject: '记忆力', A: metrics.memory.value, fullMark: 100 },
    { subject: '逻辑', A: metrics.logic.value, fullMark: 100 },
    { subject: '注意力', A: metrics.attention.value, fullMark: 100 },
    { subject: '执行力', A: metrics.executive.value, fullMark: 100 },
    { subject: '反应', A: normalizedReaction, fullMark: 100 },
  ];

  return (
    <div className="h-[280px] w-full font-sans">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="#e2e8f0" strokeDasharray="4 4" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }} 
          />
          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="当前状态"
            dataKey="A"
            stroke="#6366f1"
            strokeWidth={2}
            fill="#818cf8"
            fillOpacity={0.4}
            dot={{ r: 3, fill: '#6366f1' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

// --- Trend Chart ---

interface TrendChartProps {
  data: TrendDataPoint[];
}

export const TrendChart: React.FC<TrendChartProps> = ({ data }) => {
  return (
    <div className="h-[220px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorMemory" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 10, fill: '#94a3b8' }} 
            axisLine={false} 
            tickLine={false} 
            interval="preserveStartEnd"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis 
            hide={false} 
            tick={{ fontSize: 10, fill: '#94a3b8', fontFamily: 'monospace' }} 
            axisLine={false} 
            tickLine={false}
            domain={[0, 100]}
            tickCount={5}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', borderRadius: '4px', border: 'none', color: '#f8fafc', fontSize: '12px' }}
            itemStyle={{ color: '#e2e8f0' }}
            labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
            formatter={(value: number, name: string) => [value, name === 'memory' ? '记忆力' : '执行力']}
          />
          <Area 
            type="monotone" 
            dataKey="memory" 
            stroke="#6366f1" 
            strokeWidth={2} 
            fillOpacity={1} 
            fill="url(#colorMemory)" 
            name="memory"
          />
           <Area 
            type="monotone" 
            dataKey="executive" 
            stroke="#10b981" 
            strokeWidth={1.5} 
            fill="none" 
            strokeDasharray="5 5"
            name="executive"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
