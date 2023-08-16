import React from 'react';

export default function LogoSVG() {
  return (
    <div className="md:w-[3.2rem] md:h-[3.2rem] w-[2.6rem] h-[2.6rem]">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 194 194">
        <circle className="fill-secondary" cx="96.56" cy="98" r="94.05" />
        <path
          className="fill-primary"
          d="M141.6,180.56c-45.6,24.88-102.73,8.08-127.61-37.52C-10.88,97.44,5.92,40.31,51.52,15.44"
        />
        <path
          className="fill-primary"
          d="M186.8,124.52c-14.65,49.83-66.93,78.35-116.76,63.7C20.2,173.57-8.31,121.3,6.34,71.46"
        />
        <circle
          className="dark:fill-[#071722] fill-white"
          cx="96.56"
          cy="98"
          r="23.27"
        />
        <circle
          className="fill-none dark:stroke-[#071722] stroke-white"
          strokeMiterlimit="10"
          strokeWidth="7"
          cx="97"
          cy="97"
          r="93.5"
        />
      </svg>
    </div>
  );
}
