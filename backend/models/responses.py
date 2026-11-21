from pydantic import BaseModel, Field
from .travels import TripItinerary

class TravelResponse(BaseModel):
    success : bool = True
    thread_id : str
    answer : str

    flight_results : str = ""
    hotel_results : str = ""
    itinerary : TripItinerary | None = None

    llm_calls : int = Field(default=0, ge=0)


class ErrorResponse(BaseModel):
    success : bool = False
    error : str