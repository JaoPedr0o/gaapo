type Props = {
  species: string;
  setSpecies: (value: string) => void;
};

export default function FilterBar({ species, setSpecies }: Props) {
  return (
    <div className="items-center">
      {/* BOTÃO (visual) */}
      <button className="bg-white px-4 py-2 rounded-full shadow">
        Filtrar
      </button>

      {/* DROPDOWN */}
      <select
        value={species}
        onChange={(e) => setSpecies(e.target.value)}
        className="px-3 py-2 rounded-full border outline-none bg-white"
      >
        <option value="">Todos</option>
        <option value="gato">Gato</option>
        <option value="cachorro">Cachorro</option>
      </select>
    </div>
  );
}