import React from 'react';
import Ratio from './Ratio';
import TweetCardSkeleton from './TweetCardSkeleton';

export default function TweetRatioSkeleton() {
  return (
    <>
      <div className="flex w-full items-center justify-center gap-4 sm:max-w-[444px] lg:max-w-[828px]">
        <Ratio likesA={0} likesB={0} />
      </div>

      <div className="flex flex-col w-full gap-2 md:gap-12 lg:items-start items-center justify-center lg:flex-row">
        <TweetCardSkeleton />
        <div className="md:bg-card py-2 px-4 rounded-lg md:border border-border flex justify-self-center self-center">
          <div className="font-bold text-4xl">VS.</div>
        </div>
        <TweetCardSkeleton isOpposing={true} />
      </div>
    </>
  );
}
