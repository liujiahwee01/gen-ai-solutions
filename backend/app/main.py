from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all (for dev)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(router)

# from fastapi import FastAPI, UploadFile, File
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# import os
# import shutil

# from typing import Optional
# from app.agents.transcriber import transcribe
# from app.services.video_processor import extract_audio
# from backend.app.agents.chat import chat
# from app.agents.summarizer import summarize

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # allow all (for dev)
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# @app.get("/")
# def read_root():
#     return {"message": "Backend is running"}

# UPLOAD_DIR = "uploads"
# os.makedirs(UPLOAD_DIR, exist_ok=True)
# @app.post("/upload-video/")
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

# class ChatRequest(BaseModel):
#     message:str
#     context: Optional[str] = None


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

# @app.post("/chat/")
# async def chat(req: ChatRequest):
#     prompt = build_prompt(req.message, req.context)

#     reply = chat(prompt)
#     print("chat(): ", reply)

#     return {
#         "response": reply
#         }