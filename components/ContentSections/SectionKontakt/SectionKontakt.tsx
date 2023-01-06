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
        <h3 className="pb-[30px] text-[26px] text-[#2c2c2c] md:text-[25px] xl:text-[34px]">
          {children}
        </h3>
      ),
      h4: ({ children }) => <h4 className="">{children}</h4>,
      h5: ({ children }) => <h5 className="mb-[30px]">{children}</h5>,
      p: ({ children }) => (
        <p className="pb-[20px] text-[18px] leading-loose text-[#2c2c2c] md:text-[16px] xl:text-[21px]">
          {children}
        </p>
      ),
      cta: ({ children }) => (
        <div className="relative my-6 inline-block cursor-pointer border-2 border-[#000] px-[40px] py-[15px] text-center font-bold text-[#000] transition hover:bg-[#000] hover:text-white">
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
            <span className="cursor-pointer pb-[30px] text-[26px] text-[#2c2c2c] md:text-[25px] xl:text-[34px]">
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
        className="relative flex flex-col-reverse bg-[#F8F8F8] pt-[40px]
      md:flex-row md:pb-[40px] md:pt-[120px] 
      xl:pt-[150px]
      "
      >
        <div className="relative z-10 h-auto w-full md:w-[40%]">
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
          className="relative mt-[40px]
          overflow-visible
          bg-white px-[40px]
          py-[40px] md:w-[60%]
          md:px-[8vw]
          md:before:absolute
          md:before:left-[-15vw]
          md:before:h-[calc(100%-40px)]
          md:before:w-[15vw]
          md:before:bg-white

          lg:mt-[90px] xl:mt-[200px] xl:w-[70%] xl:py-[90px] xl:px-[12vw]
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
        className="relative flex flex-col bg-[#F8F8F8]
      md:flex-row md:py-[40px] 
      xl:pt-[140px]
      "
      >
        <div
          className="relative mt-[40px]
          overflow-visible
          bg-white px-[40px]
          py-[40px] md:w-[60%]
          md:px-[8vw]
          md:before:absolute
          md:before:left-[-15vw]
          md:before:h-[calc(100%-40px)]
          md:before:w-[15vw]
          md:before:bg-white

          lg:mt-[90px] xl:mt-[200px] xl:w-[70%] xl:py-[90px] xl:px-[12vw]
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
        <div className="relative z-10 h-auto w-full md:w-[40%]">
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
