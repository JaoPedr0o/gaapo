import type { DadosAnimalAdocao } from "@/app/(private)/admin/adocao/types/animal-adocao";

export default function AnimalCard({ animal }: { animal: DadosAnimalAdocao }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md">
      {animal.imagemUrl ? (
        <img
          src={animal.imagemUrl}
          alt={animal.nome}
          className="w-full h-40 object-cover"
        />
      ) : (
        <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
          Sem imagem
        </div>
      )}

      <div className="p-4">
        <h3 className="text-center font-bold">{animal.nome}</h3>

        <p className="text-sm text-gray-600 mt-2 line-clamp-3">{animal.descricao}</p>

        <ul className="text-sm mt-2 text-gray-700">
          <li>Idade: {animal.idade}</li>
          <li>Espécie: {animal.especie}</li>
          <li>Temperamento: {animal.temperamento}</li>
        </ul>

        <button
          className="mt-3 w-full text-white py-2 rounded-lg bg-pink-300 hover:bg-pink-400 transition-colors duration-200"
        >
          Quero adotar!
        </button>
      </div>
    </div>
  );
}
