import { ProposalOutput, ProposalRequest } from "./types";

export async function generateProposal(request: ProposalRequest, customApiKey?: string): Promise<ProposalOutput> {
  const apiKey = customApiKey || process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (apiKey) {
    try {
      const response = await callGeminiAPI(apiKey, request);
      if (response) return response;
    } catch (err) {
      console.error("Gemini API call failed, falling back to smart engine:", err);
    }
  }

  // Smart responsive fallback generator if no API key is provided yet
  return generateIntelligentProposal(request);
}

async function callGeminiAPI(apiKey: string, req: ProposalRequest): Promise<ProposalOutput | null> {
  const prompt = `
You are the world's top freelance bid strategist and proposal copywriter.
Analyze this job posting and generate a winning, high-converting proposal for a freelancer.

Job Posting:
"""
${req.jobDescription}
"""

Freelancer Profile:
- Name: ${req.profile?.name || "Freelancer"}
- Title: ${req.profile?.professionalTitle || "Full Stack Developer & Technical Specialist"}
- Core Skills: ${req.profile?.topSkills?.join(", ") || "Next.js, React, Node.js, AI integrations"}
- Past Wins: ${req.profile?.pastWins || "Built 10+ high-traffic web applications, improved client conversion rates by 40%."}
- Portfolio: ${req.profile?.portfolioLink || "Available upon request"}

Platform: ${req.platform} (Upwork, Freelancer, Fiverr, Cold Email)
Tone: ${req.tone}

CRITICAL RULES:
1. NEVER start with generic cliches like "I hope this message finds you well", "Dear Hiring Manager", or "I was excited to see your job post".
2. The Hook (first 2 sentences) MUST immediately address the client's specific problem or offer a sharp observation about their project. On Upwork, only the first 2 lines appear in the client's preview list before clicking.
3. Include 3 insightful, high-competence discovery questions that prove the freelancer actually understood the requirements better than 99% of bidders.
4. Provide a 48-hour follow-up message if the client views the bid but hasn't responded.
5. Return strictly valid JSON with this schema (no markdown fences, just pure JSON):
{
  "analysis": {
    "coreGoal": "string",
    "urgencyLevel": "Immediate / Urgent" | "Moderate" | "Long-term Planning",
    "hiddenPainPoints": ["string", "string"],
    "clientRedFlags": ["string"],
    "vibeSummary": "string"
  },
  "hook": "string (the punchy 1-2 sentence opening)",
  "body": "string (the main proposal content)",
  "callToAction": "string (low friction next step)",
  "fullProposalText": "string (the entire ready-to-send proposal text)",
  "discoveryQuestions": ["string", "string", "string"],
  "followUpScript": "string",
  "strategicTips": {
    "recommendedPricingApproach": "string",
    "timelineEstimate": "string",
    "winFactor": "string"
  }
}
`;

  // We try gemini-2.5-flash, then fallback to gemini-1.5-flash
  const models = ["gemini-2.5-flash", "gemini-1.5-flash"];
  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            responseMimeType: "application/json",
          },
        }),
      });

      if (!res.ok) {
        console.warn(`Model ${model} returned status ${res.status}`);
        continue;
      }

      const data = await res.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (rawText) {
        const cleaned = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
        const parsed = JSON.parse(cleaned);
        return {
          id: `bid_${Date.now()}`,
          createdAt: new Date().toISOString(),
          jobSnippet: req.jobDescription.slice(0, 140) + "...",
          ...parsed,
        };
      }
    } catch (e) {
      console.warn(`Error querying ${model}:`, e);
    }
  }

  return null;
}

