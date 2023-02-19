import React, { useRef, useState } from 'react';
import { Block } from '@typings/block';
import { v4 as uuidv4 } from 'uuid';
import { urlFor } from '@lib/sanity';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { type Swiper as SwiperRef } from 'swiper';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import Arrows from '@components/Arrows/Arrows';
import { motion } from 'framer-motion';

const AlternativeSlider = (block: Block) => {
  const [mySwiper, setMySwiper] = useState({});
  const [mySwiper2, setMySwiper2] = useState(null);
  SwiperCore.use([Autoplay]);
  const swiperRef = useRef<SwiperRef>();
  const swiperRef2 = useRef<SwiperRef>();

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
        x: '-5%',
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
        x: '5%',
      },
    },
  };

  const myPortableTextComponents = {
    block: {
      h3: ({ children }) => (
        <h3 className="pb-[30px] text-[26px] text-[#2c2c2c] md:text-[25px] xl:pr-[200px] xl:text-[34px]">
          {children}
        </h3>
      ),
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
    <section className="relative pb-[75px]">
      <motion.div
        className="relative
          z-10 bg-white
          px-[40px] 
          py-[40px]
          md:left-[13vw] md:mt-[-8vw]
          md:w-[70%] md:px-[40px]
          lg:left-[15vw] lg:mt-[-60px]
          xl:left-[15vw]
          xl:w-[50%] xl:px-[40px] xl:py-[65px]
          xl3:left-[230px]
          "
        variants={animations.text}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setMySwiper(swiper);
          }}
          // modules={[EffectFade]}
          // effect="fade"
          autoHeight={true}
          spaceBetween={0}
          slidesPerView={1}
          speed={800}
          loop={true}
          // autoplay={{
          //   delay: 5000,
          //   disableOnInteraction: false,
          // }}
          onSlideChange={() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            mySwiper2 && mySwiper2.slideTo(swiperRef.current?.realIndex);
          }}
        >
          {block.content?.map(({ content }: Block) => (
            <SwiperSlide key={uuidv4()} className="">
              <div>
                <PortableText
                  value={content}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  components={myPortableTextComponents}
                ></PortableText>
              </div>
            </SwiperSlide>
          ))}
          <div className="">
            <Arrows swiper={mySwiper} />
          </div>
        </Swiper>
      </motion.div>
      <motion.div
        className="alt-slider relative w-full"
        variants={animations.image}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <div className="relative ml-auto w-full md:mt-[-15vw] md:w-[60%] lg:mt-[-9vw] xl:mt-[-10vw] xl:w-[65%] xl3:mt-[-5vw]">
          <Swiper
            onSwiper={(swiper2) => {
              swiperRef2.current = swiper2;
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              setMySwiper2(swiper2);
            }}
            autoHeight={true}
            spaceBetween={10}
            slidesPerView={1.2}
            speed={800}
            allowTouchMove={false}
            // modules={[EffectFade]}
            // effect="fade"
          >
            {block.content?.map(({ image }: Block) => (
              <SwiperSlide key={uuidv4()} className="">
                <div className=" h-[300px] sm:h-[400px] xl:h-[450px] xl3:h-[510px]">
                  <Image
                    src={urlFor(image).url()}
                    alt={image.alt}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 768px,
              (max-width: 1200px) 1000px,
              1600px"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.div>
    </section>
  );
};

export default AlternativeSlider;
