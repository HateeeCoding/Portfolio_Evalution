'use client';

import React, { useState } from 'react';
import { Header } from '../components/Header';
import { OverallScoreBanner } from '../components/OverallScoreBanner';
import { MetricGrid } from '../components/MetricGrid';
import { RecommendationsList } from '../components/RecommendationsList';
import { RebalanceSimulator } from '../components/RebalanceSimulator';
import { SectorAllocationChart } from '../components/SectorAllocationChart';
import { HoldingsTable } from '../components/HoldingsTable';
import { UploadModal } from '../components/UploadModal';
import { CURRENT_PORTFOLIO_HOLDINGS, BALANCED_BENCHMARK_HOLDINGS } from '../lib/portfolioData';
import { calculatePortfolioSummary, evaluatePortfolioMetrics, generateRecommendations } from '../lib/scoringEngine';
import { Holding, Recommendation } from '../lib/types';

export default function Home() {
  const [currentPreset, setCurrentPreset] = useState<string>('current');
  const [holdings, setHoldings] = useState<Holding[]>(CURRENT_PORTFOLIO_HOLDINGS);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Derived metrics and scores
  const summary = calculatePortfolioSummary(holdings);
  const metrics = evaluatePortfolioMetrics(holdings);
  const recommendations = generateRecommendations(holdings);

  const handleSelectPreset = (preset: string) => {
    setCurrentPreset(preset);
    if (preset === 'balanced') {
      setHoldings(BALANCED_BENCHMARK_HOLDINGS);
    } else {
      setHoldings(CURRENT_PORTFOLIO_HOLDINGS);
    }
  };

  const handleScrollToSimulator = () => {
    const el = document.getElementById('simulator-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplySimulation = (rec: Recommendation) => {
    handleScrollToSimulator();
  };

  const handleCustomHoldings = (newHoldings: Holding[]) => {
    setHoldings(newHoldings);
    setCurrentPreset('custom');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <Header
        currentPreset={currentPreset}
        onSelectPreset={handleSelectPreset}
        onOpenUpload={() => setIsUploadOpen(true)}
        onPrint={handlePrint}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Master Health Banner */}
        <OverallScoreBanner
          summary={summary}
          onScrollToSimulator={handleScrollToSimulator}
        />

        {/* 6 Core Assessment Pillars (Cards with 100-point scores) */}
        <MetricGrid
          metrics={metrics}
          onActionClick={handleScrollToSimulator}
        />

        {/* Actionable Suggestions Engine */}
        <RecommendationsList
          recommendations={recommendations}
          onApplySimulation={handleApplySimulation}
        />

        {/* Interactive "What-If" Rebalancer Simulator */}
        <RebalanceSimulator
          originalHoldings={holdings}
          summary={summary}
        />

        {/* Sector Allocation Breakdown */}
        <SectorAllocationChart
          holdings={holdings}
          totalValue={summary.totalValue}
        />

        {/* Full Holdings Breakdown Table */}
        <HoldingsTable
          holdings={holdings}
          totalPortfolioValue={summary.totalValue}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-semibold text-slate-700">
            SuperInvesting Portfolio Evaluation & Health Engine
          </p>
          <p className="mt-1 text-slate-400">
            Algorithmic scoring models for concentration risk, downside volatility, win-rate breadth, and macro sector alignment.
          </p>
        </div>
      </footer>

      {/* Upload Custom Portfolio Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadCustomHoldings={handleCustomHoldings}
      />
    </div>
  );
}
