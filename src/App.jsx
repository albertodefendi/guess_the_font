import "./App.css";
import React, { useEffect, useState } from "react";
import fonts from "./assets/google_fonts_list.json";
import Input from "./components/Input";
import Title from "./components/Title";
import Text from "./components/Text";
import PageLoader from "./components/PageLoader";

export default function App() {
  const [loading, setLoading] = useState(true); // Stato per il caricamento

  useEffect(() => {
    const loadFonts = () => {
      let loadedCount = 0; // Conta i font caricati
      const totalFonts = fonts.fonts.length;

      fonts.fonts.forEach((font) => {
        const link = document.createElement("link");
        link.href = `https://fonts.googleapis.com/css2?family=${font.name.replace(
          " ",
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
          console.error(`Font loading error: ${font.name}`);
          loadedCount += 1; // Anche in caso di errore, procedi
          if (loadedCount === totalFonts) {
            setLoading(false);
          }
        };

        document.head.appendChild(link);
      });

      // Timeout di fallback per garantire che il loader non resti bloccato
      setTimeout(() => {
        if (loading) {
          setLoading(false);
        }
      }, 5000); // 5 secondi di massimo attesa
    };

    loadFonts();
  }, []);

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
            <Text />
            <Input />
          </div>
        </div>
      </div>
    </>
  );
}
