'use client';

import React, { useState } from 'react';
import { Holding } from '../lib/types';
import { X, Upload, FileText, CheckCircle } from 'lucide-react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadCustomHoldings: (holdings: Holding[]) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onUploadCustomHoldings,
}) => {
  const [jsonText, setJsonText] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleParseAndApply = () => {
    try {
      setError(null);
      const parsed = JSON.parse(jsonText);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error('Please provide an array of holdings.');
      }

      // Format check
      const formatted: Holding[] = parsed.map((item, idx) => ({
        id: item.id || `custom_${idx}`,
        symbol: item.symbol || `STOCK_${idx + 1}`,
        name: item.name || item.symbol || `Stock ${idx + 1}`,
        sector: item.sector || 'Diversified',
        marketCap: item.marketCap || 'Large',
        investedAmount: Number(item.investedAmount) || 10000,
        currentValue: Number(item.currentValue) || 10000,
        aiScore: Number(item.aiScore) || 65,
        peRatio: Number(item.peRatio) || 22,
        pbRatio: Number(item.pbRatio) || 3,
        beta: Number(item.beta) || 1.0,
      }));

      onUploadCustomHoldings(formatted);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Invalid JSON format. Check template below.');
    }
  };

  const sampleTemplate = JSON.stringify([
    {
      symbol: "RELIANCE",
      name: "Reliance Industries",
      sector: "Conglomerate & Energy",
      marketCap: "Large",
      investedAmount: 120000,
      currentValue: 140000,
      aiScore: 78,
      peRatio: 24.5,
      pbRatio: 2.1,
      beta: 0.85
    },
    {
      symbol: "TCS",
      name: "Tata Consultancy Services",
      sector: "Information Technology",
      marketCap: "Large",
      investedAmount: 100000,
      currentValue: 95000,
      aiScore: 82,
      peRatio: 28.0,
      pbRatio: 12.0,
      beta: 0.75
    }
  ], null, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl p-6 sm:p-8 animate-fadeIn">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Custom Portfolio Evaluation</h3>
              <p className="text-xs text-slate-500">Paste your holdings JSON to run real-time multi-pillar scoring.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg font-medium">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Holdings JSON Array
          </label>
          <textarea
            rows={8}
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            placeholder={`Paste JSON array here, e.g.:\n${sampleTemplate}`}
            className="w-full text-xs font-mono p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={() => setJsonText(sampleTemplate)}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            Load Sample Template
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleParseAndApply}
              className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
            >
              Evaluate My Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
