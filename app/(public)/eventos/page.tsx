import EventoCard, { type Evento } from "./EventoCard";

/** Coloque seus SVGs em public/images/ e atualize os caminhos abaixo */
const EVENTOS_HEADER_SVG = "/images/eventosHeader.svg";
const EVENTOS_BOTTOM_SVG = "/images/eventosBottom.svg";

const eventosList: Evento[] = [
  {
    id: 1,
    titulo: "Feira de Adoção no Parque",
    descricao:
      "Encontre seu novo companheiro entre dezenas de cães e gatos resgatados pela GAAPO. Nossa equipe orienta sobre adoção responsável, documentação e adaptação em casa. Haverá espaço pet-friendly, água para os animais e equipe veterinária voluntária para tirar dúvidas.",
    data: "15 de junho de 2026",
    horario: "09h às 17h",
    local: "Praça Tubal Vilela — Uberlândia, MG",
    dataPostagem: "28/04/2026",
    image:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&h=675&fit=crop",
  },
  {
    id: 2,
    titulo: "Mutirão de Castração Solidária",
    descricao: "Vagas limitadas. Inscrição pelo WhatsApp.",
    data: "28 de junho de 2026",
    horario: "08h às 14h",
    local: "Sede GAAPO — bairro Martins, Uberlândia",
    dataPostagem: "10/05/2026",
    image: "",
  },
  {
    id: 3,
    titulo: "Bazar Beneficente GAAPO",
    descricao:
      "Roupas, livros, brinquedos, artesanato e comidas caseiras com preços simbólicos. Toda a arrecadação financia ração, vermífugos e consultas dos animais sob nossos cuidados. Aceitamos doações de itens em bom estado até o dia anterior ao evento. Voluntários para montagem são bem-vindos na véspera, das 14h às 18h.",
    data: "12 de julho de 2026",
    horario: "10h às 18h",
    local: "Salão paroquial Nossa Senhora Aparecida — Centro",
    dataPostagem: "02/06/2026",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&h=675&fit=crop",
  },
  {
    id: 4,
    titulo: "Caminhada pelo Bem-Estar Animal",
    descricao:
      "Percurso leve de 3 km pelo Parque do Sabiá com pets em guia e coleira.",
    data: "2 de agosto de 2026",
    horario: "07h30",
    local: "Parque do Sabiá — portão principal, Uberlândia",
    dataPostagem: "18/06/2026",
    image: "",
  },
  {
    id: 5,
    titulo: "Oficina: Primeiros Socorros Pet",
    descricao:
      "Palestra prática gratuita sobre o que fazer em casos de intoxicação, picadas, ferimentos leves e transporte seguro até o veterinário. Vagas limitadas a 40 participantes; confirme presença pelas redes sociais da GAAPO. Material de apoio impresso será entregue no check-in.",
    data: "23 de agosto de 2026",
    horario: "14h às 16h30",
    local: "Auditório da sede GAAPO — bairro Martins",
    dataPostagem: "05/07/2026",
    image:
      "https://images.unsplash.com/photo-1576201839906-0a4b8a6e5a5b?w=1200&h=675&fit=crop",
  },
  {
    id: 6,
    titulo: "Dia do Voluntário no Abrigo",
    descricao: "Venha ajudar no abrigo por uma manhã.",
    data: "13 de setembro de 2026",
    horario: "08h às 12h",
    local: "Abrigo GAAPO — Uberlândia (endereço enviado após inscrição)",
    dataPostagem: "22/07/2026",
    image: "",
  },
  {
    id: 7,
    titulo: "Campanha de Arrecadação de Ração",
    descricao:
      "Pontos de coleta em parceiros do centro e zona norte. Lista completa de alimentos aceitos (ração úmida e seca, sachês para filhotes e ração específica para aves) disponível no site e no Instagram da GAAPO. Meta do mês: 2 toneladas para abastecer o abrigo no período de seca.",
    data: "4 de outubro de 2026",
    horario: "Dia inteiro",
    local: "Diversos pontos — Uberlândia",
    dataPostagem: "01/08/2026",
    image: "",
  },
  {
  id: 8,
  titulo: "Vacinação Comunitária para Pets",
  descricao:
    "Ação gratuita voltada para cães e gatos de famílias de baixa renda. Veterinários voluntários estarão aplicando vacinas essenciais e orientando sobre prevenção de doenças comuns, alimentação adequada e cuidados básicos de higiene.",
  data: "18 de outubro de 2026",
  horario: "08h às 15h",
  local: "Escola Municipal Machado de Assis — Uberlândia",
  dataPostagem: "12/08/2026",
  image:
    "https://images.unsplash.com/photo-1583512603806-077998240c7a?w=1200&h=675&fit=crop",
},
{
  id: 9,
  titulo: "Encontro de Socialização para Cães Resgatados",
  descricao:
    "Evento acompanhado por adestradores parceiros para auxiliar cães resgatados a desenvolver convivência saudável com pessoas e outros animais.",
  data: "7 de novembro de 2026",
  horario: "09h às 11h30",
  local: "Parque Linear do Rio Uberabinha — Uberlândia",
  dataPostagem: "20/08/2026",
  image: "",
},
{
  id: 10,
  titulo: "Palestra sobre Enriquecimento Ambiental para Gatos",
  descricao:
    "Aprenda técnicas simples para reduzir estresse, ansiedade e tédio em gatos domésticos por meio de brinquedos, arranhadores, rotina e estímulos ambientais adequados.",
  data: "21 de novembro de 2026",
  horario: "19h às 21h",
  local: "Biblioteca Municipal Juscelino Kubitschek — Uberlândia",
  dataPostagem: "02/09/2026",
  image:
    "https://images.unsplash.com/photo-1511044568932-338cba0ad803?w=1200&h=675&fit=crop",
},
{
  id: 11,
  titulo: "Treinamento Básico para Tutores de Primeira Viagem",
  descricao:
    "Workshop introdutório com orientações sobre adaptação, passeios, reforço positivo, rotina alimentar e primeiros dias após a adoção.",
  data: "5 de dezembro de 2026",
  horario: "14h às 17h",
  local: "Centro Comunitário Luizote — Uberlândia",
  dataPostagem: "15/09/2026",
  image: "",
},
{
  id: 12,
  titulo: "Natal Solidário dos Animais",
  descricao:
    "Tarde especial com arrecadação de ração, brinquedos e medicamentos para animais resgatados. Haverá apresentações, espaço para adoção responsável e atividades educativas para crianças sobre respeito e cuidado com os pets.",
  data: "20 de dezembro de 2026",
  horario: "13h às 19h",
  local: "Praça Sérgio Pacheco — Uberlândia",
  dataPostagem: "28/10/2026",
  image:
    "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=1200&h=675&fit=crop",
},
{
  id: 13,
  titulo: "Mutirão de Banho e Cuidados para Animais de Rua",
  descricao:
    "Voluntários irão realizar limpeza básica, escovação e aplicação de antipulgas em animais resgatados temporariamente.",
  data: "16 de janeiro de 2027",
  horario: "08h às 13h",
  local: "Abrigo Temporário Esperança Animal — Uberlândia",
  dataPostagem: "05/11/2026",
  image: "",
},
{
  id: 14,
  titulo: "Cinema Pet Friendly Beneficente",
  descricao:
    "Sessão especial ao ar livre com arrecadação destinada ao tratamento veterinário de animais abandonados. Leve sua cadeira, seu pet e participe de uma noite solidária.",
  data: "30 de janeiro de 2027",
  horario: "19h30",
  local: "Praça Clarimundo Carneiro — Uberlândia",
  dataPostagem: "18/11/2026",
  image:
    "https://images.unsplash.com/photo-1516934024742-b461fba47600?w=1200&h=675&fit=crop",
},
{
  id: 15,
  titulo: "Oficina Infantil: Como Cuidar dos Animais",
  descricao:
    "Atividade educativa voltada para crianças com jogos, desenhos e orientações sobre guarda responsável e respeito aos animais.",
  data: "13 de fevereiro de 2027",
  horario: "10h às 12h",
  local: "Centro Cultural de Uberlândia",
  dataPostagem: "02/12/2026",
  image: "",
},
];

