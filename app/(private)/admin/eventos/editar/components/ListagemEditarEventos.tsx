"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import LayoutPainelAdmin from "../../../components/LayoutPainelAdmin";
import { listarEventosAdmin } from "../../services/eventos-admin-service";
import type { DadosEventoAdmin } from "../../types/evento-admin";
import CardEventoEdicao from "./CardEventoEdicao";

export default function ListagemEditarEventos() {
  const [eventos, setEventos] = useState<DadosEventoAdmin[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [buscaNome, setBuscaNome] = useState("");
  const [buscaLocal, setBuscaLocal] = useState("");
  const [filtroData, setFiltroData] = useState("");

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

  const eventosFiltrados = useMemo(() => {
    return eventos.filter((evento) => {
      const nomeConfere = evento.nome
        .toLowerCase()
        .includes(buscaNome.toLowerCase().trim());

      const localConfere = evento.local
        .toLowerCase()
        .includes(buscaLocal.toLowerCase().trim());

      const dataConfere = filtroData ? evento.data === filtroData : true;

      return nomeConfere && localConfere && dataConfere;
    });
  }, [eventos, buscaNome, buscaLocal, filtroData]);

  function sairDoPainel() {
    localStorage.removeItem("gaapo_admin_token");
    window.location.href = "/admin";
  }

  function limparFiltros() {
    setBuscaNome("");
    setBuscaLocal("");
    setFiltroData("");
  }

  return (
    <LayoutPainelAdmin paginaAtiva="eventos">
      <div className="flex min-h-screen flex-col bg-[#d9f5fa] px-6 pt-[18px]">
        <header className="flex flex-col items-center">
          <h1 className="text-center text-[15px] font-semibold uppercase tracking-[0.2px] text-[#252525]">
            Editar Abas
          </h1>

          <h2 className="mt-[4px] text-center text-[15px] font-medium uppercase tracking-[0.2px] text-[#252525] underline underline-offset-[4px]">
            Página de Eventos
          </h2>
        </header>

        <section className="mx-auto mt-[20px] flex w-full max-w-[900px] flex-1 flex-col">
          <div className="mb-[14px] rounded-[10px] border border-[#52c4d7] bg-white px-4 py-4 shadow-[2px_3px_6px_rgba(0,0,0,0.10)]">
            <div className="grid grid-cols-[1fr_1fr_160px_120px] gap-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
              <div className="relative">
                <label
                  htmlFor="buscaNome"
                  className="absolute -top-[9px] left-[12px] bg-white px-2 text-[11px] font-light text-[#252525]"
                >
                  Buscar por nome
                </label>

                <input
                  id="buscaNome"
                  type="text"
                  value={buscaNome}
                  placeholder="Digite o nome do evento"
                  onChange={(event) => setBuscaNome(event.target.value)}
                  className="h-[40px] w-full rounded-[8px] border border-[#52c4d7] bg-white px-3 text-[13px] font-light text-[#252525] shadow-[1px_2px_3px_rgba(0,0,0,0.10)] outline-none placeholder:text-[#9d9d9d] focus:border-[#40b8cc] focus:ring-2 focus:ring-[#52c4d7]/30"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="buscaLocal"
                  className="absolute -top-[9px] left-[12px] bg-white px-2 text-[11px] font-light text-[#252525]"
                >
                  Buscar por local
                </label>

                <input
                  id="buscaLocal"
                  type="text"
                  value={buscaLocal}
                  placeholder="Digite o local do evento"
                  onChange={(event) => setBuscaLocal(event.target.value)}
                  className="h-[40px] w-full rounded-[8px] border border-[#52c4d7] bg-white px-3 text-[13px] font-light text-[#252525] shadow-[1px_2px_3px_rgba(0,0,0,0.10)] outline-none placeholder:text-[#9d9d9d] focus:border-[#40b8cc] focus:ring-2 focus:ring-[#52c4d7]/30"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="filtroData"
                  className="absolute -top-[9px] left-[12px] bg-white px-2 text-[11px] font-light text-[#252525]"
                >
                  Data
                </label>

                <input
                  id="filtroData"
                  type="date"
                  value={filtroData}
                  onChange={(event) => setFiltroData(event.target.value)}
                  className="h-[40px] w-full rounded-[8px] border border-[#52c4d7] bg-white px-3 text-[13px] font-light text-[#252525] shadow-[1px_2px_3px_rgba(0,0,0,0.10)] outline-none focus:border-[#40b8cc] focus:ring-2 focus:ring-[#52c4d7]/30"
                />
              </div>

              <button
                type="button"
                onClick={limparFiltros}
                className="h-[40px] rounded-[8px] border border-[#52c4d7] bg-white px-4 text-[13px] font-bold uppercase text-[#52c4d7] shadow-[1px_2px_3px_rgba(0,0,0,0.10)] transition hover:bg-[#eefcff] focus:outline-none focus:ring-2 focus:ring-[#52c4d7]/30"
              >
                Limpar
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-[12px]">
            {carregando && (
              <div className="rounded-[10px] border border-[#52c4d7] bg-white py-8 text-center text-[14px] text-[#252525] shadow-[2px_3px_6px_rgba(0,0,0,0.10)]">
                Carregando eventos...
              </div>
            )}

            {!carregando && eventos.length === 0 && (
              <div className="rounded-[10px] border border-[#52c4d7] bg-white px-6 py-10 text-center shadow-[2px_3px_6px_rgba(0,0,0,0.10)]">
                <p className="text-[16px] font-medium text-[#252525]">
                  Nenhum evento cadastrado ainda.
                </p>

                <p className="mt-2 text-[12px] font-light text-[#777]">
                  Clique no botão + para adicionar o primeiro evento.
                </p>
              </div>
            )}

            {!carregando &&
              eventos.length > 0 &&
              eventosFiltrados.length === 0 && (
                <div className="rounded-[10px] border border-[#52c4d7] bg-white px-6 py-10 text-center shadow-[2px_3px_6px_rgba(0,0,0,0.10)]">
                  <p className="text-[16px] font-medium text-[#252525]">
                    Nenhum evento encontrado.
                  </p>

                  <p className="mt-2 text-[12px] font-light text-[#777]">
                    Tente alterar ou limpar os filtros.
                  </p>
                </div>
              )}

            {!carregando &&
              eventosFiltrados.map((evento) => (
                <CardEventoEdicao key={evento.id} evento={evento} />
              ))}
          </div>
        </section>

        <div className="mt-auto flex justify-center pb-[26px] pt-[28px]">
          <button
            type="button"
            onClick={sairDoPainel}
            className="h-[38px] w-[170px] rounded-[8px] bg-[#52c4d7] text-[15px] font-bold uppercase text-white shadow-[2px_3px_6px_rgba(0,0,0,0.18)] transition hover:bg-[#40b8cc] focus:outline-none focus:ring-2 focus:ring-[#52c4d7]/50"
          >
            Sair
          </button>
        </div>

        <Link
          href="/admin/eventos/adicionar"
          aria-label="Adicionar evento"
          className="fixed bottom-[28px] right-[28px] z-40 flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#52c4d7] text-[42px] font-light leading-none text-white shadow-[2px_4px_8px_rgba(0,0,0,0.22)] transition hover:scale-105 hover:bg-[#40b8cc] focus:outline-none focus:ring-2 focus:ring-[#52c4d7]/50"
        >
          +
        </Link>
      </div>
    </LayoutPainelAdmin>
  );
}