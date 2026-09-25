// Automated Comprehensive Verification Suite for BidForge AI

const BASE_URL = "http://localhost:3000";

const testCases = [
  {
    name: "Standard Upwork Post with Consultative Tone",
    payload: {
      platform: "upwork",
      tone: "consultative",
      jobDescription: `Looking for an expert Next.js and Supabase developer to build a client dashboard. Must have experience with Stripe billing webhooks and automated PDF generation. Needs to be completed in 2 weeks.`,
      profile: {
        name: "Farzeen",
        professionalTitle: "Full-Stack AI Engineer",
        topSkills: ["Next.js", "Supabase", "TypeScript", "Stripe API"],
        pastWins: "Built 10+ production web applications; reduced API response time by 45%.",
        portfolioLink: "https://github.com",
        hourlyRate: "$50/hr",
      },
    },
    validate: (res, body) => {
      if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
      if (!body.hook || body.hook.length < 20) throw new Error("Hook missing or too short");
      if (!body.fullProposalText || body.fullProposalText.length < 50) throw new Error("Full proposal text missing");
      if (!Array.isArray(body.discoveryQuestions) || body.discoveryQuestions.length < 2) throw new Error("Discovery questions missing");
      if (!body.analysis || !body.analysis.coreGoal) throw new Error("Analysis coreGoal missing");
      if (!body.followUpScript || body.followUpScript.length < 15) throw new Error("Follow-up script missing");
    },
  },
  {
    name: "Fiverr Bug-Fix Gig with Direct Closer Tone",
    payload: {
      platform: "fiverr",
      tone: "direct_closer",
      jobDescription: `CRITICAL BUG: Stripe webhook is intermittently failing with 500 error when multiple subscribers check out simultaneously. Need urgent fix today.`,
      profile: {
        name: "Farzeen",
        professionalTitle: "Senior Backend Specialist",
        topSkills: ["Node.js", "Stripe Webhooks", "PostgreSQL", "Redis"],
        pastWins: "Resolved 20+ production webhook and concurrency race conditions.",
      },
    },
    validate: (res, body) => {
      if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
      if (!body.hook) throw new Error("Hook missing");
      if (!body.strategicTips || !body.strategicTips.recommendedPricingApproach) throw new Error("Strategic tips missing");
    },
  },
  {
    name: "Freelancer.com AI App with Tech Specialist Tone",
    payload: {
      platform: "freelancer",
      tone: "technical_expert",
      jobDescription: `Build a RAG pipeline using ChromaDB, Gemini Flash embeddings, and FastAPI. Must support streaming tokens to frontend and guard against rate limits.`,
      profile: {
        name: "Farzeen",
        professionalTitle: "AI & RAG Architect",
        topSkills: ["Python", "Gemini API", "ChromaDB", "FastAPI"],
        pastWins: "Engineered RAG pipelines handling 50k+ daily queries.",
      },
    },
    validate: (res, body) => {
      if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
      if (!body.discoveryQuestions || body.discoveryQuestions.length < 3) throw new Error("Expected at least 3 discovery questions");
    },
  },
  {
    name: "Cold Outreach Pitch with Friendly Tone",
    payload: {
      platform: "cold_email",
      tone: "friendly_collaborative",
      jobDescription: `We are a boutique real estate agency looking to automate our property listing summaries into email blasts for buyers.`,
      profile: {
        name: "Farzeen",
        professionalTitle: "Workflow Automation Specialist",
        topSkills: ["Automation", "Email API", "Prompt Engineering"],
        pastWins: "Automated 100+ manual workflows for agency clients.",
      },
    },
    validate: (res, body) => {
      if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
      if (!body.fullProposalText) throw new Error("Proposal text missing");
    },
  },
  {
    name: "Validation Test: Job Description Too Short (<15 chars)",
    payload: {
      platform: "upwork",
      tone: "consultative",
      jobDescription: "Help me",
    },
    validate: (res, body) => {
      if (res.status !== 400) throw new Error(`Expected status 400, but got ${res.status}`);
      if (!body.error) throw new Error("Expected error message in response body");
    },
  },
  {
    name: "Edge Case: Special Characters and Nested Quotes",
    payload: {
      platform: "upwork",
      tone: "consultative",
      jobDescription: `Looking for a "rockstar" dev! $1000/week! Key specs: { "auth": "Supabase & Clerk", "notes": "Don't use old libraries like v1 & v2" } -- must handle \n\r special breaks!`,
      profile: {
        name: "Farzeen",
        professionalTitle: "Full-Stack Specialist",
        topSkills: ["TypeScript", "Next.js"],
        pastWins: "Handled enterprise systems.",
      },
    },
    validate: (res, body) => {
      if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
      if (!body.hook || !body.fullProposalText) throw new Error("Proposal generation failed on special characters");
    },
  },
];

async function runAllTests() {
  console.log("=================================================");
  console.log("🧪 RUNNING COMPREHENSIVE BIDFORGE AI TEST SUITE");
  console.log("=================================================\n");

  let passed = 0;
  let failed = 0;

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    process.stdout.write(`[Test ${i + 1}/${testCases.length}] ${tc.name} ... `);
    const start = Date.now();

    try {
      const res = await fetch(`${BASE_URL}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tc.payload),
      });

      const body = await res.json();
      tc.validate(res, body);
      const elapsed = Date.now() - start;
      console.log(`✅ PASSED (${elapsed}ms)`);
      passed++;
    } catch (err) {
      const elapsed = Date.now() - start;
      console.log(`❌ FAILED (${elapsed}ms)`);
      console.error(`   Error details: ${err.message}`);
      failed++;
    }
  }

  console.log("\n=================================================");
  console.log(`TEST SUMMARY: ${passed} Passed, ${failed} Failed`);
  console.log("=================================================");

  if (failed > 0) {
    process.exit(1);
  } else {
    console.log("🎉 ALL TESTS PASSED WITH 100% SUCCESS RATE!");
    process.exit(0);
  }
}

runAllTests();
