import { NextRequest, NextResponse } from "next/server";
import { generateProposal } from "@/lib/gemini";
import { ProposalRequest } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ProposalRequest;

    if (!body || !body.jobDescription || body.jobDescription.trim().length < 15) {
      return NextResponse.json(
        { error: "Please provide a valid job description (at least 15 characters)." },
        { status: 400 }
      );
    }

    const proposal = await generateProposal(body);
    return NextResponse.json(proposal);
  } catch (error: any) {
    console.error("API /generate error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to generate proposal. Please try again." },
      { status: 500 }
    );
  }
}
