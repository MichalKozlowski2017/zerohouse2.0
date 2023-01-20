import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Pages } from '@typings/pages';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import Hamburger from 'hamburger-react';
import Logo from '@components/Logo/Logo';

const Header = ({ pages }: Pages) => {
  const [isOpen, setOpen] = useState(false);
  const [small, setSmall] = useState(false);
  const router = useRouter();

  // animations
  const animations = {
    headerAnim: {
      hidden: {
        y: '-100%',
        opacity: 0,
      },
      show: {
        y: '0',
        opacity: 1,
        transition: {
          y: { duration: 0.7 },
          opacity: { duration: 0.7 },
          default: { ease: 'circOut' },
          staggerChildren: 0.2,
          delayChildren: 0.5,
        },
      },
      exit: {
        y: '-100%',
        opacity: 0,
      },
    },
    menuItemAnim: {
      hidden: {
        x: '40px',
        opacity: 0,
      },
      show: {
        x: '0',
        opacity: 1,
      },
    },
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () =>
        setSmall(window.pageYOffset > 15)
      );
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      setOpen(false);
    };
    router.events.on('routeChangeStart', handleRouteChange);
  }, [router.events]);

  return (
    <>
      <header
        className={`fixed top-0 z-30 inline-flex h-[70px] w-full max-w-[1920px] items-center justify-between px-4 text-base uppercase transition-all duration-500 md:h-[124px] 
          md:px-9
          ${small || isOpen ? 'bg-[#F8F8F8] md:h-[70px]' : ''}
        `}
      >
        <div>
          <Link href="/">
            <Logo
              color={
                router.pathname === '/' && !small && !isOpen ? '#fff' : '#000'
              }
            />
          </Link>
        </div>
        <div
          className={`hidden mobileMenu:inline-flex ${
            router.pathname === '/' && !small && !isOpen
              ? 'text-white'
              : 'text-black'
          }`}
        >
          {pages?.map((page) => (
            <div className="mx-[40px]" key={page._id}>
              <Link href={`/${page.slug.current}`}>{page.title}</Link>
            </div>
          ))}
        </div>
        <div className="z-50 flex mobileMenu:hidden">
          <Hamburger
            color={
              router.pathname === '/' && !small && !isOpen ? '#fff' : '#000'
            }
            rounded
            toggled={isOpen}
            toggle={setOpen}
          />
        </div>
      </header>
      <AnimatePresence>
        {isOpen ? (
          <div
            className={`fixed top-[70px] z-20 h-auto w-[100%] overflow-visible md:top-[124px] mobileMenu:hidden
          ${small ? 'md:top-[70px]' : 'md:top-[124px]'}
          `}
          >
            <motion.div
              variants={animations.headerAnim}
              initial="hidden"
              animate="show"
              exit="exit"
              className={`relative top-0 left-0 flex h-auto w-[100%] flex-col items-center justify-center bg-[#F8F8F8] py-10 shadow-lg`}
            >
              {pages?.map((page) => (
                <motion.div
                  className="my-2 block cursor-pointer text-2xl"
                  key={page._id}
                  variants={animations.menuItemAnim}
                >
                  <Link href={`/${page.slug.current}`}>{page.title}</Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default Header;
