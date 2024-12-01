import { useEffect, useState } from "react";
import fonts from "../assets/google_fonts_list.json"; // Importa il JSON con i font

//--------------------------------------------------//
// Export default
//--------------------------------------------------//

const text = "Guess The Font"; // h1 della pagina

export default function FontChanger() {
    const [fontsPerLetter, setFontsPerLetter] = useState([]);
    const fontsArray = fonts.fonts.map((font) => font.name); // Otteniamo i nomi dei font dal JSON

    useEffect(() => {
        // Imposta il font iniziale per ogni lettera
        const initialFonts = text.split("").map(() => getRandomFont());
        setFontsPerLetter(initialFonts);

        // Cambia il font di una lettera ogni 4 secondi
        const interval = setInterval(() => {
            // Seleziona una lettera casuale e cambia il suo font
            const randomIndex = Math.floor(Math.random() * text.length);
            setFontsPerLetter((prevFonts) => {
                const newFonts = [...prevFonts];
                newFonts[randomIndex] = getRandomFont(); // Cambia solo il font di una lettera
                return newFonts;
            });
        }, 3000); // Cambia ogni 3 secondi

        // Pulisce l'intervallo quando il componente viene smontato
        return () => clearInterval(interval);
    }, []);

    // Funzione per ottenere un font casuale dalla lista
    const getRandomFont = () => {
        return `"${fontsArray[Math.floor(Math.random() * fontsArray.length)]}"`;
    };

    return (
        <h1 className="text-7xl text-white text-center">
            {text.split("").map((letter, index) => (
                letter === " " ? (
                    <span
                        key={index}
                        className="mx-1"
                    >
                        {letter}
                    </span>
                ) : (
                    <span
                        key={index}
                        className="mx-1 text-custom-green"
                        style={{ fontFamily: fontsPerLetter[index] }}
                    >
                        {letter}
                    </span>
                )
            ))}
        </h1>
    );

};
