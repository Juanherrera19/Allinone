// Gestor Universal de Facturas y Notas de Crédito - Versión 100% Cliente (GitHub Pages)

// Estado Global
let currentDocuments = [];
let currentTableRows = [];
let processedNCTableRows = [];
let currentFilteredRows = [];
let currentAuditLog = [];
let isNCApplied = false;
let currentMode = 'pdf';
let currentQuickTypeFilter = 'ALL';

let selectedPdfFile = null;
let selectedZipFile = null;
let selectedMultipleFiles = [];
let selectedExcelFile = null;
let parsedExcelWorkbook = null;

let selectedYears = new Set();
let selectedMonths = new Set();
let selectedClients = new Set();
let selectedContracts = new Set();
let selectedConcepts = new Set();

let availableYears = [];
let availableMonths = [];
let availableClients = [];
let availableContracts = [];
let availableConcepts = [];

// Estado y funciones de ordenamiento interactivo
let currentSortColumn = 'FECHA FACTURA'; // Por defecto FECHA FACTURA
let currentSortDirection = 'asc';        // Por defecto: Más antigua a más reciente
const naturalCollator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

function parseDateSortKeyJs(val) {
  if (!val || val === 'NA' || val === 'None') return 99999999;
  const s = String(val).trim();
  const mDmy = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
  if (mDmy) {
    return parseInt(mDmy[3], 10) * 10000 + parseInt(mDmy[2], 10) * 100 + parseInt(mDmy[1], 10);
  }
  const mYmd = s.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/);
  if (mYmd) {
    return parseInt(mYmd[1], 10) * 10000 + parseInt(mYmd[2], 10) * 100 + parseInt(mYmd[3], 10);
  }
  return 99999999;
}

function sortRowsJs(rows, col = currentSortColumn, dir = currentSortDirection) {
  if (!rows || rows.length === 0) return [];
  return [...rows].sort((a, b) => {
    if (col === 'FECHA FACTURA') {
      const dateA = parseDateSortKeyJs(a['FECHA FACTURA']);
      const dateB = parseDateSortKeyJs(b['FECHA FACTURA']);
      if (dateA !== dateB) {
        return dir === 'asc' ? (dateA - dateB) : (dateB - dateA);
      }
      const compDoc = naturalCollator.compare(String(a['FACTURA'] || '').trim(), String(b['FACTURA'] || '').trim());
      if (compDoc !== 0) return compDoc;
      const idxA = parseInt(a['item_index'] || a['itemIdx'] || 0, 10) || 0;
      const idxB = parseInt(b['item_index'] || b['itemIdx'] || 0, 10) || 0;
      return idxA - idxB;
    } else if (col === 'FACTURA') {
      const compDoc = naturalCollator.compare(String(a['FACTURA'] || '').trim(), String(b['FACTURA'] || '').trim());
      if (compDoc !== 0) {
        return dir === 'asc' ? compDoc : -compDoc;
      }
      const dateA = parseDateSortKeyJs(a['FECHA FACTURA']);
      const dateB = parseDateSortKeyJs(b['FECHA FACTURA']);
      if (dateA !== dateB) return dateA - dateB;
      const idxA = parseInt(a['item_index'] || a['itemIdx'] || 0, 10) || 0;
      const idxB = parseInt(b['item_index'] || b['itemIdx'] || 0, 10) || 0;
      return idxA - idxB;
    }
    return 0;
  });
}

function toggleSort(column) {
  if (currentSortColumn === column) {
    currentSortDirection = (currentSortDirection === 'asc') ? 'desc' : 'asc';
  } else {
    currentSortColumn = column;
    currentSortDirection = 'asc';
  }
  updateSortIndicators();
  applyFilters();
}

function updateSortIndicators() {
  const iconFactura = document.getElementById('sortIconFactura');
  const iconFecha = document.getElementById('sortIconFecha');

  if (iconFactura) {
    if (currentSortColumn === 'FACTURA') {
      iconFactura.textContent = currentSortDirection === 'asc' ? '▲ (A-Z)' : '▼ (Z-A)';
      iconFactura.className = 'text-blue-600 text-xs ml-1 font-bold';
    } else {
      iconFactura.textContent = '↕';
      iconFactura.className = 'text-slate-400 group-hover:text-blue-600 text-xs ml-1 font-mono';
    }
  }

  if (iconFecha) {
    if (currentSortColumn === 'FECHA FACTURA') {
      iconFecha.textContent = currentSortDirection === 'asc' ? '▲' : '▼';
      iconFecha.className = 'text-blue-600 text-xs ml-1 font-bold';
    } else {
      iconFecha.textContent = '↕';
      iconFecha.className = 'text-slate-400 group-hover:text-blue-600 text-xs ml-1 font-mono';
    }
  }
}

let clientPieChartInstance = null;
let generatedZipBlob = null;
let documentBlobs = {};

const ALL_FILTER_DROPDOWNS = ['Anios', 'Meses', 'Clientes', 'Contratos', 'Conceptos'];
const DROPDOWN_DISPLAY_NAMES = {
  Anios: 'Años',
  Meses: 'Meses',
  Clientes: 'Clientes',
  Contratos: 'Contratos',
  Conceptos: 'Conceptos'
};

const OFFICIAL_16_COLUMNS = [
  'FACTURA', 'FECHA FACTURA', 'PERIODO', 'CLIENTE', 'NITCLIENTE',
  'CONCEPTO', 'PTO ENTREGA', 'CANTIDAD', 'VALOR UNITARIO', 'VALOR TOTAL',
  'TRM FACTURA', 'TIPO', 'OBSERVACIONES', 'CONTRATO', 'NOTA CREDITO', 'NOTA'
];

const KNOWN_CLIENTS = {
  '890.101.691-2': 'GASES DEL CARIBE S.A E.S.P',
  '800.202.395-3': 'EFIGAS GAS NATURAL S.A. E.S.P',
  '890.904.996-1': 'EMPRESAS PUBLICAS DE MEDELLIN E.S.P',
  '802.025.052-0': 'E2 ENERGIA EFICIENTE S.A E.S.P',
  '890.400.869-9': 'SURTIDORA DE GAS DEL CARIBE S.A.E.S.P',
  '900.067.387-8': 'HOLYGAS SAS ESP',
  '900.334.431-1': 'TERMONORTE S.A.S E.S.P',
  '800.007.813-5': 'VANTI S.A ESP',
  '900.164.755-0': 'ZONA FRANCA ARGOS S.A.S',
  '800.149.537-6': 'PROMOTORA DE ENERGIA ELECTRICA DE CARTAGENA S.A.S E.S.P'
};

const KNOWN_DELIVERY_POINTS = [
  'CUSIANA', 'LA MAMI', 'MARIA CONCHITA', 'JOBO', 'CARTAGENA', 'SINU 9', 'BALLENA', 'MAMONAL', 'TERMONORTE'
];

const MONTHS = [
  'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
];

document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  setupDragAndDrop();
});

// Cambiar de Pestaña de Modalidad
function switchMode(mode) {
  currentMode = mode;
  const tabPdf = document.getElementById('tabModePdf');
  const tabZip = document.getElementById('tabModeZip');
  const tabExcel = document.getElementById('tabModeExcel');

  const secPdf = document.getElementById('sectionPdfUpload');
  const secZip = document.getElementById('sectionZipUpload');
  const secExcel = document.getElementById('sectionExcelUpload');

  const btnZip = document.getElementById('btnDownloadZip');

  const activeClasses = "flex-1 py-3 px-4 font-medium text-xs sm:text-sm flex items-center justify-center space-x-2 border-b-2 border-blue-600 bg-white text-blue-700 transition";
  const inactiveClasses = "flex-1 py-3 px-4 font-medium text-xs sm:text-sm flex items-center justify-center space-x-2 border-b-2 border-transparent text-slate-600 hover:text-slate-900 transition";

  if (mode === 'pdf') {
    tabPdf.className = activeClasses;
    tabZip.className = inactiveClasses;
    tabExcel.className = inactiveClasses;
    secPdf.classList.remove('hidden');
    secZip.classList.add('hidden');
    secExcel.classList.add('hidden');
    if (btnZip) btnZip.classList.remove('hidden');
  } else if (mode === 'zip') {
    tabPdf.className = inactiveClasses;
    tabZip.className = activeClasses;
    tabExcel.className = inactiveClasses;
    secPdf.classList.add('hidden');
    secZip.classList.remove('hidden');
    secExcel.classList.add('hidden');
    if (btnZip) btnZip.classList.add('hidden');
  } else {
    tabPdf.className = inactiveClasses;
    tabZip.className = inactiveClasses;
    tabExcel.className = activeClasses;
    secPdf.classList.add('hidden');
    secZip.classList.add('hidden');
    secExcel.classList.remove('hidden');
    if (btnZip) btnZip.classList.add('hidden');
  }
}

// Configurar Drag & Drop
function setupDragAndDrop() {
  const dropPdf = document.getElementById('dropZonePdf');
  const inputPdf = document.getElementById('inputPdfFile');
  if (dropPdf && inputPdf) {
    dropPdf.addEventListener('click', () => inputPdf.click());
    inputPdf.addEventListener('change', (e) => handlePdfSelected(e.target.files[0]));
    setupZoneEvents(dropPdf, (files) => handlePdfSelected(files[0]));
  }

  const dropZip = document.getElementById('dropZoneZip');
  const inputZip = document.getElementById('inputZipFile');
  if (dropZip && inputZip) {
    dropZip.addEventListener('click', () => inputZip.click());
    inputZip.addEventListener('change', (e) => handleZipSelected(e.target.files));
    setupZoneEvents(dropZip, (files) => handleZipSelected(files));
  }

  const dropExcel = document.getElementById('dropZoneExcel');
  const inputExcel = document.getElementById('inputExcelFile');
  if (dropExcel && inputExcel) {
    dropExcel.addEventListener('click', () => inputExcel.click());
    inputExcel.addEventListener('change', (e) => handleExcelSelected(e.target.files[0]));
    setupZoneEvents(dropExcel, (files) => handleExcelSelected(files[0]));
  }
}

function setupZoneEvents(zone, onDropFiles) {
  ['dragenter', 'dragover'].forEach(name => {
    zone.addEventListener(name, (e) => {
      e.preventDefault();
      e.stopPropagation();
      zone.classList.add('border-blue-500', 'bg-blue-50/50');
    });
  });

  ['dragleave', 'drop'].forEach(name => {
    zone.addEventListener(name, (e) => {
      e.preventDefault();
      e.stopPropagation();
      zone.classList.remove('border-blue-500', 'bg-blue-50/50');
    });
  });

  zone.addEventListener('drop', (e) => {
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onDropFiles(e.dataTransfer.files);
    }
  });
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function handlePdfSelected(file) {
  if (!file) return;
  selectedPdfFile = file;
  document.getElementById('pdfFileName').textContent = file.name;
  document.getElementById('pdfFileSize').textContent = `(${formatBytes(file.size)})`;
  document.getElementById('pdfSelectedInfo').classList.remove('hidden');
  document.getElementById('btnProcessPdf').removeAttribute('disabled');
}

function handleZipSelected(files) {
  if (!files || files.length === 0) return;
  if (files.length === 1 && files[0].name.toLowerCase().endsWith('.zip')) {
    selectedZipFile = files[0];
    selectedMultipleFiles = [];
    document.getElementById('zipFileName').textContent = files[0].name;
    document.getElementById('zipFileSize').textContent = `(${formatBytes(files[0].size)})`;
  } else {
    selectedZipFile = null;
    selectedMultipleFiles = Array.from(files).filter(f => f.name.toLowerCase().endsWith('.pdf'));
    document.getElementById('zipFileName').textContent = `${selectedMultipleFiles.length} archivos PDF seleccionados`;
    const totalSize = selectedMultipleFiles.reduce((acc, f) => acc + f.size, 0);
    document.getElementById('zipFileSize').textContent = `(${formatBytes(totalSize)})`;
  }
  document.getElementById('zipSelectedInfo').classList.remove('hidden');
  document.getElementById('btnProcessZip').removeAttribute('disabled');
}

