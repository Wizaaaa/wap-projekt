import { useMemo, useState } from "react";
import {
    ChefHat, ChevronRight, Beer, Drumstick, Soup, Beef,
    Sparkles, Salad, Pizza, Candy, Coffee, GlassWater
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import MenuCard, {type MenuSection } from "../../components/MenuCard";
import "./Menu.css";

const foodSections: MenuSection[] = [
    {
        id: "k-pivu",
        title: "Něco k pivu",
        subtitle: "Malé věci k pivu i na start večera.",
        icon: <Beer className="h-5 w-5" />,
        items: [
            { name: "Utopenec", description: "čerstvý chléb, beraní rohy", weight: "1 ks", allergens: "1, 10", price: "79 Kč" },
            { name: "Pikantní masová směs na topince", description: "sypaná sýrem, zelný salát", weight: "100 g", allergens: "1, 7", price: "159 Kč" },
            { name: "Smažené bramborové lupínky", description: "ďábelský / česnekový dip", weight: "200 g", allergens: "3, 7", price: "139 Kč" },
            { name: "Pražené mandle solené", weight: "60 g", allergens: "8", price: "99 Kč" },
            { name: "Naše bramboráčky", description: "s restovaným uzeným masem, kysané zelí", weight: "4 ks", allergens: "1, 3, 7, 10", price: "139 Kč" },
        ],
    },
    {
        id: "udirna",
        title: "Z naší udírny",
        subtitle: "Výrazné chutě a poctivá klasika.",
        icon: <Drumstick className="h-5 w-5" />,
        items: [
            { name: "Teplá klobása", description: "s čerstvým křenem / hořčicí / čerstvý chléb", weight: "150 g", allergens: "1, 10", price: "159 Kč" },
        ],
    },
    {
        id: "polevky",
        title: "Polévky",
        subtitle: "Poctivý začátek podle denní nabídky i klasika.",
        icon: <Soup className="h-5 w-5" />,
        items: [
            { name: "Staročeská česnečka", description: "s naším uzeným masem, sýrem a krutony", weight: "0,45 l", allergens: "1, 7", price: "79 Kč" },
            { name: "Polévka dle denní nabídky", weight: "0,33 l", price: "49 Kč" },
        ],
    },
    {
        id: "tradicni",
        title: "Tradiční česká kuchyně",
        subtitle: "Když chcete jíst přesně tak, jak se má v hospodě vařit.",
        icon: <ChefHat className="h-5 w-5" />,
        items: [
            { name: "Vepřová játra na roštu", description: "s cibulkou a naší tatarskou omáčkou, hranolky", weight: "200 g", allergens: "1, 3, 7, 10", price: "239 Kč" },
            { name: "Silný hovězí guláš z kližky", description: "barevná cibule, domácí bramboráčky", weight: "200 g", allergens: "1, 3, 7", price: "269 Kč" },
            { name: "Pečené koleno bez kosti na černém pivu", description: "hořčice, křen, kyselá okurka, čerstvý chléb", weight: "500 g", allergens: "1, 10", price: "299 Kč" },
            { name: "Marinovaná vepřová žebírka", description: "pikantní medová marináda, zelný salát, čerstvý chléb", weight: "600 g", allergens: "1", price: "339 Kč" },
            { name: "Pečené staročeské kachní stehno", description: "bílé a červené zelí, variace knedlíků (bramborové, houskové)", weight: "350 g", allergens: "1, 3, 7, 10", price: "329 Kč" },
        ],
    },
    {
        id: "hlavni-jidla",
        title: "Hlavní jídla",
        subtitle: "Modernější jídla.",
        icon: <Beef className="h-5 w-5" />,
        items: [
            { name: "Filírovaný hovězí flank steak", description: "omáčka ze zeleného pepře, kapka smetany a koňaku", weight: "200 g", allergens: "1, 7", price: "379 Kč" },
            { name: "Vepřová panenka", description: "baby špenát, sušená rajčata, omáčka z pečeného česneku", weight: "200 g", allergens: "1, 7, 10", price: "299 Kč" },
            { name: "Grilovaná krkovice", description: "fazolové lusky, slanina, cibule", weight: "300 g", allergens: "1, 7", price: "289 Kč" },
            { name: "Hovězí tatarák", description: "červená cibulka, kapary, topinky", weight: "150 g", allergens: "1, 3, 10", price: "289 Kč" },
            { name: "Kuřecí prso na másle a citronovém tymiánu", description: "cukrový hrášek, máta a fenykl", weight: "200 g", allergens: "7", price: "249 Kč" },
            { name: "Grilovaný steak z Mahi mahi", description: "grilovaná sezónní zelenina", weight: "200 g", allergens: "4, 7", price: "299 Kč" },
            { name: "Bramborové noky Napoletana", weight: "350 g", allergens: "1, 3, 7", price: "229 Kč" },
        ],
    },
    {
        id: "speciality",
        title: "Jankovy speciality",
        subtitle: "Jídla s charakterem.",
        icon: <Sparkles className="h-5 w-5" />,
        items: [
            { name: "Katův šleh z vepřové panenky", description: "hranolky slabé (pikantní)", weight: "150 g", allergens: "1", price: "275 Kč" },
            { name: "CHEESE BACON BURGER", description: "domácí bulka, 200g hovězí, čedar, slaninová majonéza, hranolky", weight: "350 g", allergens: "1, 3, 7, 10, 11", price: "329 Kč" },
        ],
    },
    {
        id: "salaty",
        title: "Saláty",
        subtitle: "Lehčí volba.",
        icon: <Salad className="h-5 w-5" />,
        items: [
            { name: "Salát CAESAR", description: "kuřecí prsíčko, ančovičkový dresink, hoblinky parmazánu", weight: "350 g", allergens: "1, 3, 4, 7, 10", price: "269 Kč" },
            { name: "Grilovaná panenka na listovém salátu", description: "rukola, sezónní zelenina, hořčičný dip", weight: "350 g", allergens: "10", price: "279 Kč" },
        ],
    },
    {
        id: "smazena-jidla",
        title: "Smažená jídla",
        subtitle: "Hospodská klasika.",
        icon: <Pizza className="h-5 w-5" />,
        items: [
            { name: "Smažený sýr eidam", weight: "100 g", allergens: "1, 3, 7, 10", price: "159 Kč" },
            { name: "Smažený camembert", weight: "100 g", allergens: "1, 3, 7", price: "159 Kč" },
            { name: "Kuřecí / vepřový řízek", weight: "150 g", allergens: "1, 3, 7, 10", price: "169 Kč" },
        ],
    },
    {
        id: "sladke",
        title: "Sladké pokušení",
        subtitle: "Dezert na konec.",
        icon: <Candy className="h-5 w-5" />,
        items: [
            { name: "Čokoládový fondant", weight: "1ks", allergens: "1, 3, 7", price: "159 Kč" },
            { name: "Zmrzlinový pohár", weight: "1ks", allergens: "7, 8", price: "129 Kč" },
        ],
    },
    {
        id: "prilohy",
        title: "Přílohy",
        subtitle: "Něco k jídlu.",
        icon: <GlassWater className="h-5 w-5" />,
        items: [
            { name: "Hranolky steakové", price: "79 Kč" },
            { name: "Pečená brambora s dipem", price: "99 Kč" },
            { name: "Grilovaná zelenina", price: "139 Kč" },
        ],
    },
];

const drinkSections: MenuSection[] = [
    {
        id: "tocene-pivo",
        title: "Čepované pivo",
        subtitle: "Naše nejlepší pivo.",
        icon: <Beer className="h-5 w-5" />,
        items: [
            { name: "Pilsner Urquell ležák", weight: "0,5 l", price: "57 Kč" },
            { name: "11° Velkopopovický kozel", weight: "0,5 l", price: "45 Kč" },
        ],
    },
    {
        id: "nealko",
        title: "Nealko",
        subtitle: "Osvěžení.",
        icon: <GlassWater className="h-5 w-5" />,
        items: [
            { name: "Pepsi / Pepsi Zero", weight: "0,25 l", price: "49 Kč" },
            { name: "Džbán vody s citronem", weight: "1 l", price: "75 Kč" },
        ],
    },
    {
        id: "kava",
        title: "Káva - Cosmai Caffé",
        subtitle: "Klidné posezení.",
        icon: <Coffee className="h-5 w-5" />,
        items: [
            { name: "Espresso", price: "55 Kč" },
            { name: "Cappuccino", price: "65 Kč" },
            { name: "Latte macchiato", price: "79 Kč" },
        ],
    },
];

export default function Menu() {
    const [activeTab, setActiveTab] = useState<"cz" | "en" | "de">("cz");

    const allSections = useMemo(() => [...foodSections, ...drinkSections], []);

    return (
        <main className="min-h-screen bg-[#f7f0e8] text-[#2f241d]">
            <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 lg:px-10">

                <div className="mb-6 flex items-center gap-2 text-sm text-[#8b7b6f]">
                    <Link to="/" className="hover:text-[#8f5b2d]">Domů</Link>
                    <ChevronRight className="h-4 w-4" />
                    <span className="text-[#2f241d]">Menu</span>
                </div>

                <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                    <div>
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#f3e2d2] px-4 py-2 text-sm font-semibold text-[#8f5b2d] shadow-sm">
                            <ChefHat className="h-4 w-4" />
                            Restaurace U Janka
                        </div>
                        <h1 className="text-5xl font-black md:text-7xl">Jankovo menu</h1>
                        <p className="mt-6 max-w-3xl text-lg text-[#5d5148]">
                            Poctivá česká kuchyně, pivo, dezerty i nápoje. Tradice v moderním kabátě.
                        </p>
                    </div>

                    <div className="rounded-4xl bg-[#3f2315] p-6 text-white md:p-8 shadow-xl">
                        <div className="mb-4 text-sm uppercase tracking-[0.25em] text-[#e6c8ad] ">Rychlá navigace</div>
                        <div className="flex flex-wrap gap-2">
                            <button onClick={() => document.getElementById("k-pivu")?.scrollIntoView({ behavior: "smooth" })} className="rounded-full bg-white/10 px-4 py-2 hover:bg-white hover:text-[#3f2315] transition">Jídlo</button>
                            <button onClick={() => document.getElementById("tocene-pivo")?.scrollIntoView({ behavior: "smooth" })} className="rounded-full bg-white/10 px-4 py-2 hover:bg-white hover:text-[#3f2315] transition">Nápoje</button>
                            <button onClick={() => document.getElementById("sladke")?.scrollIntoView({ behavior: "smooth" })} className="rounded-full bg-white/10 px-4 py-2 hover:bg-white hover:text-[#3f2315] transition">Dezerty</button>
                        </div>
                        <Link to="/kontakt" className="mt-6 block w-full rounded-2xl bg-[#b87a44] py-4 text-center font-semibold hover:bg-[#c98950] transition shadow-lg">Rezervovat stůl</Link>
                    </div>
                </div>

                <div className="mt-12 flex flex-wrap gap-3 border-t border-[#ead8ca] pt-8">
                    {(["cz", "en", "de"] as const).map((lang) => (
                        <button
                            key={lang}
                            type="button"
                            onClick={() => setActiveTab(lang)}
                            className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                                activeTab === lang ? "bg-[#3f2315] text-white shadow-md" : "bg-white text-[#3f2315] border border-[#d8c4b5] hover:bg-[#f3e2d2]"
                            }`}
                        >
                            {lang === "cz" ? "Čeština" : lang === "en" ? "English" : "Deutsch"}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 md:px-8 lg:px-10 space-y-8">
                {allSections.map((section) => (
                    <MenuCard key={section.id} section={section} />
                ))}
            </div>

            <Footer />

            <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="fixed bottom-6 right-6 z-50 rounded-full bg-[#3f2315] p-4 text-white shadow-2xl transition hover:-translate-y-1 hover:bg-[#b87a44]"
            >
                ↑
            </button>
        </main>
    );
}