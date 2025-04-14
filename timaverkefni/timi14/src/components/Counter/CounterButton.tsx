import { themeProps } from "@/constants/theme";
import type { CounterButtonProps } from "./types";
import CounterChild from "./CounterChild";

const CounterButton = ({ count, onClick, theme }: CounterButtonProps) => {
  return (
    <div>
      <p>{count}</p>
      <button
        type="button"
        onClick={onClick}
        className={
          theme === "light"
            ? themeProps.light.mainBackground
            : themeProps.dark.mainBackground
        }
      >
        Increment counter
      </button>
      <CounterChild />
    </div>
  );
};

export default CounterButton;
