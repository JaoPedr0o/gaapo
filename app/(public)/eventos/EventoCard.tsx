type Evento = {
  titulo: string;
  descricao: string;
  data: string | null;
  horario: string | null;
  local: string | null;
  image: string; 
};

export default function EventoCard({ evento }: { evento: Evento }) {
  return (
    <div>
      <div className="bg-white rounded-xl overflow-hidden border-r-4 border-b-4 border-brand-mediumPink">
        <div className="px-4 py-3">
          <h3 className="text-center font-bold">{evento.titulo ? evento.titulo : "Titulo"}</h3>
          <div className="text-sm text-black mt-1 h-30 overflow-auto">
            <p>
              {evento.descricao ? evento.descricao : "Descrição..."}
            </p>
          </div>

          <ul className="py-3 text-sm mt-2 text-gray-700">
            <li>• Data: {evento.data}</li>
            <li>• Horário: {evento.horario}</li>
            <li>• Local: {evento.local}</li>
          </ul>

          <img
            src={evento.image}
            alt={evento.titulo}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}