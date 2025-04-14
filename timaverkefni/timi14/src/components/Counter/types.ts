import type { ThemeType } from "@/types/types";

export type CounterButtonProps = {
  count: number;
  onClick: () => void;
  theme: ThemeType;
};
