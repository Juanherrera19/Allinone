import os
import requests

TELEGRAM_TOKEN = os.getenv("TELEGRAM_TOKEN")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")

if not TELEGRAM_TOKEN or not TELEGRAM_CHAT_ID:
    # intentar extraer del archivo local original si existe (ruta del programa original)
    try:
        original = os.path.join('PYTHON', 'PROGRAMAS', 'ALL IN ONE', 'PRECIO DE BOLSA - AUTO.py')
        if os.path.exists(original):
            with open(original, 'r', encoding='utf-8') as f:
                txt = f.read()
            # buscar constantes conocidas
            import re
            m_token = re.search(r'TELEGRAM_TOKEN\s*=\s*"([^"]+)"', txt)
            m_chat = re.search(r'TELEGRAM_CHAT_ID\s*=\s*"?([\-0-9]+)"?', txt)
            if m_token:
                TELEGRAM_TOKEN = TELEGRAM_TOKEN or m_token.group(1)
            if m_chat:
                TELEGRAM_CHAT_ID = TELEGRAM_CHAT_ID or m_chat.group(1)
    except Exception:
        pass


def send_photo(image_path, caption=None):
    if not TELEGRAM_TOKEN or not TELEGRAM_CHAT_ID:
        raise RuntimeError("TELEGRAM_TOKEN o TELEGRAM_CHAT_ID no configurados")
    url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendPhoto"
    with open(image_path, "rb") as img:
        resp = requests.post(
            url,
            data={"chat_id": TELEGRAM_CHAT_ID, "caption": caption or ""},
            files={"photo": (os.path.basename(image_path), img, "image/png")},
            timeout=30
        )
    resp.raise_for_status()
    return resp.json()


def send_message(text):
    if not TELEGRAM_TOKEN or not TELEGRAM_CHAT_ID:
        raise RuntimeError("TELEGRAM_TOKEN o TELEGRAM_CHAT_ID no configurados")
    url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
    resp = requests.post(url, data={"chat_id": TELEGRAM_CHAT_ID, "text": text}, timeout=15)
    resp.raise_for_status()
    return resp.json()
