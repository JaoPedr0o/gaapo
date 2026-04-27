"use client";

import { useRouter } from "next/navigation";
import LayoutPainelAdmin from "../../components/LayoutPainelAdmin";

export default function PainelAdocaoAdmin() {
  const router = useRouter();

  function irParaEditarAdocao() {
    router.push("/admin/adocao/editar");
  }

  function irParaAdicionarAdocao() {
    router.push("/admin/adocao/adicionar");
  }

  function sairDoPainel() {
    localStorage.removeItem("gaapo_admin_token");
    router.push("/admin");
  }

  return (
    <LayoutPainelAdmin paginaAtiva="adocao">
      <div className="relative flex min-h-screen flex-col items-center px-6 py-9">
        <header className="flex flex-col items-center">
          <h1 className="text-center text-[21px] font-semibold uppercase tracking-[0.4px] text-[#252525]">
            Adicionar ou Editar Abas
          </h1>

          <h2 className="mt-1 text-center text-[21px] font-medium uppercase tracking-[0.2px] text-[#252525] underline underline-offset-[5px]">
            Página de Adoção
          </h2>
        </header>

        <section className="mt-[156px] flex w-full justify-center">
          <div className="flex min-h-[119px] w-full max-w-[496px] flex-col items-center rounded-[8px] border border-[#f4a1bd] bg-white px-[30px] pb-[24px] pt-[11px] shadow-[2px_3px_4px_rgba(0,0,0,0.18)]">
            <h3 className="text-center text-[21px] font-medium text-[#252525]">
              Selecione a opção desejada
            </h3>

            <div className="mt-[20px] grid w-full grid-cols-2 gap-[68px] max-sm:grid-cols-1 max-sm:gap-4">
              <button
                type="button"
                onClick={irParaEditarAdocao}
                className="h-[39px] rounded-[8px] bg-[#f8a2bd] text-[16px] font-bold uppercase text-white shadow-[2px_3px_4px_rgba(0,0,0,0.20)] transition hover:bg-[#f58dac] focus:outline-none focus:ring-2 focus:ring-[#f8a2bd]/50"
              >
                Editar
              </button>

              <button
                type="button"
                onClick={irParaAdicionarAdocao}
                className="h-[39px] rounded-[8px] bg-[#f8a2bd] text-[16px] font-bold uppercase text-white shadow-[2px_3px_4px_rgba(0,0,0,0.20)] transition hover:bg-[#f58dac] focus:outline-none focus:ring-2 focus:ring-[#f8a2bd]/50"
              >
                Adicionar
              </button>
            </div>
          </div>
        </section>

        <button
          type="button"
          onClick={sairDoPainel}
          className="absolute bottom-[38px] h-[39px] w-[181px] rounded-[8px] bg-[#f8a2bd] text-[16px] font-bold uppercase text-white shadow-[2px_3px_4px_rgba(0,0,0,0.22)] transition hover:bg-[#f58dac] focus:outline-none focus:ring-2 focus:ring-[#f8a2bd]/50"
        >
          Sair
        </button>
      </div>
    </LayoutPainelAdmin>
  );
}