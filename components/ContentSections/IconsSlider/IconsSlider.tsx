import { Block } from '@typings/block';
import { v4 as uuidv4 } from 'uuid';
import { urlFor } from '@lib/sanity';
import { PortableText } from '@portabletext/react';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { type Swiper as SwiperRef } from 'swiper';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import Arrows from '@components/Arrows/Arrows';
import { motion } from 'framer-motion';

const IconsSlider = (block: Block) => {
  const [mySwiper, setMySwiper] = useState({});
  SwiperCore.use([Autoplay]);
  const swiperRef = useRef<SwiperRef>();

  const animations = {
    container: {
      show: {
        opacity: 1,
        x: '0',
        transition: {
          staggerChildren: 0.2,
          delayChildren: 0.8,
          default: { duration: 1 },
          ease: 'inOut',
        },
      },
      hidden: {
        opacity: 0,
        x: '20%',
      },
    },

    icons: {
      show: {
        opacity: 1,
      },
      hidden: {
        opacity: 0,
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
      p: ({ children }) => (
        <p className="pb-[20px] text-[18px] leading-loose text-[#2c2c2c] md:text-[16px] xl3:text-[21px]">
          {children}
        </p>
      ),
    },
  };
  return (
    <motion.section
      className="relative items-stretch justify-end overflow-hidden bg-[#F8F8F8] pb-[75px] md:flex"
      variants={animations.container}
      initial="hidden"
      whileInView="show"
    >
      <div
        className="iconsSlider-pagination relative flex justify-around bg-white px-[40px] py-[80px] 
        md:w-[40%] md:px-[5px]
        xl:w-[25%] xl:items-end
        xl3:items-end
      "
      >
        {block.content?.map(({ image }: Block, index) => (
          <motion.button
            variants={animations.icons}
            key={uuidv4()}
            data-id={index}
            onClick={(event) => {
              if (!(event.target instanceof HTMLButtonElement)) return;
              swiperRef.current?.slideToLoop(Number(event.target.dataset.id));
            }}
            className={`relative h-[40px] w-[30px] transition-transform
              xs:h-[50px] xs:w-[40px]
              md:h-[40px] md:w-[30px]
              ${index == 0 && 'iconsSlider-active'}
            `}
          >
            <Image
              src={urlFor(image).url()}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 200px,
              (max-width: 1200px) 200px,
              200px"
              style={{ objectFit: 'contain', pointerEvents: 'none' }}
            />
          </motion.button>
        ))}
      </div>
      <div
        className="bg-white px-[40px] py-[40px]
          md:w-[60%] md:px-[8vw]
          xl:w-[65%] xl:px-[12vw] xl:py-[90px]
        "
      >
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setMySwiper(swiper);
          }}
          // modules={[EffectFade]}
          // effect="fade"
          loop={true}
          autoHeight={true}
          spaceBetween={0}
          slidesPerView={1}
          // autoplay={{
          //   delay: 1000,
          //   disableOnInteraction: false,
          // }}
          onInit={() => {
            document
              .querySelectorAll('.iconsSlider-pagination button')[0]
              .classList.add('iconsSlider-active');
          }}
          onSlideChange={() => {
            document
              .querySelectorAll('.iconsSlider-pagination button')
              .forEach((el) => {
                el.classList.remove('iconsSlider-active');
              });
            swiperRef.current?.realIndex != undefined &&
              document
                .querySelectorAll('.iconsSlider-pagination button')
                [swiperRef.current?.realIndex].classList.add(
                  'iconsSlider-active'
                );
          }}
        >
          {block.content?.map(({ content }) => (
            <SwiperSlide key={uuidv4()} className="bg-white">
              <PortableText
                value={content}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                components={myPortableTextComponents}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Arrows swiper={mySwiper} />
      </div>
    </motion.section>
  );
};

export default IconsSlider;
