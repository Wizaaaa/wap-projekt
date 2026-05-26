import React, { useEffect, useMemo, useState } from "react";
import { Utensils, Info, type LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import NavHeader from "../../components/NavHeader";


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

// ==========================================
// TYPOVÁNÍ
// ==========================================
export type DBMenuItem = {
    name: string;
    description?: string;
    weight?: string;
    allergens?: string;
    price: string;
};

export type DBMenuSection = {
    _id?: string;
    id: string;
    title: string;
    subtitle?: string;
    icon: string | React.ReactNode;
    type: "food" | "drink";
    items: DBMenuItem[];
};

// ==========================================
// KOMPONENTY PRO VYKRESLENÍ POLOŽEK
// ==========================================
const MenuItem = React.memo(({ item }: { item: DBMenuItem }) => (
    <div className="group flex flex-col md:flex-row md:justify-between md:items-end gap-3 border-b border-[#e5d5c5]/60 pb-5 mb-5 last:border-0 last:pb-0 last:mb-0 hover:bg-[#efe2d6]/50 p-4 -mx-4 rounded-2xl transition-colors duration-300">
        <div className="flex-1 pr-4">
            <h4 className="text-xl font-bold text-[#2f241d] mb-1 group-hover:text-[#c1a089] transition-colors">{item.name}</h4>
            {item.description && <p className="text-[#6f6158] text-sm leading-relaxed mb-2.5">{item.description}</p>}

            <div className="flex flex-wrap items-center gap-2 mt-1">
                {item.weight && (
                    <span className="bg-[#f7f0e8] text-[#6f6158] px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider border border-[#e5d5c5]/50">
                        {item.weight}
                    </span>
                )}
                {item.allergens && (
                    <span className="flex items-center gap-1.5 bg-white text-[#9a8577] px-2.5 py-1 rounded-md text-xs font-bold border border-[#e5d5c5]/50 cursor-help" title={`Obsahuje alergeny: ${item.allergens}`}>
                        <Info className="w-3.5 h-3.5" /> {item.allergens}
                    </span>
                )}
            </div>
        </div>
        <div className="text-2xl font-black text-[#c1a089] shrink-0 md:text-right mt-2 md:mt-0">
            {item.price}
        </div>
    </div>
));

const MenuSectionGroup = React.memo(({ section }: { section: DBMenuSection }) => (
    <div id={section.id} className="scroll-mt-40 bg-white rounded-[2.5rem] p-6 md:p-10 shadow-[0_10px_40px_rgba(47,36,29,0.03)] border border-[#e5d5c5]/40 mb-10 transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(47,36,29,0.08)]">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-8 pb-6 border-b border-[#e5d5c5]/50">
            <div className="w-16 h-16 bg-linear-to-br from-[#2f241d] to-[#4a3628] text-[#c1a089] rounded-2xl shadow-lg flex items-center justify-center shrink-0">
                {section.icon}
            </div>
            <div>
                <h3 className="text-3xl md:text-4xl font-black text-[#2f241d] tracking-tight">{section.title}</h3>
                <p className="text-[#6f6158] mt-1.5 text-lg font-light">{section.subtitle}</p>
            </div>
        </div>
        <div className="flex flex-col">
            {section.items.map((item, idx) => (
                <MenuItem key={idx} item={item} />
            ))}
        </div>
    </div>
));

// ==========================================
// SKELETON LOADER (Tuff načítání)
// ==========================================
const MenuSkeleton = () => (
    <div className="bg-white/60 backdrop-blur-md rounded-[2.5rem] p-6 md:p-10 shadow-[0_10px_40px_rgba(47,36,29,0.02)] border border-[#e5d5c5]/30 mb-10">
        {/* Hlavička sekce */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-8 pb-6 border-b border-[#e5d5c5]/50 animate-pulse">
            <div className="w-16 h-16 bg-[#e5d5c5] rounded-2xl shrink-0"></div>
            <div className="flex-1 w-full">
                <div className="h-8 bg-[#e5d5c5] rounded-full w-48 mb-3"></div>
                <div className="h-4 bg-[#e5d5c5]/60 rounded-full w-64 md:w-96"></div>
            </div>
        </div>
        {/* Falešné položky */}
        <div className="flex flex-col gap-6">
            {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col md:flex-row md:justify-between md:items-end gap-3 border-b border-[#e5d5c5]/40 pb-5 last:border-0 last:pb-0 animate-pulse">
                    <div className="flex-1 w-full pr-4">
                        <div className="h-6 bg-[#e5d5c5] rounded-full w-1/3 mb-3"></div>
                        <div className="h-4 bg-[#e5d5c5]/60 rounded-full w-2/3 mb-4"></div>
                        <div className="flex gap-2">
                            <div className="h-6 w-16 bg-[#e5d5c5]/60 rounded-md"></div>
                            <div className="h-6 w-24 bg-[#e5d5c5]/60 rounded-md"></div>
                        </div>
                    </div>
                    <div className="h-8 w-24 bg-[#c1a089]/30 rounded-full mt-4 md:mt-0"></div>
                </div>
            ))}
        </div>
    </div>
);

// ==========================================
// HLAVNÍ STRÁNKA MENU
// ==========================================
export default function Menu() {
    const location = useLocation();
    const navigate = useNavigate();

    const [menuSections, setMenuSections] = useState<DBMenuSection[]>([]);
    const [loading, setLoading] = useState(true);

    const [activeTab, setActiveTab] = useState("jidlo");
    const [showScrollTop, setShowScrollTop] = useState(false);

    const handleScrollToTop = () => smoothScrollTo(0, 800);

    // 1. Načtení dat z API
    useEffect(() => {
        fetch("http://localhost:3000/api/menu")
            .then((res) => res.json())
            .then((data) => {
                setMenuSections(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Chyba při stahování menu:", err);
                setLoading(false);
            });
    }, []);

    // 2. Řešení navigace z dropdown menu (hash v URL)
    useEffect(() => {
        if (loading) return;

        const hash = location.hash.replace("#", "");

        const determineTab = (hashVal: string) => {
            if (!hashVal || ["jidlo", "dezerty", "piti"].includes(hashVal)) return hashVal || "jidlo";
            if (menuSections.some(s => s.id === hashVal && s.type === "drink")) return "piti";
            if (menuSections.some(s => s.id === hashVal && s.type === "food") && hashVal === "sladke") return "dezerty";
            return "jidlo";
        };

        const targetTab = determineTab(hash);
        setActiveTab(targetTab);

        if (hash && !["jidlo", "dezerty", "piti"].includes(hash)) {
            const scrollTimeout = setTimeout(() => {
                const element = document.getElementById(hash);
                if (element) {
                    const targetY = element.getBoundingClientRect().top + window.pageYOffset - 120;
                    smoothScrollTo(targetY, 800);
                }
            }, 150);
            return () => clearTimeout(scrollTimeout);
        } else {
            window.scrollTo({ top: 0, behavior: "instant" });
        }
    }, [location.hash, loading, menuSections]);

    // 3. Zobrazení tlačítka pro scroll nahoru
    useEffect(() => {
        const handleScroll = () => setShowScrollTop(window.scrollY > 400);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // 4. Přetvoření sekcí s ikonkami
    const transformSectionsWithIcons = (sections: DBMenuSection[]) => {
        return sections.map((section) => {
            const iconName = section.icon as keyof typeof LucideIcons;
            const IconComponent = (LucideIcons[iconName] as LucideIcon) || LucideIcons.HelpCircle;

            return {
                ...section,
                subtitle: section.subtitle || "",
                icon: <IconComponent className="h-6 w-6" />
            };
        });
    };

    const categories = [
        { id: "jidlo", name: "Jídlo a speciality" },
        { id: "piti", name: "Nápoje a pivo" },
        { id: "dezerty", name: "Dezerty" }
    ];

    // 5. Filtrace sekcí na základě vybraného tabu
    const filteredSections = useMemo(() => {
        const foodSections = menuSections.filter(s => s.type === "food");
        const drinkSections = menuSections.filter(s => s.type === "drink");

        if (activeTab === "jidlo") {
            return transformSectionsWithIcons(foodSections.filter(section => section.id !== "sladke"));
        }
        if (activeTab === "dezerty") {
            return transformSectionsWithIcons(foodSections.filter(section => section.id === "sladke"));
        }
        if (activeTab === "piti") {
            return transformSectionsWithIcons(drinkSections);
        }
        return transformSectionsWithIcons(menuSections);
    }, [activeTab, menuSections]);

    return (
        <main className="min-h-screen bg-[#f7f0e8] text-[#2f241d] relative selection:bg-[#c1a089] selection:text-white">
            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            <NavHeader />

            {/* HERO SEKCE (Načte se okamžitě, i když se menu z API ještě stahuje) */}
            <section className="relative px-6 md:px-14 pt-48 pb-24 z-10 overflow-hidden bg-[#1a120e]">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2000&auto=format&fit=crop"
                        alt="Zázemí restaurace U Janka"
                        className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-black/40 z-0"></div>
                    <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-[#f7f0e8] to-transparent z-0"></div>
                </div>

                <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10 mb-6">
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md text-white font-bold tracking-widest uppercase text-[10px] md:text-xs mb-6 shadow-sm border border-white/20">
                        <Utensils className="h-4 w-4 text-[#c1a089]" /> Naše nabídka
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-white leading-[1.05] mb-6 tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)] animate-fade-in-up">
                        Poctivé <span className="text-[#c1a089]">Jankovo</span> menu
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed max-w-2xl mb-0 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                        Projděte si naši nabídku poctivé české kuchyně, perfektně ošetřeného piva a moderních specialit.
                    </p>
                </div>
            </section>

            {/* STICKY NAVIGACE (Načte se okamžitě) */}
            <div className="sticky top-24 z-40 flex justify-center w-full px-4 md:px-6 pointer-events-none pb-8 pt-4 transition-all duration-300">
                <div className="bg-white/90 backdrop-blur-xl p-1.5 md:p-2 rounded-full border border-white shadow-[0_15px_40px_rgba(47,36,29,0.08)] pointer-events-auto flex items-center overflow-x-auto overflow-y-hidden no-scrollbar max-w-full">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            type="button"
                            onClick={() => {
                                setActiveTab(category.id);
                                navigate(`/menu#${category.id}`, { replace: true });
                            }}
                            className={`whitespace-nowrap px-6 md:px-8 py-3 rounded-full font-bold text-sm md:text-base tracking-wide transition-all duration-300 ${
                                activeTab === category.id
                                    ? "bg-[#2f241d] text-white shadow-md"
                                    : "bg-transparent text-[#6f6158] hover:bg-white hover:text-[#2f241d]"
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* VÝPIS JÍDEL (Zde se střídá SKELETON a REÁLNÁ DATA) */}
            <div className="max-w-5xl mx-auto px-6 md:px-14 pt-8 pb-32 relative z-10 min-h-[60vh]">
                {loading ? (
                    // SKELETON LOADER
                    <div className="space-y-12">
                        <MenuSkeleton />
                        <MenuSkeleton />
                    </div>
                ) : (
                    // REÁLNÁ DATA
                    <div key={activeTab} className="space-y-12 animate-[fadeIn_0.4s_ease-out]">
                        {filteredSections.length > 0 ? (
                            filteredSections.map((section) => (
                                <MenuSectionGroup key={section.id} section={section} />
                            ))
                        ) : (
                            <div className="text-center py-20">
                                <p className="text-2xl text-[#6f6158] font-bold">V této kategorii zatím nic není.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <Footer />

            <button
                onClick={handleScrollToTop}
                className={`fixed bottom-8 right-8 p-4 bg-[#c1a089] text-white rounded-2xl shadow-[0_10px_25px_rgba(193,160,137,0.4)] transition-all duration-500 hover:bg-[#2f241d] hover:-translate-y-2 z-50 cursor-pointer ${
                    showScrollTop ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-10 invisible"
                }`}
                aria-label="Vyjet nahoru"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            </button>
        </main>
    );
}