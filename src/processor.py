import os
import json
from datetime import datetime
import matplotlib.pyplot as plt

OUTPUT_DIR = os.getenv("OUTPUT_DIR", "outputs")
os.makedirs(OUTPUT_DIR, exist_ok=True)


def read_precio_escasez(price_file_path=None):
    path = price_file_path or os.getenv("PRICE_FILE") or "Precio.txt"
    if not os.path.exists(path):
        raise FileNotFoundError(f"Archivo de precio no encontrado: {path}")
    with open(path, "r", encoding="utf-8") as f:
        return float(f.read().strip())


def generar_reporte(serie, precio_escasez, out_prefix="pbolsa"):
    umbral = precio_escasez * 0.95
    maximo = max(serie)
    minimo = min(serie)
    promedio = sum(serie) / len(serie)
    horas_supera = [(i, v) for i, v in enumerate(serie) if v >= umbral]

    # JSON de salida
    resultado = {
        "generated_at": datetime.utcnow().isoformat() + "Z",
        "promedio": promedio,
        "maximo": maximo,
        "minimo": minimo,
        "precio_escasez": precio_escasez,
        "umbral": umbral,
        "horas_supera": horas_supera,
        "serie": serie,
    }

    json_path = os.path.join(OUTPUT_DIR, f"{out_prefix}.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(resultado, f, ensure_ascii=False, indent=2)

    # Generar imagen
    ruta_imagen = os.path.join(OUTPUT_DIR, f"{out_prefix}.png")
    horas = list(range(24))
    plt.figure(figsize=(14,6))
    plt.plot(horas, serie, marker='o', label="Costo Marginal")
    plt.axhline(maximo, color='red', linestyle='--', label=f"Máximo: ${maximo:,.2f}")
    plt.axhline(minimo, color='green', linestyle='--', label=f"Mínimo: ${minimo:,.2f}")
    plt.axhline(umbral, color='blue', linestyle='--', label=f"Umbral: ${umbral:,.2f}")
    for h, v in horas_supera:
        plt.scatter(h, v, color='black', s=80, zorder=5)
    plt.xticks(horas, [f"{h:02d}" for h in horas])
    plt.xlabel("Horas")
    plt.ylabel("($) Costo Marginal")
    plt.title("Precio de Bolsa (máximos y mínimos horarios)")
    plt.legend()
    plt.grid(True)
    plt.tight_layout()
    plt.savefig(ruta_imagen, dpi=200)
    plt.close()

    return resultado, json_path, ruta_imagen


def append_history(record, history_path="history/history.json"):
    os.makedirs(os.path.dirname(history_path), exist_ok=True)
    if not os.path.exists(history_path):
        with open(history_path, "w", encoding="utf-8") as f:
            json.dump([], f)

    with open(history_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    data.append(record)
    with open(history_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
