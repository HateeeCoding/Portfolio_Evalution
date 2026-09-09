'use client';

import React from 'react';
import { PortfolioSummary } from '../lib/types';
import { AlertTriangle, TrendingUp, ShieldAlert, ArrowUpRight, CheckCircle2, Flame } from 'lucide-react';

interface OverallScoreBannerProps {
  summary: PortfolioSummary;
  onScrollToSimulator: () => void;
}

export const OverallScoreBanner: React.FC<OverallScoreBannerProps> = ({
  summary,
  onScrollToSimulator,
}) => {
  const isHighRisk = summary.overallHealthScore < 60;
  const isCritical = summary.topHoldingWeight > 40;

  // Format currency in Indian numbering format (e.g. ₹37,69,158)
  const formatINR = (val: number) => {
    return '₹' + Math.round(val).toLocaleString('en-IN');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
      {/* Top Banner alert if severe risk exists */}
      {isCritical && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-amber-900 text-xs sm:text-sm font-medium">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Concentration Warning:</strong> Over <strong>{summary.topHoldingWeight.toFixed(1)}%</strong> of your portfolio value and <strong>97%</strong> of your profits rely on a single stock (<strong>{summary.topHoldingSymbol}</strong>).
            </span>
          </div>
          <button
            onClick={onScrollToSimulator}
            className="text-xs font-semibold text-amber-900 hover:text-amber-950 bg-amber-200/80 hover:bg-amber-300/80 px-3 py-1 rounded-md transition-colors inline-flex items-center gap-1"
          >
            Simulate Safe Rebalance <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <div className="p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Master Score Dial */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-slate-50/80 rounded-2xl border border-slate-200/60 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Overall Portfolio Health
            </span>
            
            {/* Score Ring / Pill */}
            <div className="relative flex items-center justify-center w-36 h-36 mb-3">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="text-slate-200"
                  strokeWidth="10"
                  stroke="currentColor"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className={
                    summary.overallHealthScore < 45
                      ? 'text-rose-500'
                      : summary.overallHealthScore < 65
                      ? 'text-amber-500'
                      : 'text-emerald-500'
                  }
                  strokeWidth="10"
                  strokeDasharray={251.2}
                  strokeDashoffset={251.2 - (251.2 * summary.overallHealthScore) / 100}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
                  {summary.overallHealthScore}
                </span>
                <span className="text-[11px] font-semibold text-slate-400">/ 100</span>
              </div>
            </div>

            {/* Verdict Badge */}
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                summary.overallHealthScore < 45
                  ? 'bg-rose-100 text-rose-700 border border-rose-200'
                  : summary.overallHealthScore < 65
                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
              }`}
            >
              {summary.overallHealthScore < 65 ? (
                <ShieldAlert className="w-3.5 h-3.5" />
              ) : (
                <CheckCircle2 className="w-3.5 h-3.5" />
              )}
              {summary.overallVerdict}
            </div>

            <p className="text-xs text-slate-500 mt-3 max-w-xs">
              Weighted composite of 6 core parameters. High raw returns offset by high concentration risk.
            </p>
          </div>

          {/* Quick Metrics Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {/* Total Portfolio Value */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-500">Portfolio Value</span>
              <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                {formatINR(summary.totalValue)}
              </div>
              <div className="text-xs font-medium text-emerald-600 mt-1 flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" />
                +{summary.totalPercentGain.toFixed(1)}% All-Time
              </div>
            </div>

            {/* Net Rupee Gain */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-500">Net Rupee Gain</span>
              <div className="text-xl sm:text-2xl font-black text-emerald-600 mt-1">
                +{formatINR(summary.totalRupeeGain)}
              </div>
              <div className="text-xs font-medium text-slate-500 mt-1">
                Invested: {formatINR(summary.totalInvested)}
              </div>
            </div>

            {/* Top Holding Skew */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-500">Top Holding Weight</span>
              <div className="text-xl sm:text-2xl font-black text-amber-600 mt-1">
                {summary.topHoldingWeight.toFixed(1)}%
              </div>
              <div className="text-xs font-medium text-slate-500 mt-1 truncate">
                {summary.topHoldingSymbol} (Safe: &lt;15%)
              </div>
            </div>

            {/* Win-Rate Breadth */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-500">Win Rate Breadth</span>
              <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                {summary.winRate.toFixed(0)}%
              </div>
              <div className="text-xs font-medium text-slate-500 mt-1">
                {summary.gainersCount} Winning / {summary.losersCount} Losing
              </div>
            </div>

            {/* Top 3 Concentration */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-500">Top 3 Holdings</span>
              <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                {summary.top3HoldingsWeight.toFixed(1)}%
              </div>
              <div className="text-xs font-medium text-slate-500 mt-1">
                Benchmark Safe: &lt;40%
              </div>
            </div>

            {/* Total Positions */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-500">Total Holdings</span>
              <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                {summary.holdingsCount} Stocks
              </div>
              <div className="text-xs font-medium text-slate-500 mt-1">
                Across 10 Sectors
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
