import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import {atom, useAtom} from 'jotai';
import { useEffect, useState } from "react";
import {loggedInAtom, favoritesAtom, historyAtom} from '../../user.js';
import { dataAtom, errorAtom, searchAtom } from '../../store.js';

import styles from '../../styles/CategoryCard.module.css';

const CategoryCard = ({ categoryInformation }) => {
    const [searchQuery, setSearchQuery] = useAtom(searchAtom);

  return (
    <Card className={styles.card}>
      <div className={styles.imageContainer}>
          <img
            src={categoryInformation.Image}
            alt={categoryInformation.description}
            className={styles.image}
          />
        </div>
      <Card.Body className="d-flex flex-column justify-content-center align-items-center">
        <Card.Text><Button onClick={()=>setSearchQuery(categoryInformation.Description)} variant="danger">{categoryInformation.Description}</Button></Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CategoryCard;
