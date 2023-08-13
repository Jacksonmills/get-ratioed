import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from './(components)/ThemeProvider';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Get Ratioed!',
  description:
    '"Get Ratioed!" A Visualizer for Twitter Ratio\'s. Notably the recent XqC vs. H3H3 drama.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="flex min-h-screen flex-col items-center p-6 md:p-12 gap-6 md:gap-12">
            {children}
          </main>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
