import React from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { GeistSans } from "geist/font/sans";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <header className="sticky top-0 z-[901] h-16 bg-white">
          <div className="h-full px-6 flex items-center justify-between">
            <Link href="/">
              <span className="text-lg font-semibold">SDG Learning Platform</span>
            </Link>
            <Link href="/search">
              <Search className="w-6 h-6" />
            </Link>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}