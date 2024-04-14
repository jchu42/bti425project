import RouteGuard from "./components/RouteGuard";
import Navbar from "./components/Navbar";
import Link from "next/link";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import { dataAtom, errorAtom } from "../store.js";
import getSearch from "../search.js";
import "bootstrap/dist/css/bootstrap.min.css";
export default function MyApp({ Component, pageProps }) {
  const [searchResults, setSearchResults] = useAtom(dataAtom);
  const [error, setError] = useAtom(errorAtom);

  const [searchQuery, setSearchQuery] = useState("");

  //var searchQuery = "";

  // initial search
  useEffect(doSearch, []); //https://www.freecodecamp.org/news/prevent-infinite-loops-when-using-useeffect-in-reactjs/#:~:text=useEffect%20checks%20if%20the%20dependencies,if%20state%20is%20being%20updated.

  // button search
  async function handleSubmit(e) {
    e.preventDefault();
    doSearch();
  }

  function doSearch() {
    var data = getSearch(searchQuery);
    setError(data == "Error");
    setSearchResults(data);
    // fetch(`api/search?search=${searchQuery}`, {
    //   method: "GET"
    // }).then(res=>{
    //   if (!res.ok){
    //     return "Error"
    //   }
    //   return res.json()
    // }).then(data=>{
    //   setError(data == "Error");
    //   setSearchResults(data.message)
    // })
  }

  return (
    <>
      <RouteGuard>
      <Navbar />
      <Component {...pageProps} />
      <footer>Footer Here</footer>
      </RouteGuard>
    </>
  );
}
