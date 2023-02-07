import { FooterType } from '@typings/footer';
import React from 'react';
import { urlFor } from '@lib/sanity';
import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import {
  SlSocialYoutube,
  SlSocialFacebook,
  SlSocialLinkedin,
  SlSocialInstagram,
} from 'react-icons/sl';
import { motion } from 'framer-motion';

const Footer = (footer: FooterType) => {
  const myPortableTextComponentsAddress = {
    block: {
      h5: ({ children }) => {
        return (
          <h5 className="footer-adres relative mb-[20px] font-semibold uppercase">
            <Image
              src="/assets/images/pin.svg"
              height={24}
              width={18}
              alt="Adres Inwestycji"
              className="absolute left-[-30px] hidden lg:block"
            />
            {children}
          </h5>
        );
      },
      p: ({ children }) => <p>{children}</p>,
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

  const myPortableTextComponentsKontakt = {
    block: {
      h5: ({ children }) => {
        return (
          <h5 className="footer-adres relative mb-[20px] font-semibold uppercase">
            <Image
              src="/assets/images/person.svg"
              height={24}
              width={18}
              alt="Adres Inwestycji"
              className="absolute left-[-30px] hidden lg:block"
            />
            {children}
          </h5>
        );
      },
      p: ({ children }) => <p>{children}</p>,
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

  const animations = {
    logos: {
      show: {
        opacity: 1,
        scaleY: 1,
        transition: {
          default: { ease: 'circOut' },
          staggerChildren: 0.2,
          delayChildren: 0.5,
          scaleY: {
            duration: 0.5,
            ease: 'circOut',
          },
        },
      },
      hidden: {
        opacity: 0,
        scaleY: 0.1,
      },
    },
    logo: {
      show: {
        scale: 1,
        opacity: 1,
        transition: {
          duration: 0.3,
          ease: 'circOut',
        },
      },
      hidden: {
        scale: 0.5,
        opacity: 0,
      },
    },
    footer: {
      show: {
        opacity: 1,
        y: 0,
        transition: {
          delay: 0.3,
          duration: 1,
          ease: 'circOut',
        },
      },
      hidden: {
        opacity: 0,
        y: '10%',
      },
    },
  };
  return (
    <footer className="relative mt-[75px] w-full">
      <motion.div
        className="relative flex flex-col items-center justify-between bg-white px-[40px] py-[40px]
      md:flex-row lg:py-[70px]
      lg:px-[6vw]
      xl:py-[90px] xl:px-[14vw]
      xl3:py-[100px] xl3:px-[362px]
      "
        variants={animations.logos}
        initial="hidden"
        whileInView="show"
      >
        {footer.logos?.map((logo, index) => (
          <Link
            href={logo.logoLink}
            key={logo._key}
            target="_blank"
            rel="nofollow noindex"
          >
            <motion.div
              variants={animations.logo}
              className={`relative footer-logo-${index} relative inline-block h-[110px] w-[190px]`}
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
            </motion.div>
          </Link>
        ))}
      </motion.div>
      <motion.div
        className="px-[40px] py-[40px] text-[18px] md:flex md:items-start md:justify-between lg:py-[70px] lg:px-[6vw] xl:py-[90px] xl:px-[14vw] xl3:px-[10%]"
        variants={animations.footer}
        initial="hidden"
        whileInView="show"
      >
        <div className="lg:flex">
          <div className="mr-[150px] pb-[40px] lg:mr-[14vw] xl3:mr-[300px]">
            <PortableText
              value={footer.address}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              components={myPortableTextComponentsAddress}
            />
          </div>
          <div className="pb-[40px]">
            <PortableText
              value={footer.kontakt}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              components={myPortableTextComponentsKontakt}
            />
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
      </motion.div>
    </footer>
  );
};

export default Footer;
