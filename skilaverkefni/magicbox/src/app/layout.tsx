// layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Your App Name",
  description: "A magical interactive demo built with Next.js, Tailwind & Framer Motion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
  
    >
      <body>
 
        <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-fg)] antialiased flex flex-col items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}
