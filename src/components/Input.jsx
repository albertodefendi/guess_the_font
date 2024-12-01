import React, { useState, useRef, useEffect } from "react";
import fonts from "../../public/google_fonts_list.json";

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
        <div style={{ position: "relative", width: "300px" }}>
            <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Guess the font"
                style={{
                    width: "100%",
                    padding: "8px",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                }}
            />
            {suggestions.length > 0 && (
                <ul
                    ref={listRef}
                    style={{
                        position: "absolute",
                        top: "40px",
                        left: 0,
                        width: "100%",
                        listStyleType: "none",
                        margin: 0,
                        padding: 0,
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        backgroundColor: "#fff",
                        zIndex: 1000,
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        maxHeight: "200px", // Mostra solo 5 elementi (40px * 5)
                        overflowY: "auto", // Abilita lo scroll
                    }}
                >
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            style={{
                                padding: "8px",
                                cursor: "pointer",
                                backgroundColor:
                                    index === highlightedIndex ? "#e6f7ff" : index % 2 === 0 ? "#f9f9f9" : "#fff",
                            }}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
