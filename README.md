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

If the application requires API keys or database credentials, configure them in a local `.env` file. Do not commit secrets.