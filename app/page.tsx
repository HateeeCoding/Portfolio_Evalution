'use client';

import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { OverallScoreBanner } from '../components/OverallScoreBanner';
import { UnifiedPillarsMatrix } from '../components/UnifiedPillarsMatrix';
import { MendingInfographics } from '../components/MendingInfographics';
import { ClickableActionPlan, ActionItem } from '../components/ClickableActionPlan';
import { HoldingsTable } from '../components/HoldingsTable';
import { CURRENT_PORTFOLIO_HOLDINGS } from '../lib/portfolioData';
import { calculatePortfolioSummary } from '../lib/scoringEngine';

const INITIAL_ACTIONS: ActionItem[] = [
  {
    id: 'trim_midwest',
    title: 'Trim Midwest Gold from 59.7% to 18% (Bank Multi-Bagger Gains)',
    category: 'TRIM',
    priority: 'CRITICAL',
    executionAmount: 'Sell ₹15,74,853',
    impactText: 'Protects 60% of your net worth from micro-cap volatility. Reduces single-stock ruin risk to zero.',
    taxImpact: 'Zero tax when combined with tax-loss harvest offset',
    enabled: true,
  },
  {
    id: 'harvest_tax_loss',
    title: 'Tax-Loss Harvest 3 Chronic Laggards (HDFC Bank, Tata Motors CV, ITC)',
    category: 'TAX_HARVEST',
    priority: 'CRITICAL',
    executionAmount: 'Exit ₹1,82,718 (Loss -₹1,15,420)',
    impactText: 'Recovers deadweight capital from chronic laggards that underperformed NIFTY by 40%+. Raises portfolio win-rate from 50% to 75%.',
    taxImpact: 'Directly saves ~₹23,084 in capital gains tax deductions',
    enabled: true,
  },
  {
    id: 'reallocate_ai_baskets',
    title: 'Deploy ₹5,50,000 into SuperInvesting "IT & Cloud Leaders" AI Basket',
    category: 'REALLOCATE',
    priority: 'HIGH',
    executionAmount: 'Buy ₹5,50,000',
    impactText: 'Balances structural IT underweight (currently only 3.2%) with top quartile compounders like TCS and Infosys.',
    enabled: true,
  },
  {
    id: 'anchor_banking',
    title: 'Scale Capital into Large-Cap Banking Compounding Anchors (ICICI & SBI)',
    category: 'REALLOCATE',
    priority: 'HIGH',
    executionAmount: 'Buy ₹6,00,000',
    impactText: 'Injects high-ROCE assets at low valuation multiples (P/E 10.8x and 17.5x) to absorb macro volatility.',
    enabled: true,
  },
  {
    id: 'trailing_stop',
    title: 'Lock 15% Algorithmic Trailing Stop-Loss on Remaining Midwest Gold Stake',
    category: 'PROTECT',
    priority: 'RECOMMENDED',
    executionAmount: 'Stop Level at ₹5,73,696',
    impactText: 'Guarantees that your remaining 18% stake in Midwest Gold locks in at least a 45x realized return.',
    enabled: true,
  },
];

export default function Home() {
  const [currentPreset, setCurrentPreset] = useState<string>('current');
  const [isMended, setIsMended] = useState<boolean>(false);
  const [actions, setActions] = useState<ActionItem[]>(INITIAL_ACTIONS);

  const summary = calculatePortfolioSummary(CURRENT_PORTFOLIO_HOLDINGS);

  const handleToggleAction = (id: string) => {
    setActions(prev =>
      prev.map(a => (a.id === id ? { ...a, enabled: !a.enabled } : a))
    );
  };

  const handleApplyAllActions = () => {
    const allEnabled = actions.every(a => a.enabled);
    setActions(prev => prev.map(a => ({ ...a, enabled: !allEnabled })));
    setIsMended(!allEnabled);
  };

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">
      {/* 1. Left Sidebar matching SuperInvesting shell */}
      <Sidebar />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Top Header matching Image 1 */}
        <Header
          currentPreset={currentPreset}
          onSelectPreset={setCurrentPreset}
          onOpenMendModal={() => handleScrollToSection('action-plan-section')}
          isMendedActive={isMended}
          onToggleMended={() => setIsMended(!isMended)}
          onPrint={handlePrint}
        />

        {/* Page Body */}
        <main className="flex-1 max-w-[1550px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Hero Overall Score Banner with Speedometer Gauge */}
          <OverallScoreBanner
            summary={summary}
            isMended={isMended}
            onToggleMend={() => setIsMended(!isMended)}
            onScrollToMending={() => handleScrollToSection('mending-infographics')}
          />

          {/* Unified 6 Pillars Diagnostic Matrix (All visible together, no clumsy tabs) */}
          <UnifiedPillarsMatrix
            isMended={isMended}
            onApplyAction={(key) => {
              setIsMended(true);
              handleScrollToSection('action-plan-section');
            }}
          />

          {/* Combined Infographics: Before vs After Transformation */}
          <div id="mending-infographics">
            <MendingInfographics
              isMended={isMended}
              onExecuteMend={() => setIsMended(!isMended)}
            />
          </div>

          {/* Clickable Action Items Plan with Toggles & Staged Execution */}
          <ClickableActionPlan
            actions={actions}
            onToggleAction={handleToggleAction}
            onApplyAll={handleApplyAllActions}
            onPrint={handlePrint}
          />

          {/* My Holdings Table matching Image 1 */}
          <HoldingsTable
            holdings={CURRENT_PORTFOLIO_HOLDINGS}
            totalPortfolioValue={summary.totalValue}
            onQuickAction={(symbol, action) => {
              setIsMended(true);
              handleScrollToSection('action-plan-section');
            }}
          />
        </main>

        {/* Clean Footer */}
        <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-400">
          <div className="max-w-7xl mx-auto px-4">
            <p className="font-semibold text-slate-700">
              SuperInvesting AI Portfolio Evaluator & Health Engine
            </p>
            <p className="mt-1 text-slate-400">
              Institutional-grade multi-pillar risk diagnostics, concentration limits, and prescriptive order staging.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
