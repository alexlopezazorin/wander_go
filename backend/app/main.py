from fastapi import FastAPI
from app.routers import landmark

app = FastAPI(title="WanderGo API")

@app.get("/")
def root():
    return {"status": "WanderGo API running 🚀"}

app.include_router(landmark.router, prefix="/landmark")
from app.routers import landmark, chat

app.include_router(landmark.router, prefix="/landmark")
app.include_router(chat.router, prefix="/chat")



# from fastapi import FastAPI
# from app.routers import landmark, chat

# app = FastAPI(title="WanderGo API")

# app.include_router(landmark.router, prefix="/landmark")
# app.include_router(chat.router, prefix="/chat")

# @app.get("/")
# def root():
#     return {"status": "WanderGo API running 🚀"}