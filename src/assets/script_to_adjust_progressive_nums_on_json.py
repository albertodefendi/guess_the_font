# If you need to remove some of the fonts in google_fonts_list.json, this script adjust the sequential id's

import json

# Elenco dei font da escludere
excludedFonts = ["Abhaya Libre", "Shippori Mincho", "Shippori Mincho B1", "Shippori Antique", "Shippori Antique B1", "Sumana", "Hind", "Athiti", "Gowun Dodum", "Tajawal", "Nuosu SIL", "Molle", "Buda"]

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

# Filtra i font da escludere
filtered_fonts = [font for font in data['fonts'] if font.get('name') not in excludedFonts]

# Riassegna gli ID ai font rimanenti
for new_id, font in enumerate(filtered_fonts, start=1):
    font['id'] = new_id

# Aggiorna il dato nel JSON
data['fonts'] = filtered_fonts

# Salva il JSON modificato in un nuovo file
with open('./src/assets/google_fonts_list.json', 'w') as f:
    json.dump(data, f, indent=4)

print("Font esclusi e JSON aggiornato con successo!")

