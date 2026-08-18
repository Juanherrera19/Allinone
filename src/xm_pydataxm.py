"""Cliente que utiliza la librería oficial `pydataxm` para consultar XM.

Busca automáticamente la métrica relacionada con 'Costo Marginal' o 'imar'
en el inventario y solicita los valores horarios para la fecha objetivo.
"""
import os
from datetime import datetime
import pandas as pd

try:
    from pydataxm.pydataxm import ReadDB
except Exception as e:
    ReadDB = None


def find_metric_for_cost_marginal(consult: 'ReadDB'):
    df = consult.get_collections()
    # Normalizar column names
    df_cols = [c.lower() for c in df.columns]
    # Buscar MetricId o DisplayName que contenga 'costo' o 'imar'
    candidates = df[df.apply(lambda row: row.astype(str).str.lower().str.contains('costo').any() or row.astype(str).str.lower().str.contains('imar').any(), axis=1)]
    if not candidates.empty:
        # retornar primera coincidencia
        row = candidates.iloc[0]
        return row['MetricId'], row.get('Entity', 'Sistema') if 'Entity' in row.index else row.get('entity', 'Sistema')
    # fallback: buscar MetricId 'iMAR'
    if 'iMAR' in df['MetricId'].values:
        return 'iMAR', 'Sistema'
    return None, None


def extract_hourly_series(df: 'pd.DataFrame'):
    # Intentar detectar columnas de valores horarios
    # Posibles columnas: Values_0..Values_23, ValueHour, Hour, Value
    for col in df.columns:
        if isinstance(col, str) and col.lower().startswith('values_'):
            vals = [float(df.iloc[0][f'Values_{i}']) for i in range(24)]
            return vals

    # Si existe una columna 'Value' con 24 filas ordenadas por hora
    if 'Value' in df.columns and len(df) >= 24:
        vals = df['Value'].astype(float).tolist()
        if len(vals) >= 24:
            return vals[:24]

    # Si hay columnas numéricas que parezcan horas
    hour_cols = [c for c in df.columns if isinstance(c, str) and c.isdigit()]
    if hour_cols:
        vals = [float(df.iloc[0][c]) for c in sorted(hour_cols, key=int)]
        return vals

    # Ultimo recurso: intentar encontrar listas dentro de una columna
    for col in df.columns:
        sample = df.iloc[0][col]
        if isinstance(sample, (list, tuple)) and len(sample) >= 24:
            return [float(x) for x in sample[:24]]

    raise ValueError('No se pudo extraer la serie horaria (24 valores) desde la respuesta de pydataxm')


def fetch_imar_for_date(target_date: datetime):
    if ReadDB is None:
        raise RuntimeError('pydataxm no está instalado en el entorno. Instala con `pip install pydataxm`')

    consult = ReadDB()
    # obtener inventario y encontrar la métrica adecuada
    metric_id, entity = find_metric_for_cost_marginal(consult)
    if not metric_id:
        raise RuntimeError('No se encontró una métrica de Costo Marginal en el inventario de XM')

    start = target_date.strftime('%Y-%m-%d')
    end = start

    # request_data(coleccion, metrica, start_date, end_date)
    df = consult.request_data(metric_id, entity, start, end)

    serie = extract_hourly_series(df)

    # Detectar si es necesario dividir por 1000 (heurística): si los valores son enormes
    if max(serie) > 10000:
        serie = [v / 1000.0 for v in serie]

    return serie
