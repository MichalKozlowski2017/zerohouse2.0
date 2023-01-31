import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@lib/sanity';
import { v4 as uuidv4 } from 'uuid';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { type Swiper as SwiperRef } from 'swiper';
import Arrows from '@components/Arrows/Arrows';
import { motion, AnimatePresence } from 'framer-motion';
import { SlClose } from 'react-icons/sl';
import { Block } from '@typings/block';
import { Offer } from '@typings/offer';

type Row = {
  cells: [];
  _key: string;
};

const OfferInfo = ({ offerInfo }) => {
  const [ratio, setRatio] = useState(16 / 9); // default to 16:9
  const [mySwiper, setMySwiper] = useState({});
  const swiperRef = useRef<SwiperRef>();
  const [sliderShow, setSliderShow] = useState(false);
  const [startSlide, setStartSlide] = useState(1);

  const handleSliderShow = (index: number) => {
    setStartSlide(index);
    setSliderShow(!sliderShow);
  };

  const animations = {
    header: {
      show: {
        y: '0',
        opacity: 1,
        transition: {
          default: { duration: 0.6 },
          ease: 'circOut',
        },
      },
      hidden: {
        y: '100px',
        opacity: 0,
      },
    },
    features: {
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2,
          delayChildren: 0.2,
          default: { duration: 0.3 },
          ease: 'circOut',
        },
      },
      hidden: {
        opacity: 0,
      },
    },
    feature: {
      show: {
        scale: 1,
        opacity: 1,
        transition: {
          default: { duration: 0.2 },
        },
      },
      hidden: {
        scale: 0.9,
        opacity: 0,
      },
    },
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
  };
  return (
    <section
      className="relative flex flex-col pb-[40px]
    "
    >
      <motion.div
        variants={animations.header}
        initial="hidden"
        whileInView="show"
        className="relative mx-auto flex w-full flex-col justify-between bg-white p-[40px] sm:flex-row sm:items-end lg:mt-[-60px] lg:max-w-[80%]"
      >
        {offerInfo.status == 'available' && (
          <div className="absolute top-[20px] right-[20px] z-10 rounded-3xl bg-green-700 px-[20px] py-[1px] text-[14px] text-white sm:right-[40px] lg:top-[40px]">
            <span>Dostępne</span>
          </div>
        )}
        {offerInfo.status == 'reservation' && (
          <div className="absolute top-[20px] right-[20px] z-10 rounded-3xl bg-yellow-600 px-[20px] py-[1px] text-[14px] text-white sm:right-[40px] lg:top-[40px]">
            <span>Rezerwacja</span>
          </div>
        )}
        {offerInfo.status == 'sold' && (
          <div className="absolute top-[20px] right-[20px] z-10 rounded-3xl bg-gray-700 px-[20px] py-[1px] text-[14px] text-white sm:right-[40px] lg:top-[40px]">
            <span>Sprzedane</span>
          </div>
        )}
        <div>
          {offerInfo.project && (
            <h4 className="mb-[10px] text-[15px] font-bold uppercase sm:mb-[16px] sm:text-[20px]">
              {offerInfo.project}
            </h4>
          )}
          {offerInfo.name && (
            <h3 className="text-[22px] sm:text-[34px]">{offerInfo.name}</h3>
          )}
        </div>

        <div className="mt-[20px] sm:mt-[15px]">
          <span className="text-[21px]">Cena domu: </span>{' '}
          <span className="whitespace-nowrap text-[28px] font-bold">
            {offerInfo.price.toLocaleString('pl-PL')} zł
          </span>
        </div>
      </motion.div>

      <motion.div
        className="relative mx-auto flex w-full max-w-[820px] flex-col items-center py-[40px] text-center sm:flex-row sm:items-start sm:justify-around"
        variants={animations.features}
        initial="hidden"
        whileInView="show"
      >
        {offerInfo.features.bedrooms > 0 && (
          <motion.div
            variants={animations.feature}
            className="my-[40px] sm:w-[120px]"
          >
            <Image
              src={'/assets/images/bedroom.svg'}
              alt="Sypialnie"
              width={53}
              height={54}
              className="mx-auto"
            ></Image>
            <div className="mt-[30px]">
              <span>
                {offerInfo.features.bedrooms}{' '}
                {offerInfo.features.bedrooms == 1 ? 'SYPIALNIA' : 'SYPIALNIE'}
              </span>
            </div>
          </motion.div>
        )}

        {offerInfo.features.bathrooms > 0 && (
          <motion.div
            className="my-[40px] sm:w-[120px]"
            variants={animations.feature}
          >
            <Image
              src={'/assets/images/bathroom.svg'}
              alt="Łazienki"
              width={53}
              height={54}
              className="mx-auto"
            ></Image>
            <div className="mt-[30px]">
              <span>
                {offerInfo.features.bathrooms}{' '}
                {offerInfo.features.bathrooms == 1 ? 'ŁAZIENKA' : 'ŁAZIENKI'}
              </span>
            </div>
          </motion.div>
        )}

        {offerInfo.features.garden > 0 && (
          <motion.div
            className="my-[40px] sm:w-[120px]"
            variants={animations.feature}
          >
            <Image
              src={'/assets/images/garden.svg'}
              alt="Ogród"
              width={47}
              height={54}
              className="mx-auto"
            ></Image>
            <div className="mt-[30px]">
              <span>
                {offerInfo.features.garden} m<sup>2</sup> OGRODU
              </span>
            </div>
          </motion.div>
        )}

        {offerInfo.features.parking > 0 && (
          <motion.div
            className="my-[40px] sm:w-[120px]"
            variants={animations.feature}
          >
            <Image
              src={'/assets/images/garage.svg'}
              alt="Miejsce parkingowe"
              width={53}
              height={54}
              className="mx-auto"
            ></Image>
            <div className="mt-[30px]">
              <span>
                {offerInfo.features.parking}{' '}
                {offerInfo.features.parking == 1
                  ? 'MIEJSCE PARKINGOWE'
                  : 'MIEJSCA PARKINGOWE'}
              </span>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Pomieszczenia */}
      <div className="mx-auto">
        {offerInfo.levels?.map((level, index: number) => {
          return index % 2 === 0 ? (
            <motion.div
              key={uuidv4()}
              className="relative mx-auto grid grid-cols-1 items-center md:grid-cols-2"
              variants={animations.left}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <div
                className="relative mx-auto w-[70%] cursor-pointer"
                onClick={() => {
                  handleSliderShow(index);
                }}
              >
                <Image
                  src={urlFor(level.image).url()}
                  alt={level.image.alt}
                  width={1024}
                  height={1024 / ratio}
                  style={{ objectFit: 'contain' }}
                  onLoadingComplete={({ naturalWidth, naturalHeight }) =>
                    setRatio(naturalWidth / naturalHeight)
                  }
                  className="lg:block"
                />
              </div>

              <div className="w-full p-[40px] md:max-w-[450px] lg:px-0">
                <h4 className="mb-[40px] text-[16px] font-bold">
                  {level.title}
                </h4>
                <ul>
                  {level.rooms.rows.map((row: Row) => (
                    <li
                      key={row._key}
                      className="flex justify-between border-b border-black py-[15px] last:border-0 lg:py-[23px] xl2:text-[21px]"
                    >
                      {row.cells.map((cell: string, index: number) => {
                        return index === 0 ? (
                          <span className="" key={uuidv4()}>
                            {cell}
                          </span>
                        ) : (
                          <span key={uuidv4()} className="font-bold">
                            {cell} m<sup>2</sup>
                          </span>
                        );
                      })}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={uuidv4()}
              className="relative mx-auto grid grid-cols-1 items-center md:grid-cols-2"
              variants={animations.right}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <div className="ml-auto w-full p-[40px] md:max-w-[450px] lg:px-0">
                <h4 className="mb-[40px] text-[16px] font-bold">
                  {level.title}
                </h4>
                <ul>
                  {level.rooms.rows.map((row: Row) => (
                    <li
                      key={row._key}
                      className="flex justify-between border-b border-black py-[15px] last:border-0 lg:py-[23px] xl2:text-[21px]"
                    >
                      {row.cells.map((cell: string, index: number) => {
                        return index === 0 ? (
                          <span className="" key={uuidv4()}>
                            {cell}
                          </span>
                        ) : (
                          <span key={uuidv4()} className="font-bold">
                            {cell} m<sup>2</sup>
                          </span>
                        );
                      })}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="relative mx-auto w-[70%] cursor-pointer"
                onClick={() => {
                  handleSliderShow(index);
                }}
              >
                <Image
                  src={urlFor(level.image).url()}
                  alt={level.image.alt}
                  width={1024}
                  height={1024 / ratio}
                  style={{ objectFit: 'contain' }}
                  onLoadingComplete={({ naturalWidth, naturalHeight }) =>
                    setRatio(naturalWidth / naturalHeight)
                  }
                  className="lg:block"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
      <AnimatePresence>
        {sliderShow && (
          <motion.div
            className={` fixed top-0 left-0 z-50 h-full w-full bg-white md:h-full`}
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
              className="absolute right-8 top-8 z-10 block cursor-pointer bg-white/75 p-[10px]"
              color="#2c2c2c"
              size={60}
              onClick={() => {
                handleSliderShow(1);
              }}
            />
            <Swiper
              loop={false}
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
              {offerInfo.levels?.map(({ bigImage }: Block) => (
                <SwiperSlide key={bigImage._key} className="my-auto">
                  <div className="relative h-[300px] w-full sm:h-[450px] md:h-[100vh]">
                    <Image
                      src={urlFor(bigImage).url()}
                      alt={bigImage.alt}
                      fill
                      sizes="2000px"
                      style={{ pointerEvents: 'none' }}
                      className="object-contain"
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
    </section>
  );
};

export default OfferInfo;
