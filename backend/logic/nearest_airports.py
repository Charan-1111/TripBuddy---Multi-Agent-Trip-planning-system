from models import Airport
from utils import calculate_distance

def find_nearby_airports(user_current_location : tuple, airports : list[Airport], limit : int = 1):
    candidates = [
        (
            airport,
            calculate_distance(user_current_location, (airport.latitude, airport.longitude))
        )
        for airport in airports
        if airport.scheduled_service and airport.iata_code
    ]

    candidates = sorted(candidates, key= lambda candidate: candidate[1])[:limit]

    return candidates