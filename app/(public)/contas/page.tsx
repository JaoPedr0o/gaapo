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
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage: `url('/Images/Contas.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* CONTEÚDO */}
      <div className="relative z-10 flex flex-col items-center px-4 pt-8 pb-40">

        {/* HEADER */}
        <div
          className="
            relative
            w-full max-w-4xl
            min-h-27.5 md:min-h-32.5
            flex items-center justify-center
            bg-center bg-no-repeat
          "
          style={{
            backgroundImage: `url('/Images/contasHeader.svg')`,
            backgroundSize: "100% 100%",
          }}
        >
          <div className="px-8 py-5 md:px-14 md:py-8">
            <p
              className={`
                mt-5
                text-white
                text-center
                text-base md:text-2xl
                font-semibold
                leading-relaxed
              `}
            >
              Acompanhe a transparência financeira da associação e veja como sua contribuição ajuda a transformar a vida dos nossos animais.
            </p>
          </div>
        </div>

        {/* CARROSSEL MOCK */}
        <div className="relative mt-12 flex items-center justify-center w-full">

          

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
              px-6 py-10
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
                  text-3xl md:text-6xl
                  font-bold
                  uppercase
                `}
              >
                {relatorios[0].titulo}
              </h1>

              {/* BOTÃO PDF */}
              <button
                className={`
                  mt-12
                  flex items-center justify-center gap-5
                  w-full max-w-xl
                  rounded-xl
                  border-2
                  border-brand-yellow
                  bg-white
                  px-6 py-5
                  transition-transform duration-200
                  hover:scale-[1.02]
                `}
              >
                {/* ÍCONE PDF */}
                <div>
                  <img src="/images/pdfIcon.svg" alt="pdf" />
                </div>

                <span className="text-xl md:text-4xl font-medium text-brand-dark">
                  {relatorios[0].arquivo}
                </span>
              </button>
            </div>
          </section>

          {/* SETA ESQUERDA */}
          <button
            className="
              absolute left-0 md:left-20
              z-20
              flex items-center justify-center
              w-10 h-10 md:w-14 md:h-14
              rounded-full
              bg-white/80
              hover:bg-white
              text-brand-purple
              shadow-md
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
                absolute right-0 md:right-20
                z-20
                flex items-center justify-center
                w-10 h-10 md:w-14 md:h-14
                rounded-full
                bg-white/80
                hover:bg-white
                text-brand-purple
                shadow-md
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

