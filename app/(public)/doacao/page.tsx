import Image from "next/image";

//svgs
const DOACAO_HEADER_SVG = "/images/doacoesHeader.svg";
const PIX_ICON = "/images/pixIcon.svg";
const BANK_ICON = "/images/bankIcon.svg";


const PIX_KEY = "contato@gaapo.org.br";
const BANK_ACCOUNT = "237 • Ag 0001 • CC 12345-6";

export default function PaginaDoacao() {
  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage: `url('/images/doacoes.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* CONTEÚDO */}
      <div className="relative z-10 flex flex-col items-center px-4 pt-8 pb-32">

        {/* HEADER */}
        <div
          className="
            relative
            w-full max-w-3xl
            min-h-25 md:min-h-30
            flex items-center justify-center
            bg-center bg-no-repeat
          "
          style={{
            backgroundImage: `url('${DOACAO_HEADER_SVG}')`,
            backgroundSize: "100% 100%",
          }}
        >
          <div className="mt-2 px-6 py-4 md:px-10 md:py-5">
            <p className="text-center text-sm md:text-xl font-medium text-white leading-relaxed">
              Qualquer valor pode salvar vidas.
              Contribua com o que puder e nos ajude a continuar
              protegendo os animais.
            </p>
          </div>
        </div>

        {/* CARD PRINCIPAL */}
        <section
          className={`
            bg-white
            relative
            mt-8
            w-full max-w-4xl
            rounded-2xl
            border-r-[6px]
            border-b-[6px]
            border-brand-darkPurple
            px-6 py-10
            md:px-16 md:py-14
            shadow-lg
          `}
        >
          {/* TÍTULO */}
          <h1
            className={`
              text-brand-yellow
              text-center
              text-3xl md:text-6xl
              font-bold
            `}
          >
            MEIOS PARA DOAÇÃO
          </h1>

          {/* MÉTODOS */}
          <div className="mt-10 flex flex-col items-center gap-10">

            {/* PIX */}
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-4">
                <Image
                  src={PIX_ICON}
                  alt="Ícone PIX"
                  width={42}
                  height={42}
                />

                <div>
                  <h2 className="text-xl md:text-3xl font-bold text-brand-dark">
                    CHAVE PIX
                  </h2>

                  <p className="text-sm md:text-base text-gray-500">
                    Doe via PIX
                  </p>
                </div>
              </div>

              <div
                className="
                  mt-4
                  rounded-full
                  bg-gray-100
                  px-5 py-3
                  text-sm md:text-lg
                  font-medium
                  text-gray-700
                "
              >
                {PIX_KEY}
              </div>
            </div>

            {/* CONTA BANCÁRIA */}
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-4">
                <Image
                  src={BANK_ICON}
                  alt="Ícone Banco"
                  width={42}
                  height={42}
                />

                <div>
                  <h2 className="text-xl md:text-3xl font-bold text-brand-dark">
                    NÚMERO CB
                  </h2>

                  <p className="text-sm md:text-base text-gray-500">
                    Doe via Conta Bancária
                  </p>
                </div>
              </div>

              <div
                className="
                  mt-4
                  rounded-full
                  bg-gray-100
                  px-5 py-3
                  text-sm md:text-lg
                  font-medium
                  text-gray-700
                "
              >
                {BANK_ACCOUNT}
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="mt-10 flex flex-col items-center">
            <p className="text-center text-base md:text-xl text-brand-dark">
              Deseja fazer alguma doação e possui dúvidas?
            </p>

            <button
              className={`
                bg-brand-yellow
                hover:bg-brand-lightYellow
                mt-5
                rounded-lg
                px-8 py-3
                text-sm md:text-base
                font-bold
                text-white
                transition-colors duration-200
              `}
            >
              Entre em contato conosco
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}