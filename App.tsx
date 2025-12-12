import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { SimulationControl } from './components/SimulationControl';
import { MetricCard } from './components/MetricCard';
import { CognitiveRadar, TrendChart } from './components/Charts';
import { ComparisonChart } from './components/ComparisonChart';
import { Recommendations } from './components/Footer';
import { INITIAL_METRICS, MOCK_TREND_DATA, ICONS, getEvaluation } from './constants';
import { CategoryKey, MetricData } from './types';
import { FileBarChart2, Activity, QrCode, Download } from 'lucide-react';
import * as QRCodeLib from 'qrcode.react';
import html2canvas from 'html2canvas';

const App: React.FC = () => {
  const [metrics, setMetrics] = useState<Record<string, MetricData>>(INITIAL_METRICS);

  // Initialize descriptions on load
  useEffect(() => {
    const updatedMetrics = { ...INITIAL_METRICS };
    (Object.keys(updatedMetrics) as CategoryKey[]).forEach(key => {
        const evalResult = getEvaluation(key, updatedMetrics[key].value);
        updatedMetrics[key].description = evalResult.desc;
        updatedMetrics[key].advice = evalResult.advice;
    });
    setMetrics(updatedMetrics);
  }, []);

  const handleMetricChange = (key: CategoryKey, value: number) => {
    // Get dynamic evaluation text based on new value
    const evalResult = getEvaluation(key, value);

    setMetrics((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        value: value,
        description: evalResult.desc,
        advice: evalResult.advice
      },
    }));
  };

  const resetMetrics = () => {
    const updatedMetrics = { ...INITIAL_METRICS };
    (Object.keys(updatedMetrics) as CategoryKey[]).forEach(key => {
        const evalResult = getEvaluation(key, updatedMetrics[key].value);
        updatedMetrics[key].description = evalResult.desc;
        updatedMetrics[key].advice = evalResult.advice;
    });
    setMetrics(updatedMetrics);
  };

  // Calculate overall grade based on metrics (simplified weight)
  const overallScore = useMemo(() => {
    const { memory, logic, attention, executive, reaction } = metrics;
    // Reaction needs to be inverted for score (0.1 is best, 2.0 is worst)
    const reactionScore = Math.max(0, Math.min(100, (2.0 - reaction.value) / (2.0 - 0.1) * 100));
    
    const total = memory.value + logic.value + attention.value + executive.value + reactionScore;
    return Math.round(total / 5);
  }, [metrics]);

  const getGrade = (score: number) => {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    if (score >= 40) return 'D';
    return 'F';
  };

  // Update chart data with current simulation values
  const trendData = useMemo(() => {
    const current = {
        name: '当前',
        memory: metrics.memory.value,
        logic: metrics.logic.value,
        attention: metrics.attention.value,
        executive: metrics.executive.value
    };
    return [...MOCK_TREND_DATA.slice(0, -1), current];
  }, [metrics]);

  // QR Code state
  const [showQRCode, setShowQRCode] = useState(false);
  // 报告容器ref用于截图
  const reportRef = useRef<HTMLDivElement>(null);
  // 本地图片URL状态
  const [localImageURL, setLocalImageURL] = useState<string>('');
  // 二维码URL，使用完整的GitHub Pages URL以便扫码后能正确访问
  // 确保图片文件已上传到GitHub的"报告图片"目录
  const reportURL = "https://mamaqing.github.io/EWMCK/报告图片/认知评估报告.png";
  // 图片加载状态
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div 
      className="min-h-screen pb-20 font-sans text-slate-800"
      style={{
        backgroundColor: '#e2e8f0',
        backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
        backgroundSize: '32px 32px'
      }}
    >
      <Header />

      <SimulationControl metrics={metrics} onChange={handleMetricChange} onReset={resetMetrics} />

      {/* Main Report "Paper" Container */}
      <main 
        ref={reportRef}
        className="max-w-6xl mx-auto px-10 py-12 bg-white shadow-2xl relative print:shadow-none print:border-none print:p-0 overflow-hidden"
        style={{
            // 专业网格纹理：模拟医疗心电图纸或工程绘图纸的细腻方格
            backgroundImage: `
                linear-gradient(to right, rgba(226, 232, 240, 0.5) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(226, 232, 240, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
        }}
      >
        
        {/* Faint Watermark Bottom Right */}
        <div className="absolute bottom-10 right-10 opacity-[0.02] pointer-events-none rotate-[-10deg]">
            <Activity size={400} />
        </div>
        
        {/* Top Gradient Line */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-500"></div>

        {/* Decorative Top Badge */}
        <div className="absolute top-8 right-10 opacity-5 pointer-events-none">
            <FileBarChart2 size={120} />
        </div>

        {/* Report Title */}
        <div className="border-b-2 border-slate-800 mb-10 pb-4 flex justify-between items-end relative z-10 bg-white/50 backdrop-blur-[2px]">
            <div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                  <div className="w-3 h-8 bg-indigo-600"></div>
                  神经认知综合评估报告
                </h2>
                <p className="text-slate-500 text-sm mt-1 ml-6 font-serif italic tracking-wide">Neurocognitive Comprehensive Assessment Report</p>
            </div>
            <div className="text-right">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Report Status</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <p className="text-sm font-bold text-slate-700">FINALIZED</p>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-10 relative z-10">
          
          {/* Main Assessment Card (Left Column) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
             
             {/* Score & Summary Row */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Score Box - Updated UI: Gradient Blue/Indigo */}
                <div className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white p-6 shadow-xl rounded-xl flex flex-col justify-center items-center relative overflow-hidden group border border-indigo-500/50">
                    {/* Abstract background shapes */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl opacity-10 -mr-20 -mt-20 group-hover:opacity-20 transition-opacity duration-700"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-400 rounded-full blur-3xl opacity-20 -ml-10 -mb-10 group-hover:opacity-30 transition-opacity duration-700"></div>
                    
                    <span className="text-xs text-indigo-100 font-medium uppercase tracking-widest mb-3 border-b border-indigo-400/30 pb-1">综合评分 (Index)</span>
                    <span className="text-7xl font-bold tracking-tighter mb-2 font-mono text-white drop-shadow-md">{overallScore}</span>
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 mt-2 shadow-inner">
                        <span className={`text-sm font-bold ${overallScore >= 80 ? 'text-emerald-300' : overallScore >= 60 ? 'text-blue-200' : 'text-amber-300'}`}>
                          等级评定: {getGrade(overallScore)}
                        </span>
                    </div>
                </div>

                {/* Text Summary */}
                <div className="md:col-span-2 bg-white p-6 rounded-xl border border-slate-200 relative hover:border-indigo-200 transition-colors duration-300 shadow-sm">
                    {/* Decorative corner tag */}
                    <div className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-indigo-500 rounded-tl-sm"></div>
                    <div className="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 border-indigo-500 rounded-tr-sm"></div>
                    <div className="absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-indigo-500 rounded-bl-sm"></div>
                    <div className="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-indigo-500 rounded-br-sm"></div>

                    <div className="flex items-center gap-2 mb-3">
                        <span className="bg-indigo-50 text-indigo-700 text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider rounded border border-indigo-100">
                            评估综述 / Executive Summary
                        </span>
                    </div>
                    <div>
                         <p className="text-sm text-slate-700 leading-7 text-justify font-medium">
                            受测者当前综合神经认知指数为 <strong>{overallScore}</strong>。
                            {overallScore >= 80 ? '整体认知功能表现优异，神经回路连接效率处于高水平。' : overallScore >= 60 ? '整体认知功能处于平均水平，各项指标发展较为均衡。' : '整体认知功能表现出明显的缺陷，需要专业的康复介入。'}
                            数据分析显示，<strong>{metrics.memory.value > metrics.logic.value ? '记忆提取与存储' : '逻辑逻辑推理与运算'}</strong>是目前的主要优势领域。
                            {metrics.executive.value < 60 || metrics.attention.value < 60 ? <span className="text-amber-700 bg-amber-50 px-1 rounded mx-1">警示：执行功能或注意力指标低于参考范围，提示前额叶网络可能存在功能性激活不足。</span> : '所有核心认知领域均处于正常或优势范围内。'}
                            建议参考下方的详细指标分析制定个性化训练方案。
                        </p>
                    </div>
                </div>
             </div>

             {/* Comparison Bar Chart Section */}
             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-sm font-bold text-slate-800 uppercase flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                    维度横向对比 (Dimensional Analysis)
                  </h3>
                  <div className="h-px flex-grow bg-slate-100 ml-4"></div>
                </div>
                <ComparisonChart metrics={metrics} />
             </div>

          </div>

          {/* Right Column: Radar & Trend */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Radar */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm h-full flex flex-col relative">
               <div className="absolute top-4 left-5 flex flex-col">
                 <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">认知画像</h3>
                 <span className="text-[10px] text-slate-400">Cognitive Profile</span>
               </div>
               <div className="flex-grow mt-6">
                 <CognitiveRadar metrics={metrics} />
               </div>
            </div>

            {/* Trend */}
             <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm h-full flex flex-col relative">
               <div className="absolute top-4 left-5 flex flex-col">
                 <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">趋势追踪</h3>
                 <span className="text-[10px] text-slate-400">Trend Tracking (8 Weeks)</span>
               </div>
               <div className="flex-grow mt-8">
                 <TrendChart data={trendData} />
               </div>
            </div>
          </div>
        </div>

        {/* Detailed Metrics Row */}
        <div className="mb-10 relative z-10">
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-tight mb-5 flex items-center gap-2">
                <div className="w-8 h-1 bg-slate-900 rounded-full"></div>
                详细指标分析 (Detailed Metrics)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            <MetricCard metric={metrics.memory} icon={ICONS.memory} />
            <MetricCard metric={metrics.logic} icon={ICONS.logic} />
            <MetricCard metric={metrics.attention} icon={ICONS.attention} />
            <MetricCard metric={metrics.executive} icon={ICONS.executive} />
            <MetricCard metric={metrics.reaction} icon={ICONS.reaction} />
            </div>
        </div>

        {/* Footer Advice */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 relative z-10">
             <Recommendations />
        </div>

        {/* 生成报告图片和二维码 */}
        <div className="mt-10 relative z-10 flex flex-col items-center">
          <div className="flex gap-4 mb-6">
            <button 
              onClick={async () => {
                if (!reportRef.current) return;
                
                try {
                  // 使用html2canvas生成报告图片
                  const canvas = await html2canvas(reportRef.current, {
                    scale: 2, // 提高分辨率
                    useCORS: true,
                    backgroundColor: '#ffffff'
                  });
                  
                  // 创建图片URL
                  const imgURL = canvas.toDataURL('image/png');
                  setLocalImageURL(imgURL);
                  
                  // 保存图片到本地
                  const link = document.createElement('a');
                  link.download = '认知评估报告.png';
                  link.href = imgURL;
                  link.click();
                  
                  // 同时显示二维码
                  setShowQRCode(true);
                  
                  // 提示用户扫码查看
                  alert('报告图片已生成并保存！二维码已更新，可以直接扫码查看本地生成的报告图片。');
                } catch (error) {
                  console.error('生成报告图片失败:', error);
                  alert('生成报告图片失败，请重试');
                }
              }}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <Download size={18} />
              生成并保存报告图片
            </button>
            
            <button 
              onClick={() => setShowQRCode(!showQRCode)}
              className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <QrCode size={18} />
              {showQRCode ? '隐藏二维码' : '生成二维码'}
            </button>
          </div>
          
          {showQRCode && (
            <div className="mt-6 p-4 bg-white rounded-lg border border-slate-200 shadow-md">
              <div className="mb-3 text-center text-sm text-slate-600">报告访问二维码</div>
              <QRCodeLib.QRCodeSVG 
                value={reportURL} 
                size={180} 
                bgColor="#ffffff" 
                fgColor="#000000"
                level="H"
                includeMargin={true}
              />
              <div className="mt-3 text-center text-xs text-slate-500">扫描二维码查看完整报告</div>
            </div>
          )}
        </div>

        {/* Footer Signature Area */}
        <div className="mt-16 pt-8 border-t border-slate-200 flex justify-between text-xs text-slate-400 font-mono relative z-10">
            <div>
                System Generated by NeuroMetric Pro v3.1
                <br/>
                Certificate Hash: <span className="text-slate-300">8f92a-29301-x9</span>
            </div>
            <div className="text-right">
                Digitally Verified
                <br/>
                Dr. AI Assistant
            </div>
        </div>

      </main>
    </div>
  );
};

export default App;
