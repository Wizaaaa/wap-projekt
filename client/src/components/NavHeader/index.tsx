import { useState, useEffect, useLayoutEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function NavHeader() {
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isHome = location.pathname === "/" || location.pathname === "/menu";

    const useDarkItems = isScrolled || !isHome;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    /* eslint-disable react-hooks/set-state-in-effect */
    useLayoutEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    const isActive = (path: string) => location.pathname === path;
    const isMenuPath = location.pathname.includes("/menu");

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
                isScrolled
                    ? "bg-[#f7f0e8]/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.06)] py-3"
                    : "bg-transparent py-6"
            }`}
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-14">

                {/* Logo */}
                <Link to="/" className="group">
                    <img
                        src="/logo.svg"
                        alt="Restaurace U Janka"
                        className={`transition-all duration-500 ease-out group-hover:scale-105 ${
                            // Velikost loga se mění jen podle scrollování
                            isScrolled ? "w-20 md:w-28" : "w-24 md:w-32"
                        } ${
                            // Barva loga se mění podle toho, jestli potřebujeme tmavé prvky
                            useDarkItems ? "filter-none opacity-100" : "brightness-0 invert opacity-90"
                        }`}
                        style={{ willChange: "filter, width, transform" }}
                    />
                </Link>

                {/* Navigace Desktopová */}
                <div className="hidden lg:flex items-center gap-6 md:gap-10">
                    <nav className="flex items-center gap-8 text-base md:text-lg font-semibold">

                        {/* DOMŮ */}
                        <Link
                            to="/"
                            className={`relative group transition-colors duration-300 ${
                                useDarkItems
                                    ? isActive("/") ? "text-[#2f241d]" : "text-[#6f6158] hover:text-[#2f241d]"
                                    : "text-white/90 hover:text-white"
                            }`}
                        >
                            Domů
                            <span className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
                                isActive("/") ? "w-full bg-[#c1a089]" : "w-0 bg-[#c1a089] group-hover:w-full"
                            }`}></span>
                        </Link>


                        {/* GALERIE */}
                        <Link
                            to="/galerie"
                            className={`relative group transition-colors duration-300 ${
                                useDarkItems
                                    ? isActive("/galerie") ? "text-[#2f241d]" : "text-[#6f6158] hover:text-[#2f241d]"
                                    : "text-white/90 hover:text-white"
                            }`}
                        >
                            Galerie
                            <span className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
                                isActive("/galerie") ? "w-full bg-[#c1a089]" : "w-0 bg-[#c1a089] group-hover:w-full"
                            }`}></span>
                        </Link>

                        {/* MENU (S DROPDOWNEM) */}
                        <div className="relative group">
                            <Link
                                to="/menu"
                                className={`flex items-center gap-1 relative transition-colors duration-300 py-2 ${
                                    useDarkItems
                                        ? isMenuPath ? "text-[#2f241d]" : "text-[#6f6158] hover:text-[#2f241d]"
                                        : "text-white/90 hover:text-white"
                                }`}
                            >
                                Menu
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-1 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                                <span className={`absolute bottom-1 left-0 h-0.5 transition-all duration-300 ${
                                    isMenuPath ? "w-full bg-[#c1a089]" : "w-0 bg-[#c1a089] group-hover:w-full"
                                }`}></span>
                            </Link>

                            {/* Dropdown nabídka */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-[#f7f0e8] border border-[#e5d5c5] rounded-xl shadow-xl opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 overflow-hidden">
                                <Link to="/menu#hlavni-jidla" className="block px-4 py-3 text-[#6f6158] hover:bg-[#efe2d6] hover:text-[#2f241d] font-medium transition">
                                    Hlavní jídla
                                </Link>
                                <Link to="/menu#speciality" className="block px-4 py-3 text-[#6f6158] hover:bg-[#efe2d6] hover:text-[#2f241d] font-medium transition">
                                    Speciality
                                </Link>
                                <Link to="/menu#napoje" className="block px-4 py-3 text-[#6f6158] hover:bg-[#efe2d6] hover:text-[#2f241d] font-medium transition border-t border-[#e5d5c5]/50">
                                    Nápoje
                                </Link>
                            </div>
                        </div>
                    </nav>

                    {/* CTA Rezervace - desktop */}
                    <Link
                        to="/kontakt"
                        className={`px-4 py-2 md:px-8 md:py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 transform hover:-translate-y-0.5 ${
                            isActive("/kontakt")
                                ? "bg-emerald-600 text-white shadow-[0_4px_20px_rgba(16,185,129,0.3)]"
                                : useDarkItems
                                    ? "bg-[#2f241d] text-white hover:bg-emerald-600 hover:shadow-[0_4px_20px_rgba(16,185,129,0.3)]"
                                    : "bg-white text-[#2f241d] hover:bg-emerald-600 hover:text-white hover:shadow-[0_4px_20px_rgba(16,185,129,0.3)]"
                        }`}
                    >
                        Rezervace
                    </Link>
                </div>

                {/* Mobilní prvky */}
                <div className="flex lg:hidden items-center gap-4">
                    <Link
                        to="/kontakt"
                        className={`px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 transform hover:-translate-y-0.5 ${
                            isActive("/kontakt")
                                ? "bg-emerald-600 text-white shadow-[0_4px_20px_rgba(16,185,129,0.3)]"
                                : useDarkItems
                                    ? "bg-[#2f241d] text-white hover:bg-emerald-600 hover:shadow-[0_4px_20px_rgba(16,185,129,0.3)]"
                                    : "bg-white text-[#2f241d] hover:bg-emerald-600 hover:text-white hover:shadow-[0_4px_20px_rgba(16,185,129,0.3)]"
                        }`}
                    >
                        Rezervace
                    </Link>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`p-2.5 rounded-lg transition-colors cursor-pointer ${
                            useDarkItems
                                ? "text-[#2f241d] hover:bg-[#efe2d6]"
                                : "text-white hover:bg-white/10"
                        }`}
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobilní menu */}
            {isMenuOpen && (
                <div className="lg:hidden fixed top-20 left-0 right-0 bg-[#f7f0e8]/95 backdrop-blur-md border-b border-[#e5d5c5] shadow-lg animate-in slide-in-from-top">
                    <nav className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">

                        {/* Domů */}
                        <Link
                            to="/"
                            className={`px-4 py-3 rounded-lg font-semibold transition-colors ${
                                isActive("/")
                                    ? "bg-[#c1a089]/10 text-[#2f241d]"
                                    : "text-[#6f6158] hover:bg-[#efe2d6] hover:text-[#2f241d]"
                            }`}
                        >
                            Domů
                        </Link>

                        {/* Galerie */}
                        <Link
                            to="/galerie"
                            className={`px-4 py-3 rounded-lg font-semibold transition-colors ${
                                isActive("/galerie")
                                    ? "bg-[#c1a089]/10 text-[#2f241d]"
                                    : "text-[#6f6158] hover:bg-[#efe2d6] hover:text-[#2f241d]"
                            }`}
                        >
                            Galerie
                        </Link>

                        {/* Menu */}
                        <Link
                            to="/menu"
                            className={`px-4 py-3 rounded-lg font-semibold transition-colors ${
                                isMenuPath
                                    ? "bg-[#c1a089]/10 text-[#2f241d]"
                                    : "text-[#6f6158] hover:bg-[#efe2d6] hover:text-[#2f241d]"
                            }`}
                        >
                            Menu
                        </Link>

                        {/* Submenu - Menu volby */}
                        <div className="pl-4 flex flex-col gap-2 border-l-2 border-[#c1a089]/30">
                            <Link
                                to="/menu#hlavni-jidla"
                                className="px-4 py-2 text-sm text-[#6f6158] hover:text-[#2f241d] hover:bg-[#efe2d6] rounded transition-colors"
                            >
                                Hlavní jídla
                            </Link>
                            <Link
                                to="/menu#speciality"
                                className="px-4 py-2 text-sm text-[#6f6158] hover:text-[#2f241d] hover:bg-[#efe2d6] rounded transition-colors"
                            >
                                Speciality
                            </Link>
                            <Link
                                to="/menu#napoje"
                                className="px-4 py-2 text-sm text-[#6f6158] hover:text-[#2f241d] hover:bg-[#efe2d6] rounded transition-colors"
                            >
                                Nápoje
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}