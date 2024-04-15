import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useAtom } from 'jotai';
import Head from 'next/head';
import { dataAtom, errorAtom } from '../store.js';
import Link from 'next/link';
import PlaceCard from './components/PlacesCard.js';
import Pagination from './components/Pagination.js';
import {loggedInAtom, favoritesAtom, historyAtom} from '../user.js';
import getSearch from "../search.js";

export default function History() {
//   const [searchResults, setSearchResults] = useAtom(dataAtom);
  const [error, setError] = useAtom(errorAtom);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [subsetSearchResults, setSubsetSearchResults] = useState([]);

  const [favorites, setFavorites] = useAtom(favoritesAtom);
  const [history, setHistory] = useAtom(historyAtom);

  const [detailedHistory, setDetailedHistory] = useState([]);

  const CARDS_PER_PAGE = 4;

  useEffect(()=>{
    setDetailedHistory([])
    getPlaces(history)
  }, [])

  async function getPlaces(history){
    console.log(history);
    var places = []
    for (var ele of history){
        console.log(ele);
        places.push(...(await getSearch(ele)));
    }
    setDetailedHistory(places.reverse()); // most recent to the front of the list
  }

  useEffect(() => {

    if (detailedHistory && detailedHistory.length > 0) {
      const totalPages = Math.ceil(detailedHistory.length / CARDS_PER_PAGE);
      setPages(Array.from({ length: totalPages }, (_, index) => index + 1));
      changePage(1); // when search results are initially loaded, set current page to page 1.
    }
  }, [detailedHistory]); // reload search results when new search results are given

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
    const startIndex = (pageNumber - 1) * CARDS_PER_PAGE;
    const endIndex = Math.min(pageNumber * CARDS_PER_PAGE, detailedHistory.length);
    setSubsetSearchResults(detailedHistory.slice(startIndex, endIndex));
  };


  return (
    <div>
      <Head>
        <title>History</title>
      </Head>
      {subsetSearchResults.length === 0 ? (
        <>No history yet.</>
      ) : (
        <Container>
          <Row>
            <h1>History</h1>
            {subsetSearchResults.map((result, index) => (
              <Col
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'stretch',
                }}
                key={`card${index}`}
              >
                <PlaceCard result={result} focused={false} />
              </Col>
            ))}
          </Row>
        </Container>
      )}

      {pages.length > 0 && (
        <Pagination pages={pages} currentPage={currentPage} changePage={changePage} />
      )}
    </div>
  );
}
