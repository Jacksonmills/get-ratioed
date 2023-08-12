import { type Tweet as TweetType, getTweet } from 'react-tweet/api';
import Ratio from './(components)/Ratio';
import { ThemeToggle } from './(components)/ThemeToggle';
import TweetCard from './(components)/TweetCard';

interface TweetResponse extends TweetType {}

export default async function Home() {
  // const tweet: TweetResponse | undefined = await getTweet('1690136127095934978').catch(() => undefined)
  const tweet: TweetResponse | undefined = await getTweet('1690369809601683456').catch(() => undefined)
  
  if (!tweet || !tweet.quoted_tweet) return <div>Failed to load tweet</div>

  const quotedTweet: TweetResponse | undefined = await getTweet(tweet.quoted_tweet.id_str).catch(() => undefined)

  if (!quotedTweet) return <div>Failed to load quoted tweet</div>

  const ratio = calculateRatio(tweet.favorite_count, quotedTweet.favorite_count)
  const isTweetWinner = calculateWinner(tweet.favorite_count, quotedTweet.favorite_count)

  function calculateRatio(tweetLikeCount: number, quotedLikeCount: number) {
    const ratio = (tweetLikeCount / quotedLikeCount) * 100
    const roundedRatio = Math.round(ratio * 100) / 100
    return roundedRatio
  }

  function calculateWinner(tweetLikeCount: number, quotedLikeCount: number): boolean {
    return tweetLikeCount > quotedLikeCount
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12 gap-6">
      <div className='flex w-full'>
        <h1 className='font-black text-4xl mr-auto'>GET RATIOED</h1>
        <ThemeToggle />
      </div>
      <div className='flex w-full items-center justify-center gap-4'>
        <Ratio ratio={ratio} />
      </div>
      <div className='flex flex-col w-full gap-6 md:gap-12 items-center justify-center md:flex-row'>
        <TweetCard tweet={tweet} isWinner={isTweetWinner} />
        <div className='font-bold text-4xl'>
          VS
        </div>
        <TweetCard tweet={quotedTweet} isWinner={!isTweetWinner} />
      </div>
    </main>
  )
}
