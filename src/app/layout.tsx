import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BidForge AI | The High-Converting Freelance Proposal Architect",
  description:
    "Deconstruct client job postings, discover hidden pain points, and generate high-converting Upwork and freelance proposals with killer first-line hooks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen text-slate-100 bg-[#090d16] selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
