import type { Metadata } from 'next';
import { Nunito, DM_Serif_Display } from 'next/font/google';
import '@/styles/globals.css';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-body',
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: 'PeeKeeper - Escape-Proof Pet Care Solutions',
  description: 'Discover premium pet care products, dog diapers, and pet hygiene solutions.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${nunito.variable} ${dmSerifDisplay.variable} min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
