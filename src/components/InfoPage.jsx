import { Link } from "react-router-dom";
import { ArrowLeftToLine } from "lucide-react"

export default function InfoPage() {
    return (
        <div className="min-h-screen bg-main p-4 flex flex-col items-center justify-center text-white">
            <div className="xl:w-1/2 max-w-2xl flex flex-col gap-14 p-8 text-lg lg:text-xl rounded-xl bg-custom-black border-4 border-zinc-700">
                <div className="flex justify-between items-center">
                    <div className="basis-1/3">
                        <Link to="/" className="w-min flex">
                            <ArrowLeftToLine size={28} className="hover:text-custom-green duration-100" />
                        </Link>
                    </div>
                    <div className="basis-1/3 text-xl lg:text-2xl text-center">Info</div>
                    <div className="basis-1/3"></div>
                </div>
                <div>
                    <div className="grid gap-16">
                        <div>
                            <div className="bg-custom-violet text-black font-bold px-1">WHAT IS GUESS THE FONT</div>
                            <div className="my-2">Guess The Font is... just a game about guessing the font. Yeah I know, who whould have thought, right?</div>
                            <div className="my-4">But wait, seriously, the main concept is actually to get people to discover new fonts and improve their knowledge about typography. Or at least this was the initial purpose.</div>
                        </div>
                        <div>
                            <div className="bg-custom-violet text-black font-bold px-1">SOME DESERVED CREDITS</div>
                            <div className="my-2">These amazing websites gave me the inspiration for this project, so please take a look and have fun:</div>
                            <ul className="ml-4 mt-2">
                                <li>
                                    ◇ <a href="https://hex-guess.glitch.me/" target="_blank" className="italic text-blue-400 hover:text-blue-600 duration-100">Hex Guess!</a>
                                </li>
                                <li>
                                    ◇ <a href="https://www.artofvisualdesign.com/fontguessr" target="_blank" className="italic text-blue-400 hover:text-blue-600 duration-100">fontguessr</a>
                                </li>
                                <li>
                                    ◇ <a href="https://www.monkeytype.com" target="_blank" className="italic text-blue-400 hover:text-blue-600 duration-100">Monkeytype</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <div className="bg-custom-violet text-black font-bold px-1">CAN YOU SCORE HIGHER THAN ME?</div>
                            <div className="my-2">I mean... I literally never guessed any, so...</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


// TODO: Aggiungere altre info