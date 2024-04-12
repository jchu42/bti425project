import { Card, Form, Alert, Button, Container, Row, Col, Dropdown } from "react-bootstrap";
import RouteGuard from './components/RouteGuard';
import Link from 'next/link'
import {useAtom} from 'jotai';
import { useState, useEffect } from "react";
import {dataAtom, errorAtom} from '../store.js';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MyApp({ Component, pageProps }) {

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
    <RouteGuard>
        <Container>
            <Row>
                <Col><Link href="/">Home</Link></Col>
                <Col>
                    <Form className='d-flex' onSubmit={handleSubmit}>
                        <Form.Control type="text" value={searchQuery} id="search" name="search" onChange={e=>setSearchQuery(e.target.value)} />
                        <Button variant="primary" className="pull-right">Search</Button>
                    </Form>
                </Col>
                <Col>
                    {/* Login / is logged in things */}
                    {/* login token ? */}<Link href="/login">Login</Link>{/* : */}
                    {/* <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Profile
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown> */}

                </Col>
            </Row>
        </Container>
        
        
        <Component {...pageProps} />

        Footer Here <Link href="/contactus"> Contact Us! </Link>

    </RouteGuard>
   );
  
  }