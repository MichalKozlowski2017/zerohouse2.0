import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Pages } from '@typings/pages';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import Hamburger from 'hamburger-react';
import Logo from '@components/Logo/Logo';

const Header = ({ pages }: Pages) => {
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      setOpen(false);
    };
    router.events.on('routeChangeStart', handleRouteChange);
  }, [router.events]);

  return (
    <>
      <header
        className={`h-[124px] w-full max-w-[1920px] fixed inline-flex z-30 top-0 items-center justify-between px-9 uppercase text-base ${
          isOpen ? 'bg-white' : 'bg-[transparent]'
        }`}
      >
        <div>
          <Link href="/">
            <Logo color={router.pathname === '/' ? '#fff' : '#000'} />
          </Link>
        </div>
        <div
          className={`hidden mobileMenu:inline-flex ${
            router.pathname === '/' ? 'text-white' : 'text-black'
          }`}
        >
          {pages?.map((page) => (
            <div className="mx-[40px]" key={page._id}>
              <Link href={page.slug.current}>{page.title}</Link>
            </div>
          ))}
        </div>
        <div className="flex mobileMenu:hidden z-50">
          <Hamburger color="#000" rounded toggled={isOpen} toggle={setOpen} />
        </div>
      </header>
      <AnimatePresence>
        {isOpen ? (
          <div className="fixed w-[100%] h-auto z-20 overflow-hidden mobileMenu:hidden ">
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: '0' }}
              exit={{ y: '-100%' }}
              transition={{
                y: { duration: 0.3 },
                default: { ease: 'linear' },
              }}
              className={`relative w-[100%] h-auto flex flex-col bg-[red] top-0 justify-center items-center  left-0 py-10`}
            >
              {pages?.map((page) => (
                <div
                  className="block my-2 text-2xl cursor-pointer"
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
