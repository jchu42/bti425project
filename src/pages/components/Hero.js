import React from 'react';
import styles from '../../styles/Hero.module.css'; // Import your CSS module for styling

const Hero = () => {
  return (
    <div className={styles.hero}>
      <img src="/hero/hero_banner.jpg" alt="Toronto skyline" className={styles.image} />
      <div className={styles.overlay}></div> {/* Overlay for text */}
      <div className={styles.text}>
        <h1>Welcome to Toronto</h1>
        <p>Explore the vibrant city and discover its wonders.</p>
      </div>
    </div>
  );
};

export default Hero;