async function handleExcelSelected(file) {
  if (!file) return;
  selectedExcelFile = file;
  document.getElementById('excelFileName').textContent = file.name;
  document.getElementById('excelFileSize').textContent = `(${formatBytes(file.size)})`;
  document.getElementById('excelSelectedInfo').classList.remove('hidden');

  try {
    const data = await file.arrayBuffer();
    parsedExcelWorkbook = XLSX.read(data, { type: 'array', cellDates: true, raw: true });
    const sheetNames = parsedExcelWorkbook.SheetNames;

    const selectEl = document.getElementById('selectExcelSheet');
    selectEl.innerHTML = '';
    sheetNames.forEach(name => {
      const opt = document.createElement('option');
      opt.value = name;
      opt.textContent = name;
      if (name.trim() === '2026') opt.selected = true;
      selectEl.appendChild(opt);
    });

    document.getElementById('excelSheetSelectorContainer').classList.remove('hidden');
    document.getElementById('btnProcessExcel').removeAttribute('disabled');
    showToast(`Excel cargado. ${sheetNames.length} hojas encontradas.`, 'info');
  } catch (err) {
    showToast('Error al leer el archivo Excel: ' + err.message, 'error');
  }
}

// PARSEADOR NUMÉRICO INTELIGENTE (Idéntico a smart_parse_number de Python)
function smartParseNumberJs(val) {
  if (val === null || val === undefined || val === '' || val === 'NA' || val === 'None') return 0.0;
  if (typeof val === 'number') return isNaN(val) ? 0.0 : val;

  let s = String(val).trim().replace('$', '').replace(/\s+/g, '');
  const isNeg = s.startsWith('-') || s.includes('-$') || (s.startsWith('(') && s.endsWith(')'));
  s = s.replace(/[\-\$\(\)]/g, '');

  const lastDot = s.lastIndexOf('.');
  const lastComma = s.lastIndexOf(',');

  if (lastDot !== -1 && lastComma !== -1) {
    if (lastDot > lastComma) {
      // Formato inglés: '368,480,960.00'
      s = s.replace(/,/g, '');
    } else {
      // Formato español/COP: '1.209.875.694,82'
      s = s.replace(/\./g, '').replace(/,/g, '.');
    }
  } else if (lastComma !== -1) {
    // Solo tiene coma decimal: '76469,00'
    s = s.replace(/,/g, '.');
  } else if (lastDot !== -1) {
    // Solo tiene punto
    const dotCount = (s.match(/\./g) || []).length;
    if (dotCount > 1) {
      s = s.replace(/\./g, '');
    }
  }

  s = s.replace(/[^0-9\.]/g, '');
  const n = parseFloat(s);
  if (isNaN(n)) return 0.0;
  return isNeg ? -n : n;
}

function parseCop(valStr) {
  return smartParseNumberJs(valStr);
}

function formatCurrencyCopJs(amount, isNegative = false) {
  if (amount === null || amount === undefined || amount === 'NA') return 'NA';
  const val = (typeof amount === 'number') ? amount : smartParseNumberJs(amount);
  const neg = isNegative || (val < 0);
  const absVal = Math.abs(val);
  const parts = absVal.toFixed(2).split('.');
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const decimalPart = parts[1];
  const sign = neg ? '-$ ' : ' $ ';
  return `${sign}${integerPart},${decimalPart} `;
}

