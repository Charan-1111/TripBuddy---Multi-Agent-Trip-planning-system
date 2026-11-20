import os
import traceback

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from backend.agent import run_travel_agent

app = FastAPI(
    title="TripBuddy AI API",
    description="API for the LangGraph multi-agent travel planner",
    version="1.0.0",
)

frontend_origins = [
    origin.strip()
    for origin in os.getenv(
        "FRONTEND_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000"
    ).split(",")
    if origin.strip()
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=frontend_origins,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)


class TravelRequest(BaseModel):
    message: str
    thread_id: str | None = None


@app.post("/api/travel")
async def travel_planner(request_data: TravelRequest):
    try:
        user_message = request_data.message.strip()

        if not user_message:
            return JSONResponse(
                status_code= 400,
                content = {
                    "success" : False,
                    "error" : "Message cannot be empty"
                }
            )

        result = run_travel_agent(
            user_input= user_message,
            thread_id= request_data.thread_id
        )

        return JSONResponse(
            content= {
                "success" : True,
                "thread_id" : result["thread_id"],
                "answer" : result["answer"],
                "flight_results" : result["flight_results"],
                "hotel_results" : result["hotel_results"],
                "itinerary" : result["itinerary"],
                "llm_calls" : result["llm_calls"]
            }
        )
    except Exception as e:
        print("Error : ", e)
        traceback.print_exc()

        return JSONResponse(
            status_code= 500,
            content= {
                "success" : False,
                "error" : str(e)
            }
        )


@app.get("/health")
async def health_check():
    return {
        "status": "ok",
        "message": "AI Travel Planner API is running",
    }


if __name__ == "__main__":
    uvicorn.run(
        "backend.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
    )