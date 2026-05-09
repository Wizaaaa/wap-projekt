import {
    ArrowRight,
    MapPin,
    Phone,
    Mail,
    ChefHat
} from 'lucide-react';
import { FaInstagram, FaFacebook } from 'react-icons/fa';

export default function Footer() {
    return (
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
                            <h3 className="text-xl font-semibold mb-6 text-white tracking-wide">Upozornění</h3>
                            <ul className="space-y-4">
                                {['Alergeny', 'Zázemí', 'Lokace'].map((item) => (
                                    <li key={item}>
                                        <a
                                            href="#lokace"
                                            className="group flex items-center text-[#c2b29f] hover:text-[#f4a261] transition-colors duration-300"
                                        >
                                            <ArrowRight className="w-4 h-4 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 mr-2" />

                                            <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                                                {item}
                                            </span>
                                        </a>
                                    </li>
                                ))}
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
    );
}
