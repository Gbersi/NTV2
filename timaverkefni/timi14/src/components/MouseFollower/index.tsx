"use client";

import { type ChangeEvent, useCallback, useState } from "react";

const MouseFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [listenerEnabled, setListenerEnabled] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const updatePosition = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  }, []);

  const bindMouseListener = () => {
    if (listenerEnabled) {
      setListenerEnabled(false);
      window.removeEventListener("mousemove", updatePosition);
    } else {
      setListenerEnabled(true);
      window.addEventListener("mousemove", updatePosition);
    }
  };

  const [isBlue, setIsBlue] = useState(false);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      {listenerEnabled && (
        <div
          style={{
            height: "20px",
            width: "20px",
            backgroundColor: "red",
            position: "fixed",
            borderRadius: "50%",
            top: position.y,
            left: position.x,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
        />
      )}
      <button
        style={{ border: "1px solid black" }}
        type="button"
        onClick={bindMouseListener}
      >
        Bind mouse to window!
      </button>
      <div>
        <label htmlFor="input">Input guy!</label>
        <input
          type="text"
          name="input"
          id="input"
          className="border"
          onChange={onInputChange}
        />
        <p>{inputValue}</p>
      </div>
      <div
        onFocus={() => {
          console.log(
            "random on focus requirement due to accessibility requirements"
          );
        }}
        onMouseOver={() => {
          setIsBlue(true);
        }}
        onBlur={() => {
          "random on blur requirement due to accessibility requirements";
        }}
        onMouseOut={() => {
          setIsBlue(false);
        }}
        style={{
          height: "100px",
          width: "100px",
          backgroundColor: isBlue ? "blue" : "green",
        }}
      />
    </div>
  );
};

export default MouseFollower;
