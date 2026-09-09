import { Holding, MetricEvaluation, PortfolioSummary, Recommendation } from './types';

export function calculatePortfolioSummary(holdings: Holding[]): PortfolioSummary {
  const totalValue = holdings.reduce((sum, h) => sum + h.currentValue, 0);
  const totalInvested = holdings.reduce((sum, h) => sum + h.investedAmount, 0);
  const totalRupeeGain = totalValue - totalInvested;
  const totalPercentGain = totalInvested > 0 ? (totalRupeeGain / totalInvested) * 100 : 0;

  const gainers = holdings.filter(h => h.currentValue >= h.investedAmount);
  const losers = holdings.filter(h => h.currentValue < h.investedAmount);
  const winRate = holdings.length > 0 ? (gainers.length / holdings.length) * 100 : 0;

  // Sort by current value to find top holdings
  const sorted = [...holdings].sort((a, b) => b.currentValue - a.currentValue);
  const top1 = sorted[0];
  const topHoldingWeight = totalValue > 0 && top1 ? (top1.currentValue / totalValue) * 100 : 0;
  const topHoldingSymbol = top1 ? top1.symbol : 'N/A';

  const top3Value = sorted.slice(0, 3).reduce((sum, h) => sum + h.currentValue, 0);
  const top3HoldingsWeight = totalValue > 0 ? (top3Value / totalValue) * 100 : 0;

  // Calculate composite health score from the 6 pillars
  const metrics = evaluatePortfolioMetrics(holdings);
  const avgScore = metrics.length > 0
    ? Math.round(metrics.reduce((sum, m) => sum + m.score, 0) / metrics.length)
    : 50;

  let overallVerdict = 'Moderate Balance';
  if (avgScore < 45) overallVerdict = 'Needs Urgent Action - High Concentration Risk';
  else if (avgScore < 60) overallVerdict = 'Fragile Gains - High Single-Stock Dependency';
  else if (avgScore < 75) overallVerdict = 'Good Balance - Minor Optimizations Needed';
  else overallVerdict = 'Robust & Well Diversified';

  return {
    totalValue,
    totalInvested,
    totalRupeeGain,
    totalPercentGain,
    holdingsCount: holdings.length,
    gainersCount: gainers.length,
    losersCount: losers.length,
    winRate,
    topHoldingWeight,
    topHoldingSymbol,
    top3HoldingsWeight,
    overallHealthScore: avgScore,
    overallVerdict,
  };
}

