import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import NavHeader from "../../components/NavHeader";

const sections = [
  {
    title: "Restaurace",
    desc: "Moderní interiér, poctivá česká kuchyně a příjemná atmosféra.",
    images: [
      "4.avif",
      "5.avif",
    ],
  },
  {
    title: "Pivnice",
    desc: "Pořádně načepované pivo, sportovní atmosféra a večerní posezení.",
    images: [
      "6.avif",
      "7.avif",
    ],
  },
  {
    title: "Zahrádka",
    desc: "Klidné venkovní posezení ideální pro letní večery.",
    images: [
      "8.avif",
      "9.avif",
    ],
  },
];

export default function Galerie() {
  // Stav pro aktuálně otevřený obrázek (null znamená, že žádný není otevřený)
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Efekt pro zablokování scrollování stránky, když je otevřená fotka
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedImage]);

  return (
      <div className="bg-[#f7f0e8] min-h-screen overflow-hidden relative">
        <NavHeader />

        {/* HERO SEKCE */}
        <section className="relative px-6 md:px-14 pt-36 pb-20 overflow-hidden">
          {/* Dekorativní prvky v pozadí */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#c1a089]/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-[#efe2d6] rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

          <div className="relative max-w-7xl mx-auto z-10 flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#efe2d6] text-[#2f241d] font-bold tracking-widest uppercase text-xs mb-8 shadow-sm border border-[#e5d5c5]">
             Nahlédněte k nám
          </span>

            <h1 className="text-5xl md:text-7xl font-black text-[#2f241d] leading-tight max-w-4xl mb-6">
              Atmosféra restaurace <span className="text-[#c1a089]">U Janka</span>
            </h1>

            <p className="text-xl text-[#6f6158] leading-relaxed max-w-2xl font-light">
              Podívejte se do našich prostor, restaurace, pivnice i zahrádky.
              Místa, kde se spojuje pohodová atmosféra a poctivá česká kuchyně.
            </p>
          </div>
        </section>

        {/* GALERIE GRID */}
        <section className="px-6 md:px-14 pb-24 relative z-10">
          <div className="max-w-7xl mx-auto space-y-32">
            {sections.map((section) => (
                <div key={section.title} className="group/section">
                  {/* Hlavička sekce */}
                  <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12 border-b border-[#e5d5c5] pb-6">
                    <div>
                      <h2 className="text-4xl md:text-5xl font-black text-[#2f241d]">
                        {section.title}
                      </h2>
                      <p className="mt-4 text-lg text-[#6f6158] max-w-2xl">
                        {section.desc}
                      </p>
                    </div>
                    <div className="hidden lg:flex items-center gap-3 mb-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#c1a089] animate-pulse"></div>
                      <span className="text-xs tracking-[0.3em] font-bold uppercase text-[#c1a089]">
                    Galerie
                  </span>
                    </div>
                  </div>

                  {/* Fotky */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {section.images.map((image, i) => (
                        <div
                            key={i}
                            onClick={() => setSelectedImage(image)}
                            className="relative overflow-hidden rounded-[2rem] shadow-[0_10px_40px_rgba(47,36,29,0.08)] bg-white group cursor-pointer aspect-video md:aspect-auto md:h-[28rem]"
                        >
                          <img
                              src={image}
                              alt={section.title}
                              className="w-full h-full object-cover transition duration-700 ease-in-out group-hover:scale-110"
                          />

                          {/* Tmavý overlay při najetí */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                            {/* Ikonka lupy (zoom) */}
                            <div className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                              </svg>
                            </div>
                          </div>

                          {/* Popisek fotky (viditelný vždy) */}
                          <div className="absolute bottom-6 left-6 z-20 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-xl shadow-lg transform transition duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">
                            <h3 className="text-xl font-bold text-[#2f241d]">
                              {section.title}
                            </h3>
                            <p className="text-sm text-[#6f6158] font-medium mt-0.5">
                              Klikněte pro zvětšení
                            </p>
                          </div>
                        </div>
                    ))}
                  </div>
                </div>
            ))}
          </div>
        </section>

        {/* EXTRA INFO - Call to action */}
        <section className="px-6 md:px-14 pb-28">
          <div className="max-w-7xl mx-auto">
            <div className="relative overflow-hidden rounded-[3rem] bg-[#efe2d6] p-10 md:p-16 shadow-xl border border-[#e5d5c5]/50 group">
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                <div>
                <span className="inline-block px-5 py-2 rounded-full bg-[#c1a089]/20 text-[#2f241d] font-bold tracking-widest text-xs uppercase mb-6">
                  Těšíme se na vás
                </span>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#2f241d] leading-tight mb-6">
                    Místo, kam se budete chtít vracet
                  </h2>
                  <p className="text-lg md:text-xl leading-relaxed text-[#6f6158] mb-10 font-light">
                    Ať už přijdete na oběd, večerní posezení,
                    pivo s přáteli nebo rodinnou oslavu,
                    u nás najdete pohodovou atmosféru,
                    stylové prostředí a poctivou gastronomii.
                  </p>
                  <Link to="/kontakt" className="inline-flex px-8 py-4 rounded-full bg-[#2f241d] text-white font-bold hover:bg-[#c1a089] hover:shadow-[0_10px_30px_rgba(193,160,137,0.4)] transition-all duration-300 transform hover:-translate-y-1">
                    Rezervovat stůl
                  </Link>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-[#c1a089] rounded-[2.5rem] transform translate-x-4 translate-y-4 transition duration-500 group-hover:translate-x-6 group-hover:translate-y-6"></div>
                  <img
                      src="10.avif"
                      alt="Interiér U Janka"
                      className="relative rounded-[2.5rem] h-96 md:h-[32rem] w-full object-cover shadow-2xl"
                  />
                </div>

              </div>
            </div>
          </div>
        </section>

        <Footer />

        {/* LIGHTBOX (MODAL) PRO ZVĚTŠENÝ OBRÁZEK */}
        {selectedImage && (
            <div
                className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1a1512]/95 backdrop-blur-md p-4 md:p-10 transition-opacity"
                onClick={() => setSelectedImage(null)} // Zavření kliknutím kamkoliv do pozadí
            >
              {/* Tlačítko pro zavření */}
              <button
                  className="absolute top-6 right-6 md:top-10 md:right-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors duration-300 z-[101]"
                  onClick={() => setSelectedImage(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Zvětšená fotka */}
              <img
                  src={selectedImage}
                  alt="Zvětšený náhled"
                  className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl transform transition-transform duration-300 scale-100 animate-[fadeIn_0.3s_ease-out]"
                  onClick={(e) => e.stopPropagation()} // Zabránění zavření při kliknutí přímo na fotku
              />
            </div>
        )}
      </div>
  );
}