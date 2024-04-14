import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import {atom, useAtom} from 'jotai';
import { useEffect, useState } from "react";
import {loggedInAtom, favoritesAtom, historyAtom} from '../../user.js';

const PlaceCard = ({ result, focused }) => {

  const [favorites, setFavorites] = useAtom(favoritesAtom);
  const [history, setHistory] = useAtom(historyAtom);

  useEffect(()=>{
    if (focused){
      if (history.includes(result.ID)){
        var newHistory = [...(history.filter(ele=>ele != result.ID)), result.ID];
      }
      else
        var newHistory = [...history, result.ID]
      // axios.post('/api/updatehistory', favorites)
      fetch('/api/updatehistory', {
        method: 'POST',
        // body: {token: localStorage.getItem['token'], history},
        headers: {authorization: localStorage.getItem('token'), history:JSON.stringify(newHistory)},
      })
      setHistory(newHistory);
      localStorage.setItem('history', JSON.stringify(newHistory));
      console.log(newHistory);
    }
  }, [])

  function toggleFavorites (){
    if (favorites.includes(result.ID)){
      var newFavorites = [...(favorites.filter(ele=>ele != result.ID))]
    }
    else{
      var newFavorites = [...favorites, result.ID]
    }
    fetch('/api/updatefavorites', {
      method: 'POST',
      // body: {token: localStorage.getItem['token'], history},
      headers: {authorization: localStorage.getItem('token'), favorites:JSON.stringify(newFavorites)},
    })
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    console.log(newFavorites);
  }

  return (
    <Card style={{ width: '18rem' }}>
      <a href={result.WebsiteLink} target="_blank">
        <Card.Img
          variant="top"
          src={result.Image}
          width={200}
          height={200}
          align="center"
          style={{ objectFit: 'cover' }}
        />
      </a>
      <Card.Body>
        <Card.Title>{result.Name}</Card.Title>
        <Card.Text>{result.Description} <br /></Card.Text>
      </Card.Body>
      <Card.Footer>
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
      </Card.Footer>
    </Card>
  );
};

export default PlaceCard;
