import React, { useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@lib/sanity';
import { v4 as uuidv4 } from 'uuid';

type Row = {
  cells: [];
  _key: string;
};

const OfferInfo = ({ offerInfo }) => {
  console.log(offerInfo);
  const [ratio, setRatio] = useState(16 / 9); // default to 16:9
  return (
    <section
      className="relative flex flex-col
    "
    >
      <div className="relative mx-auto flex w-full flex-col justify-between bg-white p-[40px] sm:flex-row sm:items-end lg:mt-[-60px] lg:max-w-[80%]">
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
      </div>

      <div className="relative mx-auto flex w-full max-w-[820px] flex-col items-center py-[40px] text-center sm:flex-row sm:items-start sm:justify-around">
        {offerInfo.features.bedrooms > 0 && (
          <div className="my-[40px] sm:w-[120px]">
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
          </div>
        )}

        {offerInfo.features.bathrooms > 0 && (
          <div className="my-[40px] sm:w-[120px]">
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
          </div>
        )}

        {offerInfo.features.garden > 0 && (
          <div className="my-[40px] sm:w-[120px]">
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
          </div>
        )}

        {offerInfo.features.parking > 0 && (
          <div className="my-[40px] sm:w-[120px]">
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
          </div>
        )}
      </div>

      {/* Pomieszczenia */}
      <div className="mx-auto">
        {offerInfo.levels?.map((level, index: number) => {
          return index % 2 === 0 ? (
            <div
              key={uuidv4()}
              className="relative mx-auto grid grid-cols-1 items-center md:grid-cols-2"
            >
              <div className="relative mx-auto w-[70%]">
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
                      className="flex justify-between border-b py-[10px] last:border-0 lg:py-[23px]"
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
            </div>
          ) : (
            <div
              key={uuidv4()}
              className="relative mx-auto grid grid-cols-1 items-center md:grid-cols-2"
            >
              <div className="ml-auto w-full p-[40px] md:max-w-[450px] lg:px-0">
                <h4 className="mb-[40px] text-[16px] font-bold">
                  {level.title}
                </h4>
                <ul>
                  {level.rooms.rows.map((row: Row) => (
                    <li
                      key={row._key}
                      className="flex justify-between border-b py-[10px] last:border-0 lg:py-[23px]"
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
              <div className="relative mx-auto w-[70%]">
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
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default OfferInfo;
