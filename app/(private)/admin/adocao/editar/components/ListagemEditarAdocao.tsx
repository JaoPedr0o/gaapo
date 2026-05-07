"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import LayoutPainelAdmin from "../../../components/LayoutPainelAdmin";
import { listarAnimaisAdocao } from "../../services/adocao-admin-service";
import type { DadosAnimalAdocao } from "../../types/animal-adocao";
import CardAnimalEdicao from "./CardAnimalEdicao";
import CabecalhoAdmin from "../../../components/CabecalhoAdmin";

export default function ListagemEditarAdocao() {
  const [animais, setAnimais] = useState<DadosAnimalAdocao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [buscaNome, setBuscaNome] = useState("");
  const [filtroEspecie, setFiltroEspecie] = useState("");
  const [filtroSexo, setFiltroSexo] = useState("");

  useEffect(() => {
    async function carregarAnimais() {
      const resposta = await listarAnimaisAdocao();

      if (resposta.sucesso) {
        setAnimais(resposta.animais);
      } else {
        setAnimais([]);
      }

      setCarregando(false);
    }

    carregarAnimais();
  }, []);

  const animaisFiltrados = useMemo(() => {
    return animais.filter((animal) => {
      const nomeConfere = animal.nome
        .toLowerCase()
        .includes(buscaNome.toLowerCase().trim());

      const especieConfere = filtroEspecie
        ? animal.especie === filtroEspecie
        : true;

      const sexoConfere = filtroSexo ? animal.sexo === filtroSexo : true;

      return nomeConfere && especieConfere && sexoConfere;
    });
  }, [animais, buscaNome, filtroEspecie, filtroSexo]);

  function sairDoPainel() {
    localStorage.removeItem("gaapo_admin_token");
    window.location.href = "/admin";
  }

  function limparFiltros() {
    setBuscaNome("");
    setFiltroEspecie("");
    setFiltroSexo("");
  }

  return (
    <LayoutPainelAdmin paginaAtiva="adocao">
      <div className="flex min-h-screen flex-col bg-[#fde5ed] fundo-forminhas-admin px-6 pt-[18px]">
        <CabecalhoAdmin
          titulo="Editar Abas"
          subtitulo="Página de Adoção"
          corTema="#f8a2bd"
        />

        <section className="mx-auto mt-[20px] flex w-full max-w-[900px] flex-1 flex-col">
          <div className="mb-[14px] rounded-[10px] border border-[#f6a6bd] bg-white px-4 py-4 shadow-[2px_3px_6px_rgba(0,0,0,0.10)]">
            <div className="grid grid-cols-[1fr_160px_160px_120px] gap-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
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
                  placeholder="Digite o nome do animal"
                  onChange={(event) => setBuscaNome(event.target.value)}
                  className="h-[40px] w-full rounded-[8px] border border-[#f6a6bd] bg-white px-3 text-[13px] font-light text-[#252525] shadow-[1px_2px_3px_rgba(0,0,0,0.10)] outline-none placeholder:text-[#9d9d9d] focus:border-[#f58fab] focus:ring-2 focus:ring-[#f6a6bd]/30"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="filtroEspecie"
                  className="absolute -top-[9px] left-[12px] bg-white px-2 text-[11px] font-light text-[#252525]"
                >
                  Tipo
                </label>

                <select
                  id="filtroEspecie"
                  value={filtroEspecie}
                  onChange={(event) => setFiltroEspecie(event.target.value)}
                  className="h-[40px] w-full rounded-[8px] border border-[#f6a6bd] bg-white px-3 text-[13px] font-light text-[#252525] shadow-[1px_2px_3px_rgba(0,0,0,0.10)] outline-none focus:border-[#f58fab] focus:ring-2 focus:ring-[#f6a6bd]/30"
                >
                  <option value="">Todos</option>
                  <option value="cao">Cão</option>
                  <option value="gato">Gato</option>
                  <option value="outros">Outros</option>
                </select>
              </div>

              <div className="relative">
                <label
                  htmlFor="filtroSexo"
                  className="absolute -top-[9px] left-[12px] bg-white px-2 text-[11px] font-light text-[#252525]"
                >
                  Sexo
                </label>

                <select
                  id="filtroSexo"
                  value={filtroSexo}
                  onChange={(event) => setFiltroSexo(event.target.value)}
                  className="h-[40px] w-full rounded-[8px] border border-[#f6a6bd] bg-white px-3 text-[13px] font-light text-[#252525] shadow-[1px_2px_3px_rgba(0,0,0,0.10)] outline-none focus:border-[#f58fab] focus:ring-2 focus:ring-[#f6a6bd]/30"
                >
                  <option value="">Todos</option>
                  <option value="macho">Macho</option>
                  <option value="femea">Fêmea</option>
                </select>
              </div>

              <button
                type="button"
                onClick={limparFiltros}
                className="h-[40px] rounded-[8px] border border-[#f6a6bd] bg-white px-4 text-[13px] font-bold uppercase text-[#f4a1bc] shadow-[1px_2px_3px_rgba(0,0,0,0.10)] transition hover:bg-[#fff4f8] focus:outline-none focus:ring-2 focus:ring-[#f6a6bd]/30"
              >
                Limpar
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-[12px]">
            {carregando && (
              <div className="rounded-[10px] border border-[#f6a6bd] bg-white py-8 text-center text-[14px] text-[#252525] shadow-[2px_3px_6px_rgba(0,0,0,0.10)]">
                Carregando animais...
              </div>
            )}

            {!carregando && animais.length === 0 && (
              <div className="rounded-[10px] border border-[#f6a6bd] bg-white px-6 py-10 text-center shadow-[2px_3px_6px_rgba(0,0,0,0.10)]">
                <p className="text-[16px] font-medium text-[#252525]">
                  Nenhum animal cadastrado ainda.
                </p>

                <p className="mt-2 text-[12px] font-light text-[#777]">
                  Clique no botão + para adicionar o primeiro animal.
                </p>
              </div>
            )}

            {!carregando &&
              animais.length > 0 &&
              animaisFiltrados.length === 0 && (
                <div className="rounded-[10px] border border-[#f6a6bd] bg-white px-6 py-10 text-center shadow-[2px_3px_6px_rgba(0,0,0,0.10)]">
                  <p className="text-[16px] font-medium text-[#252525]">
                    Nenhum animal encontrado.
                  </p>

                  <p className="mt-2 text-[12px] font-light text-[#777]">
                    Tente alterar ou limpar os filtros.
                  </p>
                </div>
              )}

            {!carregando &&
              animaisFiltrados.map((animal) => (
                <CardAnimalEdicao key={animal.id} animal={animal} />
              ))}
          </div>
        </section>

        <div className="mt-auto flex justify-center pb-[26px] pt-[28px]">
          <button
            type="button"
            onClick={sairDoPainel}
            className="h-[38px] w-[170px] rounded-[8px] bg-[#f4a1bc] text-[15px] font-bold uppercase text-white shadow-[2px_3px_6px_rgba(0,0,0,0.18)] transition hover:bg-[#f28bad] focus:outline-none focus:ring-2 focus:ring-[#f4a1bc]/50"
          >
            Sair
          </button>
        </div>

        <Link
          href="/admin/adocao/adicionar"
          aria-label="Adicionar animal"
          className="fixed bottom-[28px] right-[28px] z-40 flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#f4a1bc] text-[42px] font-light leading-none text-white shadow-[2px_4px_8px_rgba(0,0,0,0.22)] transition hover:scale-105 hover:bg-[#f28bad] focus:outline-none focus:ring-2 focus:ring-[#f4a1bc]/50"
        >
          +
        </Link>
      </div>
    </LayoutPainelAdmin>
  );
}