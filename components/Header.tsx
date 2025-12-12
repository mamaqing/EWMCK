import React from 'react';
import { BrainCircuit, Activity, User } from 'lucide-react';

export const Header: React.FC = () => {
  const today = new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });

  return (
    <header className="bg-slate-900 text-slate-200 shadow-md border-b-4 border-indigo-600 print:hidden">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Brand Area */}
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 text-white p-1.5 rounded shadow-inner">
            <BrainCircuit size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-widest font-sans">脑力<span className="text-indigo-400">测评</span>系统</h1>
            <p className="text-[10px] text-slate-400 font-medium tracking-wider">CLINICAL NEUROCOGNITIVE ASSESSMENT</p>
          </div>
        </div>
        
        {/* Navigation / Info Area */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 text-xs font-mono text-slate-400">
             <div className="flex flex-col items-end border-r border-slate-700 pr-4">
                <span className="scale-90 opacity-70">档案编号</span>
                <span className="text-slate-200 font-bold tracking-wide">CN-2024-8892</span>
             </div>
             <div className="flex flex-col items-end">
                <span className="scale-90 opacity-70">评估日期</span>
                <span className="text-slate-200 font-bold">{today}</span>
             </div>
          </div>
          
          <div className="flex items-center gap-3 pl-4 border-l border-slate-700">
             <div className="flex items-center gap-2">
                 <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                 <span className="text-xs font-medium text-emerald-400">系统在线</span>
             </div>
          </div>
        </div>
      </div>
    </header>
  );
};
