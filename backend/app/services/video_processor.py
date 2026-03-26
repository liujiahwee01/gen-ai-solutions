from app.core.config import AUDIO_OUTPUT
import cv2
from moviepy.editor import VideoFileClip
from app.agents.transcriber import transcribe

# extract audio
def extract_audio(video_path,):
    video = VideoFileClip(video_path)
    video.audio.write_audiofile(AUDIO_OUTPUT)
    return AUDIO_OUTPUT


# extract frames
def extract_frames(video_path, interval=2):
    cap = cv2.VideoCapture(video_path)

    frames = []
    fps = int(cap.get(cv2.CAP_PROP_FPS))

    count = 0
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        if count % (fps * interval) == 0:
            frames.append(frame)

        count += 1

    cap.release()
    return frames