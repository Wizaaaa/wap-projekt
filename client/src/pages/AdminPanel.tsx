import React, { useEffect, useState, useMemo } from "react";
import {
    Calendar, Clock, Users, Phone, Mail, FileText,
    CheckCircle2, XCircle, Clock4, Search, Trash2, Eye, X, Utensils, Archive, RefreshCcw, Loader2
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
    const [refreshing, setRefreshing] = useState(false);

    // Stav pro sledování, která rezervace se právě upravuje (pro zobrazení načítacího kolečka v tlačítku)
    const [processingId, setProcessingId] = useState<string | null>(null);

    const [activeTab, setActiveTab] = useState<"all" | "new" | "confirmed" | "cancelled" | "history">("new");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRes, setSelectedRes] = useState<Reservation | null>(null);

    const fetchReservations = async (isManualRefresh = false) => {
        if (isManualRefresh) setRefreshing(true);
        try {
            const res = await fetch("http://localhost:3000/api/reservations");
            const data = await res.json();
            setReservations(data);
        } catch (error) {
            console.error("Chyba při stahování rezervací", error);
        } finally {
            setLoading(false);
            if (isManualRefresh) setTimeout(() => setRefreshing(false), 500);
        }
    };

    useEffect(() => {
        fetchReservations();
        const interval = setInterval(() => fetchReservations(), 30000);
        return () => clearInterval(interval);
    }, []);

    const updateStatus = async (id: string, newStatus: string, e?: React.MouseEvent) => {
        if (e) e.stopPropagation();

        setProcessingId(id); // Zapneme načítání na konkrétním tlačítku

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
        } finally {
            setProcessingId(null); // Vypneme načítání
        }
    };

    const deleteReservation = async (id: string) => {
        if (!window.confirm("Opravdu chcete tuto rezervaci trvale smazat? Tento krok nelze vrátit.")) return;

        setProcessingId(id);
        try {
            await fetch(`http://localhost:3000/api/reservations/${id}`, { method: "DELETE" });
            setReservations(prev => prev.filter(res => res._id !== id));
            setSelectedRes(null);
        } catch (error) {
            console.error("Chyba při mazání", error);
        } finally {
            setProcessingId(null);
        }
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isPastDate = (dateStr: string) => {
        const rDate = new Date(dateStr);
        rDate.setHours(0, 0, 0, 0);
        return rDate < today;
    };

    const isToday = (dateStr: string) => {
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
        let filtered = reservations.filter(res => {
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
                <div className="w-14 h-14 border-4 border-[#c1a089]/20 border-t-[#c1a089] rounded-full animate-spin mb-6"></div>
                <p className="font-bold tracking-[0.3em] uppercase text-sm animate-pulse">Inicializace systému...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f4ece3] flex font-sans text-[#2f241d] selection:bg-[#c1a089] selection:text-white">

            {/* TEMNÝ SIDEBAR */}
            <aside className="w-72 bg-[#110c09] text-white flex flex-col shadow-[10px_0_40px_rgba(0,0,0,0.3)] z-20 relative">
                <div className="p-8 border-b border-white/5 flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-[#c1a089] to-[#9a8577] rounded-2xl text-[#110c09] shadow-[0_0_20px_rgba(193,160,137,0.4)]">
                        <Utensils className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-black tracking-tight">U Janka <br/><span className="text-[#c1a089] font-medium text-lg leading-none">Admin</span></h1>
                </div>

                <div className="p-6 flex-1 space-y-2 overflow-y-auto no-scrollbar">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold mb-4 ml-2 mt-2">Aktivní požadavky</p>

                    {[
                        { id: "new", label: "Nové", count: counts.new, icon: Clock4, color: "text-amber-400", activeBg: "bg-amber-400/10 border-amber-400/20" },
                        { id: "confirmed", label: "Potvrzeno", count: counts.confirmed, icon: CheckCircle2, color: "text-emerald-400", activeBg: "bg-emerald-400/10 border-emerald-400/20" },
                        { id: "cancelled", label: "Zamítnuto", count: counts.cancelled, icon: XCircle, color: "text-rose-400", activeBg: "bg-rose-400/10 border-rose-400/20" },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 font-bold cursor-pointer active:scale-95 ${
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
                        className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 font-bold mb-2 cursor-pointer active:scale-95 ${
                            activeTab === "history" ? "bg-white/10 text-white shadow-lg border border-white/5" : "text-white/40 hover:bg-white/5 hover:text-white border border-transparent"
                        }`}
                    >
                        <div className="flex items-center gap-3"><Archive className="w-5 h-5" /> Historie</div>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-white/5">{counts.history}</span>
                    </button>

                    <button
                        onClick={() => setActiveTab("all")}
                        className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 font-bold cursor-pointer active:scale-95 ${
                            activeTab === "all" ? "bg-white/10 text-white shadow-lg border border-white/5" : "text-white/40 hover:bg-white/5 hover:text-white border border-transparent"
                        }`}
                    >
                        <div className="flex items-center gap-3"><Users className="w-5 h-5" /> Všechny</div>
                    </button>
                </div>
            </aside>

            {/* HLAVNÍ DASHBOARD */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">

                {/* TOPBAR */}
                <header className="bg-white/80 backdrop-blur-xl px-10 py-6 shadow-sm border-b border-[#e5d5c5]/50 flex justify-between items-center z-10">
                    <div>
                        <h2 className="text-3xl font-black text-[#2f241d]">Správa rezervací</h2>
                        <div className="flex items-center gap-4 mt-1.5">
                            <p className="text-[#9a8577] font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                                Systém je online
                            </p>
                            <button
                                onClick={() => fetchReservations(true)}
                                className="flex items-center gap-1.5 text-xs font-bold text-[#c1a089] hover:text-[#2f241d] transition-colors cursor-pointer active:scale-95 p-1 rounded-md hover:bg-[#efe2d6]"
                            >
                                <RefreshCcw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} /> Obnovit
                            </button>
                        </div>
                    </div>

                    {/* Vyhledávání */}
                    <div className="relative w-[28rem] group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#c1a089] group-focus-within:text-[#2f241d] transition-colors" />
                        <input
                            type="text"
                            placeholder="Vyhledat zákazníka, email, telefon..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#f4ece3] border-2 border-transparent rounded-2xl pl-14 pr-6 py-4 text-[#2f241d] focus:bg-white focus:border-[#c1a089] focus:shadow-[0_10px_30px_rgba(193,160,137,0.15)] outline-none font-bold placeholder-[#9a8577] transition-all"
                        />
                    </div>
                </header>

                {/* OBSAH S KARTAMI */}
                <div className="flex-1 overflow-y-auto p-10">
                    {processedReservations.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-[#9a8577] animate-[fadeIn_0.4s_ease-out]">
                            <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center shadow-sm border border-[#e5d5c5]/50 mb-6 transform -rotate-6">
                                <Calendar className="w-10 h-10 text-[#c1a089]" />
                            </div>
                            <p className="text-2xl font-black text-[#2f241d]">Složka je prázdná</p>
                            <p className="mt-2 text-[#9a8577] font-medium">Zkuste změnit filtr nebo vyhledávání.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-max">
                            {processedReservations.map((res) => {
                                const todayRes = isToday(res.date);
                                const isProcessing = processingId === res._id;

                                return (
                                    <div
                                        key={res._id}
                                        onClick={() => setSelectedRes(res)}
                                        className="bg-white rounded-[2rem] p-6 shadow-sm hover:shadow-[0_20px_50px_rgba(47,36,29,0.08)] border border-[#e5d5c5]/80 transition-all duration-300 group flex flex-col h-full cursor-pointer hover:-translate-y-1 relative overflow-hidden animate-[fadeIn_0.4s_ease-out]"
                                    >
                                        {/* Barevná horní linka podle statusu - udělal jsem ji silnější a svítivější */}
                                        <div className={`absolute top-0 left-0 w-full h-2 ${
                                            res.status === "new" ? "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]" : res.status === "confirmed" ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]"
                                        }`}></div>

                                        <div className="flex justify-between items-start mb-5 pt-2">
                                            <div className="flex items-center gap-2">
                                                {res.status === "new" && <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 border border-amber-100 rounded-lg text-[10px] font-black uppercase tracking-widest"><Clock4 className="w-3.5 h-3.5"/> Nové</span>}
                                                {res.status === "confirmed" && <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg text-[10px] font-black uppercase tracking-widest"><CheckCircle2 className="w-3.5 h-3.5"/> Potvrzeno</span>}
                                                {res.status === "cancelled" && <span className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-700 border border-rose-100 rounded-lg text-[10px] font-black uppercase tracking-widest"><XCircle className="w-3.5 h-3.5"/> Zamítnuto</span>}
                                            </div>
                                            {/* Štítek DNES */}
                                            {todayRes && activeTab !== "history" && (
                                                <span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm border border-blue-200 animate-pulse">Dnes</span>
                                            )}
                                        </div>

                                        <h3 className="text-2xl font-black text-[#2f241d] mb-1 truncate group-hover:text-[#c1a089] transition-colors">{res.name}</h3>
                                        <p className="text-sm text-[#9a8577] font-medium flex items-center gap-2 mb-6"><Phone className="w-4 h-4"/>{res.phone}</p>

                                        {/* Info box */}
                                        <div className="bg-[#f4ece3]/50 rounded-[1.5rem] p-4 flex justify-between items-center border border-[#e5d5c5]/40 mt-auto mb-5 group-hover:bg-[#f4ece3] transition-colors">
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

                                        {/* RYCHLÉ AKCE PŘÍMO NA KARTĚ */}
                                        {res.status === "new" && activeTab !== "history" && (
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={(e) => updateStatus(res._id, "confirmed", e)}
                                                    disabled={isProcessing}
                                                    className="flex-1 bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white border border-emerald-100 py-3 rounded-xl font-bold transition-all flex justify-center items-center gap-1.5 text-sm cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                                                    Potvrdit
                                                </button>
                                                <button
                                                    onClick={(e) => updateStatus(res._id, "cancelled", e)}
                                                    disabled={isProcessing}
                                                    className="flex-1 bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white border border-rose-100 py-3 rounded-xl font-bold transition-all flex justify-center items-center gap-1.5 text-sm cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />}
                                                    Zamítnout
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )})}
                        </div>
                    )}
                </div>
            </main>

            {/* MODÁLNÍ OKNO PRO DETAILY */}
            {selectedRes && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Ztmavené pozadí - silnější blur */}
                    <div className="absolute inset-0 bg-[#110c09]/80 backdrop-blur-md transition-opacity cursor-pointer" onClick={() => setSelectedRes(null)}></div>

                    <div className="bg-white rounded-[3rem] w-full max-w-2xl relative z-10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-[zoomIn_0.2s_ease-out] scale-100">

                        {/* Hlavička */}
                        <div className="bg-[#1a120e] p-10 text-white relative">
                            <button
                                onClick={() => setSelectedRes(null)}
                                className="absolute top-8 right-8 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all cursor-pointer active:scale-90"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <h2 className="text-4xl font-black mb-3 pr-12">{selectedRes.name}</h2>
                            <p className="text-[#c1a089] font-bold flex items-center gap-2 text-xs uppercase tracking-widest"><Clock className="w-4 h-4"/> Přijato: {new Date(selectedRes.createdAt).toLocaleString("cs-CZ")}</p>
                        </div>

                        {/* Obsah modálu */}
                        <div className="p-10 overflow-y-auto">
                            <div className="grid grid-cols-3 gap-4 mb-10">
                                <div className="bg-[#f4ece3] py-5 rounded-3xl flex flex-col items-center justify-center text-center border border-[#e5d5c5]/50">
                                    <span className="text-[10px] uppercase text-[#9a8577] font-bold tracking-widest mb-1.5">Datum</span>
                                    <span className={`font-black text-xl ${isToday(selectedRes.date) ? "text-blue-600" : "text-[#2f241d]"}`}>{formatDate(selectedRes.date)}</span>
                                </div>
                                <div className="bg-[#f4ece3] py-5 rounded-3xl flex flex-col items-center justify-center text-center border border-[#e5d5c5]/50">
                                    <span className="text-[10px] uppercase text-[#9a8577] font-bold tracking-widest mb-1.5">Čas</span>
                                    <span className="font-black text-xl text-[#2f241d]">{selectedRes.time}</span>
                                </div>
                                <div className="bg-[#f4ece3] py-5 rounded-3xl flex flex-col items-center justify-center text-center border border-[#e5d5c5]/50">
                                    <span className="text-[10px] uppercase text-[#9a8577] font-bold tracking-widest mb-1.5">Počet</span>
                                    <span className="font-black text-xl text-[#2f241d]">{selectedRes.guests} osob</span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-5 p-4 rounded-2xl hover:bg-[#f4ece3]/50 transition-colors">
                                    <div className="w-14 h-14 bg-white border border-[#e5d5c5] rounded-full flex items-center justify-center text-[#c1a089] shadow-sm shrink-0"><Phone className="w-6 h-6"/></div>
                                    <div>
                                        <p className="text-[10px] font-bold text-[#9a8577] uppercase tracking-widest mb-1">Telefon</p>
                                        <a href={`tel:${selectedRes.phone}`} className="text-2xl font-bold text-[#2f241d] hover:text-[#c1a089] transition-colors">{selectedRes.phone}</a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-5 p-4 rounded-2xl hover:bg-[#f4ece3]/50 transition-colors">
                                    <div className="w-14 h-14 bg-white border border-[#e5d5c5] rounded-full flex items-center justify-center text-[#c1a089] shadow-sm shrink-0"><Mail className="w-6 h-6"/></div>
                                    <div className="truncate">
                                        <p className="text-[10px] font-bold text-[#9a8577] uppercase tracking-widest mb-1">E-mail</p>
                                        <a href={`mailto:${selectedRes.email}`} className="text-xl font-bold text-[#2f241d] hover:text-[#c1a089] transition-colors truncate">{selectedRes.email}</a>
                                    </div>
                                </div>
                                {selectedRes.notes && (
                                    <div className="mt-8 p-6 bg-amber-50 rounded-3xl border border-amber-200">
                                        <div className="flex items-center gap-2 mb-3 text-amber-600">
                                            <FileText className="w-5 h-5"/>
                                            <p className="text-xs font-bold uppercase tracking-widest">Speciální požadavek</p>
                                        </div>
                                        <p className="text-[#2f241d] font-bold text-lg leading-relaxed">{selectedRes.notes}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Akční Footer Modálu */}
                        <div className="bg-gray-50 p-8 flex gap-4 border-t border-gray-200">
                            {selectedRes.status !== "confirmed" && (
                                <button
                                    onClick={() => updateStatus(selectedRes._id, "confirmed")}
                                    disabled={processingId === selectedRes._id}
                                    className="flex-1 py-4 bg-[#2f241d] text-white rounded-2xl font-black text-lg hover:bg-[#c1a089] hover:shadow-[0_15px_30px_rgba(193,160,137,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {processingId === selectedRes._id ? <Loader2 className="w-6 h-6 animate-spin" /> : <CheckCircle2 className="w-6 h-6" />} Potvrdit
                                </button>
                            )}
                            {selectedRes.status !== "cancelled" && (
                                <button
                                    onClick={() => updateStatus(selectedRes._id, "cancelled")}
                                    disabled={processingId === selectedRes._id}
                                    className="flex-1 py-4 bg-white border border-[#e5d5c5] text-[#2f241d] rounded-2xl font-black text-lg hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {processingId === selectedRes._id ? <Loader2 className="w-6 h-6 animate-spin" /> : <XCircle className="w-6 h-6" />} Zamítnout
                                </button>
                            )}
                            <button
                                onClick={() => deleteReservation(selectedRes._id)}
                                disabled={processingId === selectedRes._id}
                                className="w-20 flex items-center justify-center text-[#9a8577] hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all cursor-pointer active:scale-90 bg-white border border-[#e5d5c5] disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Trvale smazat"
                            >
                                {processingId === selectedRes._id ? <Loader2 className="w-6 h-6 animate-spin" /> : <Trash2 className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Vlastní animace pro Modal zjevení */}
            <style>{`
                @keyframes zoomIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-\\[zoomIn_0\\.2s_ease-out\\] {
                    animation: zoomIn 0.2s ease-out forwards;
                }
            `}</style>
        </div>
    );
}