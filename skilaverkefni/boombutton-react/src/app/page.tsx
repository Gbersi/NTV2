"use client";
import React, { useState, useEffect, useRef } from 'react';

export default function HomePage() {

  const [counter, setCounter] = useState(0);
  const [step, setStep] = useState(5);
  const [limit, setLimit] = useState(35);

  const stepInputRef = useRef<HTMLInputElement>(null);
  const limitInputRef = useRef<HTMLInputElement>(null);

  
  useEffect(() => {
    const storedStep = localStorage.getItem("step");
    const storedLimit = localStorage.getItem("limit");
    if (storedStep) {
      setStep(Number(storedStep));
    }
    if (storedLimit) {
      setLimit(Number(storedLimit));
    }
  }, []);

 
  useEffect(() => {
    localStorage.setItem("step", step.toString());
    localStorage.setItem("limit", limit.toString());
  }, [step, limit]);

  const handleIncrement = () => {
    setCounter(prev => prev + step);
  };

  const handleDecrement = () => {
    setCounter(prev => prev - step);
  };


  const handleSaveSettings = () => {
    const newStep = stepInputRef.current ? Number(stepInputRef.current.value) : 5;
    const newLimit = limitInputRef.current ? Number(limitInputRef.current.value) : 35;
    setStep(newStep);
    setLimit(newLimit);
  };


  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSaveSettings();
    }
  };

  return (
    <div className="container">
      <h1>The Button Project</h1>
      <div id="counterDisplay" className="counterDisplay">
        {Math.abs(counter) > limit ? "" : counter}
      </div>
      <div id="boomMessage" className="boomMessage">
        {Math.abs(counter) > limit ? "BOOM" : ""}
      </div>
      <div className="button-container">
        <button id="increment" onClick={handleIncrement} className="btn increment-btn">
          +
        </button>
        <button id="decrement" onClick={handleDecrement} className="btn decrement-btn">
          −
        </button>
      </div>

      <hr />

      <h2>Settings</h2>
      <div className="settings">
        <div className="settings-group">
          <label htmlFor="stepInput">Step:</label>
          <input
            type="number"
            id="stepInput"
            defaultValue={step}
            ref={stepInputRef}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div className="settings-group">
          <label htmlFor="limitInput">Limit:</label>
          <input
            type="number"
            id="limitInput"
            defaultValue={limit}
            ref={limitInputRef}
            onKeyPress={handleKeyPress}
          />
        </div>
        <button id="saveSettings" onClick={handleSaveSettings} className="btn save-btn">
          Save Settings
        </button>
      </div>
    </div>
  );
}
