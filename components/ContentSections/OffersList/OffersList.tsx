import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@lib/sanity';
import { Offer } from '@typings/offer';
import { motion } from 'framer-motion';

const OffersList = ({ offers, type }) => {
  const animations = {
    offers: {
      show: {
        scale: 1,
        opacity: 1,
        transition: {
          default: { duration: 0.6 },
          ease: 'circIn',
        },
      },
      hidden: {
        opacity: 0,
        scale: 0.8,
      },
    },
  };
  return (
    <section className="relative">
      <div className="offersList-wrapper mx-auto mt-[40px] flex flex-col flex-wrap px-[40px] lg:mt-[-80px] lg:flex-row xl:max-w-[80%] xl:px-0">
        {offers?.map((offer: Offer) => {
          return (
            (type === offer.type || type === 'all') && (
              <motion.div
                key={offer._id}
                className="lg: group relative mb-[40px] w-full flex-[calc(50%-40px)] bg-white lg:mx-[20px] lg:max-w-[calc(50%-40px)]"
                variants={animations.offers}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <Link href={`/oferta-deweloperska/${offer.slug.current}`}>
                  <div className="p-[20px] sm:p-[40px]">
                    {offer.offerInfo.status == 'available' && (
                      <div className="absolute top-[40px] right-[20px] z-10 rounded-3xl bg-green-700 px-[20px] py-[5px] text-white sm:right-[40px]">
                        <span>Dostępne</span>
                      </div>
                    )}
                    {offer.offerInfo.status == 'reservation' && (
                      <div className="absolute top-[40px] right-[20px] z-10 rounded-3xl bg-yellow-600 px-[20px] py-[5px] text-white sm:right-[40px]">
                        <span>Rezerwacja</span>
                      </div>
                    )}
                    {offer.offerInfo.status == 'sold' && (
                      <div className="absolute top-[40px] right-[20px] z-10 rounded-3xl bg-gray-700 px-[20px] py-[5px] text-white sm:right-[40px]">
                        <span>Sprzedane</span>
                      </div>
                    )}
                    {offer.offerInfo.project && (
                      <h4 className="mb-[10px] text-[15px] font-bold uppercase sm:mb-[16px] sm:text-[20px]">
                        {offer.offerInfo.project}
                      </h4>
                    )}
                    {offer.offerInfo.name && (
                      <h3 className="text-[18px] sm:text-[34px]">
                        {offer.offerInfo.name}
                      </h3>
                    )}
                    <div className="flex flex-col-reverse sm:mt-[20px] sm:flex-row sm:items-center sm:justify-between">
                      <button className="relative my-6 inline-block max-w-[200px] cursor-pointer border-2 border-[#000] px-[40px] py-[15px] text-center font-bold text-[#000] transition hover:bg-[#000] hover:text-white">
                        Poznaj ofertę
                      </button>
                      <div className="mt-[20px]  sm:m-0">
                        <span className="text-[21px]">Cena domu: </span>{' '}
                        <span className="whitespace-nowrap text-[28px] font-bold">
                          {offer.offerInfo.price.toLocaleString('pl-PL')} zł
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="relative h-[300px] w-full overflow-hidden sm:h-[400px] ">
                    <Image
                      src={urlFor(offer.image).url()}
                      alt={offer.image.alt}
                      fill
                      style={{ objectFit: 'cover', width: '100%' }}
                      className="transition-transform duration-1000 ease-in-out group-hover:scale-[1.2]"
                    ></Image>
                  </div>
                </Link>
              </motion.div>
            )
          );
        })}
      </div>
    </section>
  );
};

export default OffersList;
