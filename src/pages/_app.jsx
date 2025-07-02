import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import '@/globals.css';
import Layout from '@/components/Layout';
import { Montserrat, Sofia_Sans_Condensed } from 'next/font/google';
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google'

const monserrat = Sofia_Sans_Condensed({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* Tu estructura existente de la aplicación */}
      <Provider store={store}>
        <Layout className={monserrat.className} pageProps={pageProps}>
        {/* <GoogleAnalytics gaId="G-XYDWQ2QQ4R" />
        <GoogleTagManager gtmId="GTM-PKQ3DWZL" /> */}
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}

export default MyApp;