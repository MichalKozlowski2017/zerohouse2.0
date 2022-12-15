import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@lib/sanity';
import { PortableText } from '@portabletext/react';

const SliderImage = ({ image, content }) => {
  const myPortableTextComponents = {
    block: {
      h2: ({ children }) => <h2>{children}</h2>,
      h3: ({ children }) => <h3>{children}</h3>,
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
    <div className=" h-[250px] xs:h-[300px] sm:h-[450px] md:h-[550px] lg:h-[760px] xl:h-[860px] xl3:h-[960px] xl4:h-[1120px] relative">
      SliderImage
      <Image
        priority={true}
        src={urlFor(image).url()}
        alt="alt"
        fill
        style={{ objectFit: 'cover' }}
      />
      <div className="absolute">
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <PortableText value={content} components={myPortableTextComponents} />
      </div>
    </div>
  );
};

export default SliderImage;
