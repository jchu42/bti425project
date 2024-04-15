import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import {atom, useAtom} from 'jotai';
import { useEffect, useState } from "react";
import {loggedInAtom, favoritesAtom, historyAtom} from '../../user.js';
import { dataAtom, errorAtom, searchAtom } from '../../store.js';

const CategoryCard = ({ categoryInformation }) => {
    const [searchQuery, setSearchQuery] = useAtom(searchAtom);

  return (
    <Card style={{ width: '18rem' }}>
      {/* <a href={result.WebsiteLink} target="_blank">
        <Card.Img
          variant="top"
          src={result.Image}
          width={200}
          height={200}
          align="center"
          style={{ objectFit: 'cover' }}
        />
      </a> */}
      <Card.Body>
        {/* <Card.Title>{result.Name}</Card.Title> */}
        <Card.Text><Button onClick={()=>setSearchQuery(categoryInformation.Description)} variant="danger">{categoryInformation.Description}</Button></Card.Text>
      </Card.Body>
      {/* <Card.Footer>
        Price: {result.Price === 0 ? <>Free</> : <>${result.Price.toFixed(2)}</>}
        {
          focused?
          <> 
            <Button onClick={toggleFavorites} style={{ float: 'right' }}>
              {
                favorites.includes(result.ID)?
                "Remove":"Add"
              }
            </Button>
          </>
          :
          <Link href={`/places/${result.ID}`}>
              <Button variant="btn btn-danger" style={{ float: 'right' }}>
                Go Here
              </Button>
          </Link>
        }
      </Card.Footer> */}
    </Card>
  );
};

export default CategoryCard;
