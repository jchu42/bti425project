
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import App from "../app.js";

export default function Home() {



  return (
    <div className={styles.container}>
      <Head>
        <title>Aaaaa</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <App />

      {/*
      {
        (error || searchResults.length == 0)
        ?
        <>Sorry, it looks like search is not working at this time.</>
        :
        <>{searchResults.map((result, index)=>{
            // https://sentry.io/answers/unique-key-prop/
            return <span key={index}>Name: {result.Name}, Price: {result.Price}<br/></span>
        })}</>
      } */}

      
    </div>
  );
}
