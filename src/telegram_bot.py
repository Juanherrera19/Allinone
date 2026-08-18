import os
import requests

# Prefer explicit environment vars, then local config_local.py (user requested no secrets),
# then fall back to previous heuristic.
TELEGRAM_TOKEN = os.getenv("TELEGRAM_TOKEN")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")

try:
    # import local config if present
    from config_local import TELEGRAM_TOKEN as LOCAL_TELEGRAM_TOKEN, TELEGRAM_CHAT_ID as LOCAL_TELEGRAM_CHAT_ID
    if not TELEGRAM_TOKEN and LOCAL_TELEGRAM_TOKEN:
        TELEGRAM_TOKEN = LOCAL_TELEGRAM_TOKEN
    if not TELEGRAM_CHAT_ID and LOCAL_TELEGRAM_CHAT_ID:
        TELEGRAM_CHAT_ID = LOCAL_TELEGRAM_CHAT_ID
except Exception:
    pass

if not TELEGRAM_TOKEN or not TELEGRAM_CHAT_ID:
    # last-resort: try to parse legacy script for tokens (best-effort)
    try:
        original = os.path.join('PRECIO DE BOLSA - AUTO.py')
        if os.path.exists(original):
            with open(original, 'r', encoding='utf-8') as f:
                txt = f.read()
            import re
            m_token = re.search(r'TELEGRAM_TOKEN\s*=\s*"([^"]+)"', txt)
            m_chat = re.search(r'TELEGRAM_CHAT_ID\s*=\s*"?([\-0-9]+)"?', txt)
            if m_token and not TELEGRAM_TOKEN:
                TELEGRAM_TOKEN = m_token.group(1)
            if m_chat and not TELEGRAM_CHAT_ID:
                TELEGRAM_CHAT_ID = m_chat.group(1)
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
