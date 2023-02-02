import React, { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { urlFor } from '@lib/sanity';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { type Swiper as SwiperRef } from 'swiper';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import Arrows from '@components/Arrows/Arrows';
import { Offer } from '@typings/offer';
import { motion } from 'framer-motion';

const OffersSlider = ({ offers, type }) => {
  const [mySwiper, setMySwiper] = useState({});
  const [mySwiper2, setMySwiper2] = useState(null);
  SwiperCore.use([Autoplay]);
  const swiperRef = useRef<SwiperRef>();

  const animations = {
    h2: {
      show: {
        opacity: 1,
        y: '0',
        transition: {
          duration: 0.7,
        },
      },
      hidden: {
        opacity: 0,
        y: '20px',
      },
    },
    images: {
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
    text: {
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
    <section className="relative bg-white lg:bg-transparent lg:py-[75px]">
      <motion.h2
        className="absolute hidden px-[40px] text-[16px]  font-bold uppercase lg:block xl3:ml-[10%]"
        variants={animations.h2}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        Aktualna oferta
      </motion.h2>
      <div className="flex w-full  flex-col lg:flex-row">
        {/* slider 1 */}
        <motion.div
          className="slider-1 bg-white lg:mt-[250px] lg:w-[65%] lg:pr-[30%] xl:pr-[33%] xl3:ml-[10%] xl3:mt-[330px] xl3:w-[50%] xl3:pr-[27%]"
          variants={animations.text}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h2 className="relative px-[40px] pt-[40px] text-[16px] font-bold uppercase lg:hidden">
            Aktualna oferta
          </h2>
          <Swiper
            onSwiper={(swiper2) => {
              swiperRef.current = swiper2;
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              setMySwiper2(swiper2);
            }}
            autoHeight={true}
            spaceBetween={0}
            slidesPerView={1}
            speed={800}
            loop={true}
            allowTouchMove={false}
          >
            {offers?.map((offer: Offer) => {
              return (
                (offer.type === type || type === 'all') && (
                  <SwiperSlide key={uuidv4()}>
                    <div className="bg-white px-[40px] pt-[40px]">
                      {offer.offerInfo.estate.length > 0 && (
                        <h3 className="mb-[30px] text-[25px] xl3:text-[34px]">
                          {offer.offerInfo.estate}
                        </h3>
                      )}
                      <p className="max-w-[360px] text-[18px] leading-[38px] xl3:text-[21px]">
                        Standard deweloperski<br></br>
                        {(() => {
                          if (offer.offerInfo.features.bedrooms > 0) {
                            return offer.offerInfo.features.bedrooms === 1 ? (
                              <span>
                                {offer.offerInfo.features.bedrooms} sypialnia
                              </span>
                            ) : (
                              <span>
                                {offer.offerInfo.features.bedrooms} sypialnie
                              </span>
                            );
                          }
                        })()}
                        {(() => {
                          if (offer.offerInfo.features.bathrooms > 0) {
                            return offer.offerInfo.features.bathrooms === 1 ? (
                              <span>
                                , {offer.offerInfo.features.bathrooms} łazienka
                              </span>
                            ) : (
                              <span>
                                , {offer.offerInfo.features.bathrooms} łazienki
                              </span>
                            );
                          }
                        })()}
                        {offer.offerInfo.features.garden > 0 && (
                          <span>
                            {' '}
                            | ogród o powierzchni{' '}
                            {offer.offerInfo.features.garden}m<sup>2</sup>
                          </span>
                        )}
                        {(() => {
                          if (offer.offerInfo.features.parking > 0) {
                            return offer.offerInfo.features.parking === 1 ? (
                              <span>
                                {' '}
                                | {offer.offerInfo.features.parking} miejsce
                                parkingowe
                              </span>
                            ) : (
                              <span>
                                {' '}
                                | {offer.offerInfo.features.parking} miejsca
                                parkingowe
                              </span>
                            );
                          }
                        })()}
                      </p>
                      <Link href={`/oferta-deweloperska/${offer.slug.current}`}>
                        <button className="relative my-6 inline-block max-w-[200px] cursor-pointer whitespace-nowrap border-2 border-[#000] px-[40px] py-[15px] text-center text-[13px] font-bold text-[#000] transition hover:bg-[#000] hover:text-white">
                          Dowiedz się więcej
                        </button>
                      </Link>
                    </div>
                  </SwiperSlide>
                )
              );
            })}
          </Swiper>
        </motion.div>

        {/* slider 2 */}
        <motion.div
          className="slider-2 relative lg:absolute lg:right-0 lg:w-[59.7%] xl:w-[64.7%]"
          variants={animations.images}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <div className="px-[40px] pb-[20px] lg:hidden">
            <Arrows swiper={mySwiper} />
          </div>
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setMySwiper(swiper);
            }}
            autoHeight={true}
            spaceBetween={10}
            slidesPerView={1.2}
            speed={800}
            loop={true}
            onSlideChange={() => {
              mySwiper &&
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                mySwiper2?.slideToLoop(swiperRef.current?.realIndex);
            }}
          >
            {offers?.map(({ image, type }) => {
              return (
                (type === type || type === 'all') && (
                  <SwiperSlide key={uuidv4()} className="">
                    <div className=" h-[300px] sm:h-[400px] xl:h-[450px] xl3:h-[569px]">
                      <Image
                        src={urlFor(image).url()}
                        alt={image.alt}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </SwiperSlide>
                )
              );
            })}
          </Swiper>
          <div className="relative z-10 hidden px-[40px] pb-[20px] lg:mt-[20px] lg:block lg:px-0">
            <Arrows swiper={mySwiper} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OffersSlider;
