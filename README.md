# TripBuddy AI

TripBuddy AI is a full-stack, multi-agent travel planning application. It combines a natural-language chat interface with live flight data, hotel and destination research, structured itinerary generation, and PostgreSQL-backed conversation state.

The project is split into two applications:

- `frontend/`: Next.js 15 and React 19 interface
- `backend/`: FastAPI API and LangGraph multi-agent workflow

## Why this project is useful

Planning a trip usually requires checking many separate sources and manually coordinating flights, lodging, timing, budget, and destinations. TripBuddy reduces that work by turning one natural-language request into a single, practical travel plan.

Key capabilities include:

- **Combined planning:** Creates flight, hotel, and day-by-day itinerary recommendations from one request.
- **Location-aware departure options:** Uses the user's browser location to find the nearest scheduled airport in the Indian airport dataset.
- **Live flight information:** Uses AviationStack for route, schedule, terminal, gate, status, delay, and airport information.
- **Hotel and destination research:** Uses Tavily to find recent web sources and snippets for hotels and destination recommendations.
- **Structured itinerary generation:** Uses a Groq-hosted LLM to produce an itinerary that matches the application's Pydantic schema before presenting the final answer.
- **Conversational continuity:** Stores graph state in PostgreSQL and keeps a `thread_id` in browser local storage so follow-up requests can retain context.
- **Web-ready output:** Renders the final plan as Markdown and supports copying or printing/saving it as a PDF.

TripBuddy is intended as a planning assistant, not a booking engine. AviationStack's data is primarily live flight/status data and may not include ticket prices. The final response clearly distinguishes available live data from recommendations and estimates.

## Features

- Travel request form and quick example prompts
- Browser geolocation permission and nearest-airport lookup
- FastAPI travel and health endpoints
- LangGraph workflow with specialized flight, hotel, itinerary, and final-response agents
- Groq LLM integration
- AviationStack and Tavily integrations
- PostgreSQL checkpoint persistence
- Swagger-style interactive API documentation at `/docs`
- Docker Compose deployment for the frontend and backend

## Technology stack

| Area | Technology |
| --- | --- |
| Frontend | Next.js 15, React 19, TypeScript |
| Markdown rendering | `react-markdown`, `remark-gfm` |
| API | FastAPI, Uvicorn, Pydantic |
| Agent framework | LangGraph and LangChain |
| LLM | Groq through `langchain-groq` |
| Flight data | AviationStack |
| Web/hotel research | Tavily |
| State persistence | PostgreSQL with LangGraph Postgres checkpointing |
| Deployment | Docker and Docker Compose |

## Project structure

```text
TripBuddy/
├── frontend/
│   ├── app/
│   │   ├── page.tsx
│   │   └── pages/HomePage.tsx
│   ├── Dockerfile
│   └── package.json
├── backend/
│   ├── agents/              # Flight, hotel, itinerary, and final agents
│   ├── graph/               # LangGraph state and workflow assembly
│   ├── handlers/            # FastAPI route handlers
│   ├── llm/                 # Groq model configuration
│   ├── logic/               # Airport lookup and graph execution
│   ├── models/              # API and itinerary Pydantic models
│   ├── server/              # FastAPI application and router setup
│   ├── tools/               # AviationStack and Tavily integrations
│   ├── utils/               # Distance calculations
│   ├── india_airports.json  # Airport location data
│   └── requirements.txt
├── compose.yaml
└── README.md
```

## How to set up the project

### Prerequisites

For local development:

- Python 3.12
- Node.js 20 or newer
- PostgreSQL, or an accessible hosted PostgreSQL database
- A Groq API key
- A Tavily API key
- An AviationStack API key

For Docker setup:

- Docker Engine or Docker Desktop
- A PostgreSQL connection string
- API keys for Groq, Tavily, and AviationStack

### 1. Clone the repository

```bash
git clone https://github.com/Charan-1111/TripBuddy---Multi-Agent-Trip-planning-system.git
cd TripBuddy---Multi-Agent-Trip-planning-system
```

