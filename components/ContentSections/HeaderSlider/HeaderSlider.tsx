import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { type Swiper as SwiperRef } from 'swiper';
// import { Pagination } from 'swiper';
import { EffectFade } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
// import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SliderImage from './Slides/SliderImage';
import SliderVideo from './Slides/SliderVideo';
import type { headerSlide } from '@typings/headerSlide';

const HeaderSlider = ({ content }) => {
  const swiperRef = useRef<SwiperRef>();
  return (
    <div className="w-full relative mt-[-124px]">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[EffectFade]}
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        onInit={() => {
          document
            .querySelectorAll('.slider-pagination div')[0]
            .classList.add('headerSlider-active');
        }}
        onSlideChange={() => {
          document.querySelectorAll('.slider-pagination div').forEach((el) => {
            el.classList.remove('headerSlider-active');
          });
          swiperRef.current?.activeIndex != undefined &&
            document
              .querySelectorAll('.slider-pagination div')
              [swiperRef.current?.activeIndex].classList.add(
                'headerSlider-active'
              );
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
      <div className="slider-pagination h-[2px] absolute bottom-[52px] left-[30px] z-50">
        {content?.map((slide: headerSlide, index: number) => (
          <div
            className="slider-pagination--elem w-[6vw] h-full bg-white relative inline-block mr-[15px] cursor-pointer transition-colors"
            key={slide._key}
            onClick={() => swiperRef.current?.slideTo(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
