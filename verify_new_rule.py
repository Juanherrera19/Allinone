import json

# Test the algorithm with L2 = 10000, L11 = 2800
L2 = 10000
L11 = 2800
fecha_slash = "2026/10/26"

# Contracts definitions
# GC_SURTI MAUREL (sorted descending by capacity):
# 173076: cap 4000
# 173082: cap 1500
# 173079: cap 600
# GC_SURTI MKMS (sorted descending by capacity):
# 173080: cap 2800
# 173077: cap 1100

# EPM MAUREL (sorted descending by capacity):
# 173066: cap 2000
# 173072: cap 750
# 173069: cap 300
# EPM MKMS (sorted descending by capacity):
# 173070: cap 1400
# 173067: cap 550

contracts = [
    # GC / Surti
    {"id": 173076, "empresa": "MAUREL", "operacion": 103123, "punto": "sinu-9", "cod_punto": 495, "cap": 4000, "precio": 6.13, "grupo": "GC_SURTI"},
    {"id": 173077, "empresa": "MKMS", "operacion": 103123, "punto": "sinu-9", "cod_punto": 495, "cap": 1100, "precio": 6.13, "grupo": "GC_SURTI"},
    {"id": 173079, "empresa": "MAUREL", "operacion": 103340, "punto": "sinu-9", "cod_punto": 495, "cap": 600, "precio": 6.13, "grupo": "GC_SURTI"},
    {"id": 173080, "empresa": "MKMS", "operacion": 103340, "punto": "sinu-9", "cod_punto": 495, "cap": 2800, "precio": 6.13, "grupo": "GC_SURTI"},
    {"id": 173082, "empresa": "MAUREL", "operacion": 103340, "punto": "sinu-9", "cod_punto": 495, "cap": 1500, "precio": 6.13, "grupo": "GC_SURTI"},
    # EPM
    {"id": 173066, "empresa": "MAUREL", "operacion": 103120, "punto": "sinu-9", "cod_punto": 495, "cap": 2000, "precio": 9.27, "grupo": "EPM"},
    {"id": 173067, "empresa": "MKMS", "operacion": 103120, "punto": "sinu-9", "cod_punto": 495, "cap": 550, "precio": 9.27, "grupo": "EPM"},
    {"id": 173070, "empresa": "MKMS", "operacion": 103230, "punto": "sinu-9", "cod_punto": 495, "cap": 1400, "precio": 9.27, "grupo": "EPM"},
    {"id": 173072, "empresa": "MAUREL", "operacion": 103230, "punto": "sinu-9", "cod_punto": 495, "cap": 750, "precio": 9.27, "grupo": "EPM"},
    {"id": 173069, "empresa": "MAUREL", "operacion": 103230, "punto": "sinu-9", "cod_punto": 495, "cap": 300, "precio": 9.27, "grupo": "EPM"},
]

def allocate_group(contracts_group, total_group):
    target_maurel = round(total_group * 0.61, 2)
    target_mkms = round(total_group * 0.39, 2)
    
    # Separate and sort descending by capacity
    maurel = sorted([c for c in contracts_group if c['empresa'] == 'MAUREL'], key=lambda x: x['cap'], reverse=True)
    mkms = sorted([c for c in contracts_group if c['empresa'] == 'MKMS'], key=lambda x: x['cap'], reverse=True)
    
    rem_m = target_maurel
    for c in maurel:
        alloc = min(c['cap'], rem_m)
        c['qty'] = alloc
        rem_m -= alloc
        
    rem_k = target_mkms
    for c in mkms:
        alloc = min(c['cap'], rem_k)
        c['qty'] = alloc
        rem_k -= alloc

gc_contracts = [c for c in contracts if c['grupo'] == 'GC_SURTI']
epm_contracts = [c for c in contracts if c['grupo'] == 'EPM']

allocate_group(gc_contracts, L2)
allocate_group(epm_contracts, L11)

# Notice we preserve the original display order of contracts in the spreadsheet:
# GC: 173076, 173077, 173079, 173080, 173082
# EPM: 173066, 173067, 173070, 173072, 173069
# Filter only those with qty > 0:
active_contracts = [c for c in contracts if c.get('qty', 0) > 0]

print("Active contracts count:", len(active_contracts))
consecutivo = 0
base_lines = []
uf_lines = []

# For UF in GC:
c1_qty = next((c['qty'] for c in contracts if c['id'] == 173076), 0)
c2_qty = next((c['qty'] for c in contracts if c['id'] == 173077), 0)
c3_qty = next((c['qty'] for c in contracts if c['id'] == 173079), 0)
c4_qty = next((c['qty'] for c in contracts if c['id'] == 173080), 0)
c5_qty = next((c['qty'] for c in contracts if c['id'] == 173082), 0)

target_cartagena = L2 * 0.50
cartagena_others = c3_qty + c4_qty + c5_qty
c1_cartagena = max(0, min(c1_qty, target_cartagena - cartagena_others))
c1_lamami = c1_qty - c1_cartagena

for c in active_contracts:
    consecutivo += 1
    val_fact = round(c['qty'] * c['precio'], 2)
    val_str = f"{val_fact:g}"
    base_lines.append(f"{consecutivo},{c['id']},{fecha_slash},{c['cod_punto']},{c['qty']},{val_str}")
    
    if c['id'] == 173076:
        if c1_lamami > 0:
            uf_lines.append(f"{consecutivo},2,2,993,890101691,0,{c1_lamami:g}")
        if c1_cartagena > 0:
            uf_lines.append(f"{consecutivo},2,2,992,890400869,0,{c1_cartagena:g}")
    elif c['id'] == 173077:
        uf_lines.append(f"{consecutivo},2,2,993,890101691,0,{c['qty']:g}")
    elif c['id'] in [173079, 173080, 173082]:
        uf_lines.append(f"{consecutivo},2,2,992,890400869,0,{c['qty']:g}")
    elif c['grupo'] == 'EPM':
        uf_lines.append(f"{consecutivo},2,2,993,890904996,0,{c['qty']:g}")

gen_base = "\n".join(base_lines)
gen_uf = "\n".join(uf_lines)

print("--- GENERATED COMPRA BASE ---")
print(gen_base)
print("\n--- GENERATED COMPRA UF ---")
print(gen_uf)

# Now compare with files on disk
with open(r'c:\EXPORTADO\EJECUCION\GEAM\COMPRA\20261026.csv', 'r', encoding='utf-8') as f:
    target_base = f.read().strip().replace('\r\n', '\n')

with open(r'c:\EXPORTADO\EJECUCION\GEAM\COMPRA\20261026_UF.csv', 'r', encoding='utf-8') as f:
    target_uf = f.read().strip().replace('\r\n', '\n')

assert gen_base == target_base, "Base mismatch!\n" + gen_base + "\nVS\n" + target_base
assert gen_uf == target_uf, "UF mismatch!\n" + gen_uf + "\nVS\n" + target_uf
print("\nMATCH IS 100% IDENTICAL TO USER FILES!")
