# WanderGo

AI-powered travel companion with a real-time conversational avatar.

## Lovable Demo

Check out the live demo built with Lovable: [https://wander-voice-stories.lovable.app/](https://wander-voice-stories.lovable.app/)

## Project Vision

"Imagine you're in Paris for the first time.
You have your phone. You have Google Maps. And you are completely lost — not geographically, but culturally. You're walking past history, past hidden gems, past stories that took centuries to happen — and you have no idea.
That's the problem we're solving.

This is WanderGo.
You open the app. You see the Earth — rotating, alive, covered in thousands of glowing dots. Each dot is a story. Each dot is a place that has something to tell you.
You tap begin. The app reads your location. And the globe zooms in — all the way from space, down to your city, down to your street. In three seconds, the world finds you.

And then — someone appears.
For Paris, we chose Napoleon. He's your guide. He knows everything about where you're standing — the history, the stories, the things that never made it into any guidebook. You can ask him anything, by voice or by text, and he answers — in character, historically grounded, specific to that exact location.
We do this using the Claude AI API, with a character prompt that keeps Napoleon sounding like Napoleon — warm, theatrical, a little dramatic.

But WanderGo isn't only about the past.
Anyone can create their own avatar. A local in Paris — she knows the best croissant in the tenth arrondissement, a courtyard nobody visits, a bookshop that's been there since 1932. She records a voice message, pins her avatar to that exact spot on the map, and leaves it there.
The next person who walks past that corner — maybe tomorrow, maybe next year — sees her avatar pop up. Hears her voice. Finds the place.
That's the community layer. And the more people use it, the richer every city gets.

We also built a virtual gift feature — you can leave a message, a voice note, a secret recommendation — wrapped as a gift at any location. The next person to arrive there opens it.
Think of it as a living layer underneath every city. One that grows every day, with every user, in every country.

We started with Paris. But this works anywhere. Tokyo. Cairo. Rio. New York. Every city has centuries of stories and millions of people who love it and want to share it.

WanderGo gives every city a voice.
The only question is — are you listening?"

---

## Stack

- **Frontend**: Next.js + TypeScript + Tailwind CSS
- **Backend**: FastAPI + Python + WebSockets
- **AI**: Claude (Anthropic) with streaming

## Project Structure

```
wander_go/
├── frontend/   # Next.js app
└── backend/    # FastAPI app
```

## Getting Started

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux
pip install -r requirements.txt
cp .env.example .env         # add your ANTHROPIC_API_KEY
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## License

MIT
