import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import React from 'react';

type Props = {
  children: JSX.Element;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
