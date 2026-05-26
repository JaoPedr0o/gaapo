"use client";

import { useRouter } from "next/navigation";

export default function EscolhaTipoPrestacaoContas() {
  const router = useRouter();

  function irParaPdf() {
    router.push("/admin/prestacao-de-contas/adicionar-pdf");
  }

  function irParaManual() {
    router.push("/admin/prestacao-de-contas/adicionar-manual");
  }

  function cancelar() {
    router.push("/admin/prestacao-de-contas");
  }

  return (
    <main className="flex min-h-screen items-center justify-center   bg-[#fceefd] fundo-forminhas-admin px-4 py-8">
      <section className="w-full max-w-[760px] rounded-[14px] border border-[#b75fc1] bg-white px-8 py-8 shadow-[8px_8px_0_#b75fc1]">
        <div className="mb-8 text-center">
          <h1 className="text-[24px] font-bold uppercase tracking-[0.5px] text-[#252525]">
            Adicionar prestação
          </h1>

          <p className="mx-auto mt-3 max-w-[520px] text-[14px] font-light leading-[1.5] text-[#666]">
            Escolha como deseja cadastrar a prestação de contas: anexando um
            PDF pronto ou montando o relatório pelo próprio sistema.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
          <button
            type="button"
            onClick={irParaPdf}
            className="group flex min-h-[170px] flex-col items-center justify-center rounded-[12px] border border-[#b75fc1] bg-[#fdf4ff] px-5 py-5 text-center shadow-[2px_3px_6px_rgba(0,0,0,0.10)] transition hover:-translate-y-[2px] hover:bg-white hover:shadow-[3px_5px_12px_rgba(0,0,0,0.15)] focus:outline-none focus:ring-2 focus:ring-[#b75fc1]/40"
          >
            <div className="mb-4 flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#b75fc1] text-white shadow-[1px_2px_4px_rgba(0,0,0,0.18)]">
              <span className="text-[30px] leading-none">📄</span>
            </div>

            <span className="text-[18px] font-bold uppercase text-[#252525]">
              Anexar PDF
            </span>

            <span className="mt-2 text-[12px] font-light leading-[1.4] text-[#666]">
              Use essa opção quando o relatório já estiver pronto em PDF.
            </span>
          </button>

          <button
            type="button"
            onClick={irParaManual}
            className="group flex min-h-[170px] flex-col items-center justify-center rounded-[12px] border border-[#b75fc1] bg-[#fdf4ff] px-5 py-5 text-center shadow-[2px_3px_6px_rgba(0,0,0,0.10)] transition hover:-translate-y-[2px] hover:bg-white hover:shadow-[3px_5px_12px_rgba(0,0,0,0.15)] focus:outline-none focus:ring-2 focus:ring-[#b75fc1]/40"
          >
            <div className="mb-4 flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#b75fc1] text-white shadow-[1px_2px_4px_rgba(0,0,0,0.18)]">
              <span className="text-[32px] leading-none">+</span>
            </div>

            <span className="text-[18px] font-bold uppercase text-[#252525]">
              Montar pelo sistema
            </span>

            <span className="mt-2 text-[12px] font-light leading-[1.4] text-[#666]">
              Cadastre entradas e saídas. O sistema calcula e prepara o
              relatório.
            </span>
          </button>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={cancelar}
            className="h-[36px] w-[160px] rounded-[7px] bg-[#b75fc1] text-[14px] font-bold uppercase text-white shadow-[1px_2px_3px_rgba(0,0,0,0.20)] transition hover:bg-[#a94fb4] focus:outline-none focus:ring-2 focus:ring-[#b75fc1]/50"
          >
            Cancelar
          </button>
        </div>
      </section>
    </main>
  );
}