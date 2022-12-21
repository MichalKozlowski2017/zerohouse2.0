import React from 'react';
import { getUrlFromId } from '@lib/sanity';

const SliderVideo = ({ video }) => {
  return (
    <div className=" h-[100vh] relative">
      <video
        width="100%"
        height="100vh"
        muted
        autoPlay
        loop
        className="absolute top-0 left-0 block w-full h-full object-cover"
      >
        <source src={getUrlFromId(video.asset._ref)} type="video/mp4" />
      </video>
    </div>
  );
};

export default SliderVideo;
