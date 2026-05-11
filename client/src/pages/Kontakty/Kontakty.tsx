import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./Kontakty.css";
import { Mail, MapPin } from "lucide-react";

import { CiPhone } from "react-icons/ci";

import {
    FaInstagram,
    FaFacebook
} from "react-icons/fa";
import Footer from "../../components/Footer";


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

            <Footer />
        </>
    );
}