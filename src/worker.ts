import { generateProposal } from "./lib/gemini";
import { ProposalRequest } from "./lib/types";

export default {
  async fetch(request: Request, env: any) {
    const url = new URL(request.url);

    // Handle the proposal generation endpoint
    if (url.pathname === "/api/generate" && request.method === "POST") {
      try {
        const body = (await request.json()) as ProposalRequest;
        if (!body || !body.jobDescription || body.jobDescription.trim().length < 15) {
          return new Response(
            JSON.stringify({ error: "Please provide a valid job description (at least 15 characters)." }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }

        const apiKey = env.GEMINI_API_KEY;
        const proposal = await generateProposal(body, apiKey);
        return new Response(JSON.stringify(proposal), {
          headers: { "Content-Type": "application/json" },
        });
      } catch (err: any) {
        return new Response(
          JSON.stringify({ error: err?.message || "Failed to generate proposal." }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    // Fall through to serve all static frontend Next.js pages and assets
    if (env.ASSETS && typeof env.ASSETS.fetch === "function") {
      return env.ASSETS.fetch(request);
    }

    return new Response("Not found", { status: 404 });
  },
};
