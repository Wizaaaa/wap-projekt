import { useMemo, useState } from "react";
import {
    ChefHat,
    ArrowRight,
    Phone, Mail,
    MapPin
} from "lucide-react";

import {
    FaInstagram,
    FaFacebook
} from "react-icons/fa";
import "./Menu.css";
import { Link } from "react-router-dom";
import {
    Pizza,
    Soup,
    Drumstick,
    Beef,
    Salad,
    Candy,
    Wine,
    Beer,
    GlassWater,
    Coffee,
    ChevronRight,
    Sparkles,
} from "lucide-react";

type MenuItem = {
    name: string;
    description?: string;
    weight?: string;
    allergens?: string;
    price: string;
};

type MenuSection = {
    id: string;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    items: MenuItem[];
};

const czFoodSections: MenuSection[] = [
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
        id: "nealko-pivo",
        title: "Čepované nealkoholické pivo",
        subtitle: "Když chcete chuť piva bez alkoholu.",
        icon: <Beer className="h-5 w-5" />,
        items: [
            { name: "Birell", weight: "0,5 l", price: "49 Kč" },
            { name: "Birell", weight: "0,3 l", price: "39 Kč" },
            { name: "Birell pomelo-grep", weight: "0,5 l", price: "49 Kč" },
            { name: "Birell pomelo-grep", weight: "0,3 l", price: "39 Kč" },
        ],
    },
    {
        id: "lahvove-pivo",
        title: "Pivo lahvové",
        subtitle: "Do rezervy i k venkovnímu posezení.",
        icon: <Beer className="h-5 w-5" />,
        items: [
            { name: "Birell polotmavý", weight: "0,5 l", price: "49 Kč" },
            { name: "Frisco (dle nabídky)", weight: "0,33 l", price: "49 Kč" },
        ],
    },
    {
        id: "vino",
        title: "Rozlévaná vína",
        subtitle: "Jednoduše, ale dobře.",
        icon: <Wine className="h-5 w-5" />,
        items: [
            { name: "Chardonnay (bílé suché)", weight: "0,1 l", price: "39 Kč" },
            { name: "Rulandské šedé (bílé polosuché)", weight: "0,1 l", price: "39 Kč" },
            { name: "Svatovavřinecké (červené suché)", weight: "0,1 l", price: "39 Kč" },
        ],
    },
    {
        id: "sampanske",
        title: "Šumivá vína",
        subtitle: "Na oslavu i speciální večer.",
        icon: <Wine className="h-5 w-5" />,
        items: [
            { name: "Bohemia sekt (demi sec, brut)", weight: "0,75 l", price: "340 Kč" },
            { name: "Bohemia sekt nealkoholický", weight: "0,75 l", price: "340 Kč" },
            { name: "Prosecco", weight: "0,75 l", price: "340 Kč" },
        ],
    },
    {
        id: "sampanske-premium",
        title: "Šampaňské",
        subtitle: "Pro opravdu slavnostní chvíle.",
        icon: <Wine className="h-5 w-5" />,
        items: [
            { name: "Moët&Chandon Imperiál Brut", weight: "0,75 l", price: "1 700 Kč" },
        ],
    },
    {
        id: "lih-vodka-rum",
        title: "Lihoviny a destiláty",
        subtitle: "Od klasiky po něco ostřejšího.",
        icon: <Wine className="h-5 w-5" />,
        items: [
            { name: "Slivovice Jelínek", weight: "0,04 l", price: "55 Kč" },
            { name: "Hruškovice Pircher Williams", description: "podávaná s hruškou", weight: "0,04 l", price: "75 Kč" },
            { name: "Grappa", weight: "0,04 l", price: "65 Kč" },
            { name: "Becherovka", weight: "0,04 l", price: "50 Kč" },
            { name: "Fernet Stock", weight: "0,04 l", price: "50 Kč" },
            { name: "Fernet Stock citrus", weight: "0,04 l", price: "50 Kč" },
            { name: "Jägermeister", weight: "0,04 l", price: "70 Kč" },
            { name: "Beefeater Gin", weight: "0,04 l", price: "70 Kč" },
            { name: "Vodka Finlandia", weight: "0,04 l", price: "65 Kč" },
            { name: "Vodka Russian Standard", weight: "0,04 l", price: "65 Kč" },
            { name: "Tequila Olmeca Gold", weight: "0,04 l", price: "75 Kč" },
            { name: "Tequila Olmeca Silver", weight: "0,04 l", price: "75 Kč" },
            { name: "Berentzen Apple", weight: "0,04 l", price: "50 Kč" },
            { name: "Božkov Griotka", weight: "0,04 l", price: "50 Kč" },
            { name: "Božkov Tuzemský rum", weight: "0,04 l", price: "50 Kč" },
            { name: "Božkov Vaječný likér", weight: "0,04 l", price: "50 Kč" },
            { name: "Božkov Peprmint", weight: "0,04 l", price: "50 Kč" },
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
        id: "whisky",
        title: "Whisky",
        subtitle: "Přímá a osvědčená volba.",
        icon: <Wine className="h-5 w-5" />,
        items: [
            { name: "Jameson", weight: "0,04 l", price: "75 Kč" },
            { name: "Tullamore Dew", weight: "0,04 l", price: "75 Kč" },
            { name: "Jack Daniel's", weight: "0,04 l", price: "75 Kč" },
            { name: "Jack Daniel's Honey", weight: "0,04 l", price: "75 Kč" },
            { name: "Jack Daniel's Fire", weight: "0,04 l", price: "75 Kč" },
            { name: "Chivas Regal 12.letá", weight: "0,04 l", price: "130 Kč" },
        ],
    },
    {
        id: "konyak-brandy",
        title: "Koňak a brandy",
        subtitle: "Na závěr nebo do kávy.",
        icon: <Wine className="h-5 w-5" />,
        items: [
            { name: "Metaxa 7*", weight: "0,04 l", price: "80 Kč" },
            { name: "Hennessy V.S", weight: "0,04 l", price: "130 Kč" },
            { name: "Courvoisier", weight: "0,04 l", price: "130 Kč" },
            { name: "Rémy Martin VSOP", weight: "0,04 l", price: "130 Kč" },
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
        id: "dzusy",
        title: "Džusy Toma",
        subtitle: "Fruit klasika.",
        icon: <GlassWater className="h-5 w-5" />,
        items: [
            { name: "Jablko", weight: "0,25 l", price: "49 Kč" },
            { name: "Pomeranč", weight: "0,25 l", price: "49 Kč" },
            { name: "Jahoda", weight: "0,25 l", price: "49 Kč" },
        ],
    },
    {
        id: "limonady",
        title: "Domácí limonády",
        subtitle: "Aktuální nabídka podle sezóny.",
        icon: <GlassWater className="h-5 w-5" />,
        items: [
            { name: "Dle aktuální nabídky", weight: "0,5 l", price: "89 Kč" },
            { name: "Dle aktuální nabídky", weight: "1 l", price: "178 Kč" },
        ],
    },
    {
        id: "tocene-limonady",
        title: "Točené limonády",
        subtitle: "Lehké osvěžení.",
        icon: <GlassWater className="h-5 w-5" />,
        items: [
            { name: "Kofola", weight: "0,1 l", price: "10 Kč" },
        ],
    },
    {
        id: "teple-nealko",
        title: "Teplé nápoje nealkoholické",
        subtitle: "Na zimu i klidné posezení.",
        icon: <Coffee className="h-5 w-5" />,
        items: [
            { name: "Čaj Coccole dle nabídky", price: "59 Kč" },
            { name: "Čaj z čerstvého zázvoru/máty", price: "79 Kč" },
            { name: "Domácí čaj dle aktuální nabídky", price: "89 Kč" },
        ],
    },
    {
        id: "teple-alko",
        title: "Teplé nápoje alkoholické",
        subtitle: "Na dlouhé večery.",
        icon: <Wine className="h-5 w-5" />,
        items: [
            { name: "Svařené víno červené/bílé", weight: "0,25 l", price: "80 Kč" },
            { name: "Grog", weight: "0,25 l", price: "75 Kč" },
            { name: "Horká griotka", weight: "0,25 l", price: "75 Kč" },
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



function MenuCard({ section }: { section: MenuSection }) {
    return (
        <section id={section.id} className="scroll-mt-28 rounded-4xl border border-[#e8d6c7] bg-white/80 p-6 shadow-[0_10px_30px_rgba(44,24,10,0.06)] backdrop-blur-sm md:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#f4e8de] px-3 py-1 text-sm font-medium text-[#8f5b2d]">
                        {section.icon}
                        <span>{section.title}</span>
                    </div>
                    <h2 className="text-2xl font-semibold tracking-tight text-[#2f241d] md:text-3xl">{section.title}</h2>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-[#6f6158] md:text-base">{section.subtitle}</p>
                </div>
                <Link
                    to="/kontakt"
                    className="hidden shrink-0 rounded-full border border-[#d8c4b5] px-4 py-2 text-sm font-medium text-[#2f241d] transition hover:-translate-y-0.5 hover:bg-[#2f241d] hover:text-white md:inline-flex"
                >
                    Rezervace
                </Link>
            </div>

            <div className="space-y-4">
                {section.items.map((item) => (
                    <div
                        key={`${section.id}-${item.name}-${item.weight ?? ""}-${item.price}`}
                        className="group rounded-2xl border border-[#efe3d8] bg-[#fffaf5] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-[#d7b08a] hover:shadow-[0_12px_24px_rgba(44,24,10,0.06)]"
                    >
                        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-6">
                            <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                    {item.weight ? <span className="text-sm font-semibold text-[#8f5b2d]">{item.weight}</span> : null}
                                    <h3 className="text-lg font-semibold text-[#2f241d] md:text-xl">{item.name}</h3>
                                </div>
                                {item.description ? <p className="mt-2 max-w-4xl text-sm leading-6 text-[#6f6158] md:text-[15px]">{item.description}</p> : null}
                                {item.allergens ? <p className="mt-2 text-xs text-[#8f7f73]">Alergeny: {item.allergens}</p> : null}
                            </div>
                            <div className="shrink-0 text-lg font-bold tracking-tight text-[#2f241d] md:text-xl">{item.price}</div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default function Menu() {
    const [activeTab, setActiveTab] = useState<"cz" | "en" | "de">("cz");

    const sections = useMemo(() => {
        if (activeTab === "cz") return czFoodSections.concat(drinkSections);

        // Simple language switcher placeholder: keeps the page useful, while you can later expand the full EN/DE content.
        return czFoodSections.concat(drinkSections);
    }, [activeTab]);

    return (
        <main className="min-h-screen bg-[#f7f0e8] text-[#2f241d]">
            <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 lg:px-10">
                <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[#8b7b6f]">
                    <Link to="/" className="transition hover:text-[#8f5b2d]">Domů</Link>
                    <ChevronRight className="h-4 w-4" />
                    <span className="text-[#2f241d]">Menu</span>
                </div>

                <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                    <div>
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#f3e2d2] px-4 py-2 text-sm font-semibold text-[#8f5b2d] shadow-sm">
                            <ChefHat className="h-4 w-4" />
                            Restaurace U Janka
                        </div>
                        <h1 className="max-w-3xl text-5xl font-black tracking-tight text-[#2f241d] md:text-7xl">
                            Jankovo menu
                        </h1>
                        <p className="mt-6 max-w-3xl text-base leading-8 text-[#5d5148] md:text-lg">
                            Poctivá česká kuchyně, pivo, dezerty i nápoje. Přesně ten typ menu, který vypadá moderně,
                            ale pořád dýchá hospodou a tradicí.
                        </p>
                    </div>

                    <div className="rounded-4xl border border-[#ead8ca] bg-[#3f2315] p-6 text-white shadow-[0_18px_60px_rgba(44,24,10,0.18)] md:p-8">
                        <div className="mb-4 text-sm uppercase tracking-[0.25em] text-[#e6c8ad]">Rychlá navigace</div>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() =>
                                    document.getElementById("k-pivu")?.scrollIntoView({
                                        behavior: "smooth",
                                    })
                                }
                                className="rounded-full bg-white/10 px-4 py-2 text-sm transition hover:bg-white hover:text-[#3f2315]"
                            >
                                Jídlo
                            </button>

                            <button
                                onClick={() =>
                                    document.getElementById("aperitivy")?.scrollIntoView({
                                        behavior: "smooth",
                                    })
                                }
                                className="rounded-full bg-white/10 px-4 py-2 text-sm transition hover:bg-white hover:text-[#3f2315]"
                            >
                                Nápoje
                            </button>

                            <button
                                onClick={() =>
                                    document.getElementById("sladke")?.scrollIntoView({
                                        behavior: "smooth",
                                    })
                                }
                                className="rounded-full bg-white/10 px-4 py-2 text-sm transition hover:bg-white hover:text-[#3f2315]"
                            >
                                Dezerty
                            </button>

                            <button
                                onClick={() =>
                                    document.getElementById("kava")?.scrollIntoView({
                                        behavior: "smooth",
                                    })
                                }
                                className="rounded-full bg-white/10 px-4 py-2 text-sm transition hover:bg-white hover:text-[#3f2315]"
                            >
                                Káva
                            </button>
                        </div>
                        <Link
                            to="/kontakt"
                            className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-[#b87a44] px-5 py-4 text-center font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#c98950]"
                        >
                            Rezervovat stůl
                        </Link>
                    </div>
                </div>



                <div className="mt-8 flex flex-wrap gap-3">
                    <button
                        type="button"
                        onClick={() => setActiveTab("cz")}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeTab === "cz" ? "bg-[#3f2315] text-white" : "bg-white text-[#3f2315]"}`}
                    >
                        Čeština
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab("en")}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeTab === "en" ? "bg-[#3f2315] text-white" : "bg-white text-[#3f2315]"}`}
                    >
                        English
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab("de")}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeTab === "de" ? "bg-[#3f2315] text-white" : "bg-white text-[#3f2315]"}`}
                    >
                        Deutsch
                    </button>
                    <span className="self-center text-sm text-[#7a6a60]">Aktuálně je plně vyplněná česká verze. EN/DE můžeš doplnit později.</span>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 md:px-8 lg:px-10">
                <div className="grid gap-6">
                    {sections.map((section) => (
                        <MenuCard key={section.id} section={section} />
                    ))}
                </div>
            </div>

            <footer className="relative mt-16">
                <div className="relative bg-[#2c1e16] text-[#e8dcc8] overflow-hidden rounded-t-[40px] md:rounded-t-[60px] shadow-[0_-10px_40px_rgba(44,30,22,0.15)]">

                    <div
                        className="absolute inset-0 z-0 opacity-[0.07] bg-cover bg-center mix-blend-luminosity"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop')" }}
                    ></div>

                    <div className="relative z-10 container mx-auto px-6 py-16 md:py-20">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

                            <div className="space-y-6">
                                <div className="flex items-center gap-3 text-3xl font-bold text-[#f4a261]">
                                    <ChefHat className="w-9 h-9" />
                                    <span className="tracking-wide">U JANKA</span>
                                </div>
                                <p className="text-[#c2b29f] leading-relaxed text-sm md:text-base pr-4">
                                    Restaurace s dlouholetou tradicí, která se zaměřuje na kvalitní a chutnou českou kuchyni. Vaříme srdcem a z poctivých surovin.
                                </p>
                                <div className="flex gap-4 pt-4">
                                    <a href="https://www.instagram.com/u_janka_restaurace/" className="p-2.5 rounded-2xl bg-[#3e2b1f] border border-[#4a3628] hover:bg-[#f4a261] hover:text-[#2c1e16] hover:-translate-y-1 transition-all duration-300">
                                        <FaInstagram className="w-5 h-5" />
                                    </a>
                                    <a href="https://www.facebook.com/p/Restaurace-U-Janka-100090712841566/" className="p-2.5 rounded-2xl bg-[#3e2b1f] border border-[#4a3628] hover:bg-[#f4a261] hover:text-[#2c1e16] hover:-translate-y-1 transition-all duration-300">
                                        <FaFacebook className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>

                            <div className="lg:ml-8">
                                <h3 className="text-xl font-semibold mb-6 text-white tracking-wide">
                                    Upozornění
                                </h3>

                                <ul className="space-y-4">

                                    <li>
                                        <a
                                            href="#"
                                            className="group flex items-center text-[#c2b29f] hover:text-[#f4a261] transition-colors duration-300"
                                        >
                                            <ArrowRight className="w-4 h-4 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 mr-2" />

                                            <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                                                Alergeny
                                            </span>
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            href="#"
                                            className="group flex items-center text-[#c2b29f] hover:text-[#f4a261] transition-colors duration-300"
                                        >
                                            <ArrowRight className="w-4 h-4 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 mr-2" />

                                            <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                                                Zázemí
                                            </span>
                                        </a>
                                    </li>

                                    <li>
                                        <Link
                                            to="/kontakt#lokace"
                                            className="group flex items-center text-[#c2b29f] hover:text-[#f4a261] transition-colors duration-300"
                                        >
                                            <ArrowRight className="w-4 h-4 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 mr-2" />

                                            <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                                                Lokace
                                            </span>
                                        </Link>
                                    </li>

                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-6 text-white tracking-wide">Nabídka</h3>
                                <ul className="space-y-4">
                                    {['Naše jídla', 'Denní menu', 'Nápojový lístek', 'Zaměstnanci'].map((item) => (
                                        <li key={item}>
                                            <a href="#" className="group flex items-center text-[#c2b29f] hover:text-[#f4a261] transition-colors duration-300">
                                                <ArrowRight className="w-4 h-4 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 mr-2" />
                                                <span className="transform group-hover:translate-x-1 transition-transform duration-300">{item}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-6 text-white tracking-wide">Rezervace a kontakty</h3>
                                <ul className="space-y-5">
                                    <li>
                                        <a href="tel:+420731405866" className="group flex items-center gap-4 text-[#c2b29f] hover:text-[#f4a261] transition-colors duration-300">
                                            <div className="p-2 rounded-lg bg-[#3e2b1f] group-hover:bg-[#f4a261] group-hover:text-[#2c1e16] transition-colors duration-300">
                                                <Phone className="w-4 h-4" />
                                            </div>
                                            <span className="font-medium">+420 731 405 866</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="mailto:info@u-janka.cz" className="group flex items-center gap-4 text-[#c2b29f] hover:text-[#f4a261] transition-colors duration-300">
                                            <div className="p-2 rounded-lg bg-[#3e2b1f] group-hover:bg-[#f4a261] group-hover:text-[#2c1e16] transition-colors duration-300">
                                                <Mail className="w-4 h-4" />
                                            </div>
                                            <span>info@u-janka.cz</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://maps.google.com/?q=Karla+Veselého+795,+Kosmonosy" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 text-[#c2b29f] hover:text-[#f4a261] transition-colors duration-300">
                                            <div className="p-2 rounded-lg bg-[#3e2b1f] group-hover:bg-[#f4a261] group-hover:text-[#2c1e16] transition-colors duration-300">
                                                <MapPin className="w-4 h-4" />
                                            </div>
                                            <span>Karla Veselého 795, Kosmonosy</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>

                    <div className="relative z-10 border-t border-[#4a3628]/50 bg-[#221610]/80 backdrop-blur-sm">
                        <div className="container mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center text-sm text-[#8c7a6b]">
                            <p>© {new Date().getFullYear()} Restaurace U Janka. Všechna práva vyhrazena.</p>
                            <div className="mt-4 md:mt-0 flex gap-6">
                                <a href="#" className="hover:text-[#f4a261] transition-colors">Ochrana osobních údajů</a>
                                <a href="#" className="hover:text-[#f4a261] transition-colors">Podmínky použití</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <button
                onClick={() =>
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                    })
                }
                className="fixed bottom-6 right-6 z-50 rounded-full bg-[#3f2315] p-4 text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition hover:-translate-y-1 hover:bg-[#b87a44]"
            >
                ↑
            </button>
        </main>
    );
}
