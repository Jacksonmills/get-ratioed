import React from 'react';

export default function useWindow() {
  const isClient = typeof window === 'object';

  const [windowWidth, setWindowWidth] = React.useState(
    isClient ? window.innerWidth : 0
  );

  const [isMobile, setIsMobile] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    if (!isClient) return;

    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isClient]);

  return { isMobile, windowWidth };
}
