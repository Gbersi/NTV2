import '../styles/globals.css';
import { CssVarsProvider } from '@mui/joy/styles';
import { OrderProvider } from '../context/OrderContext';
import TopMenu from '../components/TopMenu';
import { Toaster } from 'react-hot-toast';
import Background from '../components/Background';

export const metadata = {
  title: 'Lil Bits',
  description: 'Fine dining restaurant reservation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CssVarsProvider defaultMode="system">
          <OrderProvider>
            <Background />
            <Toaster position="top-center" />
            <TopMenu />
            <main style={{ position: 'relative', zIndex: 2 }}>{children}</main>
          </OrderProvider>
        </CssVarsProvider>
      </body>
    </html>
  );
}
