from flask import Flask, request, jsonify
import subprocess
import threading
import os
import json
import base64
import tempfile
from datetime import date
try:
    from src.telegram_bot import send_photo, send_message
except ModuleNotFoundError:
    from telegram_bot import send_photo, send_message

app = Flask(__name__)

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = os.getenv('CORS_ORIGIN', '*')
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'GET,POST,OPTIONS'
    return response

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
PRICE_PATH = os.path.join(REPO_ROOT, 'docs', 'data', 'precio_actual.json')

@app.route('/api/run', methods=['POST'])
def run_endpoint():
    payload = request.get_json() or {}
    send_telegram = bool(payload.get('send_telegram'))

    # Run the script in a background thread to avoid blocking the Flask worker
    def runner():
        env = os.environ.copy()
        if send_telegram:
            env['SEND_TELEGRAM'] = '1'
        try:
            subprocess.run(['python', 'scripts/run_price.py', '--date', 'tomorrow'], check=True, env=env)
        except Exception as e:
            app.logger.exception('Error running price script: %s', e)

    thread = threading.Thread(target=runner, daemon=True)
    thread.start()
    return jsonify({'status':'started', 'send_telegram': send_telegram})

@app.route('/api/save_price', methods=['POST'])
def save_price_endpoint():
    payload = request.get_json() or {}
    try:
        price = float(payload.get('precio_escasez'))
        if price <= 0:
            raise ValueError('El Precio de Escasez debe ser mayor que cero.')

        with open(PRICE_PATH, 'r', encoding='utf-8') as file:
            data = json.load(file)
        data['precio_escasez'] = price
        data['umbral'] = round(price * 0.95, 2)
        data['date'] = payload.get('date') or date.today().isoformat()
        data.setdefault('meta', {})['editable_precio_escasez'] = price

        with open(PRICE_PATH, 'w', encoding='utf-8') as file:
            json.dump(data, file, ensure_ascii=False, indent=2)
            file.write('\n')

        subprocess.run(['git', 'add', os.path.relpath(PRICE_PATH, REPO_ROOT)], cwd=REPO_ROOT, check=True)
        subprocess.run(['git', 'commit', '-m', f'Actualizar Precio de Escasez {data["date"]}'], cwd=REPO_ROOT, check=True)
        subprocess.run(['git', 'push'], cwd=REPO_ROOT, check=True)
        return jsonify({'status': 'updated_and_pushed', 'date': data['date'], 'precio_escasez': price})
    except (ValueError, TypeError) as error:
        return jsonify({'status': 'error', 'message': str(error)}), 400
    except (OSError, subprocess.CalledProcessError) as error:
        app.logger.exception('No se pudo actualizar el repositorio: %s', error)
        return jsonify({'status': 'error', 'message': 'No se pudo actualizar o publicar el repositorio.'}), 500

@app.route('/api/send_despacho', methods=['POST', 'OPTIONS'])
def send_despacho_endpoint():
    if request.method == 'OPTIONS':
        return ('', 204)
    payload = request.get_json() or {}
    temp_paths = []
    try:
        images = [('Tabla 1', payload.get('table_one')), ('Tabla 2', payload.get('table_two'))]
        if any(not image or not image.startswith('data:image/png;base64,') for _, image in images):
            return jsonify({'status': 'error', 'message': 'Faltan las imágenes PNG de las tablas.'}), 400

        for label, data_url in images:
            image_bytes = base64.b64decode(data_url.split(',', 1)[1], validate=True)
            temp_file = tempfile.NamedTemporaryFile(suffix='.png', delete=False)
            temp_file.write(image_bytes)
            temp_file.close()
            temp_paths.append(temp_file.name)
            send_photo(temp_file.name, f'Despacho Nal_Ties (MANUAL) - {label} - {payload.get("date", date.today().isoformat())}')

        send_message('Despacho Nal_Ties (MANUAL): se enviaron las tablas 1 y 2.')
        return jsonify({'status': 'sent_to_telegram'})
    except (ValueError, OSError, RuntimeError) as error:
        app.logger.exception('No se pudo enviar Despacho a Telegram: %s', error)
        return jsonify({'status': 'error', 'message': str(error)}), 500
    finally:
        for path in temp_paths:
            try:
                os.remove(path)
            except OSError:
                pass

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
