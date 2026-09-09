'use client';

import React from 'react';
import { Holding } from '../lib/types';
import { PieChart, AlertCircle } from 'lucide-react';

interface SectorAllocationChartProps {
  holdings: Holding[];
  totalValue: number;
}

// Typical Nifty 50 sector distribution benchmark
const NIFTY_SECTOR_BENCHMARK: Record<string, number> = {
  'Banking & Financials': 32.5,
  'Information Technology': 12.8,
  'Oil, Gas & Conglomerate': 11.4,
  'FMCG & Consumer': 9.2,
  'Automobile': 6.8,
  'Healthcare & Pharma': 4.5,
  'Capital Goods & Infra': 4.2,
  'Telecommunications': 3.8,
  'Metals & Mining': 3.5,
  'Defense & Aerospace': 2.0,
};

export const SectorAllocationChart: React.FC<SectorAllocationChartProps> = ({
  holdings,
  totalValue,
}) => {
  // Aggregate portfolio sectors
  const sectorMap: Record<string, number> = {};
  holdings.forEach(h => {
    sectorMap[h.sector] = (sectorMap[h.sector] || 0) + h.currentValue;
  });

  const sectorData = Object.entries(sectorMap)
    .map(([sector, val]) => {
      const weight = totalValue > 0 ? (val / totalValue) * 100 : 0;
      const benchmark = NIFTY_SECTOR_BENCHMARK[sector] || 3.0;
      const difference = weight - benchmark;
      return {
        sector,
        value: val,
        weight,
        benchmark,
        difference,
      };
    })
    .sort((a, b) => b.weight - a.weight);

  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 lg:p-8 mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            Sector Weight vs Benchmark Allocation
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Compare your active sector bets against standard NIFTY 50 reference allocations.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {sectorData.map((item) => {
          const isOverweight = item.difference > 0;
          const isSeverelyOverweight = item.difference > 25;
          const isSeverelyUnderweight = item.difference < -10;

          return (
            <div key={item.sector} className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">{item.sector}</span>
                  {isSeverelyOverweight && (
                    <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-sm">
                      Overweight +{item.difference.toFixed(1)}%
                    </span>
                  )}
                  {isSeverelyUnderweight && (
                    <span className="text-[10px] font-black uppercase text-rose-800 bg-rose-100 border border-rose-200 px-2 py-0.5 rounded-sm">
                      Underweight {item.difference.toFixed(1)}%
                    </span>
                  )}
                </div>

                <div className="text-xs font-semibold text-slate-600 flex items-center gap-3">
                  <span>Your Weight: <strong className="text-slate-900">{item.weight.toFixed(1)}%</strong></span>
                  <span className="text-slate-400">|</span>
                  <span className="text-slate-500">Benchmark: {item.benchmark.toFixed(1)}%</span>
                </div>
              </div>

              {/* Progress bars comparison */}
              <div className="space-y-1">
                {/* Your Weight bar */}
                <div className="w-full bg-slate-200/70 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isSeverelyOverweight ? 'bg-amber-500' : 'bg-blue-600'
                    }`}
                    style={{ width: `${Math.min(100, item.weight)}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
