from graph import TravelState
from tools import tavily_search

from langchain_core.messages import AIMessage

def hotel_agent(state : TravelState):
    query = f"Best hotels for {state["user_query"]}"

    hotels_data = tavily_search(query)

    return {
        "hotel_results" : hotels_data,
        "messages" : [
            AIMessage(content="Hotels information fetched succesfully"),
        ],
        "llm_calls" : state.get("llm_calls", 0) + 1
    }