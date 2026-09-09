'use client';

import React from 'react';
import { Sparkles, RefreshCw, UploadCloud, Printer, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  currentPreset: string;
  onSelectPreset: (preset: string) => void;
  onOpenUpload: () => void;
  onPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPreset,
  onSelectPreset,
  onOpenUpload,
  onPrint,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Tag */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-500 flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-500/20">
              S
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight">SUPER INVESTING</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200/60">
                  <Sparkles className="w-3 h-3" /> AI Evaluator 2.0
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">Multi-Pillar Health Scorecard & Actionable Advisory</p>
            </div>
          </div>

          {/* Controls & Switcher */}
          <div className="flex items-center gap-3">
            {/* Portfolio Selector */}
            <div className="relative">
              <select
                value={currentPreset}
                onChange={(e) => onSelectPreset(e.target.value)}
                className="text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 border border-slate-300/80 rounded-lg px-3 py-2 pr-8 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
              >
                <option value="current">Current Portfolio (₹37.7L - Live Data)</option>
                <option value="balanced">Preset: Balanced Bluechip Benchmark</option>
              </select>
            </div>

            {/* Upload Custom */}
            <button
              onClick={onOpenUpload}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 transition-all shadow-xs"
            >
              <UploadCloud className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden md:inline">Upload Custom</span>
            </button>

            {/* Print / Export */}
            <button
              onClick={onPrint}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-3.5 py-2 transition-all shadow-xs shadow-blue-600/20"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export Scorecard</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
