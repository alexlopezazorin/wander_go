from fastapi import APIRouter
from pydantic import BaseModel
from app.services.landmark_service import find_nearby_landmark

router = APIRouter()

class LocationRequest(BaseModel):
    lat: float
    lng: float

@router.post("/nearby")
def get_landmark(data: LocationRequest):
    landmark = find_nearby_landmark(data.lat, data.lng)

    return {
        "id": landmark["id"],
        "name": landmark["name"],
        "description": landmark["description"]
    }