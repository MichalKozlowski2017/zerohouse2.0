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
        className={`fixed top-0 z-30 inline-flex h-[70px] w-full max-w-[1920px] items-center justify-between px-4 text-base uppercase transition transition-all md:h-[124px] 
          md:px-9
          ${small ? 'border-b border-[#DFDFDF] bg-[#F8F8F8] md:h-[70px]' : ''}
        `}
      >
        <div>
          <Link href="/">
            <Logo color={router.pathname === '/' && !small ? '#fff' : '#000'} />
          </Link>
        </div>
        <div
          className={`hidden mobileMenu:inline-flex ${
            router.pathname === '/' && !small ? 'text-white' : 'text-black'
          }`}
        >
          {pages?.map((page) => (
            <div className="mx-[40px]" key={page._id}>
              <Link href={page.slug.current}>{page.title}</Link>
            </div>
          ))}
        </div>
        <div className="z-50 flex mobileMenu:hidden">
          <Hamburger
            color={router.pathname === '/' && !small ? '#fff' : '#000'}
            rounded
            toggled={isOpen}
            toggle={setOpen}
          />
        </div>
      </header>
      <AnimatePresence>
        {isOpen ? (
          <div
            className={`fixed top-[70px] z-20 h-auto w-[100%] overflow-hidden overflow-visible md:top-[124px] mobileMenu:hidden
          ${small ? 'md:top-[70px]' : 'md:top-[124px]'}
          `}
          >
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: '0' }}
              exit={{ y: '-100%' }}
              transition={{
                y: { duration: 0.3 },
                default: { ease: 'linear' },
              }}
              className={`relative top-0 left-0 flex h-auto w-[100%] flex-col items-center justify-center bg-[#F8F8F8] py-10 shadow-lg`}
            >
              {pages?.map((page) => (
                <div
                  className="my-2 block cursor-pointer text-2xl"
                  key={page._id}
                >
                  <Link href={`/${page.slug.current}`}>{page.title}</Link>
                </div>
              ))}
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default Header;
