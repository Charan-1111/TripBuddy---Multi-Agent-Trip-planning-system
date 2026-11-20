# TripBuddy AI

TripBuddy is split into two independently run applications:

- `frontend/`: Next.js App Router UI
- `backend/`: FastAPI API, LangGraph travel-planning workflow, tools, and Python dependencies

The browser sends trip requests to the Python API at `http://localhost:8000`. The
backend accepts the frontend origin from `FRONTEND_ORIGINS` for CORS.

## Backend setup

### Requirements

- Python 3.12
- PostgreSQL database accessible to the application

Create and activate a virtual environment, then install the Python requirements:

```bash
python3.12 -m venv .venv
source .venv/bin/activate
python -m pip install -r backend/requirements.txt
```

On Windows PowerShell:

```powershell
py -3.12 -m venv .venv
.venv\Scripts\Activate.ps1
python -m pip install -r backend/requirements.txt
```

Create a root `.env` file with the backend credentials:

```dotenv
GROQ_API_KEY=your_groq_api_key
DATABASE_URL=your_postgresql_connection_string
TAVILY_API_KEY=your_tavily_api_key
AVIATIONSTACK_API_KEY=your_aviationstack_api_key
DEFAULT_ORIGIN_IATA=VGA
FRONTEND_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

Do not commit credentials. Start the API from the repository root:

```bash
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

The health endpoint is available at `http://localhost:8000/health`, and
interactive API documentation is at `http://localhost:8000/docs`.

Build the backend container from the repository root with:

```bash
docker build -t tripbuddy-api backend
```

To run both containers together, first create the root `.env` file above, then
run from the repository root:

```bash
docker compose up --build
```

The frontend is available at `http://localhost:3000` and the API at
`http://localhost:8000`. `NEXT_PUBLIC_API_URL` is embedded into the frontend
image at build time; set it in the root `.env` before building if browsers
should call an API at a different address. Stop the services with
`docker compose down`.

## Frontend setup

Install Node.js 20 or newer. From the frontend directory, install dependencies
and optionally set the API URL:

```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

Open `http://localhost:3000`. To point the frontend at another API host, change
`NEXT_PUBLIC_API_URL` in `frontend/.env.local` and add the matching browser
origin to the backend's `FRONTEND_ORIGINS`.

Create a production frontend build with:

```bash
cd frontend
npm run build
npm start
```
