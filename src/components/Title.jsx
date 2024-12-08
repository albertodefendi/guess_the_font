import { useEffect, useState } from "react";
import { getRandomFont } from "./UtilityFunctions";

const title = "Guess The Font"; // h1 della pagina

export default function FontChanger() {
    const [fontsPerLetter, setFontsPerLetter] = useState([]);

    useEffect(() => {
        // Imposta il font iniziale per ogni lettera
        const initialFonts = title.split("").map(() => getRandomFont());
        setFontsPerLetter(initialFonts);

        // Cambia il font di una lettera casuale ogni 3 secondi
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * title.length);
            setFontsPerLetter((prevFonts) => {
                const newFonts = [...prevFonts];
                newFonts[randomIndex] = getRandomFont();
                return newFonts;
            });
        }, 5000);

        // Pulisce l'intervallo quando il componente viene smontato
        return () => clearInterval(interval);
    }, []);

    return (
        <h1 className="text-6xl lg:text-7xl text-white text-center">
            {title.split("").map((letter, index) => (
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
