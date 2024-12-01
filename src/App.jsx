import "./App.css";
import React, { useEffect, useState } from "react";
import fonts from "./assets/google_fonts_list.json";
import Input from "./components/Input";
import Title from "./components/Title";
import PageLoader from "./components/PageLoader";
import Button from "./components/Button";

export default function App() {
  const [loading, setLoading] = useState(true); // Stato per il caricamento
  const [currentFont, setCurrentFont] = useState(""); // Stato per il font corrente

  const fontsArray = fonts.fonts.map((font) => font.name); // Array dei nomi dei font

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

  useEffect(() => {
    const loadFonts = () => {
      let loadedCount = 0; // Conta i font caricati
      const totalFonts = fonts.fonts.length;

      fonts.fonts.forEach((font) => {
        const link = document.createElement("link");
        link.href = `https://fonts.googleapis.com/css2?family=${font.name.replace(
          /\s+/g,
          "+"
        )}:wght@400&display=swap`; // Corretto uso della regex per spazi multipli
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
      {loading && <PageLoader />}
      <div
        className={`bg-[url('./assets/typography_bg.png')] h-screen flex justify-center items-center transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"
          }`}
      >
        <div className="grid gap-28 w-1/2 max-w-4xl">
          <Title />
          <div className="grid gap-12">
            <div
              className="bg-custom-black border-2 border-custom-green text-custom-violet w-full rounded-3xl p-8 text-3xl text-center"
              style={{ fontFamily: currentFont }}
            >
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo esse
              accusamus quasi magni totam? Nesciunt, harum!
            </div>
            <div className="flex gap-2">
              <Input />
              <Button onClick={handleChangeFont} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
