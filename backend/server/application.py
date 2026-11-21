import os, uvicorn, psycopg
from dotenv import load_dotenv
from fastapi import FastAPI
from langgraph.checkpoint.postgres import PostgresSaver
from psycopg.rows import dict_row

from .router import Router
from graph import build_travel_agent

load_dotenv()

class Application:
    def __init__(self):
        self.app = FastAPI(
            title="TripBuddy AI API",
            description="API for the LangGraph multi-agent travel planner",
            version="1.0.0",
        )
        

        _conn = psycopg.connect(
            self.get_database_url(),
            autocommit= True,
            row_factory= dict_row
        )

        checkpointer= PostgresSaver(_conn)
        checkpointer.setup()

        self.app.state.travel_graph = build_travel_agent(checkpointer=checkpointer)

    def get_database_url(self) -> str:
        url = os.getenv("DATABASE_URL")

        if not url:
            raise ValueError("DATABASE_URL environment variable is not set.")

        if "sslmode" not in url:
            url += "?sslmode=require"

        return url

    def initialize_application(self):
        router = Router(self.app)
        router.initialize_routes()

    def run_server(self):
        uvicorn.run(
            self.app,
            host="0.0.0.0",
            port=int(os.getenv("PORT", "8000")),
        )
