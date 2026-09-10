'use client';

import React from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  TrendingDown, 
  TrendingUp, 
  Sparkles, 
  Coins, 
  AlertTriangle,
  Scissors,
  CheckCircle2
} from 'lucide-react';

interface MendingInfographicsProps {
  isMended: boolean;
  onExecuteMend: () => void;
}

export const MendingInfographics: React.FC<MendingInfographicsProps> = ({
  isMended,
  onExecuteMend,
}) => {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 lg:p-8 mb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-5 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Combined Transformation Infographic
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            How SuperInvesting Recommendations Mend Your Portfolio
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Visualizing the mathematical transition from a single-stock gamble into an institutional-grade, risk-hedged compounder.
          </p>
        </div>

        <button
          onClick={onExecuteMend}
          className="self-start md:self-auto inline-flex items-center gap-2 text-xs font-bold text-white bg-[#7C3AED] hover:bg-[#6D28D9] px-4 py-2.5 rounded-xl shadow-xs transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isMended ? 'Reset to Unmended State' : 'Apply Full Mending Plan'}</span>
        </button>
      </div>

      {/* Grid of 3 Linked Infographics */}
      <div className="space-y-8">
        {/* Infographic 1: Portfolio Anatomy Before vs After */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Infographic 1 : Asset Concentration Transformation
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                Before vs After Capital Weight Distribution
              </h3>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              Total Capital: <strong>₹37,69,158</strong>
            </span>
          </div>

          <div className="space-y-5">
            {/* BEFORE Bar */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-rose-700 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> CURRENT UNMENDED (Score: 60/100)
                </span>
                <span className="text-slate-500">High Fragility</span>
              </div>
              <div className="w-full h-8 rounded-xl overflow-hidden flex text-[10px] font-black text-white shadow-2xs">
                <div
                  style={{ width: '59.7%' }}
                  className="bg-rose-500 flex items-center justify-center px-2 truncate"
                  title="Midwest Gold: 59.7% (₹22.5L)"
                >
                  Midwest Gold (59.7%) — Dangerous Skew
                </div>
                <div
                  style={{ width: '22.1%' }}
                  className="bg-amber-500 flex items-center justify-center px-2 truncate"
                  title="8 Negative Drags: 22.1% (₹8.3L)"
                >
                  8 Losing Drags (22.1%)
                </div>
                <div
                  style={{ width: '18.2%' }}
                  className="bg-blue-600 flex items-center justify-center px-2 truncate"
                  title="7 Bluechips: 18.2% (₹6.9L)"
                >
                  Bluechips (18.2%)
                </div>
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 font-medium mt-1">
                <span>⚠️ Over ₹22.5 Lakhs locked in 1 volatile small-cap stock</span>
                <span>8 of 16 positions eroding capital</span>
              </div>
            </div>

            {/* AFTER Bar */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> MENDED ALL-WEATHER (Score: 86/100)
                </span>
                <span className="text-emerald-700 font-bold">+26 Points Health Boost</span>
              </div>
              <div className="w-full h-8 rounded-xl overflow-hidden flex text-[10px] font-black text-white shadow-2xs">
                <div
                  style={{ width: '18.0%' }}
                  className="bg-indigo-600 flex items-center justify-center px-2 truncate"
                  title="Midwest Gold: 18.0% (₹6.75L)"
                >
                  Midwest (18%)
                </div>
                <div
                  style={{ width: '32.0%' }}
                  className="bg-emerald-600 flex items-center justify-center px-2 truncate"
                  title="Large-Cap Banking: 32.0% (₹12.0L)"
                >
                  Banking Leaders (32%)
                </div>
                <div
                  style={{ width: '25.0%' }}
                  className="bg-purple-600 flex items-center justify-center px-2 truncate"
                  title="SuperInvesting AI Baskets: 25.0% (₹9.4L)"
                >
                  AI Thematic Baskets (25%)
                </div>
                <div
                  style={{ width: '15.0%' }}
                  className="bg-blue-500 flex items-center justify-center px-2 truncate"
                  title="Healthcare & FMCG: 15.0% (₹5.6L)"
                >
                  Defensive FMCG (15%)
                </div>
                <div
                  style={{ width: '10.0%' }}
                  className="bg-slate-700 flex items-center justify-center px-2 truncate"
                  title="Index Buffer: 10.0% (₹3.8L)"
                >
                  Buffer (10%)
                </div>
              </div>
              <div className="flex justify-between text-[11px] text-emerald-700 font-medium mt-1">
                <span>✓ Max single-stock exposure capped at safe 18%</span>
                <span>✓ High-ROCE compounders driving compounding</span>
              </div>
            </div>
          </div>
        </div>

        {/* Infographic 2: Capital Flow & Tax Harvesting Blueprint */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90">
          <div className="mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Infographic 2 : Capital Reallocation & Zero-Tax Blueprint
            </span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
              Where Does Your Trimmed Capital Flow?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {/* Step 1: Capital Source */}
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/70 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded-sm">
                  Step 1 : Release Capital
                </span>
                <h4 className="text-xs font-bold text-slate-900 mt-2">Trim Midwest Gold</h4>
                <div className="text-lg font-black text-amber-900 mt-1">₹15,74,853</div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Trim from 59.7% down to 18% to bank your 58x multibagger profit safely.
                </p>
              </div>
            </div>

            {/* Step 2: Tax Shield */}
            <div className="p-4 rounded-xl bg-rose-50/80 border border-rose-200/70 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase text-rose-800 bg-rose-200/60 px-2 py-0.5 rounded-sm">
                  Step 2 : Tax Shield
                </span>
                <h4 className="text-xs font-bold text-slate-900 mt-2">Harvest 3 Laggards</h4>
                <div className="text-lg font-black text-rose-900 mt-1">-₹1,15,420</div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Exit HDFC (-51.6%), TMCV (-39.6%), and ITC (-33.9%) to generate loss offsets.
                </p>
              </div>
              <div className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-1 rounded-md mt-2">
                ⚡ Saves ~₹23,000 in Tax
              </div>
            </div>

            {/* Step 3: Deployment Core */}
            <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200/70 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase text-blue-800 bg-blue-200/60 px-2 py-0.5 rounded-sm">
                  Step 3 : Reallocate
                </span>
                <h4 className="text-xs font-bold text-slate-900 mt-2">Banking & Quality IT</h4>
                <div className="text-lg font-black text-blue-900 mt-1">₹11,50,000</div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Deploy ₹6.0L into ICICI/SBI and ₹5.5L into SuperInvesting "IT & Cloud Leaders" AI Basket.
                </p>
              </div>
            </div>

            {/* Step 4: Defensive Anchor */}
            <div className="p-4 rounded-xl bg-purple-50/80 border border-purple-200/70 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase text-purple-800 bg-purple-200/60 px-2 py-0.5 rounded-sm">
                  Step 4 : Defense
                </span>
                <h4 className="text-xs font-bold text-slate-900 mt-2">Healthcare & FMCG</h4>
                <div className="text-lg font-black text-purple-900 mt-1">₹4,24,853</div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Reinforce Sun Pharma, HAL, and HUL to create low-beta volatility buffers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Infographic 3: 30% Market Crash Stress-Test */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                Infographic 3 : Market Crash Stress Test Simulation
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">
                What Happens if Broad Small-Caps Fall 30% Tomorrow?
              </h3>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-400/30">
              Stress Test Scenario: -30% Drop
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
            {/* Unmended Damage */}
            <div className="p-4 rounded-xl bg-slate-800/80 border border-rose-500/40">
              <span className="text-xs text-rose-300 font-bold block mb-1">
                Unmended Portfolio Loss
              </span>
              <div className="text-2xl sm:text-3xl font-black text-rose-400">
                -₹6,74,937
              </div>
              <span className="text-[11px] text-slate-400 font-semibold block mt-1">
                -17.9% of your total net worth destroyed
              </span>
            </div>

            {/* Mended Damage */}
            <div className="p-4 rounded-xl bg-slate-800/80 border border-emerald-500/40">
              <span className="text-xs text-emerald-300 font-bold block mb-1">
                Mended Portfolio Loss
              </span>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                -₹1,69,820
              </div>
              <span className="text-[11px] text-slate-400 font-semibold block mt-1">
                -4.5% mild drawdown (absorbed by anchors)
              </span>
            </div>

            {/* Capital Shielded */}
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-400/30 text-center flex flex-col items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-emerald-400 mb-1" />
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                Capital Direct Shielded
              </span>
              <div className="text-2xl sm:text-3xl font-black text-white mt-0.5">
                ₹5,05,117
              </div>
              <span className="text-[11px] text-emerald-200 mt-1">
                Saved from small-cap drawdowns
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
