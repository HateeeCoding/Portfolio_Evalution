'use client';

import React from 'react';
import { Recommendation } from '../lib/types';
import { Sparkles, ArrowRight, ShieldCheck, Scissors, Scale, Compass } from 'lucide-react';

interface RecommendationsListProps {
  recommendations: Recommendation[];
  onApplySimulation: (rec: Recommendation) => void;
}

export const RecommendationsList: React.FC<RecommendationsListProps> = ({
  recommendations,
  onApplySimulation,
}) => {
  const getActionIcon = (type: Recommendation['actionType']) => {
    switch (type) {
      case 'TRIM':
        return <ShieldCheck className="w-5 h-5 text-amber-600" />;
      case 'HARVEST':
        return <Scissors className="w-5 h-5 text-rose-600" />;
      case 'REBALANCE':
        return <Scale className="w-5 h-5 text-blue-600" />;
      case 'DIVERSIFY':
        return <Compass className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <section className="mb-10 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> AI Optimization Engine
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Prescriptive Portfolio Suggestions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Concrete, mathematical steps to de-risk your capital and maximize risk-adjusted compounding.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="p-5 rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-white border border-slate-200 shadow-2xs">
                    {getActionIcon(rec.actionType)}
                  </div>
                  <span
                    className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md tracking-wider ${
                      rec.priority === 'high'
                        ? 'bg-rose-100 text-rose-700 border border-rose-200'
                        : rec.priority === 'medium'
                        ? 'bg-amber-100 text-amber-700 border border-amber-200'
                        : 'bg-blue-100 text-blue-700 border border-blue-200'
                    }`}
                  >
                    {rec.priority} Priority
                  </span>
                </div>
              </div>

              <h3 className="text-sm font-bold text-slate-900 mb-2">
                {rec.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {rec.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="text-[11px] font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                ⚡ <strong>Expected Impact:</strong> {rec.potentialImpact}
              </div>

              <button
                onClick={() => onApplySimulation(rec)}
                className="text-xs font-bold text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-200 hover:border-blue-600 px-3 py-1.5 rounded-lg transition-all inline-flex items-center justify-center gap-1 shadow-2xs self-end sm:self-auto shrink-0"
              >
                Simulate Fix <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
