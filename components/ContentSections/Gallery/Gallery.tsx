import { Block } from '@typings/block';
import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { urlFor } from '@lib/sanity';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { type Swiper as SwiperRef } from 'swiper';
import Arrows from '@components/Arrows/Arrows';
import { motion, AnimatePresence } from 'framer-motion';
import { SlClose } from 'react-icons/sl';

const Gallery = (block: Block) => {
  const [mySwiper, setMySwiper] = useState({});
  const swiperRef = useRef<SwiperRef>();
  const [sliderShow, setSliderShow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [startSlide, setStartSlide] = useState(1);

  const handleSliderShow = (index: number) => {
    setStartSlide(index);
    setSliderShow(!sliderShow);
  };

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
  });

  const animations = {
    right: {
      show: {
        opacity: 1,
        scale: 1,
        x: '0',
        transition: {
          default: { duration: 0.6 },
          ease: 'circOut',
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
          ease: 'circOut',
        },
      },
      hidden: {
        opacity: 0,
        scale: 0.9,
        x: '-5%',
      },
    },
    miniatures: {
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2,
          default: { duration: 0.3 },
          ease: 'circOut',
        },
      },
      hidden: {
        opacity: 0,
      },
    },
    miniature: {
      show: {
        scale: 1,
        opacity: 1,
        transition: {
          default: { duration: 0.15 },
          ease: 'circOut',
        },
      },
      hidden: {
        opacity: 0,
        scale: 0.8,
      },
    },
  };
  return (
    <section className="gallery py-[40px] md:py-[70px]">
      <motion.div
        className="relative bg-white p-[40px] md:ml-auto md:w-[calc(50%-5px)] md:pl-[120px] md:before:absolute md:before:bottom-[-80px] md:before:left-0 md:before:h-[80px] md:before:w-full md:before:bg-white xl:w-[calc(50%-10px)] xl:pl-[calc(1220px/6)]"
        variants={animations.right}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h3 className="pb-[30px] text-[26px] text-[#2c2c2c] md:text-[25px] xl:text-[34px]">
          Galeria
        </h3>
        <p className="pb-[20px] text-[18px] leading-loose text-[#2c2c2c] md:text-[16px] xl:text-[21px]">
          Zobacz naszą galerię zdjęć <br />i poczuj się jak w domu
        </p>
      </motion.div>

      <div>
        <motion.div
          className=" relative hidden w-[700px] grid-flow-row grid-cols-6 justify-center md:mx-auto md:grid md:gap-[20px] lg:w-[960px] xl:w-[1220px] xl3:w-[1536px]"
          variants={animations.miniatures}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {block.content?.map((image: Block['image'], index: number) => (
            <motion.div
              className={`relative h-[100px] w-[100%] lg:h-[calc(900px/6)] xl:h-[calc(1220px/6)] xl3:h-[calc(1450px/6)] item-${index} cursor-pointer`}
              key={image._key}
              onClick={() => {
                handleSliderShow(index);
              }}
              variants={animations.miniature}
            >
              <Image
                src={urlFor(image).url()}
                alt={image.alt}
                fill
                sizes="200px"
                style={{ objectFit: 'cover', pointerEvents: 'none' }}
              />
            </motion.div>
          ))}
        </motion.div>
        <AnimatePresence>
          {(isMobile || sliderShow) && (
            <motion.div
              className={` relative w-full md:fixed md:top-0 md:left-0 md:z-50 md:h-full md:bg-white`}
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: '0' }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{
                y: {
                  duration: 0.6,
                },
                opacity: {
                  duration: 0.6,
                },
              }}
            >
              <SlClose
                className="absolute right-8 top-8 z-10 hidden cursor-pointer bg-white/75 md:block md:p-[10px]"
                color="#2c2c2c"
                size={60}
                onClick={() => {
                  handleSliderShow(1);
                }}
              />
              <Swiper
                loop={true}
                autoHeight={false}
                spaceBetween={0}
                slidesPerView={1}
                initialSlide={startSlide}
                speed={1000}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                  setMySwiper(swiper);
                }}
              >
                {block.content?.map((image: Block['image']) => (
                  <SwiperSlide key={image._key} className="my-auto">
                    <div className="relative h-[300px] w-full sm:h-[450px] md:h-[100vh]">
                      <Image
                        src={urlFor(image).url()}
                        alt={image.alt}
                        fill
                        sizes="1920px"
                        style={{ pointerEvents: 'none' }}
                        className="object-cover md:object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="z-10 px-[40px] py-[20px] md:absolute md:bottom-0 md:left-1/2 md:w-full md:translate-x-[-50%] md:bg-white/75">
                <Arrows swiper={mySwiper} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;
