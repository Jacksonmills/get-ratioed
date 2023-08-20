import React from 'react';

export default function useWindow() {
  const isClient = typeof window === 'object';

  const [windowWidth, setWindowWidth] = React.useState(
    isClient ? window.innerWidth : 0
  );

  const [isMobile, setIsMobile] = React.useState<boolean | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (!isClient) {
      setIsLoading(false);
      return;
    }

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    setIsLoading(false);

    return () => window.removeEventListener('resize', handleResize);
  }, [isClient]);

  return { isMobile, windowWidth, isLoading };
}
