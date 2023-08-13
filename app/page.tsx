import { type Tweet as TweetType, getTweet } from 'react-tweet/api';
import Ratio from './(components)/Ratio';
import { ThemeToggle } from './(components)/ThemeToggle';
import TweetCard from './(components)/TweetCard';
import { Github } from 'lucide-react';
import { Button } from './(components)/ui/button';
import Link from 'next/link';

export default async function Home() {
  const tweet: TweetType | undefined = await getTweet(
    '1690136127095934978'
  ).catch(() => undefined);

  if (!tweet || !tweet.quoted_tweet) return <div>Failed to load tweet</div>;

  const quotedTweet: TweetType | undefined = await getTweet(
    tweet.quoted_tweet.id_str
  ).catch(() => undefined);

  if (!quotedTweet) return <div>Failed to load quoted tweet</div>;

  const ratio = calculateRatio(
    tweet.favorite_count,
    quotedTweet.favorite_count
  );
  const isTweetWinner = calculateWinner(
    tweet.favorite_count,
    quotedTweet.favorite_count
  );

  function calculateRatio(tweetLikeCount: number, quotedLikeCount: number) {
    const ratio = (tweetLikeCount / quotedLikeCount) * 100;
    const roundedRatio = Math.round(ratio * 100) / 100;
    return roundedRatio;
  }

  function calculateWinner(
    tweetLikeCount: number,
    quotedLikeCount: number
  ): boolean {
    return tweetLikeCount > quotedLikeCount;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-12 gap-6">
      <div className="flex w-full gap-6 items-center">
        <h1 className="font-black text-xl md:text-4xl mr-auto">Get Ratioed!</h1>
        <Link href="https://github.com/Jacksonmills" target="_blank">
          <Button variant="outline" size="icon">
            <Github className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </Link>
        <ThemeToggle />
      </div>
      <div className="flex w-full items-center justify-center gap-4">
        <Ratio ratio={ratio} />
      </div>
      <div className="flex flex-col w-full gap-2 md:gap-12 items-center justify-center md:flex-row">
        <TweetCard tweet={tweet} isWinner={isTweetWinner} />
        <div className="dark:bg-slate-900 bg-slate-100 py-2 px-4 rounded-lg">
          <div className="font-bold text-4xl">VS</div>
        </div>
        <TweetCard tweet={quotedTweet} isWinner={!isTweetWinner} />
      </div>
    </main>
  );
}
