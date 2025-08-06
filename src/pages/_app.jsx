import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import '@/globals.css';
import Layout from '@/components/Layout';
import { Montserrat, Sofia_Sans_Condensed } from 'next/font/google';
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script';

const monserrat = Sofia_Sans_Condensed({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

function MyApp({ Component, pageProps }) {
  // Busca una función getLayout en la página. Si no existe, usa el Layout por defecto.
  const getLayout = Component.getLayout || ((page) => (
    <Layout className={monserrat.className} pageProps={pageProps}>
      {page}
    </Layout>
  ));

  return (
    <>
      {/* Tu estructura existente de la aplicación */}
      <Provider store={store}>
        <GoogleAnalytics gaId="G-XYDWQ2QQ4R" />
        <GoogleTagManager gtmId="GTM-PKQ3DWZL" />
        {getLayout(<Component {...pageProps} />)}
        {process.env.NODE_ENV === 'production' && (
          <Script id="hotjar-script" strategy="afterInteractive">
            {`
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:5044950,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
          </Script>
        )}
      </Provider>
    </>
  );
}

export default MyApp;