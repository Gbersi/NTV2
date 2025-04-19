export async function fetchAIColorPalette(): Promise<string[]> {
    try {
      const res = await fetch("/api/colormind", {
        method: "POST",
      });
  
      if (!res.ok) throw new Error("Failed to fetch color palette");
  
      const data = await res.json();
  
      if (!data.result) throw new Error("Invalid palette data");
  
      return data.result.map((rgb: number[]) =>
        `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
      );
    } catch (err) {
      console.warn("⚠️ AI palette failed, using fallback:", err);

      return ["#f87171", "#60a5fa", "#34d399", "#fbbf24", "#a78bfa"];
    }
  }
  