import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CITIES } from "@/lib/avatars";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Map — WanderGo" },
      { name: "description", content: "A living map of historical avatars and traveler gifts left across the world." },
    ],
  }),
  component: MapView,
});

interface Pin {
  id: string;
  x: number;
  y: number;
  type: "official" | "community" | "gift";
  city: string;
  label: string;
  message: string;
}

const SEED_PINS: Pin[] = [
  { id: "p1", x: 52, y: 38, type: "official", city: "Paris", label: "Napoleon", message: "Stand here at dusk — the light is mine." },
  { id: "p2", x: 82, y: 42, type: "official", city: "Kyoto", label: "Samurai", message: "Hear the bell. Bow once." },
  { id: "p3", x: 47, y: 44, type: "official", city: "Seville", label: "Carmen", message: "The plaza dances at midnight." },
  { id: "p4", x: 28, y: 44, type: "official", city: "New York", label: "Vinnie", message: "Best slice — 33rd and 8th. Trust me." },
  { id: "p5", x: 53, y: 39, type: "community", city: "Paris", label: "Léa", message: "Best croissant in the 10th, nobody knows this place." },
  { id: "p6", x: 51, y: 37, type: "gift", city: "Paris", label: "Gift", message: "A poem someone left for you." },
  { id: "p7", x: 83, y: 43, type: "community", city: "Kyoto", label: "Hana", message: "Quiet tea house, second alley left." },
  { id: "p8", x: 27, y: 45, type: "gift", city: "NYC", label: "Gift", message: "A jazz playlist for the walk home." },
];

function MapView() {
  const [pins, setPins] = useState<Pin[]>(SEED_PINS);
  const [selected, setSelected] = useState<Pin | null>(null);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState({ label: "", message: "", type: "community" as Pin["type"] });

  const addPin = () => {
    if (!draft.label.trim()) return;
    const np: Pin = {
      id: `c${Date.now()}`,
      x: 30 + Math.random() * 50,
      y: 30 + Math.random() * 30,
      type: draft.type,
      city: "Here",
      label: draft.label,
      message: draft.message || "…",
    };
    setPins((p) => [...p, np]);
    setDraft({ label: "", message: "", type: "community" });
    setAdding(false);
  };

  const colorOf = (t: Pin["type"]) =>
    t === "official" ? "var(--color-primary)" : t === "gift" ? "oklch(0.7 0.18 50)" : "white";

  return (
    <main className="min-h-dvh w-full bg-background">
      <header className="flex items-center justify-between px-6 pt-6">
        <Link to="/" className="ui-label">← Back</Link>
        <span className="ui-label">World Map</span>
        <button onClick={() => setAdding(true)} className="ui-label">+ Pin</button>
      </header>

      <p className="text-center font-serif text-2xl text-ink mt-6 px-6">
        every pin a voice, every gift a stranger.
      </p>

      <div className="relative mx-auto mt-6 w-[92%] max-w-2xl aspect-[2/1] rounded-2xl border border-border bg-white overflow-hidden shadow-[0_20px_60px_-30px_oklch(0.45_0.13_255_/_0.35)]">
        {/* stylized world */}
        <svg viewBox="0 0 200 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <rect width="200" height="100" fill="oklch(0.985 0.005 240)" />
          {/* continents — abstract blobs */}
          <g fill="oklch(0.93 0.04 245)" stroke="oklch(0.86 0.05 245)" strokeWidth="0.4">
            <path d="M20,30 Q35,18 55,28 Q70,38 60,55 Q40,62 25,52 Q12,42 20,30 Z" />
            <path d="M85,28 Q110,20 130,30 Q145,40 140,55 Q120,62 95,55 Q80,45 85,28 Z" />
            <path d="M155,30 Q175,25 185,40 Q188,55 170,60 Q155,55 152,42 Z" />
            <path d="M55,65 Q70,60 80,72 Q75,82 60,80 Q50,75 55,65 Z" />
            <path d="M105,70 Q120,65 130,75 Q125,85 110,82 Q100,78 105,70 Z" />
          </g>
        </svg>
        {pins.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelected(p)}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            aria-label={p.label}
          >
            <span
              className="block rounded-full story-dot"
              style={{
                width: p.type === "official" ? 12 : 9,
                height: p.type === "official" ? 12 : 9,
                position: "relative",
                background: colorOf(p.type),
                border: p.type === "community" ? "2px solid var(--color-primary)" : "1px solid var(--color-primary)",
              }}
            />
          </button>
        ))}
      </div>

      <div className="mt-6 px-6 flex justify-center gap-4 text-xs text-muted-foreground">
        <Legend color="var(--color-primary)" label="historical" />
        <Legend color="white" label="community" border />
        <Legend color="oklch(0.7 0.18 50)" label="gifts" />
      </div>

      {selected && (
        <div className="fixed inset-0 z-30 bg-ink/30 backdrop-blur-sm flex items-end sm:items-center justify-center p-3" onClick={() => setSelected(null)}>
          <div className="card-paper slide-up w-full max-w-sm p-5" onClick={(e) => e.stopPropagation()}>
            <div className="ui-label">{selected.type === "gift" ? "A gift left for you" : selected.type === "official" ? "Historical voice" : "From a traveler"}</div>
            <h2 className="font-serif text-2xl text-ink mt-1">{selected.label}</h2>
            <p className="font-serif text-ink/80 mt-3 leading-snug text-[17px]">{selected.message}</p>
            <button onClick={() => setSelected(null)} className="mt-5 w-full py-2.5 rounded-full bg-primary text-primary-foreground ui-label">Close</button>
          </div>
        </div>
      )}

      {adding && (
        <div className="fixed inset-0 z-30 bg-ink/30 backdrop-blur-sm flex items-end sm:items-center justify-center p-3" onClick={() => setAdding(false)}>
          <div className="card-paper slide-up w-full max-w-sm p-5" onClick={(e) => e.stopPropagation()}>
            <div className="ui-label">Leave something behind</div>
            <input
              autoFocus
              placeholder="Your name"
              value={draft.label}
              onChange={(e) => setDraft({ ...draft, label: e.target.value })}
              className="mt-3 w-full border-b border-border bg-transparent outline-none py-2 font-serif text-lg"
            />
            <textarea
              placeholder="A note, a secret, a recommendation…"
              value={draft.message}
              onChange={(e) => setDraft({ ...draft, message: e.target.value })}
              rows={3}
              className="mt-3 w-full border-b border-border bg-transparent outline-none py-2 font-serif text-[17px] resize-none"
            />
            <div className="mt-4 flex gap-2">
              {(["community", "gift"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setDraft({ ...draft, type: t })}
                  className={`flex-1 py-2 rounded-full ui-label border ${draft.type === t ? "bg-primary text-primary-foreground border-primary" : "border-border text-ink"}`}
                >
                  {t === "community" ? "Avatar" : "Gift"}
                </button>
              ))}
            </div>
            <button onClick={addPin} className="mt-4 w-full py-2.5 rounded-full bg-primary text-primary-foreground ui-label">Pin it</button>
          </div>
        </div>
      )}
    </main>
  );
}

function Legend({ color, label, border }: { color: string; label: string; border?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="w-2.5 h-2.5 rounded-full" style={{ background: color, border: border ? "1.5px solid var(--color-primary)" : undefined }} />
      {label}
    </span>
  );
}
