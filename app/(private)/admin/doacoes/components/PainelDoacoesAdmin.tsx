"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LayoutPainelAdmin from "../../components/LayoutPainelAdmin";
import { buscarDadosDoacoesAdmin } from "../services/doacoes-admin-service";
import type { DadosDoacoesAdmin } from "../types/doacoes-admin";
import CabecalhoAdmin from "../../components/CabecalhoAdmin";

export default function PainelDoacoesAdmin() {
  const router = useRouter();

  const [dadosDoacoes, setDadosDoacoes] =
    useState<DadosDoacoesAdmin | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      const resposta = await buscarDadosDoacoesAdmin();

      if (resposta.sucesso && resposta.dados) {
        setDadosDoacoes(resposta.dados);
      }

      setCarregando(false);
    }

    carregarDados();
  }, []);

  function irParaEditarDoacoes() {
    router.push("/admin/doacoes/editar");
  }

  function sairDoPainel() {
    localStorage.removeItem("gaapo_admin_token");
    router.push("/admin");
  }

  return (
    <LayoutPainelAdmin paginaAtiva="doacoes">
      <div className="flex min-h-screen flex-col bg-[#fff5cf] bg-[url('/admin-forminhas-preto-transparente.svg')] bg-cover bg-center bg-no-repeat px-6 pt-[28px]">
        <CabecalhoAdmin
          titulo="Editar Aba"
          subtitulo="Página de Doações"
          corTema="#f5bd00"
        />

        <section className="flex flex-1 items-center justify-center py-10">
          <div className="relative w-full max-w-[780px] rounded-[14px] border border-[#f5bd00] bg-white px-8 py-8 shadow-[4px_5px_0_#f5bd00] max-md:px-5">
            <div className="mb-7 text-center">
              <h3 className="text-[36px] font-bold uppercase leading-none tracking-[0.3px] text-[#f5bd00] max-md:text-[28px]">
                Meios para Doação
              </h3>

              <p className="mx-auto mt-3 max-w-[520px] text-[14px] font-light leading-[1.5] text-[#666]">
                Confira abaixo as informações cadastradas para recebimento de
                doações.
              </p>
            </div>

            {carregando ? (
              <div className="rounded-[10px] border border-[#f5bd00]/40 bg-[#fffaf0] px-5 py-8 text-center text-[14px] text-[#252525]">
                Carregando informações...
              </div>
            ) : (
              <div className="mx-auto flex w-full max-w-[600px] flex-col gap-[18px]">
                <div className="flex items-center rounded-[12px] border border-[#f5bd00]/50 bg-[#fffaf0] px-5 py-4 shadow-[1px_2px_4px_rgba(0,0,0,0.08)] max-sm:flex-col max-sm:items-start max-sm:gap-3">
                  <div className="mr-5 grid h-[48px] w-[48px] rotate-45 grid-cols-2 gap-[5px] shrink-0 max-sm:mr-0">
                    <span className="rounded-[5px] bg-[#f5bd00]" />
                    <span className="rounded-[5px] bg-[#f5bd00]" />
                    <span className="rounded-[5px] bg-[#f5bd00]" />
                    <span className="rounded-[5px] bg-[#f5bd00]" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="block text-[25px] font-bold uppercase leading-none text-[#252525] max-md:text-[22px]">
                      Chave Pix
                    </span>

                    <span className="mt-2 block break-all text-[15px] font-medium text-[#252525]">
                      {dadosDoacoes?.chavePix || "Nenhuma chave PIX informada"}
                    </span>

                    <span className="mt-1 block text-[13px] font-light text-[#666]">
                      Doe via PIX
                    </span>
                  </div>
                </div>

                <div className="flex items-center rounded-[12px] border border-[#f5bd00]/50 bg-[#fffaf0] px-5 py-4 shadow-[1px_2px_4px_rgba(0,0,0,0.08)] max-sm:flex-col max-sm:items-start max-sm:gap-3">
                  <div className="relative mr-5 h-[50px] w-[58px] shrink-0 text-[#f5bd00] max-sm:mr-0">
                    <div className="absolute left-0 top-[13px] h-[6px] w-[58px] bg-[#f5bd00]" />
                    <div className="absolute left-[6px] top-[21px] h-[23px] w-[6px] bg-[#f5bd00]" />
                    <div className="absolute left-[19px] top-[21px] h-[23px] w-[6px] bg-[#f5bd00]" />
                    <div className="absolute left-[32px] top-[21px] h-[23px] w-[6px] bg-[#f5bd00]" />
                    <div className="absolute left-[45px] top-[21px] h-[23px] w-[6px] bg-[#f5bd00]" />
                    <div className="absolute bottom-0 left-0 h-[6px] w-[58px] bg-[#f5bd00]" />
                    <div className="absolute left-0 top-0 h-0 w-0 border-x-[29px] border-b-[15px] border-x-transparent border-b-[#f5bd00]" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="block text-[25px] font-bold uppercase leading-none text-[#252525] max-md:text-[22px]">
                      Número CB
                    </span>

                    <span className="mt-2 block break-words text-[15px] font-medium text-[#252525]">
                      {dadosDoacoes?.numeroContaBancaria ||
                        "Nenhuma conta bancária informada"}
                    </span>

                    <span className="mt-1 block text-[13px] font-light text-[#666]">
                      Doe via Conta Bancária
                    </span>
                  </div>
                </div>

                <div className="mt-2 rounded-[10px] border border-[#f5bd00]/40 bg-white px-5 py-4 text-center">
                  <p className="text-[15px] font-light leading-[1.5] text-[#252525]">
                    {dadosDoacoes?.textoInformativo ||
                      "Deseja fazer alguma doação e possui dúvidas?"}
                  </p>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={irParaEditarDoacoes}
              aria-label="Editar informações de doação"
              className="absolute right-[20px] top-1/2 flex h-[48px] w-[36px] -translate-y-1/2 items-center justify-center rounded-full text-[54px] font-light leading-none text-[#f5bd00] transition hover:scale-110 hover:bg-[#fff5cf] focus:outline-none focus:ring-2 focus:ring-[#f5bd00]/40 max-md:static max-md:mx-auto max-md:mt-6 max-md:translate-y-0"
            >
              ›
            </button>
          </div>
        </section>

        <div className="mt-auto flex justify-center pb-[34px]">
          <button
            type="button"
            onClick={sairDoPainel}
            className="h-[38px] w-[170px] rounded-[8px] bg-[#f5bd00] text-[15px] font-bold uppercase text-white shadow-[2px_3px_6px_rgba(0,0,0,0.20)] transition hover:bg-[#e5b000] focus:outline-none focus:ring-2 focus:ring-[#f5bd00]/50"
          >
            Sair
          </button>
        </div>
      </div>
    </LayoutPainelAdmin>
  );
}