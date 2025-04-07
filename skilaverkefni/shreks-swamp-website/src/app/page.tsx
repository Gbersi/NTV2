"use client";

import React, { useState, useEffect, useRef } from "react";

export default function Page() {
  const shrekQuotes = [
    "Ogres are like onions... they have layers!",
    "What are you doing in my swamp?",
    "I'm like a crackin' onion!",
    "Better out than in, I always say!",
    "Donkey, I'm warning you!",
    "This is the part where you run away.",
    "Get out of my swamp!",
    "Not the gumdrop buttons!",
    "That'll do, Donkey. That'll do.",
    "I'm an ogre!",
    "You know what? I like my swamp just the way it is.",
    "Sometimes, you just have to be yourself.",
    "If you can't handle the swamp, get out!",
    "Life's too short to worry about others.",
    "I may be an ogre, but I've got a heart.",
    "Don't judge a book by its cover.",
    "Sometimes the best things in life are messy.",
    "You never know what's beneath the surface.",
    "Embrace your layers!",
    "Stay true to who you are."
  ];


  const [currentQuote, setCurrentQuote] = useState("");


  const [titleHover, setTitleHover] = useState(false);

  
  const [typedValue, setTypedValue] = useState("");
  const [lastKey, setLastKey] = useState("");

 
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [shrekPos, setShrekPos] = useState({ x: 0, y: 0 });
  const [shrekHover, setShrekHover] = useState(false);

 
  const [donkeyHover, setDonkeyHover] = useState(false);

  const [volume, setVolume] = useState(0.5);


  const [mudVisible, setMudVisible] = useState(false);


  const laughAudioRef = useRef<HTMLAudioElement>(null);
  const shrekHoverAudioRef = useRef<HTMLAudioElement>(null);
  const donkeyHoverAudioRef = useRef<HTMLAudioElement>(null);

  
  useEffect(() => {
    const initialX = window.innerWidth / 2 - 75; 
    setShrekPos({ x: initialX, y: 20 });
  }, []);

  const handleClickForQuote = () => {
    const randomIndex = Math.floor(Math.random() * shrekQuotes.length);
    setCurrentQuote(shrekQuotes[randomIndex]);
    if (laughAudioRef.current) {
      laughAudioRef.current.volume = volume;
      laughAudioRef.current.currentTime = 0;
      laughAudioRef.current.play();
    }
  };

  
  const handleThrowMud = () => {
    setMudVisible(true);
    setTimeout(() => {
      setMudVisible(false);
    }, 2000); 
  };

  
  const handleShrekMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - shrekPos.x,
      y: e.clientY - shrekPos.y
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setShrekPos({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragStart]);

  
  const handleTypedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypedValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setLastKey(e.key);
  };

  return (
    <>
     
      <audio ref={laughAudioRef} src="/gumbuttons.mp3" />
      <audio ref={shrekHoverAudioRef} src="/following.mp3" />
      <audio ref={donkeyHoverAudioRef} src="/ohpickme.mp3" loop />

      
      <button className="mud-button" onClick={handleThrowMud}>
        Throw Mud
      </button>
      
      {mudVisible && <img src="/mud.jpg" alt="Mud" className="mud" />}

  
      <img
        src="/shrek.jpg"
        alt="Shrek"
        className="shrek circular"
        style={{
          left: shrekPos.x,
          top: shrekPos.y,
          transform: shrekHover ? "scale(1.1)" : "scale(1)"
        }}
        onMouseEnter={() => {
          setShrekHover(true);
          if (shrekHoverAudioRef.current) {
            shrekHoverAudioRef.current.volume = volume;
            shrekHoverAudioRef.current.currentTime = 0;
            shrekHoverAudioRef.current.play();
          }
        }}
        onMouseLeave={() => setShrekHover(false)}
        onMouseDown={handleShrekMouseDown}
      />

      
      <h1
        className="title"
        style={{ color: titleHover ? "#6aba6a" : "darkgreen" }}
        onMouseEnter={() => setTitleHover(true)}
        onMouseLeave={() => setTitleHover(false)}
      >
        Welcome to Shrek's Swamp!
      </h1>

   
      {currentQuote && (
        <p style={{ fontStyle: "italic", fontWeight: "bold" }}>
          &quot;{currentQuote}&quot;
        </p>
      )}

     
      <input type="text" className="input" placeholder="donkey?" />

   
      <button className="button" onClick={handleClickForQuote}>
        Click Me for a Shrek Quote!
      </button>

    
      <input
        type="text"
        className="input"
        placeholder="Shrek!!"
        onChange={handleTypedChange}
        onKeyDown={handleKeyDown}
      />

      
      <div className="info-box">
        <p>
          You typed: <strong>{typedValue}</strong>
        </p>
        <p>
          Last key pressed: <strong>{lastKey}</strong>
        </p>
      </div>

     
      <img
        src="/donkey.jpg"
        alt="Donkey"
        className="donkey circular"
        style={{
          transform: donkeyHover ? "rotate(90deg)" : "rotate(0deg)",
          marginTop: "40px"
        }}
        onMouseEnter={() => {
          setDonkeyHover(true);
          if (donkeyHoverAudioRef.current) {
            donkeyHoverAudioRef.current.volume = volume;
            donkeyHoverAudioRef.current.currentTime = 0;
            donkeyHoverAudioRef.current.play();
          }
        }}
        onMouseLeave={() => {
          setDonkeyHover(false);
          if (donkeyHoverAudioRef.current) {
            donkeyHoverAudioRef.current.pause();
            donkeyHoverAudioRef.current.currentTime = 0;
          }
        }}
      />

    
      <div className="volume-control">
        <label htmlFor="volumeControl">Volume:</label>
        <input
          type="range"
          id="volumeControl"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          aria-label="Sound effects volume"
        />
      </div>
    </>
  );
}
