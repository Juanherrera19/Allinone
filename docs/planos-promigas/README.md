# PROMIGAS PLANOS ⚡

> **Generador y Validador de Archivos Planos CSV para la Plataforma de Transporte de Promigas.**  
> Aplicación web moderna, 100% estática, lista para alojar en **GitHub Pages** o ejecutar localmente sin dependencias ni servidores.

---

## 🌟 Características Principales

### 1. Solicitud de Capacidad de Transporte (`plantilla capacity request.csv`)
- **Pasos Desplegables (Acordeón)**: Los pasos 1, 2 y 3 cuentan con encabezados interactivos desplegables para expandir o colapsar cada sección y facilitar la navegación.
- **Intervalos de Tiempo Flexibles**: Selector de fecha inicial y final con atajos rápidos (*01/12/2026 - 31/01/2027*, *Mes Actual*, *Próximo Mes*, *Trimestre*).
- **División Automática por Mes**:
  - Al activar la opción **"Dividir por mes"**, si seleccionas un periodo como `01/12/2026` al `31/01/2027`, la herramienta genera automáticamente:
    - 1 línea para `01/12/2026` - `31/12/2026` (Diciembre)
    - 1 línea para `01/01/2027` - `31/01/2027` (Enero)
  - Manejo automático de años bisiestos y días exactos por mes (28, 29, 30, 31).
- **Valores y Configuración por Defecto**:
  - **Remitente**: `GRUPO ENERGETICO DE LAS AMERICAS S.A.S E.S.P` (Código: `GEAM`).
  - **Gasoducto**: `Promigas` (con opción de alternar a *Promioriente*, *Transmetano*, *Transoccidente* o *Todos*).
  - **Tipo de Ruta**: `Servicio de Transporte Interrumpible` (Código: `TI`).
  - **Mercado**: `No Regulado` (`MKTTP_NOREG`) o `Regulado` (`MKTTP_REG`).
  - **Sector**: `Industrial` (`SECTP_INDUST`), `Plantas de Generación Térmica`, `GNVC`, etc.
  - **Capacidad Solicitada (KPCD)**: Entrada numérica con validación.
  - **Etiqueta Entrada / ENTRT_LBL**: Campo opcional (vacío por defecto `;;`).
- **Tramos Oficiales de Promigas**:
  - `Ballena - La Mami`
  - `Barranquilla - Cartagena`
  - `Barranquilla - La Mami` *(Contraflujo)*
  - `Cartagena - Barranquilla` *(Contraflujo)*
  - `Cartagena - Sincelejo`
  - `Jobo - Sincelejo` *(Contraflujo)*
  - `La Creciente - Sincelejo`
  - `La Mami - Ballena` *(Contraflujo)*
  - `La Mami - Barranquilla`
  - `Sincelejo - Cartagena` *(Contraflujo)*
  - `Sincelejo - Jobo`
  - `Sincelejo - La Creciente` *(Contraflujo)*
  - `SRT Mamonal`
  - Selección individual **1 a 1** mediante casillas de verificación.
  - Botón **"Seleccionar Todos"** y **"Deseleccionar Todos"**.
  - Contador de tramos seleccionados y buscador integrado.
- **Exportación Nivel Oficial Promigas**:
  - **Descargar Plano Oficial (CSV UTF-16 LE con BOM)**: Formato idéntico byte a byte al que exporta y requiere la plataforma de Promigas.
  - **Descargar CSV UTF-8 con BOM**: Para compatibilidad universal con Microsoft Excel.
  - **Copiar al Portapapeles**: Para pegar directamente en hojas de cálculo.

---

### 2. Explorador de Catálogos Maestros Integrado
Base de datos oficial integrada con buscador instantáneo y copia rápida de códigos al portapapeles:
- **Tramos**: 9 tramos con código y gasoducto.
- **Puntos de Recibo**: 17 puntos de inyección al sistema nacional de transporte.
- **Puntos de Entrega**: 267 puntos de entrega con calidad de gas y remitentes swing.
- **Organizaciones / Agentes**: 90 agentes del mercado registrados ante el transportador.
- **Sectores, Mercados, Modalidades y Transacciones**.

---

### 3. Validador y Plantilla Oficial
- Zona de arrastrar y soltar (*Drag & Drop*) para inspeccionar archivos `plantilla capacity request.csv`.
- Verificación automática de la codificación y las 15 columnas reglamentarias.
- Descarga de la plantilla en blanco con encabezados oficiales.

