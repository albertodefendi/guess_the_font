import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import SettingsPage from './components/SettingsPage';
import { SettingsProvider } from "./components/SettingsContext";
import { useDebug } from "./components/SettingsContext";
import fonts from "./assets/google_fonts_list.json";
import Title from "./components/Title";
import PageLoader from "./components/PageLoader";
import GuessSection from "./components/GuessSection";
import getRandomFont from "./components/getRandomFont";
import { Settings2 } from "lucide-react"

function HomePage() {
  const [currentFont, setCurrentFont] = useState(""); // Stato per il font corrente
  const [currentStreak, setCurrentStreak] = useState(0); // Stato per la streak attuale
  const [highestStreak, setHighestStreak] = useState(0); // Stato per la streak massima
  const { debugMode } = useDebug();

  const fontsArray = fonts.fonts.map((font) => font.name); // Array dei nomi dei font

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

  return (
    <div
      className={
        "bg-main h-screen flex justify-center items-center transition-opacity duration-500"
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
          { debugMode && (<div className="text-white">Font: {currentFont}</div>)}
          <div className="flex gap-2">
            <GuessSection fontsArray={fontsArray} guessClick={handleGuess} />
          </div>
        </div>
        <div className="grid gap-4 text-2xl text-white justify-center">
          <div>Current streak: {currentStreak}</div>
          <div>Highest streak: {highestStreak}</div>
          <div>
            <Link to="/settings">
              <Settings2 className="" />
            </Link>
          </div>
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
        </Routes>
      </Router>
    </SettingsProvider>
  )
}