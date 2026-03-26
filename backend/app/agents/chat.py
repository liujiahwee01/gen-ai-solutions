from app.models.llm_model import generate

def agent_router(query: str):
    query = query.lower()

    if "transcribe" in query:
        return "transcription"
    elif "summary" in query:
        return "summary"
    elif "object" in query or "show" in query:
        return "vision"
    elif "powerpoint" in query or "ppt" in query:
        return "ppt"
    else:
        return "qa"


def build_prompt(query, transcript=None, objects=None, ocr_text=None):
    return f"""
You are an AI Video Analyst.

You have:
- Transcript: {transcript}
- Objects detected: {objects}
- Extracted text (OCR): {ocr_text}

User query:
{query}

Answer clearly and concisely.
"""

def chat_agent(query, transcript=None, objects=None, ocr_text=None):
    prompt = build_prompt(query, transcript, objects, ocr_text)
    return generate(prompt)