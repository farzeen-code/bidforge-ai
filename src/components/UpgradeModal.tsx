"use client";

import React, { useState } from "react";
import { X, Check, Zap, Sparkles, Shield, Rocket, ArrowRight } from "lucide-react";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (plan: "starter" | "pro") => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({
  isOpen,
  onClose,
  onSelectPlan,
}) => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "pack">("monthly");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl text-slate-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Heading */}
        <div className="text-center max-w-md mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" /> High-Converting Bids on Autopilot
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Win More High-Paying Clients
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">
            A single won contract pays for BidForge for an entire year. Stop losing gigs to bot spam and generic cover letters.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Pay-as-you-go Pack */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6 flex flex-col justify-between hover:border-slate-700 transition-all">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-slate-200">Proposal Pack</span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                  One-time
                </span>
              </div>
              <div className="flex items-baseline gap-1 my-3">
                <span className="text-3xl font-extrabold text-white">$9</span>
                <span className="text-xs text-slate-400">/ 50 proposals</span>
              </div>
              <p className="text-xs text-slate-400 mb-5">
                Ideal for active freelancers testing the waters or bidding on targeted batches of gigs.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>50 Full AI Proposal Generations</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Client Pain-Point & Red Flag Scanner</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>3 Discovery Questions per pitch</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Credits never expire</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => onSelectPlan("starter")}
              className="mt-6 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 font-semibold text-xs text-slate-100 transition-colors flex items-center justify-center gap-2"
            >
              <span>Get 50 Credits ($9)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pro Monthly Unlimited */}
          <div className="relative rounded-2xl border-2 border-blue-500 bg-gradient-to-b from-blue-950/40 via-slate-900 to-slate-950 p-6 flex flex-col justify-between shadow-xl shadow-blue-950/40">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-500 text-[10px] font-extrabold text-white uppercase px-3 py-1 rounded-full tracking-wider shadow-md">
              Most Popular
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Rocket className="w-4 h-4 text-cyan-400" /> Pro Unlimited
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/20 text-cyan-300 border border-blue-500/30">
                  Monthly
                </span>
              </div>
              <div className="flex items-baseline gap-1 my-3">
                <span className="text-3xl font-extrabold text-white">$14</span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>
              <p className="text-xs text-slate-400 mb-5">
                For solo consultants, agencies, and full-time freelancers who want zero limits.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-200">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span><strong>Unlimited</strong> AI Proposal Generations</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>All 4 Advanced Tone Engines</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>Automatic 48-Hour Follow-Up Scripts</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>Priority Sub-Second Generation Speed</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => onSelectPlan("pro")}
              className="mt-6 w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 font-semibold text-xs text-white shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
            >
              <span>Start Unlimited Pro</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Guarantee Banner */}
        <div className="mt-6 pt-5 border-t border-slate-800 text-center flex items-center justify-center gap-2 text-xs text-slate-400">
          <Shield className="w-4 h-4 text-slate-500" />
          <span>Secured via Lemon Squeezy / Stripe • Cancel anytime with 1 click</span>
        </div>
      </div>
    </div>
  );
};
