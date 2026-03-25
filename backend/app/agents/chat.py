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

# from transformers import pipeline

# chat_pipeline = pipeline(
#     "text-generation",
#     model="microsoft/Phi-3-mini-4k-instruct",
#     max_new_tokens=100,
#     temperature=0.7,
#     top_p=0.9
# )

# def chat(prompt: str):
#     result = chat_pipeline(
#         prompt,
#         max_new_tokens=150, 
#         do_sample=True,
#         temperature=0.7,
#         top_p=0.9
#     )

#     output = result[0]["generated_text"]

#     reply = output[len(prompt):]

#     return reply.strip()