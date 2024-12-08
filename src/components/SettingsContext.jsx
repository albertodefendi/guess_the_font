import React, { createContext, useState, useContext } from "react";

const SettingsContext = createContext();

export const useUltraInstinct = () => useContext(SettingsContext);

export function SettingsProvider({ children }) {
    const [ultraInstinct, setUltraInstinct] = useState(false);

    return (
        <SettingsContext.Provider value={{ ultraInstinct, setUltraInstinct }}>
            {children}
        </SettingsContext.Provider>
    );
}
