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
  CheckCircle2
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
      iconColor: 'text-indigo-600 bg-indigo-50/80',
      currentScore: 26,
      mendedScore: 88,
      currentParam: 'Top stock is 59.7% (Midwest Gold)',
      mendedParam: 'Top stock capped at safe 18.0%',
      benchmark: 'Safe Limit < 15%',
      currentStatus: 'Critical Risk',
      mendedStatus: 'Diversified',
      actionLabel: 'Trim Top Holding',
      actionKey: 'trim_midwest',
    },
    {
      id: 'downside_risk',
      title: 'Downside & Volatility Risk',
      icon: ShieldAlert,
      iconColor: 'text-rose-600 bg-rose-50/80',
      currentScore: 38,
      mendedScore: 84,
      currentParam: '30% drop wipes out -17.9% (₹6.75L)',
      mendedParam: '30% drop impact limited to -4.5%',
      benchmark: 'Safe Stress Loss < 6%',
      currentStatus: 'Severe Risk',
      mendedStatus: 'Shielded',
      actionLabel: 'Add Safety Anchors',
      actionKey: 'add_anchors',
    },
    {
      id: 'win_rate_breadth',
      title: 'Win-Rate & Portfolio Breadth',
      icon: Activity,
      iconColor: 'text-amber-600 bg-amber-50/80',
      currentScore: 44,
      mendedScore: 76,
      currentParam: '8 of 16 stocks (50%) in the red',
      mendedParam: 'Laggards harvested; win rate 75%',
      benchmark: 'Healthy Target > 65%',
      currentStatus: 'Hidden Drag',
      mendedStatus: 'Clean Win Rate',
      actionLabel: 'Harvest 3 Losers',
      actionKey: 'harvest_losers',
    },
    {
      id: 'valuation_quality',
      title: 'Valuation & Earnings Quality',
      icon: TrendingUp,
      iconColor: 'text-blue-600 bg-blue-50/80',
      currentScore: 52,
      mendedScore: 72,
      currentParam: 'Blended P/E 59.98x (P/B 5.8x)',
      mendedParam: 'Blended P/E lowered to 28.4x',
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
      iconColor: 'text-purple-600 bg-purple-50/80',
      currentScore: 46,
      mendedScore: 82,
      currentParam: 'Metals & Mining controls 59.7%',
      mendedParam: 'Metals 18%, Banking 28%, IT 18%',
      benchmark: 'Max Sector < 25%',
      currentStatus: 'Sector Skew',
      mendedStatus: 'Macro Balanced',
      actionLabel: 'Rebalance Sectors',
      actionKey: 'rebalance_sectors',
    },
    {
      id: 'alpha_attribution',
      title: 'Benchmark Alpha & Return Quality',
      icon: Award,
      iconColor: 'text-emerald-600 bg-emerald-50/80',
      currentScore: 78,
      mendedScore: 86,
      currentParam: '+152% gain (97% in 1 stock)',
      mendedParam: '+152% gain locked in safely',
      benchmark: 'NIFTY 50 +18%',
      currentStatus: 'Fragile Alpha',
      mendedStatus: 'Preserved Alpha',
      actionLabel: 'Lock In Profits',
      actionKey: 'lock_alpha',
    },
  ];

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 lg:p-8 mb-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            6 Core Assessment Pillars
            <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200/60">
              Scored /100
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Transparent diagnostic breakdown with current scores vs target mended levels.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-medium">
          <span className="flex items-center gap-1.5 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-slate-300 inline-block"></span>
            Current Unmended
          </span>
          <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
            Target Mended
          </span>
        </div>
      </div>

      {/* Unified 6 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          const activeScore = isMended ? pillar.mendedScore : pillar.currentScore;
          const isHealthy = activeScore >= 70;
          const isWarning = activeScore >= 50 && activeScore < 70;

          return (
            <div
              key={pillar.id}
              className="p-5 rounded-xl border border-slate-200/70 bg-white hover:border-slate-300 transition-all flex flex-col justify-between"
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
                      <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-sm mt-0.5 ${
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

                  <div className="text-right">
                    <span className={`text-xl font-extrabold ${
                      isMended ? 'text-emerald-600' : isWarning ? 'text-amber-600' : 'text-rose-600'
                    }`}>
                      {activeScore}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium block">/100</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1 mb-3">
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden relative">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isMended ? 'bg-emerald-500' : isWarning ? 'bg-amber-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${activeScore}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Score: {pillar.currentScore}</span>
                    <span className="text-emerald-600 font-semibold">Target: {pillar.mendedScore}</span>
                  </div>
                </div>

                {/* Metric finding */}
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs mb-3">
                  <div className="text-slate-800 font-medium leading-snug">
                    {isMended ? (
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        {pillar.mendedParam}
                      </span>
                    ) : (
                      <span>{pillar.currentParam}</span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 font-medium">
                    Benchmark: {pillar.benchmark}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onApplyAction(pillar.actionKey)}
                className="w-full py-1.5 px-3 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-lg transition-all flex items-center justify-between"
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
