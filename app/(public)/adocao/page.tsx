"use client";

import { useState } from "react";

import AnimalCard from "./AnimalCard";
import FilterBar from "./FilterBar";

const EVENTOS_BOTTOM_SVG = "/images/adocaoBottomVector.svg";
const EVENTOS_HEADER_SVG = "/images/adocaoHeader1.svg";
const EVENTOS_HEADER2_SVG = "/images/adocaoHeader2.svg";

const animals = [
  { id: 1, name: "Luna", species: "cachorro", age: "2 anos", temperament: "Calmo", image: "https://conexaoplaneta.com.br/wp-content/uploads/2016/12/curiosidade-animal-conexao-planeta-panda-vermelho-mathias-appel.jpg" },
  { id: 2, name: "Mingau", species: "gato", age: "1 ano", temperament: "Brincalhão", image: "https://conexaoplaneta.com.br/wp-content/uploads/2016/12/curiosidade-animal-conexao-planeta-panda-vermelho-mathias-appel.jpg" },
  { id: 3, name: "Thor", species: "cachorro", age: "4 anos", temperament: "Protetor", image: "https://conexaoplaneta.com.br/wp-content/uploads/2016/12/curiosidade-animal-conexao-planeta-panda-vermelho-mathias-appel.jpg" },
  { id: 4, name: "Nina", species: "gato", age: "3 anos", temperament: "Carinhosa", image: "https://conexaoplaneta.com.br/wp-content/uploads/2016/12/curiosidade-animal-conexao-planeta-panda-vermelho-mathias-appel.jpg" },
  { id: 5, name: "Luna", species: "cachorro", age: "2 anos", temperament: "Calmo", image: "https://conexaoplaneta.com.br/wp-content/uploads/2016/12/curiosidade-animal-conexao-planeta-panda-vermelho-mathias-appel.jpg" },
  { id: 6, name: "Mingau", species: "gato", age: "1 ano", temperament: "Brincalhão", image: "https://conexaoplaneta.com.br/wp-content/uploads/2016/12/curiosidade-animal-conexao-planeta-panda-vermelho-mathias-appel.jpg" },
  { id: 7, name: "Thor", species: "cachorro", age: "4 anos", temperament: "Protetor", image: "https://conexaoplaneta.com.br/wp-content/uploads/2016/12/curiosidade-animal-conexao-planeta-panda-vermelho-mathias-appel.jpg" },
  { id: 8, name: "Nina", species: "gato", age: "3 anos", temperament: "Carinhosa", image: "https://conexaoplaneta.com.br/wp-content/uploads/2016/12/curiosidade-animal-conexao-planeta-panda-vermelho-mathias-appel.jpg" },
  { id: 9, name: "Luna", species: "cachorro", age: "2 anos", temperament: "Calmo", image: "https://conexaoplaneta.com.br/wp-content/uploads/2016/12/curiosidade-animal-conexao-planeta-panda-vermelho-mathias-appel.jpg" },
  { id: 10, name: "Mingau", species: "gato", age: "1 ano", temperament: "Brincalhão", image: "https://conexaoplaneta.com.br/wp-content/uploads/2016/12/curiosidade-animal-conexao-planeta-panda-vermelho-mathias-appel.jpg" },
  { id: 11, name: "Thor", species: "cachorro", age: "4 anos", temperament: "Protetor", image: "https://conexaoplaneta.com.br/wp-content/uploads/2016/12/curiosidade-animal-conexao-planeta-panda-vermelho-mathias-appel.jpg" },
  { id: 12, name: "Nina", species: "gato", age: "3 anos", temperament: "Carinhosa", image: "https://conexaoplaneta.com.br/wp-content/uploads/2016/12/curiosidade-animal-conexao-planeta-panda-vermelho-mathias-appel.jpg" },
  { id: 13, name: "Luna", species: "cachorro", age: "2 anos", temperament: "Calmo", image: "https://conexaoplaneta.com.br/wp-content/uploads/2016/12/curiosidade-animal-conexao-planeta-panda-vermelho-mathias-appel.jpg" },
  { id: 14, name: "Mingau", species: "gato", age: "1 ano", temperament: "Brincalhão", image: "https://conexaoplaneta.com.br/wp-content/uploads/2016/12/curiosidade-animal-conexao-planeta-panda-vermelho-mathias-appel.jpg" },
  { id: 15, name: "Thor", species: "cachorro", age: "4 anos", temperament: "Protetor", image: "https://conexaoplaneta.com.br/wp-content/uploads/2016/12/curiosidade-animal-conexao-planeta-panda-vermelho-mathias-appel.jpg" },
  { id: 16, name: "Nina", species: "gato", age: "3 anos", temperament: "Carinhosa", image: "https://conexaoplaneta.com.br/wp-content/uploads/2016/12/curiosidade-animal-conexao-planeta-panda-vermelho-mathias-appel.jpg" },
  
];

export default function Home() {
 const [species, setSpecies] = useState("");

  const filteredAnimals = animals.filter((animal) =>
  species ? animal.species === species : true
);

  return (
    <main
      className="relative min-h-screen"
      style={{
        backgroundImage: "url('/images/Adocao.png')",
        backgroundSize: "100%",
      }}
    >
      <div className="relative z-10">
      
        {/* HEADER */}
        <div className="text-center pt-10 px-4 flex flex-col items-center gap-2">
          {/* TITLE */}
          <div
            className="
              relative
              w-full max-w-2xl
              min-h-30
              flex items-center justify-center
              bg-center bg-no-repeat
            "
            style={{
              backgroundImage: `url('${EVENTOS_HEADER_SVG}')`,
              backgroundSize: "100% 100%",
            }}
          >
            <div className="px-8 md:px-14">
              <h1 className="text-2xl md:text-6xl font-semibold text-white">
                ADOTE UM AMIGO!
              </h1>
            </div>
          </div>

          {/* SUBTITLE */}
          <div
            className="
              relative
              w-full max-w-4xl
              min-h-25
              flex items-center justify-center
              bg-center bg-no-repeat
              -mt-4
            "
            style={{
              backgroundImage: `url('${EVENTOS_HEADER2_SVG}')`,
              backgroundSize: "100% 100%",
            }}
          >
            <div className="px-8 md:px-14">
              <p className="text-sm md:text-lg font-medium text-white text-center">
                Transforme um abrigo em um lar. Adotar é o maior gesto de gratidão
                que você pode viver.
              </p>
            </div>
          </div>

        </div>

        {/* FILTRO */}
        <div className="flex justify-end px-20">
          <FilterBar species={species} setSpecies={setSpecies} />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 grid-cols-2 md:grid-cols-4 gap-6 p-6 pb-15 px-20">
          {filteredAnimals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
      </div>

      <div aria-hidden className="absolute bottom-0 left-0 w-full z-0 pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          
          src={EVENTOS_BOTTOM_SVG}
          alt=""
          className="block w-full h-auto"
        />
      </div>
    </main>
  );
}