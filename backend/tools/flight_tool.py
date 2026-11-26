import os, re, certifi, airportsdata, pycountry, requests
from dotenv import load_dotenv

load_dotenv()

os.environ['SSL_CERT_FILE'] = certifi.where()
os.environ['REQUESTS_CA_BUNDLE'] = certifi.where()

API_KEY= os.getenv('AVIATIONSTACK_API_KEY')
DEFAULT_ORIGIN_IATA= os.getenv("DEFAULT_ORIGIN_IATA", "VGA")

BASE_URL = "https://api.apilayer.net/aviationstack/v1/flights"

AIRPORTS = airportsdata.load('IATA')

COUNTRY_ALIASES = {
    "usa": "US",
    "u.s.a": "US",
    "u.s.": "US",
    "america": "US",
    "united states": "US",
    "uk": "GB",
    "u.k.": "GB",
    "britain": "GB",
    "england": "GB",
    "uae": "AE",
    "dubai": "AE",
    "south korea": "KR",
    "korea": "KR",
    "russia": "RU",
    "vietnam": "VN",
    "India": "IN",
    "india": "IN",
    "japan": "JP",
    "china": "CN",
    "singapore": "SG",
    "malaysia": "MY",
    "thailand": "TH",
    "indonesia": "ID",
    "nepal": "NP",
    "qatar": "QA",
    "saudi arabia": "SA",
    "turkey": "TR",
    "canada": "CA",
    "australia": "AU",
    "germany": "DE",
    "france": "FR",
    "italy": "IT",
    "spain": "ES",
}

# Preferred main airport for country-level search
COUNTRY_MAIN_AIRPORT = {
    "IN": "DEL",
    "JP": "NRT",
    "US": "JFK",
    "GB": "LHR",
    "AE": "DXB",
    "SG": "SIN",
    "MY": "KUL",
    "TH": "BKK",
    "ID": "CGK",
    "CN": "PEK",
    "KR": "ICN",
    "NP": "KTM",
    "QA": "DOH",
    "SA": "JED",
    "TR": "IST",
    "CA": "YYZ",
    "AU": "SYD",
    "DE": "FRA",
    "FR": "CDG",
    "IT": "FCO",
    "ES": "MAD",
    "BD": "DAC",
}

CITY_MAIN_AIRPORT = {
    "delhi": "DEL",
    "new delhi": "DEL",
    "mumbai": "BOM",
    "kolkata": "CCU",
    "chennai": "MAA",
    "bangalore": "BLR",
    "bengaluru": "BLR",
    "tokyo": "NRT",
    "osaka": "KIX",
    "kyoto": "KIX",
    "new york": "JFK",
    "london": "LHR",
    "dubai": "DXB",
    "singapore": "SIN",
    "kuala lumpur": "KUL",
    "bangkok": "BKK",
    "doha": "DOH",
    "istanbul": "IST",
    "toronto": "YYZ",
    "sydney": "SYD",
    "paris": "CDG",
    "rome": "FCO",
    "dhaka": "DAC",
    "madrid": "MAD",
    "frankfurt": "FRA",
}


def clean_text(text : str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^a-z0-9\s]", " ", text)
    text = re.sub(r"\s+", " ", text)

    stop_words = [
        "flight", "flights", "ticket", "tickets", "trip", "travel",
        "plan", "complete", "days", "day", "including", "hotel",
        "hotels", "sightseeing", "under", "budget", "info", "information"
    ]

    words = [w for w in text.split() if w not in stop_words]

    return " ".join(words).strip()


def country_name_to_code(text : str):
    text = clean_text(text)

    if text in COUNTRY_ALIASES:
        return COUNTRY_ALIASES[text]

    try:
        country = pycountry.countries.search_fuzzy(text)
        if country:
            return country[0].alpha_2
    except LookupError:
        pass


    # Detecting country name inside the larger text
    for country in pycountry.countries:
        country_name = country.name.lower()
        if country_name in text:
            return country.alpha_2

    for alias, code in COUNTRY_ALIASES.items():
        if alias in text:
            return code

    return None


