"use client";

import { useEffect, useState } from "react";

export type Evento = {
  id: string | number;
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
  const imageUrl = evento.image?.trim() ?? "";
  const [imagemCarregou, setImagemCarregou] = useState(Boolean(imageUrl));

  useEffect(() => {
    setImagemCarregou(Boolean(imageUrl));
  }, [imageUrl]);

  const exibirImagem = Boolean(imageUrl) && imagemCarregou;
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
          absolute top-2 right-2 z-20
          md:top-5 md:right-5
          rounded-full
          bg-black/5
          px-1.5 py-0.5
          md:px-3 md:py-1
          text-[10px] leading-tight
          md:text-sm
          font-medium
          text-gray-600
          backdrop-blur-sm
        "
      >
        {evento.dataPostagem}
      </span>

      {/* CONTEÚDO */}
      <div className="px-4 pt-10 pb-6 sm:px-6 sm:pt-8 sm:pb-8 md:px-10 md:py-10 md:pt-10">
        <h2
          className="
            text-center
            text-xl sm:text-2xl md:text-4xl
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
            mt-4 sm:mt-6
            text-sm sm:text-base md:text-xl
            leading-relaxed
            text-gray-600
          "
        >
          {evento.descricao}
        </p>

        <ul
          className="
            mt-6 sm:mt-8
            space-y-1 sm:space-y-2
            text-sm sm:text-base md:text-xl
            text-gray-700
          "
        >
          <li>• Data: {formatarDetalhe(evento.data)}</li>
          <li>• Horário: {formatarDetalhe(evento.horario)}</li>
          <li>• Local: {formatarDetalhe(evento.local)}</li>
        </ul>
      </div>

      {/* IMAGEM */}
      {exibirImagem && (
        <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-112 overflow-hidden">
          <img
            src={imageUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            onError={() => setImagemCarregou(false)}
          />
        </div>
      )}
    </article>
  );
}
