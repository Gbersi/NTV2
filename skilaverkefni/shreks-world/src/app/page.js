
'use client';

import React from 'react';
import Toolbar from './components/Toolbar';
import Particles from 'react-tsparticles';

export default function Home() {
  return (
    <div style={styles.container}>
      <Toolbar />
      <Particles
        options={{
          fullScreen: { enable: true, zIndex: -1 },
          particles: {
            number: { value: 50 },
            size: { value: 5 },
            opacity: { value: 0.5 },
            links: { enable: true, distance: 150, color: "#4CAF50", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: "none" },
          },
        }}
      />
      <div style={styles.landing}>
        <h1 style={styles.title}>Welcome to Shrek's World!</h1>
        <p style={styles.description}>Step into the swamp and join Shrek, Fiona, and all their friends on unforgettable adventures!</p>
        <div style={styles.buttonContainer}>
          <a href="/characters" style={styles.button}>Start Your Adventure</a>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    backgroundImage: 'url("https://media.cnn.com/api/v1/images/stellar/prod/230927073206-01-shrek-swamp-airbnb.jpg?c=16x9")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
  },
  landing: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '20px',
    borderRadius: '15px',
    maxWidth: '800px',
    margin: 'auto',
    paddingTop: '100px', 
  },
  title: {
    fontSize: '2.5rem',
    margin: '0',
  },
  description: {
    fontSize: '1.2rem',
    margin: '20px 0',
    lineHeight: '1.6',
  },
  buttonContainer: {
    marginTop: '20px',
  },
  button: {
    padding: '12px 24px',
    backgroundColor: '#4CAF50',
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.2rem',
    borderRadius: '5px',
  },
};
