'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Scissors, 
  ShoppingBag, 
  TrendingUp, 
  Lock, 
  Check, 
  Download, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export interface ActionItem {
  id: string;
  title: string;
  category: 'TRIM' | 'TAX_HARVEST' | 'REALLOCATE' | 'PROTECT';
  priority: 'CRITICAL' | 'HIGH' | 'RECOMMENDED';
  executionAmount: string;
  impactText: string;
  taxImpact?: string;
  enabled: boolean;
}

interface ClickableActionPlanProps {
  actions: ActionItem[];
  onToggleAction: (id: string) => void;
  onApplyAll: () => void;
  onPrint: () => void;
}

export const ClickableActionPlan: React.FC<ClickableActionPlanProps> = ({
  actions,
  onToggleAction,
  onApplyAll,
  onPrint,
}) => {
  const activeCount = actions.filter(a => a.enabled).length;

  return (
    <section id="action-plan-section" className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 lg:p-8 mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200 mb-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Execution Blueprint
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Clickable Portfolio Mending Action Items
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Select or customize specific actions to simulate and stage your rebalance orders.
          </p>
        </div>

        <button
          onClick={onApplyAll}
          className="text-xs font-bold text-purple-700 hover:text-purple-800 bg-purple-50 hover:bg-purple-100 border border-purple-200 px-3.5 py-2 rounded-xl transition-all self-start sm:self-auto flex items-center gap-1.5"
        >
          <Check className="w-3.5 h-3.5" />
          <span>{activeCount === actions.length ? 'Reset All' : 'Select All 5 Actions'}</span>
        </button>
      </div>

      {/* Action Items List */}
      <div className="space-y-4 mb-6">
        {actions.map((item) => {
          return (
            <div
              key={item.id}
              onClick={() => onToggleAction(item.id)}
              className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                item.enabled
                  ? 'bg-purple-50/40 border-purple-300 shadow-xs'
                  : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100/60 opacity-75'
              }`}
            >
              {/* Checkbox & Details */}
              <div className="flex items-start gap-3.5">
                <div className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center transition-all shrink-0 ${
                  item.enabled
                    ? 'bg-[#7C3AED] text-white'
                    : 'border-2 border-slate-300 bg-white'
                }`}>
                  {item.enabled && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-sm ${
                      item.priority === 'CRITICAL'
                        ? 'bg-rose-100 text-rose-700 border border-rose-200'
                        : item.priority === 'HIGH'
                        ? 'bg-amber-100 text-amber-700 border border-amber-200'
                        : 'bg-blue-100 text-blue-700 border border-blue-200'
                    }`}>
                      {item.priority}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      {item.category.replace('_', ' ')}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {item.impactText}
                  </p>

                  {item.taxImpact && (
                    <span className="inline-block mt-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-sm">
                      {item.taxImpact}
                    </span>
                  )}
                </div>
              </div>

              {/* Execution Amount Pill & Status */}
              <div className="sm:text-right shrink-0 pl-8 sm:pl-0">
                <div className="text-xs text-slate-400 font-semibold">Staged Capital</div>
                <div className="text-base font-black text-slate-900 mt-0.5">
                  {item.executionAmount}
                </div>
                <span className={`inline-block text-[11px] font-bold mt-1 ${
                  item.enabled ? 'text-purple-700' : 'text-slate-400'
                }`}>
                  {item.enabled ? '✓ Included in Order' : 'Click to Include'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sticky Execution Summary Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] font-semibold uppercase">Staged Actions</span>
            <span className="text-sm font-bold text-white">{activeCount} of {actions.length} Selected</span>
          </div>

          <div className="border-l border-slate-700 pl-4 sm:pl-6">
            <span className="text-slate-400 block text-[10px] font-semibold uppercase">Health Score Jump</span>
            <span className="text-sm font-black text-emerald-400">
              {activeCount > 0 ? `60 → ${60 + (activeCount * 5)}/100` : '60/100 (Unmended)'}
            </span>
          </div>

          <div className="border-l border-slate-700 pl-4 sm:pl-6">
            <span className="text-slate-400 block text-[10px] font-semibold uppercase">Downside Protection</span>
            <span className="text-sm font-bold text-white">₹5,05,117 Shielded</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onPrint}
            className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition-all flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Plan</span>
          </button>

          <button
            onClick={() => alert(`Staged ${activeCount} rebalance orders! You can execute these orders via your connected broker in SuperInvesting.`)}
            className="px-4 py-2 text-xs font-bold text-white bg-[#7C3AED] hover:bg-[#6D28D9] rounded-xl shadow-xs transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Execute Staged Orders</span>
          </button>
        </div>
      </div>
    </section>
  );
};
