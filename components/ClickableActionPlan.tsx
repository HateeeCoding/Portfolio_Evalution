'use client';

import React from 'react';
import { 
  Check, 
  Download, 
  Sparkles
} from 'lucide-react';

export interface ActionItem {
  id: string;
  title: string;
  category: string;
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
    <section id="action-plan-section" className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 lg:p-8 mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Clickable Execution Plan
            <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
              Interactive Checklist
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Click items to include or exclude from your staged portfolio rebalance order.
          </p>
        </div>

        <button
          onClick={onApplyAll}
          className="text-xs font-bold text-slate-800 hover:text-black bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-lg transition-all self-start sm:self-auto flex items-center gap-1.5"
        >
          <Check className="w-3.5 h-3.5" />
          <span>{activeCount === actions.length ? 'Deselect All' : 'Select All 5 Actions'}</span>
        </button>
      </div>

      {/* Action Items List (Zero Text Clutter) */}
      <div className="space-y-3 mb-6">
        {actions.map((item) => {
          return (
            <div
              key={item.id}
              onClick={() => onToggleAction(item.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                item.enabled
                  ? 'bg-slate-50/70 border-slate-900/40 shadow-2xs'
                  : 'bg-white border-slate-200 hover:bg-slate-50 opacity-60'
              }`}
            >
              {/* Checkbox & Short Title */}
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all shrink-0 ${
                  item.enabled
                    ? 'bg-black text-white'
                    : 'border-2 border-slate-300 bg-white'
                }`}>
                  {item.enabled && <Check className="w-3 h-3 stroke-[3]" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded-xs ${
                      item.priority === 'CRITICAL'
                        ? 'bg-rose-100 text-rose-700'
                        : item.priority === 'HIGH'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {item.priority}
                    </span>
                    <h3 className="text-xs font-bold text-slate-900">
                      {item.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500 font-medium">
                    <span>{item.impactText}</span>
                    {item.taxImpact && (
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded-xs">
                        {item.taxImpact}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Staged Value & Status */}
              <div className="sm:text-right shrink-0 pl-8 sm:pl-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-1">
                <span className="text-xs font-black text-slate-900">
                  {item.executionAmount}
                </span>
                <span className={`text-[10px] font-bold ${item.enabled ? 'text-slate-900' : 'text-slate-400'}`}>
                  {item.enabled ? '✓ Included' : 'Click to Add'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sleek Black Execution Bar */}
      <div className="p-4 sm:p-5 rounded-xl bg-black text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
        <div className="flex flex-wrap items-center gap-5 sm:gap-8 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] font-medium uppercase tracking-wider">Staged Actions</span>
            <span className="text-sm font-bold text-white">{activeCount} of {actions.length} Selected</span>
          </div>

          <div className="border-l border-slate-800 pl-5 sm:pl-8">
            <span className="text-slate-400 block text-[10px] font-medium uppercase tracking-wider">Health Jump</span>
            <span className="text-sm font-black text-emerald-400">
              {activeCount > 0 ? `60 → ${60 + (activeCount * 5)}/100` : '60/100'}
            </span>
          </div>

          <div className="border-l border-slate-800 pl-5 sm:pl-8">
            <span className="text-slate-400 block text-[10px] font-medium uppercase tracking-wider">Capital Shielded</span>
            <span className="text-sm font-bold text-white">₹5,05,117</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onPrint}
            className="px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-700 transition-all flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export PDF</span>
          </button>

          <button
            onClick={() => alert(`Staged ${activeCount} orders ready for execution in SuperInvesting!`)}
            className="px-4 py-2 text-xs font-bold text-black bg-white hover:bg-slate-100 rounded-lg shadow-xs transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-800" />
            <span>Execute Staged Orders</span>
          </button>
        </div>
      </div>
    </section>
  );
};
