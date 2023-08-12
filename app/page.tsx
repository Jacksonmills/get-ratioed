import { Tweet } from 'react-tweet';
import { type Tweet as TweetType, getTweet } from 'react-tweet/api';

interface TweetResponse extends TweetType {}

export default async function Home() {
  const tweet: TweetResponse | undefined = await getTweet('1690434888204267520').catch(() => undefined)
  
  if (!tweet || !tweet.quoted_tweet) return <div>Failed to load tweet</div>

  const quotedTweet: TweetResponse | undefined = await getTweet(tweet.quoted_tweet.id_str).catch(() => undefined)

  if (!quotedTweet) return <div>Failed to load quoted tweet</div>

  const calculateRatio = (tweetLikeCount: number, qoutedLikeCount: number) => {
    const ratio = (tweetLikeCount / qoutedLikeCount) * 100
    const roundedRatio = Math.round(ratio * 100) / 100
    return roundedRatio
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <RatioBar ratio={calculateRatio(tweet.favorite_count, quotedTweet.favorite_count)} />
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

const Ratio = ({ ratio }: { ratio: number }) => {
  return (
    <div className='text-xl font-bold text-green-500'>
      {ratio}%
    </div>
  )
}

const RatioBar = ({ ratio }: { ratio: number }) => {
  return (
    <div className='bg-green-500 h-2' style={{ width: `${ratio}%` }} />
  )
}
