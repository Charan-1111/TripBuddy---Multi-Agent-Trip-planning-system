from graph import TravelState
from llm.groq import llm
from langchain_core.messages import (
    SystemMessage,
    HumanMessage
)

from models import TripItinerary

structured_llm = llm.with_structured_output(
    TripItinerary
)

def itinerary_agent(state : TravelState):
    prompt = f"""
Create a complete travel itinerary.

User Query:
{state["user_query"]}

Flight Results:
{state["flight_results"]}

Hotel Results:
{state["hotel_results"]}

Make the itinerary practical, budget-aware, and easy to follow
"""
    itinerary = structured_llm.invoke([
        SystemMessage(
            content= "You are an expert travel planner."
        ),
        HumanMessage(content= prompt)
    ])

    return {
        "itinerary" : itinerary.model_dump(),
        "llm_calls" : state.get("llm_calls", 0) + 1
    }