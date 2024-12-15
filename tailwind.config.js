const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "override-black": "#000000",
        "custom-violet": "#9578d3",
        "custom-green": "#00ce7c",
        "custom-black": "#181c18",
        "custom-black-1": "#222222",
        "custom-black-2": "#2a2a2a",
      },
      fontFamily: {
        sans: ["Parkinsans", "ui-sans-serif", "system-ui"],
      },
      backgroundImage: {
        "main": "url('/main_bg.webp')"
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
  ],
}