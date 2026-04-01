"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import logo from "./assets/Logo.svg";

export default function Navbar() {
    const [menuAberto, setMenuAberto] = useState(false);
    const [exibirMenu, setExibirMenu] = useState(false);

    useEffect(() => {
        if (!menuAberto && exibirMenu) {
            const timeout = setTimeout(() => setExibirMenu(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [menuAberto, exibirMenu]);

    return (
        <nav className="bg-white border-b-2 border-[#C88DCF]">
            <div className="container mx-auto px-4 md:px-8 lg:px-12">
                <div className="flex items-center justify-between h-[72px]">

                    {/* Logo */}
                    <Link href="/">
                        <Image
                            src={logo}
                            alt="Logo GAAPO"
                            width={128}
                            height={40}
                            priority
                        />
                    </Link>

                    {/* Links — só aparece em telas grandes */}
                    <ul className="hidden md:flex items-center gap-8">
                        <li>
                            <Link href="/" className="text-[15px] font-semibold text-slate-800 ">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/adocao" className="text-[15px] font-semibold text-slate-800 hover:text-[#C88DCF]">
                                Adoção
                            </Link>
                        </li>
                        <li>
                            <Link href="/doacao" className="text-[15px] font-semibold text-slate-800 hover:text-[#C88DCF]">
                                Doação
                            </Link>
                        </li>
                        <li>
                            <Link href="/eventos" className="text-[15px] font-semibold text-slate-800 hover:text-[#C88DCF]">
                                Eventos
                            </Link>
                        </li>
                        <li>
                            <Link href="/contas" className="text-[15px] font-semibold text-slate-800 hover:text-[#C88DCF]">
                                Contas
                            </Link>
                        </li>
                    </ul>

                    {/* Botão Contato — só aparece em telas grandes */}
                    <Link
                        href="/contato"
                        className="hidden md:inline-flex bg-[#C88DCF] hover:bg-[#b87ec0] px-6 py-2.5 rounded-md font-bold uppercase text-white text-[13px] tracking-widest transition-colors"
                    >
                        Contato
                    </Link>

                    {/* Ícone hambúrguer — só aparece em telas pequenas */}
                    <button
                        onClick={() => {
                            setExibirMenu(true);
                            requestAnimationFrame(() => setMenuAberto(true));
                        }}
                        className="md:hidden flex flex-col gap-[6px] p-2"
                        aria-label="Abrir menu"
                    >
                        <span className="block w-6 h-[2px] bg-slate-800 rounded" />
                        <span className="block w-6 h-[2px] bg-slate-800 rounded" />
                        <span className="block w-6 h-[2px] bg-slate-800 rounded" />
                    </button>

                </div>
            </div>

            {/* Menu mobile — painel que abre à direita */}
            {exibirMenu && (
                <div className="fixed inset-0 z-50 md:hidden">

                    {/* Fundo escurecido ao clicar fora fecha o menu */}
                    <div
                        className={`absolute inset-0 bg-black transition-opacity duration-300 ${menuAberto ? "opacity-50" : "opacity-0"}`}
                        onClick={() => setMenuAberto(false)}
                    />

                    {/* Painel lateral direito */}
                    <div className={`absolute top-0 right-0 w-[220px] h-full bg-white border-l-2 border-[#C88DCF] flex flex-col transform transition-transform duration-300 ease-in-out ${menuAberto ? "translate-x-0" : "translate-x-full"}`}>

                        {/* Cabeçalho do painel com logo e botão fechar */}
                        <div className="flex items-center justify-between px-4 h-[72px] border-b-2 border-[#C88DCF]">
                            <Image
                                src={logo}
                                alt="Logo GAAPO"
                                width={80}
                                height={28}
                                priority
                            />
                            <button
                                onClick={() => setMenuAberto(false)}
                                aria-label="Fechar menu"
                                className="text-slate-800 text-2xl font-light leading-none"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Links do menu mobile */}
                        <ul className="flex flex-col">
                            <li className="border-b border-[#C88DCF]">
                                <Link href="/" onClick={() => setMenuAberto(false)} className="block px-6 py-4 text-[15px] font-semibold text-slate-800 hover:text-[#C88DCF]">
                                    Home
                                </Link>
                            </li>
                            <li className="border-b border-[#C88DCF]">
                                <Link href="/adocao" onClick={() => setMenuAberto(false)} className="block px-6 py-4 text-[15px] font-semibold text-slate-800 hover:text-[#C88DCF]">
                                    Adoção
                                </Link>
                            </li>
                            <li className="border-b border-[#C88DCF]">
                                <Link href="/doacao" onClick={() => setMenuAberto(false)} className="block px-6 py-4 text-[15px] font-semibold text-slate-800 hover:text-[#C88DCF]">
                                    Doação
                                </Link>
                            </li>
                            <li className="border-b border-[#C88DCF]">
                                <Link href="/eventos" onClick={() => setMenuAberto(false)} className="block px-6 py-4 text-[15px] font-semibold text-slate-800 hover:text-[#C88DCF]">
                                    Eventos
                                </Link>
                            </li>
                            <li className="border-b border-[#C88DCF]">
                                <Link href="/contas" onClick={() => setMenuAberto(false)} className="block px-6 py-4 text-[15px] font-semibold text-slate-800 hover:text-[#C88DCF]">
                                    Contas
                                </Link>
                            </li>
                        </ul>

                    </div>
                </div>
            )}

        </nav>
    );
}
