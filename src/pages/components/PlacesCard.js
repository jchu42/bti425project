import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';

const PlaceCard = ({ result }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <a href={result.WebsiteLink} target="_blank">
        <Card.Img
          variant="top"
          src={result.Image}
          width={200}
          height={200}
          align="center"
          style={{ objectFit: 'cover' }}
        />
      </a>
      <Card.Body>
        <Card.Title>{result.Name}</Card.Title>
        <Card.Text>{result.Description} <br /></Card.Text>
      </Card.Body>
      <Card.Footer>
        Price: {result.Price === 0 ? <>Free</> : <>${result.Price.toFixed(2)}</>}
        <Link href={`/places/${result.ID}`}>
          <Button variant="primary" style={{ float: 'right' }}>
            Go somewhere
          </Button>
        </Link>
      </Card.Footer>
    </Card>
  );
};

export default PlaceCard;
