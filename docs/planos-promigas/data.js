/** Catalogo de datos oficial para Planos de Promigas **/
const PROMIGAS_DATA = {
  "gasoductos": [
    "Promigas",
    "Promioriente",
    "Transmetano",
    "Transoccidente"
  ],
  "tramos": [
    {
      "codigo": "Ballena - La Mami",
      "codigoBase": "Ballena - La Mami",
      "nombre": "Ballena - La Mami",
      "descripcion": "Ballena - La Mami",
      "gasoducto": "Promigas"
    },
    {
      "codigo": "Barranquilla - Cartagena",
      "codigoBase": "Barranquilla - Cartagena",
      "nombre": "Barranquilla - Cartagena",
      "descripcion": "Barranquilla - Cartagena",
      "gasoducto": "Promigas"
    },
    {
      "codigo": "Barranquilla - La Mami (Contraflujo)",
      "codigoBase": "Barranquilla - La Mami",
      "nombre": "Barranquilla - La Mami",
      "descripcion": "Barranquilla - La Mami (Contraflujo)",
      "gasoducto": "Promigas"
    },
    {
      "codigo": "Cartagena - Barranquilla (Contraflujo)",
      "codigoBase": "Cartagena - Barranquilla",
      "nombre": "Cartagena - Barranquilla",
      "descripcion": "Cartagena - Barranquilla (Contraflujo)",
      "gasoducto": "Promigas"
    },
    {
      "codigo": "Cartagena - Sincelejo",
      "codigoBase": "Cartagena - Sincelejo",
      "nombre": "Cartagena - Sincelejo",
      "descripcion": "Cartagena - Sincelejo",
      "gasoducto": "Promigas"
    },
    {
      "codigo": "Jobo - Sincelejo (Contraflujo)",
      "codigoBase": "Jobo - Sincelejo",
      "nombre": "Jobo - Sincelejo (Contraflujo)",
      "descripcion": "Jobo - Sincelejo (Contraflujo)",
      "gasoducto": "Promigas"
    },
    {
      "codigo": "La Creciente - Sincelejo",
      "codigoBase": "La Creciente - Sincelejo",
      "nombre": "La Creciente - Sincelejo",
      "descripcion": "La Creciente - Sincelejo",
      "gasoducto": "Promigas"
    },
    {
      "codigo": "La Mami - Ballena (Contraflujo)",
      "codigoBase": "La Mami - Ballena",
      "nombre": "La Mami - Ballena",
      "descripcion": "La Mami - Ballena (Contraflujo)",
      "gasoducto": "Promigas"
    },
    {
      "codigo": "La Mami - Barranquilla",
      "codigoBase": "La Mami - Barranquilla",
      "nombre": "La Mami - Barranquilla",
      "descripcion": "La Mami - Barranquilla",
      "gasoducto": "Promigas"
    },
    {
      "codigo": "Sincelejo - Cartagena (Contraflujo)",
      "codigoBase": "Sincelejo - Cartagena",
      "nombre": "Sincelejo - Cartagena",
      "descripcion": "Sincelejo - Cartagena (Contraflujo)",
      "gasoducto": "Promigas"
    },
    {
      "codigo": "Sincelejo - Jobo",
      "codigoBase": "Sincelejo - Jobo",
      "nombre": "Sincelejo - Jobo",
      "descripcion": "Sincelejo - Jobo",
      "gasoducto": "Promigas"
    },
    {
      "codigo": "Sincelejo - La Creciente (Contraflujo)",
      "codigoBase": "Sincelejo - La Creciente",
      "nombre": "Sincelejo - La Creciente",
      "descripcion": "Sincelejo - La Creciente (Contraflujo)",
      "gasoducto": "Promigas"
    },
    {
      "codigo": "SRT Mamonal",
      "codigoBase": "SRT Mamonal",
      "nombre": "SRT Mamonal",
      "descripcion": "SRT Mamonal",
      "gasoducto": "Promigas"
    },
    {
      "codigo": "10005",
      "nombre": "BUCARAMANGA",
      "descripcion": "BUCARAMANGA",
      "gasoducto": "Promioriente"
    },
    {
      "codigo": "10008",
      "nombre": "MEDELLIN",
      "descripcion": "MEDELLIN",
      "gasoducto": "Transmetano"
    },
    {
      "codigo": "10009",
      "nombre": "CALI",
      "descripcion": "CALI",
      "gasoducto": "Transoccidente"
    }
  ],
  "mercados": [
    {
      "codigo": "MKTTP_NOREG",
      "nombre": "No Regulado"
    },
    {
      "codigo": "MKTTP_REG",
      "nombre": "Regulado"
    }
  ],
  "sectores": [
    {
      "codigo": "SECTP_INDUST",
      "nombre": "Industrial"
    },
    {
      "codigo": "SECTP_TRANSGAS",
      "nombre": "Gas para transportadores"
    },
    {
      "codigo": "SECTP_RESID",
      "nombre": "Domestico"
    },
    {
      "codigo": "SECTP_REFIN",
      "nombre": "Refineria"
    },
    {
      "codigo": "SECTP_GNVC",
      "nombre": "Gas Natural Vehicular Comprimido"
    },
    {
      "codigo": "SECTP_ELECGEN",
      "nombre": "Plantas de Generación Térmica"
    },
    {
      "codigo": "SECTP_COMMER",
      "nombre": "Comercial"
    },
    {
      "codigo": "SECTP_PETRO",
      "nombre": "Petroquímica"
    }
  ],
  "tiposRuta": [
    {
      "codigo": "TI",
      "nombre": "Interruptible Transportation",
      "label": "TI - Interruptible Transportation"
    },
    {
      "codigo": "TF",
      "nombre": "Firm Transportation",
      "label": "TF - Firm Transportation"
    }
  ],
  "modalidades": [
    {
      "codigo": "",
      "nombre": "Sin Modalidad / Vacío (Interrumpible)"
    },
    {
      "codigo": "CF",
      "nombre": "Contrato Firme Trimestral"
    },
    {
      "codigo": "OCT",
      "nombre": "Opción de Compra de Transporte"
    },
    {
      "codigo": "CFC",
      "nombre": "Contrato Firmeza Condicionada"
    },
    {
      "codigo": "CC",
      "nombre": "Contrato de Contingencia"
    },
    {
      "codigo": "OS",
      "nombre": "OtroSi Diario"
    }
  ],
  "remitentes": [
    {
      "tipo": "Agente",
      "nombre": "ALCANOS DE COLOMBIA S.A. E.S.P",
      "codigo": "ALCANOS"
    },
    {
      "tipo": "Agente",
      "nombre": "CABOT COLOMBIANA S.A.",
      "codigo": "CABOT"
    },
    {
      "tipo": "Agente",
      "nombre": "CALAMARI LNG S.A. E.S.P.",
      "codigo": "CALAMARI"
    },
    {
      "tipo": "Agente",
      "nombre": "CELSIA COLOMBIA S.A E.S.P.",
      "codigo": "Celsia"
    },
    {
      "tipo": "Agente",
      "nombre": "CELSIA S.A. E.S.P.",
      "codigo": "CELSIA"
    },
    {
      "tipo": "Agente",
      "nombre": "CEMENTOS ARGOS S.A",
      "codigo": "CEMENTOS ARGOS"
    },
    {
      "tipo": "Agente",
      "nombre": "CENTRALES ENERGETICAS SAS ESP",
      "codigo": ""
    },
    {
      "tipo": "Agente",
      "nombre": "CERROMATOSO S.A.",
      "codigo": "CERROMATOSO"
    },
    {
      "tipo": "Agente",
      "nombre": "CHEVAL GAS S.A.S. ESP",
      "codigo": "CHEVAL GAS"
    },
    {
      "tipo": "Agente",
      "nombre": "CHEVRON PETROLEUM COMPANY",
      "codigo": "ChevronTexaco"
    },
    {
      "tipo": "Agente",
      "nombre": "CIAZ SAS ESP",
      "codigo": ""
    },
    {
      "tipo": "Agente",
      "nombre": "CNE MIDSTREAM S.A. E.S.P.",
      "codigo": "CNE MIDSTREAM"
    },
    {
      "tipo": "Agente",
      "nombre": "CNE OIL & GAS SAS",
      "codigo": "CANACOL"
    },
    {
      "tipo": "Agente",
      "nombre": "COGASEN S.A.S E.S.P.",
      "codigo": "GASMOVIL"
    },
    {
      "tipo": "Agente",
      "nombre": "COLOMBIANA KIMBERLY COLPAPEL",
      "codigo": "CKC"
    },
    {
      "tipo": "Agente",
      "nombre": "CORPORACIÓN ELECTRICA DE LA COSTA S.A.",
      "codigo": "CORELCA"
    },
    {
      "tipo": "Agente",
      "nombre": "DISTRACOM",
      "codigo": "DISTRACOM"
    },
    {
      "tipo": "Agente",
      "nombre": "E2 - ENERGÍA EFICIENTE S.A. E.S.P.",
      "codigo": "E2"
    },
    {
      "tipo": "Agente",
      "nombre": "ECOPETROL S.A.",
      "codigo": "ECOPETROL"
    },
    {
      "tipo": "Agente",
      "nombre": "EFIGAS GAS NATURAL S.A. E.S.P.",
      "codigo": "EFIGAS"
    },
    {
      "tipo": "Agente",
      "nombre": "EMGESA TCARTAGENA",
      "codigo": "TCGENA"
    },
    {
      "tipo": "Agente",
      "nombre": "EMPRESAS PUBLICAS DE MEDELLIN E.S.P",
      "codigo": "EPM"
    },
    {
      "tipo": "Agente",
      "nombre": "ENEL S.A.E.S.P.",
      "codigo": "ENEL"
    },
    {
      "tipo": "Agente",
      "nombre": "ENERGÍAS DE LA SIERRA S.A.S E.S.P",
      "codigo": "E SIERRA"
    },
    {
      "tipo": "Agente",
      "nombre": "ENERGY FOR THE CARIBBEAN SAS ESP",
      "codigo": "EFC"
    },
    {
      "tipo": "Agente",
      "nombre": "ENERGY TRANSITIONS S.A.S. E.S.P.",
      "codigo": "ET"
    },
    {
      "tipo": "Agente",
      "nombre": "ENFRAGEN TERMOFLORES S.A.S. E.S.P.",
      "codigo": "PRIME"
    },
    {
      "tipo": "Agente",
      "nombre": "ENFRAGEN TERMOVALLE S.A.S. E.S.P.",
      "codigo": "TERMOVALLE"
    },
    {
      "tipo": "Agente",
      "nombre": "EUROCERAMICA S.A.",
      "codigo": "EUROCERAMICA"
    },
    {
      "tipo": "Agente",
      "nombre": "FRONTERA ENERGY CORP",
      "codigo": "FRONTERA"
    },
    {
      "tipo": "Agente",
      "nombre": "GAS NATURAL CUNDIBOYACENSE S.A. E.S.",
      "codigo": "GASCUNDIBOYA"
    },
    {
      "tipo": "Agente",
      "nombre": "GAS NATURAL DEL CESAR SA",
      "codigo": "GASNACER"
    },
    {
      "tipo": "Agente",
      "nombre": "GAS NATURAL DEL ORIENTE SOCIEDAD ANONIMA",
      "codigo": "GASNATORIENTE"
    },
    {
      "tipo": "Agente",
      "nombre": "Gases Caribe RDB",
      "codigo": ""
    },
    {
      "tipo": "Agente",
      "nombre": "GASES DE OCCIDENTE S.A. E.S.P.",
      "codigo": "GASES DE OCCIDENTE"
    },
    {
      "tipo": "Agente",
      "nombre": "GASES DEL CARIBE S.A. E.S.P.",
      "codigo": "GASCARIBE"
    },
    {
      "tipo": "Agente",
      "nombre": "GASES DEL ORIENTE S.A. E.S.P.",
      "codigo": "GASORIENTE"
    },
    {
      "tipo": "Agente",
      "nombre": "GECELCA S.A. E.S.P.",
      "codigo": "GECELCA"
    },
    {
      "tipo": "Agente",
      "nombre": "GENERARCO S.A.S. E.S.P.",
      "codigo": "GENERARCO"
    },
    {
      "tipo": "Agente",
      "nombre": "GENSER POWER SAS ESP",
      "codigo": "GENSER"
    },
    {
      "tipo": "Agente",
      "nombre": "GRAN TIERRA ENERGY COLOMBIA",
      "codigo": "GRAN TIERRA"
    },
    {
      "tipo": "Agente",
      "nombre": "GRUPO ENERGETICO DE LAS AMERICAS S.A.S E.S.P",
      "codigo": "GEAM"
    },
    {
      "tipo": "Agente",
      "nombre": "GRUPO ENERGETICO S.A. E.S.P.",
      "codigo": "GRUPO ENERGETICO"
    },
    {
      "tipo": "Agente",
      "nombre": "HOCOL S.A.",
      "codigo": "HOCOL"
    },
    {
      "tipo": "Agente",
      "nombre": "HOLYGAS S.A.S. E.S.P.",
      "codigo": "HOLYGAS"
    },
    {
      "tipo": "Agente",
      "nombre": "KRONOS ENERGY S.A. E.S.P.",
      "codigo": "KRONOS"
    },
    {
      "tipo": "Agente",
      "nombre": "LEWIS ENERGY COLOMBIA INC.",
      "codigo": "LEWIS"
    },
    {
      "tipo": "Agente",
      "nombre": "LUMINA ENERGY S.A.S. E.S.P.",
      "codigo": "LUMINA"
    },
    {
      "tipo": "Agente",
      "nombre": "MALTERIA TROPICAL S.A.",
      "codigo": "MALTERIA"
    },
    {
      "tipo": "Agente",
      "nombre": "MARYGAS S.A.S E.S.P.",
      "codigo": "MARYGAS"
    },
    {
      "tipo": "Agente",
      "nombre": "Maurel & Prom",
      "codigo": "Maurel & Prom"
    },
    {
      "tipo": "Agente",
      "nombre": "MAXENERGETICOS SAS ESP",
      "codigo": ""
    },
    {
      "tipo": "Agente",
      "nombre": "METROGAS DE COLOMBIA S.A. E.S.P.",
      "codigo": "METROGAS"
    },
    {
      "tipo": "Agente",
      "nombre": "MEXICHEM RESINAS COLOMBIA S.A.S.",
      "codigo": "MEXICHEM"
    },
    {
      "tipo": "Agente",
      "nombre": "MKMS Enerji Sucursal Colombia",
      "codigo": "MKMS Enerji"
    },
    {
      "tipo": "Agente",
      "nombre": "MOVILLGAS SAS E.S.P.",
      "codigo": "MOVILLGAS"
    },
    {
      "tipo": "Agente",
      "nombre": "NITRO ENERGY",
      "codigo": "NITRO ENERGY"
    },
    {
      "tipo": "Agente",
      "nombre": "NODO ENERGETICO DEL NORTE DE COLOMBIA S.A. ESP",
      "codigo": "(NENCOL)"
    },
    {
      "tipo": "Agente",
      "nombre": "ORGANIZACION TERPEL S.A.",
      "codigo": "GAZEL"
    },
    {
      "tipo": "Agente",
      "nombre": "PACIFIC STRATUS ENERGY LTD.",
      "codigo": "PACIFIC"
    },
    {
      "tipo": "Agente",
      "nombre": "PETROMIL GAS S.A.S.",
      "codigo": "PETROMIL GAS"
    },
    {
      "tipo": "Agente",
      "nombre": "PLEXA S.A.S. E.S.P.",
      "codigo": "PLEXA"
    },
    {
      "tipo": "Agente",
      "nombre": "PROELECTRICA & CIA S.C.A E.S.P.",
      "codigo": "PROELECTRICA"
    },
    {
      "tipo": "Agente",
      "nombre": "PROMOTORA DE GASES DEL SUR S.A. E.S.P.",
      "codigo": "PROGASUR"
    },
    {
      "tipo": "Agente",
      "nombre": "PROVISERVICIOS S.A. E.S.P.",
      "codigo": "PROVISERVICIOS"
    },
    {
      "tipo": "Agente",
      "nombre": "ROTOPLAST S.A.",
      "codigo": "ROTOPLAST"
    },
    {
      "tipo": "Agente",
      "nombre": "SENCO COLOMBIA S.A.S.",
      "codigo": "SENCO"
    },
    {
      "tipo": "Agente",
      "nombre": "SMURFIT KAPPA COLOMBIA",
      "codigo": "SMURFIT KAPPA"
    },
    {
      "tipo": "Agente",
      "nombre": "SOCIEDAD PORTUARIA EL CAYAO S.A. E.S.P.",
      "codigo": "SPEC LNG"
    },
    {
      "tipo": "Agente",
      "nombre": "Solutec Ingeniería",
      "codigo": "Solutec"
    },
    {
      "tipo": "Agente",
      "nombre": "Surcolombiana de Gas S.A. E.S.P.",
      "codigo": "Surgas S.A. E.S.P."
    },
    {
      "tipo": "Agente",
      "nombre": "SURTIGAS S.A. E.S.P.",
      "codigo": "SURTIGAS"
    },
    {
      "tipo": "Agente",
      "nombre": "SURTISEP S.A. E.S.P.",
      "codigo": "SSEP"
    },
    {
      "tipo": "Agente",
      "nombre": "TERMO CARIBE S.A.S. E.S.P.",
      "codigo": "TERMOCARIBE"
    },
    {
      "tipo": "Agente",
      "nombre": "TERMOBARRANQUILLA S.A. E.S.P",
      "codigo": "TEBSA"
    },
    {
      "tipo": "Agente",
      "nombre": "TERMOCANDELARIA S.C.A E.S.P.",
      "codigo": "TERMOCANDELARIA"
    },
    {
      "tipo": "Agente",
      "nombre": "TERMOEMCALI S.A. E.S.P.",
      "codigo": "TERMOEMCALI"
    },
    {
      "tipo": "Agente",
      "nombre": "TERPEL ENERGIA S.A.S. E.S.P.",
      "codigo": "TERPEL ENERGIA"
    },
    {
      "tipo": "Agente",
      "nombre": "TPL GAS SAS ESP",
      "codigo": "TPL"
    },
    {
      "tipo": "Agente",
      "nombre": "TRANSPORTADORA DE GAS INTERNACIONAL S.A. E.S.P.",
      "codigo": "TGI"
    },
    {
      "tipo": "Agente",
      "nombre": "TRANSPORTADORA ELECTRICA DEL CARIBE S.A.S. E.S.P",
      "codigo": "TRELCA"
    },
    {
      "tipo": "Agente",
      "nombre": "VANTI S.A. E.S.P.",
      "codigo": "VANTI"
    },
    {
      "tipo": "Agente",
      "nombre": "VERA GAS SAS ESP",
      "codigo": "VERA GAS"
    },
    {
      "tipo": "Agente",
      "nombre": "VP GAS S.A.S. ESP",
      "codigo": "VP GAS"
    },
    {
      "tipo": "Agente",
      "nombre": "VP INGENERGIA S.A. E.S.P.",
      "codigo": "VP SA"
    },
    {
      "tipo": "Agente",
      "nombre": "YARA COLOMBIA S.A.",
      "codigo": "ABOCOL"
    },
    {
      "tipo": "Transportador",
      "nombre": "PROMIGAS S A E S P",
      "codigo": "PROMIGAS"
    },
    {
      "tipo": "Transportador",
      "nombre": "PROMIORIENTE S.A E.S.P.",
      "codigo": "PROMIORIENTE"
    },
    {
      "tipo": "Transportador",
      "nombre": "TRANSMETANO E.S.P. S.A.",
      "codigo": "TRANSMETANO"
    },
    {
      "tipo": "Transportador",
      "nombre": "TRANSOCCIDENTE S.A E.S.P.",
      "codigo": "TRANSOCCIDENTE"
    }
  ],
  "puntosRecibo": [
    {
      "nombre": "ARIANNA",
      "codigo": "896",
      "gasoducto": "Promigas",
      "tipo": "Recibo"
    },
    {
      "nombre": "ARRECIFE",
      "codigo": "23660",
      "gasoducto": "Promigas",
      "tipo": "Recibo"
    },
    {
      "nombre": "BALLENA",
      "codigo": "19",
      "gasoducto": "Promigas",
      "tipo": "Recibo"
    },
    {
      "nombre": "BONGA-MAMEY",
      "codigo": "588",
      "gasoducto": "Promigas",
      "tipo": "Recibo"
    },
    {
      "nombre": "BREMEN JOBO",
      "codigo": "800",
      "gasoducto": "Promigas",
      "tipo": "Recibo"
    },
    {
      "nombre": "BULLERENGUE",
      "codigo": "568",
      "gasoducto": "Promigas",
      "tipo": "Recibo"
    },
    {
      "nombre": "CMSA",
      "codigo": "967",
      "gasoducto": "Promigas",
      "tipo": "Recibo"
    },
    {
      "nombre": "LA CRECIENTE",
      "codigo": "461",
      "gasoducto": "Promigas",
      "tipo": "Recibo"
    },
    {
      "nombre": "MERECUMBÉ",
      "codigo": "902",
      "gasoducto": "Promigas",
      "tipo": "Recibo"
    },
    {
      "nombre": "PLANTA LNG",
      "codigo": "589",
      "gasoducto": "Promigas",
      "tipo": "Recibo"
    },
    {
      "nombre": "SINU-9",
      "codigo": "963",
      "gasoducto": "Promigas",
      "tipo": "Recibo"
    },
    {
      "nombre": "TGI GUAJIRA",
      "codigo": "897",
      "gasoducto": "Promigas",
      "tipo": "Recibo"
    },
    {
      "nombre": "TUCURINCA",
      "codigo": "561",
      "gasoducto": "Promigas",
      "tipo": "Recibo"
    },
    {
      "nombre": "COGB",
      "codigo": "541",
      "gasoducto": "Promioriente",
      "tipo": "Recibo"
    },
    {
      "nombre": "GIBRALTAR",
      "codigo": "540",
      "gasoducto": "Promioriente",
      "tipo": "Recibo"
    },
    {
      "nombre": "SEBASTOPOL",
      "codigo": "506",
      "gasoducto": "Transmetano",
      "tipo": "Recibo"
    },
    {
      "nombre": "CG YUMBO CALI",
      "codigo": "634",
      "gasoducto": "Transoccidente",
      "tipo": "Recibo"
    }
  ],
  "puntosEntrega": [
    {
      "nombre": "AJOVER",
      "codigo": "214",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "MAMONAL",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "AJOVER GENERACION",
      "codigo": "443",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "MAMONAL",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "AJUSTE ECOPETROL",
      "codigo": "AJUSTE-ECOPETROL",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "REFICAR",
      "remitenteSwing": "ECOPETROL S.A.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "AJUSTES TCANDELARIA",
      "codigo": "438",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "TERMOCANDELARIA",
      "remitenteSwing": "TERMOCANDELARIA S.C.A E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ALMIDONES DE SUCRE",
      "codigo": "434",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "BONGA-MAMEY",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ALVAREZ Y COLLINS",
      "codigo": "304",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "PAIVA - CARACOLI",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "AMOCAR (AMONIACOS DEL CARIBE)",
      "codigo": "212",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "MAMONAL",
      "remitenteSwing": "YARA COLOMBIA S.A.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "AMOCAR MATERIA PRIMA",
      "codigo": "213",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "MAMONAL",
      "remitenteSwing": "YARA COLOMBIA S.A.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "ANDERCOL",
      "codigo": "392",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "MAMONAL",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ARACATACA",
      "codigo": "118",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ZONA BANANERA",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ARGOS ZF",
      "codigo": "433",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "MAMONAL",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "ARJONA",
      "codigo": "106",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "HEROICA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ARROYO DE PIEDRA",
      "codigo": "138",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "PAIVA - CARACOLI",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ASOMINEROS DE SUCRE",
      "codigo": "485",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ARIANNA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "BALLESTAS",
      "codigo": "480",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ARIANNA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "BARANOA",
      "codigo": "90",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "PAIVA - CARACOLI",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "BAYUNCA",
      "codigo": "289",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "PAIVA - CARACOLI",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "BETULIA",
      "codigo": "267",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "BONGA-MAMEY",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "BIOFILM",
      "codigo": "198",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "MAMONAL",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "BOHORQUEZ",
      "codigo": "144",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "GC GASODUCTO TERMOFLORES",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "BUENAVISTA",
      "codigo": "272",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "BONGA-MAMEY",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "BUENOS AIRES",
      "codigo": "152",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ZONA BANANERA",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "BURITACA (LA DIVA)",
      "codigo": "69",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "Palomino - Palermo Temp",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "CABOT",
      "codigo": "220",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "MAMONAL",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "CALAMAR",
      "codigo": "306",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "GC GASODUCTO TERMOFLORES",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "CAMARONES",
      "codigo": "115",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "Ballena - Palomino Temp",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "CAMILO TORRES",
      "codigo": "274",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "BONGA-MAMEY",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "CAMPECHE",
      "codigo": "137",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "PAIVA - CARACOLI",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "CAMPO DE LA CRUZ",
      "codigo": "150",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "GC GASODUCTO TERMOFLORES",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "CANDELARIA",
      "codigo": "143",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "GC GASODUCTO TERMOFLORES",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "CARACOLI",
      "codigo": "134",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "GC GASODUCTO TERMOFLORES",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "CARMEN DE BOLIVAR",
      "codigo": "263",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "BONGA-MAMEY",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "CARRETO",
      "codigo": "135",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "GC GASODUCTO TERMOFLORES",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "CARTAGENA ZONA NORTE",
      "codigo": "293",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "PAIVA - CARACOLI",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "CARTON COLOMBIA TURBINA",
      "codigo": "76",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "GC GASODUCTO TERMOFLORES",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "CARTON DE COLOMBIA MOLINO 5",
      "codigo": "8",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "GC GASODUCTO TERMOFLORES",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "CEMENTOS DEL ORIENTE",
      "codigo": "894",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "GC GASODUCTO TERMOFLORES",
      "remitenteSwing": "CNE OIL & GAS SAS",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "CEMEX (CLEMENCIA)",
      "codigo": "514",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "PAIVA - CARACOLI",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "CERETE",
      "codigo": "250",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ARIANNA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "CERETE IV",
      "codigo": "252",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ARIANNA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "CERROMATOSO",
      "codigo": "968",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "JOBO",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "CHIMA",
      "codigo": "244",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ARIANNA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "CHINU",
      "codigo": "242",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ARIANNA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "CHORRERA",
      "codigo": "604",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "PAIVA - CARACOLI",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "CIENAGA DE ORO",
      "codigo": "249",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ARIANNA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "CIENAGA I",
      "codigo": "87",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "Palomino - Palermo Temp",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "CIENAGA II",
      "codigo": "151",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ZONA BANANERA",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "CLEMENCIA",
      "codigo": "136",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "PAIVA - CARACOLI",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "COROZAL",
      "codigo": "268",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "BONGA-MAMEY",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "CORREA",
      "codigo": "958",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "MAMONAL",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "CORTIJO 3",
      "codigo": "645",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ARIANNA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "CRUCERO",
      "codigo": "886",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ARIANNA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "DIBULLA",
      "codigo": "122",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "Ballena - Palomino Temp",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "DOÑA MANUELA",
      "codigo": "125",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "HEROICA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "DOW RESINA EPOXICA",
      "codigo": "225",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "MAMONAL",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ECOPETROL EL RETIRO",
      "codigo": "339",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "BONGA-MAMEY",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ECOPETROL POZOS COLORADOS",
      "codigo": "20",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "Palomino - Palermo Temp",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "ECOPETROL REFINERIA",
      "codigo": "230",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "MAMONAL",
      "remitenteSwing": "ECOPETROL S.A.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "EDS LA SABANA",
      "codigo": "558",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "BONGA-MAMEY",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "EDS LAS MERCEDES",
      "codigo": "0190",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "SPEC",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "EL EBANAL",
      "codigo": "320",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "Ballena - Palomino Temp",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "EL LIMON (CICUCO)",
      "codigo": "276",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "BONGA-MAMEY",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "EL PAJARO",
      "codigo": "386",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "Ballena - Palomino Temp",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "EL RETIRO",
      "codigo": "275",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "BONGA-MAMEY",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "EQUIPOS UNIVERSAL",
      "codigo": "23",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "PAIVA - CARACOLI",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ESENTTIA",
      "codigo": "209",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "MAMONAL",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "ESTACION ARENOSA",
      "codigo": "448",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "VIA 40",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "ESTACION GASCARIBE ESTADIO STA MARTA",
      "codigo": "488",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "Palomino - Palermo Temp",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ESTACION GNC CONCEPCION",
      "codigo": "186",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "Palomino - Palermo Temp",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ESTACION GNC FERROCARRIL",
      "codigo": "337",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "Palomino - Palermo Temp",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ESTACION GNC GASXI TAYRONA",
      "codigo": "295",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "Palomino - Palermo Temp",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ESTACION GNC ZUCA",
      "codigo": "307",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "Palomino - Palermo Temp",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ESTACIÓN GNV ARJONA",
      "codigo": "328",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "HEROICA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ESTACIÓN GNV BUENOS AIRES",
      "codigo": "369",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ARIANNA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ESTACIÓN GNV EL CORTIJO",
      "codigo": "299",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ARIANNA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ESTACIÓN GNV HEROICA",
      "codigo": "401",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "MAMONAL",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ESTACIÓN GNV INDIA CATALINA",
      "codigo": "318",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "HEROICA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ESTACION GNV LA CASTELLANA",
      "codigo": "370",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "GC GASODUCTO TERMOFLORES",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ESTACIÓN GNV LA GIRALDA",
      "codigo": "421",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "HEROICA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ESTACION GNV LA MACARENA",
      "codigo": "408",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "BONGA-MAMEY",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ESTACIÓN GNV MAGANGUE",
      "codigo": "437",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "BONGA-MAMEY",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ESTACION GNV MANANTIAL",
      "codigo": "424",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "Palomino - Palermo Temp",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ESTACIÓN GNV MONTERÍA",
      "codigo": "254",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ARIANNA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ESTACIÓN GNV PERLA DEL SINÚ",
      "codigo": "509",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ARIANNA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ESTACIÓN GNV RIO SINÚ",
      "codigo": "484",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ARIANNA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ESTACIÓN GNV SAHAGÚN",
      "codigo": "389",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ARIANNA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ESTACIÓN GNV SANTA CRUZ",
      "codigo": "314",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ARIANNA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ESTACIÓN GNV SINCELEJO",
      "codigo": "240",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "BONGA-MAMEY",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ESTACIÓN GNV TECNOLÓGICA",
      "codigo": "393",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "HEROICA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ESTACIÓN GNV TERNERA",
      "codigo": "185",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "HEROICA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ESTACIÓN GNV URBINA",
      "codigo": "373",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ARIANNA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ESTACIÓN GNV VIRGEN DEL CARMEN",
      "codigo": "368",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ARIANNA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ESTACION M.O.P.T.",
      "codigo": "308",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "Palomino - Palermo Temp",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "FAMAR",
      "codigo": "934",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ZONA BANANERA",
      "remitenteSwing": "CNE OIL & GAS SAS",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "FUNDACION",
      "codigo": "119",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ZONA BANANERA",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "GALAPA",
      "codigo": "94",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "GC GASODUCTO TERMOFLORES",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "GASCARIBE PALERMO",
      "codigo": "930",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "Palomino - Palermo Temp",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "GASCARIBE PALERMO II",
      "codigo": "394",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "PALOMINO - PALERMO - Oficial",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "GREIF SURTIGAS",
      "codigo": "210",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "MAMONAL",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "GUACAMAYAL",
      "codigo": "157",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ZONA BANANERA",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "INTERCONEXCIÓN VÍA 40",
      "codigo": "919",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "GC GASODUCTO TERMOFLORES",
      "remitenteSwing": "PROMIGAS S A E S P",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "INVERSIONES CASCABEL",
      "codigo": "211",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ARIANNA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ISABEL LOPEZ",
      "codigo": "140",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "PAIVA - CARACOLI",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "JUAN ARIAS",
      "codigo": "273",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "BONGA-MAMEY",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "JUAN DE ACOSTA",
      "codigo": "288",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "PAIVA - CARACOLI",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "JUAN MINA II",
      "codigo": "391",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "GC GASODUCTO TERMOFLORES",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "KANGUPOR",
      "codigo": "195",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "MAMONAL",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "KM0 CIENAGA SANTA MARTA",
      "codigo": "562",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ZONA BANANERA",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "KM0 DOÑA MANUELA",
      "codigo": "821",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "HEROICA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "LA CLAY",
      "codigo": "906",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ARIANNA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "LA GRAN VIA",
      "codigo": "154",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ZONA BANANERA",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "LA PUNTA DE LOS REMEDIOS",
      "codigo": "309",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "Ballena - Palomino Temp",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "LAMITECH",
      "codigo": "222",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "MAMONAL",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "LAS FLORES",
      "codigo": "311",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "Ballena - Palomino Temp",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "LORICA",
      "codigo": "247",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ARIANNA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "LURUACO",
      "codigo": "111",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "PAIVA - CARACOLI",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "MAGANGUE",
      "codigo": "271",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "BONGA-MAMEY",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "MALTERIA TROPICAL S.A.",
      "codigo": "228",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "MAMONAL",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "MAMATOCO NO. 1 Y 2",
      "codigo": "92",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "Palomino - Palermo Temp",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "MANAURE",
      "codigo": "124",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "Ballena - Palomino Temp",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "MARIA LA BAJA",
      "codigo": "233",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ARIANNA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "MENDIHUACA",
      "codigo": "132",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "Palomino - Palermo Temp",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "MERECUMBE RECIBO",
      "codigo": "334",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "PAIVA - CARACOLI",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "MEXICHEM",
      "codigo": "283",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "MAMONAL",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "MINGUEO",
      "codigo": "116",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "Ballena - Palomino Temp",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "MOLINERO",
      "codigo": "141",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "PAIVA - CARACOLI",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "MOMIL",
      "codigo": "245",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ARIANNA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "MOMPOX",
      "codigo": "278",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "BONGA-MAMEY",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "MONOMEROS COLOMBO VENEZOLANOS S.A.",
      "codigo": "34",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "GC GASODUCTO TERMOFLORES",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "MONTERIA",
      "codigo": "253",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ARIANNA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "MONTERIA SEVILLA NORTE",
      "codigo": "322",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ARIANNA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "OLEODUCTO CENTRAL",
      "codigo": "651",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ARIANNA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "ORIHUECA",
      "codigo": "155",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ZONA BANANERA",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ORO BLANCO",
      "codigo": "237",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ARIANNA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "OVEJAS",
      "codigo": "264",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "BONGA-MAMEY",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "PALERMO",
      "codigo": "298",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "PALOMINO - PALERMO - Oficial",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "PALO ALTO",
      "codigo": "436",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ARIANNA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "PALOMINO",
      "codigo": "117",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "Palomino - Palermo Temp",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "PARQUE AMÉRICA",
      "codigo": "431",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "MAMONAL",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "PEÑATA",
      "codigo": "938",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ARIANNA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "PENDALES",
      "codigo": "139",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "PAIVA - CARACOLI",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "PIMSA",
      "codigo": "102",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "GC GASODUCTO TERMOFLORES",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "PLEXA",
      "codigo": "937",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "MAMONAL",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "POLONUEVO",
      "codigo": "121",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "PAIVA - CARACOLI",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "PONEDERA",
      "codigo": "128",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "GC GASODUCTO TERMOFLORES",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "PONTEZUELA",
      "codigo": "290",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "PAIVA - CARACOLI",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "POZON 2",
      "codigo": "953",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "PAIVA - CARACOLI",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "PROELECTRICA",
      "codigo": "187",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "PROELECTRICA",
      "remitenteSwing": "PROELECTRICA & CIA S.C.A E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "PROMIGAS GUAJIRA",
      "codigo": "936",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "PROMIGAS TGI",
      "remitenteSwing": "TRANSPORTADORA DE GAS INTERNACIONAL S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "Si"
    },
    {
      "nombre": "PUERTO BRISA",
      "codigo": "513",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "BALLENA - PALOMINO - Oficial",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "PUERTO GIRALDO",
      "codigo": "148",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "GC GASODUCTO TERMOFLORES",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "PURISIMA",
      "codigo": "246",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ARIANNA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "REFICAR",
      "codigo": "565",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "REFICAR",
      "remitenteSwing": "ECOPETROL S.A.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "REPELON",
      "codigo": "145",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "PAIVA - CARACOLI",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "RIO ANCHO",
      "codigo": "310",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "Ballena - Palomino Temp",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "RIO FRIO",
      "codigo": "153",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ZONA BANANERA",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "RIOHACHA",
      "codigo": "83",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "Ballena - Palomino Temp",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "ROCHA",
      "codigo": "284",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ARIANNA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "RODADERO",
      "codigo": "79",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "Palomino - Palermo Temp",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "RUTA CARIBE",
      "codigo": "635",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "PAIVA - CARACOLI",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "SABANAGRANDE",
      "codigo": "104",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "GC GASODUCTO TERMOFLORES",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "SABANALARGA",
      "codigo": "80",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "PAIVA - CARACOLI",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "SAHAGUN",
      "codigo": "248",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ARIANNA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "SAMPUES",
      "codigo": "241",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ARIANNA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "SAN ANDRES DE SOTAVENTO",
      "codigo": "243",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ARIANNA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "SAN FRANCISCO DE LOBA",
      "codigo": "803",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "BONGA-MAMEY",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "SAN JACINTO",
      "codigo": "265",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "BONGA-MAMEY",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "SAN JUAN",
      "codigo": "266",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "BONGA-MAMEY",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "SAN MARCOS",
      "codigo": "255",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ARIANNA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "SAN ONOFRE",
      "codigo": "235",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ARIANNA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "SAN PABLO",
      "codigo": "316",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ARIANNA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "SAN PEDRO",
      "codigo": "269",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "BONGA-MAMEY",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "SANJOSE (BANANERAS)",
      "codigo": "133",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ZONA BANANERA",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "SANTA CATALINA",
      "codigo": "142",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "PAIVA - CARACOLI",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "SANTA LUCIA",
      "codigo": "146",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "GC GASODUCTO TERMOFLORES",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "SANTA MARTA 1 Y 2",
      "codigo": "84",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "Palomino - Palermo Temp",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "SANTA RITA",
      "codigo": "159",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "GC GASODUCTO TERMOFLORES",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "SANTA ROSA",
      "codigo": "147",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "PAIVA - CARACOLI",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "SANTA VERONICA",
      "codigo": "292",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "PAIVA - CARACOLI",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "SANTO TOMAS",
      "codigo": "109",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "GC GASODUCTO TERMOFLORES",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "SEATECH",
      "codigo": "199",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "MAMONAL",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "SEVILLA",
      "codigo": "156",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ZONA BANANERA",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "SINCE",
      "codigo": "270",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "BONGA-MAMEY",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "SINCELEJO CONSUMO",
      "codigo": "239",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ARIANNA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "SUAN",
      "codigo": "149",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "GC GASODUCTO TERMOFLORES",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "SURTIGAS MAMONAL",
      "codigo": "192",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "MAMONAL",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "TALAIGUA",
      "codigo": "858",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "BONGA-MAMEY",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "TALAIGUA NUEVO",
      "codigo": "277",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "BONGA-MAMEY",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "TASAJERA",
      "codigo": "321",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "Palomino - Palermo Temp",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "TEBSA",
      "codigo": "169",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "TEBSA",
      "remitenteSwing": "TERMOBARRANQUILLA S.A. E.S.P",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "TENARIS",
      "codigo": "103",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "HEROICA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "TERMO CARIBE III",
      "codigo": "952",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "PAIVA - CARACOLI",
      "remitenteSwing": "ENERGY TRANSITIONS S.A.S. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "TERMOBARRANQUILLA UNIDADES 1.2.3 Y 4",
      "codigo": "160",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "TEBSA",
      "remitenteSwing": "TERMOBARRANQUILLA S.A. E.S.P",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "TERMOCANDELARIA S.C.A. E.S.P.",
      "codigo": "170",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "TERMOCANDELARIA",
      "remitenteSwing": "TERMOCANDELARIA S.C.A E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "TERMOCARTAGENA",
      "codigo": "189",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "MAMONAL",
      "remitenteSwing": "EMGESA TCARTAGENA",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "TERMOFLORES I",
      "codigo": "376",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "TERMOFLORES",
      "remitenteSwing": "ENFRAGEN TERMOFLORES S.A.S. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "TERMOGUAJIRA KM0",
      "codigo": "613",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "BALLENA - PALOMINO - Oficial",
      "remitenteSwing": "GECELCA S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "TERMONORTE",
      "codigo": "857",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "PALOMINO - PALERMO - Oficial",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "TERNERA I",
      "codigo": "113",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "HEROICA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "TERNERA II",
      "codigo": "296",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "HEROICA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "TERNIUM",
      "codigo": "901",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "GC GASODUCTO TERMOFLORES",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "TESORITO - CELSIA",
      "codigo": "1013",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "SINU-9",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "TFLORES IV",
      "codigo": "167",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "TERMOFLORES",
      "remitenteSwing": "ENFRAGEN TERMOFLORES S.A.S. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "TOLCEMENTO",
      "codigo": "261",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ARIANNA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "TOLU",
      "codigo": "238",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ARIANNA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "TOLU VIEJO",
      "codigo": "236",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ARIANNA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "TRITURADORA LA MACUIRA",
      "codigo": "417",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "BALLENA - PALOMINO - Oficial",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "TUCURINCA RECIBO",
      "codigo": "939",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ZONA BANANERA",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "TURBACO",
      "codigo": "105",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "HEROICA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "TURBANA",
      "codigo": "234",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "ARIANNA",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "URIBE URIBE",
      "codigo": "305",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "BONGA-MAMEY",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "URIBIA",
      "codigo": "123",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "Ballena - Palomino Temp",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "USIACURI",
      "codigo": "131",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "PAIVA - CARACOLI",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ZONA FRANCA LA CANDELARIA",
      "codigo": "317",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "MAMONAL",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "ZONA FRANCA SANTA MARTA",
      "codigo": "130",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "PALOMINO - PALERMO - Oficial",
      "remitenteSwing": "GASES DEL CARIBE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ZONA FRANCA SURTIGAS",
      "codigo": "224",
      "gasoducto": "Promigas",
      "tipo": "Entrega",
      "puntoCalidad": "MAMONAL",
      "remitenteSwing": "SURTIGAS S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "BERLÍN",
      "codigo": "533",
      "gasoducto": "Promioriente",
      "tipo": "Entrega",
      "puntoCalidad": "GIBRALTAR",
      "remitenteSwing": "PROVISERVICIOS S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "CENTROABASTOS TERPEL",
      "codigo": "519",
      "gasoducto": "Promioriente",
      "tipo": "Entrega",
      "puntoCalidad": "MEZCLA",
      "remitenteSwing": "ORGANIZACION TERPEL S.A.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "CHITAGÁ",
      "codigo": "531",
      "gasoducto": "Promioriente",
      "tipo": "Entrega",
      "puntoCalidad": "GIBRALTAR",
      "remitenteSwing": "GASES DEL ORIENTE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "COGB TGI",
      "codigo": "822",
      "gasoducto": "Promioriente",
      "tipo": "Entrega",
      "puntoCalidad": "COGB TOMADO",
      "remitenteSwing": "TRANSPORTADORA DE GAS INTERNACIONAL S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "Si"
    },
    {
      "nombre": "GALAN REFINERIA",
      "codigo": "521",
      "gasoducto": "Promioriente",
      "tipo": "Entrega",
      "puntoCalidad": "Galan Refineria",
      "remitenteSwing": "ECOPETROL S.A.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "GASMOVIL SAN PABLO",
      "codigo": "518",
      "gasoducto": "Promioriente",
      "tipo": "Entrega",
      "puntoCalidad": "MEZCLA",
      "remitenteSwing": "VERA GAS SAS ESP",
      "literal008": "Literal C",
      "embebidos070": "Si"
    },
    {
      "nombre": "GIBRALTAR GO",
      "codigo": "526",
      "gasoducto": "Promioriente",
      "tipo": "Entrega",
      "puntoCalidad": "GIBRALTAR",
      "remitenteSwing": "GASES DEL ORIENTE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "LEBRIJA",
      "codigo": "931",
      "gasoducto": "Promioriente",
      "tipo": "Entrega",
      "puntoCalidad": "MEZCLA",
      "remitenteSwing": "GAS NATURAL DEL ORIENTE SOCIEDAD ANONIMA",
      "literal008": "Literal C",
      "embebidos070": "Si"
    },
    {
      "nombre": "METROGAS",
      "codigo": "524",
      "gasoducto": "Promioriente",
      "tipo": "Entrega",
      "puntoCalidad": "MEZCLA",
      "remitenteSwing": "METROGAS DE COLOMBIA S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "Si"
    },
    {
      "nombre": "METROGAS 2",
      "codigo": "956",
      "gasoducto": "Promioriente",
      "tipo": "Entrega",
      "puntoCalidad": "MEZCLA",
      "remitenteSwing": "METROGAS DE COLOMBIA S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "Si"
    },
    {
      "nombre": "PALENQUE GASORIENTE",
      "codigo": "525",
      "gasoducto": "Promioriente",
      "tipo": "Entrega",
      "puntoCalidad": "MEZCLA",
      "remitenteSwing": "GAS NATURAL DEL ORIENTE SOCIEDAD ANONIMA",
      "literal008": "Literal A",
      "embebidos070": "Si"
    },
    {
      "nombre": "PALENQUE GASORIENTE BARRANCA",
      "codigo": "892",
      "gasoducto": "Promioriente",
      "tipo": "Entrega",
      "puntoCalidad": "MEZCLA",
      "remitenteSwing": "GAS NATURAL DEL ORIENTE SOCIEDAD ANONIMA",
      "literal008": "Literal A",
      "embebidos070": "Si"
    },
    {
      "nombre": "SAMORÉ",
      "codigo": "527",
      "gasoducto": "Promioriente",
      "tipo": "Entrega",
      "puntoCalidad": "GIBRALTAR",
      "remitenteSwing": "GASES DEL ORIENTE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "SAN BERNARDO",
      "codigo": "528",
      "gasoducto": "Promioriente",
      "tipo": "Entrega",
      "puntoCalidad": "GIBRALTAR",
      "remitenteSwing": "GASES DEL ORIENTE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "SILOS",
      "codigo": "532",
      "gasoducto": "Promioriente",
      "tipo": "Entrega",
      "puntoCalidad": "GIBRALTAR",
      "remitenteSwing": "GASES DEL ORIENTE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "TANÉ PAMPLONA",
      "codigo": "530",
      "gasoducto": "Promioriente",
      "tipo": "Entrega",
      "puntoCalidad": "GIBRALTAR",
      "remitenteSwing": "GASES DEL ORIENTE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "TOLEDO LABATECA",
      "codigo": "529",
      "gasoducto": "Promioriente",
      "tipo": "Entrega",
      "puntoCalidad": "GIBRALTAR",
      "remitenteSwing": "GASES DEL ORIENTE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ALCANOS GUARNE",
      "codigo": "490",
      "gasoducto": "Transmetano",
      "tipo": "Entrega",
      "puntoCalidad": "SEBASTOPOL",
      "remitenteSwing": "ALCANOS DE COLOMBIA S.A. E.S.P",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ALCANOS GUARNE INDUSTRIAL",
      "codigo": "841",
      "gasoducto": "Transmetano",
      "tipo": "Entrega",
      "puntoCalidad": "SEBASTOPOL",
      "remitenteSwing": "ALCANOS DE COLOMBIA S.A. E.S.P",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ALCANOS RIONEGRO RESIDENCIAL",
      "codigo": "491",
      "gasoducto": "Transmetano",
      "tipo": "Entrega",
      "puntoCalidad": "SEBASTOPOL",
      "remitenteSwing": "ALCANOS DE COLOMBIA S.A. E.S.P",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "EPM BARBOSA",
      "codigo": "492",
      "gasoducto": "Transmetano",
      "tipo": "Entrega",
      "puntoCalidad": "TASAJERA",
      "remitenteSwing": "EMPRESAS PUBLICAS DE MEDELLIN E.S.P",
      "literal008": "Literal A",
      "embebidos070": "Si"
    },
    {
      "nombre": "EPM CIS",
      "codigo": "496",
      "gasoducto": "Transmetano",
      "tipo": "Entrega",
      "puntoCalidad": "TASAJERA",
      "remitenteSwing": "EMPRESAS PUBLICAS DE MEDELLIN E.S.P",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "EPM CKC",
      "codigo": "493",
      "gasoducto": "Transmetano",
      "tipo": "Entrega",
      "puntoCalidad": "TASAJERA",
      "remitenteSwing": "EMPRESAS PUBLICAS DE MEDELLIN E.S.P",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "EPM EET",
      "codigo": "494",
      "gasoducto": "Transmetano",
      "tipo": "Entrega",
      "puntoCalidad": "TASAJERA",
      "remitenteSwing": "EMPRESAS PUBLICAS DE MEDELLIN E.S.P",
      "literal008": "Literal A",
      "embebidos070": "Si"
    },
    {
      "nombre": "EPM GUARNE",
      "codigo": "502",
      "gasoducto": "Transmetano",
      "tipo": "Entrega",
      "puntoCalidad": "TASAJERA",
      "remitenteSwing": "EMPRESAS PUBLICAS DE MEDELLIN E.S.P",
      "literal008": "Literal A",
      "embebidos070": "Si"
    },
    {
      "nombre": "EPM PARQUE DE LAS AGUAS",
      "codigo": "495",
      "gasoducto": "Transmetano",
      "tipo": "Entrega",
      "puntoCalidad": "TASAJERA",
      "remitenteSwing": "EMPRESAS PUBLICAS DE MEDELLIN E.S.P",
      "literal008": "Literal A",
      "embebidos070": "Si"
    },
    {
      "nombre": "EPM PBE",
      "codigo": "497",
      "gasoducto": "Transmetano",
      "tipo": "Entrega",
      "puntoCalidad": "SEBASTOPOL",
      "remitenteSwing": "EMPRESAS PUBLICAS DE MEDELLIN E.S.P",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "EPM SAN VICENTE",
      "codigo": "605",
      "gasoducto": "Transmetano",
      "tipo": "Entrega",
      "puntoCalidad": "TASAJERA",
      "remitenteSwing": "EMPRESAS PUBLICAS DE MEDELLIN E.S.P",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "EPM SANTO DOMINGO",
      "codigo": "581",
      "gasoducto": "Transmetano",
      "tipo": "Entrega",
      "puntoCalidad": "TASAJERA",
      "remitenteSwing": "EMPRESAS PUBLICAS DE MEDELLIN E.S.P",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "EPM SJN",
      "codigo": "498",
      "gasoducto": "Transmetano",
      "tipo": "Entrega",
      "puntoCalidad": "SEBASTOPOL",
      "remitenteSwing": "EMPRESAS PUBLICAS DE MEDELLIN E.S.P",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "EUROCERAMICA",
      "codigo": "499",
      "gasoducto": "Transmetano",
      "tipo": "Entrega",
      "puntoCalidad": "SEBASTOPOL",
      "remitenteSwing": "EUROCERAMICA S.A.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "GAZEL DALLAS",
      "codigo": "500",
      "gasoducto": "Transmetano",
      "tipo": "Entrega",
      "puntoCalidad": "SEBASTOPOL",
      "remitenteSwing": "ORGANIZACION TERPEL S.A.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "MACEO",
      "codigo": "579",
      "gasoducto": "Transmetano",
      "tipo": "Entrega",
      "puntoCalidad": "SEBASTOPOL",
      "remitenteSwing": "EMPRESAS PUBLICAS DE MEDELLIN E.S.P",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "YOLOMBÓ",
      "codigo": "580",
      "gasoducto": "Transmetano",
      "tipo": "Entrega",
      "puntoCalidad": "TASAJERA",
      "remitenteSwing": "EMPRESAS PUBLICAS DE MEDELLIN E.S.P",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ACOPI KRA 35",
      "codigo": "1010",
      "gasoducto": "Transoccidente",
      "tipo": "Entrega",
      "puntoCalidad": "CG_Yumbo_Cali",
      "remitenteSwing": "GASES DE OCCIDENTE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ACOPI KRA 37",
      "codigo": "686",
      "gasoducto": "Transoccidente",
      "tipo": "Entrega",
      "puntoCalidad": "CG_Yumbo_Cali",
      "remitenteSwing": "GASES DE OCCIDENTE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ALUMINA",
      "codigo": "617",
      "gasoducto": "Transoccidente",
      "tipo": "Entrega",
      "puntoCalidad": "CG_Yumbo_Cali",
      "remitenteSwing": "GASES DE OCCIDENTE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "ARGOS GDO",
      "codigo": "618",
      "gasoducto": "Transoccidente",
      "tipo": "Entrega",
      "puntoCalidad": "CG_Yumbo_Cali",
      "remitenteSwing": "GASES DE OCCIDENTE S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "CARTONES DE AMERICA",
      "codigo": "619",
      "gasoducto": "Transoccidente",
      "tipo": "Entrega",
      "puntoCalidad": "CG_Yumbo_Cali",
      "remitenteSwing": "GASES DE OCCIDENTE S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "ESTACION ACOPI",
      "codigo": "620",
      "gasoducto": "Transoccidente",
      "tipo": "Entrega",
      "puntoCalidad": "CG_Yumbo_Cali",
      "remitenteSwing": "GASES DE OCCIDENTE S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "GASES DE OCCIDENTE",
      "codigo": "621",
      "gasoducto": "Transoccidente",
      "tipo": "Entrega",
      "puntoCalidad": "CG_Yumbo_Cali",
      "remitenteSwing": "GASES DE OCCIDENTE S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "GNCV MAC",
      "codigo": "622",
      "gasoducto": "Transoccidente",
      "tipo": "Entrega",
      "puntoCalidad": "CG_Yumbo_Cali",
      "remitenteSwing": "GASES DE OCCIDENTE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "GNCV PACARA",
      "codigo": "624",
      "gasoducto": "Transoccidente",
      "tipo": "Entrega",
      "puntoCalidad": "CG_Yumbo_Cali",
      "remitenteSwing": "GASES DE OCCIDENTE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "GNCV PETROLGAS",
      "codigo": "623",
      "gasoducto": "Transoccidente",
      "tipo": "Entrega",
      "puntoCalidad": "CG_Yumbo_Cali",
      "remitenteSwing": "GASES DE OCCIDENTE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "GNCV SAN JOSE",
      "codigo": "627",
      "gasoducto": "Transoccidente",
      "tipo": "Entrega",
      "puntoCalidad": "CG_Yumbo_Cali",
      "remitenteSwing": "GASES DE OCCIDENTE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "GOODYEAR",
      "codigo": "628",
      "gasoducto": "Transoccidente",
      "tipo": "Entrega",
      "puntoCalidad": "CG_Yumbo_Cali",
      "remitenteSwing": "GASES DE OCCIDENTE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    },
    {
      "nombre": "LLOREDA GRASAS GDO",
      "codigo": "629",
      "gasoducto": "Transoccidente",
      "tipo": "Entrega",
      "puntoCalidad": "CG_Yumbo_Cali",
      "remitenteSwing": "GASES DE OCCIDENTE S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "PROPAL",
      "codigo": "630",
      "gasoducto": "Transoccidente",
      "tipo": "Entrega",
      "puntoCalidad": "CG_Yumbo_Cali",
      "remitenteSwing": "GASES DE OCCIDENTE S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "SMURFIT CARTON COLOMBIA GDO",
      "codigo": "631",
      "gasoducto": "Transoccidente",
      "tipo": "Entrega",
      "puntoCalidad": "CG_Yumbo_Cali",
      "remitenteSwing": "GASES DE OCCIDENTE S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "YUMBO INDUSTRIAL",
      "codigo": "632",
      "gasoducto": "Transoccidente",
      "tipo": "Entrega",
      "puntoCalidad": "CG_Yumbo_Cali",
      "remitenteSwing": "GASES DE OCCIDENTE S.A. E.S.P.",
      "literal008": "Literal A",
      "embebidos070": "No"
    },
    {
      "nombre": "YUMBO RESIDENCIAL",
      "codigo": "633",
      "gasoducto": "Transoccidente",
      "tipo": "Entrega",
      "puntoCalidad": "CG_Yumbo_Cali",
      "remitenteSwing": "GASES DE OCCIDENTE S.A. E.S.P.",
      "literal008": "Literal C",
      "embebidos070": "No"
    }
  ]
,
  "puntosSuministro": [
  {
    "nombre": "ARIANNA",
    "codigo": "896",
    "gasoducto": "Promigas"
  },
  {
    "nombre": "BALLENA",
    "codigo": "19",
    "gasoducto": "Promigas"
  },
  {
    "nombre": "BREMEN JOBO",
    "codigo": "800",
    "gasoducto": "Promigas"
  },
  {
    "nombre": "BULLERENGUE",
    "codigo": "568",
    "gasoducto": "Promigas"
  },
  {
    "nombre": "HOCOL",
    "codigo": "588",
    "gasoducto": "Promigas"
  },
  {
    "nombre": "LA CRECIENTE",
    "codigo": "461",
    "gasoducto": "Promigas"
  },
  {
    "nombre": "MERECUMBÉ",
    "codigo": "902",
    "gasoducto": "Promigas"
  },
  {
    "nombre": "PLANTA LNG",
    "codigo": "589",
    "gasoducto": "Promigas"
  },
  {
    "nombre": "Sinu-9",
    "codigo": "963",
    "gasoducto": "Promigas"
  },
  {
    "nombre": "TGI GUAJIRA",
    "codigo": "897",
    "gasoducto": "Promigas"
  },
  {
    "nombre": "TUCURINCA",
    "codigo": "561",
    "gasoducto": "Promigas"
  },
  {
    "nombre": "COGB",
    "codigo": "541",
    "gasoducto": "Promioriente"
  },
  {
    "nombre": "GIBRALTAR",
    "codigo": "540",
    "gasoducto": "Promioriente"
  },
  {
    "nombre": "SEBASTOPOL",
    "codigo": "506",
    "gasoducto": "Transmetano"
  },
  {
    "nombre": "CG YUMBO CALI",
    "codigo": "634",
    "gasoducto": "Transoccidente"
  },
  {
    "nombre": "BARRANQUILLA",
    "codigo": "10001",
    "gasoducto": "Promigas"
  },
  {
    "nombre": "CARTAGENA",
    "codigo": "10002",
    "gasoducto": "Promigas"
  },
  {
    "nombre": "LA MAMI",
    "codigo": "10000",
    "gasoducto": "Promigas"
  },
  {
    "nombre": "SINCELEJO",
    "codigo": "10003",
    "gasoducto": "Promigas"
  },
  {
    "nombre": "BUCARAMANGA",
    "codigo": "10005",
    "gasoducto": "Promioriente"
  }
],
  "organizaciones": [
  {
    "nombre": "PROMIGAS S A E S P",
    "codigo": "PROMIGAS",
    "tipo": "Transportador"
  },
  {
    "nombre": "PROMIORIENTE S.A E.S.P.",
    "codigo": "PROMIORIENTE",
    "tipo": "Transportador"
  },
  {
    "nombre": "TRANSMETANO E.S.P. S.A.",
    "codigo": "TRANSMETANO",
    "tipo": "Transportador"
  },
  {
    "nombre": "TRANSOCCIDENTE S.A E.S.P.",
    "codigo": "TRANSOCCIDENTE",
    "tipo": "Transportador"
  },
  {
    "nombre": "ALCANOS DE COLOMBIA S.A. E.S.P",
    "codigo": "ALCANOS",
    "tipo": "Agente"
  },
  {
    "nombre": "CABOT COLOMBIANA S.A.",
    "codigo": "CABOT",
    "tipo": "Agente"
  },
  {
    "nombre": "CALAMARI LNG S.A. E.S.P.",
    "codigo": "CALAMARI",
    "tipo": "Agente"
  },
  {
    "nombre": "CANACOL ENERGY COLOMBIA SAS",
    "codigo": "CANACOL",
    "tipo": "Agente"
  },
  {
    "nombre": "CELSIA S.A. E.S.P.",
    "codigo": "CELSIA",
    "tipo": "Agente"
  },
  {
    "nombre": "CEMENTOS ARGOS S.A",
    "codigo": "CEMENTOS ARGOS",
    "tipo": "Agente"
  },
  {
    "nombre": "CERROMATOSO S.A.",
    "codigo": "CERROMATOSO",
    "tipo": "Agente"
  },
  {
    "nombre": "CHEVRON PETROLEUM COMPANY",
    "codigo": "ChevronTexaco",
    "tipo": "Agente"
  },
  {
    "nombre": "CNE MIDSTREAM S.A. E.S.P.",
    "codigo": "CNE MIDSTREAM",
    "tipo": "Agente"
  },
  {
    "nombre": "COGASEN S.A.S E.S.P.",
    "codigo": "GASMOVIL",
    "tipo": "Agente"
  },
  {
    "nombre": "COLOMBIANA KIMBERLY COLPAPEL",
    "codigo": "CKC",
    "tipo": "Agente"
  },
  {
    "nombre": "CORPORACIÓN ELECTRICA DE LA COSTA S.A.",
    "codigo": "CORELCA",
    "tipo": "Agente"
  },
  {
    "nombre": "E2 - ENERGÍA EFICIENTE S.A. E.S.P.",
    "codigo": "E2",
    "tipo": "Agente"
  },
  {
    "nombre": "ECOPETROL S.A.",
    "codigo": "ECOPETROL",
    "tipo": "Agente"
  },
  {
    "nombre": "EMGESA TCARTAGENA",
    "codigo": "TCGENA",
    "tipo": "Agente"
  },
  {
    "nombre": "EMPRESAS PUBLICAS DE MEDELLIN E.S.P",
    "codigo": "EPM",
    "tipo": "Agente"
  },
  {
    "nombre": "ENEL S.A.E.S.P.",
    "codigo": "ENEL",
    "tipo": "Agente"
  },
  {
    "nombre": "ENERGÍAS DE LA SIERRA S.A.S E.S.P",
    "codigo": "E SIERRA",
    "tipo": "Agente"
  },
  {
    "nombre": "ENERGY FOR THE CARIBBEAN SAS ESP",
    "codigo": "EFC",
    "tipo": "Agente"
  },
  {
    "nombre": "ENERGY TRANSITIONS S.A.S. E.S.P.",
    "codigo": "ET",
    "tipo": "Agente"
  },
  {
    "nombre": "EUROCERAMICA S.A.",
    "codigo": "EUROCERAMICA",
    "tipo": "Agente"
  },
  {
    "nombre": "FRONTERA ENERGY CORP",
    "codigo": "FRONTERA",
    "tipo": "Agente"
  },
  {
    "nombre": "GAS NATURAL DEL CESAR SA",
    "codigo": "GASNACER",
    "tipo": "Agente"
  },
  {
    "nombre": "GAS NATURAL DEL ORIENTE SOCIEDAD ANONIMA",
    "codigo": "GASNATORIENTE",
    "tipo": "Agente"
  },
  {
    "nombre": "GAS NATURAL VANTI S.A.S.",
    "codigo": "VANTI",
    "tipo": "Agente"
  },
  {
    "nombre": "GASES DE OCCIDENTE S.A. E.S.P.",
    "codigo": "GASES DE OCCIDENTE",
    "tipo": "Agente"
  },
  {
    "nombre": "GASES DEL CARIBE S.A. E.S.P.",
    "codigo": "GASCARIBE",
    "tipo": "Agente"
  },
  {
    "nombre": "GASES DEL ORIENTE S.A. E.S.P.",
    "codigo": "GASORIENTE",
    "tipo": "Agente"
  },
  {
    "nombre": "GECELCA S.A. E.S.P.",
    "codigo": "GECELCA",
    "tipo": "Agente"
  },
  {
    "nombre": "GENERARCO S.A.S. E.S.P.",
    "codigo": "GENERARCO",
    "tipo": "Agente"
  },
  {
    "nombre": "GRAN TIERRA ENERGY COLOMBIA",
    "codigo": "GRAN TIERRA",
    "tipo": "Agente"
  },
  {
    "nombre": "GRUPO ENERGETICO DE LAS AMERICAS S.A.S E.S.P",
    "codigo": "GEAM",
    "tipo": "Agente"
  },
  {
    "nombre": "GRUPO ENERGETICO S.A. E.S.P.",
    "codigo": "GRUPO ENERGETICO",
    "tipo": "Agente"
  },
  {
    "nombre": "HOCOL S.A.",
    "codigo": "HOCOL",
    "tipo": "Agente"
  },
  {
    "nombre": "HOLYGAS S.A.S. E.S.P.",
    "codigo": "HOLYGAS",
    "tipo": "Agente"
  },
  {
    "nombre": "KRONOS ENERGY S.A. E.S.P.",
    "codigo": "KRONOS",
    "tipo": "Agente"
  },
  {
    "nombre": "LEWIS ENERGY COLOMBIA INC.",
    "codigo": "LEWIS",
    "tipo": "Agente"
  },
  {
    "nombre": "LUMINA ENERGY S.A.S. E.S.P.",
    "codigo": "LUMINA",
    "tipo": "Agente"
  },
  {
    "nombre": "MALTERIA TROPICAL S.A.",
    "codigo": "MALTERIA",
    "tipo": "Agente"
  },
  {
    "nombre": "METROGAS DE COLOMBIA S.A. E.S.P.",
    "codigo": "METROGAS",
    "tipo": "Agente"
  },
  {
    "nombre": "MEXICHEM RESINAS COLOMBIA S.A.S.",
    "codigo": "MEXICHEM",
    "tipo": "Agente"
  },
  {
    "nombre": "MKMS Enerji Sucursal Colombia",
    "codigo": "MKMS Enerji",
    "tipo": "Agente"
  },
  {
    "nombre": "Organizacion A",
    "codigo": "DELETE01",
    "tipo": "Agente"
  },
  {
    "nombre": "ORGANIZACION B",
    "codigo": "DELETE02",
    "tipo": "Agente"
  },
  {
    "nombre": "ORGANIZACION TERPEL S.A.",
    "codigo": "GAZEL",
    "tipo": "Agente"
  },
  {
    "nombre": "PACIFIC STRATUS ENERGY LTD.",
    "codigo": "PACIFIC",
    "tipo": "Agente"
  },
  {
    "nombre": "PETROMIL GAS S.A.S.",
    "codigo": "PETROMIL GAS",
    "tipo": "Agente"
  },
  {
    "nombre": "PLEXA S.A.S. E.S.P.",
    "codigo": "PLEXA",
    "tipo": "Agente"
  },
  {
    "nombre": "PRIME TERMOFLORES S.A. E.S.P.",
    "codigo": "PRIME",
    "tipo": "Agente"
  },
  {
    "nombre": "PRIME TERMOVALLE S.A.S E.S.P",
    "codigo": "TERMOVALLE",
    "tipo": "Agente"
  },
  {
    "nombre": "PROELECTRICA & CIA S.C.A E.S.P.",
    "codigo": "PROELECTRICA",
    "tipo": "Agente"
  },
  {
    "nombre": "PROMOTORA DE GASES DEL SUR S.A. E.S.P.",
    "codigo": "PROGASUR",
    "tipo": "Agente"
  },
  {
    "nombre": "PROVISERVICIOS S.A. E.S.P.",
    "codigo": "PROVISERVICIOS",
    "tipo": "Agente"
  },
  {
    "nombre": "Pruebas SAT",
    "codigo": "DELETE03",
    "tipo": "Agente"
  },
  {
    "nombre": "ROTOPLAST S.A.",
    "codigo": "ROTOPLAST",
    "tipo": "Agente"
  },
  {
    "nombre": "SENCO COLOMBIA S.A.S.",
    "codigo": "SENCO",
    "tipo": "Agente"
  },
  {
    "nombre": "SMURFIT KAPPA COLOMBIA",
    "codigo": "SMURFIT KAPPA",
    "tipo": "Agente"
  },
  {
    "nombre": "SOCIEDAD PORTUARIA EL CAYAO S.A. E.S.P.",
    "codigo": "SPEC LNG",
    "tipo": "Agente"
  },
  {
    "nombre": "SURTIGAS S.A. E.S.P.",
    "codigo": "SURTIGAS",
    "tipo": "Agente"
  },
  {
    "nombre": "SURTISEP S.A. E.S.P.",
    "codigo": "SSEP",
    "tipo": "Agente"
  },
  {
    "nombre": "TERMO CARIBE S.A.S. E.S.P.",
    "codigo": "TERMOCARIBE",
    "tipo": "Agente"
  },
  {
    "nombre": "TERMOBARRANQUILLA S.A. E.S.P",
    "codigo": "TEBSA",
    "tipo": "Agente"
  },
  {
    "nombre": "TERMOCANDELARIA S.C.A E.S.P.",
    "codigo": "TERMOCANDELARIA",
    "tipo": "Agente"
  },
  {
    "nombre": "TERMOEMCALI S.A. E.S.P.",
    "codigo": "TERMOEMCALI",
    "tipo": "Agente"
  },
  {
    "nombre": "TERPEL ENERGIA S.A.S. E.S.P.",
    "codigo": "TERPEL ENERGIA",
    "tipo": "Agente"
  },
  {
    "nombre": "TRANSPORTADORA DE GAS INTERNACIONAL S.A. E.S.P.",
    "codigo": "TGI",
    "tipo": "Agente"
  },
  {
    "nombre": "TRANSPORTADORA ELECTRICA DEL CARIBE S.A.S. E.S.P",
    "codigo": "TRELCA",
    "tipo": "Agente"
  },
  {
    "nombre": "VP INGENERGIA S.A. E.S.P.",
    "codigo": "VP SA",
    "tipo": "Agente"
  },
  {
    "nombre": "YARA COLOMBIA S.A.S & CIA S.C.A.",
    "codigo": "ABOCOL",
    "tipo": "Agente"
  },
  {
    "nombre": "Maurel & Prom",
    "codigo": "Maurel & Prom",
    "tipo": "Agente"
  }
],
  "contratos": [
  "P-GEAM-CI-2026-005",
  "P-GEAM-CI-2024-007",
  "P-GEAM-CI-2024-008",
  "P-GEAM-CF-2025-001"
],
  "plantillaNominaciones": [
  {
    "tipo": "Compra",
    "punto": "CARTAGENA",
    "puntoCod": "10002",
    "comprador": "GRUPO ENERGETICO DE LAS AMERICAS S.A.S E.S.P",
    "compradorCod": "GEAM",
    "vendedor": "CANACOL ENERGY COLOMBIA SAS",
    "vendedorCod": "CANACOL",
    "cantidad": 0,
    "unidad": "MBTU"
  },
  {
    "tipo": "Venta",
    "punto": "CARTAGENA",
    "puntoCod": "10002",
    "comprador": "SURTIGAS S.A. E.S.P.",
    "compradorCod": "SURTIGAS",
    "vendedor": "GRUPO ENERGETICO DE LAS AMERICAS S.A.S E.S.P",
    "vendedorCod": "GEAM",
    "cantidad": 0,
    "unidad": "MBTU"
  },
  {
    "tipo": "Compra",
    "punto": "LA MAMI",
    "puntoCod": "10000",
    "comprador": "GRUPO ENERGETICO DE LAS AMERICAS S.A.S E.S.P",
    "compradorCod": "GEAM",
    "vendedor": "CANACOL ENERGY COLOMBIA SAS",
    "vendedorCod": "CANACOL",
    "cantidad": 1294,
    "unidad": "MBTU"
  },
  {
    "tipo": "Venta",
    "punto": "LA MAMI",
    "puntoCod": "10000",
    "comprador": "GAS NATURAL VANTI S.A.S.",
    "compradorCod": "VANTI",
    "vendedor": "GRUPO ENERGETICO DE LAS AMERICAS S.A.S E.S.P",
    "vendedorCod": "GEAM",
    "cantidad": 1294,
    "unidad": "MBTU"
  },
  {
    "tipo": "Compra",
    "punto": "Sinu-9",
    "puntoCod": "963",
    "comprador": "GRUPO ENERGETICO DE LAS AMERICAS S.A.S E.S.P",
    "compradorCod": "GEAM",
    "vendedor": "Maurel & Prom",
    "vendedorCod": "Maurel & Prom",
    "cantidad": 15000,
    "unidad": "MBTU"
  },
  {
    "tipo": "Venta",
    "punto": "Sinu-9",
    "puntoCod": "963",
    "comprador": "GASES DEL CARIBE S.A. E.S.P.",
    "compradorCod": "GASCARIBE",
    "vendedor": "GRUPO ENERGETICO DE LAS AMERICAS S.A.S E.S.P",
    "vendedorCod": "GEAM",
    "cantidad": 5000,
    "unidad": "MBTU"
  },
  {
    "tipo": "Venta",
    "punto": "Sinu-9",
    "puntoCod": "963",
    "comprador": "SURTIGAS S.A. E.S.P.",
    "compradorCod": "SURTIGAS",
    "vendedor": "GRUPO ENERGETICO DE LAS AMERICAS S.A.S E.S.P",
    "vendedorCod": "GEAM",
    "cantidad": 5000,
    "unidad": "MBTU"
  },
  {
    "tipo": "Compra",
    "punto": "BARRANQUILLA",
    "puntoCod": "10001",
    "comprador": "GRUPO ENERGETICO DE LAS AMERICAS S.A.S E.S.P",
    "compradorCod": "GEAM",
    "vendedor": "CANACOL ENERGY COLOMBIA SAS",
    "vendedorCod": "CANACOL",
    "cantidad": 0,
    "unidad": "MBTU"
  },
  {
    "tipo": "Venta",
    "punto": "BARRANQUILLA",
    "puntoCod": "10001",
    "comprador": "GAS NATURAL VANTI S.A.S.",
    "compradorCod": "VANTI",
    "vendedor": "GRUPO ENERGETICO DE LAS AMERICAS S.A.S E.S.P",
    "vendedorCod": "GEAM",
    "cantidad": 0,
    "unidad": "MBTU"
  },
  {
    "tipo": "Compra",
    "punto": "BALLENA",
    "puntoCod": "19",
    "comprador": "GRUPO ENERGETICO DE LAS AMERICAS S.A.S E.S.P",
    "compradorCod": "GEAM",
    "vendedor": "HOCOL S.A.",
    "vendedorCod": "HOCOL",
    "cantidad": 0,
    "unidad": "MBTU"
  },
  {
    "tipo": "Venta",
    "punto": "BALLENA",
    "puntoCod": "19",
    "comprador": "PETROMIL GAS S.A.S.",
    "compradorCod": "PETROMIL GAS",
    "vendedor": "GRUPO ENERGETICO DE LAS AMERICAS S.A.S E.S.P",
    "vendedorCod": "GEAM",
    "cantidad": 0,
    "unidad": "MBTU"
  },
  {
    "tipo": "Venta",
    "punto": "BALLENA",
    "puntoCod": "19",
    "comprador": "GASES DEL CARIBE S.A. E.S.P.",
    "compradorCod": "GASCARIBE",
    "vendedor": "GRUPO ENERGETICO DE LAS AMERICAS S.A.S E.S.P",
    "vendedorCod": "GEAM",
    "cantidad": 0,
    "unidad": "MBTU"
  },
  {
    "tipo": "Venta",
    "punto": "Sinu-9",
    "puntoCod": "963",
    "comprador": "EMPRESAS PUBLICAS DE MEDELLIN E.S.P",
    "compradorCod": "EPM",
    "vendedor": "GRUPO ENERGETICO DE LAS AMERICAS S.A.S E.S.P",
    "vendedorCod": "GEAM",
    "cantidad": 5000,
    "unidad": "MBTU"
  },
  {
    "tipo": "Compra",
    "punto": "CARTAGENA",
    "puntoCod": "10002",
    "comprador": "GRUPO ENERGETICO DE LAS AMERICAS S.A.S E.S.P",
    "compradorCod": "GEAM",
    "vendedor": "SURTIGAS S.A. E.S.P.",
    "vendedorCod": "SURTIGAS",
    "cantidad": 0,
    "unidad": "MBTU"
  },
  {
    "tipo": "Compra",
    "punto": "CARTAGENA",
    "puntoCod": "10002",
    "comprador": "GRUPO ENERGETICO DE LAS AMERICAS S.A.S E.S.P",
    "compradorCod": "GEAM",
    "vendedor": "GASES DEL CARIBE S.A. E.S.P.",
    "vendedorCod": "GASCARIBE",
    "cantidad": 0,
    "unidad": "MBTU"
  }
]
};

if (typeof window !== 'undefined') {
  window.PROMIGAS_DATA = PROMIGAS_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PROMIGAS_DATA;
}
