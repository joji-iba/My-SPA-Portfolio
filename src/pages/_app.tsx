import '../styles/globals.css';
import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import { Montserrat } from 'next/font/google';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Footer } from 'components/Footer';
import NavBar from 'components/NavBar';

// ページ全体のフォント読込
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-mont',
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // FOUC回避の記述
  const [show_screen, setShowScreen] = useState(false);

  useEffect(() => {
    setShowScreen(true);
  }, []);

  return (
    <>
      {show_screen ? (
        <>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
          </Head>
          <main
            className={`${montserrat.variable} font-mont bg-light dark:bg-dark min-h-screen`}
          >
            <NavBar />
            <AnimatePresence mode="wait">
              <Component key={router.asPath} {...pageProps} />
            </AnimatePresence>
            <Footer />
          </main>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
