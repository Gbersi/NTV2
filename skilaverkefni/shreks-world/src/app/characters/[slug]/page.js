'use client'; 

import { useParams } from 'next/navigation'; 
import Toolbar from '../../components/Toolbar';

const characters = {
  shrek: {
    name: 'Shrek',
    description: 'A beautiful ugly ogre.',
    image: '/images/shrek.png',
    about: 'Shrek is a large, green, frightening ogre who enjoys his privacy in a swamp. Despite his intimidating appearance, he has a kind heart and a great sense of humor.',
  },
  fiona: {
    name: 'Fiona',
    description: 'A beautiful ogre princess.',
    image: '/images/fiona.jpg',
    about: 'Fiona is the beautiful princess of Farquaad’s kingdom. After being cursed, she transforms into an ogre every night, eventually finding true love with Shrek.',
  },
  donkey: {
    name: 'Donkey',
    description: 'Shrek\'s loyal friend who never shuts up.',
    image: '/images/donkey.png',
    about: 'Donkey is a lively and talkative companion to Shrek, often bringing comic relief. He is a loyal friend who helps Shrek through many challenges.',
  },
};

export default function CharacterPage() {
  const { slug } = useParams(); 

  if (!slug) {
    return <p>Loading...</p>;
  }

  const character = characters[slug];

  if (!character) {
    return <p>Character not found!</p>;
  }

  return (
    <div>
      <Toolbar />
      <div style={styles.container}>
        <h1>{character.name}</h1>
        <img src={character.image} alt={character.name} style={styles.image} />
        <p>{character.about}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: '300px',
    height: 'auto',
    borderRadius: '10px',
    marginBottom: '20px',
  },
};
