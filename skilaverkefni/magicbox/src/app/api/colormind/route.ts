export async function POST() {
  try {
    const response = await fetch("https://colormind.io/api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "default",
        input: ["N", "N", "N", "N", "N"],
      }),
    });

    if (!response.ok) {
      console.error("Colormind API error:", response.statusText);
      return new Response("Failed to fetch", { status: 500 });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Colormind fetch error:", err);
    return new Response("Error contacting Colormind", { status: 500 });
  }
}
