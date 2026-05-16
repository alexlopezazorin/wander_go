# import os
# from dotenv import load_dotenv

# load_dotenv()

# GRADIUM_API_KEY = os.getenv("GRADIUM_API_KEY")

# def test_key():
#     print("Gradium API Key loaded:")
#     print(GRADIUM_API_KEY)

# if __name__ == "__main__":
#     test_key()

import os
from dotenv import load_dotenv
from tavily import TavilyClient

# Load your .env
load_dotenv()

# Get your Tavily API key
api_key = os.getenv("TAVILY_API_KEY")
if not api_key:
    raise ValueError("Tavily API key not found in .env")

# Initialize Tavily client
client = TavilyClient(api_key=api_key)

# Make a simple search
query = "Eiffel Tower history"

result = client.search(query)

# Print the response
print("Query:", query)
print("Result:", result)