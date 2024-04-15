
import Head from 'next/head';
import {useAtom} from 'jotai';
import styles from '../styles/Home.module.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import App from "../app.js";
import { StrictMode } from 'react';
import categories from "../categories.js"
import CategoryCard from './components/CategoryCard.js'
import { dataAtom, errorAtom } from '../store.js';
import {searchAtom} from '../store.js';

export default function Home() {
  const [searchQuery, setSearchQuery] = useAtom(searchAtom);

  return (
    <>
      <Head>
        <title>Explore Toronto</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <StrictMode>
        {
          searchQuery == ""?
            <div>
            <Container>
              <Row>
                <h1>Categories</h1>
                {categories.map((res, index)=>(
                  <Col style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'stretch',
                    }}
                    key={`card${index}`}>
                    <CategoryCard categoryInformation={res}></CategoryCard>
                  </Col>
                ))}
              </Row>
            </Container>
          </div>
          :
          <App />
        }
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

      
    </>
  );
}
