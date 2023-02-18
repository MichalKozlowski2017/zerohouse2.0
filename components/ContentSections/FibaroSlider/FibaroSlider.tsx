import React, { useRef, useState } from 'react';
import { Block } from '@typings/block';
import { v4 as uuidv4 } from 'uuid';
import { urlFor } from '@lib/sanity';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { type Swiper as SwiperRef } from 'swiper';
import SwiperCore, { EffectFade, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import Arrows from '@components/Arrows/Arrows';
import { motion } from 'framer-motion';

const FibaroSlider = (block: Block) => {
  const [mySwiper, setMySwiper] = useState({});
  SwiperCore.use([Autoplay]);
  const swiperRef = useRef<SwiperRef>();

  const animations = {
    container: {
      show: {
        scaleX: 1,
        opacity: 1,
        transition: {
          default: { duration: 0.6 },
          ease: 'circOut',
        },
      },
      hidden: {
        scaleX: 1.2,
        opacity: 0,
      },
    },
    image: {
      show: {
        opacity: 1,
        x: '0',
        transition: {
          default: { duration: 0.3 },
          ease: 'circOut',
        },
      },
      hidden: {
        opacity: 0,
        x: '5%',
      },
    },
    text: {
      show: {
        opacity: 1,
        x: '0',
        transition: {
          default: { duration: 0.6 },
          ease: 'circOut',
        },
      },
      hidden: {
        opacity: 0,
        x: '-5%',
      },
    },
  };

  const myPortableTextComponents = {
    block: {
      h3: ({ children }) => (
        <h3 className="pb-[30px] text-[26px] text-[#2c2c2c] md:text-[25px] xl:pr-[200px] xl3:text-[34px]">
          {children}
        </h3>
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
  return (
    <section className="relative overflow-hidden bg-[#F8F8F8] py-[75px]">
      <motion.div
        className="mx-auto w-full xl:w-[80%]"
        variants={animations.container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <div className="flex w-full justify-center bg-white py-[20px] md:hidden md:w-1/2">
          <Image
            src={urlFor(block.image).url()}
            alt={block.image.alt}
            width={138}
            height={45}
            style={{ objectFit: 'cover' }}
          />
        </div>

        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setMySwiper(swiper);
          }}
          modules={[EffectFade]}
          effect="fade"
          autoHeight={true}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          // autoplay={{
          //   delay: 5000,
          //   disableOnInteraction: false,
          // }}
        >
          {block.content?.map(({ content, image }: Block) => (
            <SwiperSlide
              key={uuidv4()}
              className="flex flex-col-reverse bg-white md:flex-row md:items-stretch"
            >
              <motion.div
                className="px-[40px] py-[40px]
                md:w-[50%] md:px-[6vw]
                xl:w-[50%] xl:px-[40px]
              "
                variants={animations.text}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <div className="relative hidden  py-[20px] md:block md:w-1/2">
                  <Image
                    src={urlFor(block.image).url()}
                    alt={block.image.alt}
                    width={138}
                    height={45}
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 768px,
              (max-width: 1200px) 1000px,
              1600px"
                  />
                </div>
                <div className="mb-[40px] xl:hidden">
                  <Arrows swiper={mySwiper} />
                </div>
                <PortableText
                  value={content}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  components={myPortableTextComponents}
                />
              </motion.div>

              <motion.div
                className="relative h-[50vw] w-full
                md:h-auto md:w-[50%]
              "
                variants={animations.image}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <Image
                  src={urlFor(image).url()}
                  alt={image.alt}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </motion.div>
            </SwiperSlide>
          ))}
          <div className="absolute left-[37%] bottom-[34px] z-10 mb-[40px] hidden -translate-x-1/2 xl:block">
            <Arrows swiper={mySwiper} />
          </div>
        </Swiper>
      </motion.div>
    </section>
  );
};

export default FibaroSlider;
