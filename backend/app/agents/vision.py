from app.core.config import VISION_MODEL_NAME, OCR_LANG
from ultralytics import YOLO
import easyocr

yolo = YOLO(VISION_MODEL_NAME)
ocr = easyocr.Reader(OCR_LANG)

def detect_objects(frame):
    results = yolo(frame)
    names = results[0].names
    detected = []

    for box in results[0].boxes:
        cls_id = int(box.cls[0])
        detected.append(names[cls_id])

    return list(set(detected))


def extract_text(frame):
    results = ocr.readtext(frame)
    return [r[1] for r in results]