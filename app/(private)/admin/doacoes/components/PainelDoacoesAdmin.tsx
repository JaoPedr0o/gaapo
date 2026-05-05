"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LayoutPainelAdmin from "../../components/LayoutPainelAdmin";
import { buscarDadosDoacoesAdmin } from "../services/doacoes-admin-service";
import type { DadosDoacoesAdmin } from "../types/doacoes-admin";

export default function PainelDoacoesAdmin() {
  const router = useRouter();

  const [dadosDoacoes, setDadosDoacoes] = useState<DadosDoacoesAdmin | null>(null);
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
      <div className="relative flex min-h-screen flex-col items-center bg-[#fff5cf] px-4 py-6 md:px-6">
        <header className="flex flex-col items-center">
          <h1 className="text-center text-[20px] font-semibold uppercase tracking-[0.3px] text-[#252525]">
            Editar Aba
          </h1>

          <h2 className="mt-[4px] text-center text-[20px] font-medium uppercase tracking-[0.2px] text-[#252525] underline underline-offset-[5px]">
            Página de Doações
          </h2>
        </header>

        <section className="mt-[28px] flex w-full justify-center">
          <div className="relative flex w-full max-w-[760px] flex-col items-center rounded-[8px] border border-[#f5bd00] bg-white px-5 py-8 shadow-[1px_2px_3px_rgba(0,0,0,0.12)] md:px-8">
            <h3 className="text-center text-[32px] font-bold uppercase leading-none tracking-[0.2px] text-[#f5bd00] md:text-[40px]">
              Meios para Doação
            </h3>

            {carregando ? (
              <div className="py-12 text-[14px] text-[#252525]">
                Carregando informações...
              </div>
            ) : (
              <div className="mt-[28px] flex w-full flex-col items-center gap-[34px]">
                <div className="flex w-full max-w-[520px] items-center gap-[18px]">
                  <div className="grid h-[46px] w-[46px] rotate-45 grid-cols-2 gap-[5px] shrink-0">
                    <span className="rounded-[5px] bg-[#f5bd00]" />
                    <span className="rounded-[5px] bg-[#f5bd00]" />
                    <span className="rounded-[5px] bg-[#f5bd00]" />
                    <span className="rounded-[5px] bg-[#f5bd00]" />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[28px] font-bold uppercase leading-[28px] text-[#252525] md:text-[36px] md:leading-[36px]">
                      Chave Pix
                    </span>

                    <span className="mt-[4px] break-all text-[14px] font-medium text-[#252525] md:text-[18px]">
                      {dadosDoacoes?.chavePix || "Não informado"}
                    </span>

                    <span className="mt-[2px] text-[13px] font-medium text-[#252525] md:text-[16px]">
                      Doe via PIX
                    </span>
                  </div>
                </div>

                <div className="flex w-full max-w-[520px] items-center gap-[18px]">
                  <div className="relative h-[50px] w-[56px] shrink-0 text-[#f5bd00]">
                    <div className="absolute left-0 top-[12px] h-[6px] w-[56px] bg-[#f5bd00]" />
                    <div className="absolute left-[5px] top-[20px] h-[23px] w-[6px] bg-[#f5bd00]" />
                    <div className="absolute left-[18px] top-[20px] h-[23px] w-[6px] bg-[#f5bd00]" />
                    <div className="absolute left-[31px] top-[20px] h-[23px] w-[6px] bg-[#f5bd00]" />
                    <div className="absolute left-[44px] top-[20px] h-[23px] w-[6px] bg-[#f5bd00]" />
                    <div className="absolute bottom-0 left-0 h-[6px] w-[56px] bg-[#f5bd00]" />
                    <div className="absolute left-0 top-0 h-0 w-0 border-x-[28px] border-b-[14px] border-x-transparent border-b-[#f5bd00]" />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[28px] font-bold uppercase leading-[28px] text-[#252525] md:text-[36px] md:leading-[36px]">
                      Número CB
                    </span>

                    <span className="mt-[4px] break-words text-[14px] font-medium text-[#252525] md:text-[18px]">
                      {dadosDoacoes?.numeroContaBancaria || "Não informado"}
                    </span>

                    <span className="mt-[2px] text-[13px] font-medium text-[#252525] md:text-[16px]">
                      Doe via Conta Bancária
                    </span>
                  </div>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={irParaEditarDoacoes}
              aria-label="Editar informações de doação"
              className="absolute right-[18px] top-1/2 flex h-[42px] w-[28px] -translate-y-1/2 items-center justify-center text-[58px] font-light leading-none text-[#f5bd00] transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#f5bd00]/40 md:right-[28px]"
            >
              ›
            </button>

            <div className="mt-[34px] flex flex-col items-center">
              <p className="text-center text-[13px] font-light text-[#252525] md:text-[17px]">
                {dadosDoacoes?.textoInformativo ||
                  "Deseja fazer alguma doação e possuí dúvidas?"}
              </p>

              <button
                type="button"
                className="mt-[14px] h-[34px] rounded-[6px] bg-[#f5bd00] px-5 text-[11px] font-bold text-white shadow-[1px_2px_3px_rgba(0,0,0,0.20)] transition hover:bg-[#e5b000] focus:outline-none focus:ring-2 focus:ring-[#f5bd00]/50 md:h-[38px] md:px-7 md:text-[13px]"
              >
                Entre em contato conosco
              </button>
            </div>
          </div>
        </section>

        <button
          type="button"
          onClick={sairDoPainel}
          className="mt-[26px] h-[38px] w-[170px] rounded-[7px] bg-[#f5bd00] text-[16px] font-bold uppercase text-white shadow-[2px_3px_4px_rgba(0,0,0,0.22)] transition hover:bg-[#e5b000] focus:outline-none focus:ring-2 focus:ring-[#f5bd00]/50"
        >
          Sair
        </button>
      </div>
    </LayoutPainelAdmin>
  );
}