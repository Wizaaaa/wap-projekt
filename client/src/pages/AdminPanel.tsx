import React, { useEffect, useState } from "react";
import {
    Calendar, Clock, Users, Phone, Mail, FileText,
    CheckCircle2, XCircle, Clock4, Search, Trash2, Eye, X, Utensils
} from "lucide-react";

type Reservation = {
    _id: string;
    date: string;
    time: string;
    guests: number;
    name: string;
    phone: string;
    email: string;
    notes: string;
    status: "new" | "confirmed" | "cancelled";
    createdAt: string;
};

export default function AdminPanel() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"all" | "new" | "confirmed" | "cancelled">("new");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRes, setSelectedRes] = useState<Reservation | null>(null);

    const fetchReservations = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/reservations");
            const data = await res.json();
            setReservations(data);
            setLoading(false);
        } catch (error) {
            console.error("Chyba při stahování rezervací", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            await fetch(`http://localhost:3000/api/reservations/${id}/status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });
            setReservations(prev => prev.map(res => res._id === id ? { ...res, status: newStatus as any } : res));
            if (selectedRes?._id === id) {
                setSelectedRes(prev => prev ? { ...prev, status: newStatus as any } : null);
            }
        } catch (error) {
            console.error("Chyba při úpravě", error);
        }
    };

    const deleteReservation = async (id: string) => {
        if (!window.confirm("Opravdu chcete tuto rezervaci trvale smazat?")) return;
        try {
            await fetch(`http://localhost:3000/api/reservations/${id}`, { method: "DELETE" });
            setReservations(prev => prev.filter(res => res._id !== id));
            setSelectedRes(null);
        } catch (error) {
            console.error("Chyba při mazání", error);
        }
    };

    const filteredReservations = reservations.filter(res => {
        const matchesTab = activeTab === "all" || res.status === activeTab;
        const matchesSearch = res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            res.phone.includes(searchQuery) ||
            res.email.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const counts = {
        all: reservations.length,
        new: reservations.filter(r => r.status === "new").length,
        confirmed: reservations.filter(r => r.status === "confirmed").length,
        cancelled: reservations.filter(r => r.status === "cancelled").length,
    };

    const formatDate = (dateStr: string) => {
        if(!dateStr) return "";
        const parts = dateStr.split("-");
        if(parts.length !== 3) return dateStr;
        return `${parts[2]}. ${parts[1]}. ${parts[0]}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#110c09] flex flex-col items-center justify-center text-[#c1a089]">
                <div className="w-12 h-12 border-4 border-[#c1a089]/20 border-t-[#c1a089] rounded-full animate-spin mb-4"></div>
                <p className="font-bold tracking-widest uppercase text-sm">Inicializace systému...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f4ece3] flex font-sans text-[#2f241d]">

            {/* TEMNÝ SIDEBAR */}
            <aside className="w-72 bg-[#110c09] text-white flex flex-col shadow-2xl z-20">
                <div className="p-8 border-b border-white/5 flex items-center gap-3">
                    <div className="p-2 bg-[#c1a089] rounded-lg text-[#110c09]">
                        <Utensils className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-black tracking-tight">U Janka <span className="text-[#c1a089] font-medium text-lg">Admin</span></h1>
                </div>

                <div className="p-6 flex-1 space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold mb-4 ml-2 mt-4">Filtrování</p>

                    {[
                        { id: "new", label: "Nové požadavky", count: counts.new, icon: Clock4, color: "text-amber-400" },
                        { id: "confirmed", label: "Potvrzeno", count: counts.confirmed, icon: CheckCircle2, color: "text-emerald-400" },
                        { id: "cancelled", label: "Zamítnuto", count: counts.cancelled, icon: XCircle, color: "text-rose-400" },
                        { id: "all", label: "Všechny", count: counts.all, icon: Users, color: "text-white/70" },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 font-semibold ${
                                activeTab === tab.id
                                    ? "bg-white/10 text-white shadow-lg border border-white/5"
                                    : "text-white/40 hover:bg-white/5 hover:text-white"
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? tab.color : ""}`} />
                                {tab.label}
                            </div>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                activeTab === tab.id ? "bg-[#c1a089] text-[#110c09]" : "bg-white/5"
                            }`}>
                                {tab.count}
                            </span>
                        </button>
                    ))}
                </div>
            </aside>

            {/* HLAVNÍ DASHBOARD */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#f4ece3]">

                {/* TOPBAR */}
                <header className="bg-white/80 backdrop-blur-md px-10 py-8 shadow-sm border-b border-[#e5d5c5]/50 flex justify-between items-center z-10">
                    <div>
                        <h2 className="text-3xl font-black text-[#2f241d]">Správa rezervací</h2>
                        <p className="text-[#9a8577] font-medium text-sm mt-1 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Systém je online
                        </p>
                    </div>

                    <div className="relative w-96">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#c1a089]" />
                        <input
                            type="text"
                            placeholder="Vyhledat zákazníka..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-[#e5d5c5] rounded-full pl-14 pr-6 py-4 text-[#2f241d] focus:ring-4 focus:ring-[#c1a089]/20 focus:border-[#c1a089] outline-none font-medium placeholder-[#9a8577] transition-all shadow-sm"
                        />
                    </div>
                </header>

                {/* OBSAH S KARTAMI */}
                <div className="flex-1 overflow-y-auto p-10">
                    {filteredReservations.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-[#9a8577] animate-fade-in">
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm border border-[#e5d5c5] mb-6">
                                <Calendar className="w-10 h-10 text-[#c1a089]" />
                            </div>
                            <p className="text-2xl font-bold text-[#2f241d]">Složka je prázdná</p>
                            <p className="mt-2 text-[#9a8577]">Zkuste změnit filtr nebo vyhledávání.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
                            {filteredReservations.map((res) => (
                                <div key={res._id} className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-[0_20px_40px_rgba(47,36,29,0.06)] border border-[#e5d5c5]/80 transition-all duration-300 group flex flex-col h-full cursor-pointer" onClick={() => setSelectedRes(res)}>

                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex items-center gap-2">
                                            {res.status === "new" && <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 rounded-lg text-[10px] font-black uppercase tracking-widest"><Clock4 className="w-3.5 h-3.5"/> Nové</span>}
                                            {res.status === "confirmed" && <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-[10px] font-black uppercase tracking-widest"><CheckCircle2 className="w-3.5 h-3.5"/> Potvrzeno</span>}
                                            {res.status === "cancelled" && <span className="flex items-center gap-1.5 px-3 py-1 bg-rose-100 text-rose-700 rounded-lg text-[10px] font-black uppercase tracking-widest"><XCircle className="w-3.5 h-3.5"/> Zrušeno</span>}
                                        </div>
                                        <span className="text-[10px] uppercase tracking-widest text-[#9a8577] font-bold">
                                            {new Date(res.createdAt).toLocaleDateString("cs-CZ")}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-black text-[#2f241d] mb-1 truncate group-hover:text-[#c1a089] transition-colors">{res.name}</h3>
                                    <p className="text-sm text-[#9a8577] font-medium flex items-center gap-2 mb-6"><Phone className="w-3.5 h-3.5"/>{res.phone}</p>

                                    <div className="bg-[#f7f0e8] rounded-2xl p-4 flex justify-between items-center border border-[#e5d5c5]/40 mt-auto">
                                        <div className="flex flex-col items-center">
                                            <Calendar className="w-5 h-5 text-[#c1a089] mb-1" />
                                            <span className="font-bold text-sm text-[#2f241d]">{formatDate(res.date)}</span>
                                        </div>
                                        <div className="w-px h-6 bg-[#e5d5c5]"></div>
                                        <div className="flex flex-col items-center">
                                            <Clock className="w-5 h-5 text-[#c1a089] mb-1" />
                                            <span className="font-bold text-sm text-[#2f241d]">{res.time}</span>
                                        </div>
                                        <div className="w-px h-6 bg-[#e5d5c5]"></div>
                                        <div className="flex flex-col items-center">
                                            <Users className="w-5 h-5 text-[#c1a089] mb-1" />
                                            <span className="font-bold text-sm text-[#2f241d]">{res.guests}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* MODÁLNÍ OKNO PRO DETAILY */}
            {selectedRes && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[#110c09]/80 backdrop-blur-sm transition-opacity" onClick={() => setSelectedRes(null)}></div>

                    <div className="bg-white rounded-[2.5rem] w-full max-w-2xl relative z-10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-[fadeIn_0.2s_ease-out]">

                        {/* Hlavička */}
                        <div className="bg-[#1a120e] p-8 text-white relative">
                            <button onClick={() => setSelectedRes(null)} className="absolute top-6 right-6 text-white/50 hover:text-white transition bg-white/5 hover:bg-white/10 p-2.5 rounded-full">
                                <X className="w-6 h-6" />
                            </button>
                            <h2 className="text-4xl font-black mb-2 pr-10">{selectedRes.name}</h2>
                            <p className="text-[#c1a089] font-medium flex items-center gap-2 text-sm"><Clock className="w-4 h-4"/> Vytvořeno: {new Date(selectedRes.createdAt).toLocaleString("cs-CZ")}</p>
                        </div>

                        {/* Obsah */}
                        <div className="p-8 overflow-y-auto">
                            <div className="grid grid-cols-3 gap-3 mb-8">
                                <div className="bg-[#f7f0e8] py-4 rounded-2xl flex flex-col items-center justify-center text-center">
                                    <span className="text-[10px] uppercase text-[#9a8577] font-bold tracking-widest mb-1">Datum</span>
                                    <span className="font-black text-lg text-[#2f241d]">{formatDate(selectedRes.date)}</span>
                                </div>
                                <div className="bg-[#f7f0e8] py-4 rounded-2xl flex flex-col items-center justify-center text-center">
                                    <span className="text-[10px] uppercase text-[#9a8577] font-bold tracking-widest mb-1">Čas</span>
                                    <span className="font-black text-lg text-[#2f241d]">{selectedRes.time}</span>
                                </div>
                                <div className="bg-[#f7f0e8] py-4 rounded-2xl flex flex-col items-center justify-center text-center">
                                    <span className="text-[10px] uppercase text-[#9a8577] font-bold tracking-widest mb-1">Počet</span>
                                    <span className="font-black text-lg text-[#2f241d]">{selectedRes.guests} osob</span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 bg-white border border-[#e5d5c5] rounded-full flex items-center justify-center text-[#c1a089] shadow-sm"><Phone className="w-5 h-5"/></div>
                                    <div>
                                        <p className="text-[10px] font-bold text-[#9a8577] uppercase tracking-widest mb-0.5">Telefon</p>
                                        <a href={`tel:${selectedRes.phone}`} className="text-xl font-bold text-[#2f241d] hover:text-[#c1a089] transition">{selectedRes.phone}</a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 bg-white border border-[#e5d5c5] rounded-full flex items-center justify-center text-[#c1a089] shadow-sm"><Mail className="w-5 h-5"/></div>
                                    <div>
                                        <p className="text-[10px] font-bold text-[#9a8577] uppercase tracking-widest mb-0.5">E-mail</p>
                                        <a href={`mailto:${selectedRes.email}`} className="text-xl font-bold text-[#2f241d] hover:text-[#c1a089] transition">{selectedRes.email}</a>
                                    </div>
                                </div>
                                {selectedRes.notes && (
                                    <div className="mt-6 p-6 bg-amber-50 rounded-2xl border border-amber-100">
                                        <div className="flex items-center gap-2 mb-2 text-amber-600">
                                            <FileText className="w-5 h-5"/>
                                            <p className="text-xs font-bold uppercase tracking-widest">Speciální požadavek</p>
                                        </div>
                                        <p className="text-[#2f241d] font-medium leading-relaxed">{selectedRes.notes}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Akce */}
                        <div className="bg-gray-50 p-6 flex gap-3 border-t border-gray-200">
                            {selectedRes.status !== "confirmed" && (
                                <button onClick={() => updateStatus(selectedRes._id, "confirmed")} className="flex-1 py-4 bg-[#2f241d] text-white rounded-xl font-bold hover:bg-[#c1a089] transition flex items-center justify-center gap-2">
                                    <CheckCircle2 className="w-5 h-5" /> Potvrdit
                                </button>
                            )}
                            {selectedRes.status !== "cancelled" && (
                                <button onClick={() => updateStatus(selectedRes._id, "cancelled")} className="flex-1 py-4 bg-white border border-[#e5d5c5] text-[#2f241d] rounded-xl font-bold hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition flex items-center justify-center gap-2">
                                    <XCircle className="w-5 h-5" /> Zamítnout
                                </button>
                            )}
                            <button onClick={() => deleteReservation(selectedRes._id)} className="w-16 flex items-center justify-center text-[#9a8577] hover:text-rose-600 hover:bg-rose-50 rounded-xl transition">
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}