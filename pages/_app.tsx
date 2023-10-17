import type { ReactElement, ReactNode } from 'react';

import '@/assets/styles/global.scss';
import { AuthProvider } from '@/contexts/AuthGuard';
import { CacheProvider, EmotionCache } from '@emotion/react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CssBaseline from '@mui/material/CssBaseline';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import createEmotionCache from 'src/createEmotionCache';
import ThemeProvider from 'src/theme/ThemeProvider';
import Script from 'next/script';
import Maintenance from '@/layouts/Maintenace';
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
              <div id="histats_counter"></div>
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
                    var _Hasync= _Hasync|| [];
                  _Hasync.push(['Histats.start', '1,4812925,4,1,120,40,00010000']);
                  _Hasync.push(['Histats.fasi', '1']);
                  _Hasync.push(['Histats.track_hits', '']);
                  (function() {
                  var hs = document.createElement('script'); hs.type = 'text/javascript'; hs.async = true;
                  hs.src = ('//s10.histats.com/js15_as.js');
                  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(hs);
                  })();
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
