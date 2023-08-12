import { Tweet } from 'react-tweet';
import { type Tweet as TweetType, getTweet } from 'react-tweet/api';
import Ratio from './(components)/Ratio';

interface TweetResponse extends TweetType {}

export default async function Home() {
  const tweet: TweetResponse | undefined = await getTweet('1690136127095934978').catch(() => undefined)
  
  if (!tweet || !tweet.quoted_tweet) return <div>Failed to load tweet</div>

  const quotedTweet: TweetResponse | undefined = await getTweet(tweet.quoted_tweet.id_str).catch(() => undefined)

  if (!quotedTweet) return <div>Failed to load quoted tweet</div>

  const calculateRatio = (tweetLikeCount: number, quotedLikeCount: number) => {
    const ratio = (tweetLikeCount / quotedLikeCount) * 100
    const roundedRatio = Math.round(ratio * 100) / 100
    return roundedRatio
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <div className='flex w-full'>
        <h1 className='font-black text-4xl'>GET RATIOED</h1>
      </div>
      <div className='flex gap-2'>
        <div>
          <div>
            {tweet.user.name} - {tweet.favorite_count} likes
          </div>
          <Tweet id={tweet.id_str} />
        </div>
        <div>
          {quotedTweet.user.name} has been ratioed by <Ratio ratio={calculateRatio(tweet.favorite_count, quotedTweet.favorite_count)} /> by {tweet.user.name}
        </div>
        <div>
          <div>
            {quotedTweet.user.name} - {quotedTweet.favorite_count} likes
          </div>
          <Tweet id={quotedTweet.id_str} />
        </div>
      </div>
    </main>
  )
}
