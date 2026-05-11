import { useMemo, useState } from "react";
import {
    ChefHat, ChevronRight, Beer, Drumstick, Soup, Beef,
    Sparkles, Salad, Pizza, Candy, Coffee, GlassWater, Wine
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import MenuCard, { type MenuSection } from "../../components/MenuCard";
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
        subtitle: "Modernější jídla, co ale pořád zapadají do restaurace.",
        icon: <Beef className="h-5 w-5" />,
        items: [
            { name: "Filírovaný hovězí flank steak", description: "omáčka ze zeleného pepře, kapka smetany a koňaku", weight: "200 g", allergens: "1, 7", price: "379 Kč" },
            { name: "Vepřová panenka", description: "baby špenát, sušená rajčata, omáčka z pečeného česneku", weight: "200 g", allergens: "1, 7, 10", price: "299 Kč" },
            { name: "Grilovaná krkovice", description: "fazolové lusky, slanina, cibule, doporučená příloha: pečená brambora s česnekovým dipem", weight: "300 g", allergens: "1, 7", price: "289 Kč" },
            { name: "Hovězí tatarák", description: "červená cibulka, kapary, cornichons, hrubozrnná hořčice, topinky", weight: "150 g", allergens: "1, 3, 10", price: "289 Kč" },
            { name: "Kuřecí prso na másle a citronovém tymiánu", description: "s cukrovým hráškem, mátou a fenyklem", weight: "200 g", allergens: "7", price: "249 Kč" },
            { name: "Grilovaný steak z Mahi mahi", description: "s grilovanou sezónní zeleninou", weight: "200 g", allergens: "4, 7", price: "299 Kč" },
            { name: "Bramborové noky Napoletana", description: "můžeme doplnit i o masovou variantu", weight: "350 g", allergens: "1, 3, 7", price: "229 Kč" },
        ],
    },
    {
        id: "speciality",
        title: "Jankovy speciality",
        subtitle: "Jídla, která mají vlastní charakter.",
        icon: <Sparkles className="h-5 w-5" />,
        items: [
            { name: "Katův šleh z vepřové panenky", description: "hranolky slabé (pikantní)", weight: "150 g", allergens: "1", price: "275 Kč" },
            { name: "CHEESE BACON BURGER", description: "domácí bulka, 200g hovězí mleté maso, lolo salát, slanina, červená cibule, čedar, okurka, slaninová majonéza, steakové hranolky", weight: "350 g", allergens: "1, 3, 7, 10, 11", price: "329 Kč" },
        ],
    },
    {
        id: "salaty",
        title: "Saláty",
        subtitle: "Lehčí volba bez ztráty stylu.",
        icon: <Salad className="h-5 w-5" />,
        items: [
            { name: "Salát CAESAR", description: "slaninové chipsy, krutony z domácího chleba, římský salát, 150g kuřecí prsíčko, ančovičkový dresink, hoblinky parmazánu", weight: "350 g", allergens: "1, 3, 4, 7, 10", price: "269 Kč" },
            { name: "Grilovaná vepřová panenka na listovém salátu", description: "rukola, grilovaná sezónní zelenina, dip z hrubozrnné hořčice", weight: "350 g", allergens: "10", price: "279 Kč" },
        ],
    },
    {
        id: "smazena-jidla",
        title: "Smažená jídla",
        subtitle: "Jistota, která funguje vždycky.",
        icon: <Pizza className="h-5 w-5" />,
        items: [
            { name: "Smažený sýr eidam", description: "domácí tatarka", weight: "100 g", allergens: "1, 3, 7, 10", price: "159 Kč" },
            { name: "Smažený camembert", weight: "100 g", allergens: "1, 3, 7", price: "159 Kč" },
            { name: "Kuřecí / vepřový řízek", description: "citrón, okurka", weight: "150 g", allergens: "1, 3, 7, 10", price: "169 Kč" },
        ],
    },
    {
        id: "sladke",
        title: "Sladké pokušení",
        subtitle: "Dezert na konec, když je ještě místo.",
        icon: <Candy className="h-5 w-5" />,
        items: [
            { name: "Čokoládový fondant", description: "teplá omáčka z lesního ovoce, vanilková zmrzlina", allergens: "1, 3, 7", price: "159 Kč" },
            { name: "Zmrzlinový pohár", description: "vanilková zmrzlina, karamel, ořechy a šlehačka", allergens: "7, 8", price: "129 Kč" },
            { name: "Kopeček zmrzliny", description: "vanilková, pistáciová", allergens: "7", price: "39 Kč" },
            { name: "Dezert dle denní nabídky", price: "dle nabídky" },
        ],
    },
    {
        id: "prilohy",
        title: "Přílohy",
        subtitle: "Doplňky, které dělají jídlo kompletní.",
        icon: <GlassWater className="h-5 w-5" />,
        items: [
            { name: "Pečená brambora s česnekovým dipem a čerstvou pažitkou", allergens: "3, 7, 10", price: "99 Kč" },
            { name: "Mačkané brambory se slaninkou a cibulí", price: "79 Kč" },
            { name: "Bramborové lupínky", price: "69 Kč" },
            { name: "Hranolky slabé", price: "59 Kč" },
            { name: "Hranolky steakové", price: "79 Kč" },
            { name: "Grilovaná sezónní zelenina", price: "139 Kč" },
            { name: "Domácí chléb 3ks", allergens: "1", price: "45 Kč" },
            { name: "Topinka 1ks", allergens: "1", price: "10 Kč" },
        ],
    },
    {
        id: "dipy",
        title: "Studené omáčky / dipy",
        subtitle: "Na hranolky, maso i cokoliv navíc.",
        icon: <Coffee className="h-5 w-5" />,
        items: [
            { name: "Tatarská omáčka", allergens: "3, 7, 10", price: "40 Kč" },
            { name: "Česnekový / ďábelský dip", allergens: "3, 7, 10", price: "55 Kč" },
            { name: "Kečup", price: "30 Kč" },
            { name: "Hořčice", allergens: "10", price: "19 Kč" },
        ],
    },
    {
        id: "teple-omacky",
        title: "Teplé omáčky",
        subtitle: "Na steaky a hlavní jídla.",
        icon: <Coffee className="h-5 w-5" />,
        items: [
            { name: "Omáčka ze zeleného pepře s kapkou smetany", allergens: "1, 7", price: "69 Kč" },
            { name: "Z hrubozrnné hořčice", price: "69 Kč" },
            { name: "Omáčka z pečeného česneku", allergens: "7", price: "69 Kč" },
        ],
    },
];

