"""Script principal que ejecuta el flujo: consulta XM, procesa, guarda, envía Telegram.

Diseñado para usarse desde GitHub Actions o localmente.
"""
import os
import argparse
from datetime import datetime, timedelta
import subprocess

try:
    from src.xm_pydataxm import fetch_imar_for_date
except Exception:
    from src.xm_api import fetch_imar_for_date
from src.processor import read_precio_escasez, generar_reporte, append_history
from src.telegram_bot import send_photo, send_message


def git_commit_and_push(paths, message):
    # Asume que el entorno de CI tiene permisos (GITHUB_TOKEN) y que git está configurado.
    subprocess.check_call(["git", "add"] + paths)
    subprocess.check_call(["git", "commit", "-m", message])
    subprocess.check_call(["git", "push"])


def main(target_date: datetime):
    serie = fetch_imar_for_date(target_date)
    # precio de escasez
    try:
        precio = read_precio_escasez()
    except Exception as e:
        # si no hay archivo, intentar variable de entorno
        precio = float(os.getenv("PRICE_ESC", "0"))
        if precio == 0:
            raise

    resultado, json_path, image_path = generar_reporte(serie, precio, out_prefix=f"pbolsa_{target_date.strftime('%Y%m%d')}")

    # anexar al histórico (no duplicar fechas)
    historico_path = os.path.join('data', 'historico.json')
    os.makedirs('data', exist_ok=True)
    try:
        with open(historico_path, 'r', encoding='utf-8') as f:
            hist = __import__('json').load(f)
    except Exception:
        hist = []

    # añadir metadata y campo editable para precio_escasez
    record = {"date": target_date.strftime("%Y-%m-%d"), **resultado}
    record_meta = {
        "source": {
            "metric_id": getattr(serie, 'metric_id', None) or os.getenv('XM_API_URL') or 'pydataxm',
            "entity": getattr(serie, 'entity', None) or 'Sistema',
            "applied_division_by_1000": True if max(serie) < 10000 else False,
        },
        "editable_precio_escasez": precio,
        "precio_escasez_editable": True
    }
    record.update({"meta": record_meta})
    if not any(r.get('date') == record['date'] for r in hist):
        hist.append(record)
        with open(historico_path, 'w', encoding='utf-8') as f:
            __import__('json').dump(hist, f, ensure_ascii=False, indent=2)

    # generar precio_actual con metadata y campo editable
    precio_actual_path = os.path.join('data', 'precio_actual.json')
    with open(precio_actual_path, 'w', encoding='utf-8') as f:
        __import__('json').dump(record, f, ensure_ascii=False, indent=2)

    # enviar a telegram
    caption = (
        f"Precio de Bolsa {target_date.strftime('%Y-%m-%d')}\n"
        f"Promedio: ${resultado['promedio']:,.2f}\n"
        f"Máximo: ${resultado['maximo']:,.2f}\n"
        f"Mínimo: ${resultado['minimo']:,.2f}\n"
    )
    try:
        send_photo(image_path, caption=caption)
    except Exception as e:
        print("Error enviando a Telegram:", e)

    # commit results (JSON + image + history)
    # mover archivos JSON/imagen a data/ para commit en CI
    data_files = []
    # copiar imagen
    try:
        import shutil
        dest_img = os.path.join('data', os.path.basename(image_path))
        shutil.copy(image_path, dest_img)
        data_files.append(dest_img)
    except Exception:
        pass

    # agregar precio_actual y historico
    data_files.append(precio_actual_path)
    data_files.append(historico_path)

    try:
        git_commit_and_push(data_files, f"Auto: Precio Bolsa {target_date.strftime('%Y-%m-%d')}")
    except Exception as e:
        print("Commit falló (CI debe manejar push):", e)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("--date", default="tomorrow", help="Fecha en YYYY-MM-DD o 'tomorrow'")
    args = parser.parse_args()

    if args.date == "tomorrow":
        target = datetime.utcnow().date() + timedelta(days=1)
    else:
        target = datetime.strptime(args.date, "%Y-%m-%d").date()

    main(datetime.combine(target, datetime.min.time()))
