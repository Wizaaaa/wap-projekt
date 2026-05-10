import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import "./Kontakty.css";
import {
    ChefHat,
    ArrowRight,
    Phone, Mail,
    MapPin
} from "lucide-react";

import { CiPhone } from "react-icons/ci";

import {
    FaInstagram,
    FaFacebook
} from "react-icons/fa";


export default function Kontakty() {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.querySelector(location.hash);

            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({
                        behavior: "smooth",
                    });
                }, 100);
            }
        }
    }, [location]);
    return (
        <>
            <section className="contacts-section">

                <div className="breadcrumb">
                    <a href="/">Domů</a>
                    <span>/</span>
                    <p>Kontakt</p>
                </div>

                <div className="contacts-container">

                    <div className="contacts-left">

                        <span className="contacts-tag">
                            Kontaktujte nás
                        </span>

                        <h1>Rezervace a kontakty</h1>

                        <p>
                            Máte dotaz, chcete si rezervovat stůl nebo uspořádat oslavu?
                            Neváhejte nás kontaktovat. Rádi Vás přivítáme v restauraci U Janka.
                        </p>

                        <div className="contacts-cards">

                            <div className="contact-card">
                                <div className="contact-icon">
                                    <CiPhone />
                                </div>

                                <div>
                                    <h3>Telefon</h3>
                                    <span>+420 731 405 866</span>
                                </div>
                            </div>

                            <div className="contact-card">
                                <div className="contact-icon">
                                    <Mail />
                                </div>

                                <div>
                                    <h3>Email</h3>
                                    <span>info@u-janka.cz</span>
                                </div>
                            </div>

                            <div className="contact-card">
                                <div className="contact-icon">
                                    <MapPin />
                                </div>

                                <div>
                                    <h3>Adresa</h3>
                                    <span>Karla Veselého 795, Kosmonosy</span>
                                </div>
                            </div>

                        </div>

                        <div className="social-section">
                            <h3>Sledujte nás</h3>

                            <div className="social-buttons">
                                <a
                                    href="https://www.instagram.com/u_janka_restaurace/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-btn instagram"
                                >
                                    <FaInstagram />
                                    Instagram
                                </a>

                                <a
                                    href="https://www.facebook.com/p/Restaurace-U-Janka-100090712841566/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-btn facebook"
                                >
                                    <FaFacebook />
                                    Facebook
                                </a>
                            </div>
                        </div>

                        <div className="opening-hours">

                            <h2>Otevírací doba</h2>

                            <div className="hours-row">
                                <span>Pondělí</span>
                                <span>11:00 - 22:00</span>
                            </div>

                            <div className="hours-row">
                                <span>Úterý</span>
                                <span>11:00 - 22:00</span>
                            </div>

                            <div className="hours-row">
                                <span>Středa</span>
                                <span>11:00 - 22:00</span>
                            </div>

                            <div className="hours-row">
                                <span>Čtvrtek</span>
                                <span>11:00 - 22:00</span>
                            </div>

                            <div className="hours-row">
                                <span>Pátek</span>
                                <span>11:00 - 23:30</span>
                            </div>

                            <div className="hours-row">
                                <span>Sobota</span>
                                <span>11:00 - 23:30</span>
                            </div>

                            <div className="hours-row">
                                <span>Neděle</span>
                                <span>11:00 - 22:00</span>
                            </div>

                        </div>

                    </div>

                    <div className="contacts-form">

                        <h2>Napište nám</h2>

                        <form>

                            <input type="text" placeholder="Vaše jméno" />

                            <input type="email" placeholder="Váš email" />

                            <input type="text" placeholder="Telefon" />

                            <textarea placeholder="Vaše zpráva"></textarea>

                            <button type="submit">
                                Odeslat zprávu
                            </button>

                        </form>

                    </div>

                </div>

            </section>

            <section id="lokace" className="map-section">

                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5082.35500308242!2d14.923319200231928!3d50.437794345054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470955f3f22eee81%3A0x2db3a148caa94267!2sU%20Janka!5e0!3m2!1scs!2scz!4v1778355055383!5m2!1scs!2scz"></iframe>

            </section>

            <footer className="relative mt-16">
                <div className="relative bg-[#2c1e16] text-[#e8dcc8] overflow-hidden rounded-t-[40px] md:rounded-t-[60px] shadow-[0_-10px_40px_rgba(44,30,22,0.15)]">

                    <div
                        className="absolute inset-0 z-0 opacity-[0.07] bg-cover bg-center mix-blend-luminosity"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop')" }}
                    ></div>

                    <div className="relative z-10 container mx-auto px-6 py-16 md:py-20">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

                            <div className="space-y-6">
                                <div className="flex items-center gap-3 text-3xl font-bold text-[#f4a261]">
                                    <ChefHat className="w-9 h-9" />
                                    <span className="tracking-wide">U JANKA</span>
                                </div>
                                <p className="text-[#c2b29f] leading-relaxed text-sm md:text-base pr-4">
                                    Restaurace s dlouholetou tradicí, která se zaměřuje na kvalitní a chutnou českou kuchyni. Vaříme srdcem a z poctivých surovin.
                                </p>
                                <div className="flex gap-4 pt-4">
                                    <a href="https://www.instagram.com/u_janka_restaurace/" className="p-2.5 rounded-2xl bg-[#3e2b1f] border border-[#4a3628] hover:bg-[#f4a261] hover:text-[#2c1e16] hover:-translate-y-1 transition-all duration-300">
                                        <FaInstagram className="w-5 h-5" />
                                    </a>
                                    <a href="https://www.facebook.com/p/Restaurace-U-Janka-100090712841566/" className="p-2.5 rounded-2xl bg-[#3e2b1f] border border-[#4a3628] hover:bg-[#f4a261] hover:text-[#2c1e16] hover:-translate-y-1 transition-all duration-300">
                                        <FaFacebook className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>

                            <div className="lg:ml-8">
                                <h3 className="text-xl font-semibold mb-6 text-white tracking-wide">
                                    Upozornění
                                </h3>

                                <ul className="space-y-4">

                                    <li>
                                        <a
                                            href="#"
                                            className="group flex items-center text-[#c2b29f] hover:text-[#f4a261] transition-colors duration-300"
                                        >
                                            <ArrowRight className="w-4 h-4 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 mr-2" />

                                            <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                                                Alergeny
                                            </span>
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            href="#"
                                            className="group flex items-center text-[#c2b29f] hover:text-[#f4a261] transition-colors duration-300"
                                        >
                                            <ArrowRight className="w-4 h-4 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 mr-2" />

                                            <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                                                Zázemí
                                            </span>
                                        </a>
                                    </li>

                                    <li>
                                        <Link
                                            to="/kontakt#lokace"
                                            className="group flex items-center text-[#c2b29f] hover:text-[#f4a261] transition-colors duration-300"
                                        >
                                            <ArrowRight className="w-4 h-4 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 mr-2" />

                                            <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                                                Lokace
                                            </span>
                                        </Link>
                                    </li>

                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-6 text-white tracking-wide">Nabídka</h3>
                                <ul className="space-y-4">
                                    {['Naše jídla', 'Denní menu', 'Nápojový lístek', 'Zaměstnanci'].map((item) => (
                                        <li key={item}>
                                            <a href="#" className="group flex items-center text-[#c2b29f] hover:text-[#f4a261] transition-colors duration-300">
                                                <ArrowRight className="w-4 h-4 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 mr-2" />
                                                <span className="transform group-hover:translate-x-1 transition-transform duration-300">{item}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-6 text-white tracking-wide">Rezervace a kontakty</h3>
                                <ul className="space-y-5">
                                    <li>
                                        <a href="tel:+420731405866" className="group flex items-center gap-4 text-[#c2b29f] hover:text-[#f4a261] transition-colors duration-300">
                                            <div className="p-2 rounded-lg bg-[#3e2b1f] group-hover:bg-[#f4a261] group-hover:text-[#2c1e16] transition-colors duration-300">
                                                <Phone className="w-4 h-4" />
                                            </div>
                                            <span className="font-medium">+420 731 405 866</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="mailto:info@u-janka.cz" className="group flex items-center gap-4 text-[#c2b29f] hover:text-[#f4a261] transition-colors duration-300">
                                            <div className="p-2 rounded-lg bg-[#3e2b1f] group-hover:bg-[#f4a261] group-hover:text-[#2c1e16] transition-colors duration-300">
                                                <Mail className="w-4 h-4" />
                                            </div>
                                            <span>info@u-janka.cz</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://maps.google.com/?q=Karla+Veselého+795,+Kosmonosy" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 text-[#c2b29f] hover:text-[#f4a261] transition-colors duration-300">
                                            <div className="p-2 rounded-lg bg-[#3e2b1f] group-hover:bg-[#f4a261] group-hover:text-[#2c1e16] transition-colors duration-300">
                                                <MapPin className="w-4 h-4" />
                                            </div>
                                            <span>Karla Veselého 795, Kosmonosy</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>

                    <div className="relative z-10 border-t border-[#4a3628]/50 bg-[#221610]/80 backdrop-blur-sm">
                        <div className="container mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center text-sm text-[#8c7a6b]">
                            <p>© {new Date().getFullYear()} Restaurace U Janka. Všechna práva vyhrazena.</p>
                            <div className="mt-4 md:mt-0 flex gap-6">
                                <a href="#" className="hover:text-[#f4a261] transition-colors">Ochrana osobních údajů</a>
                                <a href="#" className="hover:text-[#f4a261] transition-colors">Podmínky použití</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}