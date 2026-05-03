import { ReportFile, AIInsight, PerformanceDatum, SegmentPerformance, DREEntry, BalanceSheetEntry } from './types';

export const MOCK_REPORTS: ReportFile[] = [
  {
    id: '1',
    name: 'DRE_Consolidado_2023.pdf',
    uploadDate: 'Uploaded 2h ago',
    category: 'DRE',
    size: '4.2 MB',
    status: 'Processed'
  },
  {
    id: '2',
    name: 'Balanco_Patrimonial_Q3.xlsx',
    uploadDate: 'Uploaded 5h ago',
    category: 'Balanço',
    size: '12.8 MB',
    status: 'Processed'
  },
  {
    id: '3',
    name: 'Fluxo_Caixa_Mensal.csv',
    uploadDate: 'Uploaded Yesterday',
    category: 'Tesouraria',
    size: '842 KB',
    status: 'Processed'
  }
];

export const MOCK_INSIGHTS: AIInsight[] = [
  {
    type: 'EFICIÊNCIA',
    title: 'Otimização de Margem EBTIDA',
    description: 'Aumento de 420bps na margem EBITDA previsto devido a eficiências operacionais e redução de custos fixos.',
    isPositive: true
  },
  {
    type: 'RISCO',
    title: 'Exposição Cambial',
    description: 'Variações cambiais em mercados emergentes podem impactar o lucro líquido em aproximadamente 3.4%.',
    isPositive: false
  },
  {
    type: 'OPORTUNIDADE',
    title: 'Desalavancagem Financeira',
    description: 'A redução do endividamento permite novas linhas de crédito com taxas mais competitivas.',
    isPositive: true
  }
];

export const MOCK_PERFORMANCE: PerformanceDatum[] = [
  { name: 'Q3-22', actual: 4200000, forecast: 4000000 },
  { name: 'Q4-22', actual: 4800000, forecast: 4500000 },
  { name: 'Q1-23', actual: 5200000, forecast: 5000000 },
  { name: 'Q2-23', actual: 5500000, forecast: 5300000 },
  { name: 'Q3-23', actual: 5800000, forecast: 5600000 }
];

export const MOCK_DRE: DREEntry[] = [
  { name: 'Receita Bruta', value: 1200000, type: 'revenue' },
  { name: 'Deduções', value: -200000, type: 'expense' },
  { name: 'Receita Líquida', value: 1000000, type: 'result' },
  { name: 'CPV', value: -400000, type: 'expense' },
  { name: 'Lucro Bruto', value: 600000, type: 'result' },
  { name: 'Despesas Adm', value: -150000, type: 'expense' },
  { name: 'Despesas Vendas', value: -100000, type: 'expense' },
  { name: 'EBITDA', value: 350000, type: 'result' },
  { name: 'Depreciação', value: -50000, type: 'expense' },
  { name: 'EBIT', value: 300000, type: 'result' },
  { name: 'Res. Financeiro', value: -20000, type: 'expense' },
  { name: 'IRPJ/CSLL', value: -80000, type: 'expense' },
  { name: 'Lucro Líquido', value: 200000, type: 'result' },
];

export const MOCK_BALANCE_SHEET: BalanceSheetEntry[] = [
  { name: 'Caixa e Equiv.', value: 450000, category: 'Asset', subCategory: 'Circulante' },
  { name: 'Contas a Receber', value: 800000, category: 'Asset', subCategory: 'Circulante' },
  { name: 'Estoques', value: 600000, category: 'Asset', subCategory: 'Circulante' },
  { name: 'Imobilizado', value: 1500000, category: 'Asset', subCategory: 'Não Circulante' },
  { name: 'Intangível', value: 400000, category: 'Asset', subCategory: 'Não Circulante' },
  { name: 'Fornecedores', value: 550000, category: 'Liability', subCategory: 'Circulante' },
  { name: 'Empréstimos CP', value: 300000, category: 'Liability', subCategory: 'Circulante' },
  { name: 'Empréstimos LP', value: 1200000, category: 'Liability', subCategory: 'Não Circulante' },
  { name: 'Capital Social', value: 1000000, category: 'Equity', subCategory: 'Patrimônio' },
  { name: 'Lucros Acum.', value: 700000, category: 'Equity', subCategory: 'Patrimônio' },
];

export const MOCK_SEGMENTS: SegmentPerformance[] = [
  {
    name: 'Varejo Alimentar',
    marketShare: '42.8%',
    yoyRevenue: 15.2,
    ebitdaMargin: '18.4%',
    status: 'OUTPERFORM'
  },
  {
    name: 'E-commerce',
    marketShare: '28.1%',
    yoyRevenue: 8.4,
    ebitdaMargin: '12.1%',
    status: 'STABLE'
  },
  {
    name: 'Logística B2B',
    marketShare: '15.5%',
    yoyRevenue: -2.3,
    ebitdaMargin: '24.8%',
    status: 'UNDERPERFORM'
  },
  {
    name: 'Serviços Globais',
    marketShare: '13.6%',
    yoyRevenue: 4.9,
    ebitdaMargin: '9.2%',
    status: 'STABLE'
  }
];

