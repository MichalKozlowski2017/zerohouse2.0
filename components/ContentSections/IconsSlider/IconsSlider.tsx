import { Block } from '@typings/block';
import { v4 as uuidv4 } from 'uuid';
import { urlFor } from '@lib/sanity';
import { PortableText } from '@portabletext/react';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { type Swiper as SwiperRef } from 'swiper';
import SwiperCore, { EffectFade, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import Arrows from '@components/Arrows/Arrows';

const IconsSlider = (block: Block) => {
  const [mySwiper, setMySwiper] = useState({});
  SwiperCore.use([Autoplay]);
  const swiperRef = useRef<SwiperRef>();
  const myPortableTextComponents = {
    block: {
      h3: ({ children }) => (
        <h3 className="text-[#2c2c2c] text-[26px] pb-[30px] md:text-[25px] xl:text-[34px]">
          {children}
        </h3>
      ),
      p: ({ children }) => (
        <p className="text-[#2c2c2c] text-[18px] pb-[20px] md:text-[16px] xl:text-[21px] leading-loose">
          {children}
        </p>
      ),
    },
  };
  return (
    <section className="md:flex justify-end pb-[75px] relative overflow-hidden bg-[#F8F8F8] items-stretch">
      <div
        className="iconsSlider-pagination relative bg-white flex px-[40px] py-[80px] justify-around 
        md:w-[40%] md:px-[5px]
        xl:w-[25%] xl:items-center
        xl3:items-end
      "
      >
        {block.content?.map(({ image }: Block, index) => (
          <div
            key={uuidv4()}
            onClick={() => swiperRef.current?.slideTo(index)}
            className={`w-[30px] h-[40px] relative transition-transform
              xs:w-[40px] xs:h-[50px]
              md:w-[30px] md:h-[40px]
              ${index == 0 && 'iconsSlider-active'}
            `}
          >
            <Image
              src={urlFor(image).url()}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 40px,
              (max-width: 1200px) 40px,
              40px"
              style={{ objectFit: 'contain' }}
            />
          </div>
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
          modules={[EffectFade]}
          effect="fade"
          autoHeight={true}
          spaceBetween={0}
          slidesPerView={1}
          // autoplay={{
          //   delay: 5000,
          //   disableOnInteraction: false,
          // }}
          onInit={() => {
            document
              .querySelectorAll('.iconsSlider-pagination div')[0]
              .classList.add('iconsSlider-active');
          }}
          onSlideChange={() => {
            document
              .querySelectorAll('.iconsSlider-pagination div')
              .forEach((el) => {
                el.classList.remove('iconsSlider-active');
              });
            swiperRef.current?.activeIndex != undefined &&
              document
                .querySelectorAll('.iconsSlider-pagination div')
                [swiperRef.current?.activeIndex].classList.add(
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
    </section>
  );
};

export default IconsSlider;
