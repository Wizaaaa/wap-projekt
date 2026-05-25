import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import NavHeader from "../components/NavHeader";

// ==========================================
// POMOCNÉ FUNKCE PRO PLYNULÝ SCROLL
// ==========================================
const smoothScrollTo = (targetY: number, duration: number = 800) => {
  const startingY = window.pageYOffset;
  const diff = targetY - startingY;
  let start: number | null = null;

  const easing = (t: number) => (--t) * t * t + 1;

  const step = (timestamp: number) => {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const percent = easing(Math.min(time / duration, 1));

    window.scrollTo(0, startingY + diff * percent);

    if (time < duration) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
};

const smoothScrollToId = (id: string, offset: number = 100, duration: number = 800) => {
  const element = document.getElementById(id);
  if (element) {
    const targetY = element.getBoundingClientRect().top + window.pageYOffset - offset;
    smoothScrollTo(targetY, duration);
  }
};
// ==========================================

export default function Home() {
  const [openStatus, setOpenStatus] = useState({
    state: "closed",
    text: "Načítám...",
    dotColor: "bg-gray-500",
  });

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showDiscoverMore, setShowDiscoverMore] = useState(true);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const hour = now.getHours();
      const minutes = now.getMinutes();
      const time = hour + minutes / 60;
      const day = now.getDay();

      const openTime = 11;
      let closeTime = 22;

      if (day === 5 || day === 6) closeTime = 23;
      if (day === 0) closeTime = 21;

      if (time >= openTime && time < closeTime - 1) {
        setOpenStatus({ state: "open", text: "Nyní otevřeno", dotColor: "bg-emerald-400" });
      } else if (time >= closeTime - 1 && time < closeTime) {
        setOpenStatus({ state: "closing", text: "Brzy zavíráme", dotColor: "bg-amber-400" });
      } else {
        setOpenStatus({ state: "closed", text: "Momentálně zavřeno", dotColor: "bg-rose-500" });
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 60000);

    const handleScroll = () => {
      // Tlačítko "Vyjet nahoru" se ukáže po scrollování o více než 400px
      setShowScrollTop(window.scrollY > 400);

      // Tlačítko "Objevte více" ZMIZÍ, jakmile uživatel sjede o víc než 100px dolů
      if (window.scrollY > 100) {
        setShowDiscoverMore(false);
      } else {
        setShowDiscoverMore(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Využití integrovaných funkcí
  const handleScrollToAbout = () => smoothScrollToId("o-nas", 80);
  const handleScrollToTop = () => smoothScrollTo(0);

  return (
      <div className="relative bg-[#f7f0e8] min-h-screen">
        <NavHeader />

        {/* HERO SEKCE */}
        <section
            className="relative min-h-screen flex flex-col justify-center items-center pt-24 pb-16 overflow-hidden bg-[#1a1512]"
            style={{
              backgroundImage: `
            radial-gradient(circle at center, rgba(26, 21, 18, 0.75) 0%, rgba(26, 21, 18, 0.95) 100%),
            url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2000&auto=format&fit=crop')
          `,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed" // Parallax efekt
            }}
        >
          <div className="max-w-5xl mx-auto px-6 md:px-14 w-full flex flex-col items-center text-center z-10">

            <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full shadow-2xl mb-8 transform hover:scale-105 transition duration-500">
            <span className="relative flex h-3.5 w-3.5">
              {openStatus.state !== "closed" && (
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${openStatus.dotColor} `}></span>
              )}
              <span className={`relative inline-flex rounded-full h-3.5 w-3.5 ${openStatus.dotColor}`}></span>
            </span>
              <span className="font-bold text-sm tracking-[0.2em] uppercase text-white/90">
              {openStatus.text}
            </span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-black text-white leading-tight mb-6 drop-shadow-2xl">
              Poctivá chuť,<br />
              <span className="text-[#c1a089] bg-clip-text">která zahřeje.</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed max-w-2xl mb-12 drop-shadow-md">
              Vítejte v restauraci U Janka. Přijďte si vychutnat poctivé jídlo, perfektně ošetřené pivo a atmosféru, kde se budete cítit jako doma.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto justify-center">
              <Link to="/kontakt" className="px-10 py-4 rounded-full bg-emerald-600 text-white text-lg font-bold hover:bg-emerald-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition duration-300 transform hover:-translate-y-1">
                Rezervovat stůl
              </Link>
              <Link to="/menu" className="px-10 py-4 rounded-full bg-white/10 backdrop-blur-md text-white text-lg font-bold border border-white/20 hover:bg-white/20 hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
                Prohlédnout menu
              </Link>
            </div>
          </div>

          {/* INDIKÁTOR SCROLLOVÁNÍ, KTERÝ PŘI SCROLLU PLYNULE ZMIZÍ */}
          <button
              onClick={handleScrollToAbout}
              className={`absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center p-4 transition-all duration-700 cursor-pointer group z-20 ${
                  showDiscoverMore
                      ? "opacity-60 hover:opacity-100 visible translate-y-0"
                      : "opacity-0 invisible translate-y-4 pointer-events-none" // Plynule odjede dolů a zmizí
              }`}
          >
          <span className="text-white text-[10px] md:text-xs tracking-[0.4em] font-medium uppercase mb-3 transition-all duration-300 group-hover:text-[#c1a089]">
            Objevte více
          </span>

            <div className="h-10 flex justify-center items-start">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white/80 animate-bounce group-hover:text-[#c1a089] transition-colors duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </button>
        </section>

        {/* O NÁS */}
        <section id="o-nas" className="px-6 py-28 md:px-14">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#c1a089] font-bold tracking-widest uppercase text-sm mb-4 block">Naše filozofie</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#2f241d] mb-8 leading-tight">
                O naší restauraci
              </h2>
              <p className="text-[#6f6158] leading-relaxed text-xl mb-6">
                U Janka není jenom stylová restaurace s poctivým, domácím a výborným jídlem. Je to také chlapská pivnice s pořádně načepovaným pivem a skvělými chuťovkami k němu.
              </p>
              <p className="text-[#6f6158] leading-relaxed text-xl mb-10">
                A v neposlední řadě je to také klidná zahrádka, vhodná jak pro Vaše oslavy, tak pro klidné posezení s přáteli nebo rodinou.
              </p>
              <Link to="/galerie" className="inline-flex items-center gap-3 bg-[#2f241d] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#4a3628] hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
                Prohlédnout galerii
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-[#c1a089] rounded-[2rem] transform translate-x-4 translate-y-4 transition duration-500 group-hover:translate-x-6 group-hover:translate-y-6"></div>
              <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">
                <img
                    src="/2.png"
                    alt="Restaurace U Janka"
                    className="w-full h-[32rem] object-cover transform group-hover:scale-105 transition duration-700 ease-in-out"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SPECIALITY */}
        <section className="px-6 pb-32 md:px-14">
          <div className="max-w-7xl mx-auto bg-[#efe2d6] rounded-[2.5rem] p-10 md:p-16 shadow-[0_20px_50px_rgba(47,36,29,0.05)] relative overflow-hidden">
            {/* Dekorativní prvek do pozadí */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#f7f0e8] rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-end mb-12">
              <div>
                <span className="text-[#c1a089] font-bold tracking-widest uppercase text-sm mb-2 block">Naše pýcha</span>
                <h2 className="text-4xl md:text-5xl font-black text-[#2f241d]">
                  Co u nás ochutnat?
                </h2>
              </div>
              <Link to="/menu" className="hidden md:inline-flex items-center gap-2 text-[#2f241d] font-bold hover:text-[#c1a089] transition duration-300">
                Otevřít celé menu <span className="text-xl">→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {[
                { name: "Pečené koleno", desc: "s hořčicí a křenem", img: "3.png", hash: "tradicni" },
                { name: "Hovězí steak", desc: "s pepřovou omáčkou", img: "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=1200&auto=format&fit=crop", hash: "hlavni-jidla" },
                { name: "Smažený sýr", desc: "s hranolky a tatarkou", img: "4.jpg", hash: "smazena-jidla" },
                { name: "Cheese Bacon Burger", desc: "100% hovězí maso", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop", hash: "speciality" },
              ].map((item) => (
                  <Link
                      key={item.name}
                      to={`/menu#${item.hash}`}
                      className="group block bg-[#f7f0e8] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500"
                  >
                    <div className="relative overflow-hidden h-56">
                      <img
                          src={item.img}
                          alt={item.name}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-in-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#2f241d] mb-1 group-hover:text-[#c1a089] transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-[#6f6158] font-medium">{item.desc}</p>
                    </div>
                  </Link>
              ))}
            </div>

            <Link to="/menu" className="md:hidden mt-10 w-full flex justify-center items-center bg-[#2f241d] text-white py-4 rounded-xl font-bold hover:bg-[#4a3628] transition duration-300">
              Celé menu
            </Link>
          </div>
        </section>

        <Footer />

        {/* TLAČÍTKO VYJET NAHORU - Vylepšená plynulost */}
        <button
            onClick={handleScrollToTop}
            className={`fixed bottom-8 right-8 p-4 bg-[#c1a089] text-white rounded-full shadow-[0_10px_25px_rgba(193,160,137,0.4)] transition-all duration-500 hover:bg-[#2f241d] hover:-translate-y-2 z-50 ${
                showScrollTop ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-10 invisible"
            }`}
            aria-label="Vyjet nahoru"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
  );
}