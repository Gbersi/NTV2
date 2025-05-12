
import Toolbar from '../components/Toolbar';

export default function About() {
  return (
    <div>
      <Toolbar />
      <div style={styles.container}>
        <h1>About Shrek's Universe</h1>
        <p style={styles.description}>Shrek's universe is a magical world filled with love, laughter, and a whole lot of mud. From the swampy bogs to the grand castles, every corner of this universe has its own unique charm. Join Shrek, Fiona, Donkey, and their friends on unforgettable adventures full of fun and heart!</p>
        <p style={styles.moreInfo}>Shrek’s journey from an isolated ogre to a beloved hero is full of comedic moments and profound lessons about friendship, love, and the importance of being yourself.</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto',
  },
  description: {
    fontSize: '1.5rem',
    marginBottom: '20px',
    lineHeight: '1.6',
  },
  moreInfo: {
    fontSize: '1.2rem',
    fontStyle: 'italic',
    marginTop: '20px',
  },
};
