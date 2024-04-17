import React from 'react';
import styles from '../../styles/Hero.module.css'; // Import your CSS module for styling
import {atom, useAtom} from 'jotai';
import {searchAtom} from "../../store.js"

const Hero = () => {
  const [searchQuery, setSearchQuery] = useAtom(searchAtom);

  return (
    <div className={styles.hero}>
      <img src="/hero/hero_banner.jpg" alt="Toronto skyline" className={styles.image} />
      <div className={styles.overlay}></div> {/* Overlay for text */}
      <div className={styles.text}>
        <h1>{searchQuery == ""?"Welcome to Toronto":"Search Results: " + searchQuery}</h1>
        <p>Explore the vibrant city and discover its wonders.</p>
      </div>
    </div>
  );
};

export default Hero;
