import "./App.css";
import React, { useEffect } from "react";
import fonts from "./assets/google_fonts_list.json";
import Input from "./components/Input";
import Title from "./components/Title";
import Text from "./components/Text";

//--------------------------------------------------//
// Export default
//--------------------------------------------------//

export default function App() {

  useEffect(() => {
    // Funzione per aggiungere i <link> per ogni font direttamente nell'head
    const loadFonts = () => {
      fonts.fonts.forEach(font => {
        const link = document.createElement("link");
        link.href = `https://fonts.googleapis.com/css2?family=${font.name.replace(" ", "+")}:wght@400&display=swap`;
        link.rel = "stylesheet";
        document.head.appendChild(link);  // Aggiungi ogni <link> direttamente nell'head
      });
    };
    loadFonts();
  }, []); // Usa un useEffect per eseguire una sola volta al montaggio del componente

  return (
    <>
      <div className="bg-[url('./assets/typography_bg.png')] h-screen flex justify-center items-center">
        <div className="grid gap-28 w-1/2 max-w-4xl">
          <Title />
          <div className="grid gap-12">
            <Text></Text>
            <Input />
          </div>
        </div>
      </div>
    </>
  );
}
