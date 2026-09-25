"use client";

import React from "react";
import { Sparkles, TrendingUp, CheckCircle2, ShieldCheck, ArrowDown } from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <div className="text-center pt-8 pb-10 max-w-4xl mx-auto px-4">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        <span>Next-Gen Freelance Proposal Engine</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
        Stop Getting Ignored.{" "}
        <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          Win The Projects You Actually Want.
        </span>
      </h1>

      {/* Subhead */}
      <p className="mt-5 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
        Clients discard 90% of bids within 5 seconds because they sound like copied bot templates.
        BidForge analyzes the client's psychological pain points, crafts an irresistible 2-line hook, and gives you consultative questions that close deals.
      </p>

      {/* Proof Highlights */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Engineered for Upwork 2-line preview</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span>Zero robotic "Dear Hiring Manager" fluff</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-indigo-400" />
          <span>3 Discovery Questions included per bid</span>
        </div>
      </div>
    </div>
  );
};
