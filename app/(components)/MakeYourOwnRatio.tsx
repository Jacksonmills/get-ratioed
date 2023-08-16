'use client';

import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useRouter } from 'next/navigation';

export function MakeYourOwnRatio() {
  const router = useRouter();

  const [tweetUrl, setTweetUrl] = useState('');
  const [opposingTweetUrl, setOpposingTweetUrl] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tweetUrlRef = useRef<HTMLInputElement>(null);

  const handleMakeYourOwnRatio = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (tweetUrl === '' || opposingTweetUrl === '') {
      if (tweetUrlRef.current && tweetUrlRef.current.value === '') {
        return tweetUrlRef.current.focus();
      }
    }

    setIsOpen(false);

    const tweetId = tweetUrl.split('/').pop()?.split('?')[0];
    const opposingTweetId = opposingTweetUrl.split('/').pop()?.split('?')[0];

    if (opposingTweetUrl) {
      const nextRoute = router.push(`/ratio/${tweetId}-${opposingTweetId}`);
      setTweetUrl('');
      setOpposingTweetUrl('');
      return nextRoute;
    }

    const nextRoute = router.push(`/ratio/${tweetId}`);
    setTweetUrl('');
    setOpposingTweetUrl('');
    return nextRoute;
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        e.target !== buttonRef.current
      ) {
        setIsOpen(false);
      }
    };

    const handleESC = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleESC);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleESC);
    };
  }, []);

  return (
    <Popover open={isOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={buttonRef}
          className="dark:bg-white dark:hover:bg-slate-200 bg-black hover:bg-slate-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? 'Close' : 'Generate'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4" ref={popoverRef}>
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Generate</h4>
            <p className="text-sm text-muted-foreground">
              {`Paste in the URL of a quote tweet or provide a tweet with
              it\s reply to generate.`}
            </p>
          </div>
          <form onSubmit={(e) => handleMakeYourOwnRatio(e)}>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="width">Tweet</Label>
                <Input
                  ref={tweetUrlRef}
                  value={tweetUrl}
                  onChange={(e) => setTweetUrl(e.target.value)}
                  id="width"
                  placeholder="https://twitter.com/Jacksonmills/status/1690757261679853568"
                  className="col-span-2 h-8"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="replyTweet">Reply</Label>
                <Input
                  value={opposingTweetUrl}
                  onChange={(e) => setOpposingTweetUrl(e.target.value)}
                  id="replyTweet"
                  placeholder="optional"
                  className="col-span-2 h-8"
                />
              </div>
              <div className="h-2" />
              <Button
                type="submit"
                className="dark:bg-white dark:hover:bg-slate-200 bg-black hover:bg-slate-900"
              >
                Generate Ratio
              </Button>
            </div>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
