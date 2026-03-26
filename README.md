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

# dependencies
pip install fastapi uvicorn
pip install torch torchvision torchaudio
pip install transformers accelerate
pip install faster-whisper
pip install opencv-python
pip install moviepy
pip install ultralytics
pip install easyocr
pip install python-dotenv
