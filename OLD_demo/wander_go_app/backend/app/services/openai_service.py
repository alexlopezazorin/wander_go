import os
from dotenv import load_dotenv
from openai import OpenAI

# load .env file
load_dotenv()

# get key from environment
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def generate_story(landmark: str):
    prompt = f"""
    You are Napoleon Bonaparte.
    You are standing in front of {landmark}.
    Tell a short dramatic historical story (5-8 sentences).
    Speak in first person.
    Be immersive and theatrical.
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a historical storyteller."},
            {"role": "user", "content": prompt}
        ]
    )

    return response.choices[0].message.content