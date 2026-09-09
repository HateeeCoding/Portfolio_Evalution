'use client';

import React, { useState } from 'react';
import { Holding, PortfolioSummary } from '../lib/types';
import { Sliders, RefreshCw, ArrowRight, ShieldCheck, Check, Sparkles, TrendingUp } from 'lucide-react';

interface RebalanceSimulatorProps {
  originalHoldings: Holding[];
  summary: PortfolioSummary;
}

export const RebalanceSimulator: React.FC<RebalanceSimulatorProps> = ({
  originalHoldings,
  summary,
}) => {
  // Find top holding (MIDWEST)
  const sorted = [...originalHoldings].sort((a, b) => b.currentValue - a.currentValue);
  const topStock = sorted[0];

  const initialWeight = topStock ? Math.round((topStock.currentValue / summary.totalValue) * 100) : 60;
  const [targetWeight, setTargetWeight] = useState<number>(18); // Default simulated target weight is 18%
  const [rebalanceDestination, setRebalanceDestination] = useState<'nifty' | 'basket' | 'quality'>('nifty');
  const [taxLossHarvestEnabled, setTaxLossHarvestEnabled] = useState<boolean>(true);

  // Math simulation
  const currentTopVal = topStock ? topStock.currentValue : 0;
  const targetTopVal = summary.totalValue * (targetWeight / 100);
  const capitalFreed = Math.max(0, currentTopVal - targetTopVal);

  // Simulated scores calculation
  // Base scores: Div: 26, Risk: 38, Breadth: 44, Health: 54
  const simDivScore = Math.min(95, Math.round(26 + ((initialWeight - targetWeight) * 1.5)));
  const simRiskScore = Math.min(92, Math.round(38 + ((initialWeight - targetWeight) * 1.25)));
  const simBreadthScore = taxLossHarvestEnabled ? 74 : 58;
  const simHealthScore = Math.min(94, Math.round((simDivScore * 0.35) + (simRiskScore * 0.30) + (simBreadthScore * 0.20) + (80 * 0.15)));

  // Capital protected if top stock crashes 30%
  const unhedgedLoss = currentTopVal * 0.30;
  const simulatedLoss = targetTopVal * 0.30;
  const capitalProtected = Math.round(unhedgedLoss - simulatedLoss);

  return (
    <section id="simulator-section" className="mb-10 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl text-white p-6 sm:p-8 lg:p-10 shadow-xl border border-indigo-900/60 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3 py-1 rounded-full mb-2.5">
            <Sliders className="w-3.5 h-3.5" /> Interactive Portfolio Rebalance Simulator
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            What-If Scenario: Fix Your Concentration Risk
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Simulate trimming your outlier winner ({topStock?.symbol}) and reinvesting the freed capital into diversified anchors.
          </p>
        </div>

        <button
          onClick={() => {
            setTargetWeight(18);
            setTaxLossHarvestEnabled(true);
          }}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-xl px-3.5 py-2 transition-all self-start md:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reset Default
        </button>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-6 bg-slate-800/60 backdrop-blur-md rounded-2xl p-6 border border-slate-700/60">
          {/* Slider for Top Holding Weight */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs sm:text-sm font-bold text-slate-200">
                Target Allocation for {topStock?.symbol || 'Top Stock'}
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 line-through">Current: {initialWeight}%</span>
                <span className="text-sm font-black text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-md border border-emerald-400/30">
                  Target: {targetWeight}%
                </span>
              </div>
            </div>

            <input
              type="range"
              min={10}
              max={60}
              step={1}
              value={targetWeight}
              onChange={(e) => setTargetWeight(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />

            <div className="flex justify-between text-[11px] font-semibold text-slate-400 mt-1.5">
              <span>10% (Ultra Diversified)</span>
              <span className="text-blue-400 font-bold">18% (Recommended Safe Cap)</span>
              <span>60% (Current Fragile)</span>
            </div>
          </div>

          {/* Destination Selector */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-200 mb-2">
              Reallocate Freed Capital (₹{Math.round(capitalFreed).toLocaleString('en-IN')}) Into:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setRebalanceDestination('nifty')}
                className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                  rebalanceDestination === 'nifty'
                    ? 'bg-blue-600/30 border-blue-400 text-white shadow-xs'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                <span className="block font-bold text-sm mb-0.5">NIFTY 50 ETF</span>
                <span className="text-[11px] text-slate-400">Broad benchmark anchor</span>
              </button>

              <button
                type="button"
                onClick={() => setRebalanceDestination('basket')}
                className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                  rebalanceDestination === 'basket'
                    ? 'bg-blue-600/30 border-blue-400 text-white shadow-xs'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                <span className="block font-bold text-sm mb-0.5">AI Baskets</span>
                <span className="text-[11px] text-slate-400">Curated Defence & IT stacks</span>
              </button>

              <button
                type="button"
                onClick={() => setRebalanceDestination('quality')}
                className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                  rebalanceDestination === 'quality'
                    ? 'bg-blue-600/30 border-blue-400 text-white shadow-xs'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                <span className="block font-bold text-sm mb-0.5">Defensive FMCG</span>
                <span className="text-[11px] text-slate-400">Low beta dividend payers</span>
              </button>
            </div>
          </div>

          {/* Tax Loss Harvesting Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/80">
            <div className="flex items-center gap-2.5">
              <input
                type="checkbox"
                id="harvest-toggle"
                checked={taxLossHarvestEnabled}
                onChange={(e) => setTaxLossHarvestEnabled(e.target.checked)}
                className="w-4 h-4 rounded-sm text-blue-600 focus:ring-blue-500 bg-slate-800 border-slate-600"
              />
              <label htmlFor="harvest-toggle" className="text-xs sm:text-sm text-slate-200 cursor-pointer">
                <strong>Simulate Tax-Loss Harvesting:</strong> Exit 3 chronic losers (HDFC, TMCV, ITC)
              </label>
            </div>
            <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-sm border border-emerald-500/30">
              Tax Offset
            </span>
          </div>
        </div>

        {/* Live Impact Preview Column */}
        <div className="lg:col-span-6 bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-slate-700/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Projected Health Score Jump
              </span>
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Dynamic Live Calc
              </span>
            </div>

            {/* Score Comparison */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Before */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <span className="text-xs text-slate-400 block mb-1">Current Score</span>
                <div className="text-3xl font-black text-amber-500">
                  {summary.overallHealthScore} <span className="text-xs text-slate-500">/ 100</span>
                </div>
                <span className="text-[11px] font-semibold text-amber-400">Fragile & Unbalanced</span>
              </div>

              {/* After */}
              <div className="p-4 rounded-xl bg-gradient-to-b from-blue-900/40 to-slate-900/80 border border-blue-500/40 text-center shadow-lg shadow-blue-500/10">
                <span className="text-xs text-blue-300 font-bold block mb-1">Simulated Score</span>
                <div className="text-3xl font-black text-emerald-400">
                  {simHealthScore} <span className="text-xs text-slate-400">/ 100</span>
                </div>
                <span className="text-[11px] font-bold text-emerald-300">
                  +{simHealthScore - summary.overallHealthScore} Points Boost
                </span>
              </div>
            </div>

            {/* Pillar Breakdown Comparison */}
            <div className="space-y-3 mb-6">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-300">Diversification Score</span>
                  <span className="text-emerald-400 font-bold">26 → {simDivScore}/100</span>
                </div>
                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full transition-all duration-300" style={{ width: `${simDivScore}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-300">Downside & Volatility Shield</span>
                  <span className="text-emerald-400 font-bold">38 → {simRiskScore}/100</span>
                </div>
                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-400 h-full rounded-full transition-all duration-300" style={{ width: `${simRiskScore}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-300">Portfolio Breadth & Win-Rate</span>
                  <span className="text-emerald-400 font-bold">44 → {simBreadthScore}/100</span>
                </div>
                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-400 h-full rounded-full transition-all duration-300" style={{ width: `${simBreadthScore}%` }} />
                </div>
              </div>
            </div>

            {/* Protection Callout */}
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-2.5 text-xs text-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong>Downside Capital Shield:</strong> You lock in{' '}
                <strong>₹{Math.round(capitalFreed).toLocaleString('en-IN')}</strong> in gains, shielding{' '}
                <strong>₹{capitalProtected.toLocaleString('en-IN')}</strong> from a 30% small-cap drawdown!
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
