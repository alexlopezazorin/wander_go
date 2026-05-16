const BACKEND_URL = "http://localhost:8000";

export async function fetchNearbyLandmark(lat: number, lng: number) {
  const res = await fetch(`${BACKEND_URL}/landmark/nearby`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ lat, lng }),
  });

  return res.json();
}

export async function fetchStory(landmark: string) {
  const res = await fetch(`${BACKEND_URL}/chat/story`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ landmark }),
  });

  return res.json();
}