export function generateIntelligentProposal(req: ProposalRequest): ProposalOutput {
  const job = req.jobDescription.toLowerCase();
  const name = req.profile?.name || "Alex";
  const title = req.profile?.professionalTitle || "Full-Stack Specialist";
  const skills = req.profile?.topSkills?.join(", ") || "Next.js, TypeScript, API Integrations";

  const isEcom = job.includes("shopify") || job.includes("ecommerce") || job.includes("store") || job.includes("stripe");
  const isAI = job.includes("ai") || job.includes("llm") || job.includes("gpt") || job.includes("bot") || job.includes("rag");
  const isMobile = job.includes("mobile") || job.includes("react native") || job.includes("ios") || job.includes("android");
  const isBugFix = job.includes("fix") || job.includes("bug") || job.includes("broken") || job.includes("urgent");

  let hook = `Most candidates will tell you they can do this, but looking closely at your project, the real bottleneck isn't just implementation—it's ensuring your architecture doesn't break once actual users start hitting it.`;
  let coreGoal = "Deliver a robust, production-ready solution solving the client's immediate operational roadblock.";
  let hiddenPain = [
    "Prior freelancers likely delivered brittle code or vanished before completion",
    "Client cares more about speed to a working prototype than long academic debates",
  ];
  let questions = [
    "Do you already have a staging environment or database schema initialized, or should I architect that from scratch?",
    "What is your target go-live date for the first usable iteration?",
    "Are there specific third-party APIs or webhooks that need priority integration?",
  ];

  if (isAI) {
    hook = `Saw your requirement for AI integration. The biggest risk with projects like this is token cost runaway and latency lag when handling multi-turn queries. I've engineered solutions that solve both with structured streaming and fallback routing.`;
    coreGoal = "Build a reliable, low-latency AI pipeline with tight cost and rate-limit guardrails.";
    hiddenPain = [
      "Worried about expensive LLM billing spikes without proper caching",
      "Needs reliable JSON structured outputs rather than unpredictable chat responses",
    ];
    questions = [
      "Which LLM provider (OpenAI, Gemini, Anthropic) do you prefer, or do you want me to recommend the most cost-efficient choice for your volume?",
      "Will this require real-time streaming to the UI, or background batch processing?",
      "Do you have sample prompts or expected input/output schemas ready?",
    ];
  } else if (isBugFix) {
    hook = `I can jump into your codebase right now, isolate the root cause of this issue, and push a verified fix without disturbing your existing production environment.`;
    coreGoal = "Immediate root-cause diagnosis and non-breaking hotfix deployment.";
    hiddenPain = [
      "Losing money or user trust every hour the issue stays unresolved",
      "Afraid a quick fix will cause unexpected regressions in other modules",
    ];
    questions = [
      "Do you have access to error tracking logs (e.g. Sentry, console logs, or server output) reproducing the bug?",
      "Is this currently affecting live users, or is it on a test/staging branch?",
      "Can you provide temporary repo/branch access so I can inspect the relevant files immediately?",
    ];
  }

  const body = `Hi there,\n\nI reviewed your brief in detail. With a strong track record in ${skills}, I specialize in building solutions that are clean, thoroughly tested, and designed to scale.\n\nHere is how I would approach your project:\n1. Quick audit of your current setup & requirements to confirm zero architectural blind spots.\n2. Milestone 1 delivery: Core functionality built, integrated, and deployed to a private preview URL for your hands-on review.\n3. Polish & handover: Comprehensive documentation, zero leftover bugs, and seamless production deployment.\n\nI don't outsource my work or juggle dozens of clients simultaneously—when I take on a project, you get my undivided attention until it's finished to 100% satisfaction.`;

  const callToAction = `If you have 5 minutes, let's connect on chat to discuss the details and I'll outline a step-by-step roadmap for you today.`;

  const fullProposal = `${hook}\n\n${body}\n\n${callToAction}\n\nBest,\n${name}\n${title}`;

  return {
    id: `bid_${Date.now()}`,
    createdAt: new Date().toISOString(),
    jobSnippet: req.jobDescription.slice(0, 140) + "...",
    analysis: {
      coreGoal,
      urgencyLevel: isBugFix ? "Immediate / Urgent" : "Moderate",
      hiddenPainPoints: hiddenPain,
      clientRedFlags: [
        "Check whether client payment method is verified and their hire rate history.",
      ],
      vibeSummary: "Direct, outcome-oriented client looking for an expert who takes ownership without hand-holding.",
    },
    hook,
    body,
    callToAction,
    fullProposalText: fullProposal,
    discoveryQuestions: questions,
    followUpScript: `Hey [Client Name], just following up on this—I had a couple of additional thoughts on how we can optimize the architecture to save time and reduce integration friction. Happy to share a quick 2-minute breakdown if you're still evaluating proposals!`,
    strategicTips: {
      recommendedPricingApproach: isBugFix ? "Fixed-price milestone for rapid turnaround" : "Value-based milestone pricing",
      timelineEstimate: isBugFix ? "24–48 hours" : "1–2 weeks for MVP",
      winFactor: "First 2 lines hook directly into their actual problem with zero fluff.",
    },
  };
}
