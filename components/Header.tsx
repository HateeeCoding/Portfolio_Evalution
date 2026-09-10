'use client';

import React from 'react';
import { 
  Sparkles, 
  Heart, 
  MessageSquare, 
  ShoppingBag, 
  Layers, 
  Briefcase, 
  Gauge, 
  Download,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';

interface HeaderProps {
  currentPreset: string;
  onSelectPreset: (preset: string) => void;
  onOpenMendModal: () => void;
  isMendedActive: boolean;
  onToggleMended: () => void;
  onPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPreset,
  onSelectPreset,
  onOpenMendModal,
  isMendedActive,
  onToggleMended,
  onPrint,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b border-slate-200">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Top Breadcrumb Navigation matching Image 1 */}
          <nav className="flex items-center gap-6 text-xs font-semibold text-slate-500 overflow-x-auto no-scrollbar">
            <button className="flex items-center gap-1.5 hover:text-slate-900 transition-colors py-4">
              <Sparkles className="w-3.5 h-3.5 text-slate-400" />
              <span>Chat</span>
            </button>
            <button className="flex items-center gap-1.5 hover:text-slate-900 transition-colors py-4">
              <ShoppingBag className="w-3.5 h-3.5 text-slate-400" />
              <span>Baskets</span>
            </button>
            <button className="flex items-center gap-1.5 hover:text-slate-900 transition-colors py-4">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              <span>Stacks</span>
            </button>
            {/* Active Portfolio Tab with Bottom Indicator Line */}
            <button className="flex items-center gap-1.5 text-slate-900 font-bold border-b-2 border-slate-900 py-4">
              <Briefcase className="w-3.5 h-3.5 text-slate-900" />
              <span>Portfolio</span>
            </button>
            <button className="flex items-center gap-1.5 hover:text-slate-900 transition-colors py-4">
              <Gauge className="w-3.5 h-3.5 text-slate-400" />
              <span>Indicator Dashboard</span>
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Mended Portfolio Toggle Pill */}
            <button
              onClick={onToggleMended}
              className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
                isMendedActive
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-xs'
                  : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200/70'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isMendedActive ? '✓ Mended View (86/100)' : 'View Mended Portfolio'}</span>
            </button>

            {/* Watchlist button matching Image 1 */}
            <button className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 transition-all">
              <Heart className="w-3.5 h-3.5 text-slate-400" />
              <span>Watchlist</span>
            </button>

            {/* Purple "+ Analyse with AI" CTA button exactly matching Image 1 */}
            <button
              onClick={onOpenMendModal}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#7C3AED] hover:bg-[#6D28D9] rounded-lg px-3.5 py-1.5 shadow-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>+ Analyse with AI</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
