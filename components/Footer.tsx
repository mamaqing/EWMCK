import React from 'react';
import { ClipboardList, AlertCircle, CheckCircle2, Stethoscope } from 'lucide-react';

export const Recommendations: React.FC = () => {
  return (
    <div className="bg-white rounded-sm p-6 border-2 border-slate-200 lg:col-span-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]">
      <div className="flex items-center gap-2 mb-5 pb-3 border-b-2 border-slate-100">
        <Stethoscope className="text-indigo-600" size={22} />
        <h3 className="text-lg font-bold text-slate-800 tracking-wider">临床综合建议 (Clinical Summary)</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Priority Actions */}
        <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2 bg-amber-50 p-2 rounded border-l-4 border-amber-500">
                <AlertCircle size={16} className="text-amber-600" /> 重点干预 (Priority)
            </h4>
            <div className="pl-2 space-y-3">
                <div className="relative pl-4 border-l-2 border-slate-200">
                    <p className="text-sm font-bold text-slate-800 mb-1">注意力调节训练</p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                        当前指标显示持续性注意（Sustained Attention）存在波动。建议立即启动A级认知强化方案：每日早晚各进行10分钟舒尔特方格训练。
                    </p>
                </div>
                 <div className="relative pl-4 border-l-2 border-slate-200">
                    <p className="text-sm font-bold text-slate-800 mb-1">逻辑模式识别</p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                       建议通过演绎推理练习来增强前额叶皮层的激活程度，改善抽象思维能力。
                    </p>
                </div>
            </div>
        </div>

        {/* Maintenance & General */}
        <div className="space-y-4">
             <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2 bg-emerald-50 p-2 rounded border-l-4 border-emerald-500">
                <CheckCircle2 size={16} className="text-emerald-600" /> 长期维护 (Maintenance)
            </h4>
            <ul className="space-y-3 pl-2">
                <li className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                        <strong className="text-slate-800">记忆巩固：</strong> 继续维持当前的多模态感官整合训练，保持海马体活跃度。
                    </p>
                </li>
                <li className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                        <strong className="text-slate-800">昼夜节律：</strong> 确保每晚7.5小时睡眠周期，以支持类淋巴系统（Glymphatic System）的脑部代谢废物清除。
                    </p>
                </li>
                <li className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                        <strong className="text-slate-800">营养干预：</strong> 增加富含Omega-3脂肪酸的食物摄入，支持突触可塑性。
                    </p>
                </li>
            </ul>
        </div>
      </div>
    </div>
  );
};
