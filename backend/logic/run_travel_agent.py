import uuid
from langchain_core.messages import HumanMessage
from models import Airport


async def run_travel_agent(travel_graph, user_input : str, nearest_aiports : list[str], thread_id : str | None = None):
    if not thread_id:
        thread_id = f"user_{uuid.uuid4().hex}"

    config = {
        "configurable" : {
            "thread_id" : thread_id
        }
    }

    result = await travel_graph.ainvoke(
        {
            "messages" : [
                HumanMessage(content= user_input)
            ],
            "user_query" : user_input,
            "flight_results" : "",
            "hotel_results" : "",
            "itinerary" : None,
            "llm_calls" : 0,
            "origin_iatas" : nearest_aiports,
        },
        config = config
    )

    final_answer = result["messages"][-1].content

    return {
        "thread_id" : thread_id,
        "answer" : final_answer,
        "flight_results" : result.get("flight_results", ""),
        "hotel_results" : result.get("hotel_results", ""),
        "itinerary" : result.get("itinerary"),
        "llm_calls" : result.get("llm_calls", 0),
    }