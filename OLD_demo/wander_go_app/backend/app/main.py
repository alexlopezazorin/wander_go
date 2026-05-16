from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import landmark, chat

app = FastAPI(title="WanderGo API")

# 🌍 Enable CORS (Cross-Origin Resource Sharing)
# This allows your Next.js frontend to talk to this FastAPI backend safely.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, change this to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "WanderGo API running 🚀"}

# 🧩 Register Routers
app.include_router(landmark.router, prefix="/landmark")
app.include_router(chat.router, prefix="/chat")
