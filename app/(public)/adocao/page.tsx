"use client";

import { useEffect, useState } from "react";

import AnimalCard from "./AnimalCard";
import FilterBar from "./FilterBar";
import type { DadosAnimalAdocao } from "@/app/(private)/admin/adocao/types/animal-adocao";
import { listarAnimaisPublicos } from "@/lib/servicos-publicos";

const ADOCAO_BOTTOM_SVG = "/images/adocaoBottomVector.svg";
const ADOCAO_HEADER_SVG = "/images/adocaoHeader1.svg";
const ADOCAO_HEADER2_SVG = "/images/adocaoHeader2.svg";

export default function AdocaoPage() {
  const [animais, setAnimais] = useState<DadosAnimalAdocao[]>([]);
  const [especie, setEspecie] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        setAnimais(await listarAnimaisPublicos());
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  const animaisFiltrados = animais.filter((animal) => {
    if (!especie) return true;
    const especieAnimal = animal.especie.toLowerCase();
    if (especie === "outro") {
      return especieAnimal !== "cachorro" && especieAnimal !== "gato";
    }
    return especieAnimal === especie;
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
        <div className="text-center pt-6 sm:pt-10 px-4 sm:px-6 flex flex-col items-center gap-1 sm:gap-2">
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

        <div className="flex justify-center sm:justify-end px-4 sm:px-8 md:px-12 lg:px-20 mt-4 sm:mt-0 w-full">
          <FilterBar especie={especie} setEspecie={setEspecie} />
        </div>

        {carregando ? (
          <div className="flex justify-center py-16 text-white text-lg font-medium">
            Carregando animais...
          </div>
        ) : animaisFiltrados.length === 0 ? (
          <div className="flex justify-center py-16 text-white text-lg font-medium px-4 text-center">
            Nenhum animal disponível para adoção no momento.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 p-4 sm:p-6 pb-12 sm:pb-15 px-4 sm:px-8 md:px-0 w-full">
            {animaisFiltrados.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        )}
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
