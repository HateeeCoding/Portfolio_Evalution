'use client';

import React, { useState } from 'react';
import { MetricEvaluation } from '../lib/types';
import { 
  PieChart, 
  ShieldAlert, 
  Activity, 
  TrendingUp, 
  Layers, 
  Award, 
  ChevronDown, 
  ChevronUp, 
  AlertCircle, 
  CheckCircle, 
  ArrowRight,
  Lightbulb
} from 'lucide-react';

interface MetricCardProps {
  metric: MetricEvaluation;
  onActionClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({ metric, onActionClick }) => {
  const [expanded, setExpanded] = useState(false);

  // Pick appropriate icon based on name
  const renderIcon = () => {
    switch (metric.iconName) {
      case 'PieChart':
        return <PieChart className="w-5 h-5 text-indigo-600" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-rose-600" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-amber-600" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-blue-600" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-purple-600" />;
      case 'Award':
        return <Award className="w-5 h-5 text-emerald-600" />;
      default:
        return <PieChart className="w-5 h-5 text-slate-600" />;
    }
  };

  // Status color styles
  const getScoreColor = (score: number) => {
    if (score < 45) return { text: 'text-rose-600', bg: 'bg-rose-500', pill: 'bg-rose-100 text-rose-800 border-rose-200' };
    if (score < 65) return { text: 'text-amber-600', bg: 'bg-amber-500', pill: 'bg-amber-100 text-amber-800 border-amber-200' };
    return { text: 'text-emerald-600', bg: 'bg-emerald-500', pill: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
  };

  const style = getScoreColor(metric.score);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden">
      <div className="p-5 sm:p-6">
        {/* Card Header: Icon, Title & Status */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-100/90 border border-slate-200/60 flex items-center justify-center">
              {renderIcon()}
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                {metric.title}
              </h3>
              <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border mt-1 ${style.pill}`}>
                {metric.statusLabel}
              </span>
            </div>
          </div>

          {/* Score Dial / Badge out of 100 */}
          <div className="flex flex-col items-end">
            <div className="flex items-baseline gap-0.5">
              <span className={`text-2xl sm:text-3xl font-black ${style.text}`}>
                {metric.score}
              </span>
              <span className="text-xs font-bold text-slate-400">/100</span>
            </div>
          </div>
        </div>

        {/* Score Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-4">
          <div
            className={`h-full rounded-full transition-all duration-500 ${style.bg}`}
            style={{ width: `${metric.score}%` }}
          />
        </div>

        {/* Headline Finding */}
        <p className="text-sm font-semibold text-slate-800 mb-3 line-clamp-2">
          {metric.headline}
        </p>

        {/* Key Parameter Pill vs Benchmark */}
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 mb-4 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-500 block text-[11px] font-medium">{metric.keyMetricLabel}</span>
            <span className="font-bold text-slate-900 text-sm">{metric.keyMetricValue}</span>
          </div>
          {metric.benchmarkValue && (
            <div className="text-right">
              <span className="text-slate-500 block text-[11px] font-medium">Safe Benchmark</span>
              <span className="font-semibold text-slate-700">{metric.benchmarkValue}</span>
            </div>
          )}
        </div>

        {/* Actionable Suggestion Callout */}
        <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3 text-xs text-blue-900 flex items-start gap-2">
          <Lightbulb className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block mb-0.5 text-blue-950">Suggested Action</span>
            <p className="text-blue-900/90 leading-relaxed">{metric.suggestedAction}</p>
          </div>
        </div>

        {/* Expandable Deep Dive */}
        {expanded && (
          <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-600 space-y-2.5 animate-fadeIn">
            <div>
              <span className="font-bold text-slate-900 block mb-1">Why this matters:</span>
              <p className="leading-relaxed text-slate-600">{metric.explanation}</p>
            </div>
            <div className="p-2.5 rounded-lg bg-amber-50/80 border border-amber-200/60 text-amber-900">
              <span className="font-bold block mb-0.5">Potential Impact:</span>
              <p>{metric.impactVerdict}</p>
            </div>
          </div>
        )}
      </div>

      {/* Card Footer: Details toggle */}
      <div className="px-5 sm:px-6 py-2.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600">
        <button
          onClick={() => setExpanded(!expanded)}
          className="hover:text-slate-900 flex items-center gap-1 transition-colors"
        >
          {expanded ? 'Show Less' : 'Deep Dive Analysis'}
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {onActionClick && (
          <button
            onClick={onActionClick}
            className="text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
          >
            Simulate Fix <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
