import React, { useEffect, useRef, useState } from 'react';
import { Block } from '@typings/block';
import { v4 as uuidv4 } from 'uuid';
import { urlFor } from '@lib/sanity';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { type Swiper as SwiperRef } from 'swiper';
import SwiperCore, { EffectFade, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import Arrows from '@components/Arrows/Arrows';
import { Pakiet } from '@typings/pakiet';
import { motion } from 'framer-motion';

const Packages = (block: Block) => {
  const [mySwiper, setMySwiper] = useState({});
  const [mySwiper2, setMySwiper2] = useState(null);

  const handleSlide = (cur) => {
    document.querySelectorAll('.dot').forEach((el) => {
      el.classList.remove('active');
    });
    document.querySelectorAll('.dot')[cur]?.classList.add('active');
  };

  SwiperCore.use([Autoplay]);
  const swiperRef = useRef<SwiperRef>();
  const swiperRef2 = useRef<SwiperRef>();

  const animations = {
    right: {
      show: {
        opacity: 1,
        scale: 1,
        x: '0',
        transition: {
          default: { duration: 0.6 },
          ease: 'circIn',
        },
      },
      hidden: {
        opacity: 0,
        scale: 0.9,
        x: '5%',
      },
    },
    left: {
      show: {
        opacity: 1,
        scale: 1,
        x: '0',
        transition: {
          default: { duration: 0.6 },
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

  return (
    <section className="relative bg-white md:bg-transparent lg:py-[75px]">
      <h2 className="relative px-[40px] pt-[40px] text-[16px] font-bold uppercase md:hidden">
        NASZE PAKIETY
      </h2>

      <motion.div
        className="relative mt-[-140px] hidden md:absolute md:bottom-[300px] md:z-20 md:block md:w-[50%] lg:bottom-[350px] lg:mt-[40px] xl:bottom-[660px]"
        variants={animations.left}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <Swiper
          onSwiper={(swiper2) => {
            swiperRef2.current = swiper2;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setMySwiper2(swiper2);
          }}
          // modules={[EffectFade]}
          // effect="fade"
          autoHeight={true}
          spaceBetween={0}
          slidesPerView={1}
          speed={800}
          loop={false}
          allowTouchMove={false}
        >
          {block.content.map(({ image }: Pakiet) => (
            <SwiperSlide key={uuidv4()}>
              <div className="relative md:h-[350px] lg:h-[600px]">
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
      </motion.div>
      <motion.div
        className="packages-slider relative overflow-visible bg-white md:ml-auto md:mt-[140px] md:w-[75%] lg:mt-[220px] xl:mb-[250px]"
        variants={animations.right}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <div className="px-[40px] pt-[40px] md:hidden">
          <Arrows swiper={mySwiper} />
        </div>

        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setMySwiper(swiper);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            document.querySelector('.dot').classList.add('active');
          }}
          modules={[EffectFade]}
          effect="fade"
          autoHeight={true}
          spaceBetween={0}
          slidesPerView={1}
          speed={800}
          loop={true}
          allowTouchMove={true}
          onSlideChange={() => {
            mySwiper2 &&
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              mySwiper2.slideTo(swiperRef.current?.realIndex);

            handleSlide(swiperRef.current?.realIndex);
          }}
          className="flex items-end"
        >
          {block.content?.map((slide: Pakiet) => (
            <SwiperSlide key={uuidv4()}>
              <div className="grid grid-cols-1 items-end bg-white px-[40px] pt-[40px] md:min-h-[553px] md:grid-cols-2  md:pt-0 lg:min-h-[773px] xl:px-[13vw] xl3:px-[250px]">
                <div className="md:my-[60px] xl:pr-[70px]">
                  {/* header */}
                  <h3 className="text-[25px] xl2:text-[30px]">{slide.name}</h3>
                  {slide.cena > 0 && (
                    <h5 className="text-[21px] md:text-[18px]">
                      Cena już od:{' '}
                      <b className="text-[28px] font-bold md:text-[23px]">
                        {slide.cena.toLocaleString('pl-PL')} zł
                      </b>
                    </h5>
                  )}
                  <Link href="/kontakt">
                    <button className="relative my-6 inline-block max-w-[200px] cursor-pointer whitespace-nowrap border-2 border-[#000] px-[40px] py-[15px] text-center text-[13px] font-bold text-[#000] transition hover:bg-[#000] hover:text-white md:mb-0">
                      Zapytaj o szczegóły
                    </button>
                  </Link>
                </div>
                {/* tabela */}
                <div className="md:my-[100px] md:mr-auto">
                  <ul>
                    {slide.features?.map((feature) => (
                      <li
                        className="border-b border-black py-[15px] last:border-0 lg:py-[23px] lg:text-[21px]"
                        key={uuidv4()}
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="left-1/2 bottom-[50px] z-10 hidden md:absolute md:block">
            <Arrows swiper={mySwiper} />
          </div>
        </Swiper>
        <h2 className="absolute left-1/2 top-[-60px] z-10 hidden text-[16px] font-bold uppercase md:block">
          NASZE PAKIETY
        </h2>

        <div className="absolute flex w-full justify-center pt-[40px]">
          {block.content?.map(({ image }: Pakiet, index: number) => (
            <div
              key={uuidv4()}
              className={`dot relative mx-[10px] hidden h-[200px] w-[200px] opacity-50 transition-opacity xl:block ${
                index === 0 ? 'active' : ''
              }`}
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                mySwiper.slideTo(index + 1);
              }}
            >
              <Image
                src={urlFor(image).url()}
                alt={image.alt}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Packages;
