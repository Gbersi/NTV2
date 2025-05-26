// **no** "use client" here — this is a server component

import Providers from './providers'

export const metadata = {
  title: 'Lil Bits',
  description: 'Order food and drinks randomly!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
