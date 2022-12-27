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

const AlternativeSlider = (block: Block) => {
  console.log(block);
  const [mySwiper, setMySwiper] = useState({});
  const [mySwiper2, setMySwiper2] = useState(null);
  SwiperCore.use([Autoplay]);
  const swiperRef = useRef<SwiperRef>();
  const swiperRef2 = useRef<SwiperRef>();

  const myPortableTextComponents = {
    block: {
      h3: ({ children }) => (
        <h3 className="text-[#2c2c2c] text-[26px] pb-[30px] md:text-[25px] xl:text-[34px] xl:pr-[200px]">
          {children}
        </h3>
      ),
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
    <section className="relative">
      <div
        className="relative
          md:left-[13vw] md:mt-[-8vw]
          lg:left-[15vw] 
          xl:left-[15vw]
          xl3:left-[230px] xl3:mt-[-150px]
          px-[40px] py-[40px]
          md:w-[70%] md:px-[40px]
          xl:w-[50%] xl:px-[40px] xl:py-[65px]
          bg-white
          z-10
          "
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
      </div>
      <div className="relative w-full alt-slider">
        <div className="relative w-full ml-auto md:w-[60%] md:mt-[-15vw] lg:mt-[-9vw] xl:w-[65%] xl:mt-[-10vw] xl3:mt-[-233px]">
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
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default AlternativeSlider;
