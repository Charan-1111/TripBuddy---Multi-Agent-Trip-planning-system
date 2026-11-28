import unittest

from fastapi import FastAPI

from logic.nearest_airports import find_nearby_airports
from models import Airport
from tools.flight_tool import extract_destination_from_query, parse_route


class FindNearbyAirportsTest(unittest.TestCase):
    def test_uses_airports_from_app_state(self):
        app = FastAPI()
        app.state.airports = [
            Airport("Delhi Airport", "DEL", 28.5562, 77.1, True),
            Airport("Mumbai Airport", "BOM", 19.0896, 72.8656, True),
            Airport("Bengaluru Airport", "BLR", 13.1986, 77.7066, True),
            Airport("Unscheduled Airport", "UNS", 28.61, 77.2, False),
            Airport("Airport Without IATA", None, 28.61, 77.2, True),
        ]

        nearby = find_nearby_airports(
            (18.9907, 73.1168),
            app.state.airports,
            limit=2,
        )

        print("=================")
        print(nearby)
        print("=================")

        self.assertEqual(
            [airport.iata_code for airport, _ in nearby],
            ["DEL", "BOM"],
        )
        self.assertLess(nearby[0][1], nearby[1][1])


class ParseFlightRouteTest(unittest.TestCase):
    def test_extracts_destination_before_trip_constraints(self):
        destination = extract_destination_from_query(
            "Plan a trip to Ooty for 7 days for 2 people under a budget of 50000"
        )

        self.assertEqual(destination, "Ooty")

    def test_extracts_destination_with_country(self):
        destination = extract_destination_from_query(
            "Plan a trip to Ooty, India for 7 days"
        )

        self.assertEqual(destination, "Ooty, India")

    def test_extracts_destination_from_a_from_to_route(self):
        destination = extract_destination_from_query(
            "How to plan a trip from Bengaluru to Ooty for 7 days"
        )

        self.assertEqual(destination, "Ooty")

    def test_extracts_destination_before_an_origin_clause(self):
        destination = extract_destination_from_query(
            "Plan a trip to Ooty from Bengaluru for 7 days"
        )

        self.assertEqual(destination, "Ooty")

    def test_ignores_trailing_travel_question(self):
        destination = extract_destination_from_query(
            "Plan a trip to Ooty for 7 days and how to get there"
        )

        self.assertEqual(destination, "Ooty")

    def test_prefers_city_airport_when_country_is_also_in_destination(self):
        dep_iata, arr_iata = parse_route(
            "Plan a trip to bangalore, india for 7 days for 2 persons "
            "under the budget of 50000"
        )

        self.assertIsNone(dep_iata)
        self.assertEqual(arr_iata, "BLR")


if __name__ == "__main__":
    unittest.main()
