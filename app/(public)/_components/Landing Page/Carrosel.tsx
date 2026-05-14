"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

export interface Animal {
  id: number | string;
  nome: string;
  descricao: string;
  idade: string;
  sexo: string;
  temperamento: string;
  imagemUrl: string;
}

const animais: Animal[] = [
  {
    id: 1,
    nome: "Luna",
    descricao: "Cachorra doce e brincalhona, adora correr e receber carinho.",
    idade: "2 anos",
    sexo: "Fêmea",
    temperamento: "Calma e amigável",
    imagemUrl: "https://www.pedigree.com.br/sites/g/files/fnmzdf2401/files/2024-09/conheca-as-racas-de-cachorros-mais-inteligentes-do-mundo-04_0.jpg",
  },
  {
    id: 2,
    nome: "Rapadura",
    descricao: "Gato calmo e carinhoso, procura uma família afetuosa.",
    idade: "3 anos",
    sexo: "Macho",
    temperamento: "Calmo e leal",
    imagemUrl: "https://s2-g1.glbimg.com/UcJQPEPszBSmzyGU_p3m3XWMXVc=/0x0:2627x2627/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2024/d/u/VrCnBtShKMBGKQXV4iQg/img-0114.jpg",
  },
  {
    id: 3,
    nome: "Toddy",
    descricao: "Cachorro brincalhão e agitado, adora brincar com bola e receber carinho.",
    idade: "1 ano",
    sexo: "Macho",
    temperamento: "Afetuoso e brincalhão",
    imagemUrl: "https://www.petz.com.br/blog/wp-content/uploads/2020/07/raca-de-cachorro-muito-popular-no-brasil-3.jpg",
  },
  {
    id: 4,
    nome: "Mia",
    descricao: "Gata tranquila, adora uma boa soneca ao sol.",
    idade: "3 anos",
    sexo: "Fêmea",
    temperamento: "Afetuosa e tímida",
    imagemUrl: "https://www.diariodocentrodomundo.com.br/wp-content/uploads/2025/10/gettyimages-1443769180.jpg",
  },
  {
    id: 5,
    nome: "Churrasco",
    descricao: "Gato incapetado, adora caçar briga e miar no telhado.",
    idade: "34 ano",
    sexo: "Macho",
    temperamento: "Doido e barulhento",
    imagemUrl: "https://thumbs.dreamstime.com/b/gato-louco-1370695.jpg",
  },
  {
    id: 6,
    nome: "Pompom",
    descricao: "Cachorra tranquila, adora uma boa soneca e brincar.",
    idade: "1 ano",
    sexo: "Fêmea",
    temperamento: "Afetuosa e tímida",
    imagemUrl: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_640/https://adimax.com.br/wp-content/uploads/2022/05/cuidados-filhote-de-cachorro.jpg",
  },
];

export default function Carrossel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const onInit = useCallback(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onInit();
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onInit, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  return (
    <section className="bg-[#DDF2F4] py-10 md:py-14 lg:py-20 flex flex-col items-center w-full overflow-hidden">

      {/* Header */}
      <div className="flex flex-col items-center px-4 mb-8 md:mb-10 lg:mb-14 text-center">
        <div className="bg-[#5BC5D6] text-white px-6 py-3 md:px-12 md:py-4 lg:px-16 lg:py-5 rounded-[2rem] shadow-sm -rotate-1 mb-4">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-wide">
            ADOTE UM AMIGO!
          </h2>
        </div>
        <div className="bg-[#6BCEDD] text-white px-5 py-2 md:px-8 md:py-2.5 lg:px-10 lg:py-3 rounded-full shadow-sm max-w-2xl">
          <p className="text-xs md:text-sm lg:text-base font-medium">
            Transforme um abrigo em um lar. Adotar é o maior gesto de gratidão que você pode viver.
          </p>
        </div>
      </div>

      {/* Carousel */}
      <div className="w-full max-w-[1400px] mx-auto ">
        <div className="overflow-hidden pl-3 lg:pl-0" ref={emblaRef}>
          <div className=" select-none flex gap-3 md:gap-4 lg:gap-6 px-3 md:px-4 lg:px-0 pb-4 pr-4 ">
            {animais.map((animal) => (
              <div
                key={animal.id}
                className="
                  flex-[0_0_72%]
                  sm:flex-[0_0_55%]
                  md:flex-[0_0_42%]
                  lg:flex-[0_0_31%]
                  xl:flex-[0_0_27%]
                "
              >
                <div className="relative h-full ">

                  {/* Sombra 3D rosa */}
                  <div className="absolute inset-0 bg-[#FFB0C5] rounded-[20px] translate-x-2.5 translate-y-2.5 lg:rounded-[24px] lg:translate-x-3 lg:translate-y-3"></div>

                  {/* Card */}
                  <div className="relative bg-white rounded-[20px] lg:rounded-[24px] p-3 md:p-4 lg:p-5 flex flex-col h-full border border-gray-100">

                    {/* Imagem */}
                    <div className="w-full aspect-[4/3] rounded-[12px] lg:rounded-[16px] overflow-hidden bg-gray-200 mb-3 md:mb-4 lg:mb-5 flex-shrink-0">
                      <img
                        src={animal.imagemUrl}
                        alt={`Foto de ${animal.nome}`}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col flex-1">
                      <h3 className="text-center font-extrabold text-base md:text-lg lg:text-xl text-black mb-2 lg:mb-3">
                        {animal.nome}
                      </h3>

                      <p className="text-center text-[10px] md:text-[11px] text-gray-500 leading-relaxed mb-3 md:mb-4 lg:mb-5 px-1 md:px-2 line-clamp-4">
                        {animal.descricao}
                      </p>

                      <ul className="text-[10px] md:text-xs text-gray-600 mb-4 md:mb-5 lg:mb-6 space-y-1.5 md:space-y-2 ml-3 md:ml-4">
                        <li className="flex items-center gap-1.5 md:gap-2">
                          <span className="w-1 h-1 bg-gray-600 rounded-full flex-shrink-0"></span>
                          <strong>Idade:</strong> {animal.idade}
                        </li>
                        <li className="flex items-center gap-1.5 md:gap-2">
                          <span className="w-1 h-1 bg-gray-600 rounded-full flex-shrink-0"></span>
                          <strong>Sexo:</strong> {animal.sexo}
                        </li>
                        <li className="flex items-center gap-1.5 md:gap-2">
                          <span className="w-1 h-1 bg-gray-600 rounded-full flex-shrink-0"></span>
                          <strong>Temperamento:</strong> {animal.temperamento}
                        </li>
                      </ul>

                      <div className="mt-auto flex justify-center">
                        <button className="bg-[#FFB0C5] text-white font-bold py-2 md:py-2.5 px-6 md:px-8 rounded-full text-xs md:text-sm hover:opacity-90 transition w-[85%]">
                          Quero adotar!
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dots dinâmicos */}
      <div className="flex gap-3 justify-center items-center mt-5 md:mt-6">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-3 h-3 md:w-3.5 md:h-3.5 rounded-full transition-all ${
              index === selectedIndex
                ? "bg-[#B569BE] scale-110"
                : "bg-gray-400 opacity-40"
            }`}
          />
        ))}
      </div>

      {/* Botão Ver mais */}
      <div className="mt-8 md:mt-10">
        <Link
          href="/adocao"
          className="inline-block bg-[#B569BE] text-white font-bold py-3 md:py-3.5 px-10 md:px-12 rounded-full shadow-md hover:brightness-110 transition-all hover:scale-105 text-sm md:text-base"
        >
          Ver mais
        </Link>
      </div>
    </section>
  );
}