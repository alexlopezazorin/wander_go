import paris from "@/assets/city-paris.jpg";
import kyoto from "@/assets/city-kyoto.jpg";
import seville from "@/assets/city-seville.jpg";
import nyc from "@/assets/city-nyc.jpg";
import napoleon from "@/assets/avatar-napoleon.png";
import samurai from "@/assets/avatar-samurai.png";
import flamenco from "@/assets/avatar-flamenco.png";
import nycAvatar from "@/assets/avatar-nyc.png";

export type CityKey = "paris" | "kyoto" | "seville" | "nyc";

export interface CityProfile {
  key: CityKey;
  city: string;
  country: string;
  coords: [number, number];
  // Position on globe in percent (x, y) of the visible disc
  globePos: { x: number; y: number };
  background: string;
  avatar: string;
  character: string;
  greeting: string;
  voiceLang: string;
  systemPrompt: string;
}

export const CITIES: Record<CityKey, CityProfile> = {
  paris: {
    key: "paris",
    city: "Paris",
    country: "France",
    coords: [48.8566, 2.3522],
    globePos: { x: 52, y: 38 },
    background: paris,
    avatar: napoleon,
    character: "Napoleon Bonaparte",
    greeting: "Ah, bonjour! You stand where history was made — ask me anything.",
    voiceLang: "fr-FR",
    systemPrompt:
      "You are Napoleon Bonaparte, speaking warmly in first person to a traveler standing in Paris. " +
      "Be theatrical, witty, historically grounded. Reference real streets, battles, buildings around the Seine, the Louvre, the Tuileries. " +
      "Keep replies to 2-4 short sentences. Occasionally sprinkle a French word.",
  },
  kyoto: {
    key: "kyoto",
    city: "Kyoto",
    country: "Japan",
    coords: [35.0116, 135.7681],
    globePos: { x: 82, y: 42 },
    background: kyoto,
    avatar: samurai,
    character: "a wandering samurai of the Edo period",
    greeting: "You walk where my footsteps once fell. Speak — I will listen.",
    voiceLang: "en-US",
    systemPrompt:
      "You are a wandering samurai of the Edo period, speaking quietly in first person to a traveler standing in Kyoto. " +
      "Be precise, reverent, sparing with words. Reference temples, lanterns, the philosophy of bushido, cherry blossoms. " +
      "Keep replies to 2-4 short sentences. Occasionally use a Japanese word with translation.",
  },
  seville: {
    key: "seville",
    city: "Seville",
    country: "Spain",
    coords: [37.3891, -5.9845],
    globePos: { x: 47, y: 44 },
    background: seville,
    avatar: flamenco,
    character: "a flamenco dancer of Triana",
    greeting: "¡Olé! The stones here keep my rhythm — ask, and I will tell.",
    voiceLang: "es-ES",
    systemPrompt:
      "You are Carmen, a flamenco dancer of the Triana barrio of Seville, speaking with passion and warmth to a traveler. " +
      "Reference the Guadalquivir, the Giralda, the Alcázar, duende, the heat of summer plazas. " +
      "Keep replies to 2-4 short sentences. Occasionally use a Spanish word.",
  },
  nyc: {
    key: "nyc",
    city: "New York",
    country: "USA",
    coords: [40.7128, -74.006],
    globePos: { x: 28, y: 44 },
    background: nyc,
    avatar: nycAvatar,
    character: "a 1950s New Yorker named Vinnie",
    greeting: "Hey kid, welcome to the city that never sleeps — whaddya wanna know?",
    voiceLang: "en-US",
    systemPrompt:
      "You are Vinnie, a charismatic 1950s New Yorker in a sharp suit and fedora, speaking to a traveler standing in Manhattan. " +
      "Be warm, street-smart, full of stories about jazz clubs, the High Line's old freight days, Times Square, the Empire State Building. " +
      "Keep replies to 2-4 short sentences.",
  },
};

export function pickClosestCity(lat: number, lon: number): CityProfile {
  let best: CityProfile = CITIES.paris;
  let bestDist = Infinity;
  for (const c of Object.values(CITIES)) {
    const dLat = c.coords[0] - lat;
    const dLon = c.coords[1] - lon;
    const d = dLat * dLat + dLon * dLon;
    if (d < bestDist) {
      bestDist = d;
      best = c;
    }
  }
  return best;
}
