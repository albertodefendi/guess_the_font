import "./App.css";
import React, { useEffect } from 'react';
import fonts from '../public/google_fonts_list.json';
import Input from "./components/Input";



//--------------------------------------------------//
// Export default
//--------------------------------------------------//

export default function App() {
  const title = "Guess The Font"

  useEffect(() => {
    // Verifica se il link è già presente nell'head per evitare duplicazioni
    if (!document.querySelector("link[href*='fonts.googleapis.com']")) {
      // Crea un array con i nomi dei font formattati per l'URL (spazi diventano +)
      const fontNames = fonts.fonts
        .map(font => font.name.split(' ').join('+'))  // Gestisce correttamente anche font con più parole
        .join('&family=');  // Unisce i font con '&family='

      // Costruisci l'URL del link per i font
      const fontUrl = `https://fonts.googleapis.com/css2?family=${fontNames}:wght@400&display=swap`;

      // Crea il tag <link> per caricare i font
      const link = document.createElement("link");
      link.href = fontUrl;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
  }, []); // Esegui solo una volta al montaggio del componente

  return (
    <>
      <div className="bg-[url('../../public/typography_bg.png')] h-screen flex justify-center items-center">
        <div className="grid gap-28 w-1/2 max-w-4xl">
          <h1 className="text-7xl text-white text-center">
            {title.split("").map((letter, index) => (
              <span className="mx-1" key={index}>{letter}</span>
            ))}
          </h1>
          <div className="grid gap-12">
            <div className="bg-white w-full rounded-3xl p-8 text-3xl text-center">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo esse accusamus quasi magni totam? Nesciunt, harum!</div>
            <Input></Input>
          </div>
        </div>
      </div>
    </>
  )
}
