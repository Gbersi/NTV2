import './globals.css'; // Import global styles

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Cocktail App - Discover cocktails with ease" />
        <title>Cocktail Explorer</title>
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
