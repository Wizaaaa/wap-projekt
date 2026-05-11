import Footer from "../../components/Footer";
import NavHeader from "../../components/NavHeader";

const sections = [
  {
    title: "Restaurace",
    desc: "Moderní interiér, poctivá česká kuchyně a příjemná atmosféra.",
    images: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1400&auto=format&fit=crop",
    ],
  },
  {
    title: "Pivnice",
    desc: "Pořádně načepované pivo, sportovní atmosféra a večerní posezení.",
    images: [
      "https://images.unsplash.com/photo-1541544181051-e46607d640b6?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1400&auto=format&fit=crop",
    ],
  },
  {
    title: "Zahrádka",
    desc: "Klidné venkovní posezení ideální pro letní večery.",
    images: [
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1400&auto=format&fit=crop",
    ],
  },
];

export default function Galerie() {
  return (
    <div className="bg-[var(--color-background)] min-h-screen overflow-hidden">
      <NavHeader />

      {/* HERO */}
      <section className="relative px-6 md:px-14 py-28 bg-[var(--color-section-bg)] overflow-hidden">

        <div className="absolute top-0 left-0 w-72 h-72 bg-[#d8b89f]/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#cdbdb1]/40 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto z-10">

          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#e5cdb7] text-[var(--color-main-text)] font-semibold text-sm mb-8 shadow-md">
            📸 Galerie restaurace
          </span>

          <h1 className="text-5xl md:text-7xl font-black text-[var(--color-main-text)] leading-[1.05] max-w-5xl animate-[fadeIn_1s_ease]">
            Atmosféra restaurace U Janka
          </h1>

          <p className="mt-8 text-xl text-[var(--color-content-text)] leading-relaxed max-w-3xl animate-[fadeIn_1.4s_ease]">
            Podívejte se do našich prostor, restaurace, pivnice i zahrádky.
            Místa, kde se spojuje pohodová atmosféra a poctivá česká kuchyně.
          </p>

        </div>
      </section>

      {/* GALERIE */}
      <section className="px-6 md:px-14 py-24">
        <div className="max-w-7xl mx-auto space-y-28">

          {sections.map((section, index) => (
            <div key={section.title} className="group">

              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">

                <div>
                  <h2 className="text-4xl md:text-6xl font-black text-[var(--color-main-text)]">
                    {section.title}
                  </h2>

                  <p className="mt-4 text-lg text-[var(--color-content-text)] max-w-2xl leading-8">
                    {section.desc}
                  </p>
                </div>

                <div className="hidden lg:flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#b98b61] animate-pulse"></div>
                  <span className="text-sm tracking-[0.3em] uppercase text-[#9a8577]">
                    Galerie
                  </span>
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {section.images.map((image, i) => (
                  <div
                    key={i}
                    className="relative overflow-hidden rounded-[2.5rem] border border-[#e6d7cb] shadow-[0_20px_60px_rgba(0,0,0,0.08)] bg-white group"
                  >

                    {/* glow hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 z-10"></div>

                    <img
                      src={image}
                      alt={section.title}
                      className="w-full h-[450px] object-cover transition duration-700 group-hover:scale-110"
                    />

                    {/* floating label */}
                    <div className="absolute bottom-6 left-6 z-20 backdrop-blur-md bg-white/20 border border-white/20 px-5 py-3 rounded-2xl text-white shadow-lg">
                      <h3 className="text-2xl font-bold">
                        {section.title}
                      </h3>

                      <p className="text-sm text-white/90 mt-1">
                        Restaurace U Janka
                      </p>
                    </div>

                  </div>
                ))}

              </div>

            </div>
          ))}

        </div>
      </section>

      {/* EXTRA INFO */}
      <section className="px-6 md:px-14 pb-28">
        <div className="max-w-7xl mx-auto">

          <div className="relative overflow-hidden rounded-[3rem] bg-[var(--color-section-bg)] border border-[#dbc8bb] p-10 md:p-16 shadow-[0_20px_70px_rgba(0,0,0,0.07)]">

            <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#d7b9a0]/40 rounded-full blur-3xl"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

              <div>
                <span className="inline-block px-5 py-2 rounded-full bg-[#ead7c4] text-[var(--color-main-text)] font-semibold text-sm mb-6">
                  ✨ Atmosféra U Janka
                </span>

                <h2 className="text-4xl md:text-6xl font-black text-[var(--color-main-text)] leading-tight">
                  Místo, kam se budete chtít vracet
                </h2>

                <p className="mt-8 text-lg leading-8 text-[var(--color-content-text)]">
                  Ať už přijdete na oběd, večerní posezení,
                  pivo s přáteli nebo rodinnou oslavu,
                  u nás najdete pohodovou atmosféru,
                  stylové prostředí a poctivou gastronomii.
                </p>

                <button className="mt-10 px-8 py-4 rounded-2xl bg-[var(--color-main-text)] text-white font-semibold hover:scale-105 hover:shadow-xl transition duration-300">
                  Rezervovat stůl
                </button>
              </div>

              <div className="relative">

                <div className="absolute -top-5 -left-5 w-full h-full border-2 border-[#cba98d] rounded-[2.5rem]"></div>

                <img
                  src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1400&auto=format&fit=crop"
                  alt="Interiér"
                  className="relative rounded-[2.5rem] h-[500px] w-full object-cover shadow-2xl"
                />

              </div>

            </div>

          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}