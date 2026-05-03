export type ReportStatus = 'Processed' | 'Analyzing' | 'Pending' | 'Error';

export interface ReportFile {
  id: string;
  name: string;
  uploadDate: string;
  category: string;
  size: string;
  status: ReportStatus;
}

export interface Metric {
  label: string;
  value: number;
  change: number;
  target?: number;
}

export interface AIInsight {
  type: 'MARGIN OPTIMIZATION' | 'RISK ALERT' | 'STRATEGIC GROWTH';
  title: string;
  description: string;
  isPositive: boolean;
}

export interface PerformanceDatum {
  name: string;
  actual: number;
  forecast: number;
}

export interface SegmentPerformance {
  name: string;
  marketShare: string;
  yoyRevenue: number;
  ebitdaMargin: string;
  status: 'OUTPERFORM' | 'STABLE' | 'UNDERPERFORM';
}

export interface Observations {
  primaryInsights: string;
  riskAssessment: string;
  actionPlan: string;
  tags: string[];
  impactLevel: string;
  probability: string;
}

export type AppView = 'Dashboard' | 'Upload' | 'Observations' | 'Report';