function formatQuantityCopJs(val) {
  if (val === null || val === undefined || val === 'NA') return '1,00';
  const num = (typeof val === 'number') ? val : smartParseNumberJs(val);
  const parts = num.toFixed(2).split('.');
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${integerPart},${parts[1]}`;
}

function cleanConceptoJs(desc) {
  if (!desc || desc === 'NA') return 'NA';
  let s = String(desc).replace(/\s+/g, ' ').trim();
  const MONTHS_PATTERN = "ENERO|FEBRERO|MARZO|ABRIL|MAYO|JUNIO|JULIO|AGOSTO|SEPTIEMBRE|OCTUBRE|NOVIEMBRE|DICIEMBRE";
  s = s.split(new RegExp(`\\s+MES\\s+DE\\s+(?:${MONTHS_PATTERN})`, 'i'))[0];
  s = s.split(new RegExp(`\\s+(?:${MONTHS_PATTERN})\\s+(?:20\\d\\d|\\d{4})`, 'i'))[0];
  s = s.split(/\s+PUNTO\s+DE\s+ENTREGA/i)[0];
  s = s.split(/\s+TRM/i)[0];
  s = s.replace(/[\.\,\-]+$/, '').trim();
  return s || 'NA';
}

function formatExcelDateJs(val) {
  if (!val || val === 'NA') return 'NA';
  if (val instanceof Date) {
    if (isNaN(val.getTime())) return 'NA';
    const d = String(val.getDate()).padStart(2, '0');
    const m = String(val.getMonth() + 1).padStart(2, '0');
    const y = val.getFullYear();
    return `${d}/${m}/${y}`;
  }
  if (typeof val === 'number' && val > 1000 && val < 100000) {
    const date = new Date(Math.round((val - 25569) * 86400 * 1000));
    const d = String(date.getUTCDate()).padStart(2, '0');
    const m = String(date.getUTCMonth() + 1).padStart(2, '0');
    const y = date.getUTCFullYear();
    return `${d}/${m}/${y}`;
  }
  const s = String(val).trim();
  const mIso = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (mIso) {
    return `${mIso[3].padStart(2, '0')}/${mIso[2].padStart(2, '0')}/${mIso[1]}`;
  }
  const mSlash = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
  if (mSlash) {
    return `${mSlash[1].padStart(2, '0')}/${mSlash[2].padStart(2, '0')}/${mSlash[3]}`;
  }
  return s;
}

function normalizeInvoiceCode(s) {
  if (!s || s === 'NA') return '';
  let cleaned = String(s).trim().toUpperCase();
  cleaned = cleaned.replace(/^(NO\.|NO|FC\.|FV-|FV\s*)\s*/, '');
  cleaned = cleaned.replace(/\s*-\s*/g, '-');
  cleaned = cleaned.replace(/([A-Z]+)\s+(\d+)/g, '$1-$2');
  return cleaned.trim();
}

function invoiceCodesMatch(c1, c2) {
  const norm1 = normalizeInvoiceCode(c1);
  const norm2 = normalizeInvoiceCode(c2);
  if (!norm1 || !norm2) return false;
  if (norm1 === norm2) return true;
  if (/^\d+$/.test(norm1) && norm2.endsWith('-' + norm1)) return true;
  if (/^\d+$/.test(norm2) && norm1.endsWith('-' + norm2)) return true;
  return false;
}

// Vincular correspondencia bidireccional entre Facturas y Notas de Crédito
function linkCreditNotesToInvoicesClient(allRows) {
  const ncMap = {};
  allRows.forEach(r => {
    const isNC = (r['TIPO'] === 'NOTA DE CREDITO' || r['is_nc']);
    if (isNC && r['NOTA'] && r['NOTA'] !== 'NA') {
      const cleanRef = normalizeInvoiceCode(r['NOTA']);
      if (cleanRef) {
        ncMap[cleanRef] = r['FACTURA'];
      }
    }
  });

  allRows.forEach(r => {
    const isNC = (r['TIPO'] === 'NOTA DE CREDITO' || r['is_nc']);
    if (!isNC) {
      const cleanFv = normalizeInvoiceCode(r['FACTURA'] || '');
      let matchedNc = ncMap[cleanFv];
      if (!matchedNc) {
        for (const [refKey, ncCode] of Object.entries(ncMap)) {
          if (invoiceCodesMatch(cleanFv, refKey)) {
            matchedNc = ncCode;
            break;
          }
        }
      }
      if (matchedNc) {
        r['NOTA CREDITO'] = matchedNc;
        r['has_credit_note'] = true;
      } else {
        r['NOTA CREDITO'] = 'NA';
        r['has_credit_note'] = false;
      }
    } else {
      r['NOTA CREDITO'] = 'NA';
      r['has_credit_note'] = false;
    }
  });

  return allRows;
}

// Lógica de Notas de Crédito (Anulaciones y Descuentos Proporcionales)
function applyNCLogicClient(inputRows) {
  const auditLog = [];
  const ncGroups = {};

  inputRows.forEach(r => {
    const isNC = (r['TIPO'] === 'NOTA DE CREDITO' || r['is_nc']);
    if (isNC) {
      const code = (r['FACTURA'] || '').trim();
      if (!code) return;
      if (!ncGroups[code]) {
        ncGroups[code] = {
          NOTA: (r['NOTA'] || 'NA').trim(),
          lines: []
        };
      }
      ncGroups[code].lines.push(r);
    }
  });

  const facturasAnuladas = new Set();
  const facturasDescuento = {};

  for (const [ncCode, d] of Object.entries(ncGroups)) {
    const refFv = d.NOTA;
    const ncVal = d.lines.reduce((acc, l) => acc + Math.abs(smartParseNumberJs(l['VALOR TOTAL'])), 0);

    if (!refFv || refFv === 'NA') {
      auditLog.push({
        ACCION: "NC SIN FACTURA REFERENCIADA",
        FACTURA: "NA",
        "NOTA CREDITO": ncCode,
        "VALOR NC": formatCurrencyCopJs(ncVal),
        "VALOR ANTERIOR": "NA",
        "NUEVO TOTAL": "NA",
        "NUEVO UNITARIO": "NA",
        DETALLE: `La nota de crédito ${ncCode} no indica factura de referencia.`
      });
      continue;
    }

    const matchingFvs = inputRows.filter(f => {
      const isFv = (f['TIPO'] === 'FACTURA' && !f['is_nc']);
      return isFv && invoiceCodesMatch(f['FACTURA'] || '', refFv);
    });

    if (matchingFvs.length === 0) {
      auditLog.push({
        ACCION: "NC SIN FACTURA VINCULADA EN LOTE",
        FACTURA: refFv,
        "NOTA CREDITO": ncCode,
        "VALOR NC": formatCurrencyCopJs(ncVal),
        "VALOR ANTERIOR": "NA",
        "NUEVO TOTAL": "NA",
        "NUEVO UNITARIO": "NA",
        DETALLE: `La nota de crédito ${ncCode} referencia la factura ${refFv}, pero no se encontró en este lote.`
      });
      continue;
    }

    const totalFv = matchingFvs.reduce((acc, f) => acc + Math.abs(smartParseNumberJs(f['VALOR TOTAL'])), 0);
    const actualFvCode = matchingFvs[0]['FACTURA'];

    if (Math.abs(totalFv - ncVal) < 2.0 || ncVal >= totalFv) {
      // Caso 1: Anulación total
      matchingFvs.forEach(f => facturasAnuladas.add(f['FACTURA']));
      auditLog.push({
        ACCION: "ANULACION TOTAL",
        FACTURA: actualFvCode,
        "NOTA CREDITO": ncCode,
        "VALOR NC": formatCurrencyCopJs(ncVal),
        "VALOR ANTERIOR": formatCurrencyCopJs(totalFv),
        "NUEVO TOTAL": "$ 0,00",
        "NUEVO UNITARIO": "$ 0,00",
        DETALLE: `Factura ${actualFvCode} anulada completamente por ${ncCode}. Se remueve de la lista procesada junto con la nota crédito.`
      });
    } else {
      // Caso 2: Descuento
      const newTot = totalFv - ncVal;
      facturasDescuento[actualFvCode] = {
        ncCode: ncCode,
        ncVal: ncVal,
        fvTot: totalFv
      };

      const newUnitStr = (matchingFvs.length === 1) 
        ? formatCurrencyCopJs(newTot / (smartParseNumberJs(matchingFvs[0]['CANTIDAD']) || 1))
        : "Recalculado por línea";

      auditLog.push({
        ACCION: "DESCUENTO APLICADO",
        FACTURA: actualFvCode,
        "NOTA CREDITO": ncCode,
        "VALOR NC": formatCurrencyCopJs(ncVal),
        "VALOR ANTERIOR": formatCurrencyCopJs(totalFv),
        "NUEVO TOTAL": formatCurrencyCopJs(newTot),
        "NUEVO UNITARIO": newUnitStr,
        DETALLE: `Factura ${actualFvCode} tuvo descuento de ${formatCurrencyCopJs(ncVal).trim()} por ${ncCode}. Nuevo valor total: ${formatCurrencyCopJs(newTot).trim()}`
      });
    }
  }

  const processedRows = [];
  inputRows.forEach(r => {
    const isNC = (r['TIPO'] === 'NOTA DE CREDITO' || r['is_nc']);
    if (isNC) return;

    const fvCode = r['FACTURA'] || '';
    if (facturasAnuladas.has(fvCode)) return;

    if (facturasDescuento[fvCode]) {
      const desc = facturasDescuento[fvCode];
      const origTot = Math.abs(smartParseNumberJs(r['VALOR TOTAL']));
      const ratio = desc.fvTot > 0 ? (origTot / desc.fvTot) : 0;
      const lineDiscount = desc.ncVal * ratio;
      const newLineTot = Math.max(0, origTot - lineDiscount);

      const cant = smartParseNumberJs(r['CANTIDAD']);
      const newUnit = cant > 0 ? (newLineTot / cant) : newLineTot;

      const rProc = { ...r };
      rProc['VALOR TOTAL'] = formatCurrencyCopJs(newLineTot);
      rProc['VALOR UNITARIO'] = formatCurrencyCopJs(newUnit);
      rProc['OBSERVACIONES'] = `Ajuste por ${desc.ncCode} (-${formatCurrencyCopJs(lineDiscount).trim()}). ` + (r['OBSERVACIONES'] !== 'NA' ? r['OBSERVACIONES'] : '');
      rProc['has_discount_applied'] = true;
      processedRows.push(rProc);
    } else {
      processedRows.push({ ...r });
    }
  });

  return { processedRows, auditLog };
}

// PROCESAMIENTO MODALIDAD 3: Excel (.xlsx) con valores raw exactos
async function startProcessingExcel() {
  if (!parsedExcelWorkbook) return;
  showProgress("Analizando hoja seleccionada y extrayendo 16 columnas oficiales...", 30);

  const sheetName = document.getElementById('selectExcelSheet').value;
  const sheet = parsedExcelWorkbook.Sheets[sheetName];
  if (!sheet) {
    showToast('Hoja no encontrada', 'error');
    hideProgress();
    return;
  }

  setTimeout(() => {
    try {
      // Usar raw: true para preservar floats y enteros exactamente como vienen de Excel
      const rawMatrix = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: true, defval: '' });
      if (rawMatrix.length === 0) throw new Error("La hoja seleccionada está vacía.");

      // 1. Localizar cabecera
      let headerRowIdx = -1;
      let colMap = {};

      for (let r = 0; r < Math.min(rawMatrix.length, 100); r++) {
        const row = rawMatrix[r];
        const mapped = {};
        row.forEach((cellVal, colIdx) => {
          if (cellVal === null || cellVal === undefined) return;
          const clean = String(cellVal).trim().toUpperCase();
          if (clean === 'FACTURA' || clean === 'FACTURA ' || clean.startsWith('FACTURA')) mapped['FACTURA'] = colIdx;
          else if (clean.includes('FECHA')) mapped['FECHA FACTURA'] = colIdx;
          else if (clean.includes('PERIODO')) mapped['PERIODO'] = colIdx;
          else if (clean === 'CLIENTE' || clean === 'CLIENTE ') mapped['CLIENTE'] = colIdx;
          else if (clean.includes('NIT')) mapped['NITCLIENTE'] = colIdx;
          else if (clean.includes('CONCEPTO')) mapped['CONCEPTO'] = colIdx;
          else if (clean.includes('ENTREGA')) mapped['PTO ENTREGA'] = colIdx;
          else if (clean.includes('CANTIDAD')) mapped['CANTIDAD'] = colIdx;
          else if (clean.includes('UNITARIO')) mapped['VALOR UNITARIO'] = colIdx;
          else if (clean.includes('TOTAL')) mapped['VALOR TOTAL'] = colIdx;
          else if (clean === 'TRM FACTURA' || clean.includes('TRM FACTURA')) mapped['TRM FACTURA'] = colIdx;
          else if (clean === 'TIPO') mapped['TIPO'] = colIdx;
          else if (clean.includes('OBSERV')) mapped['OBSERVACIONES'] = colIdx;
          else if (clean.includes('CONTRATO')) mapped['CONTRATO'] = colIdx;
          else if (clean === 'NOTA CREDITO' || clean.includes('NOTA CREDITO')) mapped['NOTA CREDITO'] = colIdx;
          else if (clean === 'NOTA' || clean === 'NOTA ') mapped['NOTA'] = colIdx;
        });

        if (mapped['FACTURA'] !== undefined && (mapped['CLIENTE'] !== undefined || mapped['VALOR TOTAL'] !== undefined)) {
          headerRowIdx = r;
          colMap = mapped;
          break;
        }
      }

      if (headerRowIdx === -1) {
        throw new Error("No se encontró la fila cabecera con la columna 'FACTURA'.");
      }

      showProgress("Extrayendo y normalizando líneas contables...", 65);

      const extractedRows = [];
      const syntheticDocs = [];
      const seenFvs = new Set();

      for (let r = headerRowIdx + 1; r < rawMatrix.length; r++) {
        const row = rawMatrix[r];
        if (!row || row.length === 0) continue;

        const fVal = row[colMap['FACTURA']];
        if (fVal === null || fVal === undefined || String(fVal).trim() === '') continue;

        const fStr = String(fVal).trim();
        const fUpper = fStr.toUpperCase();
        if (['TOTAL GENERAL', 'ETIQUETAS DE FILA', 'RESUMEN', 'PROVEEDOR'].includes(fUpper)) break;

        const getCellRaw = (key) => (colMap[key] !== undefined && row[colMap[key]] !== undefined) ? row[colMap[key]] : '';
        const getCellStr = (key) => String(getCellRaw(key) || '').trim();

        const tipoRaw = getCellStr('TIPO').toUpperCase();
        const isNC = tipoRaw.includes('NOTA') || tipoRaw.includes('CREDITO') || fStr.startsWith('NC-');
        const tipoClean = isNC ? 'NOTA DE CREDITO' : 'FACTURA';

        let totalNum = smartParseNumberJs(getCellRaw('VALOR TOTAL'));
        if (isNC && totalNum > 0) totalNum = -totalNum;

        const cantNum = smartParseNumberJs(getCellRaw('CANTIDAD'));
        const unitNum = smartParseNumberJs(getCellRaw('VALOR UNITARIO'));

        const trmRaw = getCellRaw('TRM FACTURA');
        const trmNum = smartParseNumberJs(trmRaw);
        const trmStr = trmNum > 0 ? formatCurrencyCopJs(trmNum) : 'NA';

        const rowItem = {
          doc_id: `row_${extractedRows.length + 1}`,
          filename: `${fStr}.xlsx`,
          FACTURA: fStr,
          'FECHA FACTURA': formatExcelDateJs(getCellRaw('FECHA FACTURA')),
          PERIODO: getCellStr('PERIODO') || 'NA',
          CLIENTE: getCellStr('CLIENTE') || 'NA',
          NITCLIENTE: getCellStr('NITCLIENTE') || 'NA',
          CONCEPTO: cleanConceptoJs(getCellStr('CONCEPTO')),
          'PTO ENTREGA': getCellStr('PTO ENTREGA') || 'NA',
          CANTIDAD: formatQuantityCopJs(cantNum),
          'VALOR UNITARIO': formatCurrencyCopJs(unitNum),
          'VALOR TOTAL': formatCurrencyCopJs(totalNum),
          'TRM FACTURA': trmStr,
          TIPO: tipoClean,
          OBSERVACIONES: getCellStr('OBSERVACIONES') || 'NA',
          CONTRATO: getCellStr('CONTRATO') || 'NA',
          'NOTA CREDITO': getCellStr('NOTA CREDITO') || 'NA',
          NOTA: getCellStr('NOTA') || 'NA',
          is_nc: isNC,
          has_credit_note: false
        };

        extractedRows.push(rowItem);

        if (!seenFvs.has(fStr)) {
          seenFvs.add(fStr);
          syntheticDocs.push({
            id: rowItem.doc_id,
            filename: rowItem.filename,
            info: rowItem
          });
        }
      }

      currentDocuments = syntheticDocs;
      currentTableRows = sortRowsJs(linkCreditNotesToInvoicesClient(extractedRows), 'FECHA FACTURA', 'asc');

      showProgress("Cargando dashboard analítico...", 95);

      setTimeout(() => {
        hideProgress();
        displayResults();
        showToast(`¡Excel procesado con éxito! ${currentDocuments.length} documentos únicos, ${currentTableRows.length} líneas.`, 'success');
      }, 200);

    } catch (err) {
      hideProgress();
      showToast('Error al procesar Excel: ' + err.message, 'error');
    }
  }, 100);
}

// EXTRACCIÓN Y RECONSTRUCCIÓN DE LÍNEAS DE TEXTO DESDE PDF.JS
async function extractLinesFromPage(page) {
  const tc = await page.getTextContent();
  const items = tc.items.filter(it => it.str && it.str.trim().length > 0);
  items.sort((a, b) => {
    const yA = a.transform ? a.transform[5] : 0;
    const yB = b.transform ? b.transform[5] : 0;
    const xA = a.transform ? a.transform[4] : 0;
    const xB = b.transform ? b.transform[4] : 0;
    if (Math.abs(yA - yB) > 3.5) return yB - yA;
    return xA - xB;
  });

  const lines = [];
  let curLine = [];
  let lastY = null;
  items.forEach(it => {
    const y = it.transform ? it.transform[5] : 0;
    if (lastY === null || Math.abs(lastY - y) <= 3.5) {
      curLine.push(it.str.trim());
    } else {
      if (curLine.length > 0) lines.push(curLine.join(' '));
      curLine = [it.str.trim()];
    }
    lastY = y;
  });
  if (curLine.length > 0) lines.push(curLine.join(' '));
  return lines;
}

// PARSEADOR OFICIAL DE PÁGINAS PDF (Idéntico a extract_rows_from_doc_page de Python)
function parsePageLinesJs(lines, pageNum) {
  const fullText = lines.join('\n');
  const isNC = /Nota\s*(?:Electr[óo]nica)?\s*Cr[ée]dito/i.test(fullText);
  const tipo = isNC ? 'NOTA DE CREDITO' : 'FACTURA';

  // Consecutivo Factura / NC
  let refDoc = 'NA';
  let targetFilename = '';
  let facturaCol = '';

  if (isNC) {
    const mNC = fullText.match(/Nota\s*(?:Electr[óo]nica)?\s*Cr[ée]dito[\s\S]{0,100}?No\.?\s*(?:(\d+)\s*[-–]\s*)?([A-Za-z0-9]+)/i);
    const ncNum = (mNC && mNC[2]) ? mNC[2].trim() : (mNC && mNC[1] ? mNC[1].trim() : String(pageNum));
    facturaCol = ncNum ? `NC-${ncNum}` : 'NC-DESCONOCIDA';

    const mFV = fullText.match(/(?<!A esta )Factura\s+de\s+Venta\s*[:\s\n\r]+([A-Za-z]?\s*[-–]?\s*\d+)/i);
    const rawFv = mFV ? mFV[1].replace(/\s+/g, '') : '';
    const digitsMatch = rawFv.match(/\d+/);
    const digitsFv = digitsMatch ? digitsMatch[0] : rawFv;

    refDoc = rawFv.startsWith('B-') ? `No. ${rawFv}` : `No. B-${digitsFv}`;
    targetFilename = (ncNum && digitsFv) ? `NC-${ncNum} FV-${digitsFv}.pdf` : `NC-${ncNum || 'DESCONOCIDA'}.pdf`;
  } else {
    const mFV = fullText.match(/Factura\s*(?:Electr[óo]nica)?\s*(?:de\s*Venta)?[\s\S]{0,100}?No\.?\s*([A-Za-z]+)?\s*[-– ]?\s*(\d+)/i);
    const pref = (mFV && mFV[1]) ? mFV[1].trim() : 'B';
    const num = (mFV && mFV[2]) ? mFV[2].trim() : String(pageNum);
    facturaCol = `No. ${pref}-${num}`;
    targetFilename = `FC. ${num}.pdf`;
  }

  // Fecha
  let fecha = 'NA';
  const mFec = fullText.match(/Generaci[óo]n\s*[:\s\n\r]+([0-9]{2}[\/\-][0-9]{2}[\/\-][0-9]{4})/i);
  if (mFec) {
    fecha = mFec[1].replace(/-/g, '/');
  } else {
    const mFecNC = fullText.match(/Fecha\s+Nota\s+Cr[ée]dito\s*[:\s\n\r]+([0-9]{4})-([0-9]{2})-([0-9]{2})/i);
    if (mFecNC) {
      fecha = `${mFecNC[3]}/${mFecNC[2]}/${mFecNC[1]}`;
    }
  }

  // NIT & Cliente (Buscar después de 'Señores' para no tomar el NIT del emisor)
  let nit = 'NA';
  let cliente = 'NA';
  const senoresIdx = fullText.indexOf('Señores');
  if (senoresIdx !== -1) {
    const postSen = fullText.substring(senoresIdx);
    const mNit = postSen.match(/NIT\s*[:\s\n\r]+([0-9\.\-]+)/i);
    if (mNit) nit = mNit[1].trim();
  }

  if (KNOWN_CLIENTS[nit]) {
    cliente = KNOWN_CLIENTS[nit];
  } else {
    const mCli = fullText.match(/Señores\s*[:\s\n\r]+([^\n\r]+)/i);
    if (mCli) {
      cliente = mCli[1].split(/NIT|Tel[ée]fono|Direcci[óo]n/i)[0].trim();
    }
  }

  // Observaciones & Contrato
  let contrato = 'NA';
  let observaciones = 'NA';
  const mObsBlock = fullText.match(/Observaciones\s*[:\s\n\r]+([^\n\r]+(?:\n[^\n\r]+)?)/i);
  if (mObsBlock) {
    let obsText = mObsBlock[1].split('A esta factura')[0].split('Total Bruto')[0].trim();
    const mCto = obsText.match(/([A-Z0-9]+-[A-Z0-9]+-[A-Z0-9\-_]+)/);
    if (mCto) {
      contrato = mCto[1];
      const rest = obsText.replace(contrato, '').replace('CONTRATO:', '').trim();
      if (rest && rest.length > 2 && !rest.includes('SPOT')) observaciones = rest;
    } else if (obsText && obsText.toUpperCase() !== 'NA') {
      observaciones = obsText;
    }
  }

  // Parsear ítems de la tabla
  const itemRows = [];

  if (isNC) {
    // En Notas de Crédito
    let cantStr = '1.00';
    let totStr = '0.00';
    let descParts = [];

    let inTable = false;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (/Ítem.*Descripción.*Cantidad.*Vr\.\s*Total/i.test(line)) {
        inTable = true;
        continue;
      }
      if (inTable) {
        if (/Total items|Condiciones de Pago|Total Bruto|Observaciones/i.test(line)) {
          break;
        }

        // Caso: "1 3,882,100,550.00"
        const mItemTot = line.match(/^(\d+)\s+([0-9]{1,3}(?:,[0-9]{3})*(?:\.[0-9]{2}))$/);
        if (mItemTot) {
          totStr = mItemTot[2];
          continue;
        }

        // Caso: "...PUNTO DE 155,000.00" (Antes del total y sin TRM)
        if (totStr === '0.00' && !line.includes('TRM') && !line.includes('$')) {
          const mCantEnd = line.match(/^(.*?)\s+([0-9]{1,3}(?:,[0-9]{3})*(?:\.[0-9]{2}))$/);
          if (mCantEnd) {
            descParts.push(mCantEnd[1].trim());
            cantStr = mCantEnd[2];
            continue;
          }
        }

        descParts.push(line.trim());
      }
    }

    if (totStr === '0.00') {
      const mTot = fullText.match(/Total\s*Bruto\s*[:\s]*([\d\.,]+)/i) || fullText.match(/Total\s*a\s*Pagar\s*[:\s]*([\d\.,]+)/i);
      if (mTot) totStr = mTot[1].trim();
    }

    const tNum = smartParseNumberJs(totStr);
    const cNum = smartParseNumberJs(cantStr) || 1.0;
    const uNum = (tNum > 0 && cNum > 0) ? (tNum / cNum) : 0.0;

    itemRows.push({
      itemIdx: '1',
      cantRaw: cantStr,
      descRaw: descParts.join(' '),
      unitRaw: uNum,
      totRaw: tNum
    });
  } else {
    // Facturas de Venta
    let inTable = false;
    let pendingDesc = [];
    let pendingCant = null;

    const regexNumsOnly = /^(\d+)\s+([0-9]{1,3}(?:,[0-9]{3})*(?:\.[0-9]{2})?)\s+([0-9]{1,3}(?:,[0-9]{3})*(?:\.[0-9]{2})?)\s+([0-9]{1,3}(?:,[0-9]{3})*(?:\.[0-9]{2})?)$/;
    const regexFullLine = /^(\d+)\s+([0-9]{1,3}(?:,[0-9]{3})*(?:\.[0-9]{2})?)\s+([A-Za-z0-9ÁÉÍÓÚÑ\s\.\-_]+?)\s+([0-9]{1,3}(?:,[0-9]{3})*(?:\.[0-9]{2})?)\s+([0-9]{1,3}(?:,[0-9]{3})*(?:\.[0-9]{2})?)$/;
    const regexIndexUnitTot = /^(\d+)\s+([0-9]{1,3}(?:,[0-9]{3})*(?:\.[0-9]{2})?)\s+([0-9]{1,3}(?:,[0-9]{3})*(?:\.[0-9]{2})?)$/;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (/Ítem.*Cantidad.*Descripción.*Vr\.\s*Unitario.*Vr\.\s*Total/i.test(line)) {
        inTable = true;
        continue;
      }
      if (inTable) {
        if (/Total items|Valor en Letras|Forma de pago|Total Bruto|Total a Pagar/i.test(line)) {
          break;
        }

        const mFull = line.match(regexFullLine);
        const mNums = line.match(regexNumsOnly);
        const mIdxUT = line.match(regexIndexUnitTot);

        if (mFull) {
          let itemDesc = (pendingDesc.join(' ') + ' ' + mFull[3]).trim();
          pendingDesc = [];
          pendingCant = null;

          itemRows.push({
            itemIdx: mFull[1],
            cantRaw: mFull[2],
            descRaw: itemDesc,
            unitRaw: mFull[4],
            totRaw: mFull[5]
          });
        } else if (mNums) {
          const itemIdx = mNums[1];
          const cantRaw = mNums[2];
          const unitRaw = mNums[3];
          const totRaw = mNums[4];

          let itemDesc = pendingDesc.join(' ');
          pendingDesc = [];
          pendingCant = null;

          itemRows.push({
            itemIdx,
            cantRaw,
            descRaw: itemDesc,
            unitRaw,
            totRaw
          });
        } else if (mIdxUT) {
          const itemIdx = mIdxUT[1];
          const unitRaw = mIdxUT[2];
          const totRaw = mIdxUT[3];
          const cantRaw = pendingCant || '1.00';

          let itemDesc = pendingDesc.join(' ');
          pendingDesc = [];
          pendingCant = null;

          itemRows.push({
            itemIdx,
            cantRaw,
            descRaw: itemDesc,
            unitRaw,
            totRaw
          });
        } else {
          const mCantPrefix = line.match(/^([0-9]{1,3}(?:,[0-9]{3})*(?:\.[0-9]{2})?)\s+(.*)$/);
          if (mCantPrefix) {
            pendingCant = mCantPrefix[1];
            pendingDesc.push(mCantPrefix[2].trim());
          } else if (itemRows.length > 0 && !line.startsWith('Total') && !line.startsWith('Valor')) {
            const lastItem = itemRows[itemRows.length - 1];
            if (!lastItem.descRaw.includes('TRM') || line.includes('TRM') || line.includes('ENTREGA') || line.includes('$')) {
              lastItem.descRaw += ' ' + line.trim();
            } else {
              pendingDesc.push(line.trim());
            }
          } else {
            pendingDesc.push(line.trim());
          }
        }
      }
    }

    if (itemRows.length === 0) {
      let totStr = '0.00';
      const mTot = fullText.match(/Total\s*Bruto\s*[:\s]*([\d\.,]+)/i) || fullText.match(/Total\s*a\s*Pagar\s*[:\s]*([\d\.,]+)/i);
      if (mTot) totStr = mTot[1].trim();

      let cantStr = '1.00';
      const mCant = fullText.match(/Cantidad\s*[:\s]*([\d\.,]+)/i);
      if (mCant) cantStr = mCant[1].trim();

      const tNum = smartParseNumberJs(totStr);
      const cNum = smartParseNumberJs(cantStr) || 1.0;
      const uNum = tNum / cNum;

      itemRows.push({
        itemIdx: '1',
        cantRaw: cantStr,
        descRaw: fullText,
        unitRaw: uNum,
        totRaw: tNum
      });
    }
  }

  // Generar filas para la tabla
  const results = [];
  itemRows.forEach(item => {
    const desc = (item.descRaw || fullText).replace(/\s+/g, ' ').trim();
    const concepto = cleanConceptoJs(desc);

    // Periodo
    let periodo = 'NA';
    for (const m of MONTHS) {
      if (new RegExp('\\b' + m + '\\b', 'i').test(desc) || new RegExp('\\bMES\\s+DE\\s+' + m + '\\b', 'i').test(fullText)) {
        periodo = m;
        break;
      }
    }

    // Pto Entrega (Buscar en la descripción del ítem)
    let ptoEntrega = 'NA';
    const mPto = desc.match(/PUNTO\s+DE\s+ENTREGA\s+([A-Za-z0-9\s]+?)(?:\.|\s+TRM|$)/i);
    if (mPto) {
      const cand = mPto[1].trim();
      for (const k of KNOWN_DELIVERY_POINTS) {
        if (cand.toUpperCase().includes(k)) {
          ptoEntrega = k;
          break;
        }
      }
      if (ptoEntrega === 'NA') ptoEntrega = cand;
    }

    // TRM Factura (Buscar en la descripción del ítem)
    let trmStr = 'NA';
    const mTrm = desc.match(/TRM\.?\s*\$?([0-9]{1,3}(?:[,\.][0-9]{3})*(?:[,\.][0-9]{2})?)/i);
    if (mTrm && !concepto.includes('RETRIBUCION')) {
      const cand = mTrm[1].trim();
      if (cand.length >= 4) {
        trmStr = formatCurrencyCopJs(cand);
      }
    }

    results.push({
      target_filename: targetFilename,
      targetFilename: targetFilename,
      FACTURA: facturaCol,
      'FECHA FACTURA': fecha,
      PERIODO: periodo,
      CLIENTE: cliente,
      NITCLIENTE: nit,
      CONCEPTO: concepto,
      'PTO ENTREGA': ptoEntrega,
      CANTIDAD: formatQuantityCopJs(item.cantRaw),
      'VALOR UNITARIO': formatCurrencyCopJs(item.unitRaw),
      'VALOR TOTAL': formatCurrencyCopJs(item.totRaw, isNC),
      'TRM FACTURA': trmStr,
      TIPO: tipo,
      OBSERVACIONES: observaciones,
      CONTRATO: contrato,
      'NOTA CREDITO': 'NA',
      NOTA: refDoc,
      is_nc: isNC,
      has_credit_note: false
    });
  });

  return results;
}

// PROCESAMIENTO MODALIDAD 1: PDF Unido (Nombres oficiales y Facturas_Organizadas.zip)
async function startProcessingPdf() {
  if (!selectedPdfFile) return;
  showProgress("Iniciando análisis del archivo PDF mensual...", 10);

  try {
    const arrayBuffer = await selectedPdfFile.arrayBuffer();
    const pdfDocLib = await PDFLib.PDFDocument.load(arrayBuffer);
    const totalPages = pdfDocLib.getPageCount();

    showProgress(`Analizando texto de ${totalPages} páginas...`, 20);

    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdfJsDoc = await loadingTask.promise;

    const extractedRows = [];
    const documents = [];
    const zip = new JSZip();

    for (let p = 1; p <= totalPages; p++) {
      showProgress(`Procesando página ${p} de ${totalPages}...`, 20 + Math.floor((p / totalPages) * 65));
      const page = await pdfJsDoc.getPage(p);
      const lines = await extractLinesFromPage(page);
      const pageRows = parsePageLinesJs(lines, p);

      // Crear archivo PDF individual de 1 página usando PDF-lib
      const singlePdf = await PDFLib.PDFDocument.create();
      const [copiedPage] = await singlePdf.copyPages(pdfDocLib, [p - 1]);
      singlePdf.addPage(copiedPage);
      const pdfBytes = await singlePdf.save();
      const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

      const finalName = pageRows[0].target_filename;
      const docId = `pdf_doc_${p}`;
      documentBlobs[docId] = pdfBlob;
      zip.file(finalName, pdfBlob);

      pageRows.forEach(rowItem => {
        rowItem.doc_id = docId;
        rowItem.filename = finalName;
        extractedRows.push(rowItem);
      });

      documents.push({
        id: docId,
        filename: finalName,
        info: pageRows[0]
      });
    }

    showProgress("Empaquetando Facturas_Organizadas.zip...", 90);
    generatedZipBlob = await zip.generateAsync({ type: "blob" });

    currentDocuments = documents;
    currentTableRows = sortRowsJs(linkCreditNotesToInvoicesClient(extractedRows), 'FECHA FACTURA', 'asc');

    hideProgress();
    displayResults();
    showToast(`¡PDF dividido con éxito en ${documents.length} archivos con sus nombres oficiales!`, 'success');

  } catch (err) {
    hideProgress();
    showToast('Error al procesar PDF: ' + err.message, 'error');
  }
}

// PROCESAMIENTO MODALIDAD 2: ZIP o Múltiples PDFs (Extrayendo valores reales de cada PDF)
async function startProcessingZip() {
  showProgress("Analizando documentos PDF...", 15);
  try {
    const extractedRows = [];
    const documents = [];

    if (selectedZipFile) {
      const zip = await JSZip.loadAsync(selectedZipFile);
      const entries = Object.entries(zip.files).filter(([filename, fileObj]) => !fileObj.dir && filename.toLowerCase().endsWith('.pdf'));
      const totalEntries = entries.length;
      let count = 0;

      for (const [filename, fileObj] of entries) {
        count++;
        showProgress(`Leyendo ${filename} (${count} de ${totalEntries})...`, 15 + Math.floor((count / totalEntries) * 75));

        const arrayBuf = await fileObj.async("arraybuffer");
        const blob = new Blob([arrayBuf], { type: 'application/pdf' });
        const docId = `zip_file_${count}`;
        documentBlobs[docId] = blob;

        // Extraer texto y filas con PDF.js
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuf });
        const pdfJsDoc = await loadingTask.promise;
        const numPages = pdfJsDoc.numPages;

        for (let p = 1; p <= numPages; p++) {
          const page = await pdfJsDoc.getPage(p);
          const lines = await extractLinesFromPage(page);
          const pageRows = parsePageLinesJs(lines, count);

          pageRows.forEach(rowItem => {
            rowItem.doc_id = docId;
            rowItem.filename = filename;
            extractedRows.push(rowItem);
          });

          if (p === 1 && pageRows.length > 0) {
            documents.push({ id: docId, filename: filename, info: pageRows[0] });
          }
        }
      }
    } else if (selectedMultipleFiles.length > 0) {
      const totalFiles = selectedMultipleFiles.length;
      let count = 0;

      for (const file of selectedMultipleFiles) {
        count++;
        showProgress(`Leyendo ${file.name} (${count} de ${totalFiles})...`, 15 + Math.floor((count / totalFiles) * 75));

        const arrayBuf = await file.arrayBuffer();
        const docId = `multi_file_${count}`;
        documentBlobs[docId] = file;

        // Extraer texto y filas con PDF.js
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuf });
        const pdfJsDoc = await loadingTask.promise;
        const numPages = pdfJsDoc.numPages;

        for (let p = 1; p <= numPages; p++) {
          const page = await pdfJsDoc.getPage(p);
          const lines = await extractLinesFromPage(page);
          const pageRows = parsePageLinesJs(lines, count);

          pageRows.forEach(rowItem => {
            rowItem.doc_id = docId;
            rowItem.filename = file.name;
            extractedRows.push(rowItem);
          });

          if (p === 1 && pageRows.length > 0) {
            documents.push({ id: docId, filename: file.name, info: pageRows[0] });
          }
        }
      }
    }

    currentDocuments = documents;
    currentTableRows = sortRowsJs(linkCreditNotesToInvoicesClient(extractedRows), 'FECHA FACTURA', 'asc');

    hideProgress();
    displayResults();
    showToast(`¡Cargados ${documents.length} archivos con sus valores reales extraídos!`, 'success');
  } catch (err) {
    hideProgress();
    showToast('Error: ' + err.message, 'error');
  }
}

// MOSTRAR RESULTADOS Y POBLAR FILTROS
function displayResults() {
  isNCApplied = false;
  processedNCTableRows = [];
  currentAuditLog = [];

  document.getElementById('bannerNCStatus').classList.add('hidden');
  const btnApply = document.getElementById('btnApplyNC');
  btnApply.className = "px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-lg flex items-center space-x-1.5 shadow-sm transition";
  document.getElementById('lblBtnApplyNC').textContent = "Aplicar NC (Anular / Descuento)";

  populateFilterOptions();
  clearAllFilters(false);

  // Estado inicial de ordenamiento: Fecha más antigua a más reciente, luego Factura A-Z
  currentSortColumn = 'FECHA FACTURA';
  currentSortDirection = 'asc';
  updateSortIndicators();

  document.getElementById('resultsSection').classList.remove('hidden');
  setupColumnResizers();
  lucide.createIcons();
  document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });
}

// Alternar Aplicar NC
function toggleApplyNC() {
  const btnApply = document.getElementById('btnApplyNC');
  const lblBtn = document.getElementById('lblBtnApplyNC');
  const banner = document.getElementById('bannerNCStatus');
  const iconBanner = document.getElementById('iconNCBanner');
  const textBanner = document.getElementById('textNCBanner');
  const btnToggleLabel = document.getElementById('btnToggleNCLabel');

  if (!isNCApplied) {
    isNCApplied = true;
    btnApply.className = "px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg flex items-center space-x-1.5 shadow-sm transition";
    lblBtn.textContent = "Revertir a Tabla Completa";

    const { processedRows, auditLog } = applyNCLogicClient(currentTableRows);
    processedNCTableRows = processedRows;
    currentAuditLog = auditLog;

    const anuladasCount = auditLog.filter(a => a.ACCION === "ANULACION TOTAL").length;
    const descuentosCount = auditLog.filter(a => a.ACCION === "DESCUENTO APLICADO").length;

    banner.className = "p-3 rounded-xl border flex items-center justify-between transition-all bg-purple-50 border-purple-200 text-purple-900 shadow-xs";
    iconBanner.className = "p-1 rounded-full bg-purple-200 text-purple-800";
    iconBanner.innerHTML = `<i data-lucide="check-check" class="w-4 h-4"></i>`;
    textBanner.innerHTML = `<strong>Notas de Crédito Aplicadas:</strong> ${anuladasCount} facturas anuladas y ${descuentosCount} con descuento recalculado.`;
    btnToggleLabel.textContent = "Revertir a Tabla Completa";
    banner.classList.remove('hidden');

    populateFilterOptions();
    applyFilters();
    lucide.createIcons();
    showToast(`¡NC aplicadas con éxito! (${anuladasCount} anuladas, ${descuentosCount} con descuento)`, 'success');
  } else {
    isNCApplied = false;
    btnApply.className = "px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-lg flex items-center space-x-1.5 shadow-sm transition";
    lblBtn.textContent = "Aplicar NC (Anular / Descuento)";
    banner.classList.add('hidden');

    populateFilterOptions();
    applyFilters();
    lucide.createIcons();
    showToast('Vista restablecida a documentos originales', 'info');
  }
}

// FILTROS AVANZADOS MULTI-SELECT
function toggleMultiSelectDropdown(type) {
  const panel = document.getElementById(`panelDropdown${type}`);
  if (!panel) return;
  const isHidden = panel.classList.contains('hidden');

  ALL_FILTER_DROPDOWNS.forEach(t => {
    const p = document.getElementById(`panelDropdown${t}`);
    if (p) p.classList.add('hidden');
  });

  if (isHidden) {
    panel.classList.remove('hidden');
    const searchInput = document.getElementById(`searchDropdown${type}`);
    if (searchInput) {
      searchInput.value = '';
      filterDropdownList(type);
      setTimeout(() => searchInput.focus(), 50);
    }
  }
}

function filterDropdownList(type) {
  const searchEl = document.getElementById(`searchDropdown${type}`);
  const query = searchEl ? (searchEl.value || '').toLowerCase().trim() : '';
  const listEl = document.getElementById(`listDropdown${type}`);
  if (!listEl) return;

  const items = listEl.querySelectorAll('.dropdown-item-row');
  items.forEach(el => {
    const val = (el.getAttribute('data-val') || '').toLowerCase();
    if (!query || val.includes(query)) el.classList.remove('hidden');
    else el.classList.add('hidden');
  });
}

function selectAllInDropdown(type, selectAllBool) {
  const listEl = document.getElementById(`listDropdown${type}`);
  if (!listEl) return;
  listEl.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = selectAllBool);
  handleDropdownSelectionChange(type);
}

function selectSingleItemInDropdown(type, singleVal) {
  const listEl = document.getElementById(`listDropdown${type}`);
  if (!listEl) return;

  const checkboxes = listEl.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(cb => {
    cb.checked = (cb.value === singleVal);
  });

  handleDropdownSelectionChange(type);
  showToast(`Filtro aplicado: solo ${singleVal}`, 'info');
}

function handleDropdownSelectionChange(type) {
  const listEl = document.getElementById(`listDropdown${type}`);
  if (!listEl) return;

  const checkboxes = listEl.querySelectorAll('input[type="checkbox"]');
  const total = checkboxes.length;
  let checkedCount = 0;

  if (type === 'Anios') {
    selectedYears.clear();
    checkboxes.forEach(cb => { if (cb.checked) { selectedYears.add(cb.value); checkedCount++; } });
  } else if (type === 'Meses') {
    selectedMonths.clear();
    checkboxes.forEach(cb => { if (cb.checked) { selectedMonths.add(cb.value); checkedCount++; } });
  } else if (type === 'Clientes') {
    selectedClients.clear();
    checkboxes.forEach(cb => { if (cb.checked) { selectedClients.add(cb.value); checkedCount++; } });
  } else if (type === 'Contratos') {
    selectedContracts.clear();
    checkboxes.forEach(cb => { if (cb.checked) { selectedContracts.add(cb.value); checkedCount++; } });
  } else if (type === 'Conceptos') {
    selectedConcepts.clear();
    checkboxes.forEach(cb => { if (cb.checked) { selectedConcepts.add(cb.value); checkedCount++; } });
  }

  const labelEl = document.getElementById(`labelDropdown${type}`);
  const titleName = DROPDOWN_DISPLAY_NAMES[type] || type;
  if (labelEl) {
    if (checkedCount === total) labelEl.textContent = `${titleName}: Todos`;
    else if (checkedCount === 0) labelEl.textContent = `${titleName}: Ninguno`;
    else labelEl.textContent = `${titleName} (${checkedCount} de ${total})`;
  }

  applyFilters();
}

function populateFilterOptions() {
  const rows = isNCApplied ? processedNCTableRows : currentTableRows;

  // 1. Años
  const yearCounts = {};
  rows.forEach(r => {
    const parts = (r['FECHA FACTURA'] || '').split('/');
    if (parts.length === 3 && parts[2].trim().length === 4) {
      const yr = parts[2].trim();
      yearCounts[yr] = (yearCounts[yr] || 0) + 1;
    }
  });
  availableYears = Object.keys(yearCounts).sort((a, b) => b.localeCompare(a)).map(k => ({
    value: k,
    label: `Año ${k}`,
    count: yearCounts[k]
  }));
  selectedYears = new Set(availableYears.map(y => y.value));
  renderDropdownItems('Anios', availableYears, selectedYears);

  // 2. Meses
  const MONTH_DEFS = [
    { num: '1', name: 'Enero', key: 'ENERO' },
    { num: '2', name: 'Febrero', key: 'FEBRERO' },
    { num: '3', name: 'Marzo', key: 'MARZO' },
    { num: '4', name: 'Abril', key: 'ABRIL' },
    { num: '5', name: 'Mayo', key: 'MAYO' },
    { num: '6', name: 'Junio', key: 'JUNIO' },
    { num: '7', name: 'Julio', key: 'JULIO' },
    { num: '8', name: 'Agosto', key: 'AGOSTO' },
    { num: '9', name: 'Septiembre', key: 'SEPTIEMBRE' },
    { num: '10', name: 'Octubre', key: 'OCTUBRE' },
    { num: '11', name: 'Noviembre', key: 'NOVIEMBRE' },
    { num: '12', name: 'Diciembre', key: 'DICIEMBRE' }
  ];

  const monthCounts = {};
  rows.forEach(r => {
    const parts = (r['FECHA FACTURA'] || '').split('/');
    const periodo = (r['PERIODO'] || '').toUpperCase();
    const rowMonthNum = parts.length === 3 ? parseInt(parts[1], 10) : 0;
    MONTH_DEFS.forEach(m => {
      if (rowMonthNum === parseInt(m.num, 10) || periodo.includes(m.key)) {
        monthCounts[m.num] = (monthCounts[m.num] || 0) + 1;
      }
    });
  });

  availableMonths = MONTH_DEFS.map(m => ({
    value: m.num,
    label: m.name,
    count: monthCounts[m.num] || 0
  }));
  selectedMonths = new Set(availableMonths.map(m => m.value));
  renderDropdownItems('Meses', availableMonths, selectedMonths);

  // 3. Clientes
  const clientCounts = {};
  rows.forEach(r => {
    const c = (r['CLIENTE'] || '').trim();
    if (c && c !== 'NA') clientCounts[c] = (clientCounts[c] || 0) + 1;
  });
  availableClients = Object.keys(clientCounts).sort((a, b) => a.localeCompare(b, 'es')).map(k => ({
    value: k,
    label: k,
    count: clientCounts[k]
  }));
  selectedClients = new Set(availableClients.map(c => c.value));
  renderDropdownItems('Clientes', availableClients, selectedClients);

  // 4. Contratos
  const contractCounts = {};
  rows.forEach(r => {
    const c = (r['CONTRATO'] || '').trim();
    if (c) contractCounts[c] = (contractCounts[c] || 0) + 1;
  });
  availableContracts = Object.keys(contractCounts).sort((a, b) => a.localeCompare(b, 'es')).map(k => ({
    value: k,
    label: k,
    count: contractCounts[k]
  }));
  selectedContracts = new Set(availableContracts.map(c => c.value));
  renderDropdownItems('Contratos', availableContracts, selectedContracts);

  // 5. Conceptos
  const conceptCounts = {};
  rows.forEach(r => {
    const c = (r['CONCEPTO'] || '').trim();
    if (c) conceptCounts[c] = (conceptCounts[c] || 0) + 1;
  });
  availableConcepts = Object.keys(conceptCounts).sort((a, b) => a.localeCompare(b, 'es')).map(k => ({
    value: k,
    label: k,
    count: conceptCounts[k]
  }));
  selectedConcepts = new Set(availableConcepts.map(c => c.value));
  renderDropdownItems('Conceptos', availableConcepts, selectedConcepts);

  lucide.createIcons();
}

function renderDropdownItems(type, items, selectedSet) {
  const listEl = document.getElementById(`listDropdown${type}`);
  const labelEl = document.getElementById(`labelDropdown${type}`);
  const titleName = DROPDOWN_DISPLAY_NAMES[type] || type;
  if (!listEl) return;

  listEl.innerHTML = '';
  if (items.length === 0) {
    listEl.innerHTML = '<p class="text-slate-400 p-2 text-center text-[10px]">No hay registros</p>';
    if (labelEl) labelEl.textContent = `${titleName}: Ninguno`;
    return;
  }

  items.forEach(item => {
    const rowEl = document.createElement('label');
    rowEl.className = "dropdown-item-row flex items-center space-x-2 py-1 px-1.5 hover:bg-slate-50 rounded cursor-pointer transition select-none";
    const itemVal = String(item.value);
    const itemLabel = item.label || itemVal;
    rowEl.setAttribute('data-val', itemLabel);

    const isChecked = selectedSet.has(itemVal);
    rowEl.innerHTML = `
      <input type="checkbox" value="${escapeHtml(itemVal)}" ${isChecked ? 'checked' : ''} onchange="handleDropdownSelectionChange('${type}')" class="rounded border-slate-300 text-blue-600 focus:ring-blue-500 shrink-0">
      <span class="truncate flex-1 font-medium text-slate-800" title="${escapeHtml(itemLabel)}">${escapeHtml(itemLabel)}</span>
      <span class="text-[10px] text-slate-400 font-mono shrink-0">(${item.count})</span>
    `;
    listEl.appendChild(rowEl);
  });

  if (labelEl) labelEl.textContent = `${titleName}: Todos`;
}

function applyFilters() {
  const sourceRows = isNCApplied ? processedNCTableRows : currentTableRows;
  const fDesde = document.getElementById('filterFechaDesde') ? document.getElementById('filterFechaDesde').value : '';
  const fHasta = document.getElementById('filterFechaHasta') ? document.getElementById('filterFechaHasta').value : '';

  const MONTH_NAMES = [
    'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
    'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
  ];

  currentFilteredRows = sourceRows.filter(r => {
    if (currentQuickTypeFilter !== 'ALL' && r['TIPO'] !== currentQuickTypeFilter) return false;

    const cli = (r['CLIENTE'] || '').trim();
    if (availableClients.length > 0) {
      if (selectedClients.size === 0) return false;
      if (selectedClients.size < availableClients.length && !selectedClients.has(cli)) return false;
    }

    const cto = (r['CONTRATO'] || '').trim();
    if (availableContracts.length > 0) {
      if (selectedContracts.size === 0) return false;
      if (selectedContracts.size < availableContracts.length && !selectedContracts.has(cto)) return false;
    }

    const cpto = (r['CONCEPTO'] || '').trim();
    if (availableConcepts.length > 0) {
      if (selectedConcepts.size === 0) return false;
      if (selectedConcepts.size < availableConcepts.length && !selectedConcepts.has(cpto)) return false;
    }

    const parts = (r['FECHA FACTURA'] || '').split('/');
    const rowYear = parts.length === 3 ? parts[2].trim() : '';
    if (availableYears.length > 0) {
      if (selectedYears.size === 0) return false;
      if (selectedYears.size < availableYears.length && !selectedYears.has(rowYear)) return false;
    }

    if (availableMonths.length > 0) {
      if (selectedMonths.size === 0) return false;
      if (selectedMonths.size < availableMonths.length) {
        const rowMonthNum = parts.length === 3 ? parseInt(parts[1], 10) : 0;
        const periodoStr = (r['PERIODO'] || '').toUpperCase();
        let matchesMonth = false;
        if (rowMonthNum > 0 && selectedMonths.has(String(rowMonthNum))) matchesMonth = true;
        else {
          for (const mVal of selectedMonths) {
            const mNum = parseInt(mVal, 10);
            if (mNum >= 1 && mNum <= 12 && periodoStr.includes(MONTH_NAMES[mNum - 1])) {
              matchesMonth = true;
              break;
            }
          }
        }
        if (!matchesMonth) return false;
      }
    }

    if (fDesde || fHasta) {
      const rowDateIso = parseRowDate(r['FECHA FACTURA']);
      if (rowDateIso) {
        if (fDesde && rowDateIso < fDesde) return false;
        if (fHasta && rowDateIso > fHasta) return false;
      }
    }

    return true;
  });

  // Ordenar filas (por defecto: Fecha más antigua a más reciente, y luego Factura A-Z)
  currentFilteredRows = sortRowsJs(currentFilteredRows, currentSortColumn, currentSortDirection);

  renderTableRows(currentFilteredRows, sourceRows.length);
  updateKpiCards(currentFilteredRows);
  updateConceptCounters(currentFilteredRows);
  renderClientPieChart(currentFilteredRows);
}

function parseRowDate(dateStr) {
  if (!dateStr || dateStr === 'NA') return null;
  const parts = dateStr.split('/');
  if (parts.length === 3) {
    const d = parts[0].padStart(2, '0');
    const m = parts[1].padStart(2, '0');
    const y = parts[2].padStart(4, '0');
    return `${y}-${m}-${d}`;
  }
  return null;
}

function setQuickTypeFilter(type) {
  currentQuickTypeFilter = type;
  const qAll = document.getElementById('qfAll');
  const qFC = document.getElementById('qfFC');
  const qNC = document.getElementById('qfNC');

  const activeClass = "px-2 py-0.5 rounded bg-slate-900 text-white font-medium text-[11px] transition shadow-xs";
  const inactiveClass = "px-2 py-0.5 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium text-[11px] transition";

  if (qAll) qAll.className = (type === 'ALL') ? activeClass : inactiveClass;
  if (qFC) qFC.className = (type === 'FACTURA') ? activeClass : inactiveClass;
  if (qNC) qNC.className = (type === 'NOTA DE CREDITO') ? activeClass : inactiveClass;

  applyFilters();
}

function clearAllFilters(notify = true) {
  const fDesde = document.getElementById('filterFechaDesde');
  const fHasta = document.getElementById('filterFechaHasta');
  if (fDesde) fDesde.value = '';
  if (fHasta) fHasta.value = '';

  ALL_FILTER_DROPDOWNS.forEach(type => {
    selectAllInDropdown(type, true);
    const searchInput = document.getElementById(`searchDropdown${type}`);
    if (searchInput) searchInput.value = '';
    filterDropdownList(type);
  });

  currentQuickTypeFilter = 'ALL';
  const qAll = document.getElementById('qfAll');
  const qFC = document.getElementById('qfFC');
  const qNC = document.getElementById('qfNC');
  const activeClass = "px-2 py-0.5 rounded bg-slate-900 text-white font-medium text-[11px] transition shadow-xs";
  const inactiveClass = "px-2 py-0.5 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium text-[11px] transition";
  if (qAll) qAll.className = activeClass;
  if (qFC) qFC.className = inactiveClass;
  if (qNC) qNC.className = inactiveClass;

  applyFilters();
  if (notify) showToast('Filtros restablecidos', 'info');
}

// ACTUALIZAR KPIS (Documentos Únicos y Valor Total Estable)
function updateKpiCards(rows) {
  const uniqueFacturas = new Set();
  const uniqueNC = new Set();
  let sumFacturas = 0.0;
  let sumNC = 0.0;

  rows.forEach(r => {
    const isNC = (r['TIPO'] === 'NOTA DE CREDITO' || r['is_nc']);
    const val = Math.abs(smartParseNumberJs(r['VALOR TOTAL']));
    const docCode = (r['FACTURA'] || '').trim();

    if (isNC) {
      if (docCode) uniqueNC.add(docCode);
      sumNC += val;
    } else {
      if (docCode) uniqueFacturas.add(docCode);
      sumFacturas += val;
    }
  });

  const netTotal = sumFacturas - sumNC;
  const totalUniqueDocs = uniqueFacturas.size + uniqueNC.size;

  document.getElementById('statTotalDocs').textContent = `${totalUniqueDocs} (${rows.length} líneas)`;
  document.getElementById('statFacturas').textContent = uniqueFacturas.size;
  document.getElementById('statNC').textContent = uniqueNC.size;
  document.getElementById('statTotalMonto').textContent = formatCurrencyCopJs(netTotal);
}

function updateConceptCounters(rows) {
  const sumInvoices = new Set();
  const traInvoices = new Set();
  const gesInvoices = new Set();
  const otrInvoices = new Set();

  rows.forEach(r => {
    const isNC = (r['TIPO'] === 'NOTA DE CREDITO' || r['is_nc']);
    if (isNC) return;

    const c = (r['CONCEPTO'] || '').toUpperCase();
    const docCode = (r['FACTURA'] || '').trim();
    if (!docCode) return;

    if (c.includes('SUMINISTRO')) sumInvoices.add(docCode);
    else if (c.includes('TRANSPORTE')) traInvoices.add(docCode);
    else if (c.includes('GESTOR') || c.includes('RETRIBUCION')) gesInvoices.add(docCode);
    else otrInvoices.add(docCode);
  });

  document.getElementById('cntSuministro').textContent = sumInvoices.size;
  document.getElementById('cntTransporte').textContent = traInvoices.size;
  document.getElementById('cntGestor').textContent = gesInvoices.size;
  document.getElementById('cntOtros').textContent = otrInvoices.size;

  const uniqueDocs = new Set([...sumInvoices, ...traInvoices, ...gesInvoices, ...otrInvoices]);
  document.getElementById('badgeTotalConceptos').textContent = `${uniqueDocs.size} facturas (${rows.length} líneas)`;
}

// GRÁFICO PASTEL CHART.JS (MOSTRANDO TODOS LOS CLIENTES EXACTAMENTE IGUAL QUE EN LA VERSIÓN ORIGINAL)
function renderClientPieChart(rows) {
  const canvas = document.getElementById('clientPieChart');
  const legendContainer = document.getElementById('clientLegendList');
  if (!canvas || !legendContainer) return;

  const clientTotals = {};
  rows.forEach(r => {
    const cli = (r['CLIENTE'] || 'Desconocido').trim();
    const val = Math.abs(smartParseNumberJs(r['VALOR TOTAL']));
    const isNC = (r['TIPO'] === 'NOTA DE CREDITO' || r['is_nc']);
    const net = isNC ? -val : val;
    clientTotals[cli] = (clientTotals[cli] || 0) + net;
  });

  const sortedClients = Object.entries(clientTotals)
    .filter(([_, tot]) => tot > 0)
    .sort((a, b) => b[1] - a[1]);

  const totalNetAll = sortedClients.reduce((acc, curr) => acc + curr[1], 0);

  const chartColors = [
    '#2563eb', '#059669', '#d97706', '#7c3aed', '#0891b2',
    '#e11d48', '#4f46e5', '#ea580c', '#0d9488', '#64748b',
    '#84cc16', '#ec4899', '#3b82f6', '#10b981', '#f59e0b',
    '#6366f1', '#14b8a6', '#f43f5e', '#a855f7', '#06b6d4'
  ];

  legendContainer.innerHTML = '';

  if (sortedClients.length === 0) {
    if (clientPieChartInstance) {
      clientPieChartInstance.destroy();
      clientPieChartInstance = null;
    }
    legendContainer.innerHTML = '<p class="text-xs text-slate-400 py-4 text-center">No hay datos para graficar con el filtro actual.</p>';
    return;
  }

  const labels = [];
  const chartData = [];
  const bgColors = [];

  // Mostrar TODOS los clientes sin límite
  sortedClients.forEach(([cli, tot], index) => {
    const color = chartColors[index % chartColors.length];
    const pct = totalNetAll > 0 ? (tot / totalNetAll) * 100 : 0;

    labels.push(cli);
    chartData.push(tot);
    bgColors.push(color);

    const rowEl = document.createElement('div');
    rowEl.className = "flex items-center justify-between py-1 px-1.5 hover:bg-slate-50 rounded text-[11px] cursor-pointer transition";
    rowEl.title = `Filtrar solo por: ${cli}`;
    rowEl.onclick = () => {
      selectSingleItemInDropdown('Clientes', cli);
    };

    rowEl.innerHTML = `
      <div class="flex items-center space-x-1.5 truncate max-w-[62%]">
        <span class="w-2.5 h-2.5 rounded-full shrink-0" style="background-color: ${color}"></span>
        <span class="truncate font-medium text-slate-800">${escapeHtml(cli)}</span>
      </div>
      <div class="text-right shrink-0">
        <span class="font-bold text-slate-900">${pct.toFixed(1)}%</span>
        <span class="text-slate-400 font-mono text-[10px] ml-1">(${formatCurrencyCopJs(tot)})</span>
      </div>
    `;
    legendContainer.appendChild(rowEl);
  });

  if (clientPieChartInstance) clientPieChartInstance.destroy();

  const ctx = canvas.getContext('2d');
  clientPieChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: chartData,
        backgroundColor: bgColors,
        borderWidth: 1.5,
        borderColor: '#ffffff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(context) {
              const val = context.parsed;
              const pct = totalNetAll > 0 ? ((val / totalNetAll) * 100).toFixed(1) : 0;
              return ` ${context.label}: ${formatCurrencyCopJs(val)} (${pct}%)`;
            }
          }
        }
      },
      cutout: '68%'
    }
  });
}

// RENDERIZADO DE TABLA (16 Columnas y Reglas de Colores)
function renderTableRows(filtered, totalSourceCount) {
  const tbody = document.getElementById('documentsTableBody');
  tbody.innerHTML = '';

  const totalSource = totalSourceCount !== undefined ? totalSourceCount : currentTableRows.length;
  document.getElementById('showingCountText').textContent = `Mostrando ${filtered.length} de ${totalSource} líneas contables (${currentDocuments.length} archivos)`;

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="17" class="text-center py-8 text-slate-400">
          <i data-lucide="file-question" class="w-8 h-8 mx-auto mb-2 opacity-50"></i>
          <p class="text-xs">No se encontraron líneas contables que coincidan con los filtros seleccionados.</p>
        </td>
      </tr>
    `;
    lucide.createIcons();
    return;
  }

  filtered.forEach((r, idx) => {
    const tr = document.createElement('tr');
    const isNC = (r['TIPO'] === 'NOTA DE CREDITO' || r['is_nc']);
    const hasNC = (r['has_credit_note'] === true || (r['NOTA CREDITO'] && r['NOTA CREDITO'] !== 'NA'));

    if (isNC) tr.className = "row-nota-credito";
    else tr.className = (idx % 2 === 0) ? "bg-white" : "bg-slate-50/40";

    const ncBadgeHtml = hasNC 
      ? `<span class="cell-has-nc" title="Tiene Nota de Crédito: ${escapeHtml(r['NOTA CREDITO'])}">${escapeHtml(r['NOTA CREDITO'])}</span>`
      : `<span class="text-slate-400 font-normal">NA</span>`;

    const notaBadgeHtml = (r['NOTA'] && r['NOTA'] !== 'NA')
      ? `<span class="font-semibold text-slate-900">${escapeHtml(r['NOTA'])}</span>`
      : `<span class="text-slate-400 font-normal">NA</span>`;

    const canPreview = documentBlobs[r['doc_id']] !== undefined;
    const previewBtnHtml = canPreview
      ? `<button onclick="openPreviewModal('${r['doc_id']}', '${escapeHtml(r['filename'])}')" class="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition" title="Ver PDF"><i data-lucide="eye" class="w-3.5 h-3.5"></i></button>`
      : `<span class="text-slate-300">-</span>`;

    tr.innerHTML = `
      <td class="font-bold">${escapeHtml(r['FACTURA'] || '')}</td>
      <td>${escapeHtml(r['FECHA FACTURA'] || '')}</td>
      <td>${escapeHtml(r['PERIODO'] || '')}</td>
      <td title="${escapeHtml(r['CLIENTE'] || '')}" class="font-medium">${escapeHtml(r['CLIENTE'] || '')}</td>
      <td>${escapeHtml(r['NITCLIENTE'] || '')}</td>
      <td title="${escapeHtml(r['CONCEPTO'] || '')}">${escapeHtml(r['CONCEPTO'] || '')}</td>
      <td>${escapeHtml(r['PTO ENTREGA'] || '')}</td>
      <td class="text-right font-mono">${escapeHtml(r['CANTIDAD'] || '')}</td>
      <td class="text-right font-mono font-medium">${escapeHtml(r['VALOR UNITARIO'] || '')}</td>
      <td class="text-right font-mono font-bold">${escapeHtml(r['VALOR TOTAL'] || '')}</td>
      <td>${escapeHtml(r['TRM FACTURA'] || 'NA')}</td>
      <td><span class="px-1.5 py-0.5 rounded text-[10px] font-semibold ${isNC ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}">${escapeHtml(r['TIPO'] || '')}</span></td>
      <td title="${escapeHtml(r['OBSERVACIONES'] || '')}">${escapeHtml(r['OBSERVACIONES'] || '')}</td>
      <td title="${escapeHtml(r['CONTRATO'] || '')}">${escapeHtml(r['CONTRATO'] || '')}</td>
      <td>${ncBadgeHtml}</td>
      <td>${notaBadgeHtml}</td>
      <td class="text-center">${previewBtnHtml}</td>
    `;
    tbody.appendChild(tr);
  });

  lucide.createIcons();
}

