"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import LayoutPainelAdmin from "../../../components/LayoutPainelAdmin";
import { listarEventosAdmin } from "../../services/eventos-admin-service";
import type { DadosEventoAdmin } from "../../types/evento-admin";
import CardEventoEdicao from "./CardEventoEdicao";

export default function ListagemEditarEventos() {
  const [eventos, setEventos] = useState<DadosEventoAdmin[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarEventos() {
      const resposta = await listarEventosAdmin();

      if (resposta.sucesso) {
        setEventos(resposta.eventos);
      } else {
        setEventos([]);
      }

      setCarregando(false);
    }

    carregarEventos();
  }, []);

  return (
    <LayoutPainelAdmin paginaAtiva="eventos">
      <div className="relative flex min-h-screen flex-col items-center bg-[#d9f5fa] px-6 py-[18px]">
        <header className="flex flex-col items-center">
          <h1 className="text-center text-[14px] font-semibold uppercase tracking-[0.2px] text-[#252525]">
            Editar Abas
          </h1>

          <h2 className="mt-[4px] text-center text-[14px] font-medium uppercase tracking-[0.2px] text-[#252525] underline underline-offset-[4px]">
            Página de Eventos
          </h2>
        </header>

        <section className="mt-[18px] flex w-full max-w-[444px] flex-col gap-[8px]">
          {carregando && (
            <div className="rounded-[7px] border border-[#52c4d7] bg-white py-6 text-center text-[13px] text-[#252525]">
              Carregando eventos...
            </div>
          )}

          {!carregando && eventos.length === 0 && (
            <div className="rounded-[7px] border border-[#52c4d7] bg-white px-5 py-8 text-center shadow-[1px_2px_3px_rgba(0,0,0,0.14)]">
              <p className="text-[14px] font-medium text-[#252525]">
                Nenhum evento cadastrado ainda.
              </p>

              <p className="mt-2 text-[11px] font-light text-[#777]">
                Clique no botão + para adicionar o primeiro evento.
              </p>
            </div>
          )}

          {!carregando &&
            eventos.map((evento) => (
              <CardEventoEdicao key={evento.id} evento={evento} />
            ))}
        </section>

        <button
          type="button"
          onClick={() => {
            localStorage.removeItem("gaapo_admin_token");
            window.location.href = "/admin";
          }}
          className="absolute bottom-[24px] h-[26px] w-[112px] rounded-[6px] bg-[#52c4d7] text-[12px] font-bold uppercase text-white shadow-[1px_2px_3px_rgba(0,0,0,0.20)] transition hover:bg-[#40b8cc] focus:outline-none focus:ring-2 focus:ring-[#52c4d7]/50"
        >
          Sair
        </button>

        <Link
          href="/admin/eventos/adicionar"
          aria-label="Adicionar evento"
          className="absolute bottom-[22px] right-[26px] flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#52c4d7] text-[35px] font-light leading-none text-white shadow-[1px_2px_3px_rgba(0,0,0,0.20)] transition hover:scale-105 hover:bg-[#40b8cc] focus:outline-none focus:ring-2 focus:ring-[#52c4d7]/50"
        >
          +
        </Link>
      </div>
    </LayoutPainelAdmin>
  );
}