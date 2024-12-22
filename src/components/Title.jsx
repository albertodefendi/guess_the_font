import { useEffect, useState, useRef } from "react";
import { getRandomFont, appendFontToHtml, removeFontFromHead } from "./UtilityFunctions";

const title = "Guess The Font"; // h1 della pagina
const letters = title.split("");

export default function Title({ currentGuessFont }) {
    const [fontsPerLetter, setFontsPerLetter] = useState([]);
    const fontsRef = useRef([]); // Mantiene il riferimento ai font attuali

    // Funzione per inizializzare i font per ogni lettera
    const initializeFonts = () => {
        const initialFonts = letters.map((letter) => {
            const font = getRandomFont();
            appendFontToHtml(font);
            return font;
        });
        setFontsPerLetter(initialFonts);
        fontsRef.current = initialFonts; // Aggiorna il riferimento
    };

    useEffect(() => {
        initializeFonts();

        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * letters.length);
            const currentFonts = [...fontsRef.current]; // Recupera i font correnti
            const oldFont = currentFonts[randomIndex];
            const newFont = getRandomFont();

            appendFontToHtml(newFont);
            if (oldFont !== currentGuessFont) {
                removeFontFromHead(oldFont);
            }

            // Aggiorna i font nel riferimento e nello stato
            currentFonts[randomIndex] = newFont;
            fontsRef.current = currentFonts;
            setFontsPerLetter(currentFonts);
        }, 3000);

        return () => {
            clearInterval(interval);
            fontsRef.current.forEach((font) => removeFontFromHead(font)); // Pulisci i font
        };
    }, []);

    return (
        <h1 className="text-6xl lg:text-7xl text-white text-center">
            {letters.map((letter, index) => (
                <span
                    key={index}
                    className={letter === " " ? "mx-1" : "mx-1 text-custom-green"}
                    style={letter === " " ? undefined : { fontFamily: fontsPerLetter[index] }}
                >
                    {letter}
                </span>
            ))}
        </h1>
    );
}
