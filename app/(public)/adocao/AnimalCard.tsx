"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import type { DadosAnimalAdocao } from "@/app/(private)/admin/adocao/types/animal-adocao";

function placeholderPorEspecie(especie: string) {
  switch (especie.toLowerCase()) {
    case "cachorro":
      return "/images/placeholderDog.png";
    case "gato":
      return "/images/placeholderCat.png";
    default:
      return "/images/placeholderOutros.png";
  }
}

export default function AnimalCard({ animal }: { animal: DadosAnimalAdocao }) {
  const imageUrl = animal.imagemUrl?.trim() ?? "";
  const placeholder = placeholderPorEspecie(animal.especie);
  const [falhaNaFoto, setFalhaNaFoto] = useState(false);

  useEffect(() => {
    setFalhaNaFoto(false);
  }, [imageUrl, animal.id]);

  const usarPlaceholder = !imageUrl || falhaNaFoto;

  return (
    <div className="h-full">
      <div
        className="
          bg-white rounded-xl overflow-hidden
          border-r-4 border-b-4 border-brand-darkPink
          h-full flex flex-col
        "
      >
        <div className="relative h-48 w-full sm:h-56 md:h-60 shrink-0">
          {usarPlaceholder ? (
            <Image
              src={placeholder}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={animal.nome}
              className="h-full w-full object-cover"
              onError={() => setFalhaNaFoto(true)}
            />
          )}
        </div>

        <div className="p-3 sm:p-4 flex flex-col flex-1">
          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl md:text-3xl text-center font-bold">
              {animal.nome}
            </h3>

            <div className="text-sm sm:text-base md:text-lg text-black mt-2 min-h-16 sm:min-h-20 md:min-h-[100px]">
              <p>{animal.descricao}</p>
            </div>

            <ul className="text-sm sm:text-base md:text-lg mt-3 sm:mt-4 text-gray-700">
              <li>• Idade: {animal.idade}</li>
              <li>• Espécie: {animal.especie}</li>
              <li>• Temperamento: {animal.temperamento}</li>
            </ul>
          </div>

          <button
            className="
              mt-4 sm:mt-6 w-full text-white py-2 rounded-lg
              text-sm sm:text-base
              bg-brand-darkPink
              hover:bg-brand-lightPink
              transition-colors duration-200
            "
          >
            Quero adotar!
          </button>
        </div>
      </div>
    </div>
  );
}
