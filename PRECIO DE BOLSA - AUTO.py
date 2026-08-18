import os
import time
import threading
import requests
from datetime import datetime, timedelta
import matplotlib.pyplot as plt

# UI: customtkinter is optional (GUI). If not available, script can run headless.
try:
    import customtkinter as ctk
except Exception:
    ctk = None

# Toast notifier is Windows-only; make it optional
try:
    from win10toast import ToastNotifier
    toaster = ToastNotifier()
except Exception:
    toaster = None

# ==============================
# XM API (pydataxm)
# ==============================

try:
    from src.xm_pydataxm import fetch_imar_for_date
except Exception:
    # si no está disponible localmente, se intentará usar el cliente genérico
    fetch_imar_for_date = None

# ==============================
# CONFIGURACIÓN
# ==============================

# Use repository-relative `data/` folder so outputs are portable and can be
# published via GitHub Pages. If this file is run outside the repo, fall back
# to current working directory.
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..')) if os.path.dirname(__file__) else os.getcwd()
SCRIPT_DIR = BASE_DIR
CARPETA = os.path.join(SCRIPT_DIR, "data", "scrapping")
ARCHIVO_PRECIO = os.path.join(SCRIPT_DIR, "data", "precio.txt")

download_folder = CARPETA

if not os.path.exists(download_folder):
    os.makedirs(download_folder, exist_ok=True)

if ctk is not None:
    try:
        ctk.set_appearance_mode("dark")
        ctk.set_default_color_theme("blue")
    except Exception:
        pass

# ==============================
# TELEGRAM
# ==============================

TELEGRAM_TOKEN = "8738810330:AAFpR-f7BxdNG0p1t2O4lgnHRNp4Sv_Tw3I"
TELEGRAM_CHAT_ID = "-5165485170"

def enviar_telegram(ruta_imagen, caption):
    url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendPhoto"
    try:
        with open(ruta_imagen, "rb") as img:
            resp = requests.post(
                url,
                data={"chat_id": TELEGRAM_CHAT_ID, "caption": caption},
                files={"photo": (os.path.basename(ruta_imagen), img, "image/png")},
                timeout=30
            )
        if resp.status_code == 200:
            print(f"✅ Imagen enviada a Telegram")
        else:
            print(f"❌ Error Telegram {resp.status_code}: {resp.text}")
    except Exception as e:
        print(f"❌ Telegram error: {e}")

# ==============================
# FUNCIONES
# ==============================

def obtener_nombre_archivo_manana():
    manana = datetime.now() + timedelta(days=1)
    return os.path.join(CARPETA, f"iMAR{manana.strftime('%m')}{manana.strftime('%d')}.txt")


def leer_costo_marginal(ruta):
    with open(ruta, "r", encoding="utf-8") as f:
        lineas = f.readlines()

    for linea in lineas:
        if '"Costo Marginal"' in linea:
            valores = [float(x.strip()) / 1000 for x in linea.split(",")[1:]]
            if len(valores) != 24:
                raise ValueError("Serie incompleta")
            return valores

    raise ValueError("No encontrado")

def leer_precio_escasez():
    with open(ARCHIVO_PRECIO, "r", encoding="utf-8") as f:
        return float(f.read().strip())

# ==============================
# GRAFICA ORIGINAL (SIN CAMBIOS)
# ==============================