### 2. Configure environment variables

Create a root `.env` file for Docker Compose or place the same variables in `backend/.env` for backend local development:

```dotenv
GROQ_API_KEY=replace_with_your_groq_key
TAVILY_API_KEY=replace_with_your_tavily_key
AVIATIONSTACK_API_KEY=replace_with_your_aviationstack_key
DATABASE_URL=postgresql://username:password@host:5432/database
DEFAULT_ORIGIN_IATA=VGA
FRONTEND_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Environment variable details:

| Variable | Required | Purpose |
| --- | --- | --- |
| `GROQ_API_KEY` | Yes | Authenticates itinerary and final-response generation with Groq. |
| `TAVILY_API_KEY` | Yes | Authenticates hotel and destination web searches. |
| `AVIATIONSTACK_API_KEY` | Yes | Authenticates live flight searches. |
| `DATABASE_URL` | Yes | PostgreSQL connection used for LangGraph checkpoints. |
| `DEFAULT_ORIGIN_IATA` | No | Fallback airport code; defaults to `VGA` if omitted. |
| `FRONTEND_ORIGINS` | No | Reserved for frontend-origin configuration; the current CORS middleware allows all origins. |
| `NEXT_PUBLIC_API_URL` | Frontend/Docker | Backend URL embedded into the Next.js browser bundle. |
| `PORT` | No | Backend server port; defaults to `8000`. |

If `DATABASE_URL` does not already include an SSL mode, the application adds `sslmode=require`. The `.env` files are ignored by Git and must never be committed.

For local frontend configuration, copy the example:

```bash
cd frontend
cp .env.local.example .env.local
```

Change `NEXT_PUBLIC_API_URL` in `frontend/.env.local` if the API is not running at `http://localhost:8000`.

### Option A: Run with Docker Compose

Create the root `.env` first, then run:

```bash
docker compose up --build
```

Open:

- Frontend: `http://localhost:3000`
- Backend health: `http://localhost:8000/health`
- API documentation: `http://localhost:8000/docs`

The frontend Docker image receives `NEXT_PUBLIC_API_URL` at build time. Rebuild the frontend after changing that value.

Stop the services:

```bash
docker compose down
```

### Option B: Run locally

#### Backend

Create and activate a virtual environment from the repository root:

```bash
python3.12 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r backend/requirements.txt
```

On Windows PowerShell:

```powershell
py -3.12 -m venv .venv
.venv\Scripts\Activate.ps1
python -m pip install -r backend/requirements.txt
```

Start the API:

```bash
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

The first application start initializes the LangGraph PostgreSQL checkpointer tables. Ensure the configured database accepts connections and the application credentials have permission to create required tables.

#### Frontend

Install dependencies and start Next.js:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

For an optimized frontend build:

```bash
cd frontend
npm run build
npm start
```

### Verify the setup

Use these checks:

```bash
curl http://localhost:8000/health
```

A healthy API returns a status message. Visit `http://localhost:8000/docs` to view or test the `/api/travel` request schema. In the browser, allow location access before submitting a trip request.

## Architecture

### Request flow

```mermaid
flowchart LR
    U[Browser user] -->|Trip text and coordinates| UI[Next.js HomePage]
    UI -->|POST /api/travel| API[FastAPI travel handler]
    API -->|Latitude and longitude| AIR[Nearest-airport lookup]
    AIR -->|Origin IATA codes| LG[LangGraph workflow]
    LG --> FLIGHT[Flight agent]
    LG --> HOTEL[Hotel agent]
    FLIGHT -->|AviationStack| AVIA[AviationStack API]
    HOTEL -->|Tavily search| TAV[Tavily API]
    AVIA --> LG
    TAV --> LG
    LG --> IT[Itinerary agent]
    IT --> GROQ[Groq LLM]
    GROQ -->|Structured itinerary| IT
    IT --> FINAL[Final agent]
    FINAL --> GROQ
    GROQ -->|Markdown response| FINAL
    FINAL --> API
    API -->|Answer and thread ID| UI
    LG <-->|Checkpoint state| PG[(PostgreSQL)]
```

