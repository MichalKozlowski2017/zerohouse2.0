import '../styles/globals.scss';
import '../styles/reset.css';
import type { AppProps } from 'next/app';
import Layout from '@components/Layout/Layout';
import { useEffect } from 'react';
import TagManager from 'react-gtm-module';
import { GoogleAnalytics } from 'nextjs-google-analytics';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-WG2VLX3' });
  }, []);
  return (
    <>
      <GoogleAnalytics trackPageViews />
      <Layout pages={pageProps.pages} footer={pageProps.footer}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
