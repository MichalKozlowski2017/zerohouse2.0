import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@lib/sanity';
import { PortableText } from '@portabletext/react';

const SliderImage = ({ image, content }) => {
  const myPortableTextComponents = {
    block: {
      h2: ({ children }) => (
        <h2 className="uppercase text-white font-bold leading-[1.2] text-[2em]">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="uppercase text-white leading-[2.2] text-[1em] ">
          {children}
        </h3>
      ),
      cta: ({ children }) => <div>{children}</div>,
    },

    marks: {
      link: ({ value, children }) => {
        const target = (value?.href || '').startsWith('http')
          ? '_blank'
          : undefined;
        const rel = target === '_blank' ? 'noindex nofollow' : undefined;

        if ((value?.href || '').startsWith('http')) {
          return (
            <span className="cursor-pointer font-bold">
              <a href={value?.href} target={target} rel={rel}>
                <span>{children}</span>
              </a>
            </span>
          );
        } else {
          return (
            <span className="cursor-pointer font-bold">
              <Link href={value?.href} target={target} rel={rel}>
                <span>{children}</span>
              </Link>
            </span>
          );
        }
      },
    },
  };

  return (
    <div className=" h-[100vh] relative">
      <Image
        priority={true}
        src={urlFor(image).url()}
        alt={image.alt}
        fill
        style={{ objectFit: 'cover' }}
      />
      <div
        className="absolute xs:block bottom-[25vh] text-[16px] left-1/2 -translate-x-1/2
        xs:bottom-[25vh] xs:text-[20px]
        sm:bottom-[25vh] sm:text-[24px]
        md:bottom-[25vh] md:text-[25px] md:left-[60%]
        lg:bottom-[25vh] lg:text-[30px] lg:left-2/3
        xl:bottom-[25vh] xl:text-[35px]
        xl3:bottom-[25vh] xl3:text-[40px]
        xl4:bottom-[25vh] xl4:text-[43px]
      
      "
      >
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <PortableText value={content} components={myPortableTextComponents} />
      </div>
    </div>
  );
};

export default SliderImage;
