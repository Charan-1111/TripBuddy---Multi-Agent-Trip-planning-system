from tavily import TavilyClient
import os
from dotenv import load_dotenv

load_dotenv()

client = TavilyClient(
    api_key=os.getenv("TAVILY_API_KEY")
)

def tavily_search(query: str, limit: int = 5):
    response = client.search(
        query=query,
        max_results=limit
    )

    results = []

    for i, r in enumerate(response["results"], 1):
        title = r.get("title", "Unknow")
        url = r.get("url", "")
        snippet = r.get("snippet", "").strip()

        # Keeping only the first 300 characters to avoid wall-of-text
        if len(snippet) > 300:
            snippet = snippet[:300].rsplit(" ", 1)[0] + "..."

        results.append(f"{i}. **{title}**\n {url}\n {snippet}")

    return "\n\n".join(results)