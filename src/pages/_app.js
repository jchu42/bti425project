import RouteGuard from './components/RouteGuard';

export default function MyApp({ Component, pageProps }) {

    return (
    <RouteGuard>
        Header here
        <Component {...pageProps} />
        Footer here
    </RouteGuard>
   );
  
  }