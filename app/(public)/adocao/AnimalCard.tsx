type Animal = {
  name: string;
  species: string;
  age: string;
  temperament: string;
  image: string;
};

export default function AnimalCard({ animal }: { animal: Animal }) {
  return (
  <div className="h-full">
    <div
      className="
        bg-white rounded-xl overflow-hidden
        border-r-4 border-b-4 border-brand-darkPink
        h-full flex flex-col
      "
    >
      <img
        src={animal.image}
        alt={animal.name}
        className="w-full h-60 object-cover"
      />

      <div className="p-4 flex flex-col flex-1">
        
        <div className="flex-1">
          <h3 className="text-3xl text-center font-bold">
            {animal.name}
          </h3>

          <div className="text-lg text-black mt-2 min-h-[100px]">
            <p>
              Texto sobre o animal aqui...
            </p>
          </div>

          <ul className="text-lg mt-4 text-gray-700">
            <li>• Idade: {animal.age}</li>
            <li>• Espécie: {animal.species}</li>
            <li>• Temperamento: {animal.temperament}</li>
          </ul>
        </div>

        <button
          className="
            mt-6 w-full text-white py-2 rounded-lg
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