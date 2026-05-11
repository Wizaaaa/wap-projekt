import React from "react";
import { Link } from "react-router-dom";

export type MenuItem = {
    name: string;
    description?: string;
    weight?: string;
    allergens?: string;
    price: string;
};

export type MenuSection = {
    id: string;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    items: MenuItem[];
};

export default function MenuCard({ section }: { section: MenuSection }) {
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
                {section.items.map((item, idx) => (
                    <div
                        key={`${section.id}-${idx}`}
                        className="group rounded-2xl border border-[#efe3d8] bg-[#fffaf5] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-[#d7b08a] hover:shadow-[0_12px_24px_rgba(44,24,10,0.06)]"
                    >
                        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-6">
                            <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                    {item.weight && <span className="text-sm font-semibold text-[#8f5b2d]">{item.weight}</span>}
                                    <h3 className="text-lg font-semibold text-[#2f241d] md:text-xl">{item.name}</h3>
                                </div>
                                {item.description && <p className="mt-2 max-w-4xl text-sm leading-6 text-[#6f6158] md:text-[15px]">{item.description}</p>}
                                {item.allergens && <p className="mt-2 text-xs text-[#8f7f73]">Alergeny: {item.allergens}</p>}
                            </div>
                            <div className="shrink-0 text-lg font-bold tracking-tight text-[#2f241d] md:text-xl">{item.price}</div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}