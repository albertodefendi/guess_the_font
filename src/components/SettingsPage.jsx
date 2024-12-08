import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftToLine } from "lucide-react"
import { useDebug } from "./SettingsContext";

export default function SettingsPage() {
    const { debugMode, setDebugMode } = useDebug();

    const handleDebugToggle = (event) => {
        setDebugMode(event.target.checked);
    };

    return (
        <div className="h-screen bg-main flex flex-col items-center justify-center text-white">
            <div className="text-2xl mb-8">
                <label className="inline-flex items-center cursor-pointer">
                    <span className="">
                        Enable debug mode
                    </span>
                    <input
                        type="checkbox"
                        id="debug-mode"
                        checked={debugMode}
                        onChange={handleDebugToggle}
                        className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
            </div>
            <Link
                to="/"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
                <ArrowLeftToLine />
            </Link>
        </div>
    );
}




// TODO: aggiungere una sezione per mettere un testo custom per l'identificazione del font
// TODO: aggiungere la possibilità di modificare i colori del tema