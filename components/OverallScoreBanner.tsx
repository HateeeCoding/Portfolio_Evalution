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
  const scoreLabel = isMended ? 'OPTIMAL' : 'GOOD (FRAGILE)';
  const peRatio = isMended ? '28.4' : '59.98';
  const pbRatio = isMended ? '3.8' : '5.8';
  const betaVal = isMended ? '0.88' : '0.34';

  // SVG Gauge calculations
  // Semi-circle from 180 deg to 0 deg (radius 70, center at 100, 95)
  // Total arc length = PI * r = 3.14159 * 70 = 219.9
  const radius = 70;
  const arcLength = Math.PI * radius;
  const progressOffset = arcLength - (arcLength * displayScore) / 100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8">
      {/* 1. Left Card: Portfolio Value */}
      <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between shadow-2xs">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Portfolio Value
            </span>
            <button className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/60 transition-all">
              <RefreshCw className="w-3 h-3 text-slate-400" />
              <span>Sync</span>
            </button>
          </div>

          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
            ₹37,69,158<span className="text-lg font-semibold text-slate-400">.10</span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium block mt-1">
            Last Sync: Sep 9, 2026 • 16 Holdings
          </span>
        </div>

        <div className="pt-5 border-t border-slate-100 mt-5 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Overall P/L</span>
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +₹22,73,828 (152.06%)
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Invested Capital</span>
            <span className="text-slate-800 font-semibold">
              ₹14,95,330.00
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Realized / Trimmed</span>
            <span className={`font-semibold ${isMended ? 'text-emerald-600' : 'text-slate-400'}`}>
              {isMended ? '₹15,74,853 (Secured)' : '₹0.00'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Center Card: Clean, Modern Minimalist Score Gauge */}
      <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between items-center text-center shadow-2xs">
        <div className="w-full flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Portfolio AI Score
          </span>
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
            isMended
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-amber-50 text-amber-700 border-amber-200'
          }`}>
            {isMended ? '✓ Mended Safe' : '⚠ Action Needed'}
          </span>
        </div>

        {/* Minimalist, Clean Arc Gauge (Zero clutter, zero needle overlap) */}
        <div className="relative w-56 h-32 flex items-end justify-center">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 200 115">
            <defs>
              <linearGradient id="modernGaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F43F5E" />
                <stop offset="35%" stopColor="#F59E0B" />
                <stop offset="70%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>

            {/* Background Arc Track */}
            <path
              d="M 30 100 A 70 70 0 0 1 170 100"
              fill="none"
              stroke="#F1F5F9"
              strokeWidth="10"
              strokeLinecap="round"
            />

            {/* Active Colored Progress Arc */}
            <path
              d="M 30 100 A 70 70 0 0 1 170 100"
              fill="none"
              stroke="url(#modernGaugeGradient)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={arcLength}
              strokeDashoffset={progressOffset}
              className="transition-all duration-700 ease-out"
            />

            {/* Min and Max Range Labels */}
            <text x="30" y="114" fontSize="9" fontWeight="600" fill="#94A3B8" textAnchor="middle">0</text>
            <text x="170" y="114" fontSize="9" fontWeight="600" fill="#94A3B8" textAnchor="middle">100</text>
          </svg>

          {/* Clean, perfectly centered score text */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-1 pointer-events-none">
            <div className="flex items-baseline gap-0.5">
              <span className="text-4xl font-black text-slate-900 tracking-tight">
                {displayScore}
              </span>
              <span className="text-xs font-bold text-slate-400">/100</span>
            </div>
            <span className={`text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full mt-0.5 ${
              isMended ? 'text-emerald-700 bg-emerald-50' : 'text-emerald-700 bg-emerald-50/80'
            }`}>
              {scoreLabel}
            </span>
          </div>
        </div>

        {/* Submetrics row (PE, PB, Beta) */}
        <div className="w-full grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 mt-3 text-xs">
          <div className="flex flex-col items-center">
            <span className="font-bold text-slate-900 text-sm">{peRatio}</span>
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">
              P/E Ratio
            </span>
          </div>
          <div className="flex flex-col items-center border-x border-slate-100">
            <span className="font-bold text-slate-900 text-sm">{pbRatio}</span>
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">
              P/B Ratio
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-slate-900 text-sm">{betaVal}</span>
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">
              Beta
            </span>
          </div>
        </div>
      </div>

      {/* 3. Right Card: Diagnostic Reality & Action Trigger */}
      <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between shadow-2xs">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <AlertTriangle className={`w-4 h-4 ${isMended ? 'text-emerald-600' : 'text-amber-500'}`} />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                {isMended ? 'Optimization Active' : 'Concentration Alert'}
              </span>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              1-Click Advisory
            </span>
          </div>

          <h3 className="text-base font-bold text-slate-900 leading-snug mb-1.5">
            {isMended
              ? 'Portfolio Mended to Institutional Safe State'
              : '97% of Total Profits Tied to 1 Stock'}
          </h3>

          <p className="text-xs text-slate-500 leading-relaxed">
            {isMended
              ? 'Midwest Gold trimmed to 18%, locking in ₹15.75L profit. Capital reallocated into Banking compounders & IT AI Baskets with zero tax.'
              : 'Midwest Gold occupies 59.7% of your capital. A 30% correction wipes out ₹6.75 Lakhs in wealth. 8 other positions are negative.'}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 mt-4 space-y-2">
          <button
            onClick={onScrollToMending}
            className="w-full py-2.5 px-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isMended ? 'View Mending Blueprint' : 'Mend This Portfolio'}</span>
          </button>

          <button
            onClick={onToggleMend}
            className="w-full py-2 px-3 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 font-semibold text-xs rounded-xl border border-slate-200/60 transition-all text-center"
          >
            {isMended ? 'Reset to Unmended (60/100)' : 'Simulate Mended State (86/100)'}
          </button>
        </div>
      </div>
    </div>
  );
};
