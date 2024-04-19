import RouteGuard from "./components/RouteGuard";
import Navbar from "./components/Navbar";
import Link from "next/link";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import { dataAtom, errorAtom } from "../store.js";
import getSearch from "../search.js";
import {loggedInAtom, favoritesAtom, historyAtom} from '../user.js';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from "../styles/Navbar.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function MyApp({ Component, pageProps }) {
  const [searchResults, setSearchResults] = useAtom(dataAtom);
  const [error, setError] = useAtom(errorAtom);
  const [favorites, setFavorites] = useAtom(favoritesAtom);
  const [history, setHistory] = useAtom(historyAtom);

  // const [searchQuery, setSearchQuery] = useState("");

  //var searchQuery = "";
  useEffect(()=>{
    // when refreshsed
    if (localStorage.getItem("token")){
      fetch('/api/authenticated', {
        method: 'POST',
        headers: {authorization: localStorage.getItem('token')},
      }).then(res=>{
        if (res.ok){
          try{
            setFavorites(JSON.parse(localStorage.getItem('favorites')));
            setHistory(JSON.parse(localStorage.getItem('history')));
          }
          catch {
            console.log ("Oopsie");
          }
        }
        else{
          // invalid token
          localStorage.removeItem('token')
          localStorage.setItem('favorites', [])
          localStorage.setItem('history', [])
        }
      })
    }
    else{
      console.log("no token")
    }

  }, [])

  // initial search
  useEffect(doSearch, []); //https://www.freecodecamp.org/news/prevent-infinite-loops-when-using-useeffect-in-reactjs/#:~:text=useEffect%20checks%20if%20the%20dependencies,if%20state%20is%20being%20updated.

  // button search
//   async function handleSubmit(e) {
//     e.preventDefault();
//     doSearch();
//   }

  function doSearch(query) {
    var data = getSearch(query);
    setError(data == "Error");
    setSearchResults(data);
  }

  return (
    <>
      <RouteGuard>
        <Navbar handleSearch={doSearch}/>
        <Component {...pageProps} />
        <div style={{padding: "40px"}}></div> {/* Padding takes into account footer height */}
        <footer style={{ position: "fixed", bottom: 0, width:"100%" }}>
          <nav className={styles.navbar}>
            <Container style={{ height: '37px'}}>
              <span style={{color:"white"}}>&copy;Almas Zahra and Joseph Chu 2024</span>
              <Button href="/contactus" variant="warning" style={{ float: 'right' }}>Contact Us</Button>
            </Container>
          </nav>
        </footer> 
      </RouteGuard>
    </>
  );
}
