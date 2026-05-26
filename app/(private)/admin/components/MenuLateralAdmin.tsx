"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type PaginaAtivaAdmin =
  | "adocao"
  | "doacoes"
  | "prestacao-contas"
  | "eventos";

type ItemMenuAdmin = {
  titulo: string;
  href: string;
  pagina: PaginaAtivaAdmin;
};

type MenuLateralAdminProps = {
  paginaAtiva: PaginaAtivaAdmin;
};

const imagensMenu: Record<PaginaAtivaAdmin, string> = {
  adocao: "/menu-lateral-adocao.svg",
  doacoes: "/menu-lateral-doacoes.svg",
  "prestacao-contas": "/menu-lateral-prestacao-contas.svg",
  eventos: "/menu-lateral-eventos.svg",
};

const coresMenu: Record<PaginaAtivaAdmin, string> = {
  adocao: "#f8a2bd",
  doacoes: "#f5bd00",
  "prestacao-contas": "#b75fc1",
  eventos: "#52c4d7",
};

const nomesPagina: Record<PaginaAtivaAdmin, string> = {
  adocao: "Adoção",
  doacoes: "Doações",
  "prestacao-contas": "Prestação de Contas",
  eventos: "Eventos",
};

const itensMenu: ItemMenuAdmin[] = [
  {
    titulo: "Página de Adoção",
    href: "/admin/adocao",
    pagina: "adocao",
  },
  {
    titulo: "Página de Doações",
    href: "/admin/doacoes",
    pagina: "doacoes",
  },
  {
    titulo: "Página de Prestação de Contas",
    href: "/admin/prestacao-de-contas",
    pagina: "prestacao-contas",
  },
  {
    titulo: "Página de Eventos",
    href: "/admin/eventos",
    pagina: "eventos",
  },
];

export default function MenuLateralAdmin({
  paginaAtiva,
}: MenuLateralAdminProps) {
  const [menuAberto, setMenuAberto] = useState(false);

  const imagemFundo = imagensMenu[paginaAtiva];
  const corTema = coresMenu[paginaAtiva];
  const nomePaginaAtual = nomesPagina[paginaAtiva];

  function fecharMenuMobile() {
    setMenuAberto(false);
  }

  return (
    <>
      <aside className="relative hidden min-h-screen w-[226px] shrink-0 flex-col overflow-hidden border-r bg-white shadow-[2px_0_4px_rgba(0,0,0,0.10)] md:flex">
        <Image
          src={imagemFundo}
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="226px"
          className="z-0 object-cover"
        />

        <nav className="relative z-10 flex min-h-screen flex-col justify-center px-4 py-8">
          <ul className="flex flex-col gap-[34px]">
            {itensMenu.map((item) => {
              const ativo = item.pagina === paginaAtiva;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block w-full text-center text-[16px] font-semibold uppercase leading-[1.25] tracking-[0.2px] text-[#252525] transition hover:scale-[1.02]"
                    style={{
                      textDecoration: ativo ? "underline" : "none",
                      textDecorationColor: ativo ? corTema : "transparent",
                      textUnderlineOffset: "5px",
                    }}
                  >
                    {item.titulo}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      <div className="fixed left-0 right-0 top-0 z-50 flex h-[58px] items-center justify-between border-b border-black/10 bg-white/95 px-4 shadow-[0_2px_5px_rgba(0,0,0,0.12)] backdrop-blur md:hidden">
        <div className="flex flex-col">
          <span className="text-[10px] font-light uppercase tracking-[0.4px] text-[#777]">
            Painel Admin
          </span>

          <strong
            className="text-[15px] font-bold uppercase leading-none"
            style={{ color: corTema }}
          >
            {nomePaginaAtual}
          </strong>
        </div>

        <button
          type="button"
          onClick={() => setMenuAberto(true)}
          className="flex h-[38px] items-center justify-center rounded-[8px] px-4 text-[13px] font-bold uppercase text-white shadow-[1px_2px_4px_rgba(0,0,0,0.18)] transition hover:scale-[1.02]"
          style={{ backgroundColor: corTema }}
        >
          Menu
        </button>
      </div>

      {menuAberto && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={fecharMenuMobile}
            className="absolute inset-0 bg-black/35"
          />

          <aside className="relative z-10 flex min-h-screen w-[270px] flex-col overflow-hidden bg-white shadow-[4px_0_12px_rgba(0,0,0,0.25)]">
            <Image
              src={imagemFundo}
              alt=""
              aria-hidden="true"
              fill
              priority
              sizes="270px"
              className="z-0 object-cover"
            />

            <div className="relative z-10 flex items-center justify-between px-4 pt-5">
              <div>
                <span className="block text-[10px] font-light uppercase text-[#777]">
                  Menu
                </span>

                <strong
                  className="text-[15px] font-bold uppercase"
                  style={{ color: corTema }}
                >
                  {nomePaginaAtual}
                </strong>
              </div>

              <button
                type="button"
                onClick={fecharMenuMobile}
                className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white text-[22px] font-light text-[#252525] shadow-[1px_2px_4px_rgba(0,0,0,0.18)]"
              >
                ×
              </button>
            </div>

            <nav className="relative z-10 mt-[70px] flex flex-col px-4">
              <ul className="flex flex-col gap-[28px]">
                {itensMenu.map((item) => {
                  const ativo = item.pagina === paginaAtiva;

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={fecharMenuMobile}
                        className="block rounded-[10px] bg-white/80 px-3 py-3 text-center text-[15px] font-semibold uppercase leading-[1.25] tracking-[0.2px] text-[#252525] shadow-[1px_2px_4px_rgba(0,0,0,0.10)] transition hover:bg-white"
                        style={{
                          border: ativo
                            ? `1px solid ${corTema}`
                            : "1px solid transparent",
                        }}
                      >
                        {item.titulo}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}