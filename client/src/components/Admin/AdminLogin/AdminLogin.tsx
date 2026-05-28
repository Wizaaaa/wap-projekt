import React, { useState } from "react";
import { ChefHat, Lock, User, AlertCircle, ArrowRight } from "lucide-react";

export default function AdminLogin({ onLogin }: { onLogin: () => void }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("adminToken", data.token);
                onLogin();
            } else {
                setError(data.message || "Špatné jméno nebo heslo!");
            }
        } catch (err) {
            console.error(err);
            setError("Nelze se spojit se serverem. Běží backend?");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center font-sans selection:bg-[#c1a089] selection:text-white overflow-hidden">

            {/* CELOOBRAZOVKOVÉ POZADÍ S OBRÁZKEM A ZTMAVENÍM */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2000&auto=format&fit=crop"
                    alt="Restaurace pozadí"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#110c09]/90 via-[#110c09]/70 to-[#110c09]/95 backdrop-blur-[4px]"></div>
            </div>

            {/* SAMOTNÁ PŘIHLAŠOVACÍ KARTA (Glassmorphism) */}
            <div className="w-full max-w-md relative z-10 p-6 animate-[fadeIn_0.5s_ease-out]">
                <div className="bg-white/10 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/10 p-10 overflow-hidden relative">

                    {/* Zářící efekt v rohu karty */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#c1a089]/30 rounded-full blur-[50px] pointer-events-none"></div>

                    <div className="flex flex-col items-center mb-10 relative z-10">
                        <div className="bg-gradient-to-br from-[#c1a089] to-[#9a8577] p-4 rounded-2xl mb-5 shadow-[0_0_20px_rgba(193,160,137,0.4)]">
                            <ChefHat className="h-8 w-8 text-[#110c09]" />
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tight">Správa <span className="text-[#c1a089]">U Janka</span></h1>
                        <p className="text-white/50 text-sm mt-2 font-bold uppercase tracking-widest">Autorizovaný přístup</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6 relative z-10">

                        {error && (
                            <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 px-4 py-3 rounded-2xl text-sm font-bold flex items-center gap-3 animate-[slideDown_0.3s_ease-out]">
                                <AlertCircle className="w-5 h-5 shrink-0" />
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-[11px] font-black uppercase tracking-widest text-white/50 mb-2 pl-2">Uživatelské jméno</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-white/40 group-focus-within:text-[#c1a089] transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-14 pr-5 py-4 rounded-2xl border border-white/10 bg-black/20 focus:bg-black/40 focus:border-[#c1a089]/50 focus:ring-4 focus:ring-[#c1a089]/10 outline-none transition-all text-white placeholder-white/20 font-medium"
                                    placeholder="jmeno_admina"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[11px] font-black uppercase tracking-widest text-white/50 mb-2 pl-2">Bezpečnostní heslo</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-white/40 group-focus-within:text-[#c1a089] transition-colors" />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-14 pr-5 py-4 rounded-2xl border border-white/10 bg-black/20 focus:bg-black/40 focus:border-[#c1a089]/50 focus:ring-4 focus:ring-[#c1a089]/10 outline-none transition-all text-white placeholder-white/20 font-medium tracking-widest"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-[#c1a089] to-[#9a8577] text-[#110c09] font-black text-lg py-4 px-4 rounded-2xl transition-all duration-300 hover:shadow-[0_10px_30px_rgba(193,160,137,0.3)] mt-4 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98]"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-4 border-[#110c09]/20 border-t-[#110c09] rounded-full animate-spin"></div>
                            ) : (
                                <>Přihlásit do systému <ArrowRight className="w-5 h-5" /></>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            <style>{`
                @keyframes slideDown {
                    from { transform: translateY(-10px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
}