// EXPORTACIONES A EXCEL CON SHEETJS EN EL NAVEGADOR
function downloadCompleteExcel() {
  if (currentTableRows.length === 0) {
    showToast('No hay datos para exportar', 'error');
    return;
  }
  showToast('Generando Tabla completa.xlsx...', 'info');

  const sortedRows = sortRowsJs(currentTableRows, 'FECHA FACTURA', 'asc');
  const rowsData = sortedRows.map(r => formatRowForExcel(r));
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(rowsData, { header: OFFICIAL_16_COLUMNS });
  XLSX.utils.book_append_sheet(wb, ws, "TABLA COMPLETA");
  XLSX.writeFile(wb, "Tabla_completa.xlsx");

  showToast('¡Tabla completa.xlsx descargada exitosamente!', 'success');
}

function downloadProcessedExcel() {
  if (currentFilteredRows.length === 0 && currentTableRows.length === 0) {
    showToast('No hay datos para exportar', 'error');
    return;
  }
  showToast('Generando Tabla procesada.xlsx (con filtros y auditoría NC)...', 'info');

  const rowsToExport = currentFilteredRows.length > 0 ? currentFilteredRows : sortRowsJs(currentTableRows, 'FECHA FACTURA', 'asc');
  const rowsData = rowsToExport.map(r => formatRowForExcel(r));

  // Generar Auditoría NC
  let auditData = currentAuditLog;
  if (!auditData || auditData.length === 0) {
    const { auditLog } = applyNCLogicClient(currentTableRows);
    auditData = auditLog;
  }

  const wb = XLSX.utils.book_new();
  const ws1 = XLSX.utils.json_to_sheet(rowsData, { header: OFFICIAL_16_COLUMNS });
  XLSX.utils.book_append_sheet(wb, ws1, "FACTURAS PROCESADAS");

  if (auditData && auditData.length > 0) {
    const ws2 = XLSX.utils.json_to_sheet(auditData);
    XLSX.utils.book_append_sheet(wb, ws2, "AUDITORIA NC");
  } else {
    const ws2 = XLSX.utils.json_to_sheet([{ "MENSAJE": "No hubo notas de crédito aplicadas en este lote." }]);
    XLSX.utils.book_append_sheet(wb, ws2, "AUDITORIA NC");
  }

  XLSX.writeFile(wb, "Tabla_procesada.xlsx");
  showToast('¡Tabla procesada.xlsx descargada exitosamente!', 'success');
}

