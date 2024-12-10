import { Link } from "react-router-dom";
import { ArrowLeftToLine } from "lucide-react"

export default function InfoPage() {
    return (
        <div className="min-h-screen bg-main flex flex-col items-center justify-center text-white">
            <div className="flex flex-col gap-14 p-8 text-lg lg:text-xl rounded-xl bg-custom-black border-4 border-zinc-700">
                <div className="flex justify-between">
                    <Link
                        to="/"
                        className="w-fit flex-1"
                    >
                        <ArrowLeftToLine size={28} className="hover:text-custom-green duration-100" />
                    </Link>
                    <div className="text-xl lg:text-2xl">Info</div>
                    <div className="flex-1"></div>
                </div>
                <div>
                    <div className="grid gap-8">
                        <div>
                            <div>Highly inspired by:</div>
                            <ul className="italic text-blue-400">
                                <li>
                                    <a href="https://hex-guess.glitch.me/" target="_blank" className="hover:text-blue-600 duration-100">Hex Guess!</a>
                                </li>
                                <li>
                                    <a href="https://www.artofvisualdesign.com/fontguessr" target="_blank" className="hover:text-blue-600 duration-100">fontguessr</a>
                                </li>
                                <li>
                                    <a href="https://www.monkeytype.com" target="_blank" className="hover:text-blue-600 duration-100">Monkeytype</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


// TODO: Aggiungere altre info