'use client';

import React, { useState } from 'react';
import { Holding } from '../lib/types';
import { Search, ArrowUpRight, ArrowDownRight, Briefcase, Filter } from 'lucide-react';

interface HoldingsSidebarProps {
  holdings: Holding[];
  totalPortfolioValue: number;
  onQuickAction?: (symbol: string, action: string) => void;
}

export const HoldingsSidebar: React.FC<HoldingsSidebarProps> = ({
  holdings,
  totalPortfolioValue,
  onQuickAction,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'LOSERS' | 'GAINERS'>('ALL');

  const getAction = (h: Holding, weight: number) => {
    const returnPct = ((h.currentValue - h.investedAmount) / h.investedAmount) * 100;
    if (weight > 25) return { label: 'Trim 40%', color: 'bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200' };
    if (returnPct < -30) return { label: 'Tax Harvest', color: 'bg-rose-100 text-rose-800 border-rose-200 hover:bg-rose-200' };
    if (h.aiScore >= 66 && returnPct > 0) return { label: 'Accumulate', color: 'bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200' };
    return { label: 'Hold', color: 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200' };
  };

  const filteredHoldings = holdings.filter((h) => {
    const matchesSearch = h.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          h.name.toLowerCase().includes(searchTerm.toLowerCase());
    const isGainer = h.currentValue >= h.investedAmount;
    if (!matchesSearch) return false;
    if (filter === 'LOSERS') return !isGainer;
    if (filter === 'GAINERS') return isGainer;
    return true;
  });

  return (
    <aside className="w-full lg:w-80 xl:w-96 bg-white rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col shrink-0 h-fit lg:sticky lg:top-20">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center font-bold text-xs">
              <Briefcase className="w-3.5 h-3.5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 leading-tight">My Holdings</h2>
              <span className="text-[10px] text-slate-400 font-medium">16 Stocks • ₹37.69L Total</span>
            </div>
          </div>
          <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
            Live View
          </span>
        </div>

        {/* Quick Search */}
        <div className="relative mb-2.5">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search stock ticker..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-black text-slate-800"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg text-[11px] font-semibold text-slate-600">
          <button
            onClick={() => setFilter('ALL')}
            className={`flex-1 py-1 text-center rounded-md transition-all ${
              filter === 'ALL' ? 'bg-white text-slate-900 shadow-2xs' : 'hover:text-slate-900'
            }`}
          >
            All (16)
          </button>
          <button
            onClick={() => setFilter('LOSERS')}
            className={`flex-1 py-1 text-center rounded-md transition-all ${
              filter === 'LOSERS' ? 'bg-white text-rose-700 shadow-2xs' : 'hover:text-slate-900'
            }`}
          >
            8 Drags
          </button>
          <button
            onClick={() => setFilter('GAINERS')}
            className={`flex-1 py-1 text-center rounded-md transition-all ${
              filter === 'GAINERS' ? 'bg-white text-emerald-700 shadow-2xs' : 'hover:text-slate-900'
            }`}
          >
            8 Gainers
          </button>
        </div>
      </div>

      {/* Holdings Scrollable Cards List */}
      <div className="p-3 sm:p-4 space-y-2 max-h-[calc(100vh-280px)] overflow-y-auto">
        {filteredHoldings.map((h) => {
          const weight = totalPortfolioValue > 0 ? (h.currentValue / totalPortfolioValue) * 100 : 0;
          const rupeeGain = h.currentValue - h.investedAmount;
          const returnPct = h.investedAmount > 0 ? (rupeeGain / h.investedAmount) * 100 : 0;
          const isGain = rupeeGain >= 0;
          const action = getAction(h, weight);

          return (
            <div
              key={h.id}
              className={`p-3 rounded-xl border transition-all hover:shadow-xs ${
                weight > 25
                  ? 'bg-amber-50/40 border-amber-200'
                  : 'bg-white border-slate-200/70 hover:border-slate-300'
              }`}
            >
              {/* Top Row: Ticker, Weight, AI Score */}
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-xs text-slate-900">{h.symbol}</span>
                  <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded-xs">
                    {h.marketCap}
                  </span>
                  {weight > 25 && (
                    <span className="text-[9px] font-extrabold uppercase px-1 py-0.2 rounded-xs bg-amber-200 text-amber-900">
                      59.7% SKEW
                    </span>
                  )}
                </div>

                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md ${
                  h.aiScore >= 68 ? 'bg-emerald-50 text-emerald-700' : h.aiScore >= 60 ? 'bg-slate-100 text-slate-800' : 'bg-rose-50 text-rose-700'
                }`}>
                  Score {h.aiScore}
                </span>
              </div>

              {/* Middle Row: Name, Value, Return */}
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[11px] text-slate-500 truncate max-w-[130px]" title={h.name}>
                  {h.name}
                </span>

                <div className="text-right">
                  <span className="font-extrabold text-slate-900 block leading-tight">
                    ₹{Math.round(h.currentValue).toLocaleString('en-IN')}
                  </span>
                  <span className={`text-[10px] font-bold flex items-center justify-end gap-0.5 ${
                    isGain ? 'text-emerald-600' : 'text-rose-600'
                  }`}>
                    {isGain ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownRight className="w-2.5 h-2.5" />}
                    {isGain ? '+' : ''}{returnPct.toFixed(1)}%
                  </span>
                </div>
              </div>

              {/* Bottom Row: Weight Bar & Quick Action */}
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                <div className="flex-1">
                  <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${weight > 25 ? 'bg-amber-500' : 'bg-black'}`}
                      style={{ width: `${Math.min(100, weight)}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium mt-0.5 block">
                    {weight.toFixed(1)}% weight
                  </span>
                </div>

                <button
                  onClick={() => onQuickAction && onQuickAction(h.symbol, action.label)}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md border transition-all shrink-0 ${action.color}`}
                >
                  {action.label}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