def generar_reporte(serie, precio_escasez):

    carpeta_salida = SCRIPT_DIR
    umbral = precio_escasez * 0.95

    maximo = max(serie)
    minimo = min(serie)
    promedio = sum(serie) / len(serie)
    horas_supera = [(i, v) for i, v in enumerate(serie) if v >= umbral]
    cantidad_supera = len(horas_supera)
    diferencia = umbral - maximo

    ruta_texto = os.path.join(carpeta_salida, "pbolsahorario_texto.txt")

    with open(ruta_texto, "w", encoding="utf-8") as f:
        f.write("Precio de bolsa horario\n\n")
        f.write(f"-*Precio Escasez: ${precio_escasez:,.2f}*\n")
        f.write(f"-Umbral de Escasez: *${umbral:,.2f}*\n")
        f.write(f"-Los valores Máximos alcanzan: ${maximo:,.2f} a ${diferencia:,.2f} del Umbral de Escasez.\n")
        f.write(f"-Mínimo: ${minimo:,.2f}\n")
        f.write(f"-Promedio: ${promedio:,.2f}\n")
        f.write(f"-*Hay {cantidad_supera} valores por encima del umbral de escasez*\n\n")
        f.write("Valores de la serie:\n\n")

        for i, valor in enumerate(serie):
            hora = f"{i:02d}"
            if valor >= umbral:
                f.write(f"*{hora}: ${valor:,.2f}*\n")
            else:
                f.write(f"{hora}: ${valor:,.2f}\n")

    ruta_imagen = os.path.join(carpeta_salida, "pbolsahorario_image.png")

    horas = list(range(24))

    plt.figure(figsize=(14,6))
    plt.plot(horas, serie, marker='o', label="Costo Marginal")
    plt.axhline(maximo, color='red', linestyle='--', label=f"Máximo: ${maximo:,.2f}")
    plt.axhline(minimo, color='green', linestyle='--', label=f"Mínimo: ${minimo:,.2f}")
    plt.axhline(umbral, color='blue', linestyle='--', label=f"Umbral de Escasez: ${umbral:,.2f}")

    for h, v in horas_supera:
        plt.scatter(h, v, color='black', s=80, zorder=5)

    plt.xticks(horas, [f"{h:02d}" for h in horas])
    plt.xlabel("Horas")
    plt.ylabel("($) Costo Marginal")
    plt.title("Precio de Bolsa (máximos y mínimos horarios)")
    plt.legend()
    plt.grid(True)
    plt.tight_layout()
    plt.savefig(ruta_imagen, dpi=300)
    plt.close()

    return promedio, maximo, minimo, precio_escasez, umbral, horas_supera

# ==============================
# SCRAPPING (SIN CAMBIOS)
# ==============================

def ejecutar_scrapping(consola):
    """Obtener la serie IMAR desde la API de XM usando pydataxm.

    Si `fetch_imar_for_date` no está disponible, informa el error en la consola.
    """
    consola.insert("end", "Consultando API de XM para iMAR...\n")
    consola.see("end")

    if fetch_imar_for_date is None:
        consola.insert("end", "Cliente pydataxm no disponible en este entorno.\n")
        consola.see("end")
        return None

    try:
        manana = datetime.now() + timedelta(days=1)
        serie = fetch_imar_for_date(manana)
        consola.insert("end", f"Serie IMAR obtenida ({len(serie)} valores)\n")
        consola.see("end")
        return serie
    except Exception as e:
        consola.insert("end", f"Error consultando XM: {e}\n")
        consola.see("end")
        return None

# ==============================
# DASHBOARD
# ==============================

