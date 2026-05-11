import { Link } from "react-router-dom";

export default function NavHeader() {
    return (
        <header className="flex justify-between items-center bg-background px-6 py-4 md:px-12 md:py-6">
            <a href="/">
                <img
                    src="/logo.svg"
                    alt="logo"
                    className="w-24 md:w-32 transition-transform hover:scale-105"
                />
            </a>

            <div className="flex items-center gap-6 md:gap-10 text-base md:text-lg font-medium text-main-text">
            <Link to="/galerie" className="hover:text-black transition-colors">
                    Galerie
                </Link>
                <Link to="/menu" className="hover:text-black transition-colors">
                    Menu
                </Link>
                <Link to="/kontakt" className="bg-black text-white px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-colors shadow-sm">
                    Rezervace a kontakty
                </Link>
            </div>
        </header>
    )
}