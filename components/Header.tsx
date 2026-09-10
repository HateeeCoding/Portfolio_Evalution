'use client';

import React from 'react';
import { 
  Sparkles, 
  Heart, 
  ShoppingBag, 
  Layers, 
  Briefcase, 
  Gauge, 
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
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-xs border-b border-slate-200/80">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Top Breadcrumb Navigation */}
          <nav className="flex items-center gap-6 text-xs font-medium text-slate-500 overflow-x-auto no-scrollbar">
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
          <div className="flex items-center gap-2.5">
            {/* Mended Portfolio Toggle */}
            <button
              onClick={onToggleMended}
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                isMendedActive
                  ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>{isMendedActive ? 'Mended View (86)' : 'Simulate Mended'}</span>
            </button>

            {/* Watchlist */}
            <button className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 transition-all">
              <Heart className="w-3.5 h-3.5 text-slate-400" />
              <span>Watchlist</span>
            </button>

            {/* Sleek Black "+ Analyse with AI" Button */}
            <button
              onClick={onOpenMendModal}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-black hover:bg-slate-800 rounded-lg px-3.5 py-1.5 shadow-xs transition-all"
            >
              <Sparkles className="w-3 h-3 text-slate-300" />
              <span>+ Analyse with AI</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
