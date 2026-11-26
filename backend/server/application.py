import json
import os
from contextlib import asynccontextmanager
from pathlib import Path

import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI
from langgraph.checkpoint.postgres.aio import AsyncPostgresSaver
from psycopg import AsyncConnection
from psycopg.rows import dict_row

from .router import Router
from graph import build_travel_agent
from models import Airport

load_dotenv()


class Application:
    def __init__(self, airports=None):
        self.app = FastAPI(
            title="TripBuddy AI API",
            description="API for the LangGraph multi-agent travel planner",
            version="1.0.0",
            lifespan=self.lifespan,
        )
        self.airports = airports or []

    def get_database_url(self) -> str:
        url = os.getenv("DATABASE_URL")

        if not url:
            raise ValueError("DATABASE_URL environment variable is not set.")

        if "sslmode" not in url:
            url += "?sslmode=require"

        return url

    @asynccontextmanager
    async def lifespan(self, app: FastAPI):
        async with await AsyncConnection.connect(
            self.get_database_url(),
            autocommit=True,
            row_factory=dict_row,
        ) as connection:
            checkpointer = AsyncPostgresSaver(connection)
            await checkpointer.setup()
            app.state.travel_graph = build_travel_agent(checkpointer=checkpointer)
            app.state.airports = self.airports
            yield

    @classmethod
    def initiating(cls):
        airport_file = Path(__file__).resolve().parents[1] / "india_airports.json"
        with airport_file.open("r", encoding="utf-8") as file:
            data = json.load(file)

        airports_data = [Airport(**row) for row in data]

        return cls(airports_data)

    def initialize_application(self):
        router = Router(self.app)
        router.initialize_routes()

    def run_server(self):
        uvicorn.run(
            self.app,
            host="0.0.0.0",
            port=int(os.getenv("PORT", "8000"))
        )
