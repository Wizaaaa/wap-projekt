import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
    Calendar, Clock, Users, Phone, Mail, FileText,
    CheckCircle2, XCircle, Clock4, Search, Trash2, X, Utensils, Archive, RefreshCcw, LogOut
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

const isPastDate = (dateStr: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const rDate = new Date(dateStr);
    rDate.setHours(0, 0, 0, 0);
    return rDate < today;
};

const isToday = (dateStr: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const rDate = new Date(dateStr);
    rDate.setHours(0, 0, 0, 0);
    return rDate.getTime() === today.getTime();
};

const formatDate = (dateStr: string) => {
    if(!dateStr) return "";
    const parts = dateStr.split("-");
    if(parts.length !== 3) return dateStr;
    return `${parts[2]}. ${parts[1]}. ${parts[0]}`;
};

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState<"all" | "new" | "confirmed" | "cancelled" | "history">("new");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRes, setSelectedRes] = useState<Reservation | null>(null);

    const fetchReservations = useCallback(async (isManualRefresh = false) => {
        if (isManualRefresh) setRefreshing(true);
        try {
            const token = localStorage.getItem("adminToken");
            const res = await fetch("http://localhost:3000/api/reservations", {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (res.status === 401 || res.status === 403) {
                onLogout();
                return;
            }

            const data = await res.json();
            setReservations(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            if (isManualRefresh) setTimeout(() => setRefreshing(false), 500);
        }
    }, [onLogout]);

    useEffect(() => {
        const loadInitialData = async () => {
            await fetchReservations();
        };

        loadInitialData().catch(console.error);

        const interval = setInterval(() => fetchReservations(), 30000);
        return () => clearInterval(interval);
    }, [fetchReservations]);

    const updateStatus = async (id: string, newStatus: "new" | "confirmed" | "cancelled", e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        try {
            const token = localStorage.getItem("adminToken");
            const res = await fetch(`http://localhost:3000/api/reservations/${id}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (res.status === 401 || res.status === 403) {
                onLogout();
                return;
            }

            setReservations(prev => prev.map(res => res._id === id ? { ...res, status: newStatus } : res));
            if (selectedRes?._id === id) {
                setSelectedRes(prev => prev ? { ...prev, status: newStatus } : null);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const deleteReservation = async (id: string) => {
        if (!window.confirm("Opravdu chcete tuto rezervaci trvale smazat? Tento krok nelze vrátit.")) return;
        try {
            const token = localStorage.getItem("adminToken");
            const res = await fetch(`http://localhost:3000/api/reservations/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (res.status === 401 || res.status === 403) {
                onLogout();
                return;
            }

            setReservations(prev => prev.filter(res => res._id !== id));
            setSelectedRes(null);
        } catch (error) {
            console.error(error);
        }
    };

    const counts = useMemo(() => {
        let n = 0, c = 0, x = 0, h = 0;
        reservations.forEach(r => {
            if (isPastDate(r.date)) {
                h++;
            } else {
                if (r.status === "new") n++;
                if (r.status === "confirmed") c++;
                if (r.status === "cancelled") x++;
            }
        });
        return { new: n, confirmed: c, cancelled: x, history: h, all: reservations.length };
    }, [reservations]);

    const processedReservations = useMemo(() => {
        const filtered = reservations.filter(res => {
            const isPast = isPastDate(res.date);
            const matchesSearch = res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                res.phone.includes(searchQuery) ||
                res.email.toLowerCase().includes(searchQuery.toLowerCase());

            if (!matchesSearch) return false;

            if (activeTab === "all") return true;
            if (activeTab === "history") return isPast;

            if (isPast) return false;
            return res.status === activeTab;
        });

        return filtered.sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.time}`).getTime();
            const dateB = new Date(`${b.date}T${b.time}`).getTime();

            if (activeTab === "history") return dateB - dateA;
            return dateA - dateB;
        });
    }, [reservations, activeTab, searchQuery]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#110c09] flex flex-col items-center justify-center text-[#c1a089]">
                <div className="w-12 h-12 border-4 border-[#c1a089]/20 border-t-[#c1a089] rounded-full animate-spin mb-4"></div>
                <p className="font-bold tracking-widest uppercase text-sm">Inicializace systému...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f4ece3] flex font-sans text-[#2f241d] selection:bg-[#c1a089] selection:text-white">
            <aside className="w-72 bg-[#110c09] text-white flex flex-col shadow-[10px_0_30px_rgba(0,0,0,0.2)] z-20 relative">
                <div className="p-8 border-b border-white/5 flex items-center gap-3">
                    <div className="p-2.5 bg-linear-to-br from-[#c1a089] to-[#9a8577] rounded-xl text-[#110c09] shadow-[0_0_15px_rgba(193,160,137,0.3)]">
                        <Utensils className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-black tracking-tight">U Janka <span className="text-[#c1a089] font-medium text-lg">Admin</span></h1>
                </div>

                <div className="p-6 flex-1 space-y-2 overflow-y-auto no-scrollbar">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold mb-4 ml-2 mt-2">Aktivní</p>

                    {[
                        { id: "new", label: "Nové požadavky", count: counts.new, icon: Clock4, color: "text-amber-400", activeBg: "bg-amber-400/10 border-amber-400/20" },
                        { id: "confirmed", label: "Potvrzeno", count: counts.confirmed, icon: CheckCircle2, color: "text-emerald-400", activeBg: "bg-emerald-400/10 border-emerald-400/20" },
                        { id: "cancelled", label: "Zamítnuto", count: counts.cancelled, icon: XCircle, color: "text-rose-400", activeBg: "bg-rose-400/10 border-rose-400/20" },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as "new" | "confirmed" | "cancelled" | "history" | "all")}                            className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 font-bold ${
                                activeTab === tab.id
                                    ? `${tab.activeBg} text-white shadow-lg border`
                                    : "text-white/40 hover:bg-white/5 hover:text-white border border-transparent"
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? tab.color : ""}`} />
                                {tab.label}
                            </div>
                            {tab.count > 0 && (
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                                    activeTab === tab.id ? tab.color + " bg-white/10" : "bg-white/5"
                                }`}>
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}

                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold mb-4 ml-2 mt-8">Ostatní</p>

                    <button
                        onClick={() => setActiveTab("history")}
                        className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 font-bold mb-2 ${
                            activeTab === "history" ? "bg-white/10 text-white shadow-lg border border-white/5" : "text-white/40 hover:bg-white/5 hover:text-white border border-transparent"
                        }`}
                    >
                        <div className="flex items-center gap-3"><Archive className="w-5 h-5" /> Historie (Proběhlé)</div>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-white/5">{counts.history}</span>
                    </button>

                    <button
                        onClick={() => setActiveTab("all")}
                        className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 font-bold ${
                            activeTab === "all" ? "bg-white/10 text-white shadow-lg border border-white/5" : "text-white/40 hover:bg-white/5 hover:text-white border border-transparent"
                        }`}
                    >
                        <div className="flex items-center gap-3"><Users className="w-5 h-5" /> Všechny záznamy</div>
                    </button>

                    <div className="pt-4 border-t border-white/5 mt-auto">
                        <button
                            onClick={onLogout}
                            className="w-full flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 font-bold text-rose-400 hover:bg-rose-500/10 border border-transparent mt-4"
                        >
                            <LogOut className="w-5 h-5" />
                            Odhlásit se
                        </button>
                    </div>

                </div>
            </aside>

            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="bg-white/80 backdrop-blur-xl px-10 py-6 shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-b border-[#e5d5c5]/50 flex justify-between items-center z-10">
                    <div>
                        <h2 className="text-3xl font-black text-[#2f241d]">Správa rezervací</h2>
                        <div className="flex items-center gap-4 mt-1.5">
                            <p className="text-[#9a8577] font-medium text-sm flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
                                Systém je online
                            </p>
                            <button
                                onClick={() => fetchReservations(true)}
                                className="flex items-center gap-1.5 text-xs font-bold text-[#c1a089] hover:text-[#2f241d] transition-colors"
                            >
                                <RefreshCcw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} /> Obnovit
                            </button>
                        </div>
                    </div>
                    <div className="relative w-96">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#c1a089]" />
                        <input
                            type="text"
                            placeholder="Vyhledat zákazníka, email, telefon..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#f4ece3] border border-transparent rounded-full pl-14 pr-6 py-3.5 text-[#2f241d] focus:bg-white focus:ring-4 focus:ring-[#c1a089]/20 focus:border-[#c1a089] outline-none font-bold placeholder-[#9a8577] transition-all shadow-inner"
                        />
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-10">
                    {processedReservations.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-[#9a8577] animate-[fadeIn_0.4s_ease-out]">
                            <div className="w-24 h-24 bg-white rounded-4xl flex items-center justify-center shadow-sm border border-[#e5d5c5]/50 mb-6 transform -rotate-6">
                                <Calendar className="w-10 h-10 text-[#c1a089]" />
                            </div>
                            <p className="text-2xl font-black text-[#2f241d]">Složka je prázdná</p>
                            <p className="mt-2 text-[#9a8577] font-medium">Zkuste změnit filtr nebo vyhledávání.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-max">
                            {processedReservations.map((res) => {
                                const todayRes = isToday(res.date);

                                return (
                                    <div
                                        key={res._id}
                                        onClick={() => setSelectedRes(res)}
                                        className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-[0_20px_40px_rgba(47,36,29,0.08)] border border-[#e5d5c5]/80 transition-all duration-300 group flex flex-col h-full cursor-pointer relative overflow-hidden animate-[fadeIn_0.4s_ease-out]"
                                    >
                                        <div className={`absolute top-0 left-0 w-full h-1.5 ${
                                            res.status === "new" ? "bg-amber-400" : res.status === "confirmed" ? "bg-emerald-500" : "bg-rose-500"
                                        }`}></div>

                                        <div className="flex justify-between items-start mb-5 pt-1">
                                            <div className="flex items-center gap-2">
                                                {res.status === "new" && <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 border border-amber-100 rounded-lg text-[10px] font-black uppercase tracking-widest"><Clock4 className="w-3.5 h-3.5"/> Nové</span>}
                                                {res.status === "confirmed" && <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg text-[10px] font-black uppercase tracking-widest"><CheckCircle2 className="w-3.5 h-3.5"/> Potvrzeno</span>}
                                                {res.status === "cancelled" && <span className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-700 border border-rose-100 rounded-lg text-[10px] font-black uppercase tracking-widest"><XCircle className="w-3.5 h-3.5"/> Zrušeno</span>}
                                            </div>
                                            {todayRes && activeTab !== "history" && (
                                                <span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm border border-blue-200 animate-pulse">Dnes</span>
                                            )}
                                        </div>

                                        <h3 className="text-2xl font-black text-[#2f241d] mb-1 truncate group-hover:text-[#c1a089] transition-colors">{res.name}</h3>
                                        <p className="text-sm text-[#9a8577] font-medium flex items-center gap-2 mb-5"><Phone className="w-3.5 h-3.5"/>{res.phone}</p>

                                        <div className="bg-[#f4ece3]/50 rounded-2xl p-4 flex justify-between items-center border border-[#e5d5c5]/40 mt-auto mb-4 group-hover:bg-[#f4ece3] transition-colors">
                                            <div className="flex flex-col items-center">
                                                <Calendar className={`w-5 h-5 mb-1 ${todayRes ? "text-blue-500" : "text-[#c1a089]"}`} />
                                                <span className={`font-black text-sm ${todayRes ? "text-blue-700" : "text-[#2f241d]"}`}>{formatDate(res.date)}</span>
                                            </div>
                                            <div className="w-px h-6 bg-[#e5d5c5]"></div>
                                            <div className="flex flex-col items-center">
                                                <Clock className="w-5 h-5 text-[#c1a089] mb-1" />
                                                <span className="font-black text-sm text-[#2f241d]">{res.time}</span>
                                            </div>
                                            <div className="w-px h-6 bg-[#e5d5c5]"></div>
                                            <div className="flex flex-col items-center">
                                                <Users className="w-5 h-5 text-[#c1a089] mb-1" />
                                                <span className="font-black text-sm text-[#2f241d]">{res.guests}</span>
                                            </div>
                                        </div>

                                        {res.status === "new" && activeTab !== "history" && (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={(e) => updateStatus(res._id, "confirmed", e)}
                                                    className="flex-1 bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white border border-emerald-100 py-2 rounded-xl font-bold transition-colors flex justify-center items-center gap-1 text-sm"
                                                >
                                                    <CheckCircle2 className="w-4 h-4" /> Potvrdit
                                                </button>
                                                <button
                                                    onClick={(e) => updateStatus(res._id, "cancelled", e)}
                                                    className="flex-1 bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white border border-rose-100 py-2 rounded-xl font-bold transition-colors flex justify-center items-center gap-1 text-sm"
                                                >
                                                    <XCircle className="w-4 h-4" /> Zamítnout
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )})}
                        </div>
                    )}
                </div>
            </main>

            {selectedRes && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[#110c09]/80 backdrop-blur-sm transition-opacity" onClick={() => setSelectedRes(null)}></div>

                    <div className="bg-white rounded-[2.5rem] w-full max-w-2xl relative z-10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-[fadeIn_0.2s_ease-out]">
                        <div className="bg-[#1a120e] p-8 text-white relative">
                            <button onClick={() => setSelectedRes(null)} className="absolute top-6 right-6 text-white/50 hover:text-white transition bg-white/5 hover:bg-white/10 p-2.5 rounded-full">
                                <X className="w-6 h-6" />
                            </button>
                            <h2 className="text-4xl font-black mb-2 pr-10">{selectedRes.name}</h2>
                            <p className="text-[#c1a089] font-medium flex items-center gap-2 text-sm"><Clock className="w-4 h-4"/> Přijato: {new Date(selectedRes.createdAt).toLocaleString("cs-CZ")}</p>
                        </div>

                        <div className="p-8 overflow-y-auto">
                            <div className="grid grid-cols-3 gap-3 mb-8">
                                <div className="bg-[#f4ece3] py-4 rounded-2xl flex flex-col items-center justify-center text-center">
                                    <span className="text-[10px] uppercase text-[#9a8577] font-bold tracking-widest mb-1">Datum</span>
                                    <span className={`font-black text-xl ${isToday(selectedRes.date) ? "text-blue-600" : "text-[#2f241d]"}`}>{formatDate(selectedRes.date)}</span>
                                </div>
                                <div className="bg-[#f4ece3] py-4 rounded-2xl flex flex-col items-center justify-center text-center">
                                    <span className="text-[10px] uppercase text-[#9a8577] font-bold tracking-widest mb-1">Čas</span>
                                    <span className="font-black text-xl text-[#2f241d]">{selectedRes.time}</span>
                                </div>
                                <div className="bg-[#f4ece3] py-4 rounded-2xl flex flex-col items-center justify-center text-center">
                                    <span className="text-[10px] uppercase text-[#9a8577] font-bold tracking-widest mb-1">Počet</span>
                                    <span className="font-black text-xl text-[#2f241d]">{selectedRes.guests} osob</span>
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
                                        <p className="text-[#2f241d] font-bold leading-relaxed">{selectedRes.notes}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 flex gap-3 border-t border-gray-200">
                            {selectedRes.status !== "confirmed" && (
                                <button onClick={() => updateStatus(selectedRes._id, "confirmed")} className="flex-1 py-4 bg-[#2f241d] text-white rounded-xl font-black text-lg hover:bg-[#c1a089] hover:shadow-lg transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5">
                                    <CheckCircle2 className="w-5 h-5" /> Potvrdit
                                </button>
                            )}
                            {selectedRes.status !== "cancelled" && (
                                <button onClick={() => updateStatus(selectedRes._id, "cancelled")} className="flex-1 py-4 bg-white border border-[#e5d5c5] text-[#2f241d] rounded-xl font-black text-lg hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all flex items-center justify-center gap-2">
                                    <XCircle className="w-5 h-5" /> Zamítnout
                                </button>
                            )}
                            <button onClick={() => deleteReservation(selectedRes._id)} className="w-16 flex items-center justify-center text-[#9a8577] hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors bg-white border border-[#e5d5c5]" title="Trvale smazat">
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}