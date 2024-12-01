import React, { useState, useEffect } from "react";
import fonts from "../assets/google_fonts_list.json";

export default function Text() {
    const fontsArray = fonts.fonts.map((font) => font.name); // Array dei nomi dei font
    const [currentFont, setCurrentFont] = useState("");

    // Funzione per selezionare un font casuale
    const getRandomFont = () => {
        const randomIndex = Math.floor(Math.random() * fontsArray.length);
        return fontsArray[randomIndex];
    };

    // Cambia il font al caricamento della pagina
    useEffect(() => {
        setCurrentFont(getRandomFont());
    }, []);

    // Cambia il font al clic del pulsante
    const handleChangeFont = () => {
        setCurrentFont(getRandomFont());
    };

    return (
        <div className="bg-custom-black border-2 border-custom-green text-custom-violet w-full rounded-3xl p-8 text-3xl text-center" style={{ fontFamily: currentFont }}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo esse accusamus quasi magni totam? Nesciunt, harum!
        </div>
    );
}
