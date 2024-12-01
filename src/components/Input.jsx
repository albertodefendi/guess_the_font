import React, { useState, useRef, useEffect } from "react";
import fonts from "../assets/google_fonts_list.json";



//--------------------------------------------------//
// Export default
//--------------------------------------------------//

// Array dei nomi dei font estratto dal JSON
const fontsArray = fonts.fonts.map((font) => font.name);

export default function FontInput() {
    const [query, setQuery] = useState(""); // Valore corrente dell'input
    const [suggestions, setSuggestions] = useState([]); // Lista dei suggerimenti
    const [highlightedIndex, setHighlightedIndex] = useState(-1); // Indice attivo per la navigazione con tastiera
    const inputRef = useRef(null); // Riferimento all'input
    const listRef = useRef(null); // Riferimento alla lista dei suggerimenti

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        setHighlightedIndex(-1); // Resetta l'indice evidenziato

        if (value.length > 0) {
            const filteredFonts = fontsArray.filter((font) =>
                font.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredFonts);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion);
        setSuggestions([]);
    };

    const handleKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            setHighlightedIndex((prevIndex) =>
                prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0 // Torna al primo elemento
            );
        } else if (e.key === "ArrowUp") {
            setHighlightedIndex((prevIndex) =>
                prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1 // Torna all'ultimo elemento
            );
        } else if (e.key === "Enter" && highlightedIndex >= 0) {
            setQuery(suggestions[highlightedIndex]);
            setSuggestions([]);
        } else if (e.key === "Escape") {
            setSuggestions([]);
        }
    };

    // Effetto per chiudere il menu quando si clicca fuori dal componente
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                inputRef.current &&
                !inputRef.current.contains(event.target) &&
                listRef.current &&
                !listRef.current.contains(event.target)
            ) {
                setSuggestions([]);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Effetto per gestire lo scroll dell'elemento evidenziato
    useEffect(() => {
        if (highlightedIndex >= 0 && listRef.current) {
            const listItem = listRef.current.children[highlightedIndex];
            if (listItem) {
                listItem.scrollIntoView({
                    block: "nearest",
                    inline: "nearest",
                });
            }
        }
    }, [highlightedIndex]);

    return (
        <div className="w-full flex flex-col items-center text-2xl">
            <input
                className="bg-white text-black w-1/2 p-3 rounded-lg"
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Guess the font"
            />
            {suggestions.length > 0 && (
                <ul
                    ref={listRef}
                    className="max-h-56 w-1/2 overflow-y-scroll z-50"
                >
                    {suggestions.map((suggestion, index) => (
                        <li
                            className={`p-3 cursor-pointer ${index === highlightedIndex ? "bg-emerald-100" : index % 2 === 0 ? "bg-slate-100" : "bg-white"}`}
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
