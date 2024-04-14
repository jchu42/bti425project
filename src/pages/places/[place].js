import { Card, Form, Alert, Button, Container, Row, Col, Dropdown } from "react-bootstrap";
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import places from "../../places.js"
import Link from 'next/link'
import App from "../../app.js";

export async function getStaticPaths() {
    const paths = places.map((place)=>({
        params: {place: place.ID}
    }));
    return {
        paths, fallback: false
    }
}

export async function getStaticProps(context) {
    const data = places.find(place=>place.ID == context.params.place)
    return { props: { place: data } }
}

export default function Place(props) {
    const result= props.place;

    return (
        <div className={styles.container}>
            <Card style={{ width: '18rem' }}>
                <a href={result.WebsiteLink} target="_blank"><Card.Img variant="top" src={result.Image}  width={200} height={200} align="center" style={{ "object-fit": "cover"}}/></a>
                <Card.Body>
                    <Card.Title>{result.Name}</Card.Title>
                    <Card.Text>
                        {result.Description} <br />
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    Price: {result.Price == 0?<>Free</>:<>${result.Price.toFixed(2)}</>}
                    <Link href={"/places/" + result.ID}><Button variant="primary" style={{"float": "right"}}>Go somewhere</Button></Link>
                </Card.Footer>
            </Card>
        </div>
    );
}
