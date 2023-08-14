import { type Tweet as TweetType, getTweet } from 'react-tweet/api';
import Ratio from '../(components)/Ratio';
import TweetCard from '../(components)/TweetCard';

export default async function QuotedPage() {
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
          <div className="font-bold text-4xl">VS.</div>
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
