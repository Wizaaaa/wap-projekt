import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Calendar, Clock, Users, Mail, MapPin, Phone, Info, CheckCircle2 } from "lucide-react";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import Footer from "../../components/Footer";
import NavHeader from "../../components/NavHeader";

export default function Kontakty() {
    const location = useLocation();

    // Stavy pro formulář, aby to působilo jako skutečná appka
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Plynulý scroll na mapu
    useEffect(() => {
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                setTimeout(() => element.scrollIntoView({ behavior: "smooth" }), 100);
            }
        }
    }, [location]);

    // Falešné odeslání formuláře pro efekt
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulace komunikace se serverem
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
        }, 1500);
    };

    return (
        <div className="bg-[#f7f0e8] min-h-screen font-sans selection:bg-[#c1a089] selection:text-white">
            <NavHeader />

            <main className="max-w-7xl mx-auto px-6 md:px-14 pt-36 pb-24">

                {/* HLAVNÍ NADPIS */}
                <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
                    <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#efe2d6] text-[#c1a089] font-bold tracking-widest uppercase text-xs mb-6 shadow-sm border border-[#e5d5c5]">
                        Váš stůl čeká
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-[#2f241d] leading-tight mb-6">
                        Rezervace stolu
                    </h1>
                    <p className="text-xl text-[#6f6158] leading-relaxed font-light">
                        Vyberte si termín, čas a počet osob. O zbytek se už postaráme my. Těšíme se na Vaši návštěvu u Janka.
                    </p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-20 items-start">

                    {/* LEVÝ SLOUPEC - REZERVAČNÍ FORMULÁŘ */}
                    <div className="xl:col-span-7 relative z-10">
                        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_60px_rgba(47,36,29,0.06)] border border-[#e5d5c5]/50">

                            {isSuccess ? (
                                /* SUCCESS STATE VZHLED */
                                <div className="text-center py-16 animate-fade-in-up">
                                    <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-100">
                                        <CheckCircle2 className="w-12 h-12" />
                                    </div>
                                    <h3 className="text-4xl font-black text-[#2f241d] mb-4">Máme to!</h3>
                                    <p className="text-xl text-[#6f6158] mb-8 max-w-md mx-auto">
                                        Vaše rezervace byla úspěšně odeslána. Brzy se Vám ozveme pro její potvrzení.
                                    </p>
                                    <button
                                        onClick={() => setIsSuccess(false)}
                                        className="px-8 py-4 bg-[#f7f0e8] text-[#2f241d] rounded-2xl font-bold hover:bg-[#efe2d6] transition-colors"
                                    >
                                        Nová rezervace
                                    </button>
                                </div>
                            ) : (
                                /* FORMULÁŘ */
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="pb-6 border-b border-[#e5d5c5]/60">
                                        <h3 className="text-2xl font-bold text-[#2f241d] mb-6 flex items-center gap-3">
                                            <span className="w-8 h-8 rounded-full bg-[#c1a089] text-white flex items-center justify-center text-sm">1</span>
                                            Kdy dorazíte?
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                            {/* Datum */}
                                            <div className="relative">
                                                <label className="block text-sm font-bold text-[#6f6158] mb-2 pl-1">Datum</label>
                                                <div className="relative">
                                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#c1a089] pointer-events-none" />
                                                    <input required type="date" className="w-full bg-[#f7f0e8] border border-transparent rounded-2xl pl-12 pr-4 py-4 text-[#2f241d] font-medium focus:bg-white focus:border-[#c1a089] focus:ring-4 focus:ring-[#c1a089]/20 outline-none transition-all cursor-pointer" />
                                                </div>
                                            </div>
                                            {/* Čas */}
                                            <div className="relative">
                                                <label className="block text-sm font-bold text-[#6f6158] mb-2 pl-1">Čas</label>
                                                <div className="relative">
                                                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#c1a089] pointer-events-none" />
                                                    <input required type="time" min="11:00" max="22:00" className="w-full bg-[#f7f0e8] border border-transparent rounded-2xl pl-12 pr-4 py-4 text-[#2f241d] font-medium focus:bg-white focus:border-[#c1a089] focus:ring-4 focus:ring-[#c1a089]/20 outline-none transition-all cursor-pointer" />
                                                </div>
                                            </div>
                                            {/* Osob */}
                                            <div className="relative">
                                                <label className="block text-sm font-bold text-[#6f6158] mb-2 pl-1">Počet osob</label>
                                                <div className="relative">
                                                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#c1a089] pointer-events-none" />
                                                    <input required type="number" min="1" max="20" placeholder="2 osoby" className="w-full bg-[#f7f0e8] border border-transparent rounded-2xl pl-12 pr-4 py-4 text-[#2f241d] font-medium placeholder:font-normal placeholder-[#9a8577] focus:bg-white focus:border-[#c1a089] focus:ring-4 focus:ring-[#c1a089]/20 outline-none transition-all" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pb-6 border-b border-[#e5d5c5]/60">
                                        <h3 className="text-2xl font-bold text-[#2f241d] mb-6 flex items-center gap-3">
                                            <span className="w-8 h-8 rounded-full bg-[#c1a089] text-white flex items-center justify-center text-sm">2</span>
                                            Vaše údaje
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div>
                                                <input required type="text" placeholder="Jméno a příjmení" className="w-full bg-[#f7f0e8] border border-transparent rounded-2xl px-5 py-4 text-[#2f241d] placeholder-[#9a8577] focus:bg-white focus:border-[#c1a089] focus:ring-4 focus:ring-[#c1a089]/20 outline-none transition-all" />
                                            </div>
                                            <div>
                                                <input required type="tel" placeholder="Telefonní číslo" className="w-full bg-[#f7f0e8] border border-transparent rounded-2xl px-5 py-4 text-[#2f241d] placeholder-[#9a8577] focus:bg-white focus:border-[#c1a089] focus:ring-4 focus:ring-[#c1a089]/20 outline-none transition-all" />
                                            </div>
                                            <div className="md:col-span-2">
                                                <input required type="email" placeholder="E-mail (pro potvrzení)" className="w-full bg-[#f7f0e8] border border-transparent rounded-2xl px-5 py-4 text-[#2f241d] placeholder-[#9a8577] focus:bg-white focus:border-[#c1a089] focus:ring-4 focus:ring-[#c1a089]/20 outline-none transition-all" />
                                            </div>
                                            <div className="md:col-span-2">
                                                <textarea placeholder="Speciální požadavky (dětská židlička, oslava, dieta...)" rows={3} className="w-full bg-[#f7f0e8] border border-transparent rounded-2xl px-5 py-4 text-[#2f241d] placeholder-[#9a8577] focus:bg-white focus:border-[#c1a089] focus:ring-4 focus:ring-[#c1a089]/20 outline-none transition-all resize-none"></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-[#2f241d] text-white py-5 rounded-2xl font-black text-xl hover:bg-[#c1a089] hover:shadow-[0_15px_30px_rgba(193,160,137,0.4)] transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed flex justify-center items-center gap-3"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                Odesílám...
                                            </>
                                        ) : "Potvrdit rezervaci"}
                                    </button>

                                    <div className="flex items-start gap-3 justify-center text-sm text-[#9a8577]">
                                        <Info className="w-4 h-4 shrink-0 mt-0.5" />
                                        <p>Rezervace je platná až po našem zpětném potvrzení (telefonicky nebo e-mailem).</p>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* PRAVÝ SLOUPEC - KONTAKTY A INFO */}
                    <div className="xl:col-span-5 space-y-8 lg:sticky lg:top-32">

                        {/* Rychlý kontakt */}
                        <div className="bg-[#efe2d6] rounded-[2rem] p-8 shadow-sm border border-[#e5d5c5]/50">
                            <h3 className="text-2xl font-black text-[#2f241d] mb-6">Máte speciální přání?</h3>
                            <div className="space-y-4">
                                <a href="tel:+420731405866" className="flex items-center gap-4 p-4 bg-white rounded-2xl hover:shadow-md transition group">
                                    <div className="bg-[#f7f0e8] p-3 rounded-xl text-[#c1a089] group-hover:scale-110 transition">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#6f6158] uppercase">Zavolejte nám</p>
                                        <p className="text-lg font-bold text-[#2f241d]">+420 731 405 866</p>
                                    </div>
                                </a>
                                <a href="mailto:info@u-janka.cz" className="flex items-center gap-4 p-4 bg-white rounded-2xl hover:shadow-md transition group">
                                    <div className="bg-[#f7f0e8] p-3 rounded-xl text-[#c1a089] group-hover:scale-110 transition">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#6f6158] uppercase">Napište nám</p>
                                        <p className="text-lg font-bold text-[#2f241d]">info@u-janka.cz</p>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Otevírací doba */}
                        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-[#e5d5c5]/50">
                            <h3 className="text-2xl font-black text-[#2f241d] mb-6">Otevírací doba</h3>
                            <div className="space-y-4 text-lg">
                                <div className="flex justify-between items-center pb-4 border-b border-[#e5d5c5]/50">
                                    <span className="text-[#6f6158]">Pondělí - Čtvrtek</span>
                                    <span className="font-bold text-[#2f241d]">11:00 - 22:00</span>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b border-[#e5d5c5]/50">
                                    <span className="text-[#6f6158]">Pátek - Sobota</span>
                                    <span className="font-bold text-[#2f241d]">11:00 - 23:30</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[#6f6158]">Neděle</span>
                                    <span className="font-bold text-[#2f241d]">11:00 - 22:00</span>
                                </div>
                            </div>
                        </div>

                        {/* Sítě */}
                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/u_janka_restaurace/" target="_blank" rel="noopener noreferrer" className="flex-1 flex justify-center items-center gap-3 py-4 bg-white rounded-2xl border border-[#e5d5c5]/50 text-[#c1a089] hover:bg-[#c1a089] hover:text-white transition group font-bold">
                                <FaInstagram className="text-2xl" /> Instagram
                            </a>
                            <a href="https://www.facebook.com/p/Restaurace-U-Janka-100090712841566/" target="_blank" rel="noopener noreferrer" className="flex-1 flex justify-center items-center gap-3 py-4 bg-white rounded-2xl border border-[#e5d5c5]/50 text-[#c1a089] hover:bg-[#c1a089] hover:text-white transition group font-bold">
                                <FaFacebook className="text-2xl" /> Facebook
                            </a>
                        </div>
                    </div>

                </div>
            </main>

            {/* MAPA NADOLE */}
            <section id="lokace" className="w-full h-[400px] relative">
                <div className="absolute inset-0 bg-black/10 pointer-events-none z-10"></div>
                <iframe
                    title="Mapa Restaurace U Janka"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5082.35500308242!2d14.923319200231928!3d50.437794345054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470955f3f22eee81%3A0x2db3a148caa94267!2sU%20Janka!5e0!3m2!1scs!2scz!4v1778355055383!5m2!1scs!2scz"
                    className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
                    loading="lazy"
                ></iframe>

                {/* Štítek na mapě pro lepší orientaci */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 md:left-14 md:translate-x-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-2xl border border-[#e5d5c5]">
                    <p className="text-xs font-bold text-[#c1a089] uppercase tracking-widest mb-1">Kde nás najdete</p>
                    <p className="text-lg font-black text-[#2f241d] flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-[#c1a089] shrink-0" />
                        Karla Veselého 795, Kosmonosy
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
}