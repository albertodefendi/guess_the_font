// components/PageLoader.jsx
import React from "react";

export default function PageLoader() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-dark text-white z-50">
            <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
    );
};
