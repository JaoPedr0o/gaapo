const CONTAS_HEADER_SVG = "/images/contasHeader.svg";

const relatorios = [
  {
    id: 1,
    titulo: "RELATÓRIO MENSAL",
    arquivo: "PDF RELATÓRIO",
  },
  {
    id: 2,
    titulo: "PRESTAÇÃO DE CONTAS",
    arquivo: "PDF FINANCEIRO",
  },
  {
    id: 3,
    titulo: "BALANÇO ANUAL",
    arquivo: "PDF BALANÇO",
  },
];

export default function PaginaTransparencia() {
  return (
    <main
      className="relative min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/images/Contas.png')`,
      }}
    >
      {/* CONTEÚDO */}
      <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 pt-6 sm:pt-8 pb-24 sm:pb-40 w-full max-w-5xl mx-auto">

        {/* HEADER */}
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

        {/* CARROSSEL MOCK */}
        <div className="relative mt-8 sm:mt-12 flex items-center justify-center w-full px-10 sm:px-14 md:px-0 max-w-4xl">

          {/* CARD */}
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
              {/* TÍTULO */}
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
                {relatorios[0].titulo}
              </h1>

              {/* BOTÃO PDF */}
              <button
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
                {/* ÍCONE PDF */}
                <div className="shrink-0 scale-90 sm:scale-100">
                  <img src="/images/pdfIcon.svg" alt="pdf" />
                </div>

                <span className="text-base sm:text-xl md:text-4xl font-medium text-brand-dark text-center leading-tight">
                  {relatorios[0].arquivo}
                </span>
              </button>
            </div>
          </section>

          {/* SETA ESQUERDA */}
          <button
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

          {/* SETA DIREITA */}
          <button
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
        </div>
      </div>
    </main>
  );
}

