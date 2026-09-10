'use client';

import React from 'react';
import { 
  PieChart, 
  ShieldAlert, 
  Activity, 
  TrendingUp, 
  Layers, 
  Award,
  ArrowRight,
  TrendingDown
} from 'lucide-react';

interface UnifiedPillarsMatrixProps {
  isMended: boolean;
  onApplyAction: (actionKey: string) => void;
}

export const UnifiedPillarsMatrix: React.FC<UnifiedPillarsMatrixProps> = ({
  isMended,
  onApplyAction,
}) => {
  const pillars = [
    {
      id: 'diversification',
      title: 'Concentration & Diversification',
      icon: PieChart,
      iconColor: 'text-indigo-600 bg-indigo-50',
      currentScore: 26,
      mendedScore: 88,
      currentVal: '59.7%',
      targetVal: '18.0%',
      metricName: 'Top Holding Skew',
      benchmark: 'Safe < 15%',
      actionLabel: 'Trim Midwest Gold',
      actionKey: 'trim_midwest',
    },
    {
      id: 'downside_risk',
      title: 'Downside & Volatility Risk',
      icon: ShieldAlert,
      iconColor: 'text-rose-600 bg-rose-50',
      currentScore: 38,
      mendedScore: 84,
      currentVal: '-17.9%',
      targetVal: '-4.5%',
      metricName: '30% Drop Exposure',
      benchmark: 'Safe Loss < 6%',
      actionLabel: 'Add Safety Anchors',
      actionKey: 'add_anchors',
    },
    {
      id: 'win_rate_breadth',
      title: 'Win-Rate & Portfolio Breadth',
      icon: Activity,
      iconColor: 'text-amber-600 bg-amber-50',
      currentScore: 44,
      mendedScore: 76,
      currentVal: '50% (8 Drags)',
      targetVal: '75% Positive',
      metricName: 'Profitable Positions',
      benchmark: 'Target > 65%',
      actionLabel: 'Tax Harvest 3 Losers',
      actionKey: 'harvest_losers',
    },
    {
      id: 'valuation_quality',
      title: 'Valuation & Earnings Quality',
      icon: TrendingUp,
      iconColor: 'text-blue-600 bg-blue-50',
      currentScore: 52,
      mendedScore: 72,
      currentVal: '59.98x PE',
      targetVal: '28.4x PE',
      metricName: 'Blended P/E Multiple',
      benchmark: 'NIFTY 22.4x',
      actionLabel: 'Rotate to Quality',
      actionKey: 'rotate_quality',
    },
    {
      id: 'sector_balance',
      title: 'Sector Balance & Macro Health',
      icon: Layers,
      iconColor: 'text-purple-600 bg-purple-50',
      currentScore: 46,
      mendedScore: 82,
      currentVal: '60% Metals',
      targetVal: 'Balanced Spread',
      metricName: 'Top Sector Dominance',
      benchmark: 'Max Sector < 25%',
      actionLabel: 'Rebalance Sectors',
      actionKey: 'rebalance_sectors',
    },
    {
      id: 'alpha_attribution',
      title: 'Benchmark Alpha & Return Quality',
      icon: Award,
      iconColor: 'text-emerald-600 bg-emerald-50',
      currentScore: 78,
      mendedScore: 86,
      currentVal: '+152% Raw',
      targetVal: 'Protected Alpha',
      metricName: 'Alpha vs NIFTY',
      benchmark: 'NIFTY +18%',
      actionLabel: 'Lock In Profits',
      actionKey: 'lock_alpha',
    },
  ];

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 lg:p-8 mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            6 Core Assessment Pillars
            <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
              Scored /100
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            The green bar extension illustrates the exact potential score boost our recommendations unlock.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-slate-500">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
            Current Reality
          </span>
          <span className="flex items-center gap-1.5 text-emerald-600">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
            +Potential Boost Unlocked
          </span>
        </div>
      </div>

      {/* Unified 6 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          const boost = pillar.mendedScore - pillar.currentScore;

          return (
            <div
              key={pillar.id}
              className="p-5 rounded-xl border border-slate-200/80 bg-white hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-lg ${pillar.iconColor}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 leading-tight">
                        {pillar.title}
                      </h3>
                      <span className="text-[10px] font-medium text-slate-400 block mt-0.5">
                        {pillar.metricName}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-baseline gap-1">
                      <span className={`text-xl font-extrabold ${isMended ? 'text-emerald-600' : 'text-slate-900'}`}>
                        {isMended ? pillar.mendedScore : pillar.currentScore}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold">/100</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 block">
                      +{boost} Potential
                    </span>
                  </div>
                </div>

                {/* THE DUAL PROGRESS BAR: Existing Red/Amber line + GREEN EXTENSION LINE */}
                <div className="space-y-1.5 mb-3.5">
                  <div className="w-full bg-slate-100 h-2.5 rounded-full relative overflow-hidden flex">
                    {isMended ? (
                      /* Fully Mended Bar */
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                        style={{ width: `${pillar.mendedScore}%` }}
                      />
                    ) : (
                      <>
                        {/* 1. Existing Red / Amber Bar for Current Score */}
                        <div
                          className={`h-full rounded-l-full ${
                            pillar.currentScore < 45 ? 'bg-rose-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${pillar.currentScore}%` }}
                          title={`Current Score: ${pillar.currentScore}`}
                        />
                        {/* 2. Green Line Beyond Existing Red One (Showing Potential Boost) */}
                        <div
                          className="h-full bg-emerald-500 rounded-r-full animate-pulse transition-all duration-700"
                          style={{ width: `${boost}%` }}
                          title={`Potential Score with Recommendations: +${boost} pts (${pillar.mendedScore}/100)`}
                        />
                      </>
                    )}
                  </div>

                  <div className="flex justify-between text-[10px] font-semibold">
                    <span className="text-slate-500">
                      Current: <strong className="text-slate-800">{pillar.currentScore}</strong>
                    </span>
                    <span className="text-emerald-600 font-bold">
                      Potential: <strong>{pillar.mendedScore}</strong> (+{boost} pts)
                    </span>
                  </div>
                </div>

                {/* Data Chips (Clean & Zero Text Clutter) */}
                <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100/80">
                    <span className="text-[10px] text-slate-400 block font-medium">Now</span>
                    <span className="font-bold text-slate-800">{pillar.currentVal}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-emerald-50/60 border border-emerald-100 text-emerald-900">
                    <span className="text-[10px] text-emerald-700 block font-medium">Mended Target</span>
                    <span className="font-bold text-emerald-700">{pillar.targetVal}</span>
                  </div>
                </div>
              </div>

              {/* Sleek Action Trigger */}
              <button
                onClick={() => onApplyAction(pillar.actionKey)}
                className="w-full py-1.5 px-3 text-xs font-bold text-slate-800 hover:text-white bg-slate-50 hover:bg-black border border-slate-200/80 rounded-lg transition-all flex items-center justify-between group"
              >
                <span>{pillar.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
