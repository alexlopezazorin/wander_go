# WanderGo

AI-powered travel companion with a real-time conversational avatar.

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