export default function PaginaEventos() {
  return (
    <div
      className="relative overflow-x-hidden"
      style={{
        backgroundImage: "url('/images/Eventos.png')",
      }}
    >
      <div className="z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pb-16 sm:pb-24">
        <header className="py-4 sm:py-5 flex justify-center px-2 sm:px-4">
          <div className="w-full max-w-5xl">
            <div className="md:hidden rounded-xl bg-brand-pink px-4 py-3 shadow-md">
              <p className="text-center text-white text-sm font-bold leading-snug">
                Fique por dentro do que a associação faz e planeja.
                Sua participação é fundamental para os nossos resgatados!
              </p>
            </div>
            <div
              className="
                hidden md:flex
                relative
                w-full
                min-h-36.5
                items-center justify-center
                bg-center bg-no-repeat
                bg-size-[100%_100%]
              "
              style={{
                backgroundImage: `url('${EVENTOS_HEADER_SVG}')`,
              }}
            >
              <div className="px-14 py-10">
                <p className="text-center text-white text-xl leading-relaxed font-bold max-w-4xl">
                  Fique por dentro do que a associação faz e planeja.
                  Sua participação é fundamental para os nossos resgatados!
                </p>
              </div>
            </div>
          </div>
        </header>

        <section
          className="flex flex-col gap-8 sm:gap-10 md:gap-5 mt-2 sm:mt-0"
          aria-label="Lista de eventos"
        >
          {eventosList.map((evento) => (
            <EventoCard key={evento.id} evento={evento} />
          ))}
        </section>
      </div>

      {/* Transição para o footer — rola com a página, fica logo acima do rodapé */}
      <div aria-hidden className="relative pt-8 sm:pt-15">
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
