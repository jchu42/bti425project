import Link from "next/link";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import styles from "../../styles/Navbar.module.css";
import { useRouter } from 'next/router'; 
import {atom, useAtom} from 'jotai';
import {loggedInAtom} from '../../user.js';
import {searchAtom} from '../../store.js';
import Dropdown from 'react-bootstrap/Dropdown';

const Navbar = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useAtom(searchAtom);
  const [tempSearchQuery, setTempSearchQuery] = useState("");
  const [loggedIn, setLoggedIn] = useAtom(loggedInAtom);
  const [successMessage, setSuccessMessage] = useState(null);
  const router = useRouter();

  useEffect(()=>{
    setLoggedIn (localStorage.getItem('token'));
  }, [])


  // Function to handle form submission
  const logout = async () => {
      setSuccessMessage("Logout Successful"); // Set success message
      localStorage.removeItem('token'); // Delete token in local storage
      setTimeout(() => {
        setLoggedIn(false)
          router.push('/');
      }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(tempSearchQuery)
  };

  useEffect(()=>{
    setTempSearchQuery(searchQuery);
    handleSearch(searchQuery);
  }, [searchQuery])

  return (
    <header style={{position:"sticky", top: 0, width:"100%", zIndex:"1"}}>
      <nav className={styles.navbar}>
        <Container>
          <Row className="align-items-center">
            <Col>
              <Link href="/" onClick={()=>setSearchQuery("")} passHref style={{ textDecoration: 'none' }}>
                <span className={styles.navLink}>Home</span>
              </Link>
            </Col>
            <Col xs={5}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Form onSubmit={handleSubmit} className="d-flex">
                  <Form.Control
                    type="text"
                    value={tempSearchQuery}
                    onChange={(e) => setTempSearchQuery(e.target.value)}
                    placeholder="Search"
                    className={styles.searchInput}
                  />
                  <Button
                    type="submit"
                    style={{ marginLeft: "10px" }}
                    variant="primary"
                  >
                    Search
                  </Button>
                </Form>
                <span style={{ display: 'grid',gridTemplateColumns: "1fr 1fr", gap: "20px"}}>
                  {
                    loggedIn?<>
                      {/* <Button variant="danger" onClick={logout}>
                        Logout
                      </Button> */}
                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          Account
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item onClick={()=>router.push("/history")}>History</Dropdown.Item>
                          <Dropdown.Item onClick={()=>router.push("/favorites")}>Favorites</Dropdown.Item>
                          <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      {successMessage && <Alert variant="success" style={{ position: "fixed" }}>{successMessage}</Alert>} {/* Display success message */}
                    </>
                    :
                    <>
                      <Button variant="primary" href="/login">
                        Login
                      </Button>
                      <Button variant="primary" href="/register">
                        Register
                      </Button>
                    </>
                  }
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </nav>
    </header>
  );
};

export default Navbar;
