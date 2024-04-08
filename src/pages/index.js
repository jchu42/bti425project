import { Card, Form, Alert, Button } from "react-bootstrap";
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {useAtom} from 'jotai';
import { useState, useEffect } from "react";
import App from "../app.js";
import {dataAtom, errorAtom} from '../store.js';

export default function Home() {

  const [searchResults, setSearchResults] = useAtom(dataAtom);
  const [error, setError] = useAtom(errorAtom);

  const [searchQuery, setSearchQuery] = useState("");

  //var searchQuery = "";

  // initial search
  useEffect(doSearch, []) //https://www.freecodecamp.org/news/prevent-infinite-loops-when-using-useeffect-in-reactjs/#:~:text=useEffect%20checks%20if%20the%20dependencies,if%20state%20is%20being%20updated.

  // button search
  async function handleSubmit(e) {
    e.preventDefault();
    doSearch();
  }

  function doSearch() {
    fetch(`api/search?search=${searchQuery}`, {
      method: "GET"
    }).then(res=>{
      if (!res.ok){
        return "Error"
      }
      return res.json()
    }).then(data=>{
      setError(data == "Error");
      setSearchResults(data.message)
    })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Aaaaa</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Form onSubmit={handleSubmit}> {/* search should be moved to header */}
        {/* <Form.Label>Search: </Form.Label> */}
        <Form.Control type="text" value={searchQuery} id="search" name="search" onChange={e=>setSearchQuery(e.target.value)} />
        <Button variant="primary" className="pull-right" type="submit">Search</Button>
      </Form>

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

      
      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
