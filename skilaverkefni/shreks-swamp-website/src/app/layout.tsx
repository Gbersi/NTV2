
import React from "react";
import "./globals.css"; 

type LayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <title>Shrek's Swamp</title>
      </head>
      <body>
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