### Frontend

The frontend entry point is `frontend/app/pages/HomePage.tsx`. It:

1. Captures the user's natural-language request.
2. Requests browser geolocation and stores latitude and longitude in component state.
3. Loads a saved `travel_thread_id` from browser local storage.
4. Sends `{ message, latitude, longitude, thread_id }` to `POST /api/travel`.
5. Stores the returned thread ID for future requests.
6. Renders the final answer as GitHub-flavored Markdown.

The backend URL is resolved from `NEXT_PUBLIC_API_URL`, with `http://localhost:8000` as the development fallback.

### Backend application

`backend/server/application.py` creates the FastAPI app, loads airport data from `backend/india_airports.json`, opens a PostgreSQL connection, initializes `AsyncPostgresSaver`, and compiles the LangGraph workflow. Route registration and CORS middleware are handled by `backend/server/router.py`.

The main API endpoints are:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/health` | Verifies that the API process is running. |
| `POST` | `/api/travel` | Generates a complete travel plan. |
| `POST` | `/get/flights` | Returns the nearest scheduled airports for supplied coordinates. |
| `GET` | `/docs` | Displays interactive OpenAPI documentation. |

### Multi-agent LangGraph workflow

The graph in `backend/graph/builder.py` runs in a fixed sequence:

```text
START
  -> Flight agent
  -> Hotel agent
  -> Itinerary agent
  -> Final agent
  -> END
```

Shared state is defined in `backend/graph/state.py` and includes the original query, origin IATA codes, flight and hotel results, the structured itinerary, messages, and LLM call count.

| Agent | Responsibility |
| --- | --- |
| Flight agent | Parses the route and searches live flight data for suitable departure airports. |
| Hotel agent | Builds a hotel-oriented Tavily search query and collects web results. |
| Itinerary agent | Sends flight, hotel, and user context to Groq and validates a structured `TripItinerary`. |
| Final agent | Combines all retrieved and generated information into a polished Markdown response. |

PostgreSQL checkpointer state is keyed by `thread_id`. A new request without a thread ID receives a generated ID; subsequent requests with that ID continue through the persisted graph state.

### Flight tool

The flight integration is implemented in `backend/tools/flight_tool.py` and called by `search_flights(query, origin_iatas, limit)`.

It performs the following steps:

1. Reads `AVIATIONSTACK_API_KEY` and `DEFAULT_ORIGIN_IATA`.
2. Cleans the natural-language query.
3. Detects explicit IATA codes, `from X to Y`, `to Y from X`, and city/country mentions.
4. Resolves cities and countries to IATA airports using aliases and airport datasets.
5. Uses the browser-derived nearest airport as the requested origin when no explicit origin is present.
6. Calls the AviationStack flights endpoint with departure and/or arrival IATA parameters.
7. Returns formatted airline, flight number, status, schedule, terminal, gate, airport, and delay data.

Example route parsing:

| Query | Departure | Arrival |
| --- | --- | --- |
| `Japan trip from India` | User-nearest airport or the configured fallback | Japanese airport resolved from the query |
| `DAC to NRT` | DAC | NRT |
| `flights to Bangkok` | Nearest airport or fallback | BKK |
| `global flight info` | Not filtered | Not filtered |

The tool can return route-wide live data, a no-results message, or API error details. It does not itself reserve tickets or guarantee fares. When pricing is unavailable, the final agent informs the user rather than inventing a fare.

### State and persistence

Each planning request is assigned or reuses a thread ID. LangGraph writes checkpoint state for that thread to PostgreSQL. The frontend persists the most recent thread ID locally, allowing the application to continue existing planning context between requests.

Conversation state should not be used to store secrets or payment information. The application data and external API responses may become stale and should be revalidated before travel bookings.
