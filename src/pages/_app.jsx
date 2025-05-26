// pages/_app.js o src/pages/_app.js

import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import '@/globals.css';
import Layout from '@/components/Layout';
import { Montserrat } from 'next/font/google';

// --- Imports para Google Tag ---
import Script from 'next/script';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const monserrat = Montserrat({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

// --- Constantes y funciones para Google Tag ---
const GOOGLE_TAG_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID || 'AW-11500533237'; // Usa tu ID o el de la variable de entorno

// Función para enviar eventos de pageview en cambios de ruta
const handleRouteChange = (url) => {
  if (typeof window.gtag !== 'undefined' && GOOGLE_TAG_ID) {
    window.gtag('config', GOOGLE_TAG_ID, {
      page_path: url,
    });
  }
};

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (!GOOGLE_TAG_ID) {
      console.warn("Google Tag ID no está configurado. El seguimiento está deshabilitado.");
      return;
    }
    // Escucha los cambios de ruta para enviar pageviews
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <> {/* Fragmento para envolver los scripts y el Provider */}
      {/* Scripts de Google Tag (gtag.js) */}
      {/* Solo renderiza los scripts si GOOGLE_TAG_ID está definido */}
      {GOOGLE_TAG_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`}
          />
          <Script
            id="gtag-init" // Es buena práctica dar un ID al script en línea
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GOOGLE_TAG_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}

      {/* Tu estructura existente de la aplicación */}
      <Provider store={store}>
        <Layout className={monserrat.className}>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}

export default MyApp;