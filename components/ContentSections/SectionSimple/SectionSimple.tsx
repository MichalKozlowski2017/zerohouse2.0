import React, { useState } from 'react';
import { Block } from '@typings/block';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@lib/sanity';
import { PortableText } from '@portabletext/react';

const SectionSimple = (block: Block) => {
  const [ratio, setRatio] = useState(16 / 9); // default to 16:9

  const myPortableTextComponents = {
    block: {
      h3: ({ children }) => (
        <h3 className="text-[#2c2c2c] text-[26px] pb-[30px] md:text-[25px] xl:text-[34px]">
          {children}
        </h3>
      ),
      h4: ({ children }) => <h4 className="">{children}</h4>,
      h5: ({ children }) => (
        <h5 className="mb-[30px] lg:mb-[130px]">{children}</h5>
      ),
      p: ({ children }) => (
        <p className="text-[#2c2c2c] text-[18px] pb-[20px] md:text-[16px] xl:text-[21px] leading-loose">
          {children}
        </p>
      ),
      cta: ({ children }) => (
        <div className="inline-block relative my-6 text-center px-[40px] py-[15px] font-bold text-[#000] border-2 border-[#000] cursor-pointer transition hover:text-white hover:bg-[#000]">
          {children}
        </div>
      ),
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
  if (block.imageSize == 'smallImage') {
    return (
      <section
        className="flex flex-col-reverse relative bg-[#F8F8F8]
      md:flex-row md:py-[40px]
      xl:pt-[140px]
      "
      >
        <div className="relative h-auto w-full md:w-[40%]">
          <Image
            src={urlFor(block.image).url()}
            alt={block.image.alt}
            width={1024}
            height={1024 / ratio}
            style={{ objectFit: 'contain' }}
            onLoadingComplete={({ naturalWidth, naturalHeight }) =>
              setRatio(naturalWidth / naturalHeight)
            }
            className="lg:block"
          />
        </div>
        <div
          className="px-[40px] py-[40px]
          md:w-[60%] md:px-[8vw]
          xl:w-[70%] xl:px-[12vw]
        "
        >
          <PortableText
            value={block.content}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            components={myPortableTextComponents}
          />
        </div>
      </section>
    );
  } else {
    return (
      <section
        className="flex flex-col-reverse relative bg-[#F8F8F8]
      md:flex-row md:py-[40px]
      xl:pt-[140px]
      "
      >
        <div className="relative h-auto w-full md:w-[40%] z-10">
          <Image
            src={urlFor(block.image).url()}
            alt={block.image.alt}
            width={1024}
            height={1024 / ratio}
            style={{ objectFit: 'contain' }}
            onLoadingComplete={({ naturalWidth, naturalHeight }) =>
              setRatio(naturalWidth / naturalHeight)
            }
            className="hidden md:block absolute"
          />
        </div>
        <div
          className="px-[40px] py-[40px]
          md:w-[60%] md:px-[8vw]
          xl:w-[70%] xl:px-[12vw]
        "
        >
          <PortableText
            value={block.content}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            components={myPortableTextComponents}
          />
        </div>
      </section>
    );
  }
};

export default SectionSimple;
