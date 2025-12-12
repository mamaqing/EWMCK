import React from 'react';
import { MetricData, CategoryKey } from '../types';
import { Settings2, RotateCcw } from 'lucide-react';

interface SimulationControlProps {
  metrics: Record<string, MetricData>;
  onChange: (key: CategoryKey, value: number) => void;
  onReset: () => void;
}

const ControlItem: React.FC<{
  metric: MetricData;
  onChange: (val: number) => void;
  min: number;
  max: number;
  step: number;
}> = ({ metric, onChange, min, max, step }) => {
  return (
    <div className="flex flex-col gap-1 w-full group">
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold text-slate-600 tracking-tight">{metric.label}</span>
        <span className="font-mono text-indigo-700 font-bold bg-indigo-50 px-1.5 rounded">
          {metric.value}{metric.unit}
        </span>
      </div>
      <div className="relative h-6 flex items-center">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={metric.value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          style={{
              backgroundImage: `linear-gradient(to right, ${metric.color} 0%, ${metric.color} ${(metric.value - min) / (max - min) * 100}%, #e2e8f0 ${(metric.value - min) / (max - min) * 100}%, #e2e8f0 100%)`
          }}
        />
      </div>
      <style>{`
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 14px;
          width: 14px;
          border-radius: 50%;
          background: white;
          border: 3px solid ${metric.color};
          box-shadow: 0 1px 2px rgba(0,0,0,0.2);
          cursor: grab;
          transition: transform 0.1s;
        }
        input[type=range]::-webkit-slider-thumb:active {
            transform: scale(1.2);
            cursor: grabbing;
        }
      `}</style>
    </div>
  );
};

export const SimulationControl: React.FC<SimulationControlProps> = ({ metrics, onChange, onReset }) => {
  return (
    <div className="bg-slate-50 rounded-none border-b border-slate-300 p-5 mb-8 print:hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
            <Settings2 size={18} className="text-slate-600"/>
            <h2 className="text-sm font-bold text-slate-800 tracking-wider">实时参数模拟控制台</h2>
            <span className="text-xs text-slate-500 ml-2">(拖动滑块以生成不同的评估报告)</span>
            </div>
            <button 
                onClick={onReset}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-white hover:bg-slate-600 bg-white border border-slate-300 rounded shadow-sm transition-all"
            >
            <RotateCcw size={12} />
            重置参数
            </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-10">
            <ControlItem 
            metric={metrics.memory} 
            onChange={(v) => onChange('memory', v)} 
            min={0} max={100} step={1} 
            />
            <ControlItem 
            metric={metrics.logic} 
            onChange={(v) => onChange('logic', v)} 
            min={0} max={100} step={1} 
            />
            <ControlItem 
            metric={metrics.attention} 
            onChange={(v) => onChange('attention', v)} 
            min={0} max={100} step={1} 
            />
            <ControlItem 
            metric={metrics.executive} 
            onChange={(v) => onChange('executive', v)} 
            min={0} max={100} step={1} 
            />
            <ControlItem 
            metric={metrics.reaction} 
            onChange={(v) => onChange('reaction', v)} 
            min={0.1} max={2.0} step={0.01} 
            />
        </div>
      </div>
    </div>
  );
};
