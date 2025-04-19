import confetti from "canvas-confetti";

export function triggerSparkle() {
  confetti({
    particleCount: 40,
    angle: 90,
    spread: 90,
    origin: { y: 0.6 },
    zIndex: 9999,
    colors: ["#f472b6", "#34d399", "#60a5fa", "#fbbf24"],
  });
}
