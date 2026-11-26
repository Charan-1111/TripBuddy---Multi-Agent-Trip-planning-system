import operator
from typing import TypedDict, Annotated

from langchain_core.messages import (
    AnyMessage
)

class TravelState(TypedDict):
    messages : Annotated[list[AnyMessage], operator.add]
    user_query : str
    flight_results : str
    hotel_results : str
    itinerary : dict | None
    llm_calls : int
    origin_iatas : list[str]