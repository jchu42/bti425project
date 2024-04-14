import Link from "next/link";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import styles from "../../styles/Navbar.module.css";

const Navbar = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

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
                <Button variant="primary" href="/login">
                  Login
                </Button>
                <Button variant="primary" href="/register">
                  Register
                </Button>
              </span>
            </div>
          </Col>
        </Row>
      </Container>
    </nav>
  );
};

export default Navbar;
