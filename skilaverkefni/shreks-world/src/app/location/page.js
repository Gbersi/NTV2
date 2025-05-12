
import Toolbar from '../components/Toolbar';

export default function Location() {
  return (
    <div>
      <Toolbar />
      <div style={styles.container}>
        <h1>Shrek's Swamp Location</h1>
        <p style={styles.description}>Welcome to Shrek's real swamp, nestled deep in the enchanted forest. It’s the perfect place to escape the hustle and bustle of the city and enjoy some peace and quiet. Avoid the knights, and beware of loud donkeys!</p>
        <div style={styles.mapContainer}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3873.0149502800787!2d33.779897274676905!3d-13.89805417912703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1921d573db2f0e31%3A0x8cba6e9816235e1!2sShreaks%20real%20swamp!5e0!3m2!1sis!2sis!4v1747071114449!5m2!1sis!2sis" 
            width="800" 
            height="450" 
            style={styles.iframe}
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  description: {
    fontSize: '1.5rem',
    marginBottom: '20px',
    lineHeight: '1.6',
  },
  mapContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iframe: {
    border: '0',
  },
};
