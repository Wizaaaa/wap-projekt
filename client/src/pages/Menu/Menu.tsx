import { useEffect, useMemo, useState } from "react";
import { ChefHat, ChevronRight, type LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import MenuCard from "../../components/MenuCard";
import "./Menu.css";

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
    icon: string;
    type: "food" | "drink";
    items: DBMenuItem[];
};

export default function Menu() {
    const location = useLocation();
    const navigate = useNavigate();

    const hash = location.hash.replace("#", "");
    const activeCategory = ["jidlo", "dezerty", "piti"].includes(hash) ? hash : "jidlo";

    const [menuSections, setMenuSections] = useState<DBMenuSection[]>([]);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        if (loading) return;

        if (!hash || ["jidlo", "dezerty", "piti"].includes(hash)) {
            window.scrollTo({ top: 0, behavior: "instant" });
        } else if (hash) {
            setTimeout(() => {
                const element = document.getElementById(hash);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 100);
        }
    }, [hash, loading]);

    const handleTabChange = (categoryId: string) => {
        navigate(`#${categoryId}`, { replace: true });
    };

    const foodSections = useMemo(() => menuSections.filter(s => s.type === "food"), [menuSections]);
    const drinkSections = useMemo(() => menuSections.filter(s => s.type === "drink"), [menuSections]);
    const allSections = useMemo(() => [...foodSections, ...drinkSections], [foodSections, drinkSections]);

    const categories = [
        { id: "jidlo", name: "Jídlo" },
        { id: "piti", name: "Pití" },
        { id: "dezerty", name: "Dezerty" }
    ];

    const transformSectionsWithIcons = (sections: DBMenuSection[]) => {
        return sections.map((section) => {
            const iconName = section.icon as keyof typeof LucideIcons;
            const IconComponent = (LucideIcons[iconName] as LucideIcon) || LucideIcons.HelpCircle;

            return {
                ...section,
                subtitle: section.subtitle || "",
                icon: <IconComponent className="h-5 w-5" />
            };
        });
    };

    const filteredSections = useMemo(() => {
        if (activeCategory === "jidlo") {
            return transformSectionsWithIcons(foodSections.filter((section) => section.id !== "sladke"));
        }
        if (activeCategory === "dezerty") {
            return transformSectionsWithIcons(foodSections.filter((section) => section.id === "sladke"));
        }
        if (activeCategory === "piti") {
            return transformSectionsWithIcons(drinkSections);
        }
        return transformSectionsWithIcons(allSections);
    }, [activeCategory, foodSections, drinkSections, allSections]);

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen bg-[#f7f0e8] text-2xl text-[#8f5b2d]">Načítám menu...</div>;
    }

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

                    <div className="flex flex-col justify-center lg:justify-end lg:items-end">
                        <Link
                            to="/kontakt"
                            className="inline-block rounded-2xl bg-[#b87a44] px-12 py-5 text-lg text-center font-bold text-white hover:bg-[#c98950] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 shadow-xl whitespace-nowrap"
                        >
                            Rezervovat stůl
                        </Link>
                    </div>
                </div>

                <div className="menu-tabs mt-12 border-t border-[#ead8ca] pt-8">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            type="button"
                            onClick={() => handleTabChange(category.id)}
                            className={`menu-tab ${activeCategory === category.id ? "active" : ""}`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 md:px-8 lg:px-10 space-y-8">
                {filteredSections.map((section) => (
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