from backend.tools.tavily_tool import tavily_search
from backend.tools.flight_tool import search_flights

# res = tavily_search("Best hotels in Chilakaluripet Andhra Pradesh India", limit=3)

res = search_flights("Give me the 2 flight details from Vijayawada to Mumbai on 2026-11-22")    

print(res)