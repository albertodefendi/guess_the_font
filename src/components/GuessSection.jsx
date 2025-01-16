import React, { useState, useRef, useEffect } from "react";
import MyButton from "./MyButton";
import { Check, X } from 'lucide-react';
import { fontRegexUrl, appendFontToHtml, getRandomFont } from "./UtilityFunctions";

export default function GuessSection({ fontsArray, handleGuess, currentFont, ultraInstinct }) {
    const [query, setQuery] = useState(""); // Current value of the input
    const [suggestions, setSuggestions] = useState([]); // Suggestions List
    const [suggestionsVisibility, setSuggestionsVisibility] = useState(false); // Suggestions List visibility
    const [highlightedIndex, setHighlightedIndex] = useState(-1); // Keyboard accessible index for navigation
    const [inputError, setInputError] = useState(false); // Active index for navigation with keyboard
    const [guessCorrect, setGuessCorrect] = useState(null); // Verify if the guess is correct
    const [sentGuess, setSentGuess] = useState(false); // Check if the user sent the guess input
    const [showResults, setShowResults] = useState(false); // Check the visibility of the results
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false); // Check if the keyboard is open (for mobile)
    const inputRef = useRef(null); // Reference to the input
    const listRef = useRef(null); // Reference to the suggestions list

    const handleInputChange = (e) => {
        setInputError(false);
        setGuessCorrect(null);
        const value = e.target.value;
        setQuery(value);

        // Show suggestions only if the user types
        if (value.length > 0) {
            const filteredFonts = fontsArray.filter((font) =>
                font.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredFonts);
        } else {
            setSuggestions([]); // Do not show suggestions when the field is empty
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion);
        setSuggestions([]); // Closes the list
        setSuggestionsVisibility(false);
    };

    // Modify the onFocus to prevent reopening the list immediately after the click
    const handleFocus = () => {
        if (query === "" && suggestions.length === 0) {
            setSuggestions(fontsArray); // Show suggestions only if the field is empty
        }
        setSuggestionsVisibility(true)
    };

    const handleKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            setHighlightedIndex((prevIndex) =>
                prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0 // Goes to the first element
            );
        } else if (e.key === "ArrowUp") {
            setHighlightedIndex((prevIndex) =>
                prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1 // Goes to the last element
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

    const appendNewFont = () => {
        const randomFont = getRandomFont();
        appendFontToHtml(randomFont)
        localStorage.setItem("currentFont", randomFont);
    }

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
        appendNewFont();
    };

    const sendUltraInstinctFont = () => {
        if (!sentGuess) {
            setQuery(currentFont)
            setSentGuess(true);
            setGuessCorrect(true);
            setInputError(false);
            setShowResults(true);
            appendNewFont()
        }
    };

    const resetGame = () => {
        setQuery("");
        setSentGuess(false);
        setGuessCorrect(null);
        setInputError(false);
        setShowResults(false);
        setSuggestions(fontsArray)
        handleGuess(query);
    };

    // Effect to close the menu when clicking outside the component
    const isMobile = navigator.maxTouchPoints > 0;
    useEffect(() => {
        // Function to handle the click outside of the div
        const handleClickOutside = (event) => {
            if (isKeyboardOpen) {
                return; // Do not close suggestions if the keyboard is open (for mobile)
            }

            if (
                inputRef.current &&
                !inputRef.current.contains(event.target) &&
                listRef.current &&
                !listRef.current.contains(event.target)
            ) {
                setSuggestions([]);
            }
        };

        // Handle keyboard open and close events, only on mobile devices
        const handleFocus = () => {
            if (isMobile) {
                setIsKeyboardOpen(true);
            }
        };

        const handleBlur = () => {
            if (isMobile) {
                setIsKeyboardOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        if (inputRef.current && isMobile) {
            inputRef.current.addEventListener("focus", handleFocus);
            inputRef.current.addEventListener("blur", handleBlur);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            if (inputRef.current && isMobile) {
                inputRef.current.removeEventListener("focus", handleFocus);
                inputRef.current.removeEventListener("blur", handleBlur);
            }
        };
    }, [isKeyboardOpen, isMobile]);


    // Effect to manage the scroll of the highlighted element
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
                setSuggestions(filteredFonts);
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
                        onFocus={handleFocus}
                        placeholder="What's the font?"
                        disabled={sentGuess ? true : false}
                        autoComplete="off"
                    />
                    {(suggestions.length > 0 && suggestionsVisibility) && (
                        <ul
                            ref={listRef}
                            className="absolute top-16 lg:top-[72px] w-full max-h-72 overflow-y-auto z-10 rounded-lg internal-overflow touch-auto"
                            role="listbox"
                            aria-label="Font suggestions"
                            id="suggestions"
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