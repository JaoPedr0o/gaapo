import Image from "next/image";

export type Evento = {
  id: number;
  titulo: string;
  descricao: string;
  data: string | null;
  horario: string | null;
  local: string | null;
  dataPostagem: string;
  image?: string;
};

function formatarDetalhe(valor?: string | null) {
  return valor?.trim() ? valor : "A definir";
}

export default function EventoCard({ evento }: { evento: Evento }) {
  return (
    <article
      className="
        relative
        overflow-hidden
        rounded-3xl
        bg-white
        shadow-lg
        border-r-[6px]
        border-b-[6px]
        border-brand-pink
      "
    >
      {/* DATA DE POSTAGEM */}
      <span
        className="
          absolute top-5 right-5 z-20
          rounded-full
          bg-black/5
          px-3 py-1
          text-xs md:text-sm
          font-medium
          text-gray-600
          backdrop-blur-sm
        "
      >
        {evento.dataPostagem}
      </span>

      {/* CONTEÚDO */}
      <div className="px-8 py-8 md:px-10 md:py-10">
        <h2
          className="
            text-center
            text-2xl md:text-4xl
            font-bold
            uppercase
            tracking-wide
            text-brand-darkBlue
          "
        >
          {evento.titulo}
        </h2>

        <p
          className="
            mt-6
            text-base md:text-xl
            leading-relaxed
            text-gray-600
          "
        >
          {evento.descricao}
        </p>

        <ul
          className="
            mt-8
            space-y-2
            text-base md:text-xl
            text-gray-700
          "
        >
          <li>• Data: {formatarDetalhe(evento.data)}</li>
          <li>• Horário: {formatarDetalhe(evento.horario)}</li>
          <li>• Local: {formatarDetalhe(evento.local)}</li>
        </ul>
      </div>

      {/* IMAGEM */}
      {evento.image ? (
        <div className="relative w-full h-80 md:h-[28rem]">
          <Image
            src={evento.image}
            alt={`Foto do evento ${evento.titulo}`}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div>
        </div>
      )}
    </article>
  );
}