import { useEffect, type ReactElement, type ReactNode } from 'react';

import '@/assets/styles/global.scss';
import { AuthProvider } from '@/contexts/AuthGuard';
import Maintenance from '@/layouts/Maintenace';
import { CacheProvider, EmotionCache } from '@emotion/react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CssBaseline from '@mui/material/CssBaseline';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import createEmotionCache from 'src/createEmotionCache';
import ThemeProvider from 'src/theme/ThemeProvider';
import Script from 'next/script';
const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface TokyoAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
  pageProps: any;
}

function TokyoApp(props: TokyoAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  Router.events.on('routeChangeStart', nProgress.start);
  Router.events.on('routeChangeError', nProgress.done);
  Router.events.on('routeChangeComplete', nProgress.done);

  const router = useRouter();
  useEffect(() => {
    const whiteList = 'news';
    const checkWhiteList = router.asPath
      .toLocaleLowerCase()
      .includes(whiteList);

    if (router.asPath !== '/') {
      if (checkWhiteList) return;
      window.location.href = `https://genshinviet.com.vn/${router.asPath}`;
    }
  });

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Genshin Shop</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <AuthProvider>
        <SidebarProvider>
          <ThemeProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <CssBaseline />

              {process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'false' ? (
                getLayout(<Component {...pageProps} />)
              ) : (
                <Maintenance />
              )}

              <Script
                strategy="lazyOnload"
                src={`https://www.googletagmanager.com/gtag/js?id=G-QKWZFM4WFR`}
              />

              <Script strategy="lazyOnload" id="">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());

                  gtag('config', 'G-QKWZFM4WFR');
                `}
              </Script>

              <Script strategy="lazyOnload" id="">
                {`
                 window.dataLayer = window.dataLayer || [];
                 function gtag(){dataLayer.push(arguments);}
                 gtag('js', new Date());
               
                 gtag('config', 'AW-11172811540');
                `}
              </Script>
              <Script
                strategy="lazyOnload"
                id=""
                async
                src="https://www.googletagmanager.com/gtag/js?id=AW-11172811540"
              ></Script>
            </LocalizationProvider>
          </ThemeProvider>
        </SidebarProvider>
      </AuthProvider>
    </CacheProvider>
  );
}

export default TokyoApp;