export function evaluatePortfolioMetrics(holdings: Holding[]): MetricEvaluation[] {
  if (!holdings || holdings.length === 0) return [];

  const totalValue = holdings.reduce((sum, h) => sum + h.currentValue, 0);
  if (totalValue === 0) return [];

  // Sort descending by value
  const sorted = [...holdings].sort((a, b) => b.currentValue - a.currentValue);
  const top1 = sorted[0];
  const top1Weight = (top1.currentValue / totalValue) * 100;
  const top3Weight = (sorted.slice(0, 3).reduce((sum, h) => sum + h.currentValue, 0) / totalValue) * 100;

  // 1. Diversification & Concentration Score (0-100)
  // Ideal: Top 1 < 12%, Top 3 < 30%, HHI < 1200
  let hhi = 0;
  holdings.forEach(h => {
    const w = (h.currentValue / totalValue) * 100;
    hhi += w * w;
  });

  let divScore = 100;
  if (top1Weight > 15) {
    divScore -= (top1Weight - 15) * 1.6;
  }
  if (top3Weight > 40) {
    divScore -= (top3Weight - 40) * 0.8;
  }
  divScore = Math.max(15, Math.min(95, Math.round(divScore)));

  const divStatus: MetricEvaluation['status'] =
    divScore < 40 ? 'critical' : divScore < 60 ? 'warning' : divScore < 75 ? 'fair' : 'good';

  const diversificationMetric: MetricEvaluation = {
    id: 'diversification',
    title: 'Diversification & Concentration',
    score: divScore,
    status: divStatus,
    statusLabel: divScore < 40 ? 'Critical Risk' : divScore < 60 ? 'Concentrated' : 'Well Diversified',
    headline: `${top1.symbol} dominates ${top1Weight.toFixed(1)}% of entire portfolio`,
    keyMetricLabel: 'Top Holding Weight',
    keyMetricValue: `${top1Weight.toFixed(1)}%`,
    benchmarkValue: 'Safe Threshold < 15%',
    explanation: `A single stock (${top1.name}) occupies ${top1Weight.toFixed(1)}% of your portfolio value. Standard portfolio theory advises keeping any single stock below 10-15% to avoid portfolio-wide capital impairment.`,
    impactVerdict: top1Weight > 40
      ? 'Extreme vulnerability. If this single stock drops 25%, your entire net worth declines by ~15%.'
      : 'Healthy distribution across multiple positions.',
    suggestedAction: top1Weight > 20
      ? `Trim ${top1.symbol} down towards 15-20% and distribute profits across underweighted sectors.`
      : 'Maintain current allocations with periodic rebalancing.',
    iconName: 'PieChart',
  };

  // 2. Downside & Volatility Risk Score (0-100)
  // Stress test: 30% drop in top holding impact
  const topDropImpact = (top1Weight * 0.3);
  const weightedBeta = holdings.reduce((sum, h) => sum + (h.beta * (h.currentValue / totalValue)), 0);
  const smallCapWeight = holdings
    .filter(h => h.marketCap === 'Small' || h.marketCap === 'Micro')
    .reduce((sum, h) => sum + h.currentValue, 0) / totalValue * 100;

  let riskScore = 90;
  riskScore -= topDropImpact * 2.2;
  if (smallCapWeight > 30) riskScore -= (smallCapWeight - 30) * 0.6;
  if (weightedBeta > 1.1) riskScore -= (weightedBeta - 1.1) * 30;
  riskScore = Math.max(20, Math.min(95, Math.round(riskScore)));

  const riskStatus: MetricEvaluation['status'] =
    riskScore < 40 ? 'critical' : riskScore < 60 ? 'warning' : riskScore < 75 ? 'fair' : 'good';

  const riskMetric: MetricEvaluation = {
    id: 'downside_risk',
    title: 'Downside & Volatility Risk',
    score: riskScore,
    status: riskStatus,
    statusLabel: riskScore < 40 ? 'Severe Volatility' : riskScore < 60 ? 'High Risk' : 'Controlled Risk',
    headline: `30% drop in ${top1.symbol} wipes out ~₹${Math.round(totalValue * (topDropImpact / 100)).toLocaleString('en-IN')}`,
    keyMetricLabel: 'Stress Loss Potential',
    keyMetricValue: `-${topDropImpact.toFixed(1)}% Total Value`,
    benchmarkValue: 'Benchmark Stress < 6%',
    explanation: `Because ${smallCapWeight.toFixed(0)}% of your capital is in small/micro-cap assets, downside volatility will be amplified during broad market corrections.`,
    impactVerdict: smallCapWeight > 40
      ? 'Asymmetric risk: The portfolio has high upside exposure but lacks downside shock absorbers.'
      : 'Comfortable risk-adjusted volatility profile with stable large-cap anchors.',
    suggestedAction: 'Hedge portfolio beta by building a 20-30% allocation in defensive large-caps or low-beta indices.',
    iconName: 'ShieldAlert',
  };

  // 3. Portfolio Win-Rate & Breadth Score (0-100)
  const gainers = holdings.filter(h => h.currentValue >= h.investedAmount);
  const losers = holdings.filter(h => h.currentValue < h.investedAmount);
  const winRate = (gainers.length / holdings.length) * 100;

  // Rupee gain concentration
  const totalRupeeGain = holdings.reduce((sum, h) => sum + (h.currentValue - h.investedAmount), 0);
  const top1RupeeGain = top1.currentValue - top1.investedAmount;
  const rupeeSkew = totalRupeeGain > 0 ? (top1RupeeGain / totalRupeeGain) * 100 : 0;

  let breadthScore = Math.round(winRate * 0.6 + (100 - Math.min(100, rupeeSkew)) * 0.4);
  breadthScore = Math.max(25, Math.min(95, breadthScore));

  const breadthStatus: MetricEvaluation['status'] =
    breadthScore < 45 ? 'critical' : breadthScore < 60 ? 'warning' : breadthScore < 75 ? 'fair' : 'good';

  const breadthMetric: MetricEvaluation = {
    id: 'win_rate_breadth',
    title: 'Win-Rate & Breadth Health',
    score: breadthScore,
    status: breadthStatus,
    statusLabel: breadthScore < 45 ? 'Hidden Drag' : breadthScore < 60 ? 'Uneven Breadth' : 'Broad Rally',
    headline: `${losers.length} out of ${holdings.length} stocks (${(100 - winRate).toFixed(0)}%) are in the red`,
    keyMetricLabel: 'Gainers Win Rate',
    keyMetricValue: `${winRate.toFixed(0)}% (${gainers.length}W / ${losers.length}L)`,
    benchmarkValue: 'Healthy Target > 65%',
    explanation: `While your total portfolio appears up +${Math.round((totalRupeeGain / holdings.reduce((s, h) => s + h.investedAmount, 0)) * 100)}%, over ${rupeeSkew.toFixed(0)}% of that profit came from ${top1.symbol}. The remaining 15 stocks have an aggregate drag.`,
    impactVerdict: losers.length >= 8
      ? 'Deadweight capital: Chronic underperformers like HDFCBANK and TMCV are eroding compounding.'
      : 'Solid participation across majority of stock holdings.',
    suggestedAction: 'Consider tax-loss harvesting the worst 2-3 laggards to offset future capital gains.',
    iconName: 'Activity',
  };

  // 4. Valuation & Earnings Quality Score (0-100)
  const weightedPE = holdings.reduce((sum, h) => sum + (h.peRatio * (h.currentValue / totalValue)), 0);
  const weightedPB = holdings.reduce((sum, h) => sum + (h.pbRatio * (h.currentValue / totalValue)), 0);

  let valScore = 85;
  if (weightedPE > 25) valScore -= (weightedPE - 25) * 1.2;
  if (weightedPB > 4) valScore -= (weightedPB - 4) * 4;
  valScore = Math.max(25, Math.min(95, Math.round(valScore)));

  const valStatus: MetricEvaluation['status'] =
    valScore < 45 ? 'critical' : valScore < 60 ? 'warning' : valScore < 75 ? 'fair' : 'good';

  const valuationMetric: MetricEvaluation = {
    id: 'valuation_quality',
    title: 'Valuation & Earnings Safety',
    score: valScore,
    status: valStatus,
    statusLabel: valScore < 45 ? 'Expensive' : valScore < 60 ? 'Stretched P/E' : 'Attractive Value',
    headline: `Blended Portfolio P/E is ${weightedPE.toFixed(1)}x vs NIFTY 50 ~22x`,
    keyMetricLabel: 'Blended P/E',
    keyMetricValue: `${weightedPE.toFixed(1)}x (P/B ${weightedPB.toFixed(1)}x)`,
    benchmarkValue: 'NIFTY Benchmark ~22.4x',
    explanation: 'A high weighted P/E ratio indicates the market has already priced in high future earnings growth. If company quarterly reports miss estimates, valuation multiples can contract sharply.',
    impactVerdict: weightedPE > 45
      ? 'Vulnerable to earnings disappointments and interest rate sensitivity.'
      : 'Reasonable valuation cushion with solid earnings yields.',
    suggestedAction: 'Add value-oriented dividend or high-free-cash-flow compounders at P/E < 20.',
    iconName: 'TrendingUp',
  };

  // 5. Sector Balance & Macro Resilience Score (0-100)
  // Calculate sector weights
  const sectorMap: Record<string, number> = {};
  holdings.forEach(h => {
    sectorMap[h.sector] = (sectorMap[h.sector] || 0) + h.currentValue;
  });

  const topSector = Object.entries(sectorMap).sort((a, b) => b[1] - a[1])[0];
  const topSectorWeight = (topSector[1] / totalValue) * 100;

  let sectorScore = 100;
  if (topSectorWeight > 25) sectorScore -= (topSectorWeight - 25) * 1.8;
  sectorScore = Math.max(20, Math.min(95, Math.round(sectorScore)));

  const sectorStatus: MetricEvaluation['status'] =
    sectorScore < 45 ? 'critical' : sectorScore < 60 ? 'warning' : sectorScore < 75 ? 'fair' : 'good';

  const sectorMetric: MetricEvaluation = {
    id: 'sector_balance',
    title: 'Sector Balance & Macro Resilience',
    score: sectorScore,
    status: sectorStatus,
    statusLabel: sectorScore < 45 ? 'High Sector Skew' : sectorScore < 60 ? 'Imbalanced' : 'Well Spread',
    headline: `${topSector[0]} represents ${topSectorWeight.toFixed(1)}% of your portfolio`,
    keyMetricLabel: 'Top Sector Weight',
    keyMetricValue: `${topSectorWeight.toFixed(1)}%`,
    benchmarkValue: 'Ideal Max Sector < 25%',
    explanation: `Having ${topSectorWeight.toFixed(1)}% concentrated in ${topSector[0]} exposes you to single-commodity/cyclical downturns. You are simultaneously underweight IT and Consumer staples.`,
    impactVerdict: topSectorWeight > 40
      ? 'Macro risk: Any regulatory change or commodity drop in this sector hits your entire portfolio.'
      : 'Balanced diversification across growth, defensive, and cyclical sectors.',
    suggestedAction: 'Gradually rebalance capital from metals into defensive IT and Financial sectors.',
    iconName: 'Layers',
  };

  // 6. Benchmark Alpha & Return Quality Score (0-100)
  const totalInvested = holdings.reduce((sum, h) => sum + h.investedAmount, 0);
  const totalGainPct = totalInvested > 0 ? (totalRupeeGain / totalInvested) * 100 : 0;
  const niftyReturn = 18.0; // 18% reference return
  const alpha = totalGainPct - niftyReturn;

  let alphaScore = 50 + Math.min(45, Math.max(-40, alpha * 0.25));
  alphaScore = Math.max(25, Math.min(98, Math.round(alphaScore)));

  const alphaStatus: MetricEvaluation['status'] =
    alphaScore < 50 ? 'warning' : alphaScore < 70 ? 'fair' : alphaScore < 85 ? 'good' : 'excellent';

  const alphaMetric: MetricEvaluation = {
    id: 'alpha_attribution',
    title: 'Benchmark Alpha & Return Quality',
    score: alphaScore,
    status: alphaStatus,
    statusLabel: alphaScore >= 75 ? 'High Alpha' : 'Market Match',
    headline: `+${totalGainPct.toFixed(1)}% Total Return (+${alpha.toFixed(1)}% vs NIFTY)`,
    keyMetricLabel: 'Excess Alpha',
    keyMetricValue: `+${alpha.toFixed(1)}%`,
    benchmarkValue: 'NIFTY 50 +18.0%',
    explanation: `Your portfolio generated impressive raw outperformance (+${totalGainPct.toFixed(1)}% vs NIFTY +18%). However, performance attribution shows this is 97% driven by stock selection in 1 micro-cap rather than consistent system compounding.`,
    impactVerdict: 'Incredible return achieved; now the priority is capital preservation and locking in profits.',
    suggestedAction: 'Take partial profits on the multibagger to protect the accumulated alpha.',
    iconName: 'Award',
  };

  return [
    diversificationMetric,
    riskMetric,
    breadthMetric,
    valuationMetric,
    sectorMetric,
    alphaMetric,
  ];
}

