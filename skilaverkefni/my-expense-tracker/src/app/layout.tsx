import "./globals.css"
import { ReactNode } from "react";


export const metadata = {
  title: "Expense Tracker Dashboard",
  description: "Expense tracker built with Next.js and Tailwind CSS",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-dashboard text-gray-100">{children}</body>
    </html>
  );
}
