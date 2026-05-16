# from fastapi import APIRouter
# from pydantic import BaseModel
# from app.services.openai_service import generate_story

# router = APIRouter()

# class StoryRequest(BaseModel):
#     landmark: str

# @router.post("/story")
# def story(data: StoryRequest):
#     text = generate_story(data.landmark)

#     return {"story": text}
# backend/app/routers/chat.py
from fastapi import APIRouter
from pydantic import BaseModel
from app.services.openai_service import generate_story
router = APIRouter()

class StoryRequest(BaseModel):
    landmark: str

@router.post("/story")
def get_story(data: StoryRequest):
    story = generate_story(data.landmark)

    return {
        "story": story
    }