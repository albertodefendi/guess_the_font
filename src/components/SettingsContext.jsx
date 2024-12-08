import React, { createContext, useState, useContext } from "react";

const SettingsContext = createContext();

export const useDebug = () => useContext(SettingsContext);

export function SettingsProvider({ children }) {
    const [debugMode, setDebugMode] = useState(false);

    return (
        <SettingsContext.Provider value={{ debugMode, setDebugMode }}>
            {children}
        </SettingsContext.Provider>
    );
}
