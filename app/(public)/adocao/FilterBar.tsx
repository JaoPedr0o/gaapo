import { Icon } from "@iconify/react";

type Props = {
  especie: string;
  setEspecie: (value: string) => void;
};

export default function FilterBar({ especie, setEspecie }: Props) {
  return (
    <div className="flex items-center w-full max-w-xs sm:max-w-none sm:w-auto">
      <div className="flex items-center w-full sm:w-auto bg-white h-11 px-4 rounded-full shadow">
        
        <div className="flex items-center">
          <Icon icon="mdi:filter" width="20"></Icon>
          <p className="mr-2">Filtrar:</p>
        </div>

        <select
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          className="flex-1 h-full bg-transparent outline-none"
        >
          <option value="">Todos</option>
          <option value="cachorro">Cachorro</option>
          <option value="gato">Gato</option>
          <option value="outro">Outros</option>
        </select>

      </div>
    </div>
  );
}
