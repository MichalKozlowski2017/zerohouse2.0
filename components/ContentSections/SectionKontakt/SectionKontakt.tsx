import React, { useState } from 'react';
import { Block } from '@typings/block';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@lib/sanity';
import { PortableText } from '@portabletext/react';

const SectionKontakt = (block: Block) => {
  const [ratio, setRatio] = useState(16 / 9); // default to 16:9

  const myPortableTextComponents = {
    block: {
      h3: ({ children }) => (
        <h3 className="text-[#2c2c2c] text-[26px] pb-[30px] md:text-[25px] xl:text-[34px]">
          {children}
        </h3>
      ),
      h4: ({ children }) => <h4 className="">{children}</h4>,
      h5: ({ children }) => <h5 className="mb-[30px]">{children}</h5>,
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
            <span className="cursor-pointer text-[#2c2c2c] text-[26px] pb-[30px] md:text-[25px] xl:text-[34px]">
              <Link href={value?.href} target={target} rel={rel}>
                <span>{children}</span>
              </Link>
            </span>
          );
        }
      },
    },
  };
  if (block.imagePosition == 'imgLeft') {
    return (
      <section
        className="flex flex-col-reverse relative bg-[#F8F8F8] pt-[40px]
      md:flex-row md:pb-[40px] md:pt-[120px] 
      xl:pt-[150px]
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
            className="lg:block"
          />
        </div>
        <div
          className="px-[40px] py-[40px]
          xl:py-[90px]
          md:w-[60%] md:px-[8vw]
          xl:w-[70%] xl:px-[12vw]
          bg-white
          mt-[40px]
          lg:mt-[90px]
          xl:mt-[200px]
          overflow-visible
          relative

          md:before:absolute md:before:bg-white md:before:h-[calc(100%-40px)] md:before:w-[15vw] md:before:left-[-15vw]
          xl:before:h-[calc(100%-90px)]
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
        className="flex flex-col relative bg-[#F8F8F8]
      md:flex-row md:py-[40px] 
      xl:pt-[140px]
      "
      >
        <div
          className="px-[40px] py-[40px]
          xl:py-[90px]
          md:w-[60%] md:px-[8vw]
          xl:w-[70%] xl:px-[12vw]
          bg-white
          mt-[40px]
          lg:mt-[90px]
          xl:mt-[200px]
          overflow-visible
          relative

          md:before:absolute md:before:bg-white md:before:h-[calc(100%-40px)] md:before:w-[15vw] md:before:left-[-15vw]
          xl:before:h-[calc(100%-90px)]
        "
        >
          <PortableText
            value={block.content}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            components={myPortableTextComponents}
          />
        </div>
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
            className="lg:block"
          />
        </div>
      </section>
    );
  }
};

export default SectionKontakt;
