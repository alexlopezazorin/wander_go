const BACKEND_URL = "http://127.0.0.1:8000";

export async function fetchNearbyLandmark(lat: number, lng: number) {
  console.log("Calling API: /landmark/nearby with", lat, lng);
  try {
    const res = await fetch(`${BACKEND_URL}/landmark/nearby`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lat, lng }),
    });

    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    const data = await res.json();
    console.log("API Response: /landmark/nearby", data);
    return data;
  } catch (error) {
    console.error("Fetch error in fetchNearbyLandmark:", error);
    throw error;
  }
}

export async function fetchStory(landmark: string) {
  console.log("Calling API: /chat/story for", landmark);
  try {
    const res = await fetch(`${BACKEND_URL}/chat/story`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ landmark }),
    });

    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    const data = await res.json();
    console.log("API Response: /chat/story", data);
    return data;
  } catch (error) {
    console.error("Fetch error in fetchStory:", error);
    throw error;
  }
}