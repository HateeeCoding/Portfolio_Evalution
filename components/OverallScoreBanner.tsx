'use client';

import React from 'react';
import { PortfolioSummary } from '../lib/types';
import { RefreshCw, ArrowUpRight, AlertTriangle, ShieldCheck, Sparkles, Info } from 'lucide-react';

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
  // Current score is 60 (matching screenshot Image 1), or 86 when mended
  const displayScore = isMended ? 86 : 60;
  const scoreLabel = isMended ? 'PERFECT' : 'GOOD';
  const peRatio = isMended ? '28.4' : '59.98';
  const pbRatio = isMended ? '3.8' : '5.8';
  const betaVal = isMended ? '0.88' : '0.34';

  // Calculate needle angle for semi-circle (0 to 180 degrees)
  // Score 0 is -90 deg, Score 100 is +90 deg
  const needleAngle = -90 + (displayScore / 100) * 180;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8">
      {/* 1. Left Card: Portfolio Value & P/L matching Image 1 */}
      <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-2xs">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Portfolio Value</span>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200/80 px-2.5 py-1 rounded-md border border-slate-200 transition-all">
                <RefreshCw className="w-3 h-3 text-slate-500" />
                <span>Sync</span>
              </button>
            </div>
          </div>

          <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            ₹37,69,158.10
          </div>
          <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
            Last Sync: Sep 9, 2026
          </span>
        </div>

        <div className="pt-6 border-t border-slate-100 mt-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Overall P/L</span>
            <span className="text-emerald-600 font-bold flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" />
              ₹22,73,828.10 (152.06%)
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Invested</span>
            <span className="text-slate-800 font-semibold">
              ₹14,95,330.00
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Realized/Trimmed</span>
            <span className="text-slate-800 font-semibold">
              {isMended ? '₹15,74,853.00' : '₹0.00'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Center Card: Portfolio AI Score Speedometer Gauge matching Image 1 */}
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between items-center text-center shadow-2xs relative overflow-hidden">
        <div className="w-full flex items-center justify-between mb-1">
          <h2 className="text-sm font-bold text-slate-800">Portfolio AI Score</h2>
          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
            isMended 
              ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
              : 'bg-amber-50 text-amber-700 border-amber-300'
          }`}>
            {isMended ? '✓ Mended Safe' : '⚠ Concentration Risk'}
          </span>
        </div>

        {/* Semi-circular Speedometer SVG */}
        <div className="relative w-64 h-36 mt-1 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 200 115">
            <defs>
              {/* Segmented Gradient matching SuperInvesting Gauge */}
              <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#EF4444" />
                <stop offset="25%" stopColor="#F97316" />
                <stop offset="50%" stopColor="#FBBF24" />
                <stop offset="75%" stopColor="#84CC16" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>

            {/* Gauge Track Arc */}
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="14"
              strokeLinecap="round"
            />
            {/* Colored Active Arc */}
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="url(#gaugeGradient)"
              strokeWidth="14"
              strokeLinecap="round"
            />

            {/* Scale Labels matching Image 1 */}
            <text x="22" y="112" fontSize="7" fontWeight="bold" fill="#94A3B8">VERY RISKY</text>
            <text x="56" y="58" fontSize="7" fontWeight="bold" fill="#94A3B8">RISKY</text>
            <text x="90" y="32" fontSize="7" fontWeight="bold" fill="#64748B">AVERAGE</text>
            <text x="135" y="58" fontSize="7" fontWeight="bold" fill="#10B981">GOOD</text>
            <text x="156" y="112" fontSize="7" fontWeight="bold" fill="#059669">PERFECT</text>

            {/* Dynamic Center Needle */}
            <g transform={`translate(100, 100) rotate(${needleAngle})`}>
              <polygon points="-4,0 4,0 0,-70" fill="#0F172A" />
              <circle cx="0" cy="0" r="7" fill="#0F172A" />
              <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
            </g>
          </svg>

          {/* Center Score & Label Overlay */}
          <div className="absolute bottom-2 flex flex-col items-center">
            <div className="flex items-baseline">
              <span className="text-3xl font-black text-slate-900 tracking-tight">{displayScore}</span>
              <span className="text-xs font-bold text-slate-400">/100</span>
            </div>
            <span className={`text-[11px] font-extrabold uppercase tracking-wider ${
              displayScore >= 80 ? 'text-emerald-600' : displayScore >= 60 ? 'text-emerald-600' : 'text-amber-600'
            }`}>
              {scoreLabel}
            </span>
          </div>
        </div>

        {/* Submetrics below gauge matching Image 1 */}
        <div className="w-full grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 mt-2 text-xs">
          <div className="flex flex-col items-center">
            <span className="font-bold text-slate-900 text-sm">{peRatio}</span>
            <span className="text-[10px] text-slate-500 flex items-center gap-0.5">
              PE <Info className="w-2.5 h-2.5 text-slate-400" />
            </span>
          </div>
          <div className="flex flex-col items-center border-x border-slate-100">
            <span className="font-bold text-slate-900 text-sm">{pbRatio}</span>
            <span className="text-[10px] text-slate-500 flex items-center gap-0.5">
              PB <Info className="w-2.5 h-2.5 text-slate-400" />
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-slate-900 text-sm">{betaVal}</span>
            <span className="text-[10px] text-slate-500 flex items-center gap-0.5">
              Beta <Info className="w-2.5 h-2.5 text-slate-400" />
            </span>
          </div>
        </div>
      </div>

      {/* 3. Right Card: Diagnostic Reality & One-Click Mending Trigger */}
      <div className="lg:col-span-3 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-6 flex flex-col justify-between shadow-2xs">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Hidden Risk Alert
            </span>
          </div>

          <h3 className="text-sm font-bold text-white leading-snug mb-2">
            {isMended
              ? 'Portfolio Mending Plan Active'
              : '97% of Profit Trapped in 1 Micro-Cap'}
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed">
            {isMended
              ? 'Midwest Gold trimmed to 18%, freeing ₹15.75L into resilient Banking & IT AI Baskets with ₹0 tax liability.'
              : 'Midwest Gold occupies 59.7% of your portfolio. A 30% correction wipes out ₹6.75 Lakhs in net worth.'}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-700/80 mt-4 space-y-2">
          <button
            onClick={onScrollToMending}
            className="w-full py-2.5 px-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isMended ? 'Adjust Mending Plan' : 'Mend This Portfolio'}</span>
          </button>

          <button
            onClick={onToggleMend}
            className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-[11px] rounded-lg border border-slate-700 transition-all text-center"
          >
            {isMended ? 'Switch back to Current Unmended' : 'Quick Preview Mended State (86/100)'}
          </button>
        </div>
      </div>
    </div>
  );
};
