from fastapi import APIRouter

system_router = APIRouter()

@system_router.get("/health")
async def health_check():
    return {
            "status": "ok",
            "message": "AI Travel Planner API is running",
        }