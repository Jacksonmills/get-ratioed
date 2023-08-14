import React from 'react';

export default function useWindow() {
  const isClient = typeof window === 'object';

  // Initialize windowWidth state safely with a conditional check
  const [windowWidth, setWindowWidth] = React.useState(
    isClient ? window.innerWidth : 0
  );

  const [isMobile, setIsMobile] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    if (!isClient) return; // Early return if not on client side

    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isClient]); // Dependency array is intentionally empty

  return { isMobile, windowWidth };
}
