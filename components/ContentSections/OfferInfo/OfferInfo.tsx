import React, { useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@lib/sanity';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';

type Row = {
  cells: [];
  _key: string;
};

const OfferInfo = ({ offerInfo }) => {
  const [ratio, setRatio] = useState(16 / 9); // default to 16:9

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
            <div
              key={uuidv4()}
              className="relative mx-auto grid grid-cols-1 items-center md:grid-cols-2"
            >
              <motion.div
                className="relative mx-auto w-[70%]"
                variants={animations.left}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
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
              </motion.div>

              <motion.div
                className="w-full p-[40px] md:max-w-[450px] lg:px-0"
                variants={animations.right}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
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
              </motion.div>
            </div>
          ) : (
            <div
              key={uuidv4()}
              className="relative mx-auto grid grid-cols-1 items-center md:grid-cols-2"
            >
              <motion.div
                className="ml-auto w-full p-[40px] md:max-w-[450px] lg:px-0"
                variants={animations.left}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
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
              </motion.div>
              <motion.div
                className="relative mx-auto w-[70%]"
                variants={animations.right}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
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
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default OfferInfo;
