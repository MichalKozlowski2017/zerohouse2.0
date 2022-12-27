import '../styles/globals.scss';
import '../styles/reset.css';
import type { AppProps } from 'next/app';
import Layout from '@components/Layout/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout pages={pageProps.pages} footer={pageProps.footer}>
      <Component {...pageProps} />
    </Layout>
  );
}
