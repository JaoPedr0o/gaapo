"use client";

import { useEffect, useState } from "react";

import EventoCard from "./EventoCard";
import {
  eventoApiParaCard,
  listarEventosPublicos,
} from "@/lib/servicos-publicos";

const EVENTOS_HEADER_SVG = "/images/eventosHeader.svg";
const EVENTOS_BOTTOM_SVG = "/images/eventosBottom.svg";

export default function EventosPage() {
  const [carregando, setCarregando] = useState(true);
  const [eventos, setEventos] = useState<ReturnType<typeof eventoApiParaCard>[]>(
    []
  );

  useEffect(() => {
    async function carregar() {
      try {
        const lista = await listarEventosPublicos();
        setEventos(lista.map(eventoApiParaCard));
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  return (
    <div
      className="relative overflow-x-hidden"
      style={{
        backgroundImage: "url('/images/Eventos.png')",
      }}
    >
      <div className="z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pb-16 sm:pb-24">
        <header className="py-4 sm:py-5 flex justify-center px-2 sm:px-4">
          <div className="w-full max-w-5xl">
            <div className="md:hidden rounded-xl bg-brand-pink px-4 py-3 shadow-md">
              <p className="text-center text-white text-sm font-bold leading-snug">
                Fique por dentro do que a associação faz e planeja.
                Sua participação é fundamental para os nossos resgatados!
              </p>
            </div>
            <div
              className="
                hidden md:flex
                relative
                w-full
                min-h-36.5
                items-center justify-center
                bg-center bg-no-repeat
                bg-size-[100%_100%]
              "
              style={{
                backgroundImage: `url('${EVENTOS_HEADER_SVG}')`,
              }}
            >
              <div className="px-14 py-10">
                <p className="text-center text-white text-xl leading-relaxed font-bold max-w-4xl">
                  Fique por dentro do que a associação faz e planeja.
                  Sua participação é fundamental para os nossos resgatados!
                </p>
              </div>
            </div>
          </div>
        </header>

        {carregando ? (
          <div className="flex justify-center py-20 text-white text-lg font-medium">
            Carregando eventos...
          </div>
        ) : eventos.length === 0 ? (
          <div className="flex justify-center py-20 text-white text-lg font-medium">
            Nenhum evento cadastrado no momento.
          </div>
        ) : (
          <section
            className="flex flex-col gap-8 sm:gap-10 md:gap-5 mt-2 sm:mt-0"
            aria-label="Lista de eventos"
          >
            {eventos.map((evento) => (
              <EventoCard key={evento.id} evento={evento} />
            ))}
          </section>
        )}
      </div>

      <div aria-hidden className="relative pt-8 sm:pt-15">
        <img
          src={EVENTOS_BOTTOM_SVG}
          alt=""
          className="block w-full h-auto"
        />
      </div>
    </div>
  );
}
