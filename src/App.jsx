import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import SettingsPage from "./components/SettingsPage";
import InfoPage from "./components/InfoPage";
import { SettingsProvider } from "./components/SettingsContext";
import { useUltraInstinct } from "./components/SettingsContext";
import fonts from "./assets/google_fonts_list.json";
import Title from "./components/Title";
import GuessSection from "./components/GuessSection";
import { Settings } from "lucide-react";
import { Info } from "lucide-react";
import { getRandomFont } from "./components/UtilityFunctions";
import { appendFontToHtml } from "./components/UtilityFunctions";

function HomePage() {
  const [currentFont, setCurrentFont] = useState(""); // Stato per il font corrente
  const [currentStreak, setCurrentStreak] = useState(() => {
    // Inizializza da localStorage
    const savedStreak = localStorage.getItem("currentStreak");
    return savedStreak ? parseInt(savedStreak, 10) : 0;
  });
  const [highestStreak, setHighestStreak] = useState(() => {
    // Inizializza da localStorage
    const savedHighest = localStorage.getItem("highestStreak");
    return savedHighest ? parseInt(savedHighest, 10) : 0;
  });
  const { ultraInstinct } = useUltraInstinct();

  const fontsArray = fonts.fonts.map((font) => font.name); // Array dei nomi dei font

  // Inizializza i dati da localStorage al caricamento della pagina
  useEffect(() => {
    const savedFont = localStorage.getItem("currentFont"); // Recupera il font salvato
    if (savedFont) {
      setCurrentFont(savedFont);
      appendFontToHtml(savedFont)
    }
    else
      setCurrentFont(getRandomFont());
  }, []);

  // Aggiorna localStorage quando cambia il font
  useEffect(() => {
    if (currentFont) {
      localStorage.setItem("currentFont", currentFont);
    }
  }, [currentFont]);

  // Aggiorna localStorage quando le streak cambiano
  useEffect(() => {
    localStorage.setItem("currentStreak", currentStreak);
    localStorage.setItem("highestStreak", highestStreak);
  }, [currentStreak, highestStreak]);

  // Funzione per cambiare font e aggiornare le streak
  const handleGuess = (value) => {
    if (value === currentFont) {
      setCurrentStreak((prev) => {
        const newStreak = prev + 1;
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

  return (
    <div
      className={
        "bg-main min-h-screen flex justify-center items-center transition-opacity duration-500"
      }
    >
      <div className="grid p-4 gap-16 lg:w-1/2 max-w-4xl">
        <Title />
        <div className="grid gap-12">
          <div className="flex flex-col gap-2">
            <div
              className="bg-custom-black border-4 border-custom-green text-custom-violet w-full rounded-3xl p-8 text-3xl text-center"
              style={{ fontFamily: currentFont }}
            >
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo esse
              accusamus quasi magni totam? Nesciunt, harum!
            </div>
            {ultraInstinct && (
              <div className="text-white text-xl">
                <span>Font: </span>
                <span style={{ fontFamily: currentFont }}>{currentFont}</span>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <GuessSection fontsArray={fontsArray} guessClick={handleGuess} />
          </div>
        </div>
        <div className="grid gap-4 text-2xl text-white justify-center">
          <div>Current streak: {currentStreak}</div>
          <div>Highest streak: {highestStreak}</div>
        </div>
        <div className="flex gap-4 justify-end">
          <Link to="/info">
            <Info size={32} className="text-white hover:text-custom-green duration-100" />
          </Link>
          <Link to="/settings">
            <Settings size={32} className="text-white hover:text-custom-green duration-100" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/info" element={<InfoPage />} />
        </Routes>
      </Router>
    </SettingsProvider>
  );
}





// TODO: aggiungere una sezione di crediti verso hexguess e fontguessr (qualcosa del tipo "highly inspired by...")
// TODO: capire se devo gestire i cookie
// TODO: mettere i crediti verso me stesso