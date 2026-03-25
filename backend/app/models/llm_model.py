from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
from app.core.config import LLM_MAX_TOKENS, LLM_MODEL_NAME

MODEL_NAME = "Qwen/Qwen2-7B-Instruct"

tokenizer = AutoTokenizer.from_pretrained(LLM_MODEL_NAME)

model = AutoModelForCausalLM.from_pretrained(
    LLM_MODEL_NAME,
    torch_dtype=torch.float16,
    device_map="auto"
)

def generate(prompt: str):
    inputs = tokenizer(prompt, return_tensors="pt").to(model.device)

    outputs = model.generate(
        **inputs,
        max_new_tokens=LLM_MAX_TOKENS,
        temperature=0.7
    )

    return tokenizer.decode(outputs[0], skip_special_tokens=True)