from pydantic import BaseModel, Field

class Activity(BaseModel):
    time : str
    name : str
    location : str
    estimated_cost : float | None = None


class ItineraryDay(BaseModel):
    day : int = Field(ge=1)
    title : str
    activities : list[Activity]


class TripItinerary(BaseModel):
    destination : str
    duration_days : int = Field(ge=1)
    currency : str = "INR"

    days : list[ItineraryDay]

    estimated_total_cost : float | None = None

    recommendations : list[str] = Field(
        default_factory= list
    )