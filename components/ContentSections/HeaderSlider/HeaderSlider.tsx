import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SliderImage from './Slides/SliderImage';
import SliderVideo from './Slides/SliderVideo';

const HeaderSlider = ({ content }) => {
  // const [swiperInstance, setswiperInstance] = useState(null);
  console.log(content);
  return (
    <div className="w-full min-h-[600px]">
      <Swiper
        // onSwiper={(swiper) => setswiperInstance(swiper)}
        modules={[EffectFade]}
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {content?.map(
          (slide: {
            _type: string;
            _key: React.Key | null | undefined;
            image: object;
            video: object;
          }) => {
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
                    <SliderVideo />
                  </SwiperSlide>
                );
            }
          }
        )}
      </Swiper>
    </div>
  );
};

export default HeaderSlider;
