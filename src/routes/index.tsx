import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Globe } from "@/components/Globe";
import { AvatarPortrait } from "@/components/AvatarPortrait";
import { CITIES, pickClosestCity, type CityProfile } from "@/lib/avatars";
import { askAvatar } from "@/lib/chat.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WanderGo — every city has a voice" },
      { name: "description", content: "AI historical avatars guide you through real cities by voice. Open the app, the world zooms into you." },
      { property: "og:title", content: "WanderGo — every city has a voice" },
      { property: "og:description", content: "Open the app. The world zooms into you. A figure from history starts talking — about the exact place you stand." },
    ],
  }),
  component: WanderGo,
});

type Stage = "globe" | "zooming" | "city";
type Msg = { role: "user" | "assistant"; content: string };

function playPoof() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(660, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.5);
    g.gain.setValueAtTime(0.25, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.6);
  } catch {}
}

function speak(text: string, lang: string, onEnd?: () => void) {
  try {
    const synth = window.speechSynthesis;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = 0.96;
    u.pitch = 1;
    if (onEnd) u.onend = onEnd;
    synth.speak(u);
  } catch {
    onEnd?.();
  }
}

function WanderGo() {
  const [stage, setStage] = useState<Stage>("globe");
  const [profile, setProfile] = useState<CityProfile | null>(null);
  const [zoomCity, setZoomCity] = useState<CityProfile | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [talking, setTalking] = useState(false);
  const [loading, setLoading] = useState(false);
  const askFn = useServerFn(askAvatar);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 9999, behavior: "smooth" });
  }, [messages, loading]);

  const begin = (preset?: CityProfile) => {
    playPoof();
    const finishWith = (p: CityProfile) => {
      setProfile(p);
      setZoomCity(p);
      setTimeout(() => setStage("zooming"), 600);
      setTimeout(() => {
        setStage("city");
        setMessages([{ role: "assistant", content: p.greeting }]);
        setTalking(true);
        speak(p.greeting, p.voiceLang, () => setTalking(false));
      }, 3200);
    };

    if (preset) return finishWith(preset);

    if (!("geolocation" in navigator)) return finishWith(CITIES.paris);
    navigator.geolocation.getCurrentPosition(
      (pos) => finishWith(pickClosestCity(pos.coords.latitude, pos.coords.longitude)),
      () => finishWith(CITIES.paris),
      { timeout: 4000 },
    );
  };

  const send = async () => {
    if (!input.trim() || !profile || loading) return;
    const userMsg: Msg = { role: "user", content: input.trim() };
    const history = messages.slice(-8);
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const { reply } = await askFn({ data: { cityKey: profile.key, history, message: userMsg.content } });
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
      setTalking(true);
      speak(reply, profile.voiceLang, () => setTalking(false));
    } catch (e) {
      setMessages((m) => [...m, { role: "assistant", content: "The line crackles… try again in a moment." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-dvh w-full overflow-hidden bg-background">
      {stage !== "city" && (
        <section className="relative min-h-dvh flex flex-col items-center justify-center px-6 py-10 fade-in">
          <header className="absolute top-6 left-0 right-0 flex items-center justify-between px-6">
            <span className="ui-label">WanderGo</span>
            <Link to="/map" className="ui-label">Map</Link>
          </header>

          <Globe zooming={stage === "zooming"} zoomCity={zoomCity} />

          <h1 className="font-serif text-3xl sm:text-4xl text-ink mt-10 text-center max-w-md leading-tight">
            every city has a voice.
          </h1>
          <p className="mt-3 text-sm text-muted-foreground text-center max-w-xs">
            Open a place. A figure from its history will speak to you.
          </p>

          {stage === "globe" && (
            <>
              <button
                onClick={() => begin()}
                className="mt-8 px-10 py-3.5 rounded-full bg-primary text-primary-foreground ui-label hover:bg-ink transition-colors shadow-[0_12px_30px_-12px_oklch(0.45_0.13_255_/_0.6)]"
              >
                Begin
              </button>
              <div className="mt-10 flex flex-wrap gap-2 justify-center max-w-sm">
                <span className="ui-label w-full text-center mb-1">Or visit</span>
                {Object.values(CITIES).map((c) => (
                  <button
                    key={c.key}
                    onClick={() => begin(c)}
                    className="px-3 py-1.5 rounded-full border border-border bg-white text-xs text-ink hover:border-primary transition-colors"
                  >
                    {c.city}
                  </button>
                ))}
              </div>
            </>
          )}
        </section>
      )}

      {stage === "city" && profile && (
        <section className="relative min-h-dvh w-full">
          <img
            src={profile.background}
            alt={`${profile.city} backdrop`}
            className="absolute inset-0 w-full h-full object-cover"
            width={1280}
            height={1920}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/85" />

          <div className="relative z-10 flex flex-col min-h-dvh">
            <header className="flex items-center justify-between px-6 pt-6">
              <button onClick={() => { setStage("globe"); setProfile(null); setZoomCity(null); window.speechSynthesis?.cancel(); }} className="ui-label">
                ← Globe
              </button>
              <div className="text-center">
                <div className="ui-label">You are in</div>
                <div className="font-serif text-lg text-ink leading-tight">{profile.city}</div>
              </div>
              <Link to="/map" className="ui-label">Map</Link>
            </header>

            <div className="flex-1 flex items-center justify-center pt-8">
              <AvatarPortrait profile={profile} talking={talking || loading} />
            </div>

            <div className="card-paper slide-up mx-3 mb-3 p-4 pt-3 max-h-[55dvh] flex flex-col">
              <div className="ui-label text-center mb-2">{profile.character}</div>
              <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-3 pr-1">
                {messages.map((m, i) => (
                  <p
                    key={i}
                    className={
                      m.role === "assistant"
                        ? "font-serif text-[17px] text-ink leading-snug"
                        : "text-sm text-label text-right"
                    }
                  >
                    {m.role === "user" ? `“${m.content}”` : m.content}
                  </p>
                ))}
                {loading && <p className="font-serif text-ink/60 italic">…</p>}
              </div>

              <form
                onSubmit={(e) => { e.preventDefault(); send(); }}
                className="mt-3 flex items-center gap-2 border-t border-border pt-3"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask the past…"
                  className="flex-1 bg-transparent outline-none text-ink placeholder:text-muted-foreground text-sm py-2"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="px-4 py-2 rounded-full bg-primary text-primary-foreground ui-label disabled:opacity-40"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
