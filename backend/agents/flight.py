from graph import TravelState
from tools import search_flights

from langchain_core.messages import AIMessage

def flight_agent(state : TravelState):
    query = state["user_query"]

    flights_data = search_flights(query)

    return {
        "flight_results" : flights_data,
        "messages" : [
            AIMessage(content="Flight data retrieved successfully."),
        ],
        "llm_calls": state.get("llm_calls", 0) + 1,
    }