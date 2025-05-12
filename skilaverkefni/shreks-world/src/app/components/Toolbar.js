
import React from 'react';

export default function Toolbar() {
  return (
    <div style={styles.toolbar}>
      <h1 style={styles.logo}>Shrek's World</h1>
      <nav>
        <ul style={styles.navList}>
          <li><a href="/" style={styles.navLink}>Home</a></li>
          <li><a href="/characters" style={styles.navLink}>Characters</a></li>
          <li><a href="/location" style={styles.navLink}>Location</a></li>
          <li><a href="/about" style={styles.navLink}>About</a></li>
        </ul>
      </nav>
    </div>
  );
}

const styles = {
  toolbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '0px 0', 
    textAlign: 'center',
    zIndex: 1000,
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',  
  },
  logo: {
    fontSize: '1.8rem',  
    marginBottom: '5px', 
  },
  navList: {
    listStyleType: 'none',
    display: 'flex',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    margin: '0 20px',
    fontSize: '1rem', 
  },
  navLinkHover: {
    textDecoration: 'underline',
  },
};
