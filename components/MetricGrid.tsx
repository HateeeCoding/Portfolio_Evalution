'use client';

import React, { useState } from 'react';
import { MetricEvaluation } from '../lib/types';
import { MetricCard } from './MetricCard';
import { SlidersHorizontal } from 'lucide-react';

interface MetricGridProps {
  metrics: MetricEvaluation[];
  onActionClick: () => void;
}

export const MetricGrid: React.FC<MetricGridProps> = ({ metrics, onActionClick }) => {
  const [filter, setFilter] = useState<'all' | 'critical' | 'risk' | 'growth'>('all');

  const filteredMetrics = metrics.filter(m => {
    if (filter === 'critical') return m.status === 'critical' || m.status === 'warning';
    if (filter === 'risk') return m.id === 'diversification' || m.id === 'downside_risk' || m.id === 'sector_balance';
    if (filter === 'growth') return m.id === 'win_rate_breadth' || m.id === 'valuation_quality' || m.id === 'alpha_attribution';
    return true;
  });

  return (
    <section className="mb-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            6 Core Assessment Pillars
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
              Scored /100
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Transparent, parameter-level diagnostics replacing vague single scores with actionable clarity.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200/80 text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Pillars ({metrics.length})
          </button>
          <button
            onClick={() => setFilter('critical')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filter === 'critical' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Needs Attention (3)
          </button>
          <button
            onClick={() => setFilter('risk')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filter === 'risk' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Risk & Concentration
          </button>
          <button
            onClick={() => setFilter('growth')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filter === 'growth' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Valuation & Return
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMetrics.map((metric) => (
          <MetricCard
            key={metric.id}
            metric={metric}
            onActionClick={onActionClick}
          />
        ))}
      </div>
    </section>
  );
};
