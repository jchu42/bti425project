
import Head from 'next/head';
import {useAtom} from 'jotai';
import styles from '../styles/Home.module.css';
import App from "../app.js";
import { StrictMode } from 'react';
export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Explore Toronto</title>
        <title>Explore Toronto</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <StrictMode>
        <App />
      </StrictMode>
      <StrictMode>
        <App />
      </StrictMode>

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
