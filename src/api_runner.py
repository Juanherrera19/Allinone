from flask import Flask, request, jsonify
import subprocess
import threading
import os

app = Flask(__name__)

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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
