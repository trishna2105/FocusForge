import os
from google import genai

_client = None

def get_client():
    global _client
    if _client is None:
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise RuntimeError("GEMINI_API_KEY not found in .env")
        _client = genai.Client(api_key=api_key)
    return _client


def generate_resources(topic: str):
    client = get_client()

    prompt = f"""
    Suggest learning resources for the topic "{topic}".

    Provide:
    1. 3 YouTube playlists
    2. 3 useful websites
    3. 2 standard textbooks

    Keep the response clear and concise.
    """

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return {
        "raw": response.text
    }
