'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  const nextTheme = () => {
    if (resolvedTheme === 'dark') {
      return setTheme('light');
    } else if (resolvedTheme === 'light') {
      return setTheme('dark');
    } else {
      return setTheme('system');
    }
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" onClick={nextTheme}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Toggle dark mode</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
