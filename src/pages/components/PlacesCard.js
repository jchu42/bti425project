import React from "react";
import { Card, Button } from "react-bootstrap";
import Link from "next/link";
import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import { loggedInAtom, favoritesAtom, historyAtom } from "../../user.js";

import styles from "../../styles/PlaceCard.module.css";

const PlaceCard = ({ result, focused }) => {
  const [favorites, setFavorites] = useAtom(favoritesAtom);
  const [history, setHistory] = useAtom(historyAtom);

  useEffect(() => {
    if (focused) {
      if (history.includes(result.ID)) {
        var newHistory = [
          ...history.filter((ele) => ele != result.ID),
          result.ID,
        ];
      } else var newHistory = [...history, result.ID];
      // axios.post('/api/updatehistory', favorites)
      fetch("/api/updatehistory", {
        method: "POST",
        // body: {token: localStorage.getItem['token'], history},
        headers: {
          authorization: localStorage.getItem("token"),
          history: JSON.stringify(newHistory),
        },
      });
      setHistory(newHistory);
      localStorage.setItem("history", JSON.stringify(newHistory));
      console.log("History: ", newHistory);
    }
  }, []);

  function toggleFavorites() {
    if (favorites.includes(result.ID)) {
      var newFavorites = [...favorites.filter((ele) => ele != result.ID)];
    } else {
      var newFavorites = [...favorites, result.ID];
    }
    fetch("/api/updatefavorites", {
      method: "POST",
      // body: {token: localStorage.getItem['token'], history},
      headers: {
        authorization: localStorage.getItem("token"),
        favorites: JSON.stringify(newFavorites),
      },
    });
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    console.log("Favorites: ", newFavorites);
  }

  return (
    <Card className={`${styles.card} ${focused ? styles.focusedCard : ""}`}>
      <div className={styles.imageContainer}>
        <Card.Img
          // variant="top"
          src={result.Image}
          height={focused ? 300 : 200}
          align="center"
          style={{ objectFit: "cover" }}
        />
        <div className={styles.overlay}></div>
      </div>
      <Card.Body>
        <Card.Title>{result.Name}</Card.Title>
        {result.Discontinued ? (
          <Card.Text style={{ color: "red" }}>Discontinued!</Card.Text>
        ) : (
          <></>
        )}
        <Card.Text>
          {result.Description} <br />
        </Card.Text>
        {focused ? (
          <>
            <Card.Text>Open: {result["Times of Operation"]}</Card.Text>
            <Card.Text style={{ display: 'flex', justifyContent: 'space-between' }}>
                <a href={result["Website link"]} target="_blank" style={{ color: 'red' }}>
                  Website
                </a>
                <a
                  href={
                    "https://www.google.com/maps/@" +
                    result.Location.latitude +
                    "," +
                    result.Location.longitude +
                    ",20z?entry=ttu"
                  }
                  target="_blank"
                  style={{ color: 'red' }}
                >
                  Google Maps
                </a>
              </Card.Text>
          </>
        ) : (
          <></>
        )}
      </Card.Body>
      <Card.Footer>
        Price:{" "}
        {result.Price === 0 ? <>Free</> : <>${result.Price.toFixed(2)}</>}
        {focused ? (
          <>
            {favorites.includes(result.ID) ? (
              <Button
                onClick={toggleFavorites}
                style={{ float: "right" }}
                variant="warning"
              >
                Remove from Favorites
              </Button>
            ) : (
              <Button
                onClick={toggleFavorites}
                style={{ float: "right" }}
                variant="success"
              >
                Add to Favorites
              </Button>
            )}
          </>
        ) : (
          <Link href={`/places/${result.ID}`}>
            <Button variant="danger" style={{ float: "right" }}>
              Details
            </Button>
          </Link>
        )}
      </Card.Footer>
    </Card>
  );
};

export default PlaceCard;
