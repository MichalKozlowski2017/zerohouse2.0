import React, { useState } from 'react';
import { Block } from '@typings/block';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@lib/sanity';
import { PortableText } from '@portabletext/react';
import { motion } from 'framer-motion';

const SectionSimple = (block: Block) => {
  const [ratio, setRatio] = useState(16 / 9); // default to 16:9

  const animations = {
    text: {
      show: {
        opacity: 1,
        scale: 1,
        x: '0',
        transition: {
          default: { duration: 0.7 },
          ease: 'circIn',
        },
      },
      hidden: {
        opacity: 0,
        scale: 0.9,
        x: '5%',
      },
    },
    image: {
      show: {
        opacity: 1,
        scale: 1,
        x: '0',
        transition: {
          default: { duration: 0.7 },
          ease: 'circIn',
        },
      },
      hidden: {
        opacity: 0,
        scale: 0.9,
        x: '-5%',
      },
    },
  };

  const myPortableTextComponents = {
    block: {
      h3: ({ children }) => (
        <h3 className="pb-[30px] text-[26px] text-[#2c2c2c] md:text-[25px] xl3:text-[34px]">
          {children}
        </h3>
      ),
      h4: ({ children }) => <h4 className="">{children}</h4>,
      h5: ({ children }) => (
        <h5 className="mb-[30px] lg:mb-[130px]">{children}</h5>
      ),
      p: ({ children }) => (
        <p className="pb-[20px] text-[18px] leading-loose text-[#2c2c2c] md:text-[16px] xl3:text-[21px]">
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
        className="relative flex flex-col-reverse bg-[#F8F8F8]
      py-[75px] md:flex-row
      "
      >
        <motion.div
          className="relative h-auto w-full md:w-[40%]"
          variants={animations.image}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
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
        </motion.div>
        <motion.div
          className="px-[40px] py-[40px]
          md:w-[60%] md:px-[8vw]
          xl:w-[70%] xl:px-[12vw]
        "
          variants={animations.text}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <PortableText
            value={block.content}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            components={myPortableTextComponents}
          />
        </motion.div>
      </section>
    );
  } else {
    return (
      <section
        className="relative flex flex-col-reverse bg-[#F8F8F8]
      md:flex-row md:py-[75px]
      "
      >
        <motion.div
          className="relative z-10 h-auto w-full md:w-[40%]"
          variants={animations.image}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <Image
            src={urlFor(block.image).url()}
            alt={block.image.alt}
            width={1024}
            height={1024 / ratio}
            style={{
              objectFit: 'contain',
              maxHeight: '960px',
              objectPosition: 'left top',
              width: 'auto',
              height: 'auto',
            }}
            onLoadingComplete={({ naturalWidth, naturalHeight }) =>
              setRatio(naturalWidth / naturalHeight)
            }
            className="absolute hidden md:block"
          />
        </motion.div>
        <motion.div
          className="px-[40px] py-[40px]
          md:w-[60%] md:px-[8vw]
          xl:w-[70%] xl:px-[12vw]
          
        "
          variants={animations.text}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <PortableText
            value={block.content}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            components={myPortableTextComponents}
          />
        </motion.div>
      </section>
    );
  }
};

export default SectionSimple;
