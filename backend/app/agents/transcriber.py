from app.core.config import WHISPER_COMPUTE_TYPE, WHISPER_SIZE
from faster_whisper import WhisperModel

model = WhisperModel(WHISPER_SIZE, compute_type=WHISPER_COMPUTE_TYPE, device="cpu")

def transcribe(audio_path: str):
    segments, _ = model.transcribe(audio_path)

    text = ""
    for seg in segments:
        text += seg.text + " "

    return text.strip()