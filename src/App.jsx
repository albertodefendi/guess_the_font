import "./App.css";
import { version as projectVersion } from "../package.json";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import SettingsPage from "./components/SettingsPage";
import InfoPage from "./components/InfoPage";
import { SettingsProvider } from "./components/SettingsContext";
import { useUltraInstinct } from "./components/SettingsContext";
import fonts from "./assets/google_fonts_list.json";
import Title from "./components/Title";
import GuessSection from "./components/GuessSection";
import { Settings, Info, Bug } from "lucide-react";
import { getRandomFont, appendFontToHtml, fontRegexUrl } from "./components/UtilityFunctions";

const currentYear = new Date().getFullYear();
const fontsArray = fonts.fonts.map((font) => font.name); // Font names array
const fontsNumber = fontsArray.length;
const fontsDate = fonts.date;

function HomePage() {
	const { ultraInstinct } = useUltraInstinct();
	const [currentFont, setCurrentFont] = useState(""); // State for the current font
	const [currentStreak, setCurrentStreak] = useState(() => {
		// Inizializza da localStorage
		const savedStreak = localStorage.getItem("currentStreak");
		if (ultraInstinct) return 0;
		else return savedStreak ? parseInt(savedStreak, 10) : 0;
	});
	const [highestStreak, setHighestStreak] = useState(() => {
		// Inizializza da localStorage
		const savedHighest = localStorage.getItem("highestStreak");
		return savedHighest ? parseInt(savedHighest, 10) : 0;
	});
	const customText = localStorage.getItem("customText");

	// Initializes the data from localStorage on page load.
	useEffect(() => {
		const savedFont = localStorage.getItem("currentFont"); // Retrieves the saved font
		if (savedFont) {
			setCurrentFont(savedFont);
			appendFontToHtml(savedFont);
		} else {
			const randomFont = getRandomFont();
			appendFontToHtml(randomFont);
			setCurrentFont(randomFont);
		}
	}, []);

	// Updates local storage on font change
	useEffect(() => {
		if (currentFont) {
			localStorage.setItem("currentFont", currentFont);
		}
	}, [currentFont]);

	// Updates local storage on streak change
	useEffect(() => {
		localStorage.setItem("currentStreak", currentStreak);
		localStorage.setItem("highestStreak", highestStreak);
	}, [currentStreak, highestStreak]);

	// Function to change the font and update the streaks
	const handleGuess = (value) => {
		if (!ultraInstinct && value === currentFont) {
			setCurrentStreak((prev) => {
				const newStreak = prev + 1;
				if (newStreak > highestStreak) {
					setHighestStreak(newStreak);
				}
				return newStreak;
			});
		} else {
			setCurrentStreak(0);
		}
		setCurrentFont(localStorage.getItem("currentFont"));
	};

	return (
		<div className="bg-main min-h-screen flex justify-center items-center transition-opacity duration-500">
			<div className="max-w-4xl grid p-4 gap-8 lg:gap-24 text-xl lg:text-3xl">
				<Title currentGuessFont={currentFont} />
				<div className="w-full grid gap-8">
					<div className="w-auto flex flex-col gap-4">
						<div
							className="w-full min-h-48 p-8 flex justify-center items-center text-center bg-custom-black-1 border-4 border-custom-green text-custom-violet rounded-3xl [overflow-wrap:anywhere]"
							style={{ fontFamily: currentFont }}
						>
							{customText ||
								"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo esse accusamus quasi magni totam? Nesciunt, harum!"}
						</div>
					</div>
					<GuessSection fontsArray={fontsArray} handleGuess={handleGuess} currentFont={currentFont} ultraInstinct={ultraInstinct} />
				</div>
				<div
					className={`grid gap-4 text-lg lg:text-2xl justify-center ${ultraInstinct ? "text-zinc-500" : "text-white"
						}`}
				>
					<div>Current streak: {currentStreak}</div>
					<div>Highest streak: {highestStreak}</div>
				</div>
				<div className="flex justify-between mt-24 lg:mt-0">
					<div className="flex flex-col gap-2 justify-center text-white text-sm">
						<div>© {currentYear} | Made by:&nbsp;
							<a href="https://albertodefendi.netlify.app" target="_blank" className="underline hover:text-custom-green">Alberto Defendi</a>
						</div>
						<div>v{projectVersion}</div>
					</div>
					<div className="flex gap-4">
						{/* <Link to="/bug">
              <Bug
                size={32}
                className="text-white hover:text-custom-green duration-100"
              />
            </Link> */}
						<Link to="/info">
							<Info
								size={32}
								className="text-white hover:text-custom-green duration-100"
							/>
						</Link>
						<Link to="/settings">
							<Settings
								size={32}
								className="text-white hover:text-custom-green duration-100"
							/>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default function App() {
	return (
		<SettingsProvider>
			<Router>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/settings" element={<SettingsPage />} />
					<Route path="/info" element={<InfoPage fontsNumber={fontsNumber} fontsDate={fontsDate} />} />
				</Routes>
			</Router>
		</SettingsProvider>
	);
}

// TODO: figure out if I need to handle cookies
// TODO: add the bug report section.
// TODO: Add a "Share Results" button.