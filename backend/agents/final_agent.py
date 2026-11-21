from graph import TravelState
from llm.groq import llm
from langchain_core.messages import (
    SystemMessage,
    HumanMessage
)


def final_agent(state : TravelState):
    final_prompt = f"""
Generate the final travel response for the user

User Request:
{state["user_query"]}

Flights:
{state["flight_results"]}

Hotels:
{state["hotel_results"]}

Itinerary:
{state["itinerary"]}

Format the final answer beautifully using the following sections:

1. Trip Summary
2. Flight Information
3. Hotel Suggestions
4. Day-by-Day Itinerary
5. Estimated Budget
6. Final Recommendation

Important:
- Be clear and practical
- Mention that live flight API may not provide ticket prices if pricing is unavialble
- Keep the reponse useful for real travel plan
"""

    response = llm.invoke([
        SystemMessage(content= "You are a profession AI travel booking assistant."),
        HumanMessage(content= final_prompt)
    ])

    return {
        "messages" : [response],
        "llm_calls" : state.get("llm_calls", 0) + 1
    }