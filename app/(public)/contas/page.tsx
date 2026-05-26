"use client";

import { useEffect, useState } from "react";

import type { DadosPrestacaoContasAdmin } from "@/app/(private)/admin/prestacao-de-contas/types/prestacao-contas-admin";
import { listarPrestacoesContasPublicas } from "@/lib/servicos-publicos";

const CONTAS_HEADER_SVG = "/images/contasHeader.svg";

export default function PaginaTransparencia() {
  const [prestacoes, setPrestacoes] = useState<DadosPrestacaoContasAdmin[]>([]);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        setPrestacoes(await listarPrestacoesContasPublicas());
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  const prestacaoAtual = prestacoes[indiceAtual];
  const total = prestacoes.length;

  function anterior() {
    setIndiceAtual((i) => (i === 0 ? total - 1 : i - 1));
  }

  function proximo() {
    setIndiceAtual((i) => (i === total - 1 ? 0 : i + 1));
  }

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/images/Contas.png')`,
      }}
    >
      <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 pt-6 sm:pt-8 pb-24 sm:pb-40 w-full max-w-5xl mx-auto">
        <div className="w-full max-w-4xl">
          <div className="md:hidden rounded-xl bg-brand-darkPurple px-4 py-3 shadow-md">
            <p className="text-sm font-semibold text-white text-center leading-relaxed">
              Acompanhe a transparência financeira da associação e veja como sua contribuição ajuda a transformar a vida dos nossos animais.
            </p>
          </div>
          <div
            className="
              hidden md:flex
              relative
              w-full
              min-h-32.5
              items-center justify-center
              bg-center bg-no-repeat
              bg-size-[100%_100%]
            "
            style={{
              backgroundImage: `url('${CONTAS_HEADER_SVG}')`,
            }}
          >
            <div className="px-14 py-8">
              <p className="mt-5 text-white text-center text-2xl font-semibold leading-relaxed">
                Acompanhe a transparência financeira da associação e veja como sua contribuição ajuda a transformar a vida dos nossos animais.
              </p>
            </div>
          </div>
        </div>

        {carregando ? (
          <p className="mt-12 text-white text-lg font-medium">Carregando relatórios...</p>
        ) : total === 0 ? (
          <p className="mt-12 text-white text-lg font-medium text-center px-4">
            Nenhum relatório publicado no momento.
          </p>
        ) : (
          <div className="relative mt-8 sm:mt-12 flex items-center justify-center w-full px-10 sm:px-14 md:px-0 max-w-4xl">
            <section
              className={`
                bg-white
                relative
                w-full max-w-4xl
                rounded-2xl
                border-r-[6px]
                border-b-[6px]
                border-brand-yellow
                px-4 py-8
                sm:px-6 sm:py-10
                md:px-16 md:py-14
                shadow-lg
              `}
            >
              <div className="flex flex-col items-center">
                <h1
                  className={`
                    text-brand-darkPurple
                    text-center
                    text-2xl sm:text-3xl md:text-6xl
                    font-bold
                    uppercase
                    px-2
                  `}
                >
                  {prestacaoAtual.titulo}
                </h1>

                <p className="mt-4 text-center text-sm sm:text-base text-gray-600">
                  {prestacaoAtual.mesReferencia}/{prestacaoAtual.anoReferencia}
                </p>

                {prestacaoAtual.tipoCadastro === "pdf" && prestacaoAtual.documentoUrl ? (
                  <a
                    href={prestacaoAtual.documentoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      mt-8 sm:mt-12
                      flex items-center justify-center gap-3 sm:gap-5
                      w-full max-w-xl
                      rounded-xl
                      border-2
                      border-brand-yellow
                      bg-white
                      px-4 py-4
                      sm:px-6 sm:py-5
                      transition-transform duration-200
                      hover:scale-[1.02]
                    `}
                  >
                    <div className="shrink-0 scale-90 sm:scale-100">
                      <img src="/images/pdfIcon.svg" alt="pdf" />
                    </div>
                    <span className="text-base sm:text-xl md:text-4xl font-medium text-brand-dark text-center leading-tight">
                      {prestacaoAtual.nomeDocumento ?? "ABRIR PDF"}
                    </span>
                  </a>
                ) : (
                  <div className="mt-8 w-full max-w-xl space-y-3 text-sm sm:text-base text-gray-700">
                    <p>{prestacaoAtual.descricao}</p>
                    <p>
                      <strong>Recebido:</strong> R$ {prestacaoAtual.valorRecebido}
                    </p>
                    <p>
                      <strong>Gasto:</strong> R$ {prestacaoAtual.valorGasto}
                    </p>
                    <p>
                      <strong>Saldo:</strong> R$ {prestacaoAtual.saldoFinal}
                    </p>
                  </div>
                )}

                {total > 1 && (
                  <p className="mt-6 text-sm text-gray-400">
                    {indiceAtual + 1} de {total}
                  </p>
                )}
              </div>
            </section>

            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={anterior}
                  aria-label="Relatório anterior"
                  className="
                    absolute left-0 sm:left-2 md:left-20
                    z-20
                    flex items-center justify-center
                    w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14
                    rounded-full
                    bg-white/80
                    hover:bg-white
                    text-brand-purple
                    shadow-md
                    transition-transform duration-200
                    hover:scale-[1.1]
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 md:w-7 md:h-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={proximo}
                  aria-label="Próximo relatório"
                  className="
                    absolute right-0 sm:right-2 md:right-20
                    z-20
                    flex items-center justify-center
                    w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14
                    rounded-full
                    bg-white/80
                    hover:bg-white
                    text-brand-purple
                    shadow-md
                    transition-transform duration-200
                    hover:scale-[1.1]
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 md:w-7 md:h-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
