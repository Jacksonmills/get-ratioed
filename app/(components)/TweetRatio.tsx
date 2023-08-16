import React from 'react';
import Ratio from './Ratio';
import TweetCard from './TweetCard';
import { Tweet } from 'react-tweet/api';

export default function TweetRatio({
  tweet,
  opposingTweet,
  isTweetWinner,
}: {
  tweet: Tweet;
  opposingTweet: Tweet;
  isTweetWinner: boolean;
}) {
  return (
    <>
      <div className="flex w-full items-center justify-center gap-4 sm:max-w-[444px] lg:max-w-[828px]">
        <Ratio
          likesA={tweet.favorite_count}
          likesB={opposingTweet.favorite_count}
        />
      </div>

      <div className="flex flex-col w-full gap-2 md:gap-12 lg:items-start items-center justify-center lg:flex-row">
        <TweetCard tweet={tweet} isWinner={isTweetWinner} />
        <div className="md:bg-card py-2 px-4 rounded-lg md:border border-border flex justify-self-center self-center">
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
