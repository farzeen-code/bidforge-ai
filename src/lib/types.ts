export type Platform = "upwork" | "fiverr" | "freelancer" | "cold_email";
export type ProposalTone = "consultative" | "direct_closer" | "technical_expert" | "friendly_collaborative";

export interface FreelancerProfile {
  name: string;
  professionalTitle: string;
  topSkills: string[];
  pastWins: string;
  portfolioLink?: string;
  hourlyRate?: string;
}

export interface ProposalRequest {
  jobDescription: string;
  platform: Platform;
  tone: ProposalTone;
  profile?: FreelancerProfile;
}

export interface ClientAnalysis {
  coreGoal: string;
  urgencyLevel: "Immediate / Urgent" | "Moderate" | "Long-term Planning";
  hiddenPainPoints: string[];
  clientRedFlags: string[];
  vibeSummary: string;
}

export interface ProposalOutput {
  id: string;
  createdAt: string;
  jobSnippet: string;
  analysis: ClientAnalysis;
  hook: string;
  body: string;
  callToAction: string;
  fullProposalText: string;
  discoveryQuestions: string[];
  followUpScript: string;
  strategicTips: {
    recommendedPricingApproach: string;
    timelineEstimate: string;
    winFactor: string;
  };
}

export interface UserCredits {
  available: number;
  isPro: boolean;
  totalGenerated: number;
}
