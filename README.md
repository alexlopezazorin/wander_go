# 🌍 WanderGo
### *The AI travel companion that makes every city scream its secrets at you*

> "Impossible is a word found only in the dictionary of fools."
> — Napoleon Bonaparte, your new personal tour guide

---

## 🎯 What Even Is This?

You're in Paris. You have Google Maps. You're geographically fine.

But you're walking past **centuries of history**, hidden courtyards, stories that shaped the world — and you have absolutely **zero clue**. You're basically a goldfish swimming through the Louvre.

**That's the problem. WanderGo is the fix.**

Open the app. The globe zooms in from space — all the way down to your street, in three seconds. And then? **Someone appears.**

For Paris, we chose Napoleon. He knows *everything* about where you're standing. The history, the drama, the stuff that never made it into any guidebook. You can ask him anything — by voice or by text — and he answers in character, historically grounded, and absolutely theatrical about it. Because of course he is. He's Napoleon.

---

## 📱 The Experience in 6 Steps

```
User opens app on phone
        ↓
📷  Camera opens
        ↓
📍  GPS gets current location
        ↓
🏛️  Backend detects nearby landmark
        ↓
🎭  Napoleon avatar appears in AR
        ↓
🤖  Claude AI generates story & dialogue
        ↓
🔊  TTS generates voice
        ↓
📺  Frontend plays audio
        ↓
💃  Avatar animates while talking
```

Zero setup. Zero guidebook. Maximum magic.

---

## 🧭 Core Concept

**WanderGo is an AR-powered travel companion** that transforms real-world exploration into an interactive, story-driven experience.

Instead of passively wandering past tourist sites wondering "wait, what IS this?", users are accompanied by a **virtual AI guide** that appears through the phone camera, walks alongside them, and reacts to the environment in real time.

It's Pokémon GO, but for people who want to learn things. And also for people who loved Pokémon GO. We don't judge.

---

## 🎭 Meet Napoleon

Our first guide is Napoleon Bonaparte — theatrical, historically grounded, and absolutely convinced he's the most important person in any room (or street corner).

Powered by the **Claude API** with a locked character prompt, he:

- Stays fully in character, always
- Knows the specific history of wherever you're standing
- Delivers stories with the dramatic flair of someone who literally invaded most of Europe
- Answers your questions by voice or text

We also have a **2D animated Napoleon model** (`Napoleon.mp4`) for the demo — because even in two dimensions, the man has presence.

---

## 🗺️ The Community Layer (This Is Where It Gets Wild)

The AI guide is just Act One.

**Anyone can become a guide.** A local in Paris knows the best croissant in the 10th arrondissement. She knows a courtyard nobody visits. A bookshop that's been there since 1932. She records a voice message, pins her avatar to that exact GPS coordinate, and leaves it.

The next person who walks past that corner — tomorrow, next year, five years from now — sees her avatar pop up. Hears her voice. Finds the place.

### 🎁 Virtual Gift Drops

Leave a message, a voice note, a secret recommendation — wrapped as a gift at any location. The next explorer to arrive opens it. Like a time capsule. But instead of burying it in a box, you just... tap a button.

### 🌐 The Living Map

The more people use WanderGo, the richer every city gets. More pins. More stories. More reasons to put the phone down and actually *look* at where you are — then pick the phone back up to hear what happened there 300 years ago.

---

## ⚙️ Tech Stack

### Frontend
| Layer | Tech |
|---|---|
| Web app | Next.js + TypeScript + Tailwind CSS |
| AR view | Unity (camera + plane detection) |
| 3D character | FBX / GLB model with animation controller |
| AR mechanics | Plane detection · Character spawning · Follow-camera movement |

### Backend
| Layer | Tech |
|---|---|
| API framework | FastAPI + Python |
| Real-time comms | WebSockets |
| Voice | TTS engine |
| Location | GPS landmark detection |

### AI
| Layer | Tech |
|---|---|
| Dialogue | Claude (Anthropic) with streaming |
| Character consistency | Locked character prompt system |
| Context | Location-aware story generation |

---

## 🚀 Roadmap

### 🎯 Now — Hackathon Demo
Working AR prototype in Paris. Napoleon appears via camera. Claude generates location-aware dialogue. TTS plays voice. Avatar animates. Judges are confused and delighted.

### 🚀 Next — MVP Launch
- Community pins go live
- Locals can record and place their own avatars
- Virtual gift drops at GPS coordinates
- More cities, more guides

### 🌍 Future — Global Platform
- Every city. Every landmark.
- Multi-language guides
- Quest and achievement systems
- Partnerships with museums and tourism boards
- Essentially: **Pokémon GO for culture and discovery**

---

## 💡 The Vision (In One Paragraph)

*"Imagine you're in Paris for the first time. You have your phone. You have Google Maps. And you are completely lost — not geographically, but culturally. You're walking past history, past hidden gems, past stories that took centuries to happen — and you have no idea. That's the problem we're solving. WanderGo gives every city a voice. The only question is — are you listening?"*

---

## 🔗 Links

- **Live Demo:** [wander-voice-stories.lovable.app](https://wander-voice-stories.lovable.app/)
- **Stack:** Next.js · FastAPI · Claude API · Unity AR
- **License:** MIT

---

*Built with unreasonable ambition at a hackathon. Powered by Claude. Narrated by Napoleon.*
*WanderGo — because every city deserves to be heard. 🌍*
