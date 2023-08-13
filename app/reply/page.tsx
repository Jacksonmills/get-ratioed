import { type Tweet as TweetType, getTweet } from 'react-tweet/api';
import Ratio from '../(components)/Ratio';
import TweetCard from '../(components)/TweetCard';

export default async function ReplyPage() {
  const tweet: TweetType | undefined = await getTweet(
    '1689516653439057920'
  ).catch(() => undefined);

  if (!tweet) return <div>Failed to load tweet</div>;

  const opposingTweet: TweetType | undefined = await getTweet(
    '1689650267221024768'
  ).catch(() => undefined);

  if (!opposingTweet) return <div>Failed to load opposing tweet</div>;

  const ratio = calculateRatio(
    tweet.favorite_count,
    opposingTweet.favorite_count
  );
  const isTweetWinner = calculateWinner(
    tweet.favorite_count,
    opposingTweet.favorite_count
  );

  function calculateRatio(tweetLikeCount: number, opposingLikeCount: number) {
    const ratio = (tweetLikeCount / opposingLikeCount) * 100;
    const roundedRatio = Math.round(ratio * 100) / 100;
    return roundedRatio;
  }

  function calculateWinner(
    tweetLikeCount: number,
    opposingLikeCount: number
  ): boolean {
    return tweetLikeCount > opposingLikeCount;
  }

  return (
    <>
      <div className="flex w-full items-center justify-center gap-4 md:max-w-[828px]">
        <Ratio
          ratio={ratio}
          likesA={tweet.favorite_count}
          likesB={opposingTweet.favorite_count}
        />
      </div>

      <div className="flex flex-col w-full gap-2 md:gap-12 items-center justify-center lg:flex-row">
        <TweetCard tweet={tweet} isWinner={isTweetWinner} />
        <div className="md:dark:bg-slate-900 md:bg-slate-100 py-2 px-4 rounded-lg md:border border-slate-300 dark:border-slate-700">
          <div className="font-bold text-4xl">VS.</div>
        </div>
        <TweetCard
          tweet={opposingTweet}
          isWinner={!isTweetWinner}
          isOpposing={true}
        />
      </div>
    </>
  );
}
