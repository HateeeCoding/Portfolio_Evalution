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
  CheckCircle2,
  AlertCircle
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
      currentParam: 'Top stock is 59.7% (Midwest Gold)',
      mendedParam: 'Top stock capped at 18.0%',
      benchmark: 'Safe Limit < 15-20%',
      currentStatus: 'Critical Risk',
      mendedStatus: 'Well Diversified',
      actionLabel: 'Trim Top Holding',
      actionKey: 'trim_midwest',
    },
    {
      id: 'downside_risk',
      title: 'Downside & Volatility Risk',
      icon: ShieldAlert,
      iconColor: 'text-rose-600 bg-rose-50',
      currentScore: 38,
      mendedScore: 84,
      currentParam: '30% drop wipes out -17.9% (₹6.75L)',
      mendedParam: '30% drop impact limited to -4.5%',
      benchmark: 'Safe Stress Loss < 6%',
      currentStatus: 'Severe Volatility',
      mendedStatus: 'Shielded & Hedged',
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
      currentParam: '8 of 16 stocks (50%) are negative',
      mendedParam: 'Laggards harvested; win rate 75%',
      benchmark: 'Healthy Breadth > 65%',
      currentStatus: 'Hidden Drag',
      mendedStatus: 'Clean Win Rate',
      actionLabel: 'Harvest 3 Losers',
      actionKey: 'harvest_losers',
    },
    {
      id: 'valuation_quality',
      title: 'Valuation & Earnings Safety',
      icon: TrendingUp,
      iconColor: 'text-blue-600 bg-blue-50',
      currentScore: 52,
      mendedScore: 72,
      currentParam: 'Blended P/E 59.98x (P/B 5.8x)',
      mendedParam: 'Blended P/E reduced to 28.4x',
      benchmark: 'NIFTY 50 P/E ~22.4x',
      currentStatus: 'Stretched P/E',
      mendedStatus: 'Fair Multiple',
      actionLabel: 'Rotate to Quality',
      actionKey: 'rotate_quality',
    },
    {
      id: 'sector_balance',
      title: 'Sector Balance & Macro Resilience',
      icon: Layers,
      iconColor: 'text-purple-600 bg-purple-50',
      currentScore: 46,
      mendedScore: 82,
      currentParam: 'Metals & Mining controls 59.7%',
      mendedParam: 'Metals 18%, Banking 28%, IT 18%',
      benchmark: 'Max Sector Weight < 25%',
      currentStatus: 'Severe Sector Skew',
      mendedStatus: 'Macro Balanced',
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
      currentParam: '+152% gain (97% in 1 stock)',
      mendedParam: '+152% gain locked in safely',
      benchmark: 'NIFTY 50 Benchmark +18%',
      currentStatus: 'Fragile Outlier',
      mendedStatus: 'Preserved Alpha',
      actionLabel: 'Lock In Profits',
      actionKey: 'lock_alpha',
    },
  ];

  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 lg:p-8 mb-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
            6 Core Assessment Pillars Scorecard
            <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
              All Parameters Scored /100
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Transparent breakdown replacing the single vague gauge with diagnostic reality and mended targets.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-slate-500">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block"></span>
            Current Unmended
          </span>
          <span className="flex items-center gap-1.5 text-emerald-600 font-bold ml-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
            Target Mended
          </span>
        </div>
      </div>

      {/* Unified 6 Pillars Grid - All 6 visible together cleanly */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          const activeScore = isMended ? pillar.mendedScore : pillar.currentScore;
          const isHealthy = activeScore >= 70;
          const isWarning = activeScore >= 50 && activeScore < 70;

          return (
            <div
              key={pillar.id}
              className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/40 hover:bg-slate-50 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Pillar Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-lg border border-slate-200/60 ${pillar.iconColor}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 leading-snug">
                        {pillar.title}
                      </h3>
                      <span className={`text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded-sm ${
                        isMended
                          ? 'text-emerald-700 bg-emerald-50'
                          : isWarning
                          ? 'text-amber-700 bg-amber-50'
                          : 'text-rose-700 bg-rose-50'
                      }`}>
                        {isMended ? pillar.mendedStatus : pillar.currentStatus}
                      </span>
                    </div>
                  </div>

                  {/* Score badge /100 */}
                  <div className="text-right">
                    <span className={`text-xl font-black ${
                      isMended ? 'text-emerald-600' : isWarning ? 'text-amber-600' : 'text-rose-600'
                    }`}>
                      {activeScore}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold block">/ 100</span>
                  </div>
                </div>

                {/* Progress Comparison Track */}
                <div className="space-y-1.5 mb-3">
                  <div className="w-full bg-slate-200/70 h-2 rounded-full overflow-hidden relative">
                    {/* Mended Target Ghost Bar */}
                    <div
                      className="absolute top-0 left-0 h-full bg-emerald-300/40 rounded-full"
                      style={{ width: `${pillar.mendedScore}%` }}
                    />
                    {/* Active Bar */}
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isMended
                          ? 'bg-emerald-500'
                          : isWarning
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${activeScore}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                    <span>Current: {pillar.currentScore}</span>
                    <span className="text-emerald-600 font-bold">Target Mended: {pillar.mendedScore}</span>
                  </div>
                </div>

                {/* Metric finding */}
                <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 text-xs mb-3 space-y-1">
                  <div className="text-slate-700 font-medium leading-tight">
                    {isMended ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        {pillar.mendedParam}
                      </span>
                    ) : (
                      <span>{pillar.currentParam}</span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Benchmark: {pillar.benchmark}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onApplyAction(pillar.actionKey)}
                className="w-full py-1.5 px-2.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-all flex items-center justify-between"
              >
                <span>{pillar.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
