"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Copy,
  Check,
  Zap,
  Target,
  AlertCircle,
  HelpCircle,
  Clock,
  ArrowRight,
  RefreshCw,
  Sliders,
  Send,
  MessageSquare,
  ShieldAlert,
} from "lucide-react";
import {
  FreelancerProfile,
  Platform,
  ProposalOutput,
  ProposalRequest,
  ProposalTone,
} from "@/lib/types";
import { SAMPLE_JOBS, SampleJob } from "@/lib/mockData";

interface ProposalWorkspaceProps {
  profile: FreelancerProfile;
  onOpenProfile: () => void;
  onOpenUpgrade: () => void;
  availableCredits: number;
  onDeductCredit: () => void;
}

export const ProposalWorkspace: React.FC<ProposalWorkspaceProps> = ({
  profile,
  onOpenProfile,
  onOpenUpgrade,
  availableCredits,
  onDeductCredit,
}) => {
  const [platform, setPlatform] = useState<Platform>("upwork");
  const [tone, setTone] = useState<ProposalTone>("consultative");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"proposal" | "analysis" | "questions" | "followup">("proposal");
  const [proposalOutput, setProposalOutput] = useState<ProposalOutput | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // Copy helper with feedback
  const handleCopy = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => {
      setCopiedSection(null);
    }, 2000);
  };

  const handleLoadSample = (sample: SampleJob) => {
    setJobDescription(sample.fullDescription);
    setPlatform(sample.platform);
  };

  const handleGenerate = async () => {
    if (!jobDescription.trim()) return;

    if (availableCredits <= 0) {
      onOpenUpgrade();
      return;
    }

    setIsLoading(true);
    try {
      const payload: ProposalRequest = {
        jobDescription,
        platform,
        tone,
        profile,
      };

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to generate bid");
      }

      const data: ProposalOutput = await res.json();
      setProposalOutput(data);
      onDeductCredit();
    } catch (err) {
      console.error("Error generating proposal:", err);
      alert("Something went wrong generating your proposal. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT COLUMN: Input Workspace */}
      <div className="lg:col-span-5 space-y-5">
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800/80 p-5 sm:p-6 shadow-xl backdrop-blur-sm">
          {/* Platform Selector */}
          <div className="mb-5">
            <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
              1. Target Platform
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: "upwork", label: "Upwork" },
                { id: "fiverr", label: "Fiverr" },
                { id: "freelancer", label: "Freelancer" },
                { id: "cold_email", label: "Cold Pitch" },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPlatform(p.id as Platform)}
                  className={`py-2 px-1 text-center rounded-xl text-xs font-medium transition-all ${
                    platform === p.id
                      ? "bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30"
                      : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tone Selector */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                2. Proposal Pitch Tone
              </label>
              <span className="text-[11px] text-cyan-400">Tailored to client psychology</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "consultative", label: "Consultative", desc: "Thoughtful & strategic" },
                { id: "direct_closer", label: "Direct Closer", desc: "Action & speed focused" },
                { id: "technical_expert", label: "Tech Specialist", desc: "Architecture & deep skill" },
                { id: "friendly_collaborative", label: "Collaborative", desc: "Warm & partner-oriented" },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTone(t.id as ProposalTone)}
                  className={`p-2.5 text-left rounded-xl transition-all border ${
                    tone === t.id
                      ? "bg-blue-950/60 border-blue-500 text-white shadow-sm"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div className="text-xs font-semibold">{t.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Active Freelancer Profile Summary Card */}
          <div className="mb-5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-xs">
            <div className="truncate mr-2">
              <span className="text-slate-400">Bidding as: </span>
              <strong className="text-slate-200">{profile.name}</strong>
              <span className="text-slate-400"> ({profile.professionalTitle})</span>
            </div>
            <button
              onClick={onOpenProfile}
              className="text-cyan-400 hover:text-cyan-300 font-medium flex-shrink-0 text-[11px]"
            >
              Edit Profile
            </button>
          </div>

          {/* Quick Sample Job Starters */}
          <div className="mb-3">
            <div className="text-[11px] font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>Or click to test with a pre-validated sample job:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {SAMPLE_JOBS.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => handleLoadSample(sample)}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 transition-colors"
                >
                  {sample.title.slice(0, 32)}...
                </button>
              ))}
            </div>
          </div>

          {/* Job Description Input Area */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                3. Paste Job Posting
              </label>
              <span className="text-[11px] text-slate-400">
                {jobDescription.length} characters
              </span>
            </div>
            <textarea
              rows={8}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the raw client job description or Upwork gig details here..."
              className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono text-xs leading-relaxed resize-none"
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isLoading || !jobDescription.trim()}
            className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white shadow-xl transition-all flex items-center justify-center gap-2.5 ${
              isLoading || !jobDescription.trim()
                ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-blue-600/30 hover:scale-[1.01]"
            }`}
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Deconstructing Job & Engineering Pitch...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span>Generate High-Converting Bid</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* RIGHT COLUMN: Output & Results */}
      <div className="lg:col-span-7 space-y-5">
        {!proposalOutput && !isLoading ? (
          /* Empty State */
          <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 p-8 sm:p-12 text-center text-slate-400 flex flex-col items-center justify-center min-h-[480px]">
            <div className="h-16 w-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-200">No Proposal Generated Yet</h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mt-2">
              Select your platform, paste a client job description on the left (or pick one of the sample jobs), and click <strong>Generate High-Converting Bid</strong>.
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left w-full max-w-lg">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-xs font-semibold text-slate-200 block mb-1">0% Clichés</span>
                <span className="text-[11px] text-slate-400">Zero "Dear Hiring Manager" or robotic AI filler.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-xs font-semibold text-slate-200 block mb-1">Upwork Hook</span>
                <span className="text-[11px] text-slate-400">Engineered specifically for the 2-line client preview.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-xs font-semibold text-slate-200 block mb-1">Pain Point Scan</span>
                <span className="text-[11px] text-slate-400">Surfaces what the client actually needs vs said.</span>
              </div>
            </div>
          </div>
        ) : isLoading ? (
          /* Loading State with Animated Steps */
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center text-slate-400 min-h-[480px] flex flex-col items-center justify-center space-y-6 animate-pulse">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-[2px]">
              <div className="h-full w-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <RefreshCw className="w-7 h-7 text-cyan-400 animate-spin" />
              </div>
            </div>
            <div>
              <h3 className="text-base font-bold text-white">BidForge Engine in Progress...</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                Running job analysis through Gemini Flash to isolate core objections and write a tailored pitch.
              </p>
            </div>
            <div className="space-y-2 w-full max-w-xs text-xs text-left">
              <div className="flex items-center gap-2 text-cyan-300">
                <Check className="w-3.5 h-3.5" /> Deconstructing client job requirements
              </div>
              <div className="flex items-center gap-2 text-cyan-300">
                <Check className="w-3.5 h-3.5" /> Aligning with your profile highlights
              </div>
              <div className="flex items-center gap-2 text-blue-400 animate-pulse">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Drafting non-templated opening hook
              </div>
            </div>
          </div>
        ) : (
          /* Output Dashboard */
          <div className="space-y-4">
            {/* The Upwork Hook Spotlight Card */}
            <div className="relative rounded-2xl border-2 border-cyan-500/40 bg-gradient-to-r from-blue-950/40 to-slate-900 p-5 shadow-lg shadow-cyan-950/20">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    The 2-Line Hook
                  </span>
                  <span className="text-[11px] text-slate-400 hidden sm:inline">
                    (What client sees before clicking "Read More")
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(proposalOutput!.hook, "hook")}
                  className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 transition-colors"
                >
                  {copiedSection === "hook" ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Hook</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-sm font-medium text-slate-100 italic leading-relaxed">
                "{proposalOutput!.hook}"
              </p>
            </div>

            {/* Navigation Tabs for Output */}
            <div className="flex items-center border-b border-slate-800 gap-2 pb-1">
              {[
                { id: "proposal", label: "Full Proposal", icon: MessageSquare },
                { id: "analysis", label: "Client Diagnostic", icon: Target },
                { id: "questions", label: "Discovery Questions", icon: HelpCircle },
                { id: "followup", label: "48h Follow-Up", icon: Clock },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg text-xs font-semibold transition-all ${
                      activeTab === tab.id
                        ? "bg-slate-900 border-t border-x border-slate-800 text-white"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB 1: Full Proposal */}
            {activeTab === "proposal" && (
              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                  <div className="text-xs text-slate-400">
                    Ready to paste directly into your proposal box.
                  </div>
                  <button
                    onClick={() => handleCopy(proposalOutput!.fullProposalText, "full_proposal")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white shadow-md shadow-blue-600/30 transition-all"
                  >
                    {copiedSection === "full_proposal" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-white" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Full Proposal</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 font-sans text-xs sm:text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {proposalOutput!.fullProposalText}
                </div>
                <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                  <span>Strategy: {proposalOutput!.strategicTips.recommendedPricingApproach}</span>
                  <span>Est. Timeline: {proposalOutput!.strategicTips.timelineEstimate}</span>
                </div>
              </div>
            )}

            {/* TAB 2: Client Diagnostic */}
            {activeTab === "analysis" && (
              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4 text-xs">
                <div>
                  <h4 className="font-bold text-slate-200 mb-1">Underlying Core Goal</h4>
                  <p className="text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800">
                    {proposalOutput!.analysis.coreGoal}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold text-amber-400 mb-1 flex items-center gap-1">
                      <Target className="w-3.5 h-3.5" /> Hidden Pain Points
                    </h4>
                    <ul className="space-y-1.5 bg-slate-950 p-3 rounded-lg border border-slate-800 text-slate-300">
                      {proposalOutput!.analysis.hiddenPainPoints.map((pain, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-amber-400">•</span>
                          <span>{pain}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-rose-400 mb-1 flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5" /> Red Flag Alert
                    </h4>
                    <ul className="space-y-1.5 bg-slate-950 p-3 rounded-lg border border-slate-800 text-slate-300">
                      {proposalOutput!.analysis.clientRedFlags.map((flag, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-rose-400">•</span>
                          <span>{flag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-200 mb-1">Client Personality & Vibe</h4>
                  <p className="text-slate-400 bg-slate-950 p-3 rounded-lg border border-slate-800">
                    {proposalOutput!.analysis.vibeSummary}
                  </p>
                </div>
              </div>
            )}

            {/* TAB 3: Discovery Questions */}
            {activeTab === "questions" && (
              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4">
                <div className="text-xs text-slate-400">
                  Asking intelligent, consultative questions immediately differentiates you from 95% of generic bids.
                </div>
                <div className="space-y-3">
                  {proposalOutput!.discoveryQuestions.map((q, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="flex items-start gap-2 text-slate-200">
                        <span className="font-bold text-cyan-400">{idx + 1}.</span>
                        <span>{q}</span>
                      </div>
                      <button
                        onClick={() => handleCopy(q, `q_${idx}`)}
                        className="text-[11px] text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-900 border border-slate-800 flex-shrink-0"
                      >
                        {copiedSection === `q_${idx}` ? "Copied" : "Copy"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: Follow-up Script */}
            {activeTab === "followup" && (
              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <div className="text-xs text-slate-400">
                    Send this message 48 hours later if the client viewed your proposal without messaging back.
                  </div>
                  <button
                    onClick={() => handleCopy(proposalOutput!.followUpScript, "followup")}
                    className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800"
                  >
                    {copiedSection === "followup" ? "Copied!" : "Copy Follow-Up"}
                  </button>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-200 leading-relaxed font-sans">
                  {proposalOutput!.followUpScript}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