const drinkSections: MenuSection[] = [
    {
        id: "aperitivy",
        title: "Aperitivy",
        subtitle: "Na rozjezd večera.",
        icon: <Wine className="h-5 w-5" />,
        items: [
            { name: "Martini Bianco", weight: "0,1 l", price: "75 Kč" },
            { name: "Campari Bitter", weight: "0,04 l", price: "65 Kč" },
            { name: "Crodino-nealko", weight: "0,1 l", price: "65 Kč" },
            { name: "Aperol Spritz", weight: "0,4 l", price: "139 Kč" },
        ],
    },
    {
        id: "tocene-pivo",
        title: "Čepované pivo",
        subtitle: "Klasika, co k Jankovi sedí nejvíc.",
        icon: <Beer className="h-5 w-5" />,
        items: [
            { name: "Pilsner Urquell ležák", weight: "0,5 l", price: "57 Kč" },
            { name: "Pilsner Urquell ležák", weight: "0,3 l", price: "46 Kč" },
            { name: "Šnyt, mlíko", price: "47 Kč" },
            { name: "11° Velkopopovický kozel", weight: "0,5 l", price: "45 Kč" },
            { name: "11° Velkopopovický kozel", weight: "0,3 l", price: "35 Kč" },
            { name: "10° Velkopopovický kozel černý", weight: "0,5 l", price: "45 Kč" },
            { name: "10° Velkopopovický kozel černý", weight: "0,3 l", price: "35 Kč" },
            { name: "Velkopopovický kozel řezaný", weight: "0,5 l", price: "45 Kč" },
            { name: "Velkopopovický kozel řezaný", weight: "0,3 l", price: "35 Kč" },
        ],
    },
    {
        id: "rumy",
        title: "Rumy",
        subtitle: "Po světě v jedné řádce.",
        icon: <Wine className="h-5 w-5" />,
        items: [
            { name: "Božkov Republica exclusive / Česká republika", weight: "0,04 l", price: "60 Kč" },
            { name: "Malibu / Karibik, ostrov Barbados", weight: "0,04 l", price: "60 Kč" },
            { name: "Havana Club Aňeio 3 Aňos / Kuba", weight: "0,04 l", price: "70 Kč" },
            { name: "Captain Morgan / Anglie", weight: "0,04 l", price: "65 Kč" },
            { name: "Bucanero / Dominikánská republika", weight: "0,04 l", price: "80 Kč" },
            { name: "Legendario / Kuba", weight: "0,04 l", price: "80 Kč" },
            { name: "Don Papa / Filipíny", weight: "0,04 l", price: "140 Kč" },
            { name: "Diplomatico reserva Exclusiva / Venezuela", weight: "0,04 l", price: "140 Kč" },
            { name: "Ron Zacapa Centenario 23.letá / Guatemala", weight: "0,04 l", price: "150 Kč" },
        ],
    },
    {
        id: "nealko",
        title: "Nealkoholické nápoje",
        subtitle: "Klasika pro každou návštěvu.",
        icon: <GlassWater className="h-5 w-5" />,
        items: [
            { name: "Pepsi / Pepsi Zero", weight: "0,25 l", price: "49 Kč" },
            { name: "Mirinda / 7Up", weight: "0,25 l", price: "49 Kč" },
            { name: "Evervess Tonic / Ginger Ale", weight: "0,25 l", price: "49 Kč" },
            { name: "Kinley Rose", weight: "0,25 l", price: "49 Kč" },
            { name: "Mattoni neperlivá", weight: "0,30 l", price: "49 Kč" },
            { name: "Mattoni jemně perlivá", weight: "0,30 l", price: "49 Kč" },
            { name: "Džbán vody s citronem", weight: "1 l", price: "75 Kč" },
            { name: "Redbull", weight: "0,25 l", price: "80 Kč" },
        ],
    },
    {
        id: "kava",
        title: "Káva - Cosmai Caffé",
        subtitle: "Všechny kávy lze připravit i bez kofeinu.",
        icon: <Coffee className="h-5 w-5" />,
        items: [
            { name: "Espresso", price: "55 Kč" },
            { name: "Espresso lungo", price: "55 Kč" },
            { name: "Cappuccino", price: "65 Kč" },
            { name: "Latte macchiato", price: "79 Kč" },
            { name: "Latte macchiato oříškové / kokosové", price: "85 Kč" },
            { name: "Vídeňská káva", price: "75 Kč" },
            { name: "Alžírská káva", price: "85 Kč" },
            { name: "Turecká káva", price: "55 Kč" },
            { name: "Ledová káva", description: "vanilková zmrzlina, šlehačka, čokoládová poleva", price: "105 Kč" },
        ],
    },
];

export default function Menu() {
    const [activeTab, setActiveTab] = useState<"cz" | "en" | "de">("cz");

    // Spojíme všechny sekce pro zobrazení
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
                            <button onClick={() => document.getElementById("kava")?.scrollIntoView({ behavior: "smooth" })} className="rounded-full bg-white/10 px-4 py-2 hover:bg-white hover:text-[#3f2315] transition">Káva</button>
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
                    <span className="self-center text-sm text-[#7a6a60] ml-2 italic">Aktuálně je plně vyplněná česká verze.</span>
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