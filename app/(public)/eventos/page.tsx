import EventoCard, { type Evento } from "./EventoCard";

/** Coloque seus SVGs em public/images/ e atualize os caminhos abaixo */
const EVENTOS_HEADER_SVG = "/images/eventosHeader.svg";
const EVENTOS_BOTTOM_SVG = "/images/eventosBottom.svg";

const eventosList: Evento[] = [
  {
    id: 1,
    titulo: "Feira de Adoção",
    descricao:
      "Venha conhecer nossos resgatados e encontrar um novo amigo. Teremos orientação sobre adoção responsável, veterinários voluntários e um coffee break para os visitantes.",
    data: "15 de junho de 2026",
    horario: "09h às 17h",
    local: "Praça Central — Uberlândia, MG",
    dataPostagem: "12/05/2026",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ft.ctcdn.com.br%2FlndE2SN9gxIECEAV3blQ_hKwEE8%3D%2F1400x788%2Fsmart%2Fi2147.jpeg&f=1&nofb=1&ipt=5939a3e312231b861fdd3b8c5293fe607f9fecf214a61089972ddb94dda39747",
  },

  {
    id: 2,
    titulo: "Mutirão de Castração",
    descricao:
      "Ação solidária com vagas limitadas para castração de cães e gatos. Inscrições pelo WhatsApp da associação. Traga o animal em jejum conforme orientação da equipe.",
    data: "28 de junho de 2026",
    horario: "08h às 14h",
    local: "Sede GAAPO — bairro Martins",
    dataPostagem: "20/05/2026",
    image: "",
  },

  {
    id: 3,
    titulo: "Bazar Beneficente",
    descricao:
      "Roupas, livros, artesanato e lanches com preços acessíveis. Toda a renda reverte para ração, medicamentos e cuidados dos animais do abrigo.",
    data: "12 de julho de 2026",
    horario: "10h às 18h",
    local: "Salão paroquial — centro",
    dataPostagem: "02/06/2026",
    image: "",
  },

  {
    id: 4,
    titulo: "Caminhada pelo Bem-Estar Animal",
    descricao:
      "Percurso leve de 3 km com pets em guia. Distribuição de kits de higiene e cartilha sobre tenência responsável. Inscrição gratuita no local.",
    data: "2 de agosto de 2026",
    horario: "07h30",
    local: "Parque do Sabiá — ponto de encontro no portão principal",
    dataPostagem: "18/06/2026",
    image: "",
  },
];

export default function PaginaEventos() {
  return (
    <div
      className="relative"
      style={{
        backgroundImage: "url('/images/Eventos.png')",
        backgroundSize: "cover",
      }}
    >
      <div className="z-10 max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        <header className="py-5 flex justify-center px-4">
          <div
            className="
              relative
              w-full max-w-5xl
              min-h-25 md:min-h-36.5
              flex items-center justify-center
              bg-center bg-no-repeat
            "
            style={{
              backgroundImage: `url('${EVENTOS_HEADER_SVG}')`,
              backgroundSize: "100% 100%",
            }}
          >
            <div className="px-8 py-6 md:px-14 md:py-10">
              <p className="relative text-center text-white text-base md:text-xl leading-relaxed font-bold max-w-4xl">
                Fique por dentro do que a associação faz e planeja.
                Sua participação é fundamental para os nossos resgatados!
              </p>
            </div>
          </div>
        </header>

        <section
          className="flex flex-col gap-12 md:gap-5"
          aria-label="Lista de eventos"
        >
          {eventosList.map((evento) => (
            <EventoCard key={evento.id} evento={evento} />
          ))}
        </section>
      </div>

      {/* Transição para o footer — rola com a página, fica logo acima do rodapé */}
      <div aria-hidden className="relative pt-15">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={EVENTOS_BOTTOM_SVG}
          alt=""
          className="block w-full h-auto"
        />
      </div>
    </div>
  );
}
