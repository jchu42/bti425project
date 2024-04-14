import { Card, Form, Alert, Button, Container, Row, Col, Dropdown } from "react-bootstrap";
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import places from "../../places.js"
import Link from 'next/link';
import PlaceCard from '../components/PlacesCard.js';


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
        <div>
        <Container><Row>
            <Col
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'stretch',
                }}
              >
            <PlaceCard result={props.place} focused={true} />
            </Col>
        </Row></Container>
        </div>
    );
}
