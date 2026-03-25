from app.models.llm_model import LLMModel
from app.core.config import LLM_MODEL_NAME

llm = LLMModel(LLM_MODEL_NAME)

def summarize(text):
    prompt = f"""
        Summarize the following content clearly.

        Rules:
        - Use bullet points
        - Keep it concise
        - Focus on key ideas

        Content:
        {text}

        Summary:
        """
    return llm.generate(prompt)