"use client";

import { useRouter } from "next/navigation";
import LayoutPainelAdmin from "../../components/LayoutPainelAdmin";

export default function PainelEventosAdmin() {
  const router = useRouter();

  function irParaEditarEventos() {
    router.push("/admin/eventos/editar");
  }

  function irParaAdicionarEventos() {
    router.push("/admin/eventos/adicionar");
  }

  function sairDoPainel() {
    localStorage.removeItem("gaapo_admin_token");
    router.push("/admin");
  }

  return (
    <LayoutPainelAdmin paginaAtiva="eventos">
      <div className="relative flex min-h-screen flex-col items-center bg-[#d9f5fa] px-6 py-9">
        <header className="flex flex-col items-center">
          <h1 className="text-center text-[21px] font-semibold uppercase tracking-[0.4px] text-[#252525]">
            Adicionar ou Editar Abas
          </h1>

          <h2 className="mt-1 text-center text-[21px] font-medium uppercase tracking-[0.2px] text-[#252525] underline underline-offset-[5px]">
            Página de Eventos
          </h2>
        </header>

        <section className="mt-[150px] flex w-full justify-center">
          <div className="flex min-h-[114px] w-full max-w-[466px] flex-col items-center rounded-[8px] border border-[#55c7d8] bg-white px-[28px] pb-[23px] pt-[10px] shadow-[2px_3px_4px_rgba(0,0,0,0.18)]">
            <h3 className="text-center text-[21px] font-medium text-[#252525]">
              Selecione a opção desejada
            </h3>

            <div className="mt-[20px] grid w-full grid-cols-2 gap-[65px] max-sm:grid-cols-1 max-sm:gap-4">
              <button
                type="button"
                onClick={irParaEditarEventos}
                className="h-[37px] rounded-[7px] bg-[#52c4d7] text-[16px] font-bold uppercase text-white shadow-[2px_3px_4px_rgba(0,0,0,0.20)] transition hover:bg-[#40b8cc] focus:outline-none focus:ring-2 focus:ring-[#52c4d7]/50"
              >
                Editar
              </button>

              <button
                type="button"
                onClick={irParaAdicionarEventos}
                className="h-[37px] rounded-[7px] bg-[#52c4d7] text-[16px] font-bold uppercase text-white shadow-[2px_3px_4px_rgba(0,0,0,0.20)] transition hover:bg-[#40b8cc] focus:outline-none focus:ring-2 focus:ring-[#52c4d7]/50"
              >
                Adicionar
              </button>
            </div>
          </div>
        </section>

        <button
          type="button"
          onClick={sairDoPainel}
          className="absolute bottom-[35px] h-[37px] w-[170px] rounded-[7px] bg-[#52c4d7] text-[16px] font-bold uppercase text-white shadow-[2px_3px_4px_rgba(0,0,0,0.22)] transition hover:bg-[#40b8cc] focus:outline-none focus:ring-2 focus:ring-[#52c4d7]/50"
        >
          Sair
        </button>
      </div>
    </LayoutPainelAdmin>
  );
}