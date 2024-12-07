import "./App.css";
import React, { useEffect, useState } from "react";
import fonts from "./assets/google_fonts_list.json";
import Title from "./components/Title";
import PageLoader from "./components/PageLoader";
import GuessSection from "./components/GuessSection";
import getRandomFont from "./components/getRandomFont";

export default function App() {
  const [loading, setLoading] = useState(true); // Stato per il caricamento
  const [currentFont, setCurrentFont] = useState(""); // Stato per il font corrente
  const [currentStreak, setCurrentStreak] = useState(0); // Stato per la streak attuale
  const [highestStreak, setHighestStreak] = useState(0); // Stato per la streak massima

  const fontsArray = fonts.fonts.map((font) => font.name); // Array dei nomi dei font

  // Funzione per selezionare un font casuale
  // const getRandomFont = () => {
  //   const randomIndex = Math.floor(Math.random() * fontsArray.length);
  //   return fontsArray[randomIndex];
  // };

  // Inizializza le streak da localStorage
  useEffect(() => {
    const savedCurrentStreak = localStorage.getItem("currentStreak");
    const savedHighestStreak = localStorage.getItem("highestStreak");

    if (savedCurrentStreak)
      setCurrentStreak(parseInt(savedCurrentStreak, 10));
    if (savedHighestStreak)
      setHighestStreak(parseInt(savedHighestStreak, 10));
  }, []);

  // Aggiorna il font al caricamento della pagina
  useEffect(() => {
    setCurrentFont(getRandomFont());
  }, []);

  // Aggiorna localStorage quando le streak cambiano
  useEffect(() => {
    if (currentStreak >= 0) {
      localStorage.setItem("currentStreak", currentStreak);
    }
    if (highestStreak > 0) {
      localStorage.setItem("highestStreak", highestStreak);
    }
  }, [currentStreak, highestStreak]);

  // Funzione per cambiare font e aggiornare le streak
  const handleGuess = (value) => {
    if (value === currentFont) {
      setCurrentStreak((prev) => {
        const newStreak = prev + 1;
        setCurrentStreak(newStreak);
        if (newStreak > highestStreak) {
          setHighestStreak(newStreak);
        }
        return newStreak;
      });
    } else {
      setCurrentStreak(0);
    }
    setCurrentFont(getRandomFont());
  };

  // Gestione del caricamento dei font
  useEffect(() => {
    const loadFonts = () => {
      let loadedCount = 0; // Conta i font caricati
      const totalFonts = fonts.fonts.length;

      fonts.fonts.forEach((font) => {
        const link = document.createElement("link");
        link.href = `https://fonts.googleapis.com/css2?family=${font.name.replace(
          /\s+/g,
          "+"
        )}:wght@400&display=swap`;
        link.rel = "stylesheet";

        // Verifica il caricamento del font
        link.onload = () => {
          loadedCount += 1;
          if (loadedCount === totalFonts) {
            setLoading(false); // Tutti i font sono caricati
          }
        };

        link.onerror = () => {
          console.error(`Errore durante il caricamento del font: ${font.name}`);
          loadedCount += 1; // Anche in caso di errore, procedi
          if (loadedCount === totalFonts) {
            setLoading(false);
          }
        };

        document.head.appendChild(link);
      });

      // Timeout di fallback per garantire che il loader non resti bloccato
      const timeout = setTimeout(() => {
        if (loading) {
          setLoading(false);
        }
      }, 5000); // 5 secondi di massimo attesa

      // Cleanup per evitare memory leak
      return () => clearTimeout(timeout);
    };

    loadFonts();
  }, [loading]);

  return (
    <>
      <div
        className={
          "bg-[url('./assets/typography_bg.png')] h-screen flex justify-center items-center transition-opacity duration-500"
        }
      >
        <div className="grid gap-28 w-1/2 max-w-4xl">
          <Title />
          <div className="grid gap-12">
            <div
              className="bg-custom-black border-4 border-custom-green text-custom-violet w-full rounded-3xl p-8 text-3xl text-center"
              style={{ fontFamily: currentFont }}
            >
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo esse
              accusamus quasi magni totam? Nesciunt, harum!
            </div>
            <div className="text-white">Font: {currentFont}</div>
            <div className="flex gap-2">
              <GuessSection fontsArray={fontsArray} guessClick={handleGuess} />
            </div>
          </div>
          <div className="grid gap-4 text-xl text-white justify-center">
            <div>Current streak: {currentStreak}</div>
            <div>Highest streak: {highestStreak}</div>
          </div>
        </div>
      </div>
    </>
  );
}
