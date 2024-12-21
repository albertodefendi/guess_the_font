import fonts from "../assets/google_fonts_list.json";




/* ------------------------------------------------------------------
Funzione per conversione di una stringa in una stringa url encoded
-------------------------------------------------------------------*/
export const fontRegexUrl = (font) => {
    return font.replace(/\s+/g, "+");
};





/* ------------------------------------------------------------------
Funzione per ottenimento di un font casuale dall'array json
-------------------------------------------------------------------*/
export const getRandomFont = () => {
    const fontsArray = fonts.fonts.map((font) => font.name); // Array dei nomi dei font
    const randomIndex = Math.floor(Math.random() * fontsArray.length);
    return fontsArray[randomIndex];
};




/* ------------------------------------------------------------------
Funzione per fare l'append di un font nell'head
-------------------------------------------------------------------*/
export const appendFontToHtml = async (fontName) => {
    const existingLink = Array.from(document.head.getElementsByTagName("link"))
        .find(link => link.href.includes(fontName));
    if (existingLink) return; // Il font è già stato aggiunto

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





/* ------------------------------------------------------------------
Funzione per creare il tag <link> e aggiungerlo all'head
-------------------------------------------------------------------*/
const appendLinkToHead = (url) => {
    const link = document.createElement("link");
    link.href = url;
    link.rel = "stylesheet";
    document.head.appendChild(link);
};





/* ------------------------------------------------------------------
Funzione per rimuovere un font dall'head
-------------------------------------------------------------------*/
export const removeFontFromHead = (fontName) => {
    const head = document.head;
    const links = head.querySelectorAll("link[rel='stylesheet']");
    links.forEach((link) => {
        if (link.href.includes(fontRegexUrl(fontName))) {
            head.removeChild(link);
        }
    });
};