class Dashboard(ctk.CTk):

    def __init__(self):
        super().__init__()

        self.geometry("1500x760")
        self.title("Monitor Ejecutivo Premium")
        self.configure(fg_color="#0F172A")

        self.crear_ui()
        threading.Thread(target=self.iniciar_proceso, daemon=True).start()

    def crear_ui(self):

        ctk.CTkLabel(self,
                     text="MONITOREO PRECIO DE BOLSA",
                     font=("Segoe UI", 34, "bold"),
                     text_color="white").pack(pady=25)

        self.ruta_entry = ctk.CTkEntry(self, width=1100, height=40)
        self.ruta_entry.pack(pady=10)

        self.progress = ctk.CTkProgressBar(self, width=1100)
        self.progress.pack(pady=10)
        self.progress.set(0)

        self.frame_kpi = ctk.CTkFrame(self, fg_color="#0F172A")
        self.frame_kpi.pack(pady=40)

        self.kpis = []
        for i in range(6):
            card = ctk.CTkFrame(self.frame_kpi, width=200, height=140, corner_radius=25, fg_color="#0E56AD")
            card.grid(row=0, column=i, padx=15)
            label = ctk.CTkLabel(card, text="-", font=("Segoe UI", 18, "bold"), text_color="white")
            label.place(relx=0.5, rely=0.5, anchor="center")
            self.kpis.append((card, label))

        self.detalle = ctk.CTkTextbox(self, width=1150, height=200, corner_radius=20)
        self.detalle.pack(pady=20)

    def iniciar_proceso(self):

            archivo = obtener_nombre_archivo_manana()
            # update UI field if available
            try:
                self.ruta_entry.insert(0, os.path.abspath(archivo))
            except Exception:
                pass

        self.progress.set(0.2)

        # Intentar obtener la serie directamente desde la API de XM
        serie = ejecutar_scrapping(self.detalle)
        if serie and len(serie) == 24:
            # escribir archivo temporal con formato iMAR original para compatibilidad
            manana = datetime.now() + timedelta(days=1)
            nombre = f"iMAR{manana.strftime('%m')}{manana.strftime('%d')}.txt"
            ruta = os.path.join(CARPETA, nombre)
            with open(ruta, 'w', encoding='utf-8') as f:
                # escribir una línea similar a la que espera leer_costo_marginal
                valores_str = ','.join([f"{v:.2f}" for v in serie])
                f.write(f'"Costo Marginal",' + valores_str + '\n')
            archivo = ruta
        else:
            # 🔁 BUCLE DE REINTENTO CADA 20 SEGUNDOS sobre archivos descargados localmente
            while not os.path.exists(archivo):

                self.detalle.insert("end", "Archivo no encontrado. Ejecutando scrapping...\n")
                self.detalle.see("end")

                ejecutar_scrapping(self.detalle)

                if not os.path.exists(archivo):
                    self.detalle.insert("end", "No se encontró el archivo. Reintentando en 20 segundos...\n\n")
                    self.detalle.see("end")
                    time.sleep(20)

        self.progress.set(0.6)
        time.sleep(2)

        self.procesar(archivo)

        self.progress.set(1)
        if toaster:
            try:
                toaster.show_toast(
                    "Monitor Precio de Bolsa",
                    "Todo se realizó correctamente ✅",
                    duration=5,
                    threaded=True
                )
            except Exception:
                pass

        # Enviar imagen con contenido del TXT a Telegram
        carpeta_salida = SCRIPT_DIR
        ruta_imagen = os.path.join(carpeta_salida, "pbolsahorario_image.png")
        ruta_texto = os.path.join(carpeta_salida, "pbolsahorario_texto.txt")

        if os.path.exists(ruta_imagen) and os.path.exists(ruta_texto):
            with open(ruta_texto, "r", encoding="utf-8") as f:
                contenido_txt = f.read()
            enviar_telegram(ruta_imagen, contenido_txt)

        time.sleep(6)

        self.quit()
        self.destroy()

    def procesar(self, archivo):

        serie = leer_costo_marginal(archivo)
        precio = leer_precio_escasez()

        promedio, maximo, minimo, precio_esc, umbral, horas_supera = generar_reporte(serie, precio)

        valores = [
            f"Promedio\n${promedio:,.2f}",
            f"Máximo\n${maximo:,.2f}",
            f"Mínimo\n${minimo:,.2f}",
            f"Horas > Umbral\n{len(horas_supera)}",
            f"Precio Escasez\n${precio_esc:,.2f}",
            f"Umbral\n${umbral:,.2f}"
        ]

        for i, (card, label) in enumerate(self.kpis):
            label.configure(text=valores[i])

# ==============================
# MAIN
# ==============================

if __name__ == "__main__":
    app = Dashboard()
    app.mainloop()
