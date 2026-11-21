from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from handlers import system_router, travel_agent



class Router:
    def __init__(self, app: FastAPI):
        self.app = app

    def __register_middlewares(self):
        self.app.add_middleware(
            CORSMiddleware,
            allow_origins=["*"],
            allow_methods=["GET", "POST"],
            allow_headers=["Content-Type"],
        )

    def initialize_routes(self):
        self.__register_middlewares()
        self.app.include_router(system_router)
        self.app.include_router(travel_agent)