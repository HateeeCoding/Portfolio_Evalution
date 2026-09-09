'use client';

import React, { useState } from 'react';
import { Holding } from '../lib/types';
import { Search, ArrowUpDown, ShieldAlert, ArrowUpRight, ArrowDownRight, Tag } from 'lucide-react';

interface HoldingsTableProps {
  holdings: Holding[];
  totalPortfolioValue: number;
}

export const HoldingsTable: React.FC<HoldingsTableProps> = ({
  holdings,
  totalPortfolioValue,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('ALL');
  const [sortBy, setSortBy] = useState<'value' | 'gain' | 'score' | 'weight'>('value');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  // Sectors list
  const sectors = ['ALL', ...Array.from(new Set(holdings.map(h => h.sector)))];

  // Derive recommended action
  const getHoldingAction = (h: Holding, weight: number): { label: string; color: string } => {
    const returnPct = ((h.currentValue - h.investedAmount) / h.investedAmount) * 100;
    if (weight > 30) return { label: 'TRIM (Lock Profit)', color: 'bg-amber-100 text-amber-800 border-amber-300' };
    if (returnPct < -30) return { label: 'REVIEW (Tax Loss)', color: 'bg-rose-100 text-rose-800 border-rose-300' };
    if (h.aiScore > 70 && returnPct > 0) return { label: 'ACCUMULATE', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
    return { label: 'HOLD', color: 'bg-slate-100 text-slate-700 border-slate-200' };
  };

  // Filter & sort
  const filteredHoldings = holdings
    .filter(h => {
      const matchesSearch = h.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            h.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSector = selectedSector === 'ALL' || h.sector === selectedSector;
      return matchesSearch && matchesSector;
    })
    .sort((a, b) => {
      let valA = a.currentValue;
      let valB = b.currentValue;

      if (sortBy === 'gain') {
        valA = ((a.currentValue - a.investedAmount) / a.investedAmount);
        valB = ((b.currentValue - b.investedAmount) / b.investedAmount);
      } else if (sortBy === 'score') {
        valA = a.aiScore;
        valB = b.aiScore;
      } else if (sortBy === 'weight') {
        valA = a.currentValue;
        valB = b.currentValue;
      }

      return sortOrder === 'desc' ? valB - valA : valA - valB;
    });

  const handleSort = (type: 'value' | 'gain' | 'score' | 'weight') => {
    if (sortBy === type) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(type);
      setSortOrder('desc');
    }
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden mb-12">
      {/* Header & Filter Controls */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              Individual Holdings Breakdown
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                {holdings.length} Assets
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Rupee attribution, % weight, and prescriptive buy/hold/trim recommendations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search stock..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all w-40 sm:w-48"
              />
            </div>

            {/* Sector filter */}
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="text-xs rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer text-slate-700 font-medium"
            >
              {sectors.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <th className="py-3.5 px-4 sm:px-6">Company</th>
              <th className="py-3.5 px-3">Sector</th>
              <th
                onClick={() => handleSort('weight')}
                className="py-3.5 px-3 cursor-pointer hover:text-slate-900 transition-colors"
              >
                <span className="flex items-center gap-1">
                  Weight % <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </span>
              </th>
              <th
                onClick={() => handleSort('value')}
                className="py-3.5 px-3 cursor-pointer hover:text-slate-900 transition-colors"
              >
                <span className="flex items-center gap-1">
                  Current Value <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </span>
              </th>
              <th
                onClick={() => handleSort('gain')}
                className="py-3.5 px-3 cursor-pointer hover:text-slate-900 transition-colors"
              >
                <span className="flex items-center gap-1">
                  Rupee P/L (% Return) <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </span>
              </th>
              <th
                onClick={() => handleSort('score')}
                className="py-3.5 px-3 cursor-pointer hover:text-slate-900 transition-colors"
              >
                <span className="flex items-center gap-1">
                  AI Score <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </span>
              </th>
              <th className="py-3.5 px-4 sm:px-6 text-right">Action Advisory</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredHoldings.map((h) => {
              const weight = totalPortfolioValue > 0 ? (h.currentValue / totalPortfolioValue) * 100 : 0;
              const rupeeGain = h.currentValue - h.investedAmount;
              const returnPct = h.investedAmount > 0 ? (rupeeGain / h.investedAmount) * 100 : 0;
              const isGain = rupeeGain >= 0;
              const action = getHoldingAction(h, weight);

              return (
                <tr key={h.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* Symbol & Name */}
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">
                    <div className="flex items-center gap-2">
                      <span>{h.symbol}</span>
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-sm">
                        {h.marketCap}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-normal block truncate max-w-[140px] sm:max-w-xs">
                      {h.name}
                    </span>
                  </td>

                  {/* Sector */}
                  <td className="py-3.5 px-3 text-slate-600 font-medium">
                    {h.sector}
                  </td>

                  {/* Weight % */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${weight > 25 ? 'text-amber-600' : 'text-slate-800'}`}>
                        {weight.toFixed(1)}%
                      </span>
                      <div className="w-14 bg-slate-100 h-1.5 rounded-full overflow-hidden hidden sm:block">
                        <div
                          className={`h-full rounded-full ${weight > 25 ? 'bg-amber-500' : 'bg-blue-500'}`}
                          style={{ width: `${Math.min(100, weight)}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Current Value */}
                  <td className="py-3.5 px-3 font-bold text-slate-900">
                    ₹{Math.round(h.currentValue).toLocaleString('en-IN')}
                    <span className="block text-[11px] text-slate-400 font-normal">
                      Inv: ₹{Math.round(h.investedAmount).toLocaleString('en-IN')}
                    </span>
                  </td>

                  {/* Rupee Gain & Return */}
                  <td className="py-3.5 px-3 font-semibold">
                    <div className={`flex items-center gap-1 ${isGain ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {isGain ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                      <span>{isGain ? '+' : ''}₹{Math.round(rupeeGain).toLocaleString('en-IN')}</span>
                    </div>
                    <span className={`text-[11px] block font-bold ${isGain ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {isGain ? '+' : ''}{returnPct.toFixed(1)}%
                    </span>
                  </td>

                  {/* AI Score */}
                  <td className="py-3.5 px-3 font-bold">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-black ${
                      h.aiScore >= 68 ? 'bg-emerald-100 text-emerald-800' : h.aiScore >= 62 ? 'bg-slate-100 text-slate-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {h.aiScore}
                    </span>
                  </td>

                  {/* Action Advisory Badge */}
                  <td className="py-3.5 px-4 sm:px-6 text-right">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-black uppercase px-2.5 py-1 rounded-md border ${action.color}`}>
                      {action.label}
                    </span>
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
