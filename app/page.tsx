import { type Tweet as TweetType, getTweet } from 'react-tweet/api';
import Ratio from './(components)/Ratio';
import TweetCard from './(components)/TweetCard';

import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export default async function Home() {
  const tweet: TweetType | undefined = await getTweet('1690136127095934978', {
    next: {
      revalidate: 1,
    },
  }).catch((e) => {
    console.log(e);
    return undefined;
  });

  if (!tweet) return <div>Failed to load tweet</div>;

  if (!tweet.quoted_tweet) return <div>Tweet has no quoted tweet</div>;

  const quotedTweet: TweetType | undefined = await getTweet(
    tweet.quoted_tweet.id_str,
    {
      next: {
        revalidate: 1,
      },
    }
  ).catch((e) => {
    console.log(e);
    return undefined;
  });

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
