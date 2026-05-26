"use client";

import { useState } from "react";

import AnimalCard from "./AnimalCard";
import FilterBar from "./FilterBar";
import type { DadosAnimalAdocao } from "@/app/(private)/admin/adocao/types/animal-adocao";

export default function AdocaoPage() {
  const [animais, setAnimais] = useState<DadosAnimalAdocao[]>([]);
  const [especie, setEspecie] = useState("");
  const [carregando, setCarregando] = useState(true);

const ADOCAO_BOTTOM_SVG = "/images/adocaoBottomVector.svg";
const ADOCAO_HEADER_SVG = "/images/adocaoHeader1.svg";
const ADOCAO_HEADER2_SVG = "/images/adocaoHeader2.svg";

const animals = [

  //mock data
  {
    id: 1,
    name: "Luna",
    species: "cachorro",
    age: "2 anos",
    temperament: "Calma e carinhosa",
    description:
      "Vira-lata amarela, castrada e vacinada. Adora sonecas ao sol.",
    image:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=600&fit=crop",
  },
  {
    id: 2,
    name: "Mingau",
    species: "gato",
    age: "1 ano",
    temperament: "Brincalhão",
    description:
      "Gato malhado encontrado na chuva. Convive bem com outros gatos e busca um lar com bastante carinho e alguns brinquedos para gastar energia.",
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=600&fit=crop",
  },
  {
    id: 3,
    name: "Thor",
    species: "cachorro",
    age: "4 anos",
    temperament: "Protetor e leal",
    description:
      "Porte médio, já habituado a coleira. Thor foi resgatado em situação de maus-tratos e, após meses de reabilitação com nossa equipe, hoje demonstra confiança com a família, obedece comandos básicos e precisa de tutores pacientes que respeitem seu ritmo de adaptação em um lar definitivo.",
    image:
      "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=600&h=600&fit=crop",
  },
  {
    id: 4,
    name: "Nina",
    species: "gato",
    age: "3 anos",
    temperament: "Tímida, mas afetuosa",
    description: "Prefere ambientes tranquilos.",
    image:
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&h=600&fit=crop",
  },
  {
    id: 5,
    name: "Bob",
    species: "cachorro",
    age: "6 meses",
    temperament: "Energético",
    description:
      "Filhote curioso que adora correr no quintal. Ideal para famílias ativas dispostas a continuar o treinamento de socialização e passeios diários.",
    image: "",
  },
  {
    id: 6,
    name: "Mel",
    species: "gato",
    age: "5 anos",
    temperament: "Independente",
    description:
      "Gata senior de pelagem laranja. Gosta de observar pela janela e receber carinho no horário dela.",
    image:
      "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=600&h=600&fit=crop",
  },
  {
    id: 7,
    name: "Kiwi",
    species: "ave",
    age: "2 anos",
    temperament: "Cantante e sociável",
    description:
      "Periquito-verde saudável, habituado à gaiola ampla. Acompanha com sementes, poleiros e manual de cuidados.",
    image:
      "https://images.unsplash.com/photo-1452576550-9ed0d2f42f6b?w=600&h=600&fit=crop",
  },
  {
    id: 8,
    name: "Fred",
    species: "reptil",
    age: "3 anos",
    temperament: "Calmo",
    description:
      "Jabuti-resgatado com documentação orientativa. Recomendado para tutores que já conhecem manejo de répteis ou estão dispostos a seguir nosso guia de terrário, alimentação e consultas veterinárias especializadas.",
    image:
      "https://images.unsplash.com/photo-1559251606-1e0e6c8e04e2?w=600&h=600&fit=crop",
  },
  {
    id: 9,
    name: "Pipoca",
    species: "ave",
    age: "8 meses",
    temperament: "Curiosa",
    description: "Calopsita jovem.",
    image:
      "https://images.unsplash.com/photo-1552728086-57bdde30beb3?w=600&h=600&fit=crop",
  },
  {
    id: 10,
    name: "Ziggy",
    species: "reptil",
    age: "1 ano",
    temperament: "Observador",
    description:
      "Pequeno lagarto resgatado de cativeiro irregular. Exige terrário aquecido e dieta específica.",
    image:
      "https://images.unsplash.com/photo-1459267809-b62111ac4f98?w=600&h=600&fit=crop",
  },
  {
    id: 11,
    name: "Amendoim",
    species: "roedor",
    age: "10 meses",
    temperament: "Dócil",
    description:
      "Hamster sírio dourado, manso ao manuseio. Inclui gaiola, bebedouro e rodinha.",
    image:
      "https://images.unsplash.com/photo-1425089661559-9ae86e2e8f1c?w=600&h=600&fit=crop",
  },
  {
    id: 12,
    name: "Rex",
    species: "cachorro",
    age: "3 anos",
    temperament: "Dócil com crianças",
    description:
      "Cão de porte médio, vacinas em dia. Ótimo companheiro para passeios no parque.",
    image:
      "https://images.unsplash.com/photo-1530281700549-e82e7ffc10ca?w=600&h=600&fit=crop",
  },
  {
    id: 13,
    name: "Loro",
    species: "ave",
    age: "6 anos",
    temperament: "Falador",
    description:
      "Papagaio resgatado que imita sons e palavras simples. Precisa de viveiro espaçoso, estímulo mental diário e tutores comprometidos com uma espécie de longa vida e alta demanda de atenção.",
    image:
      "https://images.unsplash.com/photo-1559495846-d4a503ab6616?w=600&h=600&fit=crop",
  },
  {
    id: 14,
    name: "Cascavel",
    species: "reptil",
    age: "4 anos",
    temperament: "Tranquila",
    description: "Cobra-do-milho em manejo assistido.",
    image:
      "https://images.unsplash.com/photo-1534567114481-021754a0e08c?w=600&h=600&fit=crop",
  },
  {
  id: 15,
  name: "Aurora",
  species: "gato",
  age: "2 anos",
  temperament: "Curiosa e tranquila",
  description:
    "Gata de olhos verdes que adora observar movimentos pela janela e dormir em cobertores macios.",
  image: "",
},
{
  id: 16,
  name: "Tobias",
  species: "cachorro",
  age: "5 anos",
  temperament: "Companheiro",
  description:
    "SRD de porte grande, acostumado com passeios longos e convivência com crianças.",
  image:
    "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=600&h=600&fit=crop",
},
{
  id: 17,
  name: "Safira",
  species: "ave",
  age: "1 ano",
  temperament: "Agitada",
  description:
    "Canário muito ativo que canta durante boa parte do dia. Ideal para ambientes iluminados e tranquilos.",
  image: "",
},
{
  id: 18,
  name: "Odin",
  species: "cachorro",
  age: "7 anos",
  temperament: "Calmo e leal",
  description:
    "Foi resgatado já adulto e levou tempo para confiar novamente em humanos. Hoje é extremamente dócil, gosta de ficar perto das pessoas e aprecia rotinas tranquilas com caminhadas leves e muito descanso.",
  image:
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=600&fit=crop",
},
{
  id: 19,
  name: "Pingo",
  species: "roedor",
  age: "4 meses",
  temperament: "Brincalhão",
  description: "Porquinho-da-índia sociável que gosta de petiscos naturais.",
  image: "",
},
{
  id: 20,
  name: "Lili",
  species: "coelho",
  age: "3 anos",
  temperament: "Dócil",
  description:
    "Coelha branca acostumada a viver solta em ambientes supervisionados. Gosta de carinho e folhas frescas.",
  image:
    "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&h=600&fit=crop",
},
{
  id: 21,
  name: "Bento",
  species: "gato",
  age: "8 meses",
  temperament: "Arteiro",
  description:
    "Filhote cheio de energia que transforma qualquer caixa de papelão em brinquedo.",
  image: "",
},
{
  id: 22,
  name: "Jade",
  species: "reptil",
  age: "2 anos",
  temperament: "Observadora",
  description:
    "Iguana jovem habituada ao contato humano. Necessita iluminação UV adequada, controle de temperatura e alimentação rica em vegetais frescos para manter uma vida saudável em cativeiro responsável.",
  image:
    "https://images.unsplash.com/photo-1549480017-d76466a4b7e8?w=600&h=600&fit=crop",
},
{
  id: 23,
  name: "Cookie",
  species: "cachorro",
  age: "1 ano",
  temperament: "Extrovertido",
  description:
    "Adora brincar com bolas e correr atrás de qualquer coisa que se mova.",
  image: "",
},
{
  id: 24,
  name: "Maya",
  species: "gato",
  age: "6 anos",
  temperament: "Carinhosa",
  description:
    "Gata rajada extremamente apegada a humanos. Procura colo sempre que possível e prefere ambientes silenciosos sem muitos estímulos.",
  image:
    "https://images.unsplash.com/photo-1511044568932-338cba0ad803?w=600&h=600&fit=crop",
},
{
  id: 25,
  name: "Nico",
  species: "ave",
  age: "4 anos",
  temperament: "Sociável",
  description:
    "Calopsita acostumada com interação diária e sons ambientes da casa.",
  image: "",
},
{
  id: 26,
  name: "Teca",
  species: "coelho",
  age: "1 ano",
  temperament: "Tímida",
  description:
    "Coelha marrom de orelhas caídas que leva algum tempo para ganhar confiança, mas depois gosta de ficar próxima e receber carinho delicado.",
  image:
    "https://images.unsplash.com/photo-1535241749838-299277b6305f?w=600&h=600&fit=crop",
},
{
  id: 27,
  name: "Marley",
  species: "cachorro",
  age: "9 anos",
  temperament: "Gentil",
  description:
    "Cão idoso muito tranquilo, ideal para quem busca um companheiro sereno. Já está acostumado com ambientes internos, dorme bastante e aprecia apenas pequenas caminhadas durante o dia.",
  image: "",
},
{
  id: 28,
  name: "Sol",
  species: "gato",
  age: "2 anos",
  temperament: "Afetuosa",
  description: "Adora dormir perto das pessoas e receber carinho na barriga.",
  image:
    "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=600&h=600&fit=crop",
},
{
  id: 29,
  name: "Kira",
  species: "reptil",
  age: "5 anos",
  temperament: "Reservada",
  description:
    "Gecko-leopardo saudável e habituado ao manejo básico. Necessita terrário climatizado e alimentação específica com suplementação correta.",
  image: "",
},
{
  id: 30,
  name: "Paçoca",
  species: "roedor",
  age: "1 ano",
  temperament: "Mansa",
  description:
    "Hamster anão muito tranquila, acostumada ao contato cuidadoso e rotina noturna.",
  image:
    "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&h=600&fit=crop",
},
{
  id: 31,
  name: "Apolo",
  species: "cachorro",
  age: "3 anos",
  temperament: "Leal e brincalhão",
  description:
    "Cão de porte médio que adora correr atrás de bolinhas e acompanhar a família em passeios ao ar livre.",
  image:
    "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600&h=600&fit=crop",
},
{
  id: 32,
  name: "Estrela",
  species: "gato",
  age: "4 anos",
  temperament: "Calma",
  description:
    "Gata de pelagem cinza que prefere ambientes tranquilos e longas sonecas perto da janela.",
  image:
    "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=600&h=600&fit=crop",
},
{
  id: 33,
  name: "Pietra",
  species: "coelho",
  age: "2 anos",
  temperament: "Curiosa",
  description:
    "Coelha branca muito ativa, gosta de explorar espaços seguros e brincar com túneis de tecido.",
  image:
    "https://images.unsplash.com/photo-1583301286816-f4f05e1e8b25?w=600&h=600&fit=crop",
},
{
  id: 34,
  name: "Bolt",
  species: "cachorro",
  age: "1 ano",
  temperament: "Energético",
  description:
    "Filhote cheio de energia, ideal para famílias que gostam de atividades e brincadeiras constantes.",
  image:
    "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&h=600&fit=crop",
},
{
  id: 35,
  name: "Cacau",
  species: "ave",
  age: "3 anos",
  temperament: "Cantante",
  description:
    "Canário dócil que gosta de ambientes iluminados e canta principalmente pela manhã.",
  image:
    "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600&h=600&fit=crop",
},
{
  id: 36,
  name: "Yuki",
  species: "gato",
  age: "7 meses",
  temperament: "Arteira",
  description:
    "Filhote curiosa que transforma qualquer objeto em brinquedo e adora companhia humana.",
  image:
    "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&h=600&fit=crop",
},
{
  id: 37,
  name: "Trovão",
  species: "cavalo",
  age: "8 anos",
  temperament: "Manso",
  description:
    "Cavalo acostumado ao contato humano e passeios leves em áreas rurais supervisionadas.",
  image:
    "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=600&h=600&fit=crop",
},
{
  id: 38,
  name: "Luma",
  species: "cachorro",
  age: "5 anos",
  temperament: "Protetora",
  description:
    "Muito observadora e companheira, gosta de ficar próxima da família e se adapta bem a quintais amplos.",
  image:
    "https://images.unsplash.com/photo-1525253086316-d0c936c814f8?w=600&h=600&fit=crop",
},
{
  id: 39,
  name: "Nemo",
  species: "peixe",
  age: "1 ano",
  temperament: "Tranquilo",
  description:
    "Peixe-palhaço saudável, acostumado com aquários comunitários e alimentação balanceada.",
  image:
    "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=600&h=600&fit=crop",
},
{
  id: 40,
  name: "Oliva",
  species: "gato",
  age: "2 anos",
  temperament: "Afetuosa",
  description:
    "Gata preta de olhos amarelos que gosta de colo e costuma seguir os tutores pela casa.",
  image:
    "https://images.unsplash.com/photo-1494256997604-768d1f608cac?w=600&h=600&fit=crop",
}
];

    carregarAnimais();
  }, []);

  const filteredAnimals = animals.filter((animal) => {
    if (!species) return true;
    if (species === "outro") {
      return animal.species !== "cachorro" && animal.species !== "gato";
    }
    return animal.species === species;
  });

  return (
    <main
      className="relative min-h-screen overflow-x-hidden bg-cover bg-top bg-no-repeat md:bg-size-[100%_auto] md:bg-top"
      style={{
        backgroundImage: "url('/images/Adocao.png')",
        backgroundRepeat: "repeat",
      }}
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center pt-6 sm:pt-10 px-4 sm:px-6 flex flex-col items-center gap-1 sm:gap-2">
          {/* TITULO */}
          <div
            className="
              relative
              w-full max-w-2xl
              min-h-20 sm:min-h-30
              flex items-center justify-center
              bg-center bg-no-repeat
            "
            style={{
              backgroundImage: `url('${ADOCAO_HEADER_SVG}')`,
              backgroundSize: "100% 100%",
            }}
          >
            <div className="px-4 sm:px-8 md:px-14">
              <h1 className="text-xl sm:text-2xl md:text-6xl font-semibold text-white leading-tight">
                ADOTE UM AMIGO!
              </h1>
            </div>
          </div>

          {/* LEGENDA*/}
          <div className="w-full max-w-4xl -mt-1 md:-mt-4">
            <div className="md:hidden rounded-xl bg-brand-darkBlue px-4 py-3 shadow-md">
              <p className="text-xs font-medium text-white text-center leading-snug">
                Transforme um abrigo em um lar. Adotar é o maior gesto de gratidão
                que você pode viver.
              </p>
            </div>
            <div
              className="
                hidden md:flex
                relative
                w-full
                min-h-25
                items-center justify-center
                bg-center bg-no-repeat
                bg-size-[100%_100%]
              "
              style={{
                backgroundImage: `url('${ADOCAO_HEADER2_SVG}')`,
              }}
            >
              <div className="px-8 md:px-14">
                <p className="text-sm md:text-lg font-medium text-white text-center leading-normal">
                  Transforme um abrigo em um lar. Adotar é o maior gesto de gratidão
                  que você pode viver.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* FILTRO */}
        <div className="flex justify-center sm:justify-end px-4 sm:px-8 md:px-12 lg:px-20 mt-4 sm:mt-0 w-full">
          <FilterBar species={species} setSpecies={setSpecies} />
        </div>

        {/* Grid de animais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 p-4 sm:p-6 pb-12 sm:pb-15 px-4 sm:px-8 md:px-0 w-full">
          {filteredAnimals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
      </div>

      <div aria-hidden className="absolute bottom-0 left-0 w-full z-0 pointer-events-none">
        <img
          src={ADOCAO_BOTTOM_SVG}
          alt=""
          className="block w-full h-auto"
        />
      </div>
    </main>
  );
}