function formatRowForExcel(r) {
  return {
    "FACTURA": r['FACTURA'] || '',
    "FECHA FACTURA": r['FECHA FACTURA'] || '',
    "PERIODO": r['PERIODO'] || '',
    "CLIENTE": r['CLIENTE'] || '',
    "NITCLIENTE": r['NITCLIENTE'] || '',
    "CONCEPTO": r['CONCEPTO'] || '',
    "PTO ENTREGA": r['PTO ENTREGA'] || '',
    "CANTIDAD": r['CANTIDAD'] || '',
    "VALOR UNITARIO": r['VALOR UNITARIO'] || '',
    "VALOR TOTAL": r['VALOR TOTAL'] || '',
    "TRM FACTURA": r['TRM FACTURA'] || 'NA',
    "TIPO": r['TIPO'] || '',
    "OBSERVACIONES": r['OBSERVACIONES'] || 'NA',
    "CONTRATO": r['CONTRATO'] || 'NA',
    "NOTA CREDITO": r['NOTA CREDITO'] || 'NA',
    "NOTA": r['NOTA'] || 'NA'
  };
}

// Descargar ZIP con PDFs (Nombre exacto: Facturas_Organizadas.zip)
function downloadZip() {
  if (!generatedZipBlob) {
    showToast('No hay archivo ZIP generado en esta modalidad', 'info');
    return;
  }
  const url = URL.createObjectURL(generatedZipBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Facturas_Organizadas.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('¡Facturas_Organizadas.zip descargado exitosamente!', 'success');
}

// Descargar Plantilla Oficial Excel
function downloadTemplateExcelClient() {
  const sampleRows = [
    {
      "FACTURA": "No. B-2626",
      "FECHA FACTURA": "11/09/2026",
      "PERIODO": "AGOSTO",
      "CLIENTE": "GASES DEL CARIBE S.A E.S.P",
      "NITCLIENTE": "890.101.691-2",
      "CONCEPTO": "RETRIBUCION GESTOR DEL MERCADO",
      "PTO ENTREGA": "NA",
      "CANTIDAD": "1,00",
      "VALOR UNITARIO": " $ 12.271.642,00 ",
      "VALOR TOTAL": " $ 12.271.642,00 ",
      "TRM FACTURA": "NA",
      "TIPO": "FACTURA",
      "OBSERVACIONES": "NA",
      "CONTRATO": "GEAM-GC-CFC-N-2024-2026",
      "NOTA CREDITO": "NA",
      "NOTA": "NA"
    },
    {
      "FACTURA": "NC-145",
      "FECHA FACTURA": "07/09/2026",
      "PERIODO": "AGOSTO",
      "CLIENTE": "EFIGAS GAS NATURAL S.A. E.S.P",
      "NITCLIENTE": "800.202.395-3",
      "CONCEPTO": "SUMINISTRO GAS NATURAL",
      "PTO ENTREGA": "CUSIANA",
      "CANTIDAD": "76469,00",
      "VALOR UNITARIO": " $ 15.821,78 ",
      "VALOR TOTAL": "-$ 1.209.875.694,82 ",
      "TRM FACTURA": " $ 3.202,79 ",
      "TIPO": "NOTA DE CREDITO",
      "OBSERVACIONES": "NA",
      "CONTRATO": "GEAM-EFG-CUS-MIXM-2024-2026",
      "NOTA CREDITO": "NA",
      "NOTA": "No. B-2595"
    }
  ];

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(sampleRows, { header: OFFICIAL_16_COLUMNS });
  XLSX.utils.book_append_sheet(wb, ws, "2026");
  XLSX.writeFile(wb, "Plantilla_Facturas.xlsx");
  showToast('¡Plantilla_Facturas.xlsx generada y descargada!', 'success');
}

// VISTA PREVIA DE PDF
function openPreviewModal(docId, title) {
  const blob = documentBlobs[docId];
  if (!blob) {
    showToast('Documento no disponible para previsualización', 'info');
    return;
  }
  const url = URL.createObjectURL(blob);
  const frame = document.getElementById('pdfPreviewFrame');
  frame.src = url;
  document.getElementById('modalDocTitle').textContent = title || 'Documento';
  document.getElementById('modalDocSubtitle').textContent = `ID: ${docId}`;
  document.getElementById('previewModal').classList.remove('hidden');
}

function closePreviewModal() {
  const modal = document.getElementById('previewModal');
  const frame = document.getElementById('pdfPreviewFrame');
  if (frame.src) URL.revokeObjectURL(frame.src);
  frame.src = '';
  modal.classList.add('hidden');
}

// REDIMENSIONAMIENTO DE COLUMNAS
function setupColumnResizers() {
  const table = document.querySelector('.universal-table');
  if (!table) return;

  const cols = table.querySelectorAll('th');
  cols.forEach(col => {
    const old = col.querySelector('.resizer');
    if (old) old.remove();

    const resizer = document.createElement('div');
    resizer.classList.add('resizer');
    col.appendChild(resizer);

    let startX, startWidth;
    resizer.addEventListener('mousedown', (e) => {
      e.preventDefault();
      startX = e.pageX;
      startWidth = col.offsetWidth;
      resizer.classList.add('resizing');

      const onMouseMove = (moveEvent) => {
        const diff = moveEvent.pageX - startX;
        col.style.width = `${Math.max(40, startWidth + diff)}px`;
      };

      const onMouseUp = () => {
        resizer.classList.remove('resizing');
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  });
}

// BARRA DE PROGRESO Y REINICIO
function showProgress(text, percent) {
  const section = document.getElementById('progressSection');
  const statusEl = document.getElementById('progressStatusText');
  const percentEl = document.getElementById('progressPercentText');
  const barEl = document.getElementById('progressBar');

  section.classList.remove('hidden');
  statusEl.textContent = text;
  percentEl.textContent = `${percent}%`;
  barEl.style.width = `${percent}%`;
}

function hideProgress() {
  document.getElementById('progressSection').classList.add('hidden');
}

function resetApp() {
  currentDocuments = [];
  currentTableRows = [];
  processedNCTableRows = [];
  currentFilteredRows = [];
  currentAuditLog = [];
  isNCApplied = false;
  selectedPdfFile = null;
  selectedZipFile = null;
  selectedMultipleFiles = [];
  selectedExcelFile = null;
  parsedExcelWorkbook = null;
  generatedZipBlob = null;
  documentBlobs = {};

  document.getElementById('inputPdfFile').value = '';
  document.getElementById('inputZipFile').value = '';
  document.getElementById('inputExcelFile').value = '';

  document.getElementById('pdfSelectedInfo').classList.add('hidden');
  document.getElementById('zipSelectedInfo').classList.add('hidden');
  document.getElementById('excelSelectedInfo').classList.add('hidden');
  document.getElementById('excelSheetSelectorContainer').classList.add('hidden');

  document.getElementById('btnProcessPdf').setAttribute('disabled', 'true');
  document.getElementById('btnProcessZip').setAttribute('disabled', 'true');
  document.getElementById('btnProcessExcel').setAttribute('disabled', 'true');

  document.getElementById('resultsSection').classList.add('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  showToast('Aplicación restablecida', 'info');
}

function showToast(message, type = 'info') {
  const toast = document.getElementById('toastNotification');
  const content = document.getElementById('toastContent');
  const icon = document.getElementById('toastIcon');
  const msg = document.getElementById('toastMessage');

  msg.textContent = message;

  if (type === 'success') {
    content.className = "px-4 py-2.5 rounded-xl shadow-lg border text-xs font-semibold flex items-center space-x-2 bg-emerald-900 text-white border-emerald-700";
    icon.innerHTML = `<i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400"></i>`;
  } else if (type === 'error') {
    content.className = "px-4 py-2.5 rounded-xl shadow-lg border text-xs font-semibold flex items-center space-x-2 bg-red-900 text-white border-red-700";
    icon.innerHTML = `<i data-lucide="alert-circle" class="w-4 h-4 text-red-400"></i>`;
  } else {
    content.className = "px-4 py-2.5 rounded-xl shadow-lg border text-xs font-semibold flex items-center space-x-2 bg-slate-900 text-white border-slate-700";
    icon.innerHTML = `<i data-lucide="info" class="w-4 h-4 text-blue-400"></i>`;
  }

  toast.classList.remove('hidden');
  lucide.createIcons();

  setTimeout(() => toast.classList.add('hidden'), 4000);
}

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Cierre de dropdowns al hacer clic fuera
document.addEventListener('click', (e) => {
  ALL_FILTER_DROPDOWNS.forEach(name => {
    const container = document.getElementById(`dropdownContainer${name}`);
    const panel = document.getElementById(`panelDropdown${name}`);
    if (container && panel && !container.contains(e.target)) {
      panel.classList.add('hidden');
    }
  });
});
