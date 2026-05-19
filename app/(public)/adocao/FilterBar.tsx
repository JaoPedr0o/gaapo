type Props = {
  especie: string;
  setEspecie: (value: string) => void;
};

export default function FilterBar({ especie, setEspecie }: Props) {
  return (
    <div className="items-center">
      <button className="bg-white px-4 py-2 rounded-full shadow">
        Filtrar
      </button>

      <select
        value={especie}
        onChange={(e) => setEspecie(e.target.value)}
        className="px-3 py-2 rounded-full border outline-none bg-white"
      >
        <option value="">Todos</option>
        <option value="gato">Gato</option>
        <option value="cao">Cão</option>
        <option value="outros">Outros</option>
      </select>
    </div>
  );
}
