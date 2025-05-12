
import Link from 'next/link';
import Toolbar from '../components/Toolbar';

const characters = [
  { name: 'Shrek', slug: 'shrek', description: 'A beautiful ugly ogre.', image: '/images/shrek.png' },
  { name: 'Fiona', slug: 'fiona', description: 'A beautiful ogre princess.', image: '/images/fiona.jpg' },
  { name: 'Donkey', slug: 'donkey', description: 'Shrek\'s loyal friend who never shuts up.', image: '/images/donkey.png' }
];

export default function Characters() {
  return (
    <div style={styles.container}>
      <Toolbar />
      <div style={styles.cardContainer}>
        {characters.map((character) => (
          <div key={character.slug} style={styles.card}>
            <img src={character.image} alt={character.name} style={styles.cardImage} />
            <h2>{character.name}</h2>
            <p>{character.description}</p>
            <Link href={`/characters/${character.slug}`} style={styles.link}>Learn More</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: '100px', 
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    justifyItems: 'center',
    marginTop: '20px',
    maxWidth: '1000px',
  },
  card: {
    backgroundColor: '#D4EDDA',
    padding: '20px',
    width: '250px',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: 'auto',
    maxWidth: '200px',
    marginBottom: '10px',
    borderRadius: '10px',
    transition: 'transform 0.3s ease',
  },
  cardHover: {
    transform: 'scale(1.05)',
  },
  link: {
    textDecoration: 'none',
    color: '#4CAF50',
    fontWeight: 'bold',
    display: 'block',
    marginTop: '10px',
  },
};
