import ErrorText from '@/app/(components)/ErrorText';
import TweetRatio from '@/app/(components)/TweetRatio';
import { calculateWinner } from '@/lib/utils';
import { Tweet, getTweet } from 'react-tweet/api';

export default async function Page({ params }: { params: { slug: string } }) {
  const tweetId = params.slug.split('-')[0];
  const opposingTweetId = params.slug.split('-')[1];

  const tweet: Tweet | undefined = await getTweet(tweetId, {
    next: {
      revalidate: 1,
    },
  }).catch((e) => {
    console.log(e);
    return undefined;
  });

  if (!tweet) return <ErrorText>Failed to load tweet</ErrorText>;

  if (!opposingTweetId) {
    if (!tweet.quoted_tweet) {
      return <ErrorText>Tweet has no quoted tweet</ErrorText>;
    }

    const opposingTweet = await getTweet(tweet.quoted_tweet.id_str, {
      next: {
        revalidate: 1,
      },
    }).catch((e) => {
      console.log(e);
      return undefined;
    });

    if (!opposingTweet)
      return <ErrorText>Failed to load quoted tweet</ErrorText>;

    const isTweetWinner = calculateWinner(
      tweet.favorite_count,
      opposingTweet.favorite_count
    );

    return (
      <TweetRatio
        tweet={tweet}
        opposingTweet={opposingTweet}
        isTweetWinner={isTweetWinner}
      />
    );
  }

  const opposingTweet: Tweet | undefined = await getTweet(opposingTweetId, {
    next: {
      revalidate: 1,
    },
  }).catch((e) => {
    console.log(e);
    return undefined;
  });

  if (!opposingTweet) return <ErrorText>Failed to load reply tweet</ErrorText>;

  const isTweetWinner = calculateWinner(
    tweet.favorite_count,
    opposingTweet.favorite_count
  );

  return (
    <TweetRatio
      tweet={tweet}
      opposingTweet={opposingTweet}
      isTweetWinner={isTweetWinner}
    />
  );
}
