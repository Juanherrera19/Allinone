"""Envía una alerta a Telegram si hoy es el último día del mes (es decir, mañana cambia el mes)."""
import os
from datetime import datetime, timedelta
import requests

TELEGRAM_TOKEN = os.getenv('TELEGRAM_TOKEN')
TELEGRAM_CHAT_ID = os.getenv('TELEGRAM_CHAT_ID')

def send_message(text):
    if not TELEGRAM_TOKEN or not TELEGRAM_CHAT_ID:
        print('No hay credenciales Telegram. Abortando alert check.')
        return
    url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
    resp = requests.post(url, data={"chat_id": TELEGRAM_CHAT_ID, "text": text}, timeout=15)
    resp.raise_for_status()

def main():
    today = datetime.utcnow().date()
    mañana = today + timedelta(days=1)
    if mañana.month != today.month:
        text = "Recordatorio: Mañana inicia un nuevo mes. Por favor, verifica/actualiza el Precio de Escasez si es necesario."
        print('Enviando alerta Telegram:', text)
        send_message(text)
    else:
        print('No es último día del mes. No se envía alerta.')

if __name__ == '__main__':
    main()
