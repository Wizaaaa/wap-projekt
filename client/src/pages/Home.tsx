import Footer from "../components/Footer"
import NavHeader from "../components/NavHeader"
import {Link} from "react-router-dom";


export default function Home() {
  return (
      <div>
        <NavHeader />

        <section className="grid grid-cols-1 md:grid-cols-2 min-h-150">
          <div className="bg-section-bg p-10 md:p-20 flex flex-col justify-center animate-enter-slide-up">
            <h1 className="text-5xl md:text-7xl font-extrabold text-main-text leading-[1.1] mb-6 max-w-4xl">
              Vítáme Vás v restauraci U Janka
            </h1>

            <p className="text-xl md:text-2xl text-main-text font-normal leading-relaxed max-w-xl">
              Právě jste otevřeli virtuální dveře do naší restaurace. Doufáme, že se Vám tu bude líbit.
            </p>
          </div>

          <div className="w-full h-full overflow-hidden">
            <img
                src="/1.png"
                alt="Tradiční interiér restaurace U Janka s cihlovým krbem a dřevěnými stoly"
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
            />
          </div>
        </section>

        {/* O NÁS */}
        <section className="bg-[#f7f0e8] px-6 py-20 md:px-14">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <div>
              <h2 className="text-4xl md:text-5xl font-black text-[#2f241d] mb-6">
                O naší restauraci
              </h2>

              <p className="text-[#6f6158] leading-8 text-lg mb-4">
                U Janka není jenom stylová restaurace s poctivým,
                domácím a výborným jídlem. U Janka je také
                chlapská pivnice, s pořádně načepovaným pivem
                a skvělými chuťovkami k němu.
              </p>

              <p className="text-[#6f6158] leading-8 text-lg mb-8">
                A v neposlední řadě je to také klidná zahrádka,
                vhodná jak pro Vaše oslavy, tak pro klidné posezení
                s přáteli nebo rodinou.
              </p>

              <Link to="/galerie" className="inline-block bg-[#2f241d] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#4a3628] transition">
                Galerie
              </Link>
            </div>

            <div className="overflow-hidden rounded-4xl shadow-[0_12px_40px_rgba(44,24,10,0.15)]">
              <img
                  src="/2.png"
                  alt="Restaurace U Janka"
                  className="w-full h-105 object-cover hover:scale-105 transition duration-700"
              />
            </div>

          </div>
        </section>

        {/* NAŠE PROSTORY */}
        <section className="bg-[#f7f0e8] px-6 pb-20 md:px-14">
          <div className="max-w-7xl mx-auto">

            <h2 className="text-4xl md:text-5xl font-black text-[#2f241d] mb-10">
              Naše prostory
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              <div className="bg-[#8b7264] text-white rounded-4xl p-10">
                <h3 className="text-2xl font-bold mb-6">
                  Můžeme vám nabídnout posezení a chutné jídlo
                </h3>

                <p className="leading-8 text-lg mb-5 text-[#f5ebe4]">
                  V restauraci připravujeme každý den širokou nabídku
                  hotových jídel ale také minutek.
                </p>

                <p className="leading-8 text-lg mb-5 text-[#f5ebe4]">
                  V pivnici se můžete zastavit na výborně načepované
                  pivo, dát si k němu něco na zakousnutí a užít si
                  pohodovou atmosféru.
                </p>

                <p className="leading-8 text-lg text-[#f5ebe4]">
                  Naše zahrádka je ideální ke klidnému posezení
                  a odpočinku během teplých dní.
                </p>

                <Link to="/kontakt" className="inline-block mt-10 bg-[#2f241d] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#4a3628] transition">
                  Rezervace
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <img
                    src="11.avif"
                    alt=""
                    className="rounded-4xl h-62.5 w-full object-cover"
                />

                <img
                    src="/3.jpg"
                    alt=""
                    className="rounded-4xl h-62.5 w-full object-cover"
                />
              </div>

            </div>
          </div>
        </section>

        {/* SPECIALITY */}
        <section className="bg-[#f7f0e8] px-6 pb-24 md:px-14">
          <div className="max-w-7xl mx-auto bg-[#efe2d6] rounded-4xl p-10">

            <h2 className="text-4xl md:text-5xl font-black text-[#2f241d] mb-3">
              Co u nás ochutnat?
            </h2>

            <p className="text-[#6f6158] text-lg mb-10">
              Ochutnejte speciality, které si naši hosté nejvíce chválí.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {[
                {
                  name: "Pečené koleno",
                  desc: "s hořčicí a křenem",
                  img: "3.png",
                  hash: "tradicni" // Přidáno mapování na ID sekce v Menu
                },
                {
                  name: "Hovězí steak",
                  desc: "s pepřovou omáčkou",
                  img: "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=1200&auto=format&fit=crop",
                  hash: "hlavni-jidla"
                },
                {
                  name: "Smažený sýr",
                  desc: "s hranolky a tatarkou",
                  img: "4.jpg",
                  hash: "smazena-jidla"
                },
                {
                  name: "CHEESE BACON BURGER",
                  desc: "100% hovězí maso",
                  img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop",
                  hash: "speciality"
                }
              ].map((item) => (
                  <Link
                      key={item.name}
                      to={`/menu#${item.hash}`}
                      className="block bg-white rounded-3xl overflow-hidden shadow-md hover:-translate-y-2 transition duration-500 cursor-pointer"
                  >
                    <img
                        src={item.img}
                        alt={item.name}
                        className="h-52 w-full object-cover"
                    />

                    <div className="p-5">
                      <h3 className="text-xl font-bold text-[#2f241d]">
                        {item.name}
                      </h3>

                      <p className="text-[#6f6158] mt-2">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
              ))}
            </div>

            <div className="flex justify-center mt-10">
              <Link to="/menu" className="bg-[#2f241d] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#4a3628] transition">
                Celé menu
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
  )
}