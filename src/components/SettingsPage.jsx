import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftToLine } from "lucide-react"
import { useUltraInstinct } from "./SettingsContext";
import ToggleButton from "./ToggleButton";

export default function SettingsPage() {
    const { ultraInstinct, setUltraInstinct } = useUltraInstinct();

    const handleDebugToggle = (event) => {
        setUltraInstinct(event.target.checked);
    };

    const ultraInstinctButton = {
        label: "Enable Ultra Instinct",
        info: "Attention: enabling Ultra Instinct will reset your current streak!"
    }

    return (
        <div className="min-h-screen bg-main flex flex-col items-center justify-center text-white">
            <div className="grid gap-8 p-8 text-lg lg:text-2xl rounded-xl bg-custom-black-1">
                <Link
                    to="/"
                    className="w-fit"
                >
                    <ArrowLeftToLine size={28} className="hover:text-custom-green duration-100" />
                </Link>
                <ToggleButton labelText={ultraInstinctButton.label} infoText={ultraInstinctButton.info} checkedValue={ultraInstinct} onChangeFunction={handleDebugToggle} />
                <div>Use a custom text</div>
            </div>
        </div>
    );
}




// TODO: aggiungere una sezione per mettere un testo custom per l'identificazione del font
// TODO: aggiungere la possibilità di modificare i colori del tema