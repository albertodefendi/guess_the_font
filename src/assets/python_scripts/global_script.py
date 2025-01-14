import json
from datetime import datetime



# ! Generate google_fonts_list.json while filtering and correcting names
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
    with open('./src/assets/google_fonts_list.json', 'r', encoding='utf-8') as f:
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

# Carica il file dei font modificati
try:
    with open('./src/assets/modified_fonts.json', 'r', encoding='utf-8') as modified_fonts_file:
        modified_fonts_data = json.load(modified_fonts_file)
except FileNotFoundError:
    print("Il file modified_fonts.json non esiste.")
    exit()
except json.JSONDecodeError:
    print("Il file modified_fonts.json non è un file JSON valido.")
    exit()

# Assicurati che `modifiedFonts` sia una lista
modifiedFonts = modified_fonts_data.get("modifiedFonts", [])
if not isinstance(modifiedFonts, list):
    print("Il file modified_fonts.json non contiene una lista valida nella chiave 'modifiedFonts'.")
    exit()

# Crea un dizionario per un accesso rapido ai font modificati
modified_fonts_dict = {font["fontExtendedName"]: font["fontUrlName"] for font in modifiedFonts}

# Filtra i font da escludere e applica le modifiche ai nomi
filtered_fonts = []
for font in data['fonts']:
    font_name = font.get('name', '').strip()
    # Escludi i font presenti in excludedFonts
    if font_name not in excludedFonts:
        # Modifica il nome del font se presente in modified_fonts_dict
        if font_name in modified_fonts_dict:
            font['name'] = modified_fonts_dict[font_name]
        filtered_fonts.append(font)

# Riassegna gli ID ai font rimanenti
for new_id, font in enumerate(filtered_fonts, start=1):
    font['id'] = new_id

# Aggiorna il dato nel JSON con i font filtrati
data['fonts'] = filtered_fonts

# Salva il JSON modificato
with open('./src/assets/google_fonts_list.json', 'w') as f:
    json.dump(data, f, indent=4)



# ! Generate README.md file
def generate_md_file(json_file, output_file):
    # Load data from the JSON file
    with open(json_file, 'r') as file:
        data = json.load(file)

    # Extract date and calculate the font count
    currentDate = datetime.now().strftime("%d %b %Y")
    data["date"] = currentDate

    with open(json_file, "w") as file:
        json.dump(data, file, indent=4)
    
    fonts = data.get("fonts", [])
    count = len(fonts)

    # Markdown content
    markdown_content = f"""# WHAT IS \"GUESS THE FONT\"
\"Guess The Font\" is... just a game about guessing the font. Who would have thought, right?

But wait, seriously, the main concept is actually to get people to discover new fonts and improve their knowledge about typography. Or at least this was the initial purpose.

# HOW DOES IT WORK
The game (as of {currentDate}) currently features {count} fonts imported from Google Fonts, filtered for the Latin writing system.

(Un)fortunately, fonts are virtually infinite, but these few should provide a tough enough challenge. For now.

# SOME DESERVED CREDITS
These amazing websites gave me the inspiration for this project, so please take a look and have fun:

- Hex Guess!
- fontguessr
- Monkeytype

# CAN YOU SCORE HIGHER THAN ME?
I mean... I literally never guessed any, so..."""

    # Write to the output file
    with open(output_file, 'w') as file:
        file.write(markdown_content)



# ! Main
print(f"Font esclusi e JSON aggiornato con successo!\nTotale font: {len(filtered_fonts)}")
generate_md_file('./src/assets/google_fonts_list.json', 'README.md')