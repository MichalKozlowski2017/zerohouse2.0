import React from 'react';
import { getUrlFromId } from '@lib/sanity';

const SliderVideo = ({ video }) => {
  return (
    <div className=" h-[250px] xs:h-[300px] sm:h-[450px] md:h-[550px] lg:h-[760px] xl:h-[860px] xl3:h-[960px] xl4:h-[1120px] relative bg-black flex items-center ">
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
