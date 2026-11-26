import traceback
from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import JSONResponse
from logic import run_travel_agent
from tools import search_flights

from models import TravelRequest, TravelResponse

from logic import find_nearby_airports


travel_agent = APIRouter()

@travel_agent.post("/api/travel", response_model= TravelResponse)
async def travel_planner(request_data: TravelRequest, request : Request) -> TravelResponse:
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

        nearest_aiports = find_nearby_airports((request_data.latitude, request_data.longitude), request.app.state.airports)

        origin_iatas = [
            airport.iata_code
            for airport, _distance in nearest_aiports
        ]

        result = await run_travel_agent(
            request.app.state.travel_graph,
            user_input= user_message,
            nearest_aiports= origin_iatas,
            thread_id= request_data.thread_id,
        )

        return TravelResponse(
            success= True,
            **result,
        )
    except Exception as e:
        print("Error : ", e)
        traceback.print_exc()

        raise HTTPException(
            status_code=500,
            detail="Unable to generate travel plan",
        )


@travel_agent.post("/get/flights")
async def get_flights(request : Request):
    data = await request.json()

    return find_nearby_airports((data["latitude"], data["longitude"]), request.app.state.airports)