import json

def generate_md_file(json_file, output_file):
    # Load data from the JSON file
    with open(json_file, 'r') as file:
        data = json.load(file)

    # Extract date and calculate the font count
    date = data.get("date", "Unknown Date")
    fonts = data.get("fonts", [])
    count = len(fonts)

    # Markdown content
    markdown_content = f"""# WHAT IS \"GUESS THE FONT\"
\"Guess The Font\" is... just a game about guessing the font. Who would have thought, right?

But wait, seriously, the main concept is actually to get people to discover new fonts and improve their knowledge about typography. Or at least this was the initial purpose.

# HOW DOES IT WORK
The game (as of {date}) currently features {count} fonts imported from Google Fonts, filtered for the Latin writing system.

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

# Example usage
generate_md_file('./src/assets/google_fonts_list.json', 'README.md')