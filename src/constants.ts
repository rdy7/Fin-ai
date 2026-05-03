import { ReportFile, AIInsight, PerformanceDatum, SegmentPerformance } from './types';

export const MOCK_REPORTS: ReportFile[] = [
  {
    id: '1',
    name: 'Q3_Revenue_Forecast.pdf',
    uploadDate: 'Uploaded 2h ago',
    category: 'Institutional Audit',
    size: '4.2 MB',
    status: 'Processed'
  },
  {
    id: '2',
    name: 'Global_Equities_Exposure.xlsx',
    uploadDate: 'Uploaded 5h ago',
    category: 'Asset Management',
    size: '12.8 MB',
    status: 'Analyzing'
  },
  {
    id: '3',
    name: 'Risk_Threshold_v4.csv',
    uploadDate: 'Uploaded Yesterday',
    category: 'Risk Operations',
    size: '842 KB',
    status: 'Processed'
  }
];

export const MOCK_INSIGHTS: AIInsight[] = [
  {
    type: 'MARGIN OPTIMIZATION',
    title: 'Predicted EBITDA Expansion',
    description: 'EBITDA expansion of 420bps predicted for next quarter due to operational efficiencies in the APAC sector.',
    isPositive: true
  },
  {
    type: 'RISK ALERT',
    title: 'Currency Fluctuations',
    description: 'Currency fluctuations in emerging markets may impact net income by approximately 3.4%.',
    isPositive: false
  },
  {
    type: 'STRATEGIC GROWTH',
    title: 'R&D Investment Alignment',
    description: 'Capital allocation strategy aligns with high-yield reinvestment opportunities in R&D.',
    isPositive: true
  }
];

export const MOCK_PERFORMANCE: PerformanceDatum[] = [
  { name: 'Q3-22', actual: 40, forecast: 60 },
  { name: 'Q4-22', actual: 48, forecast: 72 },
  { name: 'Q1-23', actual: 85, forecast: 75 },
  { name: 'Q2-23', actual: 92, forecast: 80 },
  { name: 'Q3-23', actual: 100, forecast: 85 }
];

export const MOCK_SEGMENTS: SegmentPerformance[] = [
  {
    name: 'North American Retail',
    marketShare: '42.8%',
    yoyRevenue: 15.2,
    ebitdaMargin: '18.4%',
    status: 'OUTPERFORM'
  },
  {
    name: 'European Logistics',
    marketShare: '28.1%',
    yoyRevenue: 8.4,
    ebitdaMargin: '12.1%',
    status: 'STABLE'
  },
  {
    name: 'APAC Tech Solutions',
    marketShare: '15.5%',
    yoyRevenue: -2.3,
    ebitdaMargin: '24.8%',
    status: 'UNDERPERFORM'
  },
  {
    name: 'Global Services',
    marketShare: '13.6%',
    yoyRevenue: 4.9,
    ebitdaMargin: '9.2%',
    status: 'STABLE'
  }
];
