"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import logo from "./assets/Logo.svg";

/* ============================================================================
  LINKS DE NAVEGAÇÃO
============================================================================ */

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/adocao", label: "Adoção" },
  { href: "/doacao", label: "Doação" },
  { href: "/eventos", label: "Eventos" },
  { href: "/contas", label: "Contas" },
];

/* ============================================================================
  ESTILOS REUTILIZÁVEIS
============================================================================ */

const desktopLinkClass =
  "border-b-2 border-transparent pb-1 text-[15px] font-semibold text-slate-800 transition-colors";

const mobileLinkClass =
  "block px-6 py-4 text-[15px] font-semibold transition-colors";

/* ============================================================================
  COMPONENTE
============================================================================ */

export default function Navbar() {
  const pathname = usePathname();

  const [menuAberto, setMenuAberto] = useState(false);
  const [exibirMenu, setExibirMenu] = useState(false);

  /* ==========================================================================
    CONTROLA MONTAGEM / DESMONTAGEM DO MENU
  ========================================================================== */

  useEffect(() => {
    if (!menuAberto && exibirMenu) {
      const timeout = setTimeout(() => {
        setExibirMenu(false);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [menuAberto, exibirMenu]);

  /* ==========================================================================
    BLOQUEIA SCROLL QUANDO MENU MOBILE ESTÁ ABERTO
  ========================================================================== */

  useEffect(() => {
    document.body.style.overflow = menuAberto ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuAberto]);

  /* ==========================================================================
    ABRIR MENU
  ========================================================================== */

  function abrirMenu() {
    setExibirMenu(true);

    requestAnimationFrame(() => {
      setMenuAberto(true);
    });
  }

  /* ==========================================================================
    FECHAR MENU
  ========================================================================== */

  function fecharMenu() {
    setMenuAberto(false);
  }

  /* ==========================================================================
    SCROLL PARA CONTATO
  ========================================================================== */


  return (
    <nav className="border-b-2 border-brand-purple bg-white">

      {/* CONTAINER */}
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">

        {/* NAVBAR */}
        <div className="flex h-[72px] items-center justify-between">

          {/* LOGO */}
          <Link href="/">
            <Image
              src={logo}
              alt="Logo GAAPO"
              width={128}
              height={40}
              priority
            />
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
                const ativo = pathname === link.href;
                return (
                <li key={link.href}>
                    <Link
                    href={link.href}
                    className={`
                        text-[15px]
                        font-semibold
                        transition-colors
                        ${
                        ativo
                            ? "text-brand-purple"
                            : "text-slate-800 hover:text-brand-purple"
                        }
                    `}
                    >
                    {link.label}
                    </Link>
                </li>
                );
            })}
            </ul>

            {/* BOTÃO CONTATO */}
            <Link
                href="/#contato"
                className="
                    hidden md:inline-flex
                    rounded-md
                    bg-brand-darkPurple
                    px-6 py-2.5
                    text-[13px]
                    font-bold
                    uppercase
                    tracking-widest
                    text-white
                    transition-colors
                    hover:bg-brand-purple
                "
                >
                Contato
            </Link>

          {/* BOTÃO HAMBÚRGUER */}
          <button
            onClick={abrirMenu}
            aria-label="Abrir menu"
            className="
              flex flex-col gap-1.5 p-2
              md:hidden
            "
          >
            <span className="block h-0.5 w-6 rounded bg-slate-800" />
            <span className="block h-0.5 w-6 rounded bg-slate-800" />
            <span className="block h-0.5 w-6 rounded bg-slate-800" />
          </button>
        </div>
      </div>

      {/* MENU MOBILE */}
      {exibirMenu && (
        <div className="fixed inset-0 z-50 md:hidden">

          {/* OVERLAY */}
          <div
            onClick={fecharMenu}
            className={`
              absolute inset-0
              bg-black
              transition-opacity duration-300
              ${menuAberto ? "opacity-50" : "opacity-0"}
            `}
          />

          {/* PAINEL */}
          <div
            className={`
              absolute top-0 right-0
              flex h-full w-[220px] flex-col
              border-l-2 border-brand-purple
              bg-white
              transition-transform duration-300 ease-in-out
              ${menuAberto ? "translate-x-0" : "translate-x-full"}
            `}
          >

            {/* HEADER MENU */}
            <div
              className="
                flex h-[72px] items-center justify-between
                border-b-2 border-brand-purple
                px-4
              "
            >
              <Image
                src={logo}
                alt="Logo GAAPO"
                width={80}
                height={28}
              />

              <button
                onClick={fecharMenu}
                aria-label="Fechar menu"
                className="
                  text-2xl
                  font-light
                  leading-none
                  text-slate-800
                "
              >
                ✕
              </button>
            </div>

            {/* LINKS MOBILE */}
            <ul className="flex flex-col">
                {navLinks.map((link) => {
                    const ativo = pathname === link.href;

                    return (
                    <li
                        key={link.href}
                        className="border-b border-brand-purple"
                    >
                        <Link
                        href={link.href}
                        onClick={fecharMenu}
                        className={`
                            block px-6 py-4
                            text-[15px]
                            font-semibold
                            transition-colors
                            ${
                            ativo
                                ? "bg-brand-lightPurple/20 text-brand-purple"
                                : "text-slate-800 hover:text-brand-purple"
                            }
                        `}
                        >
                        {link.label}
                        </Link>
                    </li>
                    );
                })}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}