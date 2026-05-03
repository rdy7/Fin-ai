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
  format?: 'currency' | 'percent' | 'number';
  desc?: string;
}

export interface AIInsight {
  type: 'EFICIÊNCIA' | 'RISCO' | 'OPORTUNIDADE' | 'ESTRATÉGICO';
  title: string;
  description: string;
  isPositive: boolean;
}

export interface DREEntry {
  name: string;
  value: number;
  type: 'revenue' | 'expense' | 'result';
}

export interface BalanceSheetEntry {
  name: string;
  value: number;
  category: 'Asset' | 'Liability' | 'Equity';
  subCategory: string;
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
export type DashboardTab = 'Overview' | 'DRE' | 'BalanceSheet';

export interface ExtraordinaryEvent {
  id: string;
  description: string;
  value: number;
  type: 'revenue' | 'expense';
  category: string;
}



