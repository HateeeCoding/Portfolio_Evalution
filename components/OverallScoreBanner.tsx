'use client';

import React from 'react';
import { PortfolioSummary } from '../lib/types';
import { RefreshCw, ArrowUpRight, AlertTriangle, ShieldCheck, Sparkles } from 'lucide-react';

interface OverallScoreBannerProps {
  summary: PortfolioSummary;
  isMended: boolean;
  onToggleMend: () => void;
  onScrollToMending: () => void;
}

export const OverallScoreBanner: React.FC<OverallScoreBannerProps> = ({
  summary,
  isMended,
  onToggleMend,
  onScrollToMending,
}) => {
  const displayScore = isMended ? 86 : 60;
  const scoreLabel = isMended ? 'OPTIMAL HEALTH' : 'FRAGILE HEALTH';
  const peRatio = isMended ? '28.4' : '59.98';
  const pbRatio = isMended ? '3.8' : '5.8';
  const betaVal = isMended ? '0.88' : '0.34';

  // Crisp review line in least amount of words possible
  const crispReviewLine = isMended
    ? 'Profits locked in: Single-stock ruin risk eliminated, and ₹5.05L shielded from market drawdowns.'
    : '1 lucky stock carries +97% of your profit, while 8 of your 16 stocks quietly bleed money.';

  const radius = 75;
  const arcLength = Math.PI * radius;
  const progressOffset = arcLength - (arcLength * displayScore) / 100;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-2xs mb-8">
      {/* 1. Crisp 1-Line Review Badge at Top */}
      <div className={`mb-6 px-4 py-2.5 rounded-xl border flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold transition-all ${
        isMended
          ? 'bg-emerald-50/80 text-emerald-900 border-emerald-200'
          : 'bg-amber-50/80 text-amber-950 border-amber-200'
      }`}>
        <div className="flex items-center gap-2">
          {isMended ? (
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          )}
          <span>
            <strong>Verdict:</strong> {crispReviewLine}
          </span>
        </div>

        <button
          onClick={onToggleMend}
          className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-slate-800 hover:text-black underline underline-offset-2 shrink-0"
        >
          {isMended ? 'Switch to Unmended' : 'Preview Fix ➔'}
        </button>
      </div>

      {/* 2. Hero Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Financial Balances */}
        <div className="lg:col-span-4 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Portfolio Value
              </span>
              <button className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/70 transition-all">
                <RefreshCw className="w-3 h-3 text-slate-400" />
                <span>Sync</span>
              </button>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              ₹37,69,158<span className="text-lg font-semibold text-slate-400">.10</span>
            </div>
            <span className="text-xs text-slate-400 font-medium block mt-0.5">
              Last Sync: Sep 9, 2026
            </span>
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Overall Return</span>
              <span className="text-emerald-600 font-extrabold flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" />
                +₹22,73,828 (152.06%)
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Invested Capital</span>
              <span className="text-slate-800 font-bold">
                ₹14,95,330.00
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Protected / Realized</span>
              <span className={`font-bold ${isMended ? 'text-emerald-600' : 'text-slate-400'}`}>
                {isMended ? '₹15,74,853 (Banked)' : '₹0.00'}
              </span>
            </div>
          </div>
        </div>

        {/* Center: ENLARGED & HIGHLIGHTED Portfolio Health Score */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center text-center p-4 sm:p-5 rounded-2xl bg-slate-50/60 border border-slate-200/60">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Portfolio Health Score
            </span>
            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
              isMended
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}>
              {scoreLabel}
            </span>
          </div>

          {/* Big Highlighted Meter Gauge */}
          <div className="relative w-64 h-36 flex items-end justify-center mb-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 200 120">
              <defs>
                <linearGradient id="highlightGaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F43F5E" />
                  <stop offset="35%" stopColor="#F59E0B" />
                  <stop offset="70%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>

              {/* Background Track */}
              <path
                d="M 25 105 A 75 75 0 0 1 175 105"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="12"
                strokeLinecap="round"
              />

              {/* Active Colored Arc */}
              <path
                d="M 25 105 A 75 75 0 0 1 175 105"
                fill="none"
                stroke="url(#highlightGaugeGrad)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={arcLength}
                strokeDashoffset={progressOffset}
                className="transition-all duration-700 ease-out"
              />

              <text x="25" y="118" fontSize="10" fontWeight="bold" fill="#94A3B8" textAnchor="middle">0</text>
              <text x="175" y="118" fontSize="10" fontWeight="bold" fill="#94A3B8" textAnchor="middle">100</text>
            </svg>

            {/* ENLARGED Center Score Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-1 pointer-events-none">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight">
                  {displayScore}
                </span>
                <span className="text-sm font-bold text-slate-400">/100</span>
              </div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500 mt-0.5">
                {isMended ? 'High Compounding' : 'Fragile Position'}
              </span>
            </div>
          </div>

          {/* Submetrics Row */}
          <div className="w-full grid grid-cols-3 gap-2 pt-3 border-t border-slate-200/80 text-xs">
            <div className="flex flex-col items-center">
              <span className="font-bold text-slate-900 text-sm">{peRatio}</span>
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">P/E Ratio</span>
            </div>
            <div className="flex flex-col items-center border-x border-slate-200">
              <span className="font-bold text-slate-900 text-sm">{pbRatio}</span>
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">P/B Ratio</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-slate-900 text-sm">{betaVal}</span>
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Beta</span>
            </div>
          </div>
        </div>

        {/* Right: Quick Action Cards */}
        <div className="lg:col-span-3 space-y-3">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Top Asset Weight
            </span>
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-xs">Midwest Gold</span>
              <span className={`text-xs font-black ${isMended ? 'text-emerald-700' : 'text-rose-600'}`}>
                {isMended ? '18.0% (Safe)' : '59.7% (Extreme)'}
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              30% Crash Vulnerability
            </span>
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-xs">Downside Hit</span>
              <span className={`text-xs font-black ${isMended ? 'text-emerald-700' : 'text-rose-600'}`}>
                {isMended ? '-₹1.70L (-4.5%)' : '-₹6.75L (-17.9%)'}
              </span>
            </div>
          </div>

          <button
            onClick={onScrollToMending}
            className="w-full py-2.5 px-3 bg-black hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-300" />
            <span>{isMended ? 'View Mending Plan' : 'Mend This Portfolio'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
