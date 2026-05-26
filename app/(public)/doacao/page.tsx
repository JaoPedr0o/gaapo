"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import type { DadosDoacoesAdmin } from "@/app/(private)/admin/doacoes/types/doacoes-admin";
import { obterConfiguracaoDoacoes } from "@/lib/servicos-publicos";

const DOACAO_HEADER_SVG = "/images/doacoesHeader.svg";
const PIX_ICON = "/images/pixIcon.svg";
const BANK_ICON = "/images/bankIcon.svg";

export default function PaginaDoacao() {
  const [config, setConfig] = useState<DadosDoacoesAdmin | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        setConfig(await obterConfiguracaoDoacoes());
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  const chavePix = config?.chavePix ?? "Em breve";
  const contaBancaria = config?.numeroContaBancaria ?? "Em breve";
  const textoInformativo =
    config?.textoInformativo ??
    "Qualquer valor pode salvar vidas. Contribua com o que puder e nos ajude a continuar protegendo os animais.";

  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage: `url('/images/doacoes.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 pt-6 sm:pt-8 pb-24 sm:pb-32 w-full max-w-5xl mx-auto">
        <div className="w-full max-w-3xl">
          <div className="md:hidden rounded-xl bg-brand-darkPurple px-4 py-3 shadow-md">
            <p className="text-center text-xs font-medium text-white leading-relaxed">
              {textoInformativo}
            </p>
          </div>
          <div
            className="
              hidden md:flex
              relative
              w-full
              min-h-30
              items-center justify-center
              bg-center bg-no-repeat
              bg-size-[100%_100%]
            "
            style={{
              backgroundImage: `url('${DOACAO_HEADER_SVG}')`,
            }}
          >
            <div className="mt-2 px-10 py-5">
              <p className="text-center text-xl font-medium text-white leading-relaxed">
                {textoInformativo}
              </p>
            </div>
          </div>
        </div>

        <section
          className={`
            bg-white
            relative
            mt-6 sm:mt-8
            w-full max-w-4xl
            rounded-2xl
            border-r-[6px]
            border-b-[6px]
            border-brand-darkPurple
            px-4 py-8
            sm:px-6 sm:py-10
            md:px-16 md:py-14
            shadow-lg
          `}
        >
          <h1
            className={`
              text-brand-yellow
              text-center
              text-2xl sm:text-3xl md:text-6xl
              font-bold
            `}
          >
            MEIOS PARA DOAÇÃO
          </h1>

          {carregando ? (
            <p className="mt-10 text-center text-gray-500">Carregando...</p>
          ) : (
            <div className="mt-8 sm:mt-10 flex flex-col items-center gap-8 sm:gap-10 w-full">
              <div className="flex flex-col items-center text-center w-full max-w-md">
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                  <Image
                    src={PIX_ICON}
                    alt="Ícone PIX"
                    width={42}
                    height={42}
                    className="shrink-0"
                  />
                  <div>
                    <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-brand-dark">
                      CHAVE PIX
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-gray-500">
                      Doe via PIX
                    </p>
                  </div>
                </div>
                <div
                  className="
                    mt-4
                    w-full max-w-full
                    rounded-full
                    bg-gray-100
                    px-4 py-3
                    sm:px-5
                    text-xs sm:text-sm md:text-lg
                    font-medium
                    text-gray-700
                    break-all
                  "
                >
                  {chavePix}
                </div>
              </div>

              <div className="flex flex-col items-center text-center w-full max-w-md">
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                  <Image
                    src={BANK_ICON}
                    alt="Ícone Banco"
                    width={42}
                    height={42}
                    className="shrink-0"
                  />
                  <div>
                    <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-brand-dark">
                      NÚMERO CB
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-gray-500">
                      Doe via Conta Bancária
                    </p>
                  </div>
                </div>
                <div
                  className="
                    mt-4
                    w-full max-w-full
                    rounded-full
                    bg-gray-100
                    px-4 py-3
                    sm:px-5
                    text-xs sm:text-sm md:text-lg
                    font-medium
                    text-gray-700
                    break-all
                    text-center
                  "
                >
                  {contaBancaria}
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 sm:mt-10 flex flex-col items-center w-full px-2">
            <p className="text-center text-sm sm:text-base md:text-xl text-brand-dark">
              Deseja fazer alguma doação e possui dúvidas?
            </p>
            <Link
              href="/contato"
              className={`
                bg-brand-yellow
                hover:bg-brand-lightYellow
                mt-4 sm:mt-5
                w-full sm:w-auto
                rounded-lg
                px-6 py-3
                sm:px-8
                text-sm md:text-base
                font-bold
                text-white
                transition-colors duration-200
                text-center
              `}
            >
              Entre em contato conosco
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
