import fonts from "../assets/google_fonts_list.json"

export const fontRegexUrl = (font) => {
    return font.replace(/\s+/g, "+");
}

export const getRandomFont = () => {
    const fontsArray = fonts.fonts.map((font) => font.name); // Array dei nomi dei font
    const randomIndex = Math.floor(Math.random() * fontsArray.length);
    const fontName = fontRegexUrl(fontsArray[randomIndex]);

    // Controlla se il link è già presente
    const existingLink = Array.from(document.head.getElementsByTagName("link"))
        .find(link => link.href.includes(fontName));

    if (!existingLink) {
        appendFontToHtml(fontName);
    }

    return fontsArray[randomIndex];
}

export const appendFontToHtml = async (fontName) => {
    const weights = [400, 500, 600, 700, 900, 100, 200, 300]; // Pesi comuni da provare
    const baseUrl = "https://fonts.googleapis.com/css2?family=";
    const queryParams = "&display=swap";

    // Funzione per verificare se l'URL del font è valido
    const isFontUrlValid = async (url) => {
        try {
            const response = await fetch(url, { method: 'HEAD' }); // Usa HEAD per performance
            return response.ok; // true se il response è 200
        } catch {
            return false; // false in caso di errore
        }
    };

    // Primo tentativo senza specificare il peso
    let font = fontRegexUrl(fontName);
    let fontUrl = `${baseUrl}${font}${queryParams}`;
    if (await isFontUrlValid(fontUrl)) {
        appendLinkToHead(fontUrl);
        return;
    }

    // Se fallisce, iteriamo sui pesi
    for (const weight of weights) {
        fontUrl = `${baseUrl}${font}:wght@${weight}${queryParams}`;
        if (await isFontUrlValid(fontUrl)) {
            appendLinkToHead(fontUrl);
            return;
        }
    }

    console.error(`"${fontName}" can't be loaded`);
};

// Funzione per creare il tag <link> e aggiungerlo all'head
const appendLinkToHead = (url) => {
    const link = document.createElement("link");
    link.href = url;
    link.rel = "stylesheet";
    document.head.appendChild(link);
};

export const removeFontFromHead = (fontName) => {
    const head = document.head;
    const links = head.querySelectorAll("link[rel='stylesheet']");
    links.forEach((link) => {
        if (link.href.includes(fontRegexUrl(fontName))) {
            head.removeChild(link);
        }
    });
};


export default function() {}