import { useEffect, useState } from "react";
import { getRandomFont, removeFontFromHead } from "./UtilityFunctions";

const title = "Guess The Font"; // h1 della pagina
const letters = title.split("");

export default function Title({ currentGuessFont }) {
    const [fontsPerLetter, setFontsPerLetter] = useState(() =>
        letters.map(() => getRandomFont())
    );

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * letters.length);

            setFontsPerLetter((prevFonts) => {
                const newFonts = [...prevFonts];
                const currentLetterFont = prevFonts[randomIndex]; // Font corrente della lettera
                const newFont = getRandomFont(); // Nuovo font

                // Rimuovi il font corrente dall'head se diverso da currentGuessFont
                if (currentLetterFont !== currentGuessFont) {
                    removeFontFromHead(currentLetterFont);
                }

                // Aggiorna il font della lettera
                newFonts[randomIndex] = newFont;
                return newFonts;
            });
        }, 5000);

        return () => clearInterval(interval); // Pulisce l'intervallo
    }, []); // Effettua il check su currentGuessFont

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
