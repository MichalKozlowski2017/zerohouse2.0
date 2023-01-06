import React from 'react';
import ReactPannellum from 'react-pannellum';
import { Block } from '@typings/block';
import Image from 'next/image';
import { urlFor } from '@lib/sanity';
import { PortableText } from '@portabletext/react';

const Panorama = (block: Block) => {
  console.log(block);
  const config = {
    autoRotate: -2,
    autoLoad: true,
    crossOrigin: 'use-credentials',
  };
  return (
    <section className="relative overflow-hidden bg-[#F8F8F8] pb-[75px]">
      <div className="mx-auto w-full xl:w-[80%]">
        <div className="relative h-[37vw] w-full">
          <ReactPannellum
            id="1"
            sceneId="firstScene"
            imageSource={urlFor(block.image).url()}
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
            }}
            config={config}
          />
        </div>
      </div>
    </section>
  );
};

export default Panorama;
