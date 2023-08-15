'use client';

import { SyntheticEvent, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useRouter } from 'next/navigation';

export function MakeYourOwnRatio() {
  const router = useRouter();

  const [tweetUrl, setTweetUrl] = useState('');
  const [opposingTweetUrl, setOpposingTweetUrl] = useState('');

  const handleMakeYourOwnRatio = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (opposingTweetUrl) {
      const nextRoute = router.push(`/ratio/${tweetUrl}-${opposingTweetUrl}`);
      setTweetUrl('');
      setOpposingTweetUrl('');
      return nextRoute;
    }

    const nextRoute = router.push(`/ratio/${tweetUrl}`);
    setTweetUrl('');
    setOpposingTweetUrl('');
    return nextRoute;
  };

  useEffect(() => {
    console.log({
      tweetUrl,
      opposingTweetUrl,
    });
  }, [tweetUrl, opposingTweetUrl]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-white hover:bg-slate-200">Generate</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
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
              <Button type="submit" className="bg-white hover:bg-slate-200">
                Get Ratioed!
              </Button>
            </div>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