def airport_country_match(airport : dict, country_code : str) -> bool:
    airport_country = str(airport.get("country_code", "")).upper().strip()

    if airport_country == country_code:
        return True

    try:
        country = pycountry.countries.get(alpha_2=country_code)
        if country and airport_country.lower() == country.name.lower():
            return True
    except Exception:
        pass

    return False


def get_best_airport_for_country(country_code : str) -> str:
    preferred_airport = COUNTRY_MAIN_AIRPORT.get(country_code.upper())

    if preferred_airport and preferred_airport in AIRPORTS:
        return preferred_airport

    candidates = []

    for iata, airport in AIRPORTS.items():
        if not iata:
            continue

        if airport_country_match(airport, country_code):
            name = str(airport.get("name", "")).lower()
            city = str(airport.get("city", "")).lower()

            score = 0

            if "international" in name:
                score += 50
            if "intl" in name:
                score += 40
            if "capital" in name:
                score += 20
            if city:
                score += 5

            candidates.append((score, iata))

        if not candidates:
            return None


        candidates.sort(reverse=True)

        return candidates[0][1]


def resolve_location_to_iata(location : str):
    """
    Resolve a location (city, country, or airport name) to an IATA airport code.

    Example:
        India -> IND
    """

    if not location:
        return None


    raw_location = location.strip().upper()

    # Direct IATA code
    if re.fullmatch(r"[A-Z]{3}", raw_location):
        code = raw_location
        if code in AIRPORTS:
            return code

    location_cleaned = clean_text(raw_location)

    if not location_cleaned:
        return None

    # City Prefrerred Airport
    if location_cleaned in CITY_MAIN_AIRPORT:
        return CITY_MAIN_AIRPORT[location_cleaned]

    # Country preferred airport
    country_code = country_name_to_code(location_cleaned)
    if country_code:
        airport_code = get_best_airport_for_country(country_code)
        if airport_code:
            return airport_code

    # Exact city match from the airport database
    city_matches = []

    for iata, airport in AIRPORTS.items():
        city = str(airport.get("city", "")).lower().strip()
        name = str(airport.get("name", "")).lower().strip()

        score = 0

        if city == location_cleaned:
            score += 100
        elif location_cleaned in city:
            score += 70

        if location_cleaned in name:
            score += 50

        if "international" in name:
            score += 10

        if score > 0:
            city_matches.append((score, iata))

    if city_matches:
        city_matches.sort(reverse=True)
        return city_matches[0][1]

    return None


def find_location_mentions(query: str):
    """
    Finds country or city names inside a natural language query.
    """

    q = query.lower()
    mentions = []

    # Country aliases
    for alias in COUNTRY_ALIASES:
        if re.search(rf"\b{re.escape(alias)}\b", q):
            mentions.append(alias)

    # Country names from pycountry
    for country in pycountry.countries:
        name = country.name.lower()
        if len(name) >= 4 and re.search(rf"\b{re.escape(name)}\b", q):
            mentions.append(name)

    # City names from our preferred city map
    for city in CITY_MAIN_AIRPORT:
        if re.search(rf"\b{re.escape(city)}\b", q):
            mentions.append(city)

    # Remove duplicate while keeping order
    unique_mentions = []
    for item in mentions:
        if item not in unique_mentions:
            unique_mentions.append(item)

    return unique_mentions


