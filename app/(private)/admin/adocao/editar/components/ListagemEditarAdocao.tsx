"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import LayoutPainelAdmin from "../../../components/LayoutPainelAdmin";
import { listarAnimaisAdocao } from "../../services/adocao-admin-service";
import type { DadosAnimalAdocao } from "../../types/animal-adocao";
import CardAnimalEdicao from "./CardAnimalEdicao";

const animaisExemplo: DadosAnimalAdocao[] = [
  {
    id: "exemplo-1",
    nome: "Nome do animal",
    descricao:
      "Informações informações informações informações informações informações informações informações informações informações",
    idade: "",
    sexo: "",
    temperamento: "",
  },
  {
    id: "exemplo-2",
    nome: "Nome do animal",
    descricao:
      "Informações informações informações informações informações informações informações informações informações informações",
    idade: "",
    sexo: "",
    temperamento: "",
  },
  {
    id: "exemplo-3",
    nome: "Nome do animal",
    descricao:
      "Informações informações informações informações informações informações informações informações informações informações",
    idade: "",
    sexo: "",
    temperamento: "",
  },
];

export default function ListagemEditarAdocao() {
  const [animais, setAnimais] = useState<DadosAnimalAdocao[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarAnimais() {
      const resposta = await listarAnimaisAdocao();

      if (resposta.sucesso && resposta.animais.length > 0) {
        setAnimais(resposta.animais);
      } else {
        setAnimais(animaisExemplo);
      }

      setCarregando(false);
    }

    carregarAnimais();
  }, []);

  return (
    <LayoutPainelAdmin paginaAtiva="adocao">
      <div className="relative flex min-h-screen flex-col items-center bg-[#fde5ed] px-6 py-[18px]">
        <header className="flex flex-col items-center">
          <h1 className="text-center text-[14px] font-semibold uppercase tracking-[0.2px] text-[#252525]">
            Editar Abas
          </h1>

          <h2 className="mt-[4px] text-center text-[14px] font-medium uppercase tracking-[0.2px] text-[#252525] underline underline-offset-[4px]">
            Página de Adoção
          </h2>
        </header>

        <section className="mt-[18px] flex w-full max-w-[444px] flex-col gap-[8px]">
          {carregando ? (
            <div className="rounded-[7px] border border-[#f6a6bd] bg-white py-6 text-center text-[13px] text-[#252525]">
              Carregando animais...
            </div>
          ) : (
            animais.map((animal) => (
              <CardAnimalEdicao key={animal.id} animal={animal} />
            ))
          )}
        </section>

        <button
          type="button"
          onClick={() => {
            localStorage.removeItem("gaapo_admin_token");
            window.location.href = "/admin";
          }}
          className="absolute bottom-[24px] h-[26px] w-[112px] rounded-[6px] bg-[#f8a2bd] text-[12px] font-bold uppercase text-white shadow-[1px_2px_3px_rgba(0,0,0,0.20)] transition hover:bg-[#f58dac] focus:outline-none focus:ring-2 focus:ring-[#f8a2bd]/50"
        >
          Sair
        </button>

        <Link
          href="/admin/adocao/adicionar"
          aria-label="Adicionar animal"
          className="absolute bottom-[22px] right-[26px] flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#f8a2bd] text-[35px] font-light leading-none text-white shadow-[1px_2px_3px_rgba(0,0,0,0.20)] transition hover:scale-105 hover:bg-[#f58dac] focus:outline-none focus:ring-2 focus:ring-[#f8a2bd]/50"
        >
          +
        </Link>
      </div>
    </LayoutPainelAdmin>
  );
}