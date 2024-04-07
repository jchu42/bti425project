

export default function MyApp({ Component, pageProps }) {

    return (
    <>
        Header here
        <Component {...pageProps} />
        Footer here
    </>
   );
  
  }