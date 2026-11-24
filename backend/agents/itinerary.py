from graph import TravelState
from llm.groq import llm
from langchain_core.messages import (
    SystemMessage,
    HumanMessage
)

from models import TripItinerary

structured_llm = llm.with_structured_output(
    TripItinerary,
    method="json_schema",
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

Make the itinerary practical, budget-aware, and easy to follow.

Return valid JSON only. Do not use markdown, comments, asterisks, or trailing commas.
Every string must use valid JSON escaping. Fill every required field.
"""
    last_error = None
    for attempt in range(3):
        try:
            itinerary = structured_llm.invoke([
                SystemMessage(
                    content= (
                        "You are an expert travel planner. "
                        "Emit arguments that exactly match the provided tool schema "
                        "and contain only valid JSON."
                    )
                ),
                HumanMessage(content= prompt)
            ])
            break
        except Exception as exc:
            last_error = exc
    else:
        raise RuntimeError(
            "Unable to generate a valid itinerary after 3 attempts"
        ) from last_error

    return {
        "itinerary" : itinerary.model_dump(),
        "llm_calls" : state.get("llm_calls", 0) + 1
    }