import React, { useState } from "react";
import { ChefHat, Lock, User, AlertCircle } from "lucide-react";

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
        <div className="min-h-screen flex items-center justify-center bg-[#f4ece3] p-4 font-sans text-[#2f241d]">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-[#e5d5c5]">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-[#f3e2d2] p-4 rounded-full mb-4 text-[#8f5b2d]">
                        <ChefHat className="h-10 w-10" />
                    </div>
                    <h1 className="text-3xl font-black text-[#2f241d]">Admin Panel</h1>
                    <p className="text-[#8b7b6f] mt-2">Restaurace U Janka</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    {/* Zobrazení chybové hlášky, pokud nějaká je */}
                    {error && (
                        <div className="bg-rose-50 border border-rose-200 text-rose-600 px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2 animate-[fadeIn_0.3s_ease-out]">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-bold text-[#5d5148] mb-2 pl-1">Uživatelské jméno</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-[#8b7b6f]" />
                            </div>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[#ead8ca] focus:ring-4 focus:ring-[#c1a089]/20 focus:border-[#c1a089] outline-none transition-all bg-[#fdfbf9]"
                                placeholder="Zadejte jméno"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-[#5d5148] mb-2 pl-1">Heslo</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-[#8b7b6f]" />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[#ead8ca] focus:ring-4 focus:ring-[#c1a089]/20 focus:border-[#c1a089] outline-none transition-all bg-[#fdfbf9]"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#2f241d] hover:bg-[#c1a089] text-white font-black text-lg py-4 px-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(193,160,137,0.3)] mt-2 flex justify-center items-center disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {isLoading ? (
                            <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            "Přihlásit se"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}