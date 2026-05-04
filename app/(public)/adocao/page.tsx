"use client";

import { useState } from "react";

import AnimalCard from "./AnimalCard";
import FilterBar from "./FilterBar";

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
        backgroundImage: "url('/images/adocaoBg.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
      }}
    >
      <div className="z-10">
      
        {/* HEADER */}
        <div className="text-center py-10 px-4 flex flex-col items-center gap-2 ">
          <div>
            <h1 className="bg-[url('/images/adocaoHeader1.svg')] bg-no-repeat bg-center bg-size-[350px_100px] text-4xl font-bold text-white px-6 py-2">
              ADOTE UM AMIGO!
            </h1>
          </div>

          <p
            className="mt-4 px-6 py-2 rounded-full text-white bold"
            style={{ backgroundColor: "#5ec6d1" }}
          >
            Transforme um abrigo em um lar. Adotar é o maior gesto de gratidão que você pode viver.
          </p>
        </div>

        {/* FILTRO */}
        <div className="flex justify-end px-20">
          <FilterBar species={species} setSpecies={setSpecies} />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 px-20">
          {filteredAnimals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
      </div>
    </main>
  );
}