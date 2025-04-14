"use client";

import Counter from "@/components/Counter";
import MouseFollower from "@/components/MouseFollower";
import { themeProps } from "@/constants/theme";
import type { ThemeType } from "@/types/types";
import { useState } from "react";

// ComponentNames: PascalCase
// propsNames: camelCase (except when the property is an actual Component itself)

const HelloWorldTempComponent = () => {
  return <p>Hello world!</p>;
};

const Home = () => {
  const [theme, setTheme] = useState<ThemeType>("dark");

  const onThemeToggle = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  const [inputValue, setInputValue] = useState<string>("");
  console.log("rendering");

  return (
    <div
      className={`${themeProps[theme].mainBackground} ${themeProps[theme].text} p-20`}
    >
      <Counter theme={theme} defaultCount={10} />
      <button
        type="button"
        onClick={onThemeToggle}
        className={
          theme === "light"
            ? themeProps.light.mainBackground
            : themeProps.dark.mainBackground
        }
      >
        {theme === "light" ? "☀️" : "🌗"} Toggle theme
      </button>
      <input
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <p>{inputValue}</p>
      {theme === "dark" && <HelloWorldTempComponent />}
      <MouseFollower />
    </div>
  );
};

export default Home;
