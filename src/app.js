import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { dataAtom, errorAtom, searchAtom } from './store.js';
import Link from 'next/link';
import PlaceCard from './pages/components/PlacesCard.js';
import Pagination from './pages/components/Pagination.js';

export default function App() {
  const [searchQuery, setSearchQuery] = useAtom(searchAtom);
  const [searchResults, setSearchResults] = useAtom(dataAtom);
  const [error, setError] = useAtom(errorAtom);
  const [currentPage, setCurrentPage] = useState(1);

  const CARDS_PER_PAGE = 4;

  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      const totalPages = Math.ceil(searchResults.length / CARDS_PER_PAGE);
      setPages(Array.from({ length: totalPages }, (_, index) => index + 1));
      changePage(1); // when search results are initially loaded, set current page to page 1.
    }
  }, [searchResults]); // reload search results when new search results are given

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
    const startIndex = (pageNumber - 1) * CARDS_PER_PAGE;
    const endIndex = Math.min(pageNumber * CARDS_PER_PAGE, searchResults.length);
    setSubsetSearchResults(searchResults.slice(startIndex, endIndex));
  };

  const [pages, setPages] = useState([]);
  const [subsetSearchResults, setSubsetSearchResults] = useState([]);

  return (
    <div>
      {error || subsetSearchResults.length === 0 ? (
        <>Sorry, it looks like search is not working at this time.</>
      ) : (
        <Container>
          <Row>
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

      {!error && pages.length > 0 && (
        <Pagination pages={pages} currentPage={currentPage} changePage={changePage} />
      )}
    </div>
  );
}
