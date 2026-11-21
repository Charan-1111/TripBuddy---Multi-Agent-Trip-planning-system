from pydantic import BaseModel, Field

class TravelResponse(BaseModel):
    success : bool = True
    thread_id : str
    answer : str

    flight_results : str = ""
    hotel_results : str = ""
    itinerary : str = ""

    llm_calls : int = Field(default=0, ge=0)


class ErrorResponse(BaseModel):
    success : bool = False
    error : str