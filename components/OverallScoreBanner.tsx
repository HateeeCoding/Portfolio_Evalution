'use client';

import React from 'react';
import { PortfolioSummary } from '../lib/types';
import { RefreshCw, ArrowUpRight, AlertTriangle, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

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
            <button className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/70 transition-all">
              <RefreshCw className="w-3 h-3 text-slate-400" />
              <span>Sync</span>
            </button>
          </div>

          <div className="text-3xl font-black text-slate-900 tracking-tight">
            ₹37,69,158<span className="text-lg font-semibold text-slate-400">.10</span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium block mt-1">
            Last Sync: Sep 9, 2026 • 16 Holdings
          </span>
        </div>

        <div className="pt-4 border-t border-slate-100 mt-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Overall P/L</span>
            <span className="text-emerald-600 font-bold flex items-center gap-0.5">
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
            <span className="text-slate-500 font-medium">Secured / Trimmed</span>
            <span className={`font-semibold ${isMended ? 'text-emerald-600' : 'text-slate-400'}`}>
              {isMended ? '₹15,74,853' : '₹0.00'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Center Card: Minimalist Score Gauge */}
      <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between items-center text-center shadow-2xs">
        <div className="w-full flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Portfolio Health Score
          </span>
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
            isMended
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-amber-50 text-amber-700 border-amber-200'
          }`}>
            {isMended ? '✓ Mended Safe' : '⚠ Action Needed'}
          </span>
        </div>

        {/* Minimalist Arc Gauge */}
        <div className="relative w-56 h-32 flex items-end justify-center">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 200 115">
            <defs>
              <linearGradient id="scoreGaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F43F5E" />
                <stop offset="35%" stopColor="#F59E0B" />
                <stop offset="70%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>

            {/* Background Track */}
            <path
              d="M 30 100 A 70 70 0 0 1 170 100"
              fill="none"
              stroke="#F1F5F9"
              strokeWidth="10"
              strokeLinecap="round"
            />

            {/* Active Track */}
            <path
              d="M 30 100 A 70 70 0 0 1 170 100"
              fill="none"
              stroke="url(#scoreGaugeGrad)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={arcLength}
              strokeDashoffset={progressOffset}
              className="transition-all duration-700 ease-out"
            />

            <text x="30" y="114" fontSize="9" fontWeight="600" fill="#94A3B8" textAnchor="middle">0</text>
            <text x="170" y="114" fontSize="9" fontWeight="600" fill="#94A3B8" textAnchor="middle">100</text>
          </svg>

          {/* Centered Score text */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-1 pointer-events-none">
            <div className="flex items-baseline gap-0.5">
              <span className="text-4xl font-black text-slate-900 tracking-tight">
                {displayScore}
              </span>
              <span className="text-xs font-bold text-slate-400">/100</span>
            </div>
            <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full mt-0.5 ${
              isMended ? 'text-emerald-700 bg-emerald-50' : 'text-emerald-700 bg-emerald-50/80'
            }`}>
              {scoreLabel}
            </span>
          </div>
        </div>

        {/* Submetrics */}
        <div className="w-full grid grid-cols-3 gap-2 pt-3.5 border-t border-slate-100 mt-2 text-xs">
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

      {/* 3. Right Card: Diagnostic Reality & Quick Action */}
      <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between shadow-2xs">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              {isMended ? (
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              )}
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                {isMended ? 'Protection Active' : 'Key Finding'}
              </span>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              Prescriptive Fix
            </span>
          </div>

          <h3 className="text-sm font-bold text-slate-900 leading-snug mb-3">
            {isMended
              ? 'Capital Rebalanced: Safe Compounding Mode'
              : '97% of Profit Driven by 1 Speculative Winner'}
          </h3>

          {/* High-Signal Visual Chips instead of text walls */}
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 block font-medium">Top Stock Exposure</span>
              <span className={`text-xs font-bold ${isMended ? 'text-emerald-700' : 'text-rose-600'}`}>
                {isMended ? '18.0% (Safe Capped)' : '59.7% (Midwest Gold)'}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 block font-medium">30% Drop Exposure</span>
              <span className={`text-xs font-bold ${isMended ? 'text-emerald-700' : 'text-rose-600'}`}>
                {isMended ? '-₹1.70L (Absorbed)' : '-₹6.75L (High Ruin)'}
              </span>
            </div>
          </div>
        </div>

        {/* Sleek Black Action Button */}
        <div className="pt-3 border-t border-slate-100 mt-2 space-y-2">
          <button
            onClick={onScrollToMending}
            className="w-full py-2.5 px-3 bg-black hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-300" />
            <span>{isMended ? 'View Mending Blueprint' : 'Mend This Portfolio'}</span>
          </button>

          <button
            onClick={onToggleMend}
            className="w-full py-2 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200/60 transition-all text-center"
          >
            {isMended ? 'Reset to Unmended (60)' : 'Simulate Mended (86)'}
          </button>
        </div>
      </div>
    </div>
  );
};
