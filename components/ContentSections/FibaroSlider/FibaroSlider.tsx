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

const FibaroSlider = (block: Block) => {
  const [mySwiper, setMySwiper] = useState({});
  SwiperCore.use([Autoplay]);
  const swiperRef = useRef<SwiperRef>();
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
    <section className="pb-[75px] relative overflow-hidden bg-[#F8F8F8]">
      <div className="w-full xl:w-[80%] mx-auto">
        <div className="w-full flex justify-center bg-white py-[20px] md:w-1/2 md:hidden">
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
              className="bg-white flex flex-col-reverse md:flex-row md:items-stretch"
            >
              <div
                className="px-[40px] py-[40px]
                md:w-[50%] md:px-[6vw]
                xl:w-[50%] xl:px-[40px]
              "
              >
                <div className="hidden  py-[20px] md:w-1/2 md:block">
                  <Image
                    src={urlFor(block.image).url()}
                    alt={block.image.alt}
                    width={138}
                    height={45}
                    style={{ objectFit: 'cover' }}
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
              </div>

              <div
                className="relative h-[50vw] w-full h-full 
                md:w-[50%] md:h-auto
              "
              >
                <Image
                  src={urlFor(image).url()}
                  alt={image.alt}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </SwiperSlide>
          ))}
          <div className="hidden mb-[40px] xl:block absolute left-[37%] bottom-[34px] -translate-x-1/2 z-10">
            <Arrows swiper={mySwiper} />
          </div>
        </Swiper>
      </div>
    </section>
  );
};

export default FibaroSlider;