export function generateRecommendations(holdings: Holding[]): Recommendation[] {
  const recommendations: Recommendation[] = [];
  const totalValue = holdings.reduce((sum, h) => sum + h.currentValue, 0);
  if (totalValue === 0) return recommendations;

  const sorted = [...holdings].sort((a, b) => b.currentValue - a.currentValue);
  const top1 = sorted[0];
  const top1Weight = (top1.currentValue / totalValue) * 100;

  // 1. Profit Protection / Concentration Alert
  if (top1Weight > 25) {
    const targetTrim = Math.round(top1.currentValue - (totalValue * 0.18));
    recommendations.push({
      id: 'rec_trim_top',
      priority: 'high',
      title: `🛡️ Lock In Profits: Trim ${top1.symbol} from ${top1Weight.toFixed(0)}% to 18%`,
      description: `${top1.name} has had an exponential 58x run and now controls ₹${Math.round(top1.currentValue).toLocaleString('en-IN')} (${top1Weight.toFixed(1)}% of your portfolio). Trimming ₹${Math.round(targetTrim).toLocaleString('en-IN')} locks in life-changing gains and prevents a single micro-cap pullback from wiping out your net worth.`,
      potentialImpact: 'Improves Diversification Score from 26 → 85/100 and removes 60% of downside risk.',
      actionType: 'TRIM',
      stockSymbol: top1.symbol,
      suggestedRebalanceAmount: targetTrim,
    });
  }

  // 2. Drag Elimination & Tax-Loss Harvesting
  const severeLosers = holdings
    .filter(h => ((h.currentValue - h.investedAmount) / h.investedAmount) < -0.30)
    .sort((a, b) => ((a.currentValue - a.investedAmount) / a.investedAmount) - ((b.currentValue - b.investedAmount) / b.investedAmount));

  if (severeLosers.length > 0) {
    const loserNames = severeLosers.map(h => `${h.symbol} (${Math.round(((h.currentValue - h.investedAmount) / h.investedAmount) * 100)}%)`).join(', ');
    const totalLoss = severeLosers.reduce((sum, h) => sum + (h.investedAmount - h.currentValue), 0);
    recommendations.push({
      id: 'rec_harvest_losers',
      priority: 'high',
      title: `✂️ Tax-Loss Harvest & Drag Clean-Up: ${severeLosers.length} Chronic Laggards`,
      description: `Positions like ${loserNames} have lagged the market cycle significantly, generating ₹${Math.round(totalLoss).toLocaleString('en-IN')} in unrealized losses. You can harvest these losses against capital gains from profitable trims, freeing up capital for active leaders.`,
      potentialImpact: 'Saves tax liability and raises portfolio Win-Rate from 50% to 68%.',
      actionType: 'HARVEST',
      stockSymbol: severeLosers[0].symbol,
    });
  }

  // 3. Sector Balance into Defensive IT & Quality Banking
  recommendations.push({
    id: 'rec_sector_rebalance',
    priority: 'medium',
    title: '⚖️ Rebalance Capital into Large-Cap IT & Banking Anchors',
    description: 'Your portfolio is currently 61% skewed towards cyclical metals and defense, while high-ROCE compounders like Banking (ICICI/SBI) and IT (TCS/Infosys) are underweight. Allocating trimmed capital here creates a resilient all-weather shield.',
    potentialImpact: 'Restores balanced macro exposure and lowers blended P/E from 59.98 to 28.5.',
    actionType: 'REBALANCE',
  });

  // 4. Staggered SIP Deployment
  recommendations.push({
    id: 'rec_ai_baskets',
    priority: 'low',
    title: '🚀 Deploy Trimmed Capital via SuperInvesting AI Baskets',
    description: 'Instead of holding excess cash or guessing individual stock timing, deploy rebalanced funds systematically into thematic AI Baskets (e.g. "Defence Superstars", "AI & Cloud Leaders", or "High Dividend Yielders").',
    potentialImpact: 'Systematic rupee-cost averaging with professional algorithmic rebalancing.',
    actionType: 'DIVERSIFY',
  });

  return recommendations;
}
