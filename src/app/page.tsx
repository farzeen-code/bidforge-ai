"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ProposalWorkspace } from "@/components/ProposalWorkspace";
import { ProfileModal } from "@/components/ProfileModal";
import { UpgradeModal } from "@/components/UpgradeModal";
import { FreelancerProfile, UserCredits } from "@/lib/types";
import {
  Sparkles,
  Award,
  Zap,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  HelpCircle,
} from "lucide-react";

const DEFAULT_PROFILE: FreelancerProfile = {
  name: "Farhan",
  professionalTitle: "Full-Stack Engineer & AI Integration Specialist",
  topSkills: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Supabase",
    "Node.js",
    "Gemini & OpenAI APIs",
  ],
  pastWins:
    "Shipped 10+ production applications; reduced client API latency by 45%; 100% 5-star feedback rating on prior technical contracts.",
  portfolioLink: "https://github.com",
  hourlyRate: "$50/hr",
};

export default function Home() {
  const [profile, setProfile] = useState<FreelancerProfile>(DEFAULT_PROFILE);
  const [credits, setCredits] = useState<UserCredits>({
    available: 5,
    isPro: false,
    totalGenerated: 0,
  });

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);

  // Load profile and credits from localStorage on mount
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem("bidforge_profile");
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }

      const savedCredits = localStorage.getItem("bidforge_credits");
      if (savedCredits) {
        setCredits(JSON.parse(savedCredits));
      }
    } catch (e) {
      console.error("Failed to load local storage:", e);
    }
  }, []);

  const handleSaveProfile = (updated: FreelancerProfile) => {
    setProfile(updated);
    try {
      localStorage.setItem("bidforge_profile", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeductCredit = () => {
    setCredits((prev) => {
      const updated = {
        ...prev,
        available: Math.max(0, prev.available - 1),
        totalGenerated: prev.totalGenerated + 1,
      };
      try {
        localStorage.setItem("bidforge_credits", JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const handleSelectPlan = (plan: "starter" | "pro") => {
    // Simulated checkout completion / webhook demo
    const addedCredits = plan === "starter" ? 50 : 9999;
    setCredits((prev) => {
      const updated = {
        available: prev.available + addedCredits,
        isPro: plan === "pro",
        totalGenerated: prev.totalGenerated,
      };
      try {
        localStorage.setItem("bidforge_credits", JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
    setIsUpgradeOpen(false);
    alert(`Success! Your ${plan === "pro" ? "Pro Unlimited" : "50 Proposal Pack"} has been activated.`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        {/* Navigation */}
        <Navbar
          credits={credits}
          onOpenProfile={() => setIsProfileOpen(true)}
          onOpenUpgrade={() => setIsUpgradeOpen(true)}
        />

        {/* Hero Section */}
        <HeroSection />

        {/* Core Interactive Tool Workspace */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <ProposalWorkspace
            profile={profile}
            onOpenProfile={() => setIsProfileOpen(true)}
            onOpenUpgrade={() => setIsUpgradeOpen(true)}
            availableCredits={credits.available}
            onDeductCredit={handleDeductCredit}
          />
        </main>

        {/* Social Proof & Comparison Section */}
        <section className="border-t border-slate-800/80 bg-slate-950/60 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Why Standard Bids Fail vs. The BidForge Architecture
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-400">
                Clients receive 40+ proposals per job post. Here is the difference between getting archived and getting hired.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* The Old Way */}
              <div className="rounded-2xl border border-rose-900/40 bg-rose-950/10 p-6">
                <div className="text-rose-400 font-bold text-sm mb-3 flex items-center gap-2">
                  <span>❌ What 90% of Bidders Send</span>
                </div>
                <div className="space-y-3 text-xs text-slate-300 font-mono bg-slate-950/80 p-4 rounded-xl border border-rose-900/30">
                  <p className="text-rose-300">
                    "Dear Hiring Manager, I am a senior developer with 8 years of experience. I saw your post and I am confident I can do this job easily. Here is my resume..."
                  </p>
                </div>
                <ul className="mt-4 space-y-2 text-xs text-rose-300/80">
                  <li>• Client archives it in 2 seconds because it starts with generic flattery.</li>
                  <li>• Wastes the 2-line Upwork preview on boilerplate greetings.</li>
                  <li>• Asks zero thoughtful questions; makes the client do all the thinking.</li>
                </ul>
              </div>

              {/* The BidForge Way */}
              <div className="rounded-2xl border border-emerald-900/40 bg-emerald-950/10 p-6">
                <div className="text-emerald-400 font-bold text-sm mb-3 flex items-center gap-2">
                  <span>✅ The BidForge Formula</span>
                </div>
                <div className="space-y-3 text-xs text-slate-200 font-mono bg-slate-950/80 p-4 rounded-xl border border-emerald-900/30">
                  <p className="text-emerald-300">
                    "Most developers will try to rebuild your schema from scratch, but your actual bottleneck is webhook connection pool exhaustion. Here is how we fix it in 24 hours without downtime..."
                  </p>
                </div>
                <ul className="mt-4 space-y-2 text-xs text-emerald-300/90">
                  <li>• Immediately hooks into their acute pain point in the 2-line preview.</li>
                  <li>• Highlights precise proof-of-work without overwhelming with resume bloat.</li>
                  <li>• Provides 3 consultative discovery questions that spark instant replies.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 max-w-4xl mx-auto px-4">
          <h3 className="text-xl font-bold text-white text-center mb-8">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <h4 className="font-semibold text-slate-200">How is this different from copying from ChatGPT?</h4>
              <p className="mt-1 text-slate-400 leading-relaxed">
                ChatGPT defaults to polite, verbose filler ("I hope this message finds you well") that clients immediately identify as AI spam. BidForge enforces a strict hook-first architecture engineered around the exact preview length of Upwork and gig platforms.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <h4 className="font-semibold text-slate-200">Does this work for beginners with smaller portfolios?</h4>
              <p className="mt-1 text-slate-400 leading-relaxed">
                Yes. Clients care far more about whether you understand their immediate problem and can ask the right questions than how many years you've spent writing code.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-slate-300">BidForge AI</span>
            <span>— The Solo Founder Proposal Machine</span>
          </div>
          <div>Strict $0 Stack: Next.js • Tailwind • Gemini Flash • Supabase</div>
        </div>
      </footer>

      {/* Modals */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={profile}
        onSaveProfile={handleSaveProfile}
      />

      <UpgradeModal
        isOpen={isUpgradeOpen}
        onClose={() => setIsUpgradeOpen(false)}
        onSelectPlan={handleSelectPlan}
      />
    </div>
  );
}
