import React, { useState, useRef, useEffect } from "react";
import MyButton from "./MyButton";
import { Check, X } from 'lucide-react';
import { fontRegexUrl, appendFontToHtml, getRandomFont } from "./UtilityFunctions";

export default function GuessSection({ fontsArray, handleGuess, currentFont, ultraInstinct }) {
    const [query, setQuery] = useState(""); // Valore corrente dell'input
    const [suggestions, setSuggestions] = useState([]); // Lista dei suggerimenti
    const [suggestionsVisibility, setSuggestionsVisibility] = useState(false); // Lista dei suggerimenti
    const [highlightedIndex, setHighlightedIndex] = useState(-1); // Indice attivo per la navigazione con tastiera
    const [inputError, setInputError] = useState(false); // Errore per input non valido
    const [guessCorrect, setGuessCorrect] = useState(null); // Verifica se il guess è corretto
    const [sentGuess, setSentGuess] = useState(false);
    const [showResults, setShowResults] = useState(false); // Controlla la visibilità dei risultati
    const inputRef = useRef(null); // Riferimento all'input
    const listRef = useRef(null); // Riferimento alla lista dei suggerimenti

    const handleInputChange = (e) => {
        setInputError(false);
        setGuessCorrect(null);
        const value = e.target.value;
        setQuery(value);
    
        // Mostra suggerimenti solo se l'utente digita
        if (value.length > 0) {
            const filteredFonts = fontsArray.filter((font) =>
                font.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredFonts);
        } else {
            setSuggestions([]); // Non mostra suggerimenti quando il campo è vuoto
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion);
        setSuggestions([]); // Chiude la lista
        setSuggestionsVisibility(false);
    };

    // Modifica l'onFocus per evitare di riaprire l'elenco subito dopo il clic
    const handleFocus = () => {
        if (query === "" && suggestions.length === 0) {
            setSuggestions(fontsArray); // Mostra suggerimenti solo se il campo è vuoto
        }
        setSuggestionsVisibility(true)
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
            setSuggestionsVisibility(false);
        } else if (e.key === "Escape") {
            setSuggestions([]);
            setSuggestionsVisibility(false);
        }
    };

    const sendGuessedFont = () => {
        if (!fontsArray.includes(query)) {
            setInputError(true);
        }
        else {
            setSentGuess(true);
            appendFontToHtml(query);

            if (query === currentFont) {
                setGuessCorrect(true);
                setInputError(false);
                setShowResults(true);
            } else {
                setGuessCorrect(false);
                setInputError(false);
                setShowResults(true);
            }
        }
        localStorage.setItem("currentFont", getRandomFont());
    };

    const sendUltraInstinctFont = () => {
        if (!sentGuess) {
            setQuery(currentFont)
            setSentGuess(true);
            appendFontToHtml(currentFont);
            setGuessCorrect(true);
            setInputError(false);
            setShowResults(true);
            localStorage.setItem("currentFont", getRandomFont());
        }
    }

    const resetGame = () => {
        setSuggestions(fontsArray)
        setSentGuess(false);
        setShowResults(false);
        setQuery("");
        setInputError(false);
        setGuessCorrect(null);
        handleGuess(query); // Cambia il font corrente solo dopo il guess
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

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (query) {
                const filteredFonts = fontsArray.filter((font) =>
                    font.toLowerCase().includes(query.toLowerCase())
                );
                setSuggestions(filteredFonts); // Supponendo che setSuggestions sia la funzione per aggiornare lo stato
            }
        }, 300);
        return () => clearTimeout(timeout);
    }, [query]);

    return (
        <div className="relative w-full flex flex-col gap-2">
            {ultraInstinct && (
                <div className="text-white text-base lg:text-xl">
                    <span>Answer: </span>
                    <span className={`cursor-pointer hover:blur-none duration-100 hover:bg-inherit ${sentGuess ? "blur-none bg-inherit" : "blur-sm bg-white"}`} onClick={sendUltraInstinctFont} style={{ fontFamily: currentFont }}>{currentFont}</span>
                </div>
            )}
            <div className="w-full flex gap-2 text-lg lg:text-2xl">
                <div className="relative w-full flex flex-col justify-center gap-2">
                    <input
                        className={`w-full bg-custom-black-1 text-white p-4 rounded-lg focus-visible:outline-none ${inputError ? "border border-red-600 text-red-600" : ""}`}
                        ref={inputRef}
                        type="search"
                        value={query}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onFocus={handleFocus} // Gestisce i suggerimenti al focus
                        placeholder="What's the font?"
                        disabled={sentGuess ? true : false}
                        autocomplete="off"
                    />
                    {(suggestions.length > 0 && suggestionsVisibility) && (
                        <ul
                            ref={listRef}
                            className="absolute top-16 lg:top-[72px] w-full max-h-72 overflow-y-auto z-10 rounded-lg internal-overflow"
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
                <MyButton className="h-full min-w-28 lg:min-w-32" onClickFunction={!sentGuess ? sendGuessedFont : resetGame}>{!sentGuess ? "Guess" : "Next"}</MyButton>
            </div>
            {showResults && (
                <>
                    <div className={`absolute z-20 w-full flex items-center gap-2 text-lg lg:text-2xl text-white ${ultraInstinct ? "top-28" : "top-20"}`}>
                        <div className={`w-full p-4 rounded-lg bg-custom-black-1`}>
                            <div className="flex items-center">
                                <div className={`p-2 rounded-full ${guessCorrect ? "bg-green-600" : "bg-red-600"}`}>
                                    {guessCorrect ? (
                                        <Check size={36}></Check>
                                    ) : (
                                        <X size={36}></X>
                                    )}
                                </div>
                                <div className="w-full flex flex-col gap-y-2">
                                    <div className="w-full flex text-center">
                                        <div className="basis-1/2">Your guess</div>
                                        <div className="basis-1/2">Answer</div>
                                    </div>

                                    <div className="w-full flex text-center">
                                        <div className={`basis-1/2 ${guessCorrect ? "text-green-600" : "text-red-600"}`}>
                                            <a href={`https://fonts.google.com/specimen/${fontRegexUrl(query)}`} target="_blank" style={{ fontFamily: query }}>{query}</a>
                                        </div>
                                        <div className="basis-1/2 text-green-600">
                                            <a href={`https://fonts.google.com/specimen/${fontRegexUrl(currentFont)}`} target="_blank" style={{ fontFamily: currentFont }}>{currentFont}</a>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}