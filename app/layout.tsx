import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from './(components)/ThemeProvider';
import { Analytics } from '@vercel/analytics/react';
import Link from 'next/link';
import { Button } from './(components)/ui/button';
import { Github } from 'lucide-react';
import { ThemeToggle } from './(components)/ThemeToggle';
import { NavMenu } from './(components)/NavMenu';
import Logo from './(components)/Logo';

const inter = Inter({ subsets: ['latin'] });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ratioed!',
  description:
    '"Ratioed!" A Visualizer for Twitter Ratio\'s. Notably the recent xQc vs. H3H3 drama.',
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
          <main className="flex min-h-screen flex-col items-center p-6 md:p-12 gap-6 md:gap-12 lg:gap-18">
            <div className="flex w-full gap-4 items-center">
              <div className="mr-auto">
                <Link href="/">
                  <h1
                    className={`font-black text-xl md:text-4xl ${spaceGrotesk.className}`}
                  >
                    <Logo />
                  </h1>
                </Link>
              </div>

              <NavMenu />

              <Link href="https://github.com/Jacksonmills" target="_blank">
                <Button variant="outline" size="icon">
                  <Github className="h-[1.2rem] w-[1.2rem]" />
                </Button>
              </Link>
              <ThemeToggle />
            </div>
            {children}
          </main>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
