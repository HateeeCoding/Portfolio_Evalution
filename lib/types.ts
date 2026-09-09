export type MarketCap = 'Large' | 'Mid' | 'Small' | 'Micro';

export type ActionRecommendation = 'TRIM' | 'HOLD' | 'ACCUMULATE' | 'REVIEW / HARVEST';

export interface Holding {
  id: string;
  symbol: string;
  name: string;
  sector: string;
  marketCap: MarketCap;
  investedAmount: number;
  currentValue: number;
  aiScore: number; // 0-100
  peRatio: number;
  pbRatio: number;
  beta: number;
  notes?: string;
}

export interface MetricEvaluation {
  id: string;
  title: string;
  score: number; // 0-100
  status: 'critical' | 'warning' | 'fair' | 'good' | 'excellent';
  statusLabel: string;
  headline: string;
  keyMetricLabel: string;
  keyMetricValue: string;
  benchmarkValue?: string;
  explanation: string;
  impactVerdict: string;
  suggestedAction: string;
  iconName: string;
}

export interface Recommendation {
  id: string;
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  potentialImpact: string;
  actionType: 'TRIM' | 'REBALANCE' | 'HARVEST' | 'DIVERSIFY';
  stockSymbol?: string;
  suggestedRebalanceAmount?: number;
}

export interface PortfolioSummary {
  totalValue: number;
  totalInvested: number;
  totalRupeeGain: number;
  totalPercentGain: number;
  holdingsCount: number;
  gainersCount: number;
  losersCount: number;
  winRate: number; // %
  topHoldingWeight: number; // %
  topHoldingSymbol: string;
  top3HoldingsWeight: number; // %
  overallHealthScore: number; // 0-100
  overallVerdict: string;
}
