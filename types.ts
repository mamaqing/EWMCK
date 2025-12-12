export type CategoryKey = 'memory' | 'logic' | 'attention' | 'executive' | 'reaction';

export interface MetricData {
  key: CategoryKey;
  label: string;
  value: number; // 0-100 for most, seconds for reaction
  unit?: string;
  color: string;
  bgColor: string;
  description: string;
  advice: string;
  referenceRange: string;
}

export interface ChartDataPoint {
  subject: string;
  A: number;
  fullMark: number;
}

export interface TrendDataPoint {
  name: string;
  memory: number;
  logic: number;
  attention: number;
  executive: number;
}

export interface EvaluationRule {
  min: number;
  max: number;
  description: string;
  advice: string;
}
