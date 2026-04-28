"use client";

import { useRouter } from "next/navigation";
import LayoutPainelAdmin from "../../components/LayoutPainelAdmin";

export default function PainelDoacoesAdmin() {
  const router = useRouter();

  function irParaEdicaoDasDoacoes() {
    router.push("/admin/doacoes/editar");
  }

  function sairDoPainel() {
    localStorage.removeItem("gaapo_admin_token");
    router.push("/admin");
  }

  return (
    <LayoutPainelAdmin paginaAtiva="doacoes">
      <div className="relative flex min-h-screen flex-col items-center bg-[#fff5cf] px-6 py-[24px]">
        <header className="flex flex-col items-center">
          <h1 className="text-center text-[20px] font-semibold uppercase tracking-[0.3px] text-[#252525]">
            Editar Aba
          </h1>

          <h2 className="mt-[4px] text-center text-[20px] font-medium uppercase tracking-[0.2px] text-[#252525] underline underline-offset-[5px]">
            Página de Doações
          </h2>
        </header>

        <section className="mt-[36px] flex w-full justify-center">
          <div className="relative flex min-h-[400px] w-full max-w-[676px] flex-col items-center rounded-[7px] border border-[#f5bd00] bg-white px-8 pb-8 pt-[20px] shadow-[1px_2px_3px_rgba(0,0,0,0.12)]">  
                      <h3 className="text-center text-[31px] font-bold uppercase leading-none tracking-[0.2px] text-[#f5bd00]">
            Meios para Doação
          </h3>

<div className="mt-[34px] flex flex-col items-center gap-[42px]">
  <div className="flex items-center gap-[20px]">
    <div className="grid h-[56px] w-[56px] rotate-45 grid-cols-2 gap-[6px]">
      <span className="rounded-[6px] bg-[#f5bd00]" />
      <span className="rounded-[6px] bg-[#f5bd00]" />
      <span className="rounded-[6px] bg-[#f5bd00]" />
      <span className="rounded-[6px] bg-[#f5bd00]" />
    </div>

    <div className="flex flex-col">
      <span className="text-[36px] font-bold uppercase leading-[37px] text-[#252525]">
        Chave Pix
      </span>
      <span className="mt-[5px] text-[17px] font-medium leading-none text-[#252525]">
        Doe via PIX
      </span>
    </div>
  </div>

  <div className="flex items-center gap-[20px]">
    <div className="relative h-[56px] w-[64px] text-[#f5bd00]">
      <div className="absolute left-0 top-[15px] h-[8px] w-[64px] bg-[#f5bd00]" />
      <div className="absolute left-[7px] top-[25px] h-[25px] w-[8px] bg-[#f5bd00]" />
      <div className="absolute left-[23px] top-[25px] h-[25px] w-[8px] bg-[#f5bd00]" />
      <div className="absolute left-[39px] top-[25px] h-[25px] w-[8px] bg-[#f5bd00]" />
      <div className="absolute left-[55px] top-[25px] h-[25px] w-[8px] bg-[#f5bd00]" />
      <div className="absolute bottom-0 left-0 h-[8px] w-[64px] bg-[#f5bd00]" />
      <div className="absolute left-0 top-0 h-0 w-0 border-x-[32px] border-b-[16px] border-x-transparent border-b-[#f5bd00]" />
    </div>

    <div className="flex flex-col">
      <span className="text-[36px] font-bold uppercase leading-[37px] text-[#252525]">
        Número CB
      </span>
      <span className="mt-[5px] text-[17px] font-medium leading-none text-[#252525]">
        Doe via Conta Bancária
      </span>
    </div>
  </div>
</div>
            <button
              type="button"
              onClick={irParaEdicaoDasDoacoes}
              aria-label="Editar informações de doação"
              className="absolute right-[35px] top-1/2 flex h-[42px] w-[28px] -translate-y-1/2 items-center justify-center text-[62px] font-light leading-none text-[#f5bd00] transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#f5bd00]/40"
            >
              ›
            </button>

            <div className="mt-[40px] flex flex-col items-center">
              <p className="text-center text-[15px] font-light text-[#252525]">
                Deseja fazer alguma doação e possuí dúvidas?
              </p>

              <button
                type="button"
                className="mt-[15px] h-[35px] w-[176px] rounded-[5px] bg-[#f5bd00] text-[12px] font-bold text-white shadow-[1px_2px_3px_rgba(0,0,0,0.20)] transition hover:bg-[#e5b000] focus:outline-none focus:ring-2 focus:ring-[#f5bd00]/50"
              >
                Entre em contato conosco
              </button>
            </div>
          </div>
        </section>

        <button
          type="button"
          onClick={sairDoPainel}
          className="absolute bottom-[18px] h-[37px] w-[170px] rounded-[7px] bg-[#f5bd00] text-[16px] font-bold uppercase text-white shadow-[2px_3px_4px_rgba(0,0,0,0.22)] transition hover:bg-[#e5b000] focus:outline-none focus:ring-2 focus:ring-[#f5bd00]/50"
        >
          Sair
        </button>
      </div>
    </LayoutPainelAdmin>
  );
}