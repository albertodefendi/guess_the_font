import fonts from "../assets/google_fonts_list.json"

export const fontRegexUrl = (font) => {
    return font.replace(/\s+/g, "+");
}

export const getRandomFont = () => {
    const fontsArray = fonts.fonts.map((font) => font.name); // Array dei nomi dei font
    const randomIndex = Math.floor(Math.random() * fontsArray.length);
    // const fontName = fontsArray[randomIndex].replace(/\s+/g, "+");
    const fontName = fontRegexUrl(fontsArray[randomIndex]);

    // Controlla se il link è già presente
    const existingLink = Array.from(document.head.getElementsByTagName("link"))
        .find(link => link.href.includes(fontName));

    if (!existingLink) {
        appendFontToHtml(fontName);
    }

    return fontsArray[randomIndex];
}


export const appendFontToHtml = (fontName) => {
    const font = fontName.replace(/\s+/g, "+");
    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?family=${font}&display=swap`;
    link.rel = "stylesheet";
    document.head.appendChild(link);
}


export default function() {}