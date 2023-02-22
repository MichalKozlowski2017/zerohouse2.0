import React, { useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { type Swiper as SwiperRef } from 'swiper';
import { motion } from 'framer-motion';
import SwiperCore, { EffectFade, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import SliderImage from './Slides/SliderImage';
import SliderVideo from './Slides/SliderVideo';
import type { headerSlide } from '@typings/headerSlide';

const HeaderSlider = ({ content }) => {
  SwiperCore.use([Autoplay]);
  const swiperRef = useRef<SwiperRef>();
  return (
    <motion.div
      className="relative mt-[-124px] w-full"
      initial={{
        opacity: 0,
        scale: 1.1,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        opacity: {
          duration: 1,
          ease: 'circOut',
        },
        scale: {
          duration: 2,
          ease: 'circOut',
        },
      }}
    >
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[EffectFade]}
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: content[0].time ? content[0].time : 5000,
          disableOnInteraction: false,
        }}
        onInit={() => {
          content.length > 1 &&
            document
              .querySelectorAll('.slider-pagination div')[0]
              .classList.add('headerSlider-active');
        }}
        onSlideChange={() => {
          const current = swiperRef.current?.activeIndex
            ? swiperRef.current?.activeIndex
            : 0;
          const time = content[current].time ? content[current].time : 5000;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          swiperRef.current.params.autoplay.delay = time;

          if (content.length > 1) {
            document
              .querySelectorAll('.slider-pagination div')
              .forEach((el) => {
                el.classList.remove('headerSlider-active');
              });
            swiperRef.current?.activeIndex != undefined &&
              document
                .querySelectorAll('.slider-pagination div')
                [swiperRef.current?.activeIndex].classList.add(
                  'headerSlider-active'
                );
          }
        }}
      >
        {content?.map((slide: headerSlide) => {
          switch (slide._type) {
            case 'sliderImage':
              return (
                <SwiperSlide key={slide._key}>
                  <SliderImage {...slide} />
                </SwiperSlide>
              );
            case 'sliderVideo':
              return (
                <SwiperSlide key={slide._key}>
                  <SliderVideo {...slide} />
                </SwiperSlide>
              );
          }
        })}
      </Swiper>
      {content.length > 1 && (
        <div className="slider-pagination absolute bottom-[52px] left-[30px] z-10 h-[10px]">
          {content?.map((slide: headerSlide, index: number) => (
            <div
              className="slider-pagination--elem relative mr-[15px] inline-block h-full w-[6vw] cursor-pointer transition-colors"
              key={slide._key}
              onClick={() => swiperRef.current?.slideTo(index)}
            ></div>
          ))}
        </div>
      )}

      <div className=" absolute bottom-[30px] left-1/2 z-10 -translate-x-1/2 flex-col items-center justify-center sm:bottom-[60px] sm:block">
        <div>
          <Image
            src="/assets/images/scroll-icon.svg"
            width={30}
            height={47}
            alt="scroll down"
          />
        </div>

        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
          className="mt-[10px]"
        >
          <Image
            src="/assets/images/scroll-arr.svg"
            width={21}
            height={10}
            alt="scroll down"
            className="mx-auto"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeaderSlider;
