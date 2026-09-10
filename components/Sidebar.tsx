'use client';

import React from 'react';
import { 
  PlusCircle, 
  ShoppingBag, 
  Briefcase, 
  Heart, 
  Gauge, 
  Bell, 
  HelpCircle, 
  ChevronRight,
  Sparkles,
  MessageSquareText
} from 'lucide-react';

interface SidebarProps {
  activeTab?: string;
  onSelectTab?: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab = 'Portfolio',
  onSelectTab,
}) => {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between h-screen sticky top-0 shrink-0 hidden lg:flex select-none">
      {/* Top Brand & Nav */}
      <div className="p-4 flex flex-col gap-5 overflow-y-auto">
        {/* Brand */}
        <div className="flex items-center gap-2.5 px-2 pt-1">
          <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-white font-black text-base shadow-sm">
            ✦
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm tracking-tight text-slate-900">
              SUPER INVESTING
            </span>
          </div>
        </div>

        {/* New Chat Button */}
        <button className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200/80 transition-all shadow-2xs">
          <PlusCircle className="w-4 h-4 text-slate-500" />
          <span>New Chat</span>
        </button>

        {/* Main Navigation Items */}
        <nav className="space-y-1">
          <button
            onClick={() => onSelectTab && onSelectTab('AI Baskets')}
            className="flex items-center gap-3 w-full px-3.5 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all"
          >
            <ShoppingBag className="w-4 h-4 text-slate-400" />
            <span>AI Baskets</span>
          </button>

          {/* Active Portfolio Item */}
          <button
            onClick={() => onSelectTab && onSelectTab('Portfolio')}
            className="flex items-center gap-3 w-full px-3.5 py-2.5 text-xs font-bold text-slate-900 bg-slate-100/90 rounded-xl border border-slate-200/90 shadow-2xs transition-all"
          >
            <Briefcase className="w-4 h-4 text-slate-800" />
            <span>Portfolio</span>
            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-600"></span>
          </button>

          <button
            onClick={() => onSelectTab && onSelectTab('Watchlist')}
            className="flex items-center gap-3 w-full px-3.5 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all"
          >
            <Heart className="w-4 h-4 text-slate-400" />
            <span>Watchlist</span>
          </button>

          <button
            onClick={() => onSelectTab && onSelectTab('Indicator Dashboard')}
            className="flex items-center gap-3 w-full px-3.5 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all"
          >
            <Gauge className="w-4 h-4 text-slate-400" />
            <span>Indicator Dashboard</span>
          </button>

          <button className="flex items-center gap-3 w-full px-3.5 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all">
            <Bell className="w-4 h-4 text-slate-400" />
            <span>Notifications</span>
          </button>

          <button className="flex items-center gap-3 w-full px-3.5 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all">
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span>Help & Support</span>
          </button>
        </nav>

        {/* History Section matching Image 1 */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between px-2 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              History
            </span>
            <span className="text-[11px] font-semibold text-blue-600 hover:underline cursor-pointer">
              View All
            </span>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center justify-between px-2 py-1.5 text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer">
              <span className="truncate">Portfolio Analysis</span>
              <span className="text-[10px] text-slate-400">Today</span>
            </div>
            <div className="flex items-center justify-between px-2 py-1.5 text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer">
              <span className="truncate">Portfolio Deep Dive</span>
              <span className="text-[10px] text-slate-400">Today</span>
            </div>
            <div className="flex items-center justify-between px-2 py-1.5 text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer">
              <span className="truncate">Portfolio Analysis</span>
              <span className="text-[10px] text-slate-400">Today</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom User Avatar matching Image 1 */}
      <div className="p-3 border-t border-slate-200 bg-white">
        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
              ⚡
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900">Test</span>
              <span className="text-[10px] text-slate-400">PRO Investor</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>
      </div>
    </aside>
  );
};
