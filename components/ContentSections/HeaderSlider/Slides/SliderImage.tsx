import React from 'react';
import Image from 'next/image';
import { urlFor } from '@lib/sanity';

const SliderImage = ({ image }) => {
  console.log(image);
  return (
    <div className="h-[600px] w-full">
      SliderImage
      <Image
        priority={true}
        src={urlFor(image).url()}
        alt="alt"
        fill
        object-fit="contain"
      />
    </div>
  );
};

export default SliderImage;
