import { Card, Form, Alert, Button, Container, Row, Col, Dropdown } from "react-bootstrap";
import {useAtom} from 'jotai';
import {dataAtom, errorAtom} from './store.js';
import { useState, useEffect } from "react";

export default function App() {
    /*
    "All of your store’s dynamic content will be written in JavaScript in the `src/app.js` file. 
    Using JS, you can display the product/service data from a JS array into a proper format on the page (like using table)" 
    */

    const [searchResults, setSearchResults] = useAtom(dataAtom);
    const [error, setError] = useAtom(errorAtom);

    const CARDS_PER_PAGE = 4;

    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [subsetSearchResults, setSubsetSearchResults] = useState([]);
    
    useEffect(()=>{
        if (searchResults.length > 0){
            var pag = [];
            for(var i = 1; i <= Math.ceil(searchResults.length / CARDS_PER_PAGE); ++i){
                pag.push(i);
            }
            setPages(pag);

            changePage(1); // when search results are initially loaded, set current page to page 1. 
        }
    }, [searchResults]) // reload search results when new search results are given

    function changePage(pageNumber){ 
        // could also be useEffect with on pageNumber change, 
        //  but this allows the function to be called even when the page number doesn't change
        //  (currentPage 1->1 doesn't trigger useEffect since it doesn't change, 
        //   resuulting in the search results' page 1 not being reloaded when there's a new search)
        setCurrentPage(pageNumber);

        var subsetRes = [];
        for (var i = (pageNumber - 1)*CARDS_PER_PAGE; i < Math.min((pageNumber) * CARDS_PER_PAGE, searchResults.length); ++i){
            subsetRes.push(searchResults[i]);
        }

        setSubsetSearchResults(subsetRes);
    }

    return (
        <div>
        {
            (error || subsetSearchResults.length == 0)
            ?
            <>Sorry, it looks like search is not working at this time.</>
            :
            <Container><Row>{subsetSearchResults.map((result, index)=>{
                // https://sentry.io/answers/unique-key-prop/

                return <Col key={"card" + index}><Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={result.Image} />
                    <Card.Body>
                        <Card.Title>{result.Name}</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card></Col>
            })}</Row></Container>
        }

        {
            (error || pages.length == 0)
            ?
            <></>
            :
            <Container><Row><Col>{pages.map((result, index)=>{
                return <button key={"pageButton" + index} onClick={()=>changePage(result)}>{result==currentPage?<b><i><u>{result}</u></i></b>:<>{result}</>}</button>
            })}</Col></Row></Container>
        }
        </div>
    );
}