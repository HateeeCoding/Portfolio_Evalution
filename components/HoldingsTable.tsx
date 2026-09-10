'use client';

import React, { useState } from 'react';
import { Holding } from '../lib/types';
import { Search, Edit3, ArrowUpDown, ArrowUpRight, ArrowDownRight, Check } from 'lucide-react';

interface HoldingsTableProps {
  holdings: Holding[];
  totalPortfolioValue: number;
  onQuickAction?: (symbol: string, action: string) => void;
}

export const HoldingsTable: React.FC<HoldingsTableProps> = ({
  holdings,
  totalPortfolioValue,
  onQuickAction,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'GAINERS' | 'LOSERS' | 'CONCENTRATED'>('ALL');

  // Derive recommended action matching our mending logic
  const getActionInfo = (h: Holding, weight: number) => {
    const returnPct = ((h.currentValue - h.investedAmount) / h.investedAmount) * 100;
    if (weight > 25) {
      return { label: 'Trim 40% (Bank Profit)', color: 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100', action: 'TRIM' };
    }
    if (returnPct < -30) {
      return { label: 'Harvest Tax Loss', color: 'bg-rose-50 text-rose-800 border-rose-300 hover:bg-rose-100', action: 'HARVEST' };
    }
    if (h.aiScore >= 66 && returnPct > 0) {
      return { label: 'Accumulate', color: 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100', action: 'ACCUMULATE' };
    }
    return { label: 'Hold & Compound', color: 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100', action: 'HOLD' };
  };

  const filteredHoldings = holdings.filter((h) => {
    const matchesSearch = h.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          h.name.toLowerCase().includes(searchTerm.toLowerCase());
    const isGainer = h.currentValue >= h.investedAmount;
    const weight = (h.currentValue / totalPortfolioValue) * 100;

    if (!matchesSearch) return false;
    if (activeFilter === 'GAINERS') return isGainer;
    if (activeFilter === 'LOSERS') return !isGainer;
    if (activeFilter === 'CONCENTRATED') return weight > 5;
    return true;
  });

  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden mb-12">
      {/* Table Header matching Image 1 */}
      <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-slate-900">My Holdings</h2>
          <button className="text-slate-400 hover:text-slate-600 p-1">
            <Edit3 className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Pills & Search */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-semibold text-slate-600">
            <button
              onClick={() => setActiveFilter('ALL')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                activeFilter === 'ALL' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              All ({holdings.length})
            </button>
            <button
              onClick={() => setActiveFilter('LOSERS')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                activeFilter === 'LOSERS' ? 'bg-white text-rose-700 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              8 Drags (Tax Harvest)
            </button>
            <button
              onClick={() => setActiveFilter('GAINERS')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                activeFilter === 'GAINERS' ? 'bg-white text-emerald-700 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              Gainers
            </button>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-purple-500 w-36 sm:w-44"
            />
          </div>
        </div>
      </div>

      {/* Table matching exact layout of Image 1 */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-500 font-semibold text-[11px]">
              <th className="py-3 px-4 sm:px-6">Company</th>
              <th className="py-3 px-3">Score</th>
              <th className="py-3 px-3">Value</th>
              <th className="py-3 px-3">Return</th>
              <th className="py-3 px-3 text-right">Mending Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredHoldings.map((h) => {
              const weight = totalPortfolioValue > 0 ? (h.currentValue / totalPortfolioValue) * 100 : 0;
              const rupeeGain = h.currentValue - h.investedAmount;
              const returnPct = h.investedAmount > 0 ? (rupeeGain / h.investedAmount) * 100 : 0;
              const isGain = rupeeGain >= 0;
              const action = getActionInfo(h, weight);

              return (
                <tr key={h.id} className="hover:bg-slate-50/60 transition-colors">
                  {/* Company */}
                  <td className="py-3 px-4 sm:px-6 font-bold text-slate-900">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-700 shrink-0">
                        {h.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900">{h.symbol}</span>
                        <span className="text-[10px] font-normal text-slate-400 block truncate max-w-[120px] sm:max-w-xs">
                          {h.name} • {weight.toFixed(1)}% Weight
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Score matching Image 1 */}
                  <td className="py-3 px-3 font-semibold text-slate-700">
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold ${
                      h.aiScore >= 68 ? 'bg-emerald-50 text-emerald-700' : h.aiScore >= 60 ? 'bg-slate-100 text-slate-800' : 'bg-rose-50 text-rose-700'
                    }`}>
                      {h.aiScore}
                    </span>
                  </td>

                  {/* Value */}
                  <td className="py-3 px-3 font-bold text-slate-900">
                    ₹{Math.round(h.currentValue).toLocaleString('en-IN')}
                  </td>

                  {/* Return matching Image 1 with exact arrows */}
                  <td className="py-3 px-3 font-semibold">
                    <span className={`flex items-center gap-1 font-bold ${
                      isGain ? 'text-emerald-600' : 'text-rose-600'
                    }`}>
                      {isGain ? '▲' : '▼'} {Math.abs(returnPct).toFixed(2)}%
                    </span>
                  </td>

                  {/* Mending Action */}
                  <td className="py-3 px-4 sm:px-6 text-right">
                    <button
                      onClick={() => onQuickAction && onQuickAction(h.symbol, action.action)}
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-md border transition-all ${action.color}`}
                    >
                      <span>{action.label}</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