def parse_route(query: str):
    """
    Returns:
    dep_iata, arr_iata

    Can return:
    None, None  -> global live flights
    DAC, NRT    -> filtered route
    DAC, None   -> all flights from DAC
    None, NRT   -> all flights to NRT
    """

    q = query.strip()
    q_lower = q.lower()

    # Global / all-country query
    global_keywords = [
        "all country",
        "all countries",
        "global flight",
        "global flights",
        "all flight",
        "all flights",
        "worldwide flight",
        "worldwide flights",
    ]

    if any(keyword in q_lower for keyword in global_keywords):
        return None, None

    # Direct IATA code route: DAC to NRT
    codes = re.findall(r"\b[A-Z]{3}\b", q)

    if len(codes) >= 2:
        dep = codes[0].upper()
        arr = codes[1].upper()
        return dep, arr

    # Pattern: from X to Y
    match = re.search(
        r"\bfrom\s+(.+?)\s+\bto\s+(.+?)(?:\s+(?:on|for|under|including|with|in|at)\b|[.!?]|$)",
        q_lower,
    )

    if match:
        origin_text = match.group(1)
        dest_text = match.group(2)

        dep_iata = resolve_location_to_iata(origin_text)
        arr_iata = resolve_location_to_iata(dest_text)

        return dep_iata, arr_iata

    # Pattern: to Y from X
    match = re.search(
        r"\bto\s+(.+?)\s+\bfrom\s+(.+?)(?:\s+(?:on|for|under|including|with|in|at)\b|[.!?]|$)",
        q_lower,
    )

    if match:
        dest_text = match.group(1)
        origin_text = match.group(2)

        dep_iata = resolve_location_to_iata(origin_text)
        arr_iata = resolve_location_to_iata(dest_text)

        return dep_iata, arr_iata

    # Pattern: flights from X
    match = re.search(r"\bfrom\s+(.+?)(?:[.!?]|$)", q_lower)

    if match:
        origin_text = match.group(1)
        dep_iata = resolve_location_to_iata(origin_text)
        return dep_iata, None

    # Pattern: flights to X
    match = re.search(r"\bto\s+(.+?)(?:[.!?]|$)", q_lower)

    if match:
        dest_text = match.group(1)
        arr_iata = resolve_location_to_iata(dest_text)
        return None, arr_iata

    # Fallback: find country/city mentions
    mentions = find_location_mentions(q)

    if len(mentions) >= 2:
        dep_iata = resolve_location_to_iata(mentions[0])
        arr_iata = resolve_location_to_iata(mentions[1])
        return dep_iata, arr_iata

    if len(mentions) == 1:
        arr_iata = resolve_location_to_iata(mentions[0])
        return DEFAULT_ORIGIN_IATA, arr_iata

    return None, None


def format_flight(flight: dict):
    airline = flight.get("airline", {}).get("name") or "Unknown airline"
    flight_number = flight.get("flight", {}).get("iata") or "Unknown flight number"
    status = flight.get("flight_status") or "Unknown"

    dep = flight.get("departure", {}) or {}
    arr = flight.get("arrival", {}) or {}

    dep_airport = dep.get("airport") or "Unknown departure airport"
    dep_iata = dep.get("iata") or "Unknown"
    dep_terminal = dep.get("terminal") or "N/A"
    dep_gate = dep.get("gate") or "N/A"
    dep_scheduled = dep.get("scheduled") or "Unknown"
    dep_delay = dep.get("delay")
    dep_delay_text = f"{dep_delay} minutes" if dep_delay is not None else "N/A"

    arr_airport = arr.get("airport") or "Unknown arrival airport"
    arr_iata = arr.get("iata") or "Unknown"
    arr_terminal = arr.get("terminal") or "N/A"
    arr_gate = arr.get("gate") or "N/A"
    arr_scheduled = arr.get("scheduled") or "Unknown"
    arr_delay = arr.get("delay")
    arr_delay_text = f"{arr_delay} minutes" if arr_delay is not None else "N/A"

    return f"""
Airline: {airline}
Flight: {flight_number}
Status: {status}

Departure:
- Airport: {dep_airport}
- IATA: {dep_iata}
- Terminal: {dep_terminal}
- Gate: {dep_gate}
- Scheduled: {dep_scheduled}
- Delay: {dep_delay_text}

Arrival:
- Airport: {arr_airport}
- IATA: {arr_iata}
- Terminal: {arr_terminal}
- Gate: {arr_gate}
- Scheduled: {arr_scheduled}
- Delay: {arr_delay_text}
""".strip()


