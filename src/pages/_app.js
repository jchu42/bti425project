import RouteGuard from './components/RouteGuard';
import Link from 'next/link'

export default function MyApp({ Component, pageProps }) {

    return (
    <RouteGuard>
        Header here
        
        <Component {...pageProps} />

        Footer Here <Link href="/contactus"> Contact Us! </Link>
    </RouteGuard>
   );
  
  }