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

    # STEP 1: transcription
    audio = extract_audio(file_path)
    transcript = transcribe(audio)

    route = agent_router(query)

    # STEP 2: vision (only if needed)
    objects, texts = [], []

    if route in ["vision", "qa"]:
        frames = extract_frames(file_path)

        for f in frames:
            objects.extend(detect_objects(f))
            texts.extend(extract_text(f))

    # STEP 3: response
    if route == "transcription":
        return {"result": transcript}

    elif route == "summary":
        return {"result": chat_agent("Summarize this:\n" + transcript)}

    else:
        answer = chat_agent(query, transcript, objects, texts)
        return {"result": answer}
    

# from fastapi import APIRouter, UploadFile, File
# import os
# import shutil
# from app.agents.transcriber import transcribe
# from app.services.video_processor import extract_audio
# from app.agents.chat import chat
# from app.agents.summarizer import summarize

# router = APIRouter()

# UPLOAD_DIR = "uploads"
# os.makedirs(UPLOAD_DIR, exist_ok=True)

# @router.get("/")
# def read_root():
#     return {"message": "Backend is running"}


# @router.post("/upload-video/")
# async def upload_video(file: UploadFile = File(...)):
#     file_path = os.path.join(UPLOAD_DIR, file.filename)

#     with open(file_path, "wb") as buffer:
#         shutil.copyfileobj(file.file, buffer)
    
#     # extract audio
#     audio_path = extract_audio(file_path)
#     # print("Audio extracted: ",audio_path)

#     # transcribe
#     text = transcribe(audio_path)

#     # summarize once
#     summary = summarize(text)

#     return {
#         "filename": file.filename, 
#         "transcription": text ,
#         "summary": summary,
#     }

# def build_prompt(user_msg, context):
#     if "summarize" in user_msg.lower():
#         task = "Summarize the following content"
#     elif "key point" in user_msg.lower():
#         task = "Extract key points"
#     else:
#         task = "Answer the question based on the context"

#     return f"""
#         You are a helpful AI assistant, Shabi.

#         Rules:
#         - Be concise
#         - Use context if provided
#         - if context is missing, say you don't know
#         - Keep answers short and useful

#         Task:
#         {task}

#         Context:
#         {context if context else "None"}

#         User Question:
#         {user_msg}

#         Answer:
#     """

# @router.post("/chat/")
# async def chat(message: str, context: str = ""):
#     prompt = build_prompt(message, context)
#     reply = chat(prompt)
#     print("chat(): ", reply)

#     return {
#         "response": reply
#         }