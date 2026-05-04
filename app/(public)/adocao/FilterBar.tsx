import { Icon } from "@iconify/react";

type Props = {
  species: string;
  setSpecies: (value: string) => void;
};

export default function FilterBar({ species, setSpecies }: Props) {
  return (
    <div className="flex items-center">
      <div className="flex items-center bg-white h-11 px-4 rounded-full shadow">
        
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
          <option value="gato">Gatos</option>
          <option value="cachorro">Cachorros</option>
        </select>

      </div>
    </div>
  );
}