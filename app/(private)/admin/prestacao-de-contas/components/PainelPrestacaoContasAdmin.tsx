"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import LayoutPainelAdmin from "../../components/LayoutPainelAdmin";
import CabecalhoAdmin from "../../components/CabecalhoAdmin";
import { listarPrestacoesContasAdmin } from "../services/prestacao-contas-admin-service";
import type { DadosPrestacaoContasAdmin } from "../types/prestacao-contas-admin";
import CardPrestacaoContasAdmin from "./CardPrestacaoContasAdmin";

export default function PainelPrestacaoContasAdmin() {
  const router = useRouter();

  const [prestacoes, setPrestacoes] = useState<DadosPrestacaoContasAdmin[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [buscaTitulo, setBuscaTitulo] = useState("");
  const [filtroMes, setFiltroMes] = useState("");
  const [filtroAno, setFiltroAno] = useState("");

  useEffect(() => {
    async function carregarPrestacoes() {
      const resposta = await listarPrestacoesContasAdmin();

      if (resposta.sucesso) {
        setPrestacoes(resposta.prestacoes);
      } else {
        setPrestacoes([]);
      }

      setCarregando(false);
    }

    carregarPrestacoes();
  }, []);

  const prestacoesFiltradas = useMemo(() => {
    return prestacoes.filter((prestacao) => {
      const tituloConfere = prestacao.titulo
        .toLowerCase()
        .includes(buscaTitulo.toLowerCase().trim());

      const mesConfere = filtroMes
        ? prestacao.mesReferencia === filtroMes
        : true;

      const anoConfere = filtroAno
        ? prestacao.anoReferencia === filtroAno
        : true;

      return tituloConfere && mesConfere && anoConfere;
    });
  }, [prestacoes, buscaTitulo, filtroMes, filtroAno]);

  function sairDoPainel() {
    localStorage.removeItem("gaapo_admin_token");
    router.push("/admin");
  }

  function limparFiltros() {
    setBuscaTitulo("");
    setFiltroMes("");
    setFiltroAno("");
  }

  return (
    <LayoutPainelAdmin paginaAtiva="prestacao-contas">
      <div className="flex min-h-screen flex-col bg-[#fceefd] fundo-forminhas-admin px-6 pt-[18px]">
        <CabecalhoAdmin
          titulo="Prestação de Contas"
          subtitulo="Histórico de Relatórios"
          corTema="#b75fc1"
        />

        <section className="mx-auto mt-[22px] flex w-full max-w-[950px] flex-1 flex-col">
          <div className="mb-[14px] rounded-[10px] border border-[#b75fc1] bg-white px-4 py-4 shadow-[2px_3px_6px_rgba(0,0,0,0.10)]">
            <div className="grid grid-cols-[1fr_150px_140px_120px] gap-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
              <div className="relative">
                <label
                  htmlFor="buscaTitulo"
                  className="absolute -top-[9px] left-[12px] bg-white px-2 text-[11px] font-light text-[#252525]"
                >
                  Buscar por título
                </label>

                <input
                  id="buscaTitulo"
                  type="text"
                  value={buscaTitulo}
                  placeholder="Digite o título do relatório"
                  onChange={(event) => setBuscaTitulo(event.target.value)}
                  className="h-[40px] w-full rounded-[8px] border border-[#b75fc1] bg-white px-3 text-[13px] font-light text-[#252525] shadow-[1px_2px_3px_rgba(0,0,0,0.10)] outline-none placeholder:text-[#9d9d9d] focus:border-[#a94fb4] focus:ring-2 focus:ring-[#b75fc1]/30"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="filtroMes"
                  className="absolute -top-[9px] left-[12px] bg-white px-2 text-[11px] font-light text-[#252525]"
                >
                  Mês
                </label>

                <select
                  id="filtroMes"
                  value={filtroMes}
                  onChange={(event) => setFiltroMes(event.target.value)}
                  className="h-[40px] w-full rounded-[8px] border border-[#b75fc1] bg-white px-3 text-[13px] font-light text-[#252525] shadow-[1px_2px_3px_rgba(0,0,0,0.10)] outline-none focus:border-[#a94fb4] focus:ring-2 focus:ring-[#b75fc1]/30"
                >
                  <option value="">Todos</option>
                  <option value="01">Janeiro</option>
                  <option value="02">Fevereiro</option>
                  <option value="03">Março</option>
                  <option value="04">Abril</option>
                  <option value="05">Maio</option>
                  <option value="06">Junho</option>
                  <option value="07">Julho</option>
                  <option value="08">Agosto</option>
                  <option value="09">Setembro</option>
                  <option value="10">Outubro</option>
                  <option value="11">Novembro</option>
                  <option value="12">Dezembro</option>
                </select>
              </div>

              <div className="relative">
                <label
                  htmlFor="filtroAno"
                  className="absolute -top-[9px] left-[12px] bg-white px-2 text-[11px] font-light text-[#252525]"
                >
                  Ano
                </label>

                <input
                  id="filtroAno"
                  type="number"
                  value={filtroAno}
                  placeholder="2026"
                  onChange={(event) => setFiltroAno(event.target.value)}
                  className="h-[40px] w-full rounded-[8px] border border-[#b75fc1] bg-white px-3 text-[13px] font-light text-[#252525] shadow-[1px_2px_3px_rgba(0,0,0,0.10)] outline-none placeholder:text-[#9d9d9d] focus:border-[#a94fb4] focus:ring-2 focus:ring-[#b75fc1]/30"
                />
              </div>

              <button
                type="button"
                onClick={limparFiltros}
                className="h-[40px] rounded-[8px] border border-[#b75fc1] bg-white px-4 text-[13px] font-bold uppercase text-[#b75fc1] shadow-[1px_2px_3px_rgba(0,0,0,0.10)] transition hover:bg-[#fceefd] focus:outline-none focus:ring-2 focus:ring-[#b75fc1]/30"
              >
                Limpar
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-[12px]">
            {carregando && (
              <div className="rounded-[10px] border border-[#b75fc1] bg-white py-8 text-center text-[14px] text-[#252525] shadow-[2px_3px_6px_rgba(0,0,0,0.10)]">
                Carregando prestações de contas...
              </div>
            )}

            {!carregando && prestacoes.length === 0 && (
              <div className="rounded-[10px] border border-[#b75fc1] bg-white px-6 py-10 text-center shadow-[2px_3px_6px_rgba(0,0,0,0.10)]">
                <p className="text-[16px] font-medium text-[#252525]">
                  Nenhuma prestação de contas cadastrada ainda.
                </p>

                <p className="mt-2 text-[12px] font-light text-[#777]">
                  Clique no botão + para adicionar o primeiro relatório.
                </p>
              </div>
            )}

            {!carregando &&
              prestacoes.length > 0 &&
              prestacoesFiltradas.length === 0 && (
                <div className="rounded-[10px] border border-[#b75fc1] bg-white px-6 py-10 text-center shadow-[2px_3px_6px_rgba(0,0,0,0.10)]">
                  <p className="text-[16px] font-medium text-[#252525]">
                    Nenhum relatório encontrado.
                  </p>

                  <p className="mt-2 text-[12px] font-light text-[#777]">
                    Tente alterar ou limpar os filtros.
                  </p>
                </div>
              )}

            {!carregando &&
              prestacoesFiltradas.map((prestacao) => (
                <CardPrestacaoContasAdmin
                  key={prestacao.id}
                  prestacao={prestacao}
                />
              ))}
          </div>
        </section>

        <div className="mt-auto flex justify-center pb-[26px] pt-[28px]">
          <button
            type="button"
            onClick={sairDoPainel}
            className="h-[38px] w-[170px] rounded-[8px] bg-[#b75fc1] text-[15px] font-bold uppercase text-white shadow-[2px_3px_6px_rgba(0,0,0,0.18)] transition hover:bg-[#a94fb4] focus:outline-none focus:ring-2 focus:ring-[#b75fc1]/50"
          >
            Sair
          </button>
        </div>

        <Link
          href="/admin/prestacao-de-contas/adicionar"
          aria-label="Adicionar prestação de contas"
          className="fixed bottom-[28px] right-[28px] z-40 flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#b75fc1] text-[42px] font-light leading-none text-white shadow-[2px_4px_8px_rgba(0,0,0,0.22)] transition hover:scale-105 hover:bg-[#a94fb4] focus:outline-none focus:ring-2 focus:ring-[#b75fc1]/50"
        >
          +
        </Link>
      </div>
    </LayoutPainelAdmin>
  );
}