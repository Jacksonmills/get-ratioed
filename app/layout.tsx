import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from './(components)/ThemeProvider';
import { Analytics } from '@vercel/analytics/react';
import Link from 'next/link';
import { Button } from './(components)/ui/button';
import { Bug, Github, Twitter } from 'lucide-react';
import { ThemeToggle } from './(components)/ThemeToggle';
import { NavMenu } from './(components)/NavMenu';
import Logo from './(components)/Logo';
import { MakeYourOwnRatio } from './(components)/MakeYourOwnRatio';
import { Toaster } from 'react-hot-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './(components)/ui/tooltip';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ratioed!',
  description:
    '"Ratioed!" A Visualizer for Twitter Ratio\'s. Notably the recent xQc vs. H3H3 drama.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    images: [{ url: '/og.png' }],
  },
  twitter: {
    card: 'summary',
    title: 'Ratioed!',
    description:
      '"Ratioed!" A Visualizer for Twitter Ratio\'s. Notably the recent xQc vs. H3H3 drama.',
    images: [{ url: 'https://www.get-ratioed.com/og.png' }],
    creator: '@Jacksonmills',
  },
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
          <div className="relative overflow-x-hidden flex min-h-screen flex-col items-center p-6 md:p-12 gap-6 md:gap-12 lg:gap-18">
            <header className="flex w-full gap-4 items-center">
              <div className="mr-auto">
                <Link href="/">
                  <Logo />
                </Link>
              </div>

              <MakeYourOwnRatio />
              <NavMenu />
            </header>
            <main className="flex min-h-[80vh] flex-col items-center gap-6 md:gap-12 lg:gap-18">
              {children}
            </main>
            <footer className="flex w-full gap-4 items-center justify-center">
              <Link href="https://twitter.com/getratioedapp" target="_blank">
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Twitter className="h-[1.2rem] w-[1.2rem]" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Follow on Twitter</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Link>
              <Link href="https://github.com/Jacksonmills" target="_blank">
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Github className="h-[1.2rem] w-[1.2rem]" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Follow on GitHub</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Link>
              <Link href="https://twitter.com/Jacksonmills" target="_blank">
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Bug className="h-[1.2rem] w-[1.2rem]" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Report a bug</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Link>
              <ThemeToggle />
            </footer>
          </div>
          <Analytics />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
