import React from 'react';
import { MetricData } from '../types';
import { Info, AlertCircle } from 'lucide-react';

interface MetricCardProps {
  metric: MetricData;
  icon: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({ metric, icon }) => {
  const isReaction = metric.key === 'reaction';
  
  // Normalization for visual bar (0-100 scale)
  let percentage = metric.value;
  let labelValue = metric.value.toString();
  
  if (isReaction) {
      // Reaction: 0.1 is best (100%), 2.0 is worst (0%)
      percentage = Math.max(0, Math.min(100, (2.0 - metric.value) / (2.0 - 0.1) * 100));
      labelValue = metric.value.toFixed(2);
  }

  const isGood = isReaction ? metric.value < 0.6 : metric.value >= 60;
  const isExcellent = isReaction ? metric.value < 0.4 : metric.value >= 80;

  // Border color based on status
  let borderColor = 'border-slate-200';
  if (isExcellent) borderColor = 'border-indigo-200';
  else if (!isGood) borderColor = 'border-amber-200';

  return (
    <div className={`bg-white rounded-sm p-4 border-2 ${borderColor} shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)] hover:shadow-md transition-all duration-300 relative flex flex-col h-full`}>
      
      {/* Header */}
      <div className="flex justify-between items-center mb-3 pb-2 border-b border-dashed border-slate-100">
        <div className="flex items-center gap-2">
          <div className="text-slate-600">
            {React.cloneElement(icon as React.ReactElement<any>, { size: 16 })}
          </div>
          <h3 className="text-sm font-bold text-slate-700">{metric.label}</h3>
        </div>
        <div className={`px-2 py-0.5 rounded text-[10px] font-bold ${isExcellent ? 'bg-indigo-100 text-indigo-700' : isGood ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
            {isExcellent ? '优秀' : isGood ? '良好' : '需关注'}
        </div>
      </div>

      {/* Score Display */}
      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-3xl font-mono font-bold text-slate-800 tracking-tighter">{labelValue}</span>
        <span className="text-xs text-slate-400 font-medium">{metric.unit || '分'}</span>
      </div>

      {/* Progress Bar with Reference */}
      <div className="mb-4">
        <div className="flex justify-between text-[10px] text-slate-400 font-mono mb-1">
            <span>低</span>
            <span className="text-slate-500 transform scale-90">参考: {metric.referenceRange}</span>
            <span>高</span>
        </div>
        <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            {/* Markers */}
            <div className="absolute left-[60%] top-0 bottom-0 w-px bg-slate-300 z-10 opacity-50"></div>
            <div className="absolute left-[80%] top-0 bottom-0 w-px bg-slate-300 z-10 opacity-50"></div>
            
            <div 
                className="absolute top-0 left-0 bottom-0 transition-all duration-700 ease-out"
                style={{ 
                    width: `${percentage}%`,
                    backgroundColor: metric.color 
                }}
            ></div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-3 flex-grow">
        <p className="text-xs text-slate-600 leading-relaxed text-justify font-medium">
          {metric.description}
        </p>
      </div>
      
      {/* Advice Box */}
      <div className="mt-auto bg-slate-50 p-2.5 rounded border border-slate-100">
          <div className="flex items-start gap-1.5">
             {isGood ? <Info size={14} className="text-indigo-500 mt-0.5 shrink-0"/> : <AlertCircle size={14} className="text-amber-500 mt-0.5 shrink-0"/>}
             <p className="text-[11px] text-slate-600 leading-tight">
                <span className="font-bold text-slate-700">建议：</span>{metric.advice}
             </p>
          </div>
      </div>
    </div>
  );
};
