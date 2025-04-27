import '../src/styles/globals.css';
import type { AppProps } from 'next/app';
import { CartProvider } from '../src/context/CartContext';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </CartProvider>
  );
}

export default MyApp;
