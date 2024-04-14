import Link from "next/link";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import styles from "../../styles/Navbar.module.css";
import { useRouter } from 'next/router'; 
import {atom, useAtom} from 'jotai';
import {loggedInAtom} from '../../login.js';

const Navbar = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
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
    handleSearch(searchQuery);
  };

  return (
    <nav className={styles.navbar}>
      <Container>
        <Row className="align-items-center">
          <Col>
            <Link href="/" passHref style={{ textDecoration: 'none' }}>
              <span className={styles.navLink}>Home</span>
            </Link>
          </Col>
          <Col xs={5}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Form onSubmit={handleSubmit} className="d-flex">
                <Form.Control
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
                  <Button variant="danger" onClick={logout}>
                    Logout
                  </Button>
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
  );
};

export default Navbar;
