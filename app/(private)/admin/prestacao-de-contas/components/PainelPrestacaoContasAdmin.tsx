"use client";

import { useRouter } from "next/navigation";
import LayoutPainelAdmin from "../../components/LayoutPainelAdmin";

export default function PainelPrestacaoContasAdmin() {
  const router = useRouter();

  function irParaAdicionarRelatorioMensal() {
    router.push("/admin/prestacao-de-contas/adicionar");
  }

  function sairDoPainel() {
    localStorage.removeItem("gaapo_admin_token");
    router.push("/admin");
  }

  return (
    <LayoutPainelAdmin paginaAtiva="prestacao-contas">
      <div className="relative flex min-h-screen flex-col items-center bg-[#fceefd] px-6 py-[28px]">
        <header className="flex flex-col items-center">
          <h1 className="text-center text-[20px] font-semibold uppercase tracking-[0.3px] text-[#252525]">
            Adicionar Aba
          </h1>

          <h2 className="mt-[4px] max-w-[330px] text-center text-[20px] font-medium uppercase leading-[1.3] tracking-[0.2px] text-[#252525] underline underline-offset-[5px]">
            Página de Prestação de Contas
          </h2>
        </header>

        <section className="mt-[105px] flex w-full justify-center">
          <div className="relative flex min-h-[164px] w-full max-w-[676px] flex-col items-center justify-center rounded-[7px] border border-[#b75fc1] bg-white px-8 py-8 shadow-[1px_2px_3px_rgba(0,0,0,0.16)]">
            <h3 className="text-center text-[33px] font-bold uppercase leading-none tracking-[0.4px] text-[#b75fc1]">
              Relatório Mensal
            </h3>

            <div className="mt-[28px] flex h-[47px] w-full max-w-[296px] items-center rounded-[7px] border-2 border-[#f5bd00] bg-white px-[10px]">
              <div className="relative mr-[44px] h-[29px] w-[24px] text-[#b75fc1]">
                <div className="absolute left-0 top-0 h-[29px] w-[22px] rounded-[1px] border-2 border-[#b75fc1]" />
                <div className="absolute right-0 top-0 h-0 w-0 border-l-[8px] border-t-[8px] border-l-transparent border-t-[#b75fc1]" />
                <div className="absolute left-[5px] top-[9px] h-[2px] w-[10px] bg-[#b75fc1]" />
                <div className="absolute left-[5px] top-[15px] h-[2px] w-[12px] bg-[#b75fc1]" />
                <div className="absolute left-[5px] top-[21px] h-[2px] w-[12px] bg-[#b75fc1]" />
              </div>

              <span className="text-[19px] font-medium uppercase tracking-[0.1px] text-[#252525]">
                PDF Relatório
              </span>
            </div>

            <button
              type="button"
              onClick={irParaAdicionarRelatorioMensal}
              aria-label="Adicionar relatório mensal"
              className="absolute right-[40px] top-1/2 flex h-[48px] w-[32px] -translate-y-1/2 items-center justify-center text-[66px] font-light leading-none text-[#b75fc1] transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#b75fc1]/40"
            >
              ›
            </button>
          </div>
        </section>

        <button
          type="button"
          onClick={sairDoPainel}
          className="absolute bottom-[18px] h-[37px] w-[170px] rounded-[7px] bg-[#b75fc1] text-[16px] font-bold uppercase text-white shadow-[2px_3px_4px_rgba(0,0,0,0.22)] transition hover:bg-[#a94fb4] focus:outline-none focus:ring-2 focus:ring-[#b75fc1]/50"
        >
          Sair
        </button>
      </div>
    </LayoutPainelAdmin>
  );
}