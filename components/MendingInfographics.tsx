'use client';

import React from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  AlertTriangle,
  CheckCircle2,
  Scale,
  ArrowDownRight,
  TrendingUp
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
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 lg:p-8 mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Visual Mending Blueprint
            <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
              Interactive Infographics
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            How executing our recommendations structurally mends your portfolio.
          </p>
        </div>

        {/* Sleek Black Button */}
        <button
          onClick={onExecuteMend}
          className="self-start sm:self-auto inline-flex items-center gap-2 text-xs font-bold text-white bg-black hover:bg-slate-800 px-4 py-2 rounded-xl shadow-xs transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-slate-300" />
          <span>{isMended ? 'Reset to Unmended' : 'Simulate Mended State'}</span>
        </button>
      </div>

      {/* 3 Creative Visual Infographics */}
      <div className="space-y-6">
        {/* Infographic 1: Weight Distribution Comparison */}
        <div className="p-5 rounded-xl bg-slate-50/70 border border-slate-200/70">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
              Infographic 1: Portfolio Weight Distribution
            </span>
            <span className="text-slate-400 font-medium">Total: <strong>₹37,69,158</strong></span>
          </div>

          <div className="space-y-4">
            {/* CURRENT BAR */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-rose-600 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Current: Severe 60% Skew
                </span>
                <span className="text-slate-400 font-medium">Score 60/100</span>
              </div>
              <div className="w-full h-7 rounded-lg overflow-hidden flex text-[10px] font-bold text-white shadow-2xs">
                <div style={{ width: '59.7%' }} className="bg-rose-500 flex items-center justify-center px-2 truncate">
                  Midwest Gold: 59.7% (₹22.5L)
                </div>
                <div style={{ width: '22.1%' }} className="bg-amber-500 flex items-center justify-center px-2 truncate">
                  8 Losers: 22.1%
                </div>
                <div style={{ width: '18.2%' }} className="bg-slate-700 flex items-center justify-center px-2 truncate">
                  Bluechips: 18.2%
                </div>
              </div>
            </div>

            {/* MENDED BAR */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Mended: Balanced All-Weather Model
                </span>
                <span className="text-emerald-700 font-bold">Score 86/100 (+26 pts)</span>
              </div>
              <div className="w-full h-7 rounded-lg overflow-hidden flex text-[10px] font-bold text-white shadow-2xs">
                <div style={{ width: '18.0%' }} className="bg-slate-900 flex items-center justify-center px-2 truncate">
                  Midwest: 18%
                </div>
                <div style={{ width: '32.0%' }} className="bg-emerald-600 flex items-center justify-center px-2 truncate">
                  Banking: 32%
                </div>
                <div style={{ width: '25.0%' }} className="bg-blue-600 flex items-center justify-center px-2 truncate">
                  AI Baskets: 25%
                </div>
                <div style={{ width: '15.0%' }} className="bg-indigo-600 flex items-center justify-center px-2 truncate">
                  Defense/FMCG: 15%
                </div>
                <div style={{ width: '10.0%' }} className="bg-slate-500 flex items-center justify-center px-2 truncate">
                  Buffer: 10%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Infographic 2: Capital Flow & Zero-Tax Reallocation Map */}
        <div className="p-5 rounded-xl bg-white border border-slate-200/80">
          <div className="flex items-center justify-between mb-4">
            <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
              Infographic 2: Capital Flow & Zero-Tax Blueprint
            </span>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-200">
              ⚡ ₹0 Capital Gains Tax
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Source */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400">Step 1: Release Capital</span>
                <div className="text-base font-black text-slate-900 mt-1">₹15,74,853</div>
                <span className="text-[11px] text-slate-500 font-medium block mt-0.5">Trim Midwest to 18%</span>
              </div>
            </div>

            {/* Tax Offset */}
            <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-200/60 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-rose-500">Step 2: Tax Shield</span>
                <div className="text-base font-black text-rose-600 mt-1">-₹1,15,420 Loss</div>
                <span className="text-[11px] text-slate-600 font-medium block mt-0.5">Harvest HDFC/TMCV/ITC</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 mt-1">Saves ~₹23,084 tax</span>
            </div>

            {/* Reallocation 1 */}
            <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/60 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-600">Step 3: Compounding Core</span>
                <div className="text-base font-black text-emerald-950 mt-1">₹6,00,000</div>
                <span className="text-[11px] text-slate-600 font-medium block mt-0.5">ICICI & SBI (Low P/E)</span>
              </div>
            </div>

            {/* Reallocation 2 */}
            <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200/60 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-blue-600">Step 4: Thematic Growth</span>
                <div className="text-base font-black text-blue-950 mt-1">₹5,50,000</div>
                <span className="text-[11px] text-slate-600 font-medium block mt-0.5">AI IT & Cloud Basket</span>
              </div>
            </div>
          </div>
        </div>

        {/* Infographic 3: 30% Crash Stress Test Simulation (Sleek Black Card) */}
        <div className="p-5 sm:p-6 rounded-xl bg-black text-white shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Infographic 3: Market Crash Stress Test (-30% Scenario)
              </span>
              <h3 className="text-sm font-bold text-white mt-0.5">
                If Small-Caps Correct by 30% Tomorrow
              </h3>
            </div>
            <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
              ₹5,05,117 Capital Protected
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Unmended Loss</span>
              <div className="text-xl font-black text-rose-400 mt-1">-₹6,74,937</div>
              <span className="text-[10px] text-slate-400 block mt-0.5">-17.9% net worth drop</span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Mended Loss</span>
              <div className="text-xl font-black text-emerald-400 mt-1">-₹1,69,820</div>
              <span className="text-[10px] text-slate-400 block mt-0.5">-4.5% mild fluctuation</span>
            </div>

            <div className="p-3.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 flex flex-col justify-center">
              <span className="text-[10px] text-emerald-400 uppercase font-bold">Direct Wealth Preserved</span>
              <div className="text-xl font-black text-white mt-1">₹5,05,117</div>
              <span className="text-[10px] text-emerald-300 block mt-0.5">Shielded from drawdowns</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
