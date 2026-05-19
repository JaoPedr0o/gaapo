"use client";

import { useEffect, useState } from "react";
import AnimalCard from "./AnimalCard";
import FilterBar from "./FilterBar";
import type { DadosAnimalAdocao } from "@/app/(private)/admin/adocao/types/animal-adocao";

export default function AdocaoPage() {
  const [animais, setAnimais] = useState<DadosAnimalAdocao[]>([]);
  const [especie, setEspecie] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarAnimais() {
      try {
        const resposta = await fetch("/api/animais");
        const conteudo = await resposta.json() as { sucesso: boolean; animais: DadosAnimalAdocao[] };
        if (conteudo.sucesso) {
          setAnimais(conteudo.animais);
        }
      } finally {
        setCarregando(false);
      }
    }

    carregarAnimais();
  }, []);

  const animaisFiltrados = animais.filter((animal) =>
    especie ? animal.especie === especie : true
  );

  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage: "url('/images/adocaoBg.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-10">
        <div className="text-center py-10 px-4 flex flex-col items-center gap-2">
          <h1
            className="text-4xl font-bold text-white rounded-full px-6 py-2"
            style={{ backgroundColor: "#5ec6d1" }}
          >
            ADOTE UM AMIGO!
          </h1>

          <p
            className="mt-4 px-6 py-2 rounded-full text-white bold"
            style={{ backgroundColor: "#5ec6d1" }}
          >
            Transforme um abrigo em um lar. Adotar é o maior gesto de gratidão que você pode viver.
          </p>
        </div>

        <div className="flex justify-end px-6">
          <FilterBar especie={especie} setEspecie={setEspecie} />
        </div>

        {carregando ? (
          <div className="flex justify-center py-20 text-white text-lg">
            Carregando animais...
          </div>
        ) : animaisFiltrados.length === 0 ? (
          <div className="flex justify-center py-20 text-white text-lg">
            Nenhum animal encontrado.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {animaisFiltrados.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
