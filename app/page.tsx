import { type Tweet as TweetType, getTweet } from 'react-tweet/api';
import TweetRatio from './(components)/TweetRatio';
import { calculateWinner } from '@/lib/utils';

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

  return (
    <TweetRatio
      tweet={tweet}
      opposingTweet={quotedTweet}
      isTweetWinner={isTweetWinner}
    />
  );
}
