# If you need to remove some of the fonts in google_fonts_list.json, this script adjust the sequential id's

import json

import json
from datetime import datetime

# Carica i font da escludere
with open("./src/assets/excluded_fonts.json", 'r') as excluded_fonts_file:
    excluded_fonts_data = json.load(excluded_fonts_file)

# Assicurati che `excludedFonts` sia una lista
excludedFonts = excluded_fonts_data.get("excludedFonts", [])
if not isinstance(excludedFonts, list):
    print("Il file excluded_fonts.json non contiene una lista valida nella chiave 'excludedFonts'.")
    exit()

# Carica il file dei font
try:
    with open('./src/assets/google_fonts_list.json', 'r') as f:
        data = json.load(f)
except FileNotFoundError:
    print("Il file google_fonts_list.json non esiste.")
    exit()
except json.JSONDecodeError:
    print("Il file google_fonts_list.json non è un file JSON valido.")
    exit()

# Verifica che la chiave `fonts` contenga una lista
if 'fonts' not in data or not isinstance(data['fonts'], list):
    print("Il JSON non contiene la chiave 'fonts' o 'fonts' non è una lista.")
    exit()

# Filtra i font da escludere
filtered_fonts = [
    font for font in data['fonts']
    if font.get('name', '').strip() not in excludedFonts
]

# Riassegna gli ID ai font rimanenti
for new_id, font in enumerate(filtered_fonts, start=1):
    font['id'] = new_id

# Aggiorna la data al formato corrente
data['date'] = datetime.now().strftime("%d %b %Y")

# Aggiorna il dato nel JSON con i font filtrati
data['fonts'] = filtered_fonts

# Salva il JSON modificato
with open('./src/assets/google_fonts_list.json', 'w') as f:
    json.dump(data, f, indent=4)

print(f"Font esclusi e JSON aggiornato con successo!\nTotale font: {len(filtered_fonts)}")



