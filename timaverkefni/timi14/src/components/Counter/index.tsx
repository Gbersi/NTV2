import { themeProps } from "@/constants/theme";
import CounterButton from "./CounterButton";
import { useState } from "react";
import type { ThemeType } from "@/types/types";

type CounterProps = {
  theme: ThemeType;
  defaultCount: number;
};

const Counter = ({ theme, defaultCount }: CounterProps) => {
  const [count, setCount] = useState(defaultCount);

  const onClick = () => {
    setCount((s) => s + 1);
  };
  return (
    <div className={themeProps[theme].secondaryBackground}>
      <CounterButton onClick={onClick} count={count} theme={theme} />
    </div>
  );
};

export default Counter;
