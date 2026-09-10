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
  ChevronRight
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
    <aside className="w-60 bg-white border-r border-slate-200/80 flex flex-col justify-between h-screen sticky top-0 shrink-0 hidden lg:flex select-none">
      {/* Top Brand & Nav */}
      <div className="p-4 flex flex-col gap-4 overflow-y-auto">
        {/* Brand */}
        <div className="flex items-center gap-2.5 px-2 pt-1">
          <div className="w-7 h-7 rounded-md bg-black flex items-center justify-center text-white font-black text-sm shadow-xs">
            ✦
          </div>
          <span className="font-extrabold text-sm tracking-tight text-slate-900">
            SUPER INVESTING
          </span>
        </div>

        {/* New Chat Button */}
        <button className="flex items-center gap-2.5 w-full px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200/70 transition-all">
          <PlusCircle className="w-3.5 h-3.5 text-slate-500" />
          <span>New Chat</span>
        </button>

        {/* Navigation Items */}
        <nav className="space-y-0.5">
          <button
            onClick={() => onSelectTab && onSelectTab('AI Baskets')}
            className="flex items-center gap-2.5 w-full px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-slate-400" />
            <span>AI Baskets</span>
          </button>

          {/* Active Portfolio Item */}
          <button
            onClick={() => onSelectTab && onSelectTab('Portfolio')}
            className="flex items-center gap-2.5 w-full px-3 py-2 text-xs font-bold text-slate-900 bg-slate-100 rounded-lg border border-slate-200/80 transition-all"
          >
            <Briefcase className="w-3.5 h-3.5 text-slate-900" />
            <span>Portfolio</span>
            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-black"></span>
          </button>

          <button
            onClick={() => onSelectTab && onSelectTab('Watchlist')}
            className="flex items-center gap-2.5 w-full px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all"
          >
            <Heart className="w-3.5 h-3.5 text-slate-400" />
            <span>Watchlist</span>
          </button>

          <button
            onClick={() => onSelectTab && onSelectTab('Indicator Dashboard')}
            className="flex items-center gap-2.5 w-full px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all"
          >
            <Gauge className="w-3.5 h-3.5 text-slate-400" />
            <span>Indicator Dashboard</span>
          </button>

          <button className="flex items-center gap-2.5 w-full px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all">
            <Bell className="w-3.5 h-3.5 text-slate-400" />
            <span>Notifications</span>
          </button>

          <button className="flex items-center gap-2.5 w-full px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all">
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            <span>Help & Support</span>
          </button>
        </nav>

        {/* History */}
        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between px-2 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              History
            </span>
            <span className="text-[10px] font-semibold text-slate-600 hover:underline cursor-pointer">
              View All
            </span>
          </div>
          <div className="space-y-0.5 text-xs">
            <div className="flex items-center justify-between px-2 py-1 text-slate-700 hover:bg-slate-50 rounded-md cursor-pointer">
              <span className="truncate">Portfolio Analysis</span>
              <span className="text-[10px] text-slate-400">Today</span>
            </div>
            <div className="flex items-center justify-between px-2 py-1 text-slate-700 hover:bg-slate-50 rounded-md cursor-pointer">
              <span className="truncate">Portfolio Deep Dive</span>
              <span className="text-[10px] text-slate-400">Today</span>
            </div>
          </div>
        </div>
      </div>

      {/* User Footer */}
      <div className="p-3 border-t border-slate-100 bg-white">
        <div className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">
              ⚡
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900">Test</span>
              <span className="text-[10px] text-slate-400">PRO Investor</span>
            </div>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </div>
      </div>
    </aside>
  );
};
