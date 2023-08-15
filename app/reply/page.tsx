import { type Tweet as TweetType, getTweet } from 'react-tweet/api';
import TweetRatio from '../(components)/TweetRatio';

export default async function ReplyPage() {
  const tweet: TweetType | undefined = await getTweet('1689516653439057920', {
    next: {
      revalidate: 1,
    },
  }).catch((e) => {
    console.log(e);
    return undefined;
  });

  if (!tweet) return <div>Failed to load tweet</div>;

  const opposingTweet: TweetType | undefined = await getTweet(
    '1689650267221024768',
    {
      next: {
        revalidate: 1,
      },
    }
  ).catch((e) => {
    console.log(e);
    return undefined;
  });

  if (!opposingTweet) return <div>Failed to load opposing tweet</div>;

  const isTweetWinner = calculateWinner(
    tweet.favorite_count,
    opposingTweet.favorite_count
  );

  function calculateWinner(
    tweetLikeCount: number,
    opposingLikeCount: number
  ): boolean {
    return tweetLikeCount > opposingLikeCount;
  }

  return (
    <TweetRatio
      tweet={tweet}
      opposingTweet={opposingTweet}
      isTweetWinner={isTweetWinner}
    />
  );
}
