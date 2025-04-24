import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import '@/globals.css';
import Layout from '@/components/Layout';
import { Montserrat } from 'next/font/google'

const monserrat = Montserrat({
  weight: ['100', '200', '300','400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})



function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout className={monserrat.className}>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
