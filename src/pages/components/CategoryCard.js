import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import {atom, useAtom} from 'jotai';
import { useEffect, useState } from "react";
import {loggedInAtom, favoritesAtom, historyAtom} from '../../user.js';
import { dataAtom, errorAtom, searchAtom } from '../../store.js';

const CategoryCard = ({ categoryInformation }) => {
    const [searchQuery, setSearchQuery] = useAtom(searchAtom);

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Text><Button onClick={()=>setSearchQuery(categoryInformation.Description)} variant="danger">{categoryInformation.Description}</Button></Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CategoryCard;
