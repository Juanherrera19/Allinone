with open(r'c:\EXPORTADO\EJECUCION\GEAM\COMPRA\20261026.csv', 'r', encoding='utf-8') as f:
    target_base = f.read().strip().replace('\r\n', '\n')

with open(r'c:\EXPORTADO\EJECUCION\GEAM\COMPRA\20261026_UF.csv', 'r', encoding='utf-8') as f:
    target_uf = f.read().strip().replace('\r\n', '\n')

# Let's inspect each line
print("Target Base lines:")
for l in target_base.split('\n'):
    print(" ", l)

print("Target UF lines:")
for l in target_uf.split('\n'):
    print(" ", l)
