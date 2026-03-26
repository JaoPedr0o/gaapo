import Image from "next/image";
import Link from "next/link";
import logo from "./assets/Logo.svg";

export default function Navbar() {
    return (
        <nav className="bg-white border-b-2 border-[#C88DCF]">
            <div className="container mx-auto px-4 md:px-8 lg:px-12">
                <div className="flex items-center justify-between h-[72px]">

                    {/* Logo */}
                    <Link href="/">
                        <Image
                            src={logo}
                            alt="Logo GAAPO"
                            width={150}
                            height={40}
                            priority
                        />
                    </Link>

                    {/* Links */}
                    <ul className="pl-100 flex items-center gap-10">
                        <li>
                            <Link href="/" className="text-[17px] font-semibold text-slate-800 hover:text-[#C88DCF]">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/adocao" className="text-[17px] font-semibold text-slate-800 hover:text-[#C88DCF]">
                                Adoção
                            </Link>
                        </li>
                        <li>
                            <Link href="/doacao" className="text-[17px] font-semibold text-slate-800 hover:text-[#C88DCF]">
                                Doação
                            </Link>
                        </li>
                        <li>
                            <Link href="/eventos" className="text-[17px] font-semibold text-slate-800 hover:text-[#C88DCF]">
                                Eventos
                            </Link>
                        </li>
                        <li>
                            <Link href="/contas" className="text-[17px] font-semibold text-slate-800 hover:text-[#C88DCF]">
                                Contas
                            </Link>
                        </li>
                    </ul>

                    {/* Botão Contato */}
                    <Link
                        href="/contato"
                        className="bg-[#C88DCF] hover:bg-[#b87ec0] px-6 py-2.5 rounded-md font-bold uppercase text-white text-[13px] tracking-widest transition-colors"
                    >
                        Contato
                    </Link>

                </div>
            </div>
        </nav>
    );
}
