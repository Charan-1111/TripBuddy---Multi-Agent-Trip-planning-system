import os
from langchain_groq import ChatGroq
from dotenv import load_dotenv
load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY environment variable is not set.")


llm = ChatGroq(
    model = "openai/gpt-oss-120b",
    api_key= GROQ_API_KEY
)