---

## 🚀 Cómo Cargar este Proyecto a GitHub y Publicar en GitHub Pages

Esta aplicación está completamente lista para ser desplegada en **GitHub Pages** de forma gratuita.

### Paso 1: Inicializar el repositorio local
Abre una terminal (PowerShell o Git Bash) en la carpeta del proyecto `c:\PYTHON\PROGRAMAS\PLANOS\PROMIGAS`:

```bash
git init
git add .
git commit -m "Initial commit: Promigas Planos Hub v1.0"
```

### Paso 2: Crear el repositorio en GitHub
1. Ingresa a tu cuenta de [GitHub](https://github.com).
2. Haz clic en **New repository** (Nuevo repositorio).
3. Nómbralo por ejemplo: `promigas-planos` (puedes elegir si es Público o Privado).
4. No marques la opción de agregar README ni .gitignore (ya los tenemos listos).
5. Haz clic en **Create repository**.

### Paso 3: Conectar y subir el código
Copia y ejecuta los siguientes comandos en tu terminal (reemplazando `TU_USUARIO` por tu usuario de GitHub):

```bash
git branch -M main
git remote add origin https://github.com/TU_USUARIO/promigas-planos.git
git push -u origin main
```

### Paso 4: Activar GitHub Pages (1 Clic)
1. En tu repositorio en GitHub, ve a la pestaña **Settings** (Configuración).
2. En el menú lateral izquierdo, haz clic en **Pages**.
3. En la sección **Build and deployment**:
   - **Source**: Selecciona `Deploy from a branch`.
   - **Branch**: Selecciona `main` y la carpeta `/ (root)`.
   - Haz clic en **Save** (Guardar).
4. En 1 minuto tu página estará en línea en:  
   `https://TU_USUARIO.github.io/promigas-planos/`

---

## 💻 Uso Local (Sin Conexión)

Puedes usar la herramienta inmediatamente en tu computadora sin necesidad de internet:
1. Haz doble clic en el archivo `index.html`.
2. Se abrirá en tu navegador favorito (Chrome, Edge, Firefox, Brave).
3. Todas las funciones de generación de archivos y catálogos funcionan 100% de manera local y fuera de línea.

---

## 📋 Estructura de Columnas del Archivo Plano Oficial

| # | Columna | Descripción | Ejemplo |
|---|---------|-------------|---------|
| 1 | `ENTRT_LBL` | Etiqueta de ruta | *(Vacío)* |
| 2 | `Fecha Inicio` | Fecha inicial DD/MM/AAAA | `01/12/2026` |
| 3 | `Fecha Fin` | Fecha final DD/MM/AAAA | `31/12/2026` |
| 4 | `Código Remitente` | Código agente | `GEAM` |
| 5 | `Nombre Remitente` | Razón social | `GRUPO ENERGETICO DE LAS AMERICAS S.A.S E.S.P` |
| 6 | `Código Tipo Ruta` | Tipo de ruta | `TI` |
| 7 | `Nombre Tipo Ruta` | Nombre de ruta | `Servicio de Transporte Interrumpible` |
| 8 | `Código Modalidad` | Modalidad de transporte | *(Vacío para TI)* |
| 9 | `Código Tramo` | Identificador del tramo | `10001` |
| 10 | `Nombre Tramo` | Nombre del tramo | `BARRANQUILLA` |
| 11 | `Código Mercado` | Clasificación de mercado | `MKTTP_NOREG` |
| 12 | `Nombre Mercado` | Nombre de mercado | `No Regulado` |
| 13 | `Código Sector` | Clasificación de sector | `SECTP_INDUST` |
| 14 | `Nombre Sector` | Nombre del sector | `Industrial` |
| 15 | `Capacidad Solicitada` | Capacidad en KPCD | `100` |

---

## 🛠️ Tecnologías Utilizadas
- **HTML5 Semántico**: Estructura accesible y modular.
- **CSS3 Moderno**: Diseño corporativo responsivo con variables CSS, sombras suaves y compatibilidad móvil/desktop.
- **Vanilla JavaScript (ES6+)**: Cero dependencias externas (sin frameworks pesados), manipulación de Blobs binarios UTF-16LE, arquitectura reactiva en tiempo real.
- **Base de datos de catálogos**: Incorporada en `data.js` para funcionamiento sin restricciones CORS locales.

---

Desarrollado para **Grupo Energético de las Américas S.A.S. E.S.P. (GEAM)**.
