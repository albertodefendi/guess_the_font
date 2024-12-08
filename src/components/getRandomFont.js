import fonts from "../assets/google_fonts_list.json"

const getRandomFont = () => {
    const fontsArray = fonts.fonts.map((font) => font.name); // Array dei nomi dei font
    const randomIndex = Math.floor(Math.random() * fontsArray.length);
    const fontName = fontsArray[randomIndex].replace(/\s+/g, "+");

    // Controlla se il link è già presente
    const existingLink = Array.from(document.head.getElementsByTagName("link"))
        .find(link => link.href.includes(fontName));

    if (!existingLink) {
        const link = document.createElement("link");
        link.href = `https://fonts.googleapis.com/css2?family=${fontName}&display=swap&cache-bust=${new Date().getTime()}`;
        link.rel = "stylesheet";
        document.head.appendChild(link);
    }

    return fontsArray[randomIndex];
}

export default getRandomFont;
