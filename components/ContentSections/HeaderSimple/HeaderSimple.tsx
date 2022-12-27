import React, { useState } from 'react';
import type { Block } from '@typings/block';
import Image from 'next/image';
import { urlFor } from '@lib/sanity';
import { PortableText } from '@portabletext/react';

const HeaderSimple = (block: Block) => {
  const [ratio, setRatio] = useState(16 / 9); // default to 16:9
  const myPortableTextComponents = {
    block: {
      h1: ({ children }) => (
        <h1 className="text-[#2c2c2c] text-[0.7em] mb-[0.5em] sm:text-[0.5em] sm:mb-[0.4em] xl2:text-[0.4em]">
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-[#2c2c2c] font-bold text-[1em] leading-tight">
          {children}
        </h2>
      ),
    },
  };
  return (
    <section
      className="flex flex-col-reverse relative bg-[#F8F8F8]
    "
    >
      <div className="relative h-auto flex justify-end pt-[15vw] md:pt-0">
        <Image
          src={urlFor(block.image).url()}
          alt={block.image.alt}
          width={1425}
          height={1425 / ratio}
          style={{ objectFit: 'contain', width: '78%' }}
          onLoadingComplete={({ naturalWidth, naturalHeight }) =>
            setRatio(naturalWidth / naturalHeight)
          }
        ></Image>
        <div
          className="absolute top-[5vw] left-[5vw] text-[21px]
          xs:left-[13vw] xs:text-[24px]
          sm:left-[13vw] sm:text-[31px]
          md:left-[13vw] md:text-[40px]
          lg:left-[15vw] lg:text-[45px]
          xl:left-[15vw] xl:top-[7vw] xl:text-[60px]
          xl3:left-[230px] xl3:top-[130px] xl3:text-[89px]
        "
        >
          <PortableText
            value={block.content}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            components={myPortableTextComponents}
          />
        </div>
      </div>
    </section>
  );
};

export default HeaderSimple;
