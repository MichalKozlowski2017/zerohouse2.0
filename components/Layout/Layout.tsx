import Footer from '@components/Layout/Footer/Footer';
import Header from '@components/Layout/Header/Header';
import React from 'react';
import { Pages } from '@typings/pages';

type Props = {
  children: JSX.Element;
  pages: Pages['pages'];
};

const Layout = ({ children, pages }: Props) => {
  return (
    <main className="max-w-[1920px] relative mx-auto pt-[124px]">
      <Header pages={pages} />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
