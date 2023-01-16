import { FooterType } from '@typings/footer';
import React from 'react';
import { urlFor } from '@lib/sanity';
import Image from 'next/image';
import Link from 'next/link';
import {
  SlSocialYoutube,
  SlSocialFacebook,
  SlSocialLinkedin,
  SlSocialInstagram,
} from 'react-icons/sl';

const Footer = (footer: FooterType) => {
  return (
    <footer className="relative mt-[75px] w-full">
      <div
        className="relative flex flex-col items-center justify-between bg-white px-[40px] py-[40px]
      md:flex-row lg:py-[70px]
      lg:px-[6vw]
      xl:py-[90px] xl:px-[14vw]
      xl3:py-[100px] xl3:px-[362px]
      "
      >
        {footer.logos?.map((logo, index) => (
          <Link
            href={logo.logoLink}
            target="_blank"
            rel="nofollow noindex"
            key={logo._key}
            className={`footer-logo-${index} relative 
            h-[110px] w-[190px]
            `}
          >
            <Image
              src={urlFor(logo.image).url()}
              alt={logo.image.alt}
              fill
              sizes="(max-width: 768px) 200px,
        (max-width: 1200px) 200px,
        200px"
              style={{ objectFit: 'contain', pointerEvents: 'none' }}
            />
          </Link>
        ))}
      </div>
      <div className="px-[40px] py-[40px] text-[18px] md:flex md:items-start md:justify-between lg:py-[70px] lg:px-[6vw] xl:py-[90px] xl:px-[14vw] xl3:px-[10%]">
        <div className="lg:flex">
          <div className="mr-[150px] pb-[40px] lg:mr-[14vw] xl3:mr-[300px]">
            <h5 className="footer-adres relative mb-[20px] font-semibold uppercase">
              <Image
                src="/assets/images/pin.svg"
                height={24}
                width={18}
                alt="Adres Inwestycji"
                className="absolute left-[-30px] hidden lg:block"
              />
              Adres Inwestycji
            </h5>
            <p>
              Jeżów Sudecki
              <br />
              ul. Południowa 100
            </p>
          </div>
          <div className="pb-[40px]">
            <h5 className="footer-kontakt relative mb-[20px] font-semibold uppercase">
              <Image
                src="/assets/images/person.svg"
                height={22}
                width={22}
                alt="Kontakt"
                className="absolute left-[-33px] hidden lg:block"
              />
              Kontakt
            </h5>
            <p>
              Wojciech Nowak: +48 505 765 502
              <br />
              Paweł Suchecki: + 48 600 227 515
            </p>
          </div>
        </div>
        <div className="relative flex items-center justify-start">
          {footer.smYoutube && (
            <Link href={footer.smYoutube} target="_blank">
              <SlSocialYoutube
                className="mr-[30px] h-[30px] w-auto md:mr-[0] md:ml-[30px]"
                color="#404040"
              />
            </Link>
          )}
          {footer.smFacebook && (
            <Link href={footer.smFacebook} target="_blank">
              <SlSocialFacebook
                className="mr-[30px] h-[32px] w-auto md:mr-[0] md:ml-[30px]"
                color="#404040"
              />
            </Link>
          )}
          {footer.smLinkedin && (
            <Link href={footer.smLinkedin} target="_blank">
              <SlSocialLinkedin
                className="mr-[30px] h-[29px] w-auto md:mr-[0] md:ml-[30px]"
                color="#404040"
              />
            </Link>
          )}
          {footer.smInstagram && (
            <Link href={footer.smInstagram} target="_blank">
              <SlSocialInstagram
                className="mr-[30px] h-[27px] w-auto md:mr-[0] md:ml-[30px]"
                color="#404040"
              />
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
