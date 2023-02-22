import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@lib/sanity';
import { PortableText } from '@portabletext/react';

const SliderImage = ({ image, content }) => {
  const myPortableTextComponents = {
    block: {
      h2: ({ children }) => (
        <h2 className="text-[2em] font-bold	 uppercase leading-[1.2] text-white">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-[1em] uppercase leading-[2.2] text-white ">
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
    <div className=" relative h-[90vw] xl:h-[100vh]">
      <Image
        priority={true}
        src={urlFor(image).url()}
        alt={image.alt}
        fill
        style={{ objectFit: 'cover' }}
      />
      <div
        className="absolute bottom-[25vh] left-1/2 -translate-x-1/2 text-[16px] xs:bottom-[25vh]
        xs:block xs:text-[20px]
        sm:bottom-[25vh] sm:text-[24px]
        md:bottom-[25vh] md:left-[60%] md:text-[25px]
        lg:bottom-[25vh] lg:left-2/3 lg:text-[30px]
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
