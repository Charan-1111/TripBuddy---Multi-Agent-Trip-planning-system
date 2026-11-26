from math import radians, sin, cos, asin, sqrt

def calculate_distance(user_location : tuple, airport_location : tuple):
    # tuple structure (latitude, longitude)
    lat1, lon1, lat2, lon2 = map(radians, (user_location[0], user_location[1], airport_location[0], airport_location[1]))

    a = (
        sin((lat2 - lat1) / 2) ** 2
        + cos(lat1) * cos(lat2) * sin((lon2 - lon1) / 2) ** 2
    )

    return 2 * 6371.0 * asin(sqrt(min(1.0, a)))
