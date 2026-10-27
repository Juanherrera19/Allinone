# GCR2 Información Comercial Suministro SUI (GitHub Pages)

Herramienta cliente 100% estática para el análisis, auditoría, compensación de notas de crédito y preparación de planos de información comercial SUI.

## 🚀 Despliegue en GitHub Pages

1. **Crear o usar un repositorio en GitHub**:
   - Puedes subir los archivos contenidos en esta carpeta `Ghp` a la rama `main` de tu repositorio (o a la carpeta `docs/` o rama `gh-pages`).

2. **Estructura requerida para GitHub Pages**:
   ```
   ├── index.html
   ├── css/
   │   └── custom.css
   ├── js/
   │   └── app.js
   └── README.md
   ```

3. **Activar GitHub Pages**:
   - En tu repositorio de GitHub, ve a **Settings** > **Pages**.
   - En **Build and deployment** > **Source**, selecciona `Deploy from a branch`.
   - Selecciona la rama (ej. `main` / `root`) y haz clic en **Save**.
   - En pocos segundos tu aplicación estará en línea en `https://<tu-usuario>.github.io/<tu-repositorio>/`.

## 📋 Funcionalidades Incluidas

- **Carga de Archivo Excel (.xlsx, .xls)**:
  - Inspección automática de hojas de cálculo con preselección inteligente de la hoja `2026`.
  - Extracción estricta de las 16 columnas oficiales (descartando automáticamente columnas de control personal como `PROCEDENCIA`, `TRM`, `AÑO`, `MES`, `CLASIFICACIÓN`).
- **Dashboard Analítico**:
  - Contadores de Documentos Totales / Líneas contables.
  - Conteo de Facturas de Venta y Notas de Crédito únicas.
  - **VALOR TOTAL**: Suma neta exacta ($\sum \text{Facturas} - \text{Notas de Crédito}$).
  - Distribución por conceptos contables (Suministro, Transporte, Gestor del Mercado, Otros).
  - Gráfico pastel (Doughnut) de participación % de clientes con leyenda interactiva.
- **Filtros Dinámicos**:
  - Selección múltiple de Años y Meses.
  - Rango de fechas exacto (Desde / Hasta).
  - Selección múltiple con validación y búsqueda de Clientes, Contratos y Conceptos.
  - Filtro rápido por tipo (Todos, Solo Facturas, Solo Notas Crédito).
  - Botón de restablecimiento general.
- **Aplicación y Auditoría de Notas de Crédito (NC)**:
  - Detección automática de anulaciones totales ($Valor_{NC} == Valor_{FV}$) y descuentos ($Valor_{NC} < Valor_{FV}$).
  - Prorrateo proporcional por línea para facturas con múltiples ítems.
  - Recálculo exacto del nuevo valor unitario y valor total.
  - Generación de hoja `AUDITORIA NC` con el detalle de compensaciones.
- **Visualización y Exportaciones**:
  - Orden cronológico por defecto (de la fecha más antigua a la más reciente) y orden natural de facturas.
  - Ordenamiento interactivo al hacer clic en las columnas `FACTURA` y `FECHA FACTURA`.
  - Resaltado con celda amarilla para facturas vinculadas a NC y texto rojo para Notas de Crédito.
  - Scrollbars permanentes y columnas redimensionables.
  - Exportación de `Tabla completa.xlsx` y `Tabla procesada.xlsx` directamente desde el navegador con SheetJS.
  - Descarga de plantilla oficial en Excel.
