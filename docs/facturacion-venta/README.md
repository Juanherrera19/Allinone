# 🚀 Despliegue en GitHub Pages - Gestor Universal de Facturas

Esta carpeta **`Ghp/`** contiene la versión **100% estática e independiente para el navegador (Client-Side)** del Gestor Universal de Facturas y Notas de Crédito, lista para ser publicada de forma gratuita y permanente en **GitHub Pages** (o en cualquier servidor web / hosting como Netlify, Vercel o Cloudflare Pages).

---

## 💡 ¿Cómo funciona en GitHub Pages?

* **GitHub Pages** aloja únicamente archivos estáticos (`.html`, `.css`, `.js`, imágenes). No ejecuta servidores de Python/Flask.
* Por esta razón, todo el procesamiento de esta versión se realiza **directamente en el navegador del usuario**:
  * **Lectura y Escritura de Excel (.xlsx):** Desarrollado con **SheetJS (xlsx.full.min.js)**, soportando libros con múltiples hojas, fórmulas y fechas.
  * **División y Creación de PDFs:** Utiliza **PDF-Lib** y **PDF.js** para renderizar, extraer y separar páginas.
  * **Empaquetado ZIP:** Utiliza **JSZip** para comprimir y descargar los PDFs organizados.
  * **Dashboard y Gráficos:** Impulsado por **Chart.js** y **Tailwind CSS**.
  * **Seguridad y Privacidad Total:** Ningún archivo viaja a servidores externos; todo se procesa localmente en la memoria RAM del navegador del usuario.

---

## 📁 Estructura de la Carpeta `Ghp/`

```text
Ghp/
├── index.html        # Aplicación web completa lista para el navegador
├── css/
│   └── custom.css    # Estilos de tabla, barras de scroll y colores contables
├── js/
│   └── app.js        # Motor cliente (Excel, PDF, Dashboard, Filtros y NC)
└── README.md         # Guía de despliegue paso a paso
```

---

## 🛠️ Guía Paso a Paso para Publicar en GitHub Pages

### Paso 1: Crear el repositorio en GitHub
1. Entra a [GitHub](https://github.com/) e inicia sesión.
2. Haz clic en **New repository** (Nuevo repositorio).
3. Asigna un nombre, por ejemplo: `facturas-web`.
4. Selecciónalo como **Public** (Público) y haz clic en **Create repository**.

---

### Paso 2: Subir el contenido de `Ghp/` a GitHub

Abre tu terminal en la carpeta del proyecto y ejecuta:

```bash
# 1. Ingresar a la carpeta Ghp
cd c:\PYTHON\PROGRAMAS\FACTURAS\Ghp

# 2. Inicializar git
git init
git add .
git commit -m "Versión estática completa para GitHub Pages"

# 3. Renombrar la rama a main
git branch -M main

# 4. Vincular con tu repositorio de GitHub (reemplaza con tu URL)
git remote add origin https://github.com/TU_USUARIO/facturas-web.git

# 5. Subir los archivos
git push -u origin main
```

> **Alternativa sin comandos:** También puedes simplemente arrastrar los archivos de la carpeta `Ghp` (`index.html`, carpeta `css`, carpeta `js`) directamente en la página de tu repositorio en GitHub mediante el botón **Add file > Upload files**.

---

### Paso 3: Activar GitHub Pages en el Repositorio

1. En tu repositorio de GitHub, ve a la pestaña superior **Settings** (Configuración).
2. En el menú lateral izquierdo, haz clic en **Pages**.
3. En la sección **Build and deployment**:
   * **Source:** Selecciona `Deploy from a branch`.
   * **Branch:** Selecciona `main` y en la carpeta deja `/ (root)`.
   * Haz clic en **Save** (Guardar).
4. Espera entre 1 y 2 minutos. GitHub generará un enlace público en la parte superior:
   👉 `https://TU_USUARIO.github.io/facturas-web/`

---

### Paso 4: (Opcional) Vincular tu Propio Dominio Web

Si compraste o tienes un dominio personalizado (ej. `facturas.tuempresa.com`):
1. En la misma sección **Settings > Pages**, en **Custom domain**, ingresa tu dominio.
2. Marca la casilla **Enforce HTTPS** para activar el certificado SSL gratuito.
3. En tu proveedor de dominio (Cloudflare, GoDaddy, Namecheap, etc.), crea un registro `CNAME` que apunte a `TU_USUARIO.github.io`.

---

## ⚖️ Comparativa: GitHub Pages vs Servidor Python (Render / Railway)

| Característica | Versión `Ghp/` (GitHub Pages) | Versión Raíz (Python Flask) |
| :--- | :--- | :--- |
| **Alojamiento** | 100% Gratuito en GitHub Pages | Render.com, Railway, PythonAnywhere |
| **Servidor requerido** | Ninguno (corre en el navegador) | Servidor Python 3.11 con Gunicorn |
| **Velocidad en PDFs gigantes** | Depende del computador del usuario | Muy rápida (usa PyMuPDF en servidor) |
| **Modalidad 3 (Excel)** | Sí (SheetJS con 16 columnas) | Sí (OpenPyXL con 16 columnas) |
| **Exportación procesada y auditoría** | Sí (Generada en el navegador) | Sí (Generada por servidor) |
| **Privacidad de datos** | Máxima (no sale del navegador) | Archivos temporales en servidor |
