import { Link } from "react-router-dom";
import { ArrowLeftToLine } from "lucide-react"

export default function InfoPage() {
    return (
        <div className="min-h-screen bg-main flex flex-col items-center justify-center text-white">
            <div className="grid gap-8 p-8 text-lg lg:text-2xl rounded-xl bg-custom-black-1">
                <Link
                    to="/"
                    className="w-fit"
                >
                    <ArrowLeftToLine size={28} className="hover:text-custom-green duration-100" />
                </Link>
                <div>
                    <div>Highly inspired by:</div>
                    <ul className="italic text-blue-400">
                        <li>
                            <a href="https://hex-guess.glitch.me/" target="_blank" className="hover:text-blue-600 duration-100">Hex Guess!</a>
                        </li>
                        <li>
                            <a href="https://www.artofvisualdesign.com/fontguessr" target="_blank" className="hover:text-blue-600 duration-100">fontguessr</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}


// TODO: Aggiungere altre info