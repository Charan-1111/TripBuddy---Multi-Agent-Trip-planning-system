import asyncio
import os
import httpx
from dotenv import load_dotenv


load_dotenv()
LOCATION_API = os.getenv("LOCATION_API")


async def get_geolocation_for_provided_place(
    client: httpx.AsyncClient,
    place: str,
) -> tuple[float, float] | None:
    if not LOCATION_API:
        raise ValueError("LOCATION_API environment variable is not set.")

    response = await client.get(
        LOCATION_API,
        params={"q": place, "format": "jsonv2", "limit": 1},
    )
    response.raise_for_status()

    results = response.json()
    if not results:
        return None

    return float(results[0]["lat"]), float(results[0]["lon"])


async def main() -> None:
    async with httpx.AsyncClient(
        timeout=httpx.Timeout(15.0, connect=5.0),
        headers={"User-Agent": "TripBuddy/0.1 (contact: charanavvaru11@gmail.com)"},
    ) as client:
        try:
            coordinates = await get_geolocation_for_provided_place(client, "Srisailam")
        except httpx.ConnectTimeout:
            print("Timed out while establishing a connection to Nominatim.")
        except httpx.ReadTimeout:
            print("Timed out while waiting for data from Nominatim.")
        except httpx.HTTPStatusError as exc:
            print(f"Nominatim returned HTTP {exc.response.status_code}.")
        except httpx.RequestError as exc:
            print(f"Request failed: {exc!r}")
        else:
            if coordinates is None:
                print("No matching location found.")
                return

            latitude, longitude = coordinates
            print(f"Latitude: {latitude}, Longitude: {longitude}")


if __name__ == "__main__":
    asyncio.run(main())
