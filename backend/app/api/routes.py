from fastapi import APIRouter, UploadFile, File
import os, shutil

from app.services.video_processor import extract_audio, extract_frames
from app.agents.transcriber import transcribe
from app.agents.chat import chat_agent, agent_router
from app.agents.vision import detect_objects, extract_text
from app.core.config import UPLOAD_DIR

router = APIRouter()
os.makedirs(UPLOAD_DIR, exist_ok=True)
video_store = {}

@router.post("/upload-video/")
async def upload_video(file: UploadFile = File(...)):
    
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # process once
    audio = extract_audio(file_path)
    transcript = transcribe(audio)

    frames = extract_frames(file_path)

    objects, texts = [], []
    for f in frames:
        objects.extend(detect_objects(f))
        texts.extend(extract_text(f))

    # store in memory
    video_store["data"] = {
        "transcript": transcript,
        "objects": objects,
        "texts": texts
    }

    return {"message": "Video uploaded and processed"}

from fastapi import Body

@router.post("/chat/")
async def chat(query: str = Body(...)):
    
    if "data" not in video_store:
        return {"response": "No video uploaded yet. Please upload a video first."}

    data = video_store["data"]

    route = agent_router(query)

    if route == "transcription":
        return {"response": data["transcript"]}

    elif route == "summary":
        return {"response": chat_agent("Summarize this:\n" + data["transcript"])}

    else:
        answer = chat_agent(
            query,
            data["transcript"],
            data["objects"],
            data["texts"]
        )
        return {"response": answer}
    
@router.post("/process/")
async def process_video(file: UploadFile = File(...), query: str = ""):
    
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    audio = extract_audio(file_path)
    transcript = transcribe(audio)

    route = agent_router(query)

    objects, texts = [], []

    if route in ["vision", "qa"]:
        frames = extract_frames(file_path)

        for f in frames:
            objects.extend(detect_objects(f))
            texts.extend(extract_text(f))

    if route == "transcription":
        return {"result": transcript}

    elif route == "summary":
        return {"result": chat_agent("Summarize this:\n" + transcript)}

    else:
        answer = chat_agent(query, transcript, objects, texts)
        return {"result": answer}