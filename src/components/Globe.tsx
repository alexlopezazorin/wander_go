import { CITIES, type CityProfile } from "@/lib/avatars";
import worldMap from "@/assets/world-map.png";

interface Props {
  zooming: boolean;
  zoomCity: CityProfile | null;
}

// Convert lat/lon to equirectangular percent within the map.
function project(lat: number, lon: number) {
  return {
    x: ((lon + 180) / 360) * 100,
    y: ((90 - lat) / 180) * 100,
  };
}

// Pseudo-random ambient story dots on land-ish positions.
const AMBIENT_DOTS: { lat: number; lon: number; delay: number }[] = [
  { lat: 51.5, lon: -0.1, delay: 0 },     // London
  { lat: 41.9, lon: 12.5, delay: 200 },   // Rome
  { lat: 55.7, lon: 37.6, delay: 400 },   // Moscow
  { lat: 30.0, lon: 31.2, delay: 600 },   // Cairo
  { lat: -33.9, lon: 18.4, delay: 800 },  // Cape Town
  { lat: -34.6, lon: -58.4, delay: 1000 },// Buenos Aires
  { lat: 19.4, lon: -99.1, delay: 1200 }, // Mexico City
  { lat: 39.9, lon: 116.4, delay: 1400 }, // Beijing
  { lat: 1.35, lon: 103.8, delay: 1600 }, // Singapore
  { lat: -33.9, lon: 151.2, delay: 1800 },// Sydney
  { lat: 59.3, lon: 18.1, delay: 2000 },  // Stockholm
  { lat: 28.6, lon: 77.2, delay: 2200 },  // Delhi
  { lat: -22.9, lon: -43.2, delay: 100 }, // Rio
  { lat: 6.5, lon: 3.4, delay: 300 },     // Lagos
  { lat: 45.5, lon: -73.6, delay: 500 },  // Montreal
  { lat: 37.8, lon: -122.4, delay: 700 },  // SF
  { lat: 25.2, lon: 55.3, delay: 900 },   // Dubai
  { lat: 13.7, lon: 100.5, delay: 1100 }, // Bangkok
  { lat: 64.1, lon: -21.9, delay: 1300 }, // Reykjavik
  { lat: 52.5, lon: 13.4, delay: 1500 },  // Berlin
  { lat: 40.4, lon: -3.7, delay: 1700 },  // Madrid
  { lat: -1.3, lon: 36.8, delay: 1900 },  // Nairobi
  { lat: 35.7, lon: 51.4, delay: 2100 },  // Tehran
  { lat: 50.1, lon: 14.4, delay: 2300 },  // Prague
];

export function Globe({ zooming, zoomCity }: Props) {
  const target = zoomCity ? project(zoomCity.coords[0], zoomCity.coords[1]) : null;

  // When zooming, transform-origin = city pos; scale up the whole map.
  const mapStyle: React.CSSProperties = target
    ? {
        transformOrigin: `${target.x}% ${target.y}%`,
      }
    : {};

  return (
    <div className="relative w-full max-w-2xl mx-auto aspect-[2/1] rounded-2xl overflow-hidden border border-border bg-white shadow-[0_30px_80px_-30px_oklch(0.45_0.13_255_/_0.35)]">
      {/* The map */}
      <div
        className={`absolute inset-0 ${zooming ? "globe-zooming" : ""}`}
        style={mapStyle}
      >
        <img
          src={worldMap}
          alt="World map"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          draggable={false}
        />

        {/* Ambient story dots */}
        {AMBIENT_DOTS.map((d, i) => {
          const p = project(d.lat, d.lon);
          return (
            <span
              key={i}
              className="story-dot"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                animationDelay: `${d.delay}ms`,
              }}
            />
          );
        })}

        {/* Featured city dots (brighter) */}
        {Object.values(CITIES).map((c) => {
          const p = project(c.coords[0], c.coords[1]);
          return (
            <span
              key={c.key}
              style={{
                position: "absolute",
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: 10,
                height: 10,
                marginLeft: -5,
                marginTop: -5,
                borderRadius: "9999px",
                background: "white",
                border: "2px solid var(--color-primary)",
                boxShadow: "0 0 14px var(--color-dot)",
              }}
            />
          );
        })}

        {/* Selected location ring */}
        {target && (
          <>
            <span
              className="location-ring"
              style={{ left: `calc(${target.x}% - 11px)`, top: `calc(${target.y}% - 11px)` }}
            />
            <span
              className="location-dot-big"
              style={{ left: `calc(${target.x}% - 6px)`, top: `calc(${target.y}% - 6px)` }}
            />
          </>
        )}
      </div>

      {/* Soft vignette */}
      <div className="pointer-events-none absolute inset-0" style={{
        background: "radial-gradient(ellipse at center, transparent 55%, oklch(0.985 0.005 240 / 0.6) 100%)",
      }} />
    </div>
  );
}
