import os, re, certifi, airportsdata, pycountry
from dotenv import load_dotenv

load_dotenv()

os.environ['SSL_CERT_FILE'] = certifi.where()
os.environ['REQUESTS_CA_BUNDLE'] = certifi.where()

API_KEY= os.getenv('AVIATIONSTACK_API_KEY')
DEFAULT_ORIGIN_IATA= os.getenv("DEFAULT_ORIGIN_IATA", "VGA")

BASE_URL = "http://api.aviationstack.com/v1/flights"

AIRPORTS = airportsdata.load('IATA')
