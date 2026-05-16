# import requests

# def find_nearby_landmark(lat, lng):
#     try:
#         # 🧠 OVERPASS QUERY = YOU CONTROL WHAT A LANDMARK IS
#         query = f"""
#         [out:json];
#         (
#           node(around:500,{lat},{lng})["tourism"="attraction"];
#           node(around:500,{lat},{lng})["historic"];
#           node(around:500,{lat},{lng})["amenity"="museum"];
#           node(around:500,{lat},{lng})["leisure"="park"];
#           way(around:500,{lat},{lng})["tourism"="attraction"];
#           way(around:500,{lat},{lng})["historic"];
#         );
#         out center;
#         """

#         # 🌍 CALL OVERPASS API
#         res = requests.post(
#     "https://overpass.kumi.systems/api/interpreter",
#     data={"data": query},
#     timeout=20
# )

#         # 🧪 DEBUG (optional but useful)
#         print("STATUS:", res.status_code)

#         # ❌ Handle HTTP errors
#         if res.status_code != 200:
#             return {
#                 "id": "error",
#                 "name": "Overpass HTTP Error",
#                 "description": res.text[:300]
#             }

#         data = res.json()
#         elements = data.get("elements", [])

#         # ❌ No results found
#         if not elements:
#             return {
#                 "id": "unknown",
#                 "name": "No landmark found nearby",
#                 "description": "No mapped landmark in this area"
#             }

#         # 🧠 Pick first result (later we can rank this)
     
#         tags = place.get("tags", {})
#            def score(tags):
#         score = 0

#         if tags.get("tourism") == "attraction":
#             score += 5

#         if tags.get("historic"):
#             score += 4

#         if "Eiffel" in str(tags.get("name", "")):
#             score += 10

#         if tags.get("man_made") == "survey_point":
#             score -= 5

#          return score
#    def score(tags):
#         score = 0

#         if tags.get("tourism") == "attraction":
#             score += 5

#         if tags.get("historic"):
#             score += 4

#         if "Eiffel" in str(tags.get("name", "")):
#             score += 10

#         if tags.get("man_made") == "survey_point":
#             score -= 5

#          return score
#         return {
#             "id": place.get("id", "unknown"),
#             "name": tags.get("name", "Unknown landmark"),
#             "description": tags.get("description") or str(tags),
#             "lat": place.get("lat") or place.get("center", {}).get("lat"),
#             "lng": place.get("lon") or place.get("center", {}).get("lon"),
#         }

#     except Exception as e:
#         return {
#             "id": "error",
#             "name": "Service Exception",
#             "description": str(e)
#         }
import requests

def score(tags):
    """
    🎯 AR ranking system: decides what is a 'real landmark'
    """

    score = 0
    name = str(tags.get("name", "")).lower()

    # 🏆 ICONIC LANDMARK BOOST
    if "eiffel" in name:
        score += 100
    if "louvre" in name:
        score += 80
    if "notre dame" in name:
        score += 80
    if "arc de triomphe" in name:
        score += 80

    # 🏛️ LANDMARK TYPES
    if tags.get("tourism") == "attraction":
        score += 30

    if tags.get("historic"):
        score += 20

    if tags.get("amenity") == "museum":
        score += 25

    if tags.get("leisure") == "park":
        score += 10

    # ❌ DOWNGRADE NOISE OBJECTS
    if tags.get("historic") == "clock":
        score -= 10

    if tags.get("man_made") == "survey_point":
        score -= 20

    return score


def find_nearby_landmark(lat, lng):
    try:
        # 🧠 OVERPASS QUERY (you control AR vision here)
        query = f"""
        [out:json];
        (
          node(around:500,{lat},{lng})["tourism"="attraction"];
          node(around:500,{lat},{lng})["historic"];
          node(around:500,{lat},{lng})["amenity"="museum"];
          node(around:500,{lat},{lng})["leisure"="park"];
          way(around:500,{lat},{lng})["tourism"="attraction"];
          way(around:500,{lat},{lng})["historic"];
        );
        out center;
        """

        # 🌍 CALL OVERPASS (stable format)
        res = requests.post(
    "https://overpass.kumi.systems/api/interpreter",
    data=query,
    timeout=20
)

        # ❌ HTTP error handling
        if res.status_code != 200:
            return {
                "id": "error",
                "name": "Overpass HTTP Error",
                "description": res.text[:300]
            }

        data = res.json()
        elements = data.get("elements", [])

        # ❌ No results
        if not elements:
            return {
                "id": "unknown",
                "name": "No landmark found nearby",
                "description": "No AR landmark detected in this area"
            }

        # 🧠 PICK BEST LANDMARK (IMPORTANT PART)
        best = max(
            elements,
            key=lambda x: score(x.get("tags", {}))
        )

        tags = best.get("tags", {})

        return {
            "id": best.get("id", "unknown"),
            "name": tags.get("name", "Unknown landmark"),
            "description": tags.get("description") or str(tags),
            "lat": best.get("lat") or best.get("center", {}).get("lat"),
            "lng": best.get("lon") or best.get("center", {}).get("lon"),
        }

    except Exception as e:
        return {
            "id": "error",
            "name": "Service Exception",
            "description": str(e)
        }