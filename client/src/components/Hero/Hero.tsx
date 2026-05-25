import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./Hero.module.css"; // Předpokládám, že pro pozadí použijete CSS modul

export default function Hero() {
    const [openStatus, setOpenStatus] = useState({
        state: "checking", // open, closing, closed
        text: "Kontrolujeme...",
        color: "bg-gray-400",
    });

    useEffect(() => {
        // Definice otevírací doby (příklad: Po-Pá 11-22, So-Ne 12-23)
        const openingHours = {
            weekday: { open: 11, close: 22 },
            weekend: { open: 12, close: 23 },
        };

        const updateStatus = () => {
            const now = new Date();
            const day = now.getDay(); // 0 = Neděle, 1 = Pondělí, ...
            const hour = now.getHours();

            const isWeekend = (day === 0 || day === 6);
            const hours = isWeekend ? openingHours.weekend : openingHours.weekday;

            if (hour >= hours.open && hour < hours.close - 1) {
                setOpenStatus({
                    state: "open",
                    text: "Nyní otevřeno",
                    color: "bg-emerald-500", // Zelená
                });
            } else if (hour === hours.close - 1) {
                setOpenStatus({
                    state: "closing",
                    text: "Brzy zavíráme",
                    color: "bg-amber-500", // Oranžová
                });
            } else {
                setOpenStatus({
                    state: "closed",
                    text: "Momentálně zavřeno",
                    color: "bg-rose-500", // Červená
                });
            }
        };

        updateStatus();
        // Kontrola každou minutu
        const intervalId = setInterval(updateStatus, 60000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <section className={`grid grid-cols-1 md:grid-cols-2 min-h-[90vh] ${style.heroContainer} overflow-hidden`}>
            {/* Levá textová část s kořením */}
            <div className={`${style.spiceBackground} p-10 md:p-20 flex flex-col justify-center animate-enter-fade-in relative`}>
                {/* Indikátor otevírací doby */}
                <div className="absolute top-10 left-10 flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
          <span className={`relative flex h-3 w-3`}>
            {/* Blikání pouze pokud je otevřeno nebo brzy zavíráme */}
              {(openStatus.state === "open" || openStatus.state === "closing") && (
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${openStatus.color} opacity-75`}></span>
              )}
              <span className={`relative inline-flex rounded-full h-3 w-3 ${openStatus.color}`}></span>
          </span>
                    <span className="text-white font-medium text-sm tracking-wide">
            {openStatus.text}
          </span>
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] mb-6 max-w-4xl drop-shadow-xl animate-enter-slide-up animation-delay-200">
                    Vítáme Vás v restauraci U Janka
                </h1>

                <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed max-w-xl mb-12 drop-shadow-lg animate-enter-slide-up animation-delay-400">
                    Právě jste otevřeli virtuální dveře do naší restaurace. Doufáme, že se Vám tu bude líbit a brzy nás navštívíte i osobně.
                </p>

                {/* Tlačítka s animací */}
                <div className="flex gap-4 animate-enter-slide-up animation-delay-600">
                    <Link
                        to="/kontakt"
                        className="inline-block px-10 py-4 rounded-full bg-emerald-600 text-white font-bold text-lg hover:bg-emerald-700 hover:scale-105 hover:shadow-2xl transition duration-300 ease-out"
                    >
                        Rezervovat stůl
                    </Link>
                    <Link
                        to="/menu"
                        className="inline-block px-10 py-4 rounded-full bg-white/10 text-white font-semibold text-lg backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:scale-105 hover:shadow-2xl transition duration-300 ease-out"
                    >
                        Prohlédnout menu
                    </Link>
                </div>
            </div>

            {/* Pravá část s interiérem */}
            <div className="w-full h-full overflow-hidden relative group">
                <img
                    src="/1.png"
                    alt="Tradiční interiér restaurace U Janka s cihlovým krbem a dřevěnými stoly"
                    className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110"
                />
                {/* Jemný overlay pro hloubku */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition duration-500"></div>
            </div>
        </section>
    );
}