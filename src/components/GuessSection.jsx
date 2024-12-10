import React, { useState, useRef, useEffect } from "react";
import MyButton from "./MyButton";

export default function GuessSection({ fontsArray, guessClick }) {
    const [query, setQuery] = useState(""); // Valore corrente dell'input
    const [suggestions, setSuggestions] = useState([]); // Lista dei suggerimenti
    const [highlightedIndex, setHighlightedIndex] = useState(-1); // Indice attivo per la navigazione con tastiera
    const [guessError, setGuessError] = useState(false);
    const inputRef = useRef(null); // Riferimento all'input
    const listRef = useRef(null); // Riferimento alla lista dei suggerimenti

    const handleInputChange = (e) => {
        setGuessError(false);
        const value = e.target.value;
        setQuery(value);
        setHighlightedIndex(-1); // Resetta l'indice evidenziato

        if (value.length > 0) {
            const filteredFonts = fontsArray.filter((font) =>
                font.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredFonts);
        } else {
            setSuggestions(fontsArray); // Mostra tutti i suggerimenti se non c'è input
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

    const sendGuessedFont = () => {
        if (fontsArray.includes(query)) {
            guessClick(query);
            setQuery("");
            setGuessError(false);
        } else {
            setGuessError(true);
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

    // Aggiungi l'onFocus per gestire i suggerimenti a seconda della presenza o meno di una query
    const handleFocus = () => {
        if (query === "") {
            setSuggestions(fontsArray); // Mostra tutti i suggerimenti se il campo è vuoto
        }
    };

    return (
        <div className="w-full flex gap-2 text-lg lg:text-2xl">
            <div className="relative w-full flex flex-col justify-center gap-2">
                <input
                    className={`w-full bg-custom-black-1 text-white p-4 rounded-lg focus-visible:outline-none ${guessError ? "border border-red-500 text-red-500" : ""}`}
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={handleFocus} // Gestisce i suggerimenti al focus
                    placeholder="What's the font?"
                />
                {suggestions.length > 0 && (
                    <ul
                        ref={listRef}
                        className="absolute top-16 lg:top-[72px] w-full max-h-72 overflow-y-scroll z-50 rounded-lg"
                        role="listbox"
                        aria-label="Font suggestions"
                    >
                        {suggestions.map((suggestion, index) => (
                            <li
                                className={`p-4 cursor-pointer text-white ${index === highlightedIndex ? "bg-custom-violet" : "bg-custom-black-1"}`}
                                role="option"
                                aria-selected={index === highlightedIndex}
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <MyButton onClickFunction={sendGuessedFont}>Guess</MyButton>
        </div>
    );
}


// TODO: aggiungere un div di esito del tentativo di indovinare, in cui si dice successo o errore e si mostra qual era il font corretto