import { Link } from "react-router-dom";
import { ArrowLeftToLine } from "lucide-react"

export default function InfoPage() {
    return (
        <div className="min-h-screen bg-main flex flex-col items-center justify-center text-white">
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