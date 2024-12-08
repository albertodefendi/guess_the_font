# If you need to remove some of the fonts in google_fonts_list.json, this script adjust the sequential id's

import json

# Carica il JSON da un file
try:
    with open('./src/assets/google_fonts_list.json', 'r') as f:
        data = json.load(f)
except FileNotFoundError:
    print("Il file google_fonts_list.json non esiste.")
    exit()
except json.JSONDecodeError:
    print("Il file google_fonts_list.json non è un file JSON valido.")
    exit()

# Verifica se la chiave 'fonts' esiste e contiene una lista
if 'fonts' not in data or not isinstance(data['fonts'], list):
    print("Il JSON non contiene la chiave 'fonts' o 'fonts' non è una lista.")
    exit()

# ID di partenza (dopo 1396)
new_id = 1

# Accedi alla lista di font
fonts = data['fonts']

# Riassegna gli ID
for item in fonts:
    if isinstance(item, dict) and 'id' in item:
        # Riassegna l'ID
        item['id'] = new_id
        new_id += 1

# Salva il JSON modificato in un nuovo file
with open('modified_data.json', 'w') as f:
    json.dump(data, f, indent=4)

print("JSON modificato e salvato con successo!")
