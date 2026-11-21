import traceback
from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from logic import run_travel_agent

from models import TravelRequest


travel_agent = APIRouter()

@travel_agent.post("/api/travel")
async def travel_planner(request_data: TravelRequest, request : Request):
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
            request.app.state.travel_graph,
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