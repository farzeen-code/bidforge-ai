# BidForge AI 🚀
> The High-Converting Freelance Proposal & Bid Architect (Strict $0 Solo Stack)

BidForge AI helps freelancers, developers, designers, and agencies turn complex client job postings (from Upwork, Fiverr, Freelancer, and cold outreach) into high-converting bids with tailored hooks, strategic pain-point analysis, and top-1% discovery questions.

---

## ⚡ Quick Start

### 1. Run Locally
The dev server is already running in your background task at:
**[http://localhost:3000](http://localhost:3000)**

If restarting later:
```bash
cd C:\Users\farze\.gemini\antigravity\scratch\bidforge-ai
npm run dev
```

### 2. Connect Live Google Gemini API ($0 Free Tier)
1. Grab a free API key from [Google AI Studio](https://aistudio.google.com/).
2. Create `.env.local` in `bidforge-ai/`:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
3. When `GEMINI_API_KEY` is present, the app automatically switches to live Gemini Flash. If empty, it runs on the smart internal engine for instant offline testing.

---

## 🏗️ Architecture & Features

- **The 2-Line Hook Spotlight:** Specifically engineered for Upwork's interface where clients only see the first 2 lines before clicking "Read More".
- **Client Pain-Point & Red Flag Scanner:** Identifies hidden risks, budget red flags, and client communication style.
- **3 Top-Tier Discovery Questions:** Generates consultative questions that prompt immediate client replies.
- **48-Hour Follow-Up Script:** Automatically crafts a non-intrusive re-engagement nudge.
- **Persisted Profile & Credits:** Freelancer bio, portfolio highlights, and credit balance persist in `localStorage`.
- **Integrated Monetization UI:** Pre-configured pricing tiers ready for Lemon Squeezy or Stripe checkout links.

---

## 🚢 Deploy for $0 (Zero Hosting Bill)

### Option A: Cloudflare Pages (Recommended for $0 Commercial Policy)
1. Push this directory to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "Initial release of BidForge AI"
   git remote add origin https://github.com/your-username/bidforge-ai.git
   git push -u origin main
   ```
2. Log into [Cloudflare Dashboard](https://dash.cloudflare.com/) -> **Workers & Pages** -> **Create application** -> **Pages**.
3. Select your GitHub repository.
4. Set Build command: `npm run build` and Output directory: `.next`.
5. Add `GEMINI_API_KEY` to Environment Variables.
6. Your app is live at `https://bidforge-ai.pages.dev` with free SSL and unlimited bandwidth!

---

## 🎯 Distribution & First \$500 Roadmap

1. **Before/After Screen Recordings (TikTok, Shorts, Reels):**
   - Screen record a terrible, robotic proposal being rejected vs. BidForge extracting the exact pain point and crafting a killer bid in 5 seconds.
   - Caption: *"Why 90% of Upwork proposals get archived in 3 seconds (and the prompt structure that fixed it)."*
2. **Niche Subreddit Value Drops:**
   - Post on `r/upwork`, `r/freelance`, `r/webdev`: share a breakdown of the 3 discovery questions strategy without hard-selling, linking to the tool for those who want it automated.
3. **Upsell to Pro:**
   - Offer 5 free bids. Once a freelancer lands a client response, prompt them with the \$14/mo Pro Unlimited or \$9 Starter Pack.
