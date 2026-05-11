import Footer from "../components/Footer"
import NavHeader from "../components/NavHeader"


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

      <Footer />
    </div>
  )
}
