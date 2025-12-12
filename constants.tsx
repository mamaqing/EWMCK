import { MetricData, TrendDataPoint, CategoryKey, EvaluationRule } from './types';
import { Brain, Calculator, Zap, Activity, Timer } from 'lucide-react';

// 评价规则库
export const EVALUATION_RULES: Record<CategoryKey, EvaluationRule[]> = {
  memory: [
    { min: 0, max: 59, description: '海马体短期记忆编码效率较低，信息留存时间短，回溯近期事件存在明显困难。', advice: '建议进行数字广度训练（倒背数字），并尝试使用“宫殿记忆法”来辅助记忆。' },
    { min: 60, max: 79, description: '记忆功能处于平均水平，对于日常生活信息能正常处理，但在高负荷信息输入下可能出现遗漏。', advice: '通过学习新语言或乐器来刺激神经可塑性，增强海马体突触连接。' },
    { min: 80, max: 100, description: '海马体回路功能极其活跃，长时程增强效应（LTP）显著，展现出卓越的信息提取能力。', advice: '保持当前的阅读和学习习惯，可尝试高难度的记忆竞技训练以维持巅峰状态。' }
  ],
  logic: [
    { min: 0, max: 59, description: '前额叶皮层演绎推理网络激活不足，在处理抽象概念和复杂因果关系时感到吃力。', advice: '建议每天进行数独、象棋或编程逻辑训练，培养符号推理能力。' },
    { min: 60, max: 79, description: '逻辑思维清晰，能够处理常规的问题解决任务，但在多维度复杂逻辑链条中可能出现断层。', advice: '尝试阅读哲学或逻辑学书籍，练习绘制思维导图来分解复杂问题。' },
    { min: 80, max: 100, description: '具备极强的抽象概括能力和演绎推理能力，前额叶神经网络连接紧密高效。', advice: '参与复杂的策略博弈或科研项目，挑战更高阶的认知任务。' }
  ],
  attention: [
    { min: 0, max: 59, description: '背侧注意网络（DAN）稳定性差，极易受到外部环境干扰，难以维持长时间专注。', advice: '强烈推荐舒尔特方格训练（每日3组），并配合正念冥想练习以提升抗干扰能力。' },
    { min: 60, max: 79, description: '注意力集中度尚可，但在单调或枯燥的任务中容易出现神游现象（Mind Wandering）。', advice: '采用番茄工作法（25分钟工作+5分钟休息），人为制造专注节奏。' },
    { min: 80, max: 100, description: '顶叶和额叶的注意控制网络功能强大，具备如激光般精准且持久的专注力。', advice: '适度休息，避免因过度专注导致的视觉和精神疲劳。' }
  ],
  executive: [
    { min: 0, max: 59, description: '执行控制网络功能薄弱，表现为冲动控制差、计划执行力低，多任务切换时认知损耗大。', advice: '利用外部工具（如清单、日历）辅助管理，将大任务拆解为微小步骤执行。' },
    { min: 60, max: 79, description: '能够制定并执行计划，但在突发情况下认知灵活性（Cognitive Flexibility）表现一般。', advice: '练习在不同性质的任务间快速切换，例如一边听新闻一边整理物品。' },
    { min: 80, max: 100, description: '展现出卓越的自我监控和调节能力，前扣带回（ACC）功能活跃，任务切换流畅。', advice: '可以承担复杂的管理职责或多线并行的项目统筹工作。' }
  ],
  reaction: [
    // 反应时间越短越好，逻辑反转
    { min: 0.61, max: 2.0, description: '视觉-运动神经传导通路潜伏期较长，对突发刺激的响应速度明显滞后。', advice: '建议进行乒乓球、羽毛球等球类运动，训练手眼协调和反射弧速度。' },
    { min: 0.41, max: 0.60, description: '神经传导速度处于正常人群平均范围，能够应对日常驾驶和操作需求。', advice: '可以通过电子竞技类游戏或反应球训练来进一步缩短反应时。' },
    { min: 0.1, max: 0.40, description: '神经反射速度极快，运动皮层与肌肉效应器之间的信号传输无延迟。', advice: '保持高强度的体育锻炼，维持神经系统的敏锐度。' }
  ]
};

// 辅助函数：根据分数获取评价
export const getEvaluation = (key: CategoryKey, value: number): { desc: string, advice: string } => {
  const rules = EVALUATION_RULES[key];
  for (const rule of rules) {
    if (value >= rule.min && value <= rule.max) {
      return { desc: rule.description, advice: rule.advice };
    }
  }
  // Fallback
  return { desc: '数据分析中...', advice: '暂无建议' };
};

export const INITIAL_METRICS: Record<string, MetricData> = {
  memory: {
    key: 'memory',
    label: '记忆功能',
    value: 85,
    color: '#6366f1', // Indigo
    bgColor: 'bg-indigo-500',
    description: '', // Will be filled dynamically
    advice: '', // Will be filled dynamically
    referenceRange: '75 - 95'
  },
  logic: {
    key: 'logic',
    label: '逻辑推理',
    value: 27,
    color: '#0ea5e9', // Sky
    bgColor: 'bg-sky-500',
    description: '',
    advice: '',
    referenceRange: '60 - 85'
  },
  attention: {
    key: 'attention',
    label: '注意力',
    value: 24,
    color: '#f59e0b', // Amber
    bgColor: 'bg-amber-500',
    description: '',
    advice: '',
    referenceRange: '50 - 80'
  },
  executive: {
    key: 'executive',
    label: '执行功能',
    value: 50,
    color: '#10b981', // Emerald
    bgColor: 'bg-emerald-500',
    description: '',
    advice: '',
    referenceRange: '55 - 85'
  },
  reaction: {
    key: 'reaction',
    label: '反应速度',
    value: 0.49,
    unit: 's',
    color: '#64748b', // Slate
    bgColor: 'bg-slate-500',
    description: '',
    advice: '',
    referenceRange: '0.20 - 0.45'
  }
};

export const MOCK_TREND_DATA: TrendDataPoint[] = [
  { name: '第1周', memory: 65, logic: 40, attention: 30, executive: 45 },
  { name: '第2周', memory: 68, logic: 38, attention: 35, executive: 48 },
  { name: '第3周', memory: 75, logic: 35, attention: 25, executive: 50 },
  { name: '第4周', memory: 72, logic: 30, attention: 28, executive: 52 },
  { name: '第5周', memory: 80, logic: 28, attention: 22, executive: 48 },
  { name: '第6周', memory: 82, logic: 25, attention: 25, executive: 51 },
  { name: '第7周', memory: 84, logic: 29, attention: 26, executive: 49 },
  { name: '当前', memory: 85, logic: 27, attention: 24, executive: 50 },
];

export const ICONS = {
  memory: <Brain className="w-5 h-5" />,
  logic: <Calculator className="w-5 h-5" />,
  attention: <Zap className="w-5 h-5" />,
  executive: <Activity className="w-5 h-5" />,
  reaction: <Timer className="w-5 h-5" />,
};
