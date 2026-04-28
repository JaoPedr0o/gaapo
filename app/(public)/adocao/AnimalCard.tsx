type Animal = {
  name: string;
  species: string;
  age: string;
  temperament: string;
  image: string;
};

export default function AnimalCard({ animal }: { animal: Animal }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md">
      <img
        src={animal.image}
        alt={animal.name}
        className="w-full h-40 object-cover"
      />

      <div className="p-4">
        <h3 className="text-center font-bold">NOME DO ANIMAL</h3>

        <p className="text-sm text-gray-600 mt-2">
          Texto sobre o animal aqui...
        </p>

        <ul className="text-sm mt-2 text-gray-700">
          <li>Idade: {animal.age}</li>
          <li>Espécie: {animal.species}</li>
          <li>Temperamento: {animal.temperament}</li>
        </ul>

        <button
            className="
                mt-3 w-full text-white py-2 rounded-lg
                bg-pink-300
                hover:bg-pink-400   /* 👉 MAIS ESCURO NO HOVER */
                transition-colors duration-200
            "
            >
            Quero adotar!
            </button>
      </div>
    </div>
  );
}