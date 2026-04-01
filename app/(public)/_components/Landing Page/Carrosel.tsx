"use client";

import { useRef, useState, UIEvent } from "react";
import Link from "next/link";

// 1. Criamos o "molde" (Interface) do que é um Animal
export interface Animal {
  id: number | string;
  nome: string;
  descricao: string;
  idade: string;
  sexo: string;
  temperamento: string;
  imagemUrl: string;
}

// 2. Dizemos que o Carrossel vai receber uma propriedade chamada "animais"
interface CarrosselProps {
  animais: Animal[];
}

const animais: Animal[] = [
  {
    id: 1,
    nome: "Luna",
    descricao: "Cachorra doce e brincalhona, adora correr e receber carinho.",
    idade: "2 anos",
    sexo: "Fêmea",
    temperamento: "Calma e amigável",
    imagemUrl: "/img/luna.jpg"
  },
  {
    id: 2,
    nome: "Toby",
    descricao: "Cão ativo e carinhoso, procura uma família com espaço.",
    idade: "3 anos",
    sexo: "Macho",
    temperamento: "Brincalhão e leal",
    imagemUrl: "/img/toby.jpg"
  },
  {
    id: 3,
    nome: "Toddy",
    descricao: "Gata tranquila, adora uma boa soneca ao sol.",
    idade: "1 ano",
    sexo: "Fêmea",
    temperamento: "Afetuosa e tímida",
    imagemUrl: "/img/mia.jpg"
  },
 {
    id: 4,
    nome: "Mia",
    descricao: "Gata tranquila, adora uma boa soneca ao sol.",
    idade: "1 ano",
    sexo: "Fêmea",
    temperamento: "Afetuosa e tímida",
    imagemUrl: "/img/mia.jpg"
  },
    {
    id: 5,
    nome: "Churrasco",
    descricao: "Gata tranquila, adora uma boa soneca ao sol.",
    idade: "1 ano",
    sexo: "Fêmea",
    temperamento: "Afetuosa e tímida",
    imagemUrl: "/img/mia.jpg"
  },

];

export default function Carrossel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalDots = 3;

  // Se não houver animais, não renderiza nada (ou pode colocar uma mensagem "Nenhum animal disponível")
  if (!animais || animais.length === 0) return null;

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget;
    const scrollPercent = scrollLeft / (scrollWidth - clientWidth);
    const newIndex = Math.round(scrollPercent * (totalDots - 1));
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const scrollToDot = (index: number) => {
    if (!carouselRef.current) return;
    const { scrollWidth, clientWidth } = carouselRef.current;
    const targetScroll = (scrollWidth - clientWidth) * (index / (totalDots - 1));
    carouselRef.current.scrollTo({ left: targetScroll, behavior: "smooth" });
    setActiveIndex(index);
  };

  return (
    <section className="bg-[#DDF2F4] py-16 flex flex-col items-center w-full overflow-hidden font-sans">
      

      {/* Cabeçalho */}
      <div className="flex flex-col items-center px-4 mb-12 w-full text-center">
        <div className="bg-[#5BC5D6] text-white px-8 py-4 md:px-16 md:py-5 rounded-[2rem] shadow-sm transform rotate-[-1deg] mb-4">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-wide">
            ADOTE UM AMIGO!
          </h2>
        </div>
        <div className="bg-[#6BCEDD] text-white px-6 py-2 md:px-10 md:py-3 rounded-full shadow-sm max-w-2xl">
          <p className="text-sm md:text-base font-medium">
            Transforme um abrigo em um lar. Adotar é o maior gesto de gratidão que você pode viver.
          </p>
        </div>
      </div>


      {/* Container do Carrossel */}
      <div className="w-full max-w-[1200px] relative px-4 lg:px-0">
        <div 
          ref={carouselRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-12 pt-4 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >


          {/* 3. Agora fazemos o map na lista de animais que veio via PROPS */}
          {animais.map((animal) => (
            <div 
              key={animal.id} 
              className="relative shrink-0 snap-center w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              <div className="absolute inset-0 bg-[#FFB0C5] rounded-[24px] transform translate-x-3 translate-y-3 z-0"></div>
              
              <div className="relative bg-white rounded-[24px] p-5 flex flex-col h-full z-10 border border-gray-100">
                
                <div className="relative w-full aspect-[4/3] rounded-[16px] overflow-hidden bg-gray-200 mb-5">
                  <img
                    src={animal.imagemUrl}
                    alt={`Foto de ${animal.nome}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col flex-1">
                  <h3 className="text-center font-extrabold text-xl text-black mb-3">
                    {animal.nome}
                  </h3>
                  <p className="text-center text-[11px] text-gray-500 leading-relaxed mb-5 px-2 line-clamp-4">
                    {animal.descricao}
                  </p>

                  <ul className="text-xs text-gray-600 mb-6 space-y-2 ml-4">
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-gray-600 rounded-full"></span> 
                      <strong>Idade:</strong> {animal.idade}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-gray-600 rounded-full"></span> 
                      <strong>Sexo:</strong> {animal.sexo}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-gray-600 rounded-full"></span> 
                      <strong>Temperamento:</strong> {animal.temperamento}
                    </li>
                  </ul>

                  <div className="mt-auto flex justify-center pb-2">
                    <button className="bg-[#FFB0C5] text-white font-bold py-2.5 px-8 rounded-full text-sm hover:opacity-90 transition-opacity w-[85%] shadow-sm">
                      Quero adotar!
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>



      {/* Indicadores do Carrossel (Bolinhas) */}
      {animais.length > 3 && (
        <div className="flex gap-3 justify-center items-center mt-2">
          {Array.from({ length: totalDots }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToDot(index)}
              className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                activeIndex === index 
                  ? "bg-[#B569BE] scale-110" 
                  : "bg-gray-400 opacity-40 hover:opacity-70"
              }`}
              aria-label={`Página ${index + 1}`}
            />
          ))}
        </div>
      )}



      {/* Botão Ver Mais */}
      <div className="mt-10">
        <Link 
          href="/animais" 
          className="inline-block bg-[#B569BE] text-white font-bold py-3.5 px-12 rounded-full shadow-md hover:brightness-110 transition-all transform hover:scale-105"
        >
          Ver mais
        </Link>
      </div>

    </section>
  );
}