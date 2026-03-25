# gen-ai-solutions


# features
1. video upload
1. transcription
1. chat
1. simple pdf generation

1. graph detection
1. ppt generation

# command
# backend
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload

# frontend
cd frontend
npm run dev
npm run tauri dev

# tech stack
models:
- transcription: faster-whisper (int8)
- vision: YOLOv8 + PaddleOCR + BLIP-2
- LLM: Llama 3 88 (GGUF)

runtime:
- openvino

storage:
- FAISS

# prerequisite
-rust
-node.js >20.19.0
-ffmpeg

# ltr check
Create .env:

LLM_MODEL_NAME=Qwen/Qwen2-7B-Instruct
WHISPER_MODEL_SIZE=base
WHISPER_COMPUTE_TYPE=int8
YOLO_MODEL=yolov8n.pt

Install:

pip install python-dotenv

Update config.py:

from dotenv import load_dotenv
load_dotenv()