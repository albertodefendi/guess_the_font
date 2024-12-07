import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SettingsPage() {
    const [debugMode, setDebugMode] = useState(false);

    const handleDebugToggle = (event) => {
        setDebugMode(event.target.checked);
    };

    return (
        <div className="h-screen bg-main flex flex-col items-center justify-center text-white">
            <div className="text-2xl mb-8">
                <input
                    type="checkbox"
                    id="debug-mode"
                    checked={debugMode}
                    onChange={handleDebugToggle}
                    className="mr-2"
                />
                <label htmlFor="debug-mode" className="">
                    Enable debug mode
                </label>
            </div>
            <Link
                to="/"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
                Back to Home
            </Link>
        </div>
    );
}
