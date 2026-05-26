import React, { useState } from "react";
import { ChefHat, Lock, User } from "lucide-react";

export default function AdminLogin({ onLogin }: { onLogin: () => void }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === "admin" && password === "heslo123") {
            onLogin();
        } else {
            alert("Špatné jméno nebo heslo!");
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
                        className="w-full bg-[#2f241d] hover:bg-[#c1a089] text-white font-black text-lg py-4 px-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(193,160,137,0.3)] mt-2"
                    >
                        Přihlásit se
                    </button>
                </form>
            </div>
        </div>
    );
}