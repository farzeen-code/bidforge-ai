export interface SampleJob {
  title: string;
  platform: "upwork" | "fiverr" | "freelancer" | "cold_email";
  budget: string;
  snippet: string;
  fullDescription: string;
}

export const SAMPLE_JOBS: SampleJob[] = [
  {
    title: "Full-Stack Next.js Developer for Micro-SaaS MVP",
    platform: "upwork",
    budget: "$1,200 Fixed Price",
    snippet: "Need an experienced dev to build an MVP with Supabase, Next.js 14, and Stripe...",
    fullDescription: `We are looking for an experienced full-stack developer to help us build the MVP for our B2B SaaS tool. 

Key Requirements:
- Next.js 14/15 App Router with Tailwind CSS
- Supabase for PostgreSQL database, Auth, and Storage
- Stripe Checkout integration for recurring subscriptions
- Integration with an AI LLM API (OpenAI or Gemini) for automated document analysis

Deliverables:
- Clean, documented codebase in GitHub
- Deployment on Vercel or Cloudflare
- Working end-to-end checkout and dashboard

Please do not submit copy-pasted bot proposals. Start your application with the word 'Blueberry' so I know you actually read this. Include examples of live Next.js apps you have built.`,
  },
  {
    title: "Fix critical API webhook failure & optimize database queries",
    platform: "upwork",
    budget: "$45 - $65 / hr",
    snippet: "Our Stripe webhook listener is dropping events intermittently in production...",
    fullDescription: `Urgent requirement: Our production Node.js/PostgreSQL application is currently dropping webhook events from our payment provider about 15% of the time during peak hours.

Need a senior backend engineer to:
1. Audit the webhook handler and error-handling retry queue.
2. Optimize our database connection pool (we suspect connection pool exhaustion).
3. Ensure zero data loss and implement dead-letter queue or logging in Sentry.

Must be available to start today. Time is sensitive.`,
  },
  {
    title: "AI Automation Agent for Real Estate Lead Outreach",
    platform: "fiverr",
    budget: "$600 Fixed Price",
    snippet: "Need an automation that extracts new Zillow listings and drafts tailored outreach...",
    fullDescription: `I am looking for an AI developer to create a simple automation pipeline:
- Extract property listings and agent contact info from Zillow/Redfin
- Run the description through Gemini or OpenAI to create a personalized SMS and email pitch
- Push qualified leads into my Airtable or Google Sheets CRM

Must be reliable and run automatically every morning.`,
  },
];
