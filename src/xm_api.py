"""Cliente ligero y configurable para consultar la API de XM.

Nota: Este cliente es genérico porque desde este entorno no puedo acceder a la documentación pública de XM.
Rellena `XM_API_URL` y `XM_API_KEY` en los secretos del workflow o en `.env`.
"""
import os
import requests
from datetime import datetime

XM_API_URL = os.getenv("XM_API_URL")
XM_API_KEY = os.getenv("XM_API_KEY")

# Allow local config file (user asked not to use GitHub secrets)
try:
    from config_local import XM_API_URL as LOCAL_XM_API_URL, XM_API_KEY as LOCAL_XM_API_KEY
    if not XM_API_URL and LOCAL_XM_API_URL:
        XM_API_URL = LOCAL_XM_API_URL
    if not XM_API_KEY and LOCAL_XM_API_KEY:
        XM_API_KEY = LOCAL_XM_API_KEY
except Exception:
    pass

def fetch_imar_for_date(target_date: datetime):
    """Consulta la API de XM para obtener la serie IMAR del `target_date`.

    Retorna una lista de 24 floats con el costo marginal por hora.
    """
    if not XM_API_URL:
        raise RuntimeError("XM_API_URL no configurada")

    headers = {}
    if XM_API_KEY:
        headers["Authorization"] = f"Bearer {XM_API_KEY}"

    # El endpoint y los parámetros varían según la API oficial de XM.
    # Proporcionamos `date` en formato ISO como parámetro por defecto.
    params = {"date": target_date.strftime("%Y-%m-%d")}

    resp = requests.get(XM_API_URL, params=params, headers=headers, timeout=30)
    resp.raise_for_status()
    data = resp.json()

    # Esperamos que `data` contenga la serie de 24 valores en alguna ruta.
    # Intentos de extracción comunes:
    if isinstance(data, dict):
        # buscar claves comunes
        for key in ("imar", "costo_marginal", "serie", "values", "data"):
            if key in data:
                serie = data[key]
                break
        else:
            # si hay un payload con 'items' o 'results'
            for key in ("items", "results"):
                if key in data and isinstance(data[key], list) and len(data[key])>0:
                    serie = data[key][0].get("serie") or data[key][0].get("values")
                    if serie:
                        break
            else:
                raise ValueError("No se encontró la serie en la respuesta de XM. Revisa la estructura JSON.")
    else:
        raise ValueError("Respuesta inesperada de la API de XM")

    # Normalizar la serie a una lista de 24 floats
    if isinstance(serie, dict):
        # si viene como {"0":val,...}
        serie_list = [float(serie[str(i)]) for i in range(24)]
    else:
        serie_list = [float(x) for x in serie]

    if len(serie_list) != 24:
        raise ValueError(f"Serie con longitud inesperada: {len(serie_list)}")

    return serie_list
