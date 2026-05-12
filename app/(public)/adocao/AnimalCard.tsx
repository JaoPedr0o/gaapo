type Animal = {
  name: string;
  species: string;
  age: string;
  temperament: string;
  image: string;
};

export default function AnimalCard({ animal }: { animal: Animal }) {
  return (
    <div>
      <div className="bg-white rounded-xl overflow-hidden border-r-4 border-b-4 border-brand-mediumPink rounded">
        <img
          src={animal.image}
          alt={animal.name}
          className="w-full h-40 object-cover"
        />

        <div className="px-4 py-3">
          <h3 className="text-center font-bold">{animal.name}</h3>
          <div className="text-sm text-black mt-1 h-30 overflow-auto">
            <p>
              Texto sobre o animal aqui...
            </p>
          </div>
          

          <ul className="text-sm mt-2 text-gray-700">
            <li>• Idade: {animal.age}</li>
            <li>• Espécie: {animal.species}</li>
            <li>• Temperamento: {animal.temperament}</li>
          </ul>

          <button
            className="
              mt-3 w-full text-white py-2 rounded-lg
              bg-brand-mediumPink
              hover:bg-brand-pink   /* COLOCAR A COR CERTA DPS */
              transition-colors duration-200"
          >
            Quero adotar!
          </button>
        </div>
      </div>
    </div>
  );
}