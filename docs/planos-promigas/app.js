/**
 * PROMIGAS PLANOS HUB - Application Engine
 * Compatible with GitHub Pages & Client-Side Execution
 */

(function () {
  'use strict';

  // Check data availability
  if (typeof PROMIGAS_DATA === 'undefined') {
    console.error('PROMIGAS_DATA catalog not loaded.');
    return;
  }

  // State Management
  const state = {
    activeTab: 'tab-capacity',
    remitente: 'GEAM',
    gasoducto: 'Promigas',
    tipoRuta: 'TI',
    modalidad: '',
    mercado: 'MKTTP_NOREG',
    sector: 'SECTP_INDUST',
    capacidad: 68000,
    capacityMode: 'all', // 'all' or 'custom'
    tramoCapacities: new Map(), // tramoCode -> number
    tramoCodeMode: 'official', // 'desc' or 'base'
    entrtLbl: 'ENTRY',
    fechaInicio: '2026-12-01',
    fechaFin: '2027-02-28',
    currentGasYear: 2026,
    currentCycle: 1,
    dividirMes: true,
    selectedTramos: new Set(),
    tramoSearchText: '',
    viewMode: 'table', // 'table' or 'raw'
    catalogCategory: 'tramos',
    catalogSearchText: ''
  };

  function getTramoCapacity(codigo) {
    if (state.capacityMode === 'all') {
      return state.capacidad;
    }
    if (state.tramoCapacities.has(codigo)) {
      return state.tramoCapacities.get(codigo);
    }
    return state.capacidad;
  }

  function setTramoCapacity(codigo, val) {
    state.tramoCapacities.set(codigo, val);
  }

  // DOM Elements
  const el = {
    // Tabs
    tabButtons: document.querySelectorAll('.nav-tab-btn'),
    tabPanes: document.querySelectorAll('.tab-pane'),

    // Capacity Form Controls
    selectRemitente: document.getElementById('select-remitente'),
    remitenteBadge: document.getElementById('remitente-code-badge'),
    selectGasoducto: document.getElementById('select-gasoducto'),
    selectTipoRuta: document.getElementById('select-tipo-ruta'),
    selectModalidad: document.getElementById('select-modalidad'),
    selectMercado: document.getElementById('select-mercado'),
    selectSector: document.getElementById('select-sector'),
    inputCapacidad: document.getElementById('input-capacidad'),
    capModeAll: document.getElementById('cap-mode-all'),
    capModeCustom: document.getElementById('cap-mode-custom'),
    btnSyncAllCapacity: document.getElementById('btn-sync-all-capacity'),
    selectTramoCodeMode: document.getElementById('select-tramo-code-mode'),
    inputEntrtLbl: document.getElementById('input-entrt-lbl'),
    inputFechaInicio: document.getElementById('input-fecha-inicio'),
    inputFechaFin: document.getElementById('input-fecha-fin'),
    checkDividirMes: document.getElementById('check-dividir-mes'),
    periodsList: document.getElementById('periods-list'),

    // Date Presets
    presetPrevQuarter: document.getElementById('preset-prev-quarter'),
    presetQuarter: document.getElementById('preset-quarter'),
    presetNextQuarter: document.getElementById('preset-next-quarter'),
    presetCurrentMonth: document.getElementById('preset-current-month'),
    presetNextMonth: document.getElementById('preset-next-month'),

    // Tramos Controls
    tramosGrid: document.getElementById('tramos-grid'),
    tramosCounter: document.getElementById('tramos-counter'),
    btnSelectAllTramos: document.getElementById('btn-select-all-tramos'),
    btnDeselectAllTramos: document.getElementById('btn-deselect-all-tramos'),
    filterTramoText: document.getElementById('filter-tramo-text'),

    // Preview & Export
    statTotalRows: document.getElementById('stat-total-rows'),
    statTotalTramos: document.getElementById('stat-total-tramos'),
    statTotalPeriods: document.getElementById('stat-total-periods'),
    statTotalCapacity: document.getElementById('stat-total-capacity'),
    btnDownloadOfficial: document.getElementById('btn-download-official'),
    btnDownloadUtf8: document.getElementById('btn-download-utf8'),
    btnCopyClipboard: document.getElementById('btn-copy-clipboard'),
    btnViewTable: document.getElementById('btn-view-table'),
    btnViewRaw: document.getElementById('btn-view-raw'),
    outputTableContainer: document.getElementById('output-table-container'),
    outputRawContainer: document.getElementById('output-raw-container'),
    previewTableBody: document.getElementById('preview-table-body'),
    rawCsvCode: document.getElementById('raw-csv-code'),

    // Catalog Tab
    catalogSearchInput: document.getElementById('catalog-search-input'),
    catalogFilterPills: document.querySelectorAll('.btn-filter-pill'),
    catalogTableHead: document.getElementById('catalog-table-head'),
    catalogTableBody: document.getElementById('catalog-table-body'),

    // Template Tab
    templateDropzone: document.getElementById('template-dropzone'),
    templateFileInput: document.getElementById('template-file-input'),
    templateValidationResult: document.getElementById('template-validation-result'),
    btnDownloadBlankTemplate: document.getElementById('btn-download-blank-template'),

    // Toast
    toastContainer: document.getElementById('toast-container')
  };

  // Official CSV Column Header (exact byte match to Promigas standard)
  const OFFICIAL_HEADER = [
    'ENTRT_LBL',
    'Fecha Inicio',
    'Fecha Fin',
    'Código Remitente',
    'Nombre Remitente',
    'Código Tipo Ruta',
    'Nombre Tipo Ruta',
    'Código Modalidad',
    'Código Tramo',
    'Nombre Tramo',
    'Código Mercado',
    'Nombre Mercado',
    'Código Sector',
    'Nombre Sector',
    'Capacidad Solicitada'
  ];

  /**
   * Initialize Application
   */

  /* ==========================================================================
     NOMINACIONES MODULE (GAS & TRANSPORTE)
     ========================================================================== */

  const nomState = {
    subtab: 'nom-subpane-gas',
    gasMes: 10,
    gasAno: 2026,
    gasRows: [],
    gasPreviewSearch: '',
    
    transMes: 7,
    transAno: 2026,
    transContrato: '',
    transRecibo: '',
    transEntrega: '',
    transCantidad: 0,
    transMercado: 'MKTTP_NOREG',
    transSector: 'SECTP_INDUST',
    transReplacing: '',
    transProvider: '',
    transHourly: new Array(24).fill(0),
    transPreviewSearch: ''
  };

  function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }

  function formatDDMMYYYY(day, month, year) {
    const dd = String(day).padStart(2, '0');
    const mm = String(month).padStart(2, '0');
    return `${dd}/${mm}/${year}`;
  }

  function lookupSupplyPoint(nombre) {
    if (!PROMIGAS_DATA.puntosSuministro) return { nombre: nombre, codigo: '' };
    const found = PROMIGAS_DATA.puntosSuministro.find(p => p.nombre.toLowerCase().trim() === nombre.toLowerCase().trim());
    if (found) return found;
    // Fallback to puntosRecibo or puntosEntrega
    const r = (PROMIGAS_DATA.puntosRecibo || []).find(p => p.nombre.toLowerCase().trim() === nombre.toLowerCase().trim());
    if (r) return r;
    const e = (PROMIGAS_DATA.puntosEntrega || []).find(p => p.nombre.toLowerCase().trim() === nombre.toLowerCase().trim());
    if (e) return e;
    return { nombre: nombre, codigo: '' };
  }

  function lookupOrg(nombreOrCode) {
    if (!nombreOrCode) return { nombre: '', codigo: '' };
    const term = nombreOrCode.toLowerCase().trim();
    const list = PROMIGAS_DATA.organizaciones || PROMIGAS_DATA.remitentes || [];
    const found = list.find(o => o.nombre.toLowerCase().trim() === term || o.codigo.toLowerCase().trim() === term);
    if (found) return found;
    return { nombre: nombreOrCode, codigo: nombreOrCode };
  }

  function lookupDeliveryPoint(nombre) {
    if (!PROMIGAS_DATA.puntosEntrega) return { nombre: nombre, codigo: '' };
    const term = nombre.toLowerCase().trim();
    const found = PROMIGAS_DATA.puntosEntrega.find(p => p.nombre.toLowerCase().trim() === term);
    if (found) return found;
    return { nombre: nombre, codigo: '' };
  }

  function initNomState() {
    // Start empty by default as requested
    nomState.gasRows = [];
    nomState.transHourly = new Array(24).fill(0);
  }

  function renderGasTable() {
    const tbody = document.getElementById('nom-gas-table-body');
    if (!tbody) return;

    tbody.innerHTML = '';
    const puntos = PROMIGAS_DATA.puntosSuministro || [];
    const orgs = PROMIGAS_DATA.organizaciones || [];

    if (nomState.gasRows.length === 0) {
      tbody.innerHTML = '<tr><td colspan="9" style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted); font-size: 0.9rem;">' +
        'La tabla de nominación está vacía.<br>' +
        'Haz clic en <strong>Plantilla</strong> para cargar las 15 rutas habituales de GEAM o en <strong>Agregar Línea</strong> para comenzar.' +
        '</td></tr>';
      return;
    }

    nomState.gasRows.forEach((row, idx) => {
      const tr = document.createElement('tr');
      tr.className = row.tipo === 'Compra' ? 'row-compra' : 'row-venta';
      const isValid = (row.tipo === 'Compra' && row.compradorCod === 'GEAM') ||
                      (row.tipo === 'Venta' && row.vendedorCod === 'GEAM');

      tr.innerHTML = `
        <td style="font-weight: 700; color: var(--text-muted);">${idx + 1}</td>
        <td>
          <select class="nom-input-select sel-tipo" data-id="${row.id}">
            <option value="Compra" ${row.tipo === 'Compra' ? 'selected' : ''}>Compra</option>
            <option value="Venta" ${row.tipo === 'Venta' ? 'selected' : ''}>Venta</option>
          </select>
        </td>
        <td>
          <select class="nom-input-select sel-punto" data-id="${row.id}">
            ${puntos.map(p => `<option value="${p.nombre}" ${p.nombre === row.punto ? 'selected' : ''}>${p.nombre} (${p.codigo})</option>`).join('')}
          </select>
        </td>
        <td>
          <select class="nom-input-select sel-comprador" data-id="${row.id}">
            ${orgs.map(o => `<option value="${o.nombre}" ${o.nombre === row.comprador ? 'selected' : ''}>${o.nombre} [${o.codigo}]</option>`).join('')}
          </select>
        </td>
        <td>
          <select class="nom-input-select sel-vendedor" data-id="${row.id}">
            ${orgs.map(o => `<option value="${o.nombre}" ${o.nombre === row.vendedor ? 'selected' : ''}>${o.nombre} [${o.codigo}]</option>`).join('')}
          </select>
        </td>
        <td style="text-align: right;">
          <input type="number" class="nom-input-number inp-cantidad" data-id="${row.id}" value="${row.cantidad}" min="0" step="1" style="text-align: right; font-weight: 700;">
        </td>
        <td style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; text-align: center;">
          MBTU
        </td>
        <td style="text-align: center;">
          ${isValid 
            ? '<span style="color: var(--primary); font-weight: 700; font-size: 0.8rem;" title="Operación GEAM Conforme">OK ✓</span>' 
            : '<span style="color: var(--danger); font-weight: 700; font-size: 0.75rem;" title="Advertencia: En Compras GEAM debe ser el Comprador; en Ventas GEAM debe ser el Vendedor">ERROR ⚠</span>'}
        </td>
        <td style="text-align: center;">
          <button type="button" class="btn-del-row" data-id="${row.id}" title="Eliminar transacción">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </td>
      `;

      // Event Listeners for inputs
      const selTipo = tr.querySelector('.sel-tipo');
      selTipo.addEventListener('change', (e) => {
        row.tipo = e.target.value;
        tr.className = row.tipo === 'Compra' ? 'row-compra' : 'row-venta';
        if (row.tipo === 'Compra' && row.compradorCod !== 'GEAM') {
          const geam = lookupOrg('GEAM');
          row.comprador = geam.nombre;
          row.compradorCod = geam.codigo;
        } else if (row.tipo === 'Venta' && row.vendedorCod !== 'GEAM') {
          const geam = lookupOrg('GEAM');
          row.vendedor = geam.nombre;
          row.vendedorCod = geam.codigo;
        }
        renderGasTable();
        updateGasMetrics();
        renderGasPreview();
      });

      const selPunto = tr.querySelector('.sel-punto');
      selPunto.addEventListener('change', (e) => {
        const pt = lookupSupplyPoint(e.target.value);
        row.punto = pt.nombre;
        row.puntoCod = pt.codigo;
        renderGasPreview();
      });

      const selComprador = tr.querySelector('.sel-comprador');
      selComprador.addEventListener('change', (e) => {
        const o = lookupOrg(e.target.value);
        row.comprador = o.nombre;
        row.compradorCod = o.codigo;
        renderGasTable();
        updateGasMetrics();
        renderGasPreview();
      });

      const selVendedor = tr.querySelector('.sel-vendedor');
      selVendedor.addEventListener('change', (e) => {
        const o = lookupOrg(e.target.value);
        row.vendedor = o.nombre;
        row.vendedorCod = o.codigo;
        renderGasTable();
        updateGasMetrics();
        renderGasPreview();
      });

      const inpCantidad = tr.querySelector('.inp-cantidad');
      inpCantidad.addEventListener('input', (e) => {
        row.cantidad = parseFloat(e.target.value) || 0;
        updateGasMetrics();
        renderGasPreview();
      });

      const btnDel = tr.querySelector('.btn-del-row');
      btnDel.addEventListener('click', () => {
        nomState.gasRows = nomState.gasRows.filter(r => r.id !== row.id);
        renderGasTable();
        updateGasMetrics();
        renderGasPreview();
        showToast('Transacción eliminada');
      });

      tbody.appendChild(tr);
    });
  }

  function updateGasMetrics() {
    const days = getDaysInMonth(nomState.gasAno, nomState.gasMes);
    const activeLines = nomState.gasRows.length;
    const totalRows = activeLines * days;

    let totalPurchases = 0;
    let totalSales = 0;

    nomState.gasRows.forEach(r => {
      const q = parseFloat(r.cantidad) || 0;
      if (r.tipo === 'Compra') {
        totalPurchases += q;
      } else if (r.tipo === 'Venta') {
        totalSales += q;
      }
    });

    const balance = totalPurchases - totalSales;

    const elDiasBadge = document.getElementById('gas-dias-mes-badge');
    if (elDiasBadge) elDiasBadge.textContent = `${days} Días`;

    const elPeriodSummary = document.getElementById('gas-period-summary');
    if (elPeriodSummary) {
      elPeriodSummary.textContent = `${formatDDMMYYYY(1, nomState.gasMes, nomState.gasAno)} al ${formatDDMMYYYY(days, nomState.gasMes, nomState.gasAno)}`;
    }

    const elActiveLines = document.getElementById('metric-gas-active-lines');
    if (elActiveLines) elActiveLines.textContent = activeLines;

    const elTotalRows = document.getElementById('metric-gas-total-rows');
    if (elTotalRows) elTotalRows.textContent = totalRows.toLocaleString('es-CO');

    const elPurchases = document.getElementById('metric-gas-total-purchases');
    if (elPurchases) elPurchases.textContent = totalPurchases.toLocaleString('es-CO');

    const elSales = document.getElementById('metric-gas-total-sales');
    if (elSales) elSales.textContent = totalSales.toLocaleString('es-CO');

    const elBalance = document.getElementById('metric-gas-balance');
    if (elBalance) elBalance.textContent = (balance > 0 ? '+' : '') + balance.toLocaleString('es-CO');

    const elBalanceBadge = document.getElementById('metric-gas-balance-badge');
    if (elBalanceBadge) {
      if (balance === 0) {
        elBalanceBadge.className = 'nom-metric-badge success';
        elBalanceBadge.textContent = 'Equilibrado ✓';
      } else if (balance > 0) {
        elBalanceBadge.className = 'nom-metric-badge warning';
        elBalanceBadge.textContent = `Superávit (+${balance.toLocaleString('es-CO')})`;
      } else {
        elBalanceBadge.className = 'nom-metric-badge warning';
        elBalanceBadge.textContent = `Déficit (${balance.toLocaleString('es-CO')})`;
      }
    }
  }

  function generateNomCompleteRows() {
    const days = getDaysInMonth(nomState.gasAno, nomState.gasMes);
    const rows = [];

    nomState.gasRows.forEach(line => {
      const transCode = line.tipo === 'Compra' ? 'TRNTP_PURCH' : 'TRNTP_SELL';
      const ptCode = line.puntoCod || lookupSupplyPoint(line.punto).codigo;
      const vendCode = line.vendedorCod || lookupOrg(line.vendedor).codigo;
      const compCode = line.compradorCod || lookupOrg(line.comprador).codigo;

      for (let d = 1; d <= days; d++) {
        const dateStr = formatDDMMYYYY(d, nomState.gasMes, nomState.gasAno);
        rows.push({
          entry: 'ENTRY',
          supplyPointCode: ptCode,
          supplyPoint: line.punto,
          startDate: dateStr,
          endDate: dateStr,
          typeCode: transCode,
          type: line.tipo,
          sellerCode: vendCode,
          sellerName: line.vendedor,
          buyerCode: compCode,
          buyerName: line.comprador,
          quantity: line.cantidad,
          unit: 'mbtu'
        });
      }
    });

    return rows;
  }

  function renderGasPreview() {
    const tbody = document.getElementById('nom-gas-preview-body');
    const counter = document.getElementById('nom-gas-rows-counter');
    if (!tbody) return;

    const allRows = generateNomCompleteRows();
    const query = (nomState.gasPreviewSearch || '').toLowerCase().trim();

    const filtered = allRows.filter(r => {
      if (!query) return true;
      return r.supplyPoint.toLowerCase().includes(query) ||
             r.sellerName.toLowerCase().includes(query) ||
             r.buyerName.toLowerCase().includes(query) ||
             r.startDate.includes(query) ||
             r.type.toLowerCase().includes(query);
    });

    if (counter) {
      counter.textContent = query 
        ? `Mostrando ${filtered.length} de ${allRows.length} filas generadas (filtrado)`
        : `Mostrando ${allRows.length} filas generadas (${nomState.gasRows.length} líneas × ${getDaysInMonth(nomState.gasAno, nomState.gasMes)} días)`;
    }

    tbody.innerHTML = '';
    if (filtered.length === 0) {
      tbody.innerHTML = '<tr><td colspan="14" style="text-align: center; padding: 2rem; color: var(--text-muted);">No hay filas que coincidan con el filtro.</td></tr>';
      return;
    }

    // Limit preview rendering for performance (first 100 rows)
    const limit = 100;
    const toRender = filtered.slice(0, limit);

    toRender.forEach((r, idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-weight: 700; color: var(--text-muted);">${idx + 1}</td>
        <td><code>${r.entry}</code></td>
        <td><span class="cell-code">${r.supplyPointCode}</span></td>
        <td style="font-weight: 600;">${r.supplyPoint}</td>
        <td>${r.startDate}</td>
        <td>${r.endDate}</td>
        <td><code>${r.typeCode}</code></td>
        <td><span class="${r.type === 'Compra' ? 'badge-tipo-compra' : 'badge-tipo-venta'}">${r.type}</span></td>
        <td><span class="cell-code">${r.sellerCode}</span></td>
        <td style="max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${r.sellerName}">${r.sellerName}</td>
        <td><span class="cell-code">${r.buyerCode}</span></td>
        <td style="max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${r.buyerName}">${r.buyerName}</td>
        <td style="text-align: right; font-weight: 700; font-family: var(--font-mono);">${r.quantity.toLocaleString('es-CO')}</td>
        <td style="color: var(--text-muted);">${r.unit}</td>
      `;
      tbody.appendChild(tr);
    });

    if (filtered.length > limit) {
      const trMore = document.createElement('tr');
      trMore.innerHTML = `<td colspan="14" style="text-align: center; padding: 0.75rem; background: var(--bg-subtle); color: var(--text-muted); font-size: 0.8rem;">
        ... y ${filtered.length - limit} filas adicionales generadas. El archivo descargado incluirá las ${filtered.length} filas completas.
      </td>`;
      tbody.appendChild(trMore);
    }
  }

  function exportGasCsv() {
    const rows = generateNomCompleteRows();
    if (rows.length === 0) {
      alert('No hay filas para exportar. Agrega al menos una transacción.');
      return;
    }

    const header = 'ENTRY;Supply point code;Supply point;Start Date;End Date;Type of transaction code;Type of transaction;Seller code;Seller Name;Buyer code;Buyer name;Quantity;Unit\r\n';
    
    const lines = rows.map(r => 
      `${r.entry};${r.supplyPointCode};${r.supplyPoint};${r.startDate};${r.endDate};${r.typeCode};${r.type};${r.sellerCode};${r.sellerName};${r.buyerCode};${r.buyerName};${r.quantity};${r.unit}`
    ).join('\r\n') + '\r\n';

    const fullContent = header + lines;
    const blob = createUtf16LeBlob(fullContent);
    const filename = `NOM_CGAPR_COMP.csv`;
    downloadBlob(blob, filename);
    showToast(`¡Plano de gas exportado: ${filename} (${rows.length} registros)!`);
  }

  /* ==========================================================================
     TRANSPORT NOMINATIONS MODULE
     ========================================================================== */

  function calcHourlyDistribution(Q) {
    const base = Math.floor(Q / 24);
    const rem = Q - base * 24;
    const hours = new Array(24);
    let sum1to23 = 0;

    for (let h = 1; h <= 23; h++) {
      const row = h + 5;
      const k = row - 2 + 1; // row - 1
      const val = (k <= rem) ? (base + 1) : base;
      hours[h] = val;
      sum1to23 += val;
    }

    hours[0] = Q - sum1to23;
    return hours;
  }

  function updateTransportHourlyMetrics() {
    if (!nomState.transHourly || nomState.transHourly.length !== 24) {
      nomState.transHourly = calcHourlyDistribution(nomState.transCantidad);
    }
    const sum = nomState.transHourly.reduce((a, b) => a + b, 0);
    const targetQ = parseFloat(nomState.transCantidad) || 0;
    const totalSpan = document.getElementById('trans-hourly-total');
    const checkBadge = document.getElementById('trans-hourly-check');

    if (totalSpan) totalSpan.textContent = `${sum.toLocaleString('es-CO')} MBTU`;
    if (checkBadge) {
      if (sum === targetQ) {
        checkBadge.textContent = `Suma 24h = ${sum.toLocaleString('es-CO')} MBTU (Coincide con Cantidad Diaria) ✓`;
        checkBadge.className = 'badge-promigas badge-tag';
      } else {
        checkBadge.textContent = `Suma 24h: ${sum.toLocaleString('es-CO')} MBTU (Difiere de Cantidad: ${targetQ.toLocaleString('es-CO')})`;
        checkBadge.className = 'nom-metric-badge warning';
      }
    }
  }

  function renderHourlyGrid() {
    const grid = document.getElementById('trans-hourly-grid');
    if (!grid) return;

    if (!nomState.transHourly || nomState.transHourly.length !== 24) {
      nomState.transHourly = calcHourlyDistribution(nomState.transCantidad);
    }

    updateTransportHourlyMetrics();

    grid.innerHTML = '';
    nomState.transHourly.forEach((val, h) => {
      const cell = document.createElement('div');
      cell.className = `hourly-cell ${h === 0 ? 'special' : ''}`;
      cell.innerHTML = `
        <div class="hourly-cell-title">H${h} ${h === 0 ? '(Adj)' : ''}</div>
        <input type="number" class="hourly-input" data-hour="${h}" value="${val}" min="0" step="1">
      `;

      const inp = cell.querySelector('.hourly-input');
      inp.addEventListener('input', (e) => {
        const v = parseFloat(e.target.value) || 0;
        nomState.transHourly[h] = v;
        updateTransportHourlyMetrics();
        renderTransportPreview();
      });

      grid.appendChild(cell);
    });
  }

  function generateTransportRows() {
    if (!nomState.transContrato || !nomState.transRecibo || !nomState.transEntrega || !nomState.transCantidad) {
      return [];
    }
    const days = getDaysInMonth(nomState.transAno, nomState.transMes);
    const Q = parseFloat(nomState.transCantidad) || 0;
    const hourly = (nomState.transHourly && nomState.transHourly.length === 24) 
      ? nomState.transHourly 
      : calcHourlyDistribution(Q);

    const ptRecibo = lookupSupplyPoint(nomState.transRecibo);
    const ptEntrega = lookupDeliveryPoint(nomState.transEntrega);

    const marketObj = (PROMIGAS_DATA.mercados || []).find(m => m.codigo === nomState.transMercado) || { codigo: 'MKTTP_NOREG', nombre: 'No Regulado' };
    const sectorObj = (PROMIGAS_DATA.sectores || []).find(s => s.codigo === nomState.transSector) || { codigo: 'SECTP_INDUST', nombre: 'Industrial' };

    const rows = [];
    for (let d = 1; d <= days; d++) {
      const dateStr = formatDDMMYYYY(d, nomState.transMes, nomState.transAno);
      for (let h = 0; h < 24; h++) {
        rows.push({
          entry: 'ENTRY',
          startDate: dateStr,
          endDate: dateStr,
          contract: nomState.transContrato,
          receiptCode: ptRecibo.codigo,
          receiptPoint: nomState.transRecibo,
          deliveryCode: ptEntrega.codigo,
          deliveryPoint: nomState.transEntrega,
          hour: h,
          quantity: hourly[h],
          unit: 'mbtu',
          marketCode: marketObj.codigo,
          market: marketObj.nombre,
          sectorCode: sectorObj.codigo,
          sector: sectorObj.nombre,
          replacingShipper: nomState.transReplacing || '',
          providerResponsible: nomState.transProvider || ''
        });
      }
    }

    return rows;
  }

  function renderTransportPreview() {
    const tbody = document.getElementById('nom-trans-preview-body');
    const counter = document.getElementById('nom-trans-rows-counter');
    if (!tbody) return;

    const allRows = generateTransportRows();
    const query = (nomState.transPreviewSearch || '').toLowerCase().trim();

    const filtered = allRows.filter(r => {
      if (!query) return true;
      return r.startDate.includes(query) ||
             String(r.hour).includes(query) ||
             r.contract.toLowerCase().includes(query) ||
             r.receiptPoint.toLowerCase().includes(query) ||
             r.deliveryPoint.toLowerCase().includes(query);
    });

    if (counter) {
      counter.textContent = query 
        ? `Mostrando ${filtered.length} de ${allRows.length} filas generadas (filtrado)`
        : `${allRows.length} filas generadas (${getDaysInMonth(nomState.transAno, nomState.transMes)} días × 24 horas)`;
    }

    tbody.innerHTML = '';
    if (allRows.length === 0) {
      tbody.innerHTML = '<tr><td colspan="18" style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted); font-size: 0.9rem;">No hay parámetros de transporte cargados.<br>Diligencia los campos o haz clic en <strong>Cargar Caso Ballena</strong> para generar el plano.</td></tr>';
      return;
    }

    if (filtered.length === 0) {
      tbody.innerHTML = '<tr><td colspan="18" style="text-align: center; padding: 2rem; color: var(--text-muted);">No hay filas que coincidan con el filtro.</td></tr>';
      return;
    }

    const limit = 100;
    const toRender = filtered.slice(0, limit);

    toRender.forEach((r, idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-weight: 700; color: var(--text-muted);">${idx + 1}</td>
        <td><code>${r.entry}</code></td>
        <td>${r.startDate}</td>
        <td>${r.endDate}</td>
        <td><span class="cell-code">${r.contract}</span></td>
        <td><span class="cell-code">${r.receiptCode}</span></td>
        <td style="font-weight: 600;">${r.receiptPoint}</td>
        <td><span class="cell-code">${r.deliveryCode}</span></td>
        <td style="font-weight: 600;">${r.deliveryPoint}</td>
        <td style="text-align: center; font-weight: 700; font-family: var(--font-mono);">${r.hour}</td>
        <td style="text-align: right; font-weight: 700; font-family: var(--font-mono);">${r.quantity}</td>
        <td style="color: var(--text-muted);">${r.unit}</td>
        <td><code>${r.marketCode}</code></td>
        <td>${r.market}</td>
        <td><code>${r.sectorCode}</code></td>
        <td>${r.sector}</td>
        <td>${r.replacingShipper || '-'}</td>
        <td>${r.providerResponsible || '-'}</td>
      `;
      tbody.appendChild(tr);
    });

    if (filtered.length > limit) {
      const trMore = document.createElement('tr');
      trMore.innerHTML = `<td colspan="18" style="text-align: center; padding: 0.75rem; background: var(--bg-subtle); color: var(--text-muted); font-size: 0.8rem;">
        ... y ${filtered.length - limit} filas adicionales generadas. El archivo exportado incluirá las ${filtered.length} filas completas.
      </td>`;
      tbody.appendChild(trMore);
    }
  }

  function exportTransportCsv() {
    const rows = generateTransportRows();
    if (rows.length === 0) {
      alert('No hay registros para exportar.');
      return;
    }

    const header = 'ENTRY;Start Date;End Date;Contract;Receipt Point Code;Receipt Point;Delivery Point Code;Delivery Point;Hour;Quantity;Unit;Market Code;Market;Sector Code;Sector;Replacing Shipper;Provider Responsible?\r\n';

    const lines = rows.map(r => 
      `${r.entry};${r.startDate};${r.endDate};${r.contract};${r.receiptCode};${r.receiptPoint};${r.deliveryCode};${r.deliveryPoint};${r.hour};${r.quantity};${r.unit};${r.marketCode};${r.market};${r.sectorCode};${r.sector};${r.replacingShipper};${r.providerResponsible}`
    ).join('\r\n') + '\r\n';

    const fullContent = header + lines;
    const blob = createUtf16LeBlob(fullContent);
    const filename = `CGA_PR_TRANSP.csv`;
    downloadBlob(blob, filename);
    showToast(`¡Plano de transporte exportado: ${filename} (${rows.length} registros)!`);
  }

  function setupNominacionesModule() {
    initNomState();

    // Subtab switching (Gas vs Transporte)
    const btnSubGas = document.getElementById('btn-subtab-gas');
    const btnSubTrans = document.getElementById('btn-subtab-transporte');
    const paneGas = document.getElementById('nom-subpane-gas');
    const paneTrans = document.getElementById('nom-subpane-transporte');

    if (btnSubGas && btnSubTrans && paneGas && paneTrans) {
      btnSubGas.addEventListener('click', () => {
        btnSubGas.classList.add('active');
        btnSubTrans.classList.remove('active');
        paneGas.classList.add('active');
        paneTrans.classList.remove('active');
        paneGas.style.display = 'block';
        paneTrans.style.display = 'none';
        nomState.subtab = 'nom-subpane-gas';
      });

      btnSubTrans.addEventListener('click', () => {
        btnSubTrans.classList.add('active');
        btnSubGas.classList.remove('active');
        paneTrans.classList.add('active');
        paneGas.classList.remove('active');
        paneTrans.style.display = 'block';
        paneGas.style.display = 'none';
        nomState.subtab = 'nom-subpane-transporte';
        renderHourlyGrid();
        renderTransportPreview();
      });
    }

    // Gas Month & Year
    const selGasMes = document.getElementById('nom-gas-mes');
    const inpGasAno = document.getElementById('nom-gas-ano');

    if (selGasMes) {
      selGasMes.value = nomState.gasMes;
      selGasMes.addEventListener('change', (e) => {
        nomState.gasMes = parseInt(e.target.value, 10);
        updateGasMetrics();
        renderGasPreview();
      });
    }

    if (inpGasAno) {
      inpGasAno.value = nomState.gasAno;
      inpGasAno.addEventListener('input', (e) => {
        nomState.gasAno = parseInt(e.target.value, 10) || 2026;
        updateGasMetrics();
        renderGasPreview();
      });
    }

    // Load Gas Preset Button
    const btnLoadPreset = document.getElementById('btn-load-gas-preset');
    if (btnLoadPreset) {
      btnLoadPreset.addEventListener('click', () => {
        if (PROMIGAS_DATA.plantillaNominaciones && PROMIGAS_DATA.plantillaNominaciones.length > 0) {
          nomState.gasRows = PROMIGAS_DATA.plantillaNominaciones.map((row, idx) => ({
            id: Date.now() + idx,
            tipo: row.tipo,
            punto: row.punto,
            puntoCod: row.puntoCod,
            comprador: row.comprador,
            compradorCod: row.compradorCod,
            vendedor: row.vendedor,
            vendedorCod: row.vendedorCod,
            cantidad: row.cantidad,
            unidad: row.unidad || 'MBTU'
          }));
        }
        renderGasTable();
        updateGasMetrics();
        renderGasPreview();
        showToast('¡Plantilla GEAM (15 Rutas) cargada!');
      });
    }

    // Add Gas Line Button
    const btnAddGasRow = document.getElementById('btn-add-gas-row');
    if (btnAddGasRow) {
      btnAddGasRow.addEventListener('click', () => {
        const firstPunto = (PROMIGAS_DATA.puntosSuministro && PROMIGAS_DATA.puntosSuministro[0]) || { nombre: 'BALLENA', codigo: '19' };
        const geam = lookupOrg('GEAM');
        const defaultSeller = lookupOrg('HOCOL');

        const newRow = {
          id: Date.now() + Math.random(),
          tipo: 'Compra',
          punto: firstPunto.nombre,
          puntoCod: firstPunto.codigo,
          comprador: geam.nombre,
          compradorCod: geam.codigo,
          vendedor: defaultSeller.nombre,
          vendedorCod: defaultSeller.codigo,
          cantidad: 1000,
          unidad: 'MBTU'
        };

        nomState.gasRows.push(newRow);
        renderGasTable();
        updateGasMetrics();
        renderGasPreview();
        showToast('Nueva línea agregada a la tabla');
      });
    }

    // Clear Gas Table Button
    const btnClearGas = document.getElementById('btn-clear-gas-rows');
    if (btnClearGas) {
      btnClearGas.addEventListener('click', () => {
        if (confirm('¿Deseas vaciar la tabla de nominaciones de gas?')) {
          nomState.gasRows = [];
          renderGasTable();
          updateGasMetrics();
          renderGasPreview();
          showToast('Tabla vaciada');
        }
      });
    }

    // Gas Preview Filter
    const filterGasPreview = document.getElementById('filter-nom-gas-preview');
    if (filterGasPreview) {
      filterGasPreview.addEventListener('input', (e) => {
        nomState.gasPreviewSearch = e.target.value;
        renderGasPreview();
      });
    }

    // Gas Export Button
    const btnExportGas = document.getElementById('btn-export-nom-gas-csv');
    if (btnExportGas) {
      btnExportGas.addEventListener('click', exportGasCsv);
    }

    // Populate Transport Points & Sectors
    const selTransRecibo = document.getElementById('nom-trans-recibo');
    const selTransEntrega = document.getElementById('nom-trans-entrega');
    const selTransSector = document.getElementById('nom-trans-sector');
    const badgeRecibo = document.getElementById('trans-recibo-badge');
    const badgeEntrega = document.getElementById('trans-entrega-badge');

    if (selTransRecibo) {
      const recibos = PROMIGAS_DATA.puntosRecibo || [];
      selTransRecibo.innerHTML = '<option value="">-- Seleccionar Punto de Recibo --</option>' + 
        recibos.map(p => `<option value="${p.nombre}" ${p.nombre === nomState.transRecibo ? 'selected' : ''}>${p.nombre} (${p.codigo})</option>`).join('');

      selTransRecibo.addEventListener('change', (e) => {
        nomState.transRecibo = e.target.value;
        const pt = lookupSupplyPoint(nomState.transRecibo);
        if (badgeRecibo) badgeRecibo.textContent = `Cód: ${pt.codigo}`;
        renderTransportPreview();
      });
    }

    if (selTransEntrega) {
      const entregas = PROMIGAS_DATA.puntosEntrega || [];
      selTransEntrega.innerHTML = '<option value="">-- Seleccionar Punto de Entrega --</option>' + 
        entregas.map(p => `<option value="${p.nombre}" ${p.nombre === nomState.transEntrega ? 'selected' : ''}>${p.nombre} (${p.codigo})</option>`).join('');

      selTransEntrega.addEventListener('change', (e) => {
        nomState.transEntrega = e.target.value;
        const pt = lookupDeliveryPoint(nomState.transEntrega);
        if (badgeEntrega) badgeEntrega.textContent = `Cód: ${pt.codigo}`;
        renderTransportPreview();
      });
    }

    if (selTransSector) {
      const sectores = PROMIGAS_DATA.sectores || [];
      selTransSector.innerHTML = sectores.map(s => 
        `<option value="${s.codigo}" ${s.codigo === nomState.transSector ? 'selected' : ''}>${s.nombre} (${s.codigo})</option>`
      ).join('');

      selTransSector.addEventListener('change', (e) => {
        nomState.transSector = e.target.value;
        renderTransportPreview();
      });
    }

    // Transport Inputs
    const selTransMes = document.getElementById('nom-trans-mes');
    const inpTransAno = document.getElementById('nom-trans-ano');
    const inpTransContrato = document.getElementById('nom-trans-contrato');
    const inpTransCantidad = document.getElementById('nom-trans-cantidad');
    const selTransMercado = document.getElementById('nom-trans-mercado');
    const inpTransReplacing = document.getElementById('nom-trans-replacing');
    const inpTransProvider = document.getElementById('nom-trans-provider');

    if (selTransMes) {
      selTransMes.value = nomState.transMes;
      selTransMes.addEventListener('change', (e) => {
        nomState.transMes = parseInt(e.target.value, 10);
        renderTransportPreview();
      });
    }

    if (inpTransAno) {
      inpTransAno.value = nomState.transAno;
      inpTransAno.addEventListener('input', (e) => {
        nomState.transAno = parseInt(e.target.value, 10) || 2026;
        renderTransportPreview();
      });
    }

    if (badgeRecibo) badgeRecibo.textContent = 'Cód: -';
    if (badgeEntrega) badgeEntrega.textContent = 'Cód: -';

    if (inpTransContrato) {
      inpTransContrato.value = '';
      inpTransContrato.addEventListener('input', (e) => {
        nomState.transContrato = e.target.value;
        renderTransportPreview();
      });
    }

    if (inpTransCantidad) {
      inpTransCantidad.value = '';
      inpTransCantidad.addEventListener('input', (e) => {
        nomState.transCantidad = parseFloat(e.target.value) || 0;
        nomState.transHourly = calcHourlyDistribution(nomState.transCantidad);
        renderHourlyGrid();
        renderTransportPreview();
      });
    }

    const btnRebalance = document.getElementById('btn-rebalance-trans-hours');
    if (btnRebalance) {
      btnRebalance.addEventListener('click', () => {
        nomState.transHourly = calcHourlyDistribution(nomState.transCantidad);
        renderHourlyGrid();
        renderTransportPreview();
        showToast(`Distribución horaria recalculada para ${nomState.transCantidad} MBTU`);
      });
    }

    if (selTransMercado) {
      selTransMercado.value = nomState.transMercado;
      selTransMercado.addEventListener('change', (e) => {
        nomState.transMercado = e.target.value;
        renderTransportPreview();
      });
    }

    if (inpTransReplacing) {
      inpTransReplacing.addEventListener('input', (e) => {
        nomState.transReplacing = e.target.value;
        renderTransportPreview();
      });
    }

    if (inpTransProvider) {
      inpTransProvider.addEventListener('input', (e) => {
        nomState.transProvider = e.target.value;
        renderTransportPreview();
      });
    }

    // Transport Load Preset Button
    const btnLoadTransPreset = document.getElementById('btn-load-trans-preset');
    if (btnLoadTransPreset) {
      btnLoadTransPreset.addEventListener('click', () => {
        nomState.transMes = 7;
        nomState.transAno = 2026;
        nomState.transContrato = 'P-GEAM-CI-2026-005';
        nomState.transRecibo = 'BALLENA';
        nomState.transEntrega = 'TERMONORTE';
        nomState.transCantidad = 1000;
        nomState.transMercado = 'MKTTP_NOREG';
        nomState.transSector = 'SECTP_INDUST';
        nomState.transReplacing = '';
        nomState.transProvider = '';
        nomState.transHourly = calcHourlyDistribution(1000);

        if (selTransMes) selTransMes.value = 7;
        if (inpTransAno) inpTransAno.value = 2026;
        if (inpTransContrato) inpTransContrato.value = 'P-GEAM-CI-2026-005';
        if (selTransRecibo) selTransRecibo.value = 'BALLENA';
        if (selTransEntrega) selTransEntrega.value = 'TERMONORTE';
        if (inpTransCantidad) inpTransCantidad.value = 1000;
        if (selTransMercado) selTransMercado.value = 'MKTTP_NOREG';
        if (selTransSector) selTransSector.value = 'SECTP_INDUST';
        if (inpTransReplacing) inpTransReplacing.value = '';
        if (inpTransProvider) inpTransProvider.value = '';

        const ptR = lookupSupplyPoint('BALLENA');
        const ptE = lookupDeliveryPoint('TERMONORTE');
        if (badgeRecibo) badgeRecibo.textContent = `Cód: ${ptR.codigo}`;
        if (badgeEntrega) badgeEntrega.textContent = `Cód: ${ptE.codigo}`;

        renderHourlyGrid();
        renderTransportPreview();
        showToast('Caso base de transporte (BALLENA -> TERMONORTE 1,000 MBTU) cargado');
      });
    }

    // Transport Preview Search
    const filterTransPreview = document.getElementById('filter-nom-trans-preview');
    if (filterTransPreview) {
      filterTransPreview.addEventListener('input', (e) => {
        nomState.transPreviewSearch = e.target.value;
        renderTransportPreview();
      });
    }

    // Transport Export CSV
    const btnExportTrans = document.getElementById('btn-export-nom-trans-csv');
    if (btnExportTrans) {
      btnExportTrans.addEventListener('click', exportTransportCsv);
    }

    // Initial render for Gas and Transport
    renderGasTable();
    updateGasMetrics();
    renderGasPreview();
    renderHourlyGrid();
    renderTransportPreview();
  }

  function init() {
    populateRemitentes();
    selectInitialTramos();
    renderTramos();
    setupEventListeners();
    updatePeriodsPreview();
    regeneratePreview();
    renderCatalogTable();
    setupNominacionesModule();
  }

  /**
   * Populate Remitentes dropdown with GEAM as primary default
   */
  function populateRemitentes() {
    el.selectRemitente.innerHTML = '';
    
    // Sort remitentes: GEAM first, then alphabetically
    const sorted = [...PROMIGAS_DATA.remitentes].sort((a, b) => {
      if (a.codigo === 'GEAM') return -1;
      if (b.codigo === 'GEAM') return 1;
      return a.nombre.localeCompare(b.nombre);
    });

    sorted.forEach(rem => {
      const opt = document.createElement('option');
      opt.value = rem.codigo;
      opt.textContent = `${rem.codigo} - ${rem.nombre}`;
      if (rem.codigo === 'GEAM') {
        opt.selected = true;
      }
      el.selectRemitente.appendChild(opt);
    });

    state.remitente = 'GEAM';
    el.remitenteBadge.textContent = 'Código: GEAM';
  }

  /**
   * Initialize selected tramos based on current gasoducto (Promigas by default)
   */
  function selectInitialTramos() {
    state.selectedTramos.clear();
    const tramos = getFilteredTramos();
    tramos.forEach(t => state.selectedTramos.add(t.codigo));
  }

  /**
   * Get Tramos filtered by Gasoducto and Search Text
   */
  function getFilteredTramos() {
    return PROMIGAS_DATA.tramos.filter(tramo => {
      // Gasoducto filter
      const matchesGasoducto = (state.gasoducto === 'Todos') || (tramo.gasoducto === state.gasoducto);
      if (!matchesGasoducto) return false;

      // Text search filter
      if (state.tramoSearchText.trim()) {
        const query = state.tramoSearchText.toLowerCase();
        return tramo.nombre.toLowerCase().includes(query) || tramo.codigo.toLowerCase().includes(query);
      }
      return true;
    });
  }

  /**
   * Render Tramos Grid Cards
   */
  function renderTramos() {
    const tramos = getFilteredTramos();
    el.tramosGrid.innerHTML = '';

    if (tramos.length === 0) {
      el.tramosGrid.innerHTML = `
        <div style="text-align: center; padding: 1.5rem; color: var(--text-muted); font-size: 0.85rem;">
          No se encontraron tramos para el gasoducto seleccionado.
        </div>`;
      updateTramosCounter(0, 0);
      return;
    }

    let selectedCount = 0;

    tramos.forEach(tramo => {
      const isSelected = state.selectedTramos.has(tramo.codigo);
      if (isSelected) selectedCount++;
      const currentCap = getTramoCapacity(tramo.codigo);
      const displayName = tramo.descripcion || tramo.nombre;
      const baseName = tramo.nombre || tramo.codigoBase || tramo.codigo;
      const isContra = (tramo.descripcion || '').includes('(Contraflujo)');

      const card = document.createElement('div');
      card.className = `tramo-card ${isSelected ? 'selected' : ''}`;
      card.dataset.codigo = tramo.codigo;

      card.innerHTML = `
        <div class="tramo-card-main">
          <input type="checkbox" class="tramo-checkbox" ${isSelected ? 'checked' : ''} data-codigo="${tramo.codigo}">
          <div class="tramo-details">
            <div class="tramo-header-row">
              <span class="tramo-name">${displayName}</span>
            </div>
            <div class="tramo-meta-row">
              <span class="tramo-flow-badge ${isContra ? 'contra' : 'directo'}">
                ${isContra ? 'Contraflujo' : 'Flujo Directo'}
              </span>
              <span class="tramo-base-label">Tramo: ${baseName}</span>
            </div>
            <div class="tramo-sub-row">
              <span class="tramo-gasoducto-badge">${tramo.gasoducto}</span>
              ${state.capacityMode === 'custom' ? `
                <div class="tramo-capacity-box">
                  <input type="number" class="tramo-kpcd-input" data-codigo="${tramo.codigo}" value="${currentCap}" min="0" step="any" title="Capacidad para esta ruta (KPCD)">
                  <span class="tramo-kpcd-unit">KPCD</span>
                </div>
              ` : `
                <span class="tramo-kpcd-badge">${state.capacidad} KPCD</span>
              `}
            </div>
          </div>
        </div>
      `;

      // Click card to toggle
      card.addEventListener('click', (e) => {
        if (e.target.tagName !== 'INPUT') {
          const cb = card.querySelector('.tramo-checkbox');
          cb.checked = !cb.checked;
          toggleTramoSelection(tramo.codigo, cb.checked);
        }
      });

      // Checkbox event
      const cb = card.querySelector('.tramo-checkbox');
      cb.addEventListener('change', (e) => {
        toggleTramoSelection(tramo.codigo, e.target.checked);
      });

      // Inline capacity input event
      const kpcdInput = card.querySelector('.tramo-kpcd-input');
      if (kpcdInput) {
        kpcdInput.addEventListener('input', (e) => {
          const val = parseFloat(e.target.value) || 0;
          setTramoCapacity(tramo.codigo, val);
          regeneratePreview();
        });
        kpcdInput.addEventListener('click', (e) => e.stopPropagation());
      }

      el.tramosGrid.appendChild(card);
    });

    updateTramosCounter(selectedCount, tramos.length);
  }

  function toggleTramoSelection(codigo, isSelected) {
    if (isSelected) {
      state.selectedTramos.add(codigo);
    } else {
      state.selectedTramos.delete(codigo);
    }
    renderTramos();
    regeneratePreview();
  }

  function updateTramosCounter(selected, total) {
    el.tramosCounter.textContent = `${selected} de ${total} seleccionados`;
  }

  /**
   * Split Date Range by Month (or Single Range if unchecked)
   */
  function splitDateRange(startDateStr, endDateStr, splitByMonth) {
    if (!startDateStr || !endDateStr) return [];

    const [sY, sM, sD] = startDateStr.split('-').map(Number);
    const [eY, eM, eD] = endDateStr.split('-').map(Number);

    const start = new Date(sY, sM - 1, sD);
    const end = new Date(eY, eM - 1, eD);

    if (start > end) return [];

    if (!splitByMonth) {
      return [{
        start: formatDateDDMMYYYY(start),
        end: formatDateDDMMYYYY(end)
      }];
    }

    const periods = [];
    let currentStart = new Date(start);

    while (currentStart <= end) {
      const y = currentStart.getFullYear();
      const m = currentStart.getMonth();
      // Last day of currentStart's month: day 0 of month + 1
      const lastDayOfMonth = new Date(y, m + 1, 0);
      const currentEnd = lastDayOfMonth < end ? lastDayOfMonth : new Date(end);

      periods.push({
        start: formatDateDDMMYYYY(currentStart),
        end: formatDateDDMMYYYY(currentEnd)
      });

      // First day of next month
      currentStart = new Date(y, m + 1, 1);
    }

    return periods;
  }

  function formatDateDDMMYYYY(d) {
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  /**
   * Update Dynamic Periods Preview
   */
  function updatePeriodsPreview() {
    const periods = splitDateRange(state.fechaInicio, state.fechaFin, state.dividirMes);
    el.periodsList.innerHTML = '';

    if (periods.length === 0) {
      el.periodsList.innerHTML = `<span style="color: var(--danger); font-size: 0.75rem;">Rango de fechas inválido (Inicio posterior a Fin)</span>`;
      return;
    }

    periods.forEach((p, idx) => {
      const pill = document.createElement('div');
      pill.className = 'period-pill';
      pill.innerHTML = `
        <span><strong>${p.start}</strong> al <strong>${p.end}</strong></span>
        <span class="period-tag">${state.dividirMes ? `Mes ${idx + 1}` : 'Único'}</span>
      `;
      el.periodsList.appendChild(pill);
    });
  }

  /**
   * Generate Output Rows Array
   */
  function generateOutputRows() {
    const periods = splitDateRange(state.fechaInicio, state.fechaFin, state.dividirMes);
    if (periods.length === 0) return [];

    // Remitente object
    const remitenteObj = PROMIGAS_DATA.remitentes.find(r => r.codigo === state.remitente) || {
      codigo: state.remitente,
      nombre: state.remitente
    };

    // Tipo Ruta (Oficial Promigas: Interruptible Transportation / Firm Transportation)
    const tipoRutaObj = PROMIGAS_DATA.tiposRuta.find(t => t.codigo === state.tipoRuta) || {
      codigo: state.tipoRuta,
      nombre: state.tipoRuta === 'TI' ? 'Interruptible Transportation' : 'Firm Transportation'
    };

    // Mercado
    const mercadoObj = PROMIGAS_DATA.mercados.find(m => m.codigo === state.mercado) || {
      codigo: state.mercado,
      nombre: 'No Regulado'
    };

    // Sector
    const sectorObj = PROMIGAS_DATA.sectores.find(s => s.codigo === state.sector) || {
      codigo: state.sector,
      nombre: 'Industrial'
    };

    // Selected Tramos
    const tramosList = PROMIGAS_DATA.tramos.filter(t => state.selectedTramos.has(t.codigo));

    const rows = [];

    periods.forEach(period => {
      tramosList.forEach(tramo => {
        const tramoCap = getTramoCapacity(tramo.codigo);
        let tramoCodeVal = tramo.codigo;
        let tramoNameVal = tramo.nombre;

        if (state.tramoCodeMode === 'both_flow') {
          tramoCodeVal = tramo.descripcion || tramo.codigo;
          tramoNameVal = tramo.descripcion || tramo.codigo;
        } else if (state.tramoCodeMode === 'both_base') {
          tramoCodeVal = tramo.codigoBase || tramo.nombre;
          tramoNameVal = tramo.codigoBase || tramo.nombre;
        } else if (state.tramoCodeMode === 'inverted') {
          tramoCodeVal = tramo.codigoBase || tramo.nombre;
          tramoNameVal = tramo.descripcion || tramo.codigo;
        } else {
          // 'official' (Por defecto - Oficial Promigas):
          // Segment Code (Columna 9) = Contraflujo (ej: Barranquilla - La Mami (Contraflujo))
          // Tramo (Columna 10) = Nombre base (ej: Barranquilla - La Mami)
          tramoCodeVal = tramo.codigo;
          tramoNameVal = tramo.nombre;
        }

        rows.push({
          entrtLbl: state.entrtLbl.trim() || 'ENTRY',
          fechaInicio: period.start,
          fechaFin: period.end,
          codigoRemitente: remitenteObj.codigo,
          nombreRemitente: remitenteObj.nombre,
          codigoTipoRuta: tipoRutaObj.codigo,
          nombreTipoRuta: tipoRutaObj.nombre,
          codigoModalidad: state.modalidad || '',
          codigoTramo: tramoCodeVal,
          nombreTramo: tramoNameVal,
          codigoMercado: mercadoObj.codigo,
          nombreMercado: mercadoObj.nombre,
          codigoSector: sectorObj.codigo,
          nombreSector: sectorObj.nombre,
          capacidad: tramoCap
        });
      });
    });

    return rows;
  }

  /**
   * Convert Rows to Raw CSV Text (Semicolon Delimited)
   */
  function buildCsvText(rows) {
    const lines = [];
    // Header
    lines.push(OFFICIAL_HEADER.join(';'));

    // Rows
    rows.forEach(r => {
      const line = [
        r.entrtLbl,
        r.fechaInicio,
        r.fechaFin,
        r.codigoRemitente,
        r.nombreRemitente,
        r.codigoTipoRuta,
        r.nombreTipoRuta,
        r.codigoModalidad,
        r.codigoTramo,
        r.nombreTramo,
        r.codigoMercado,
        r.nombreMercado,
        r.codigoSector,
        r.nombreSector,
        r.capacidad
      ].join(';');
      lines.push(line);
    });

    return lines.join('\r\n') + '\r\n';
  }

  /**
   * Regenerate Live Preview & Metrics
   */
  function regeneratePreview() {
    const rows = generateOutputRows();
    const periods = splitDateRange(state.fechaInicio, state.fechaFin, state.dividirMes);

    // Update Statistics
    el.statTotalRows.textContent = rows.length;
    el.statTotalTramos.textContent = state.selectedTramos.size;
    el.statTotalPeriods.textContent = periods.length;
    if (state.capacityMode === 'all') {
      el.statTotalCapacity.textContent = `${state.capacidad || 0} KPCD`;
    } else {
      let sum = 0;
      rows.forEach(r => sum += (r.capacidad || 0));
      el.statTotalCapacity.textContent = `Personalizada`;
    }

    // Render Table
    el.previewTableBody.innerHTML = '';

    if (rows.length === 0) {
      el.previewTableBody.innerHTML = `
        <tr>
          <td colspan="10" style="text-align: center; padding: 2rem; color: var(--text-muted);">
            No hay registros para generar. Selecciona al menos un tramo y un rango de fechas válido.
          </td>
        </tr>`;
    } else {
      rows.forEach((r, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td style="color: var(--text-muted); font-size: 0.72rem;">${idx + 1}</td>
          <td class="cell-date">${r.fechaInicio}</td>
          <td class="cell-date">${r.fechaFin}</td>
          <td><span class="cell-code">${r.codigoTramo}</span></td>
          <td><strong>${r.nombreTramo}</strong></td>
          <td><span style="font-size: 0.75rem;">${r.codigoRemitente}</span></td>
          <td><span class="badge-promigas badge-tag" style="font-size: 0.65rem;">${r.codigoTipoRuta}</span></td>
          <td><span style="font-size: 0.75rem;">${r.nombreMercado}</span></td>
          <td><span style="font-size: 0.75rem;">${r.nombreSector}</span></td>
          <td class="cell-capacity">${r.capacidad}</td>
        `;
        el.previewTableBody.appendChild(tr);
      });
    }

    // Render Raw CSV
    const csvContent = buildCsvText(rows);
    el.rawCsvCode.textContent = csvContent;

    // Update Step Summaries
    updateStepSummaries();
  }

  /**
   * Update Collapsed Step Summaries
   */
  function updateStepSummaries() {
    const s1 = document.getElementById('step-1-summary');
    if (s1) {
      s1.textContent = `${state.remitente} | ${state.tipoRuta} | ${state.capacidad} KPCD`;
    }

    const s2 = document.getElementById('step-2-summary');
    if (s2) {
      const periods = splitDateRange(state.fechaInicio, state.fechaFin, state.dividirMes);
      if (periods.length > 0) {
        s2.textContent = `${periods[0].start} - ${periods[periods.length - 1].end} (${periods.length} ${periods.length === 1 ? 'periodo' : 'meses'})`;
      } else {
        s2.textContent = 'Fechas inválidas';
      }
    }
  }

  /**
   * Create UTF-16LE Blob with BOM (Exact Promigas Official Format)
   */
  function createUtf16LeBlob(text) {
    const bom = new Uint8Array([0xFF, 0xFE]); // Little Endian BOM
    const buffer = new ArrayBuffer(text.length * 2);
    const view = new Uint16Array(buffer);
    for (let i = 0; i < text.length; i++) {
      view[i] = text.charCodeAt(i);
    }
    return new Blob([bom, buffer], { type: 'text/csv;charset=utf-16le;' });
  }

  /**
   * Trigger Browser File Download
   */
  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  /**
   * Generate Meaningful Filename
   */
  function getGeneratedFilename(ext = 'csv') {
    const sDate = state.fechaInicio.replace(/-/g, '');
    const eDate = state.fechaFin.replace(/-/g, '');
    const rem = state.remitente || 'GEAM';
    return `Solicitud_Capacidad_${rem}_${sDate}_${eDate}.${ext}`;
  }

  /**
   * Show Toast Notification
   */
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    `;
    el.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  /**
   * Setup Event Listeners
   */
  function setupEventListeners() {
    // Collapsible Steps (Pasos 1, 2, 3)
    document.querySelectorAll('.card-collapsible .card-header').forEach(header => {
      header.addEventListener('click', (e) => {
        // Prevent toggling if user clicked interactive elements inside header
        if (e.target.closest('button, input, select, a, label')) return;
        const card = header.closest('.card-collapsible');
        card.classList.toggle('collapsed');
        updateStepSummaries();
      });
    });

    const btnExpandAll = document.getElementById('btn-expand-all-steps');
    if (btnExpandAll) {
      btnExpandAll.addEventListener('click', () => {
        document.querySelectorAll('.card-collapsible').forEach(c => c.classList.remove('collapsed'));
      });
    }

    const btnCollapseAll = document.getElementById('btn-collapse-all-steps');
    if (btnCollapseAll) {
      btnCollapseAll.addEventListener('click', () => {
        document.querySelectorAll('.card-collapsible').forEach(c => c.classList.add('collapsed'));
        updateStepSummaries();
      });
    }

    // Tab switching
    el.tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;
        el.tabButtons.forEach(b => b.classList.remove('active'));
        el.tabPanes.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
        state.activeTab = targetTab;
      });
    });

    // Remitente select
    el.selectRemitente.addEventListener('change', (e) => {
      state.remitente = e.target.value;
      el.remitenteBadge.textContent = `Código: ${state.remitente}`;
      regeneratePreview();
    });

    // Gasoducto select
    el.selectGasoducto.addEventListener('change', (e) => {
      state.gasoducto = e.target.value;
      selectInitialTramos();
      renderTramos();
      regeneratePreview();
    });

    // Tipo de Ruta select
    el.selectTipoRuta.addEventListener('change', (e) => {
      state.tipoRuta = e.target.value;
      if (state.tipoRuta === 'TI') {
        el.selectModalidad.value = '';
        state.modalidad = '';
      }
      regeneratePreview();
    });

    // Modalidad select
    el.selectModalidad.addEventListener('change', (e) => {
      state.modalidad = e.target.value;
      regeneratePreview();
    });

    // Mercado select
    el.selectMercado.addEventListener('change', (e) => {
      state.mercado = e.target.value;
      regeneratePreview();
    });

    // Sector select
    el.selectSector.addEventListener('change', (e) => {
      state.sector = e.target.value;
      regeneratePreview();
    });

    // Capacidad input
    el.inputCapacidad.addEventListener('input', (e) => {
      state.capacidad = parseFloat(e.target.value) || 0;
      if (state.capacityMode === 'all') {
        renderTramos();
      }
      regeneratePreview();
    });

    // Capacity Mode Radios
    if (el.capModeAll && el.capModeCustom) {
      el.capModeAll.addEventListener('change', () => {
        state.capacityMode = 'all';
        if (el.btnSyncAllCapacity) el.btnSyncAllCapacity.style.display = 'none';
        renderTramos();
        regeneratePreview();
      });

      el.capModeCustom.addEventListener('change', () => {
        state.capacityMode = 'custom';
        if (el.btnSyncAllCapacity) el.btnSyncAllCapacity.style.display = 'inline-block';
        // Pre-fill existing capacities with global capacity
        PROMIGAS_DATA.tramos.forEach(t => {
          if (!state.tramoCapacities.has(t.codigo)) {
            state.tramoCapacities.set(t.codigo, state.capacidad);
          }
        });
        renderTramos();
        regeneratePreview();
      });
    }

    // Sync all capacity button
    if (el.btnSyncAllCapacity) {
      el.btnSyncAllCapacity.addEventListener('click', () => {
        PROMIGAS_DATA.tramos.forEach(t => {
          state.tramoCapacities.set(t.codigo, state.capacidad);
        });
        renderTramos();
        regeneratePreview();
        showToast(`Capacidad ${state.capacidad} KPCD aplicada a todos los tramos`);
      });
    }

    // Segment Code Mode
    if (el.selectTramoCodeMode) {
      el.selectTramoCodeMode.addEventListener('change', (e) => {
        state.tramoCodeMode = e.target.value;
        regeneratePreview();
      });
    }

    // ENTRT_LBL input
    el.inputEntrtLbl.addEventListener('input', (e) => {
      state.entrtLbl = e.target.value;
      regeneratePreview();
    });

    // Helper: Sync state from date input
    const syncStartDate = (val) => {
      state.fechaInicio = val;
      const gq = getGasQuarterFromDate(val);
      state.currentGasYear = gq.gasYear;
      state.currentCycle = gq.cycle;
      updatePeriodsPreview();
      regeneratePreview();
    };

    // Fecha Inicio (listen to both input and change for immediate responsiveness)
    el.inputFechaInicio.addEventListener('change', (e) => syncStartDate(e.target.value));
    el.inputFechaInicio.addEventListener('input', (e) => syncStartDate(e.target.value));

    // Fecha Fin
    const syncEndDate = (val) => {
      state.fechaFin = val;
      updatePeriodsPreview();
      regeneratePreview();
    };
    el.inputFechaFin.addEventListener('change', (e) => syncEndDate(e.target.value));
    el.inputFechaFin.addEventListener('input', (e) => syncEndDate(e.target.value));

    // Dividir Mes Toggle
    el.checkDividirMes.addEventListener('change', (e) => {
      state.dividirMes = e.target.checked;
      updatePeriodsPreview();
      regeneratePreview();
    });

    // Quarter Navigation Helpers (Año Gas CREG: Inicia en Diciembre)
    function isLeapYear(y) {
      return y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0);
    }

    /**
     * Ciclos del Año Gas (Inician en Diciembre):
     * - Ciclo 1 (Q1): 01/12/GY al 28(29)/02/(GY+1) (Dic - Ene - Feb)
     * - Ciclo 2 (Q2): 01/03/(GY+1) al 31/05/(GY+1) (Mar - Abr - May)
     * - Ciclo 3 (Q3): 01/06/(GY+1) al 31/08/(GY+1) (Jun - Jul - Ago)
     * - Ciclo 4 (Q4): 01/09/(GY+1) al 30/11/(GY+1) (Sep - Oct - Nov)
     */
    function getGasQuarterDates(gasYear, cycle) {
      let gy = (gasYear === undefined || isNaN(gasYear)) ? 2026 : Number(gasYear);
      let c = (cycle === undefined || isNaN(cycle)) ? 1 : Number(cycle);
      while (c > 4) {
        c -= 4;
        gy++;
      }
      while (c < 1) {
        c += 4;
        gy--;
      }

      let start, end, label;
      if (c === 1) {
        const febDay = isLeapYear(gy + 1) ? 29 : 28;
        start = `${gy}-12-01`;
        end = `${gy + 1}-02-${febDay}`;
        label = `Q1 | Dic ${gy} - Feb ${gy + 1}`;
      } else if (c === 2) {
        start = `${gy + 1}-03-01`;
        end = `${gy + 1}-05-31`;
        label = `Q2 | Mar ${gy + 1} - May ${gy + 1}`;
      } else if (c === 3) {
        start = `${gy + 1}-06-01`;
        end = `${gy + 1}-08-31`;
        label = `Q3 | Jun ${gy + 1} - Ago ${gy + 1}`;
      } else { // 4
        start = `${gy + 1}-09-01`;
        end = `${gy + 1}-11-30`;
        label = `Q4 | Sep ${gy + 1} - Nov ${gy + 1}`;
      }

      return {
        gasYear: gy,
        cycle: c,
        start,
        end,
        label
      };
    }

    /**
     * Obtiene el Año Gas y Ciclo a partir de una fecha YYYY-MM-DD o DD/MM/YYYY
     */
    function getGasQuarterFromDate(dateStr) {
      let y = 2026;
      let m = 12;
      if (dateStr && typeof dateStr === 'string') {
        const clean = dateStr.trim();
        if (clean.includes('-')) {
          const parts = clean.split('-').map(Number);
          if (parts.length >= 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
            y = parts[0];
            m = parts[1];
          }
        } else if (clean.includes('/')) {
          const parts = clean.split('/').map(Number);
          if (parts.length >= 3) {
            if (parts[0] > 1000) {
              y = parts[0];
              m = parts[1];
            } else {
              y = parts[2];
              m = parts[1];
            }
          }
        }
      }

      if (m === 12) {
        return { gasYear: y, cycle: 1 };
      } else if (m === 1 || m === 2) {
        return { gasYear: y - 1, cycle: 1 };
      } else if (m >= 3 && m <= 5) {
        return { gasYear: y - 1, cycle: 2 };
      } else if (m >= 6 && m <= 8) {
        return { gasYear: y - 1, cycle: 3 };
      } else { // 9, 10, 11
        return { gasYear: y - 1, cycle: 4 };
      }
    }

    /**
     * Calcula QN: Próximo trimestre al actual.
     * Si hoy estamos en Sep-Nov 2026 (Ciclo 4 de GY 2025), el próximo es Dic 2026 - Feb 2027 (QN).
     */
    function getQNDates() {
      const now = new Date();
      const currentQuarter = getGasQuarterFromDate(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`);
      return getGasQuarterDates(currentQuarter.gasYear, currentQuarter.cycle + 1);
    }

    function applyGasQuarter(gasYear, cycle, isQN = false) {
      const qInfo = getGasQuarterDates(gasYear, cycle);
      // Persist tracked cycle in state directly for infallible navigation
      state.currentGasYear = qInfo.gasYear;
      state.currentCycle = qInfo.cycle;

      el.inputFechaInicio.value = qInfo.start;
      el.inputFechaFin.value = qInfo.end;
      state.fechaInicio = qInfo.start;
      state.fechaFin = qInfo.end;
      el.checkDividirMes.checked = true;
      state.dividirMes = true;
      updatePeriodsPreview();
      regeneratePreview();
      const msg = isQN ? `Trimestre QN: ${qInfo.start} al ${qInfo.end}` : `Trimestre ${qInfo.label}`;
      showToast(msg);
    }

    // Date Presets Event Listeners
    if (el.presetQuarter) {
      el.presetQuarter.addEventListener('click', (e) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        const qn = getQNDates();
        applyGasQuarter(qn.gasYear, qn.cycle, true); // Fijar QN (01/12/2026 al 28/02/2027)
      });
    }

    if (el.presetNextQuarter) {
      el.presetNextQuarter.addEventListener('click', (e) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        if (state.currentGasYear === undefined || state.currentCycle === undefined) {
          const curr = getGasQuarterFromDate(el.inputFechaInicio.value || state.fechaInicio);
          state.currentGasYear = curr.gasYear;
          state.currentCycle = curr.cycle;
        }
        applyGasQuarter(state.currentGasYear, state.currentCycle + 1); // Avanzar 1 trimestre
      });
    }

    if (el.presetPrevQuarter) {
      el.presetPrevQuarter.addEventListener('click', (e) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        if (state.currentGasYear === undefined || state.currentCycle === undefined) {
          const curr = getGasQuarterFromDate(el.inputFechaInicio.value || state.fechaInicio);
          state.currentGasYear = curr.gasYear;
          state.currentCycle = curr.cycle;
        }
        applyGasQuarter(state.currentGasYear, state.currentCycle - 1); // Retroceder 1 trimestre
      });
    }

    if (el.presetCurrentMonth) {
      el.presetCurrentMonth.addEventListener('click', (e) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        const now = new Date();
        const y = now.getFullYear();
        const m = now.getMonth();
        const first = new Date(y, m, 1);
        const last = new Date(y, m + 1, 0);
        const startStr = `${y}-${String(m + 1).padStart(2, '0')}-01`;
        const endStr = `${y}-${String(m + 1).padStart(2, '0')}-${String(last.getDate()).padStart(2, '0')}`;
        el.inputFechaInicio.value = startStr;
        el.inputFechaFin.value = endStr;
        state.fechaInicio = startStr;
        state.fechaFin = endStr;
        const curr = getGasQuarterFromDate(startStr);
        state.currentGasYear = curr.gasYear;
        state.currentCycle = curr.cycle;
        updatePeriodsPreview();
        regeneratePreview();
        showToast(`Mes Actual (${startStr} al ${endStr})`);
      });
    }

    if (el.presetNextMonth) {
      el.presetNextMonth.addEventListener('click', (e) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        const now = new Date();
        let y = now.getFullYear();
        let m = now.getMonth() + 1; // 0-based next month
        if (m > 11) {
          m = 0;
          y++;
        }
        const last = new Date(y, m + 1, 0);
        const startStr = `${y}-${String(m + 1).padStart(2, '0')}-01`;
        const endStr = `${y}-${String(m + 1).padStart(2, '0')}-${String(last.getDate()).padStart(2, '0')}`;
        el.inputFechaInicio.value = startStr;
        el.inputFechaFin.value = endStr;
        state.fechaInicio = startStr;
        state.fechaFin = endStr;
        const curr = getGasQuarterFromDate(startStr);
        state.currentGasYear = curr.gasYear;
        state.currentCycle = curr.cycle;
        updatePeriodsPreview();
        regeneratePreview();
        showToast(`Próximo Mes (${startStr} al ${endStr})`);
      });
    }

    // Tramo Selection Buttons
    el.btnSelectAllTramos.addEventListener('click', () => {
      const filtered = getFilteredTramos();
      filtered.forEach(t => state.selectedTramos.add(t.codigo));
      renderTramos();
      regeneratePreview();
    });

    el.btnDeselectAllTramos.addEventListener('click', () => {
      const filtered = getFilteredTramos();
      filtered.forEach(t => state.selectedTramos.delete(t.codigo));
      renderTramos();
      regeneratePreview();
    });

    // Tramo search filter
    el.filterTramoText.addEventListener('input', (e) => {
      state.tramoSearchText = e.target.value;
      renderTramos();
    });

    // View toggle buttons (Table vs Raw)
    el.btnViewTable.addEventListener('click', () => {
      state.viewMode = 'table';
      el.btnViewTable.classList.add('active');
      el.btnViewRaw.classList.remove('active');
      el.outputTableContainer.style.display = 'block';
      el.outputRawContainer.style.display = 'none';
    });

    el.btnViewRaw.addEventListener('click', () => {
      state.viewMode = 'raw';
      el.btnViewRaw.classList.add('active');
      el.btnViewTable.classList.remove('active');
      el.outputTableContainer.style.display = 'none';
      el.outputRawContainer.style.display = 'block';
    });

    // Download Official Promigas UTF-16LE CSV
    el.btnDownloadOfficial.addEventListener('click', () => {
      const rows = generateOutputRows();
      if (rows.length === 0) {
        alert('No hay registros para descargar. Selecciona al menos un tramo.');
        return;
      }
      const csvContent = buildCsvText(rows);
      const blob = createUtf16LeBlob(csvContent);
      const filename = getGeneratedFilename('csv');
      downloadBlob(blob, filename);
      showToast(`¡Archivo oficial descargado: ${filename}!`);
    });

    // Download UTF-8 CSV
    el.btnDownloadUtf8.addEventListener('click', () => {
      const rows = generateOutputRows();
      if (rows.length === 0) {
        alert('No hay registros para descargar.');
        return;
      }
      const csvContent = buildCsvText(rows);
      // UTF-8 with BOM
      const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
      const filename = getGeneratedFilename('csv');
      downloadBlob(blob, filename);
      showToast(`¡Archivo UTF-8 descargado: ${filename}!`);
    });

    // Copy to Clipboard
    el.btnCopyClipboard.addEventListener('click', async () => {
      const rows = generateOutputRows();
      if (rows.length === 0) {
        alert('No hay filas para copiar.');
        return;
      }
      const csvContent = buildCsvText(rows);
      try {
        await navigator.clipboard.writeText(csvContent);
        showToast(`¡${rows.length} registros copiados al portapapeles!`);
      } catch (err) {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = csvContent;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`¡${rows.length} registros copiados al portapapeles!`);
      }
    });

    // Catalog Search & Filters
    el.catalogSearchInput.addEventListener('input', (e) => {
      state.catalogSearchText = e.target.value;
      renderCatalogTable();
    setupNominacionesModule();
    });

    el.catalogFilterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        el.catalogFilterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.catalogCategory = pill.dataset.cat;
        renderCatalogTable();
      });
    });

    // Template Dropzone (Guarded)
    if (el.templateDropzone && el.templateFileInput) {
      el.templateDropzone.addEventListener('click', () => {
        el.templateFileInput.click();
      });

      el.templateDropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        el.templateDropzone.classList.add('dragover');
      });

      el.templateDropzone.addEventListener('dragleave', () => {
        el.templateDropzone.classList.remove('dragover');
      });

      el.templateDropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        el.templateDropzone.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
          handleTemplateFile(e.dataTransfer.files[0]);
        }
      });

      el.templateFileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
          handleTemplateFile(e.target.files[0]);
        }
      });
    }

    if (el.btnDownloadBlankTemplate) {
      el.btnDownloadBlankTemplate.addEventListener('click', () => {
        const headerLine = OFFICIAL_HEADER.join(';') + '\r\n';
        const blob = createUtf16LeBlob(headerLine);
        downloadBlob(blob, 'plantilla capacity request.csv');
        showToast('¡Plantilla vacía oficial descargada!');
      });
    }
  }

  /**
   * Handle Uploaded Template File Validation
   */
  function handleTemplateFile(file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const buffer = e.target.result;
      const uint8 = new Uint8Array(buffer);
      let text = '';

      // Check BOM
      const isUtf16Le = uint8.length >= 2 && uint8[0] === 0xFF && uint8[1] === 0xFE;
      if (isUtf16Le) {
        const decoder = new TextDecoder('utf-16le');
        text = decoder.decode(uint8.slice(2));
      } else {
        const decoder = new TextDecoder('utf-8');
        text = decoder.decode(uint8);
      }

      const firstLine = text.split(/\r?\n/)[0].replace(/^\uFEFF/, '').trim();
      const cols = firstLine.split(';').map(c => c.trim());

      const resultBox = el.templateValidationResult;
      resultBox.style.display = 'block';

      // Verify columns
      const matchesCount = cols.length === OFFICIAL_HEADER.length;
      let missingCols = [];
      OFFICIAL_HEADER.forEach(expected => {
        if (!cols.includes(expected)) {
          missingCols.push(expected);
        }
      });

      if (matchesCount && missingCols.length === 0) {
        resultBox.innerHTML = `
          <div style="background: var(--accent-light); border: 1px solid #6ee7b7; border-radius: 8px; padding: 1rem; color: #065f46;">
            <div style="font-weight: 700; font-size: 0.95rem; display: flex; align-items: center; gap: 0.5rem;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              ¡Plantilla 100% Válida y Conforme con Promigas!
            </div>
            <p style="font-size: 0.82rem; margin-top: 0.35rem;">
              Archivo: <strong>${file.name}</strong> (${(file.size / 1024).toFixed(1)} KB)<br>
              Codificación detectada: <strong>${isUtf16Le ? 'UTF-16 LE con BOM (Oficial Promigas)' : 'UTF-8'}</strong><br>
              Columnas detectadas: <strong>15 de 15</strong> coincidentes.
            </p>
          </div>
        `;
      } else {
        resultBox.innerHTML = `
          <div style="background: var(--warning-light); border: 1px solid #fcd34d; border-radius: 8px; padding: 1rem; color: #92400e;">
            <div style="font-weight: 700; font-size: 0.95rem;">Advertencia de Validación en Plantilla</div>
            <p style="font-size: 0.82rem; margin-top: 0.35rem;">
              El archivo contiene ${cols.length} columnas (se esperaban 15).<br>
              ${missingCols.length > 0 ? `Columnas faltantes o con diferente nombre: ${missingCols.join(', ')}` : ''}
            </p>
          </div>
        `;
      }
    };

    reader.readAsArrayBuffer(file);
  }

  /**
   * Render Catalog Table Tab
   */
  function renderCatalogTable() {
    const cat = state.catalogCategory;
    const query = state.catalogSearchText.toLowerCase().trim();

    let headers = [];
    let rows = [];

    if (cat === 'tramos') {
      headers = ['Código', 'Nombre Tramo', 'Gasoducto'];
      rows = PROMIGAS_DATA.tramos
        .filter(t => !query || t.nombre.toLowerCase().includes(query) || t.codigo.toLowerCase().includes(query) || t.gasoducto.toLowerCase().includes(query))
        .map(t => [t.codigo, t.nombre, t.gasoducto]);
    } else if (cat === 'recibo') {
      headers = ['Código', 'Nombre Punto Recibo', 'Gasoducto', 'Tipo'];
      rows = PROMIGAS_DATA.puntosRecibo
        .filter(p => !query || p.nombre.toLowerCase().includes(query) || p.codigo.toLowerCase().includes(query) || p.gasoducto.toLowerCase().includes(query))
        .map(p => [p.codigo, p.nombre, p.gasoducto, p.tipo]);
    } else if (cat === 'entrega') {
      headers = ['Código', 'Nombre Punto Entrega', 'Gasoducto', 'Punto Calidad', 'Remitente Swing'];
      rows = PROMIGAS_DATA.puntosEntrega
        .filter(p => !query || p.nombre.toLowerCase().includes(query) || p.codigo.toLowerCase().includes(query) || p.gasoducto.toLowerCase().includes(query) || p.puntoCalidad.toLowerCase().includes(query))
        .map(p => [p.codigo, p.nombre, p.gasoducto, p.puntoCalidad, p.remitenteSwing]);
    } else if (cat === 'remitentes') {
      headers = ['Código Agente', 'Nombre de la Organización', 'Tipo'];
      rows = PROMIGAS_DATA.remitentes
        .filter(r => !query || r.nombre.toLowerCase().includes(query) || r.codigo.toLowerCase().includes(query) || r.tipo.toLowerCase().includes(query))
        .map(r => [r.codigo, r.nombre, r.tipo]);
    } else if (cat === 'sectores') {
      headers = ['Categoría', 'Código', 'Nombre'];
      const combined = [
        ...PROMIGAS_DATA.mercados.map(m => ['Mercado', m.codigo, m.nombre]),
        ...PROMIGAS_DATA.sectores.map(s => ['Sector', s.codigo, s.nombre]),
        ...PROMIGAS_DATA.tiposRuta.map(r => ['Tipo Ruta', r.codigo, r.nombre]),
        ...PROMIGAS_DATA.modalidades.map(mo => ['Modalidad', mo.codigo || '(Vacío)', mo.nombre])
      ];
      rows = combined.filter(c => !query || c[1].toLowerCase().includes(query) || c[2].toLowerCase().includes(query));
    }

    // Render Head
    el.catalogTableHead.innerHTML = `<tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>`;

    // Render Body
    el.catalogTableBody.innerHTML = '';
    if (rows.length === 0) {
      el.catalogTableBody.innerHTML = `<tr><td colspan="${headers.length}" style="text-align: center; padding: 2rem; color: var(--text-muted);">No se encontraron resultados para "${query}".</td></tr>`;
      return;
    }

    rows.forEach(r => {
      const tr = document.createElement('tr');
      tr.innerHTML = r.map((cell, idx) => {
        if (idx === 0) {
          return `<td><span class="cell-code" style="cursor: pointer;" title="Clic para copiar">${cell}</span></td>`;
        }
        return `<td>${cell}</td>`;
      }).join('');

      // Click code to copy
      const codeSpan = tr.querySelector('.cell-code');
      if (codeSpan) {
        codeSpan.addEventListener('click', () => {
          navigator.clipboard.writeText(codeSpan.textContent);
          showToast(`Copiado: ${codeSpan.textContent}`);
        });
      }

      el.catalogTableBody.appendChild(tr);
    });
  }

  // Start application on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
