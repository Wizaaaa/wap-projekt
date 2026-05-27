import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Calendar, Clock, Users, Mail, Phone, Info, CheckCircle2, AlertTriangle, Minus, Plus } from "lucide-react";
import Footer from "../../components/Footer";
import NavHeader from "../../components/NavHeader";

export default function Kontakty() {
    const location = useLocation();

    const [formData, setFormData] = useState({
        date: "",
        time: "",
        guests: 2,
        name: "",
        phone: "",
        email: "",
        notes: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [error, setError] = useState<{ show: boolean, message: string }>({ show: false, message: "" });

    const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);

    const todayStr = new Date().toISOString().split('T')[0];

    useEffect(() => {
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                setTimeout(() => element.scrollIntoView({ behavior: "smooth" }), 100);
            }
        }
    }, [location]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const updateGuests = (change: number) => {
        setFormData(prev => {
            const newGuests = prev.guests + change;
            if (newGuests < 1 || newGuests > 30) return prev;
            return { ...prev, guests: newGuests };
        });
    };

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const now = Date.now();
        if (now - lastSubmitTime < 60000) {
            setError({ show: true, message: "Zpomalte. Další rezervaci můžete odeslat až za minutu." });
            return;
        }

        setIsSubmitting(true);
        setError({ show: false, message: "" });
        setIsSuccess(false);

        try {
            const response = await fetch("http://localhost:3000/api/reservations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                console.error("Chyba serveru: odpověď není OK.");
                setError({ show: true, message: "Něco se pokazilo. Zkuste to prosím znovu." });
                return;
            }

            setIsSuccess(true);
            setLastSubmitTime(now);
            setFormData({ date: "", time: "", guests: 2, name: "", phone: "", email: "", notes: "" });

        } catch (err) {
            console.error("Síťová chyba:", err);
            setError({ show: true, message: "Něco se pokazilo. Zkontrolujte připojení k internetu a zkuste to znovu." });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-[#f7f0e8] min-h-screen font-sans selection:bg-[#c1a089] selection:text-white flex flex-col">
            <NavHeader />

            <main className="max-w-7xl mx-auto px-6 md:px-14 pt-36 pb-24 grow w-full">

                <div className="text-center max-w-3xl mx-auto mb-16 animate-[fadeIn_0.5s_ease-out]">
                    <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#efe2d6] text-[#c1a089] font-bold tracking-widest uppercase text-[10px] md:text-xs mb-6 shadow-sm border border-[#e5d5c5]">
                        Váš stůl čeká
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-[#2f241d] leading-[1.1] mb-6 tracking-tight">
                        Rezervace stolu
                    </h1>
                    <p className="text-lg md:text-xl text-[#6f6158] leading-relaxed font-light">
                        Vyberte si termín, čas a počet osob. O zbytek se už postaráme my. Těšíme se na Vaši návštěvu u Janka.
                    </p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-20 items-start">

                    {/* LEVÝ SLOUPEC - REZERVAČNÍ FORMULÁŘ */}
                    <div className="xl:col-span-7 relative z-10">
                        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_60px_rgba(47,36,29,0.04)] border border-[#e5d5c5]/50 overflow-hidden relative">

                            {/* Vylepšená chybová hláška */}
                            {error.show && (
                                <div className="absolute top-0 left-0 w-full bg-rose-50 border-b border-rose-100 p-4 text-rose-700 text-center font-bold text-sm flex items-center justify-center gap-2 animate-[slideDown_0.3s_ease] z-20">
                                    <AlertTriangle className="w-5 h-5 shrink-0" />
                                    <span>{error.message}</span>
                                </div>
                            )}

                            {isSuccess ? (
                                /* LUXUSNÍ SUCCESS STATE */
                                <div className="text-center py-16 animate-[fadeIn_0.6s_ease-in-out]">
                                    <div className="relative w-28 h-28 mx-auto mb-8">
                                        <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-50"></div>
                                        <div className="relative w-full h-full bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(16,185,129,0.2)]">
                                            <CheckCircle2 className="w-14 h-14" />
                                        </div>
                                    </div>
                                    <h3 className="text-4xl font-black text-[#2f241d] mb-4">Máme to!</h3>
                                    <p className="text-lg md:text-xl text-[#6f6158] mb-10 max-w-md mx-auto font-light leading-relaxed">
                                        Vaše rezervace byla bezpečně odeslána. Brzy se Vám ozveme pro její potvrzení.
                                    </p>
                                    <button
                                        onClick={() => setIsSuccess(false)}
                                        className="px-10 py-4 bg-[#f7f0e8] text-[#2f241d] border border-[#e5d5c5]/50 rounded-full font-bold hover:bg-[#2f241d] hover:text-white transition-colors duration-300 shadow-sm"
                                    >
                                        Nová rezervace
                                    </button>
                                </div>
                            ) : (
                                /* FORMULÁŘ */
                                <form onSubmit={handleSubmit} className={`space-y-10 transition-opacity duration-300 ${isSubmitting ? "opacity-50 pointer-events-none" : "opacity-100"} ${error.show ? "pt-8" : "pt-2"}`}>

                                    {/* KROK 1: Kdy a kolik */}
                                    <div className="pb-8 border-b border-[#e5d5c5]/60">
                                        <h3 className="text-2xl font-bold text-[#2f241d] mb-8 flex items-center gap-3">
                                            <span className="w-8 h-8 rounded-full bg-[#c1a089] text-white flex items-center justify-center text-sm shadow-md">1</span>
                                            Kdy dorazíte?
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                                            {/* Datum s omezením (min={todayStr}) */}
                                            <div className="relative">
                                                <label className="block text-xs font-bold uppercase tracking-widest text-[#9a8577] mb-2 pl-1">Datum</label>
                                                <div className="relative">
                                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#c1a089] pointer-events-none" />
                                                    <input
                                                        required
                                                        name="date"
                                                        value={formData.date}
                                                        onChange={handleChange}
                                                        type="date"
                                                        min={todayStr}
                                                        className="w-full bg-[#f7f0e8] border border-[#e5d5c5]/50 rounded-2xl pl-12 pr-4 py-4 text-[#2f241d] font-bold focus:bg-white focus:border-[#c1a089] focus:ring-4 focus:ring-[#c1a089]/20 outline-none transition-all cursor-pointer"
                                                    />
                                                </div>
                                            </div>

                                            {/* Čas */}
                                            <div className="relative">
                                                <label className="block text-xs font-bold uppercase tracking-widest text-[#9a8577] mb-2 pl-1">Čas</label>
                                                <div className="relative">
                                                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#c1a089] pointer-events-none" />
                                                    <input
                                                        required
                                                        name="time"
                                                        value={formData.time}
                                                        onChange={handleChange}
                                                        type="time"
                                                        min="11:00"
                                                        max="22:00"
                                                        className="w-full bg-[#f7f0e8] border border-[#e5d5c5]/50 rounded-2xl pl-12 pr-4 py-4 text-[#2f241d] font-bold focus:bg-white focus:border-[#c1a089] focus:ring-4 focus:ring-[#c1a089]/20 outline-none transition-all cursor-pointer"
                                                    />
                                                </div>
                                            </div>

                                            {/* Vlastní krásný UI prvek pro Počet osob */}
                                            <div className="relative">
                                                <label className="block text-xs font-bold uppercase tracking-widest text-[#9a8577] mb-2 pl-1">Osob</label>
                                                <div className="relative flex items-center bg-[#f7f0e8] border border-[#e5d5c5]/50 rounded-2xl h-14.5 overflow-hidden">
                                                    <button
                                                        type="button"
                                                        onClick={() => updateGuests(-1)}
                                                        className="w-12 h-full flex items-center justify-center text-[#c1a089] hover:bg-black/5 transition-colors cursor-pointer active:bg-black/10"
                                                    >
                                                        <Minus className="w-5 h-5" />
                                                    </button>
                                                    <div className="flex-1 flex items-center justify-center font-bold text-[#2f241d] bg-white h-full border-x border-[#e5d5c5]/50">
                                                        <Users className="w-4 h-4 text-[#c1a089] mr-2" />
                                                        {formData.guests}
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => updateGuests(1)}
                                                        className="w-12 h-full flex items-center justify-center text-[#c1a089] hover:bg-black/5 transition-colors cursor-pointer active:bg-black/10"
                                                    >
                                                        <Plus className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* KROK 2: Kontaktní údaje */}
                                    <div className="pb-8 border-b border-[#e5d5c5]/60">
                                        <h3 className="text-2xl font-bold text-[#2f241d] mb-8 flex items-center gap-3">
                                            <span className="w-8 h-8 rounded-full bg-[#c1a089] text-white flex items-center justify-center text-sm shadow-md">2</span>
                                            Vaše údaje
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div>
                                                <input required name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Jméno a příjmení" className="w-full bg-[#f7f0e8] border border-[#e5d5c5]/50 rounded-2xl px-5 py-4 text-[#2f241d] font-medium placeholder-[#9a8577] focus:bg-white focus:border-[#c1a089] focus:ring-4 focus:ring-[#c1a089]/20 outline-none transition-all" />
                                            </div>
                                            <div>
                                                <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="Telefonní číslo" className="w-full bg-[#f7f0e8] border border-[#e5d5c5]/50 rounded-2xl px-5 py-4 text-[#2f241d] font-medium placeholder-[#9a8577] focus:bg-white focus:border-[#c1a089] focus:ring-4 focus:ring-[#c1a089]/20 outline-none transition-all" />
                                            </div>
                                            <div className="md:col-span-2">
                                                <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="E-mail (pro potvrzení)" className="w-full bg-[#f7f0e8] border border-[#e5d5c5]/50 rounded-2xl px-5 py-4 text-[#2f241d] font-medium placeholder-[#9a8577] focus:bg-white focus:border-[#c1a089] focus:ring-4 focus:ring-[#c1a089]/20 outline-none transition-all" />
                                            </div>
                                            <div className="md:col-span-2">
                                                <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Speciální požadavky (dětská židlička, oslava, dieta...)" rows={3} className="w-full bg-[#f7f0e8] border border-[#e5d5c5]/50 rounded-2xl px-5 py-4 text-[#2f241d] font-medium placeholder-[#9a8577] focus:bg-white focus:border-[#c1a089] focus:ring-4 focus:ring-[#c1a089]/20 outline-none transition-all resize-none"></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    {/* TLAČÍTKO ODESLAT */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-linear-to-r from-[#2f241d] to-[#4a3628] text-white py-5 rounded-2xl font-black text-xl hover:shadow-[0_15px_30px_rgba(47,36,29,0.3)] transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-90 disabled:hover:translate-y-0 disabled:cursor-not-allowed flex justify-center items-center gap-3 overflow-hidden relative cursor-pointer active:scale-[0.98]"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="absolute inset-0 bg-black/20 flex justify-center items-center">
                                                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                </div>
                                                <span className="opacity-0">Potvrdit rezervaci</span>
                                            </>
                                        ) : (
                                            "Potvrdit rezervaci"
                                        )}
                                    </button>

                                    <div className="flex items-start gap-3 justify-center text-sm text-[#9a8577] mt-4">
                                        <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#c1a089]" />
                                        <p>Rezervace je platná až po našem zpětném potvrzení (telefonicky nebo e-mailem).</p>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* PRAVÝ SLOUPEC - KONTAKTY */}
                    <div className="xl:col-span-5 space-y-8 lg:sticky lg:top-32">
                        <div className="bg-[#efe2d6] rounded-4xl p-8 shadow-sm border border-[#e5d5c5]/50 hover:shadow-lg transition duration-500">
                            <h3 className="text-2xl font-black text-[#2f241d] mb-6">Máte speciální přání?</h3>
                            <div className="space-y-4">
                                <a href="tel:+420731405866" className="flex items-center gap-5 p-5 bg-white rounded-2xl hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                                    <div className="bg-[#f7f0e8] p-3.5 rounded-xl text-[#c1a089] group-hover:bg-[#c1a089] group-hover:text-white transition-colors">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-[#9a8577] uppercase tracking-widest">Zavolejte nám</p>
                                        <p className="text-lg font-bold text-[#2f241d]">+420 731 405 866</p>
                                    </div>
                                </a>
                                <a href="mailto:info@u-janka.cz" className="flex items-center gap-5 p-5 bg-white rounded-2xl hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                                    <div className="bg-[#f7f0e8] p-3.5 rounded-xl text-[#c1a089] group-hover:bg-[#c1a089] group-hover:text-white transition-colors">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-[#9a8577] uppercase tracking-widest">Napište nám</p>
                                        <p className="text-lg font-bold text-[#2f241d]">info@u-janka.cz</p>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <div className="bg-white rounded-4xl p-8 shadow-sm border border-[#e5d5c5]/50">
                            <h3 className="text-2xl font-black text-[#2f241d] mb-6">Otevírací doba</h3>
                            <div className="space-y-4 text-lg">
                                <div className="flex justify-between items-center pb-4 border-b border-[#e5d5c5]/50">
                                    <span className="text-[#6f6158] font-medium">Pondělí - Čtvrtek</span>
                                    <span className="font-bold text-[#2f241d]">11:00 - 22:00</span>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b border-[#e5d5c5]/50">
                                    <span className="text-[#6f6158] font-medium">Pátek - Sobota</span>
                                    <span className="font-bold text-[#2f241d]">11:00 - 23:30</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[#6f6158] font-medium">Neděle</span>
                                    <span className="font-bold text-[#2f241d]">11:00 - 22:00</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <style>{`
                @keyframes slideDown {
                    from { transform: translateY(-100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-\\[slideDown_0\\.3s_ease\\] {
                    animation: slideDown 0.3s ease forwards;
                }
            `}</style>

            <Footer />
        </div>
    );
}