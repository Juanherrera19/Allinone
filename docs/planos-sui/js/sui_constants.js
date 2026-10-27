/**
 * GCR2 Informacion Comercial Suministro SUI
 * Constantes y tablas maestras de referencia en JavaScript
 */

const SUI_MONTHS = {
  'ENERO': { num: 1, dias: 31 },
  'FEBRERO': { num: 2, dias: 28 },
  'MARZO': { num: 3, dias: 31 },
  'ABRIL': { num: 4, dias: 30 },
  'MAYO': { num: 5, dias: 31 },
  'JUNIO': { num: 6, dias: 30 },
  'JULIO': { num: 7, dias: 31 },
  'AGOSTO': { num: 8, dias: 31 },
  'SEPTIEMBRE': { num: 9, dias: 30 },
  'OCTUBRE': { num: 10, dias: 31 },
  'NOVIEMBRE': { num: 11, dias: 30 },
  'DICIEMBRE': { num: 12, dias: 31 }
};

function normalizeKeyJs(s) {
  return String(s || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
}

// 1. Contratos -> SEGAS & Procedencia
const SUI_CONTRACT_REFERENCE = {
  'GEAM-EFG-CUS-MR-2023-2027': { segas: 81130, proc: 'ARIANNA' },
  'GEAM-EFG-CUS-MIXM-2024-2026': { segas: 92354, proc: 'CUSIANA' },
  'GEAM-EFG-CFC-BL-2026-2027': { segas: 114899, proc: 'ARIANNA' },
  'GEAM-EFG-CFC-R-2025': { segas: 105060, proc: 'ARIANNA' },
  'GEAM-E2-CF-BUL-2024-2025': { segas: 105097, proc: 'BULLERENGUE' },
  'GEAM-E2-CFC-2024-2026': { segas: 105071, proc: 'ARIANNA' },
  'GEAM-E2-CFC-TUC-2025-2026': { segas: 105066, proc: 'BULLERENGUE' },
  'GEAM-E2-OC-2025-2026': { segas: 105098, proc: 'ARIANNA' },
  'GEAM-EPM-MC-2024-2027': { segas: 105006, proc: 'MARIA CONCHITA' },
  'GEAM-EPM-S9-2024-2029': { segas: 104202, proc: 'SINU-9' },
  'GEAM-GC-BUL-R-2024-2026': { segas: 105102, proc: 'BULLERENGUE' },
  'GEAM-GC-CFC-BUL-2024-2026': { segas: 105100, proc: 'BULLERENGUE' },
  'GEAM-GC-CFC-N-2024-2026': { segas: 105099, proc: 'ARIANNA' },
  'GEAM-GC-CI-S9-2026-03-11': { segas: 104315, proc: 'SINU-9' },
  'GEAM-GC-S9-2024-2034': { segas: 104315, proc: 'SINU-9' },
  'GEAM-GCK-TMG-CF-2022-2025': { segas: 81017, proc: 'CHUCHUPA' },
  'GEAM-GCK-TMG-CI-2022-2025': { segas: 109872, proc: 'CHUCHUPA' },
  'GEAM-GCK-TMG-CI-2025': { segas: 109872, proc: 'CHUCHUPA' },
  'GEAM-HOL-BL-2026-0420': { segas: 125949, proc: 'BALLENA' },
  'GEAM-HOL-BL-2026-0724': { segas: 132418, proc: 'BALLENA' },
  'GEAM-HOL-BL-2026-0822': { segas: 132418, proc: 'BALLENA' },
  'GEAM-PRL-2023-2024': { segas: 90038971, proc: 'ARIANNA' },
  'GEAM-SG-BM-2024-2025': { segas: 105048, proc: 'BONGA MAMEY' },
  'GEAM-SG-CFC-CG-2024-2026': { segas: 105054, proc: 'ARIANNA' },
  'GEAM-SG-CFC-CG-20242026': { segas: 105054, proc: 'ARIANNA' },
  'GEAM-SG-CFC-CTG-2026': { segas: 121861, proc: 'ARIANNA' },
  'GEAM-SG-CFC-YR-2024-2025': { segas: 105051, proc: 'ARIANNA' },
  'GEAM-SG-CI-S9-2026-03-11': { segas: 121872, proc: 'ARIANNA' },
  'GEAM-SG-S9-CI-2026-1': { segas: 121872, proc: 'ARIANNA' },
  'GEAM-SG-S9-CI-2026-2': { segas: 121873, proc: 'ARIANNA' },
  'GEAM-SG-S9-2024-2034': { segas: 104245, proc: 'SINU-9' },
  'GEAM-VTI-CFC-2024-2026': { segas: 105041, proc: 'ARIANNA' },
  'GEAM-VTI-CFR-2024-2026': { segas: 105039, proc: 'BULLERENGUE' }
};

const SUI_NORM_CONTRACT_REFERENCE = {};
for (const [k, v] of Object.entries(SUI_CONTRACT_REFERENCE)) {
  SUI_NORM_CONTRACT_REFERENCE[normalizeKeyJs(k)] = v;
}

// 2. Fallbacks por NIT / Cliente
const SUI_CLIENT_FALLBACK = {
  '890100251-0': { segas: 90033989, proc: 'BONGA MAMEY' },
  '900164755-0': { segas: 90033988, proc: 'BONGA MAMEY' },
  '900334431-1': { segas: 90047342, proc: 'BALLENA' },
  '800149537-6': { segas: 90047347, proc: 'BALLENA' },
  '901069576-6': { segas: 90045124, proc: 'ARIANNA' },
  '830113630-7': { segas: 90045344, proc: 'ARIANNA' },
  '805003351-4': { segas: 90045156, proc: 'ARIANNA' },
  '892115036-6': { segas: 106916, proc: 'ARIANNA' }
};

// 3. Puntos de Entrega -> Codigo SUI y Codigo DANE
const SUI_PUNTO_ENTREGA_MAP = {
  'CUSIANA': { pto_code: 85, dane: '85139000' },
  'LA MAMI': { pto_code: 1041, dane: '47001000' },
  'CARTAGENA': { pto_code: 50, dane: '13001000' },
  'MAMONAL': { pto_code: 897, dane: '13001000' },
  'COLCLINKER': { pto_code: 73, dane: '13001000' },
  'BALLENA': { pto_code: 19, dane: '44560000' },
  'MARIA CONCHITA': { pto_code: 967, dane: '44090000' },
  'SINU-9': { pto_code: 178, dane: '20383000' },
  'SINU 9': { pto_code: 178, dane: '20383000' },
  'TERMONORTE': { pto_code: 924, dane: '47001000' },
  'TOLU': { pto_code: 73, dane: '13001000' },
  'JOBO': { pto_code: 832, dane: '23660000' }
};

// 4. Procedencia -> Codigo SUI y Poder Calorifico Bruto
const SUI_PROCEDENCIA_MAP = {
  'ARIANNA': { proc_code: 896, poder: 1004.75 },
  'BALLENA': { proc_code: 19, poder: 1065.80 },
  'BULLERENGUE': { proc_code: 934, poder: 996.23 },
  'BONGA MAMEY': { proc_code: 281, poder: 998.24 },
  'SINU-9': { proc_code: 178, poder: 0.0 },
  'CUSIANA': { proc_code: 85, poder: 0.0 },
  'CHUCHUPA': { proc_code: 1025, poder: 0.0 },
  'MARIA CONCHITA': { proc_code: 967, poder: 0.0 },
  'DIBULLA': { proc_code: 19, poder: 0.0 },
  'SANTA ROSA': { proc_code: 896, poder: 0.0 },
  'JOBO': { proc_code: 832, poder: 0.0 },
  'LA MAMI': { proc_code: 1041, poder: 0.0 }
};

// 5. Actividad y Sector de Consumo por NIT
const SUI_ACT_SEC_MAP = {
  '800249860-1': { actividad: 6, sector: 8 },
  '890100251-0': { actividad: 5, sector: 1 },
  '811009788-8': { actividad: 1, sector: 1 },
  '802025052-0': { actividad: 1, sector: 1 },
  '899999068-1': { actividad: 5, sector: 1 },
  '800202395-3': { actividad: 2, sector: 1 },
  '890904996-1': { actividad: 1, sector: 1 },
  '901023319-1': { actividad: 1, sector: 1 },
  '901263317-6': { actividad: 1, sector: 1 },
  '901687946-9': { actividad: 1, sector: 1 },
  '901686472-5': { actividad: 1, sector: 1 },
  '892115036-6': { actividad: 2, sector: 1 },
  '890101691-2': { actividad: 2, sector: 1 },
  '900082143-0': { actividad: 6, sector: 8 },
  '901007478-7': { actividad: 1, sector: 1 },
  '860072134-7': { actividad: 3, sector: 1 },
  '900067387-8': { actividad: 1, sector: 1 },
  '900555031-5': { actividad: 1, sector: 1 },
  '900691280-4': { actividad: 1, sector: 1 },
  '900330027-9': { actividad: 1, sector: 1 },
  '830113630-7': { actividad: 6, sector: 8 },
  '805003351-4': { actividad: 6, sector: 8 },
  '800149537-6': { actividad: 6, sector: 8 },
  '900403943-5': { actividad: 5, sector: 1 },
  '890400869-9': { actividad: 2, sector: 1 },
  '800245746-1': { actividad: 6, sector: 8 },
  '901069576-6': { actividad: 6, sector: 8 },
  '900334431-1': { actividad: 6, sector: 8 },
  '800007813-5': { actividad: 2, sector: 1 },
  '900305404-7': { actividad: 1, sector: 1 },
  '900164755-0': { actividad: 5, sector: 1 }
};

// Oficiales 54 Encabezados GCR2
const SUI_GCR2_54_HEADERS = [
  'Id\xa0factura',
  'Concepto\xa0general\xa0de\xa0la\xa0factura',
  'NIT',
  'Actividad del\xa0comprador',
  'Tipo\xa0de\xa0Gas',
  'Conexin\xa0Red',
  'Fecha\xa0De\xa0Expedicin\xa0De\xa0La\xa0Factura',
  'Fecha\xa0De\xa0Inicio\xa0Periodo\xa0De\xa0Facturacin',
  'Dias Facturados',
  'Sector\xa0De\xa0Consumo',
  'Tipo\xa0de\xa0contrato',
  'Mercado',
  ' Procedencia\xa0Del\xa0Gas',
  'Suministro',
  'Precio\xa0de\xa0facturacin\xa0de\xa0Suministro',
  ' Poder\xa0Calorfico\xa0Bruto',
  'Facturacin\xa0Por\xa0Suministro',
  'Facturacin\xa0por\xa0remuneracin\xa0al\xa0gestor\xa0del\xa0mercado',
  'Punto\xa0entrega\xa0de\xa0la\xa0energa\xa0al\xa0comprador',
  'Cdigo\xa0DANE\xa0punto\xa0de\xa0entrega\xa0de\xa0la\xa0energa\xa0al\xa0comprador',
  'Transporte',
  'Componente\xa0fijo\xa0de\xa0la\xa0Pareja\xa0de\xa0cargos',
  'Facturacin\xa0Por\xa0Demanda\xa0De\xa0Volumen',
  'Facturacin\xa0Por\xa0Demanda\xa0De\xa0Capacidad',
  'Tarifa\xa0($/kpc):',
  'Cuota\xa0de\xa0fomento',
  'Servicio\xa0Transporte',
  'Cdigo\xa0Punto\xa0Entrada',
  'Cdigo\xa0Punto\xa0Salida',
  'Cdigo\xa0Tramo\xa0Entrada',
  'Cdigo\xa0Tramo\xa0Salida',
  'Cdigo\xa0DANE\xa0Punto\xa0Entrada',
  'Cdigo\xa0DANE\xa0Punto\xa0Salida',
  'NIU',
  'Cargo\xa0De\xa0Distribucin',
  'Cargo\xa0de\xa0comercializacin',
  'Volumen',
  'Nmero\xa0de\xa0operacin\xa0en\xa0Segas',
  'Nmero\xa0de\xa0operacin\xa0de\xa0transporte\xa0Segas\xa0utilizado',
  'Cdigo\xa0DANE',
  'Ubicacin',
  'Informacin\xa0predial\xa0utilizada',
  'Cdula\xa0catastral',
  'Direccin',
  'Altitud',
  'Longitud',
  'Latitud',
  'Nmero\xa0de\xa0operacin\xa0en\xa0Segas',
  'Cantidad\xa0Refacturacin',
  'Valor\xa0Refacturacin',
  'Valor\xa0De\xa0La\xa0Contribucin',
  'Otros',
  'Valor\xa0Total\xa0Facturado',
  'TRM'
];