def search_flights(
    query: str,
    origin_iats: list[str] | None = None,
    limit: int = 10,
):
    if not API_KEY:
        return (
            "Flight API error: AVIATIONSTACK_API_KEY is missing.\n"
            "Please add this in your .env file:\n"
            "AVIATIONSTACK_API_KEY=your_api_key_here"
        )

    dep_iata, arr_iata = parse_route(query)
    requested_origins = list(
        dict.fromkeys(
            origin.strip().upper()
            for origin in (origin_iats or [])
            if isinstance(origin, str) and origin.strip()
        )
    )
    has_explicit_origin = (
        bool(re.search(r"\bfrom\s+", query, re.IGNORECASE))
        or len(re.findall(r"\b[A-Z]{3}\b", query)) >= 2
        or len(find_location_mentions(query)) >= 2
    )

    if dep_iata and (dep_iata != DEFAULT_ORIGIN_IATA or has_explicit_origin):
        search_origins = [dep_iata]
    elif requested_origins:
        search_origins = requested_origins
    elif dep_iata:
        search_origins = [dep_iata]
    else:
        search_origins = [None]

    flights_by_origin = {origin: [] for origin in search_origins}
    api_errors = []
    for origin in search_origins:
        params = {
            "access_key": API_KEY,
            "limit": min(limit, 100),
        }

        if origin:
            params["dep_iata"] = origin

        if arr_iata:
            params["arr_iata"] = arr_iata

        try:
            response = requests.get(BASE_URL, params=params, timeout=30)
            data = response.json()
        except requests.exceptions.RequestException as e:
            api_errors.append(f"{origin or 'Global search'}: request failed: {e}")
            continue
        except ValueError:
            api_errors.append(f"{origin or 'Global search'}: API returned invalid JSON.")
            continue

        if "error" in data:
            error = data["error"]
            api_errors.append(
                f"{origin or 'Global search'}: {error.get('message', 'Unknown error')} "
                f"(code: {error.get('code', 'Unknown')})"
            )
            continue

        flights_by_origin[origin].extend(data.get("data", []))

    if not any(flights_by_origin.values()):
        route_text = ""

        if search_origins and search_origins[0] is not None:
            if len(search_origins) == 1 and arr_iata:
                route_text = f" for route {search_origins[0]} to {arr_iata}"
            else:
                route_text = f" from {', '.join(search_origins)}"
                if arr_iata:
                    route_text += f" to {arr_iata}"
        elif arr_iata:
            route_text = f" to {arr_iata}"

        no_results = (
            f"No live flight data found{route_text}.\n\n"
            "Note: AviationStack provides live/status flight data, not ticket prices. "
            "For actual fare prices, use a flight-pricing API such as Amadeus."
        )
        if api_errors:
            return "Flight API errors:\n" + "\n".join(api_errors) + "\n\n" + no_results
        return no_results

    selected_flights = []
    for flight_index in range(max(map(len, flights_by_origin.values()))):
        for origin in search_origins:
            flights = flights_by_origin[origin]
            if flight_index < len(flights) and len(selected_flights) < limit:
                selected_flights.append((origin, flights[flight_index]))

    sections = []
    for origin in search_origins:
        flights = [
            format_flight(flight)
            for flight_origin, flight in selected_flights
            if flight_origin == origin
        ]
        if not flights:
            continue

        if origin and arr_iata:
            route_info = f"Live flights from {origin} to {arr_iata}"
        elif origin:
            route_info = f"Live flights from {origin}"
        elif arr_iata:
            route_info = f"Live flights to {arr_iata}"
        else:
            route_info = "Global live flights"
        sections.append(f"{route_info}\n\n" + "\n\n---\n\n".join(flights))

    result = "\n\n---\n\n".join(sections)
    if api_errors:
        return "Some flight searches failed:\n" + "\n".join(api_errors) + "\n\n" + result
    return result
