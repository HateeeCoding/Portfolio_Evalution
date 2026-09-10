'use client';

import React from 'react';
import { 
  PieChart, 
  ShieldAlert, 
  Activity, 
  TrendingUp, 
  Layers, 
  Award,
  ArrowRight
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
      title: 'Portfolio Diversity',
      subtitle: 'Concentration & Single-Stock Risk',
      icon: PieChart,
      iconColor: 'text-indigo-600 bg-indigo-50',
      currentScore: 26,
      mendedScore: 88,
      nowLabel: 'Top Stock Skew',
      nowVal: '59.7% (Midwest)',
      targetLabel: 'Target Allocation',
      targetVal: '18.0% Safe Cap',
      actionLabel: 'Trim Midwest Gold',
      actionKey: 'trim_midwest',
    },
    {
      id: 'downside_risk',
      title: 'Crash Resistance',
      subtitle: 'Downside Capital Protection',
      icon: ShieldAlert,
      iconColor: 'text-rose-600 bg-rose-50',
      currentScore: 38,
      mendedScore: 84,
      nowLabel: '30% Crash Impact',
      nowVal: '-₹6.75L (-18%)',
      targetLabel: 'Target Drawdown',
      targetVal: '-₹1.70L (-4.5%)',
      actionLabel: 'Add Safety Anchors',
      actionKey: 'add_anchors',
    },
    {
      id: 'win_rate_breadth',
      title: 'Profit Consistency',
      subtitle: 'Winner vs Loser Distribution',
      icon: Activity,
      iconColor: 'text-amber-600 bg-amber-50',
      currentScore: 44,
      mendedScore: 76,
      nowLabel: 'Losing Positions',
      nowVal: '8 of 16 (50% Drag)',
      targetLabel: 'Target Win Rate',
      targetVal: '75% Positive',
      actionLabel: 'Tax Harvest 3 Losers',
      actionKey: 'harvest_losers',
    },
    {
      id: 'valuation_quality',
      title: 'Valuation Safety',
      subtitle: 'Price Multiple vs Earnings',
      icon: TrendingUp,
      iconColor: 'text-blue-600 bg-blue-50',
      currentScore: 52,
      mendedScore: 72,
      nowLabel: 'Portfolio Multiple',
      nowVal: '59.98x P/E',
      targetLabel: 'Target Multiple',
      targetVal: '28.4x P/E',
      actionLabel: 'Rotate to Quality',
      actionKey: 'rotate_quality',
    },
    {
      id: 'sector_balance',
      title: 'Sector Spread',
      subtitle: 'Macro & Industry Balance',
      icon: Layers,
      iconColor: 'text-purple-600 bg-purple-50',
      currentScore: 46,
      mendedScore: 82,
      nowLabel: 'Top Sector Skew',
      nowVal: '60% Metals',
      targetLabel: 'Target Spread',
      targetVal: '10 Sectors Hedged',
      actionLabel: 'Rebalance Sectors',
      actionKey: 'rebalance_sectors',
    },
    {
      id: 'alpha_attribution',
      title: 'Compounding Quality',
      subtitle: 'Long-Term Return Durability',
      icon: Award,
      iconColor: 'text-emerald-600 bg-emerald-50',
      currentScore: 78,
      mendedScore: 86,
      nowLabel: 'Profit Source',
      nowVal: '97% in 1 Stock',
      targetLabel: 'Target Model',
      targetVal: 'Banked & Compounding',
      actionLabel: 'Lock In Profits',
      actionKey: 'lock_alpha',
    },
  ];

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 lg:p-7 mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            6 Portfolio Health Pillars
            <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
              Scored /100
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Core parameters evaluating concentration, downside risk, and long-term durability.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-slate-500">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
            Current Score
          </span>
          <span className="flex items-center gap-1.5 text-emerald-600">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
            +Mended Target
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
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-lg ${pillar.iconColor}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 leading-tight">
                        {pillar.title}
                      </h3>
                      <span className="text-[11px] text-slate-400 font-medium block mt-0.5">
                        {pillar.subtitle}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="flex items-baseline gap-0.5 justify-end">
                      <span className={`text-xl font-black ${isMended ? 'text-emerald-600' : 'text-slate-900'}`}>
                        {isMended ? pillar.mendedScore : pillar.currentScore}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold">/100</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 block">
                      +{boost} Target
                    </span>
                  </div>
                </div>

                {/* Dual Progress Bar: Red Current line + Green Potential line */}
                <div className="space-y-1 mb-3">
                  <div className="w-full bg-slate-100 h-2 rounded-full relative overflow-hidden flex">
                    {isMended ? (
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                        style={{ width: `${pillar.mendedScore}%` }}
                      />
                    ) : (
                      <>
                        <div
                          className={`h-full rounded-l-full ${
                            pillar.currentScore < 45 ? 'bg-rose-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${pillar.currentScore}%` }}
                        />
                        <div
                          className="h-full bg-emerald-500 rounded-r-full animate-pulse transition-all duration-700"
                          style={{ width: `${boost}%` }}
                        />
                      </>
                    )}
                  </div>

                  <div className="flex justify-between text-[10px] font-semibold text-slate-400">
                    <span>Current: <strong className="text-slate-700">{pillar.currentScore}</strong></span>
                    <span className="text-emerald-600 font-bold">Target: {pillar.mendedScore}</span>
                  </div>
                </div>

                {/* Clean 2-column data chips */}
                <div className="grid grid-cols-2 gap-2 mb-3.5 text-xs">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-medium">{pillar.nowLabel}</span>
                    <span className="font-bold text-slate-800 text-xs truncate block">{pillar.nowVal}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-emerald-50/60 border border-emerald-100 text-emerald-900">
                    <span className="text-[10px] text-emerald-700 block font-medium">{pillar.targetLabel}</span>
                    <span className="font-bold text-emerald-700 text-xs truncate block">{pillar.targetVal}</span>
                  </div>
                </div>
              </div>

              {/* Action Trigger */}
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
