# TripBuddy---Multi-Agent-Trip-planning-system

## Setup

### Prerequisites

- Python 3.12
- Git

Python 3.12 is recommended because some dependencies may not yet provide wheels for newer Python versions.

### Create a virtual environment and install dependencies

On macOS or Linux:

```bash
python3.12 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
```

On Windows using PowerShell:

```powershell
py -3.12 -m venv .venv
.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
```

Configure API keys and database credentials in a local `.env` file. Tavily search requires:

```dotenv
TAVILY_API_KEY=your_tavily_api_key
```

Do not commit secrets.