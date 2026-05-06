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
      <div className="flex min-h-screen flex-col bg-[#d9f5fa] px-6 pt-[34px]">
        <header className="flex flex-col items-center">
          <h1 className="text-center text-[22px] font-semibold uppercase tracking-[0.4px] text-[#252525]">
            Adicionar ou Editar Abas
          </h1>

          <h2 className="mt-2 text-center text-[21px] font-medium uppercase tracking-[0.2px] text-[#252525] underline underline-offset-[6px]">
            Página de Eventos
          </h2>
        </header>

        <section className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-[720px] rounded-[14px] border border-[#52c4d7] bg-white px-8 py-8 shadow-[4px_5px_0_#52c4d7]">
            <div className="mb-7 text-center">
              <h3 className="text-[24px] font-semibold text-[#252525]">
                Gerenciar eventos
              </h3>

              <p className="mx-auto mt-2 max-w-[520px] text-[14px] font-light leading-[1.5] text-[#666]">
                Escolha uma ação para cadastrar novos eventos ou alterar as
                informações dos eventos já cadastrados na página.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
              <button
                type="button"
                onClick={irParaEditarEventos}
                className="group flex min-h-[150px] flex-col items-center justify-center rounded-[12px] border border-[#52c4d7] bg-[#f2fdff] px-5 py-5 text-center shadow-[2px_3px_6px_rgba(0,0,0,0.10)] transition hover:-translate-y-[2px] hover:bg-white hover:shadow-[3px_5px_12px_rgba(0,0,0,0.15)] focus:outline-none focus:ring-2 focus:ring-[#52c4d7]/40"
              >
                <div className="mb-4 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#52c4d7] text-white shadow-[1px_2px_4px_rgba(0,0,0,0.18)]">
                  <span className="text-[30px] leading-none">✎</span>
                </div>

                <span className="text-[18px] font-bold uppercase text-[#252525]">
                  Editar
                </span>

                <span className="mt-2 text-[12px] font-light leading-[1.4] text-[#666]">
                  Visualize, filtre, altere ou remova eventos cadastrados.
                </span>
              </button>

              <button
                type="button"
                onClick={irParaAdicionarEventos}
                className="group flex min-h-[150px] flex-col items-center justify-center rounded-[12px] border border-[#52c4d7] bg-[#f2fdff] px-5 py-5 text-center shadow-[2px_3px_6px_rgba(0,0,0,0.10)] transition hover:-translate-y-[2px] hover:bg-white hover:shadow-[3px_5px_12px_rgba(0,0,0,0.15)] focus:outline-none focus:ring-2 focus:ring-[#52c4d7]/40"
              >
                <div className="mb-4 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#52c4d7] text-white shadow-[1px_2px_4px_rgba(0,0,0,0.18)]">
                  <span className="text-[34px] leading-none">+</span>
                </div>

                <span className="text-[18px] font-bold uppercase text-[#252525]">
                  Adicionar
                </span>

                <span className="mt-2 text-[12px] font-light leading-[1.4] text-[#666]">
                  Cadastre um novo evento com imagem, data, horário e local.
                </span>
              </button>
            </div>
          </div>
        </section>

        <div className="mt-auto flex justify-center pb-[34px]">
          <button
            type="button"
            onClick={sairDoPainel}
            className="h-[38px] w-[170px] rounded-[8px] bg-[#52c4d7] text-[15px] font-bold uppercase text-white shadow-[2px_3px_6px_rgba(0,0,0,0.20)] transition hover:bg-[#40b8cc] focus:outline-none focus:ring-2 focus:ring-[#52c4d7]/50"
          >
            Sair
          </button>
        </div>
      </div>
    </LayoutPainelAdmin>
  );
}