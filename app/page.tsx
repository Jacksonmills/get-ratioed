import { type Tweet as TweetType, getTweet } from 'react-tweet/api';
import Ratio from './(components)/Ratio';
import TweetCard from './(components)/TweetCard';

import { Space_Grotesk } from 'next/font/google';
import { getBaseUrl } from '@/lib/utils';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export default async function Home() {
  const tweetResponse = await fetch(`${getBaseUrl()}/1690136127095934978`);
  const { data: tweet } = await tweetResponse.json();

  let quotedTweetData = null;
  if (tweet && tweet.quoted_tweet) {
    const quotedTweetResponse = await fetch(
      `${getBaseUrl()}/${tweet.quoted_tweet.id_str}`
    );
    quotedTweetData = await quotedTweetResponse.json();
  }
  const { data: quotedTweet } = quotedTweetData;

  if (!quotedTweet) return <div>Failed to load quoted tweet</div>;

  const isTweetWinner = calculateWinner(
    tweet.favorite_count,
    quotedTweet.favorite_count
  );

  function calculateWinner(
    tweetLikeCount: number,
    quotedLikeCount: number
  ): boolean {
    return tweetLikeCount > quotedLikeCount;
  }

  return (
    <>
      <div className="flex w-full items-center justify-center gap-4 md:max-w-[828px]">
        <Ratio
          likesA={tweet.favorite_count}
          likesB={quotedTweet.favorite_count}
        />
      </div>

      <div className="flex flex-col w-full gap-2 md:gap-12 items-center justify-center lg:flex-row">
        <TweetCard tweet={tweet} isWinner={isTweetWinner} />
        <div className="md:bg-card py-2 px-4 rounded-lg md:border border-border">
          <div className={`font-bold text-4xl ${spaceGrotesk.className}`}>
            VS.
          </div>
        </div>
        <TweetCard
          tweet={quotedTweet}
          isWinner={!isTweetWinner}
          isOpposing={true}
        />
      </div>
    </>
  );
}
