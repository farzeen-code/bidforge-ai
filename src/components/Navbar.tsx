"use client";

import React from "react";
import { Sparkles, User, Zap, Shield, ArrowUpRight } from "lucide-react";
import { UserCredits } from "@/lib/types";

interface NavbarProps {
  credits: UserCredits;
  onOpenProfile: () => void;
  onOpenUpgrade: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  credits,
  onOpenProfile,
  onOpenUpgrade,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1px] shadow-lg shadow-blue-500/20">
            <div className="h-full w-full bg-slate-950 rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-white tracking-tight">BidForge</span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                AI MVP
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">Upwork & Gig Proposal Architect</p>
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-3">
          {/* Free Credit Counter */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>
              <strong className="text-white">{credits.available}</strong> bids remaining
            </span>
          </div>

          {/* Profile Setup Button */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-200 transition-colors"
            title="Configure your freelancer profile & past wins"
          >
            <User className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">My Profile</span>
          </button>

          {/* Upgrade / Pro Button */}
          <button
            onClick={onOpenUpgrade}
            className="group relative inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-xs font-semibold text-white shadow-md shadow-blue-600/30 transition-all hover:scale-[1.02]"
          >
            <span>Upgrade to Pro</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
