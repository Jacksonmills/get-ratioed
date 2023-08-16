import { Space_Grotesk } from 'next/font/google';
import React from 'react';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export default function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`text-xl font-bold text-secondary ${spaceGrotesk.className}`}
    >
      {children}
    </div>
  );
}
