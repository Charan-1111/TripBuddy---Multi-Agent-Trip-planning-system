from dataclasses import dataclass

@dataclass(frozen= True)
class Airport:
    name: str
    iata_code: str | None
    latitude: float
    longitude: float
    scheduled_service: bool