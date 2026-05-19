"use client";

import { useEffect, useState } from "react";
import type { DadosEventoAdmin } from "@/app/(private)/admin/eventos/types/evento-admin";

function formatarData(data: string) {
  const partes = data.split("-");
  if (partes.length !== 3) return data;
  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function CardEvento({ evento }: { evento: DadosEventoAdmin }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md flex flex-col">
      {evento.imagemUrl ? (
        <img
          src={evento.imagemUrl}
          alt={evento.nome}
          className="w-full h-44 object-cover"
        />
      ) : (
        <div className="w-full h-44 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
          Sem imagem
        </div>
      )}

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-[#252525] text-lg">{evento.nome}</h3>

        <p className="text-sm text-gray-600 mt-2 line-clamp-3 flex-1">
          {evento.descricao}
        </p>

        <ul className="text-sm mt-3 text-gray-700 space-y-1">
          <li>
            <span className="font-medium">Data:</span> {formatarData(evento.data)}
          </li>
          <li>
            <span className="font-medium">Horário:</span> {evento.horario}
          </li>
          <li>
            <span className="font-medium">Local:</span> {evento.local}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function EventosPage() {
  const [eventos, setEventos] = useState<DadosEventoAdmin[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarEventos() {
      try {
        const resposta = await fetch("/api/eventos");
        const conteudo = (await resposta.json()) as {
          sucesso: boolean;
          eventos: DadosEventoAdmin[];
        };
        if (conteudo.sucesso) {
          setEventos(conteudo.eventos);
        }
      } finally {
        setCarregando(false);
      }
    }

    carregarEventos();
  }, []);

  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage: "url('/images/adocaoBg.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-10">
        <div className="text-center py-10 px-4 flex flex-col items-center gap-2">
          <h1
            className="text-4xl font-bold text-white rounded-full px-6 py-2"
            style={{ backgroundColor: "#5ec6d1" }}
          >
            EVENTOS
          </h1>

          <p
            className="mt-4 px-6 py-2 rounded-full text-white"
            style={{ backgroundColor: "#5ec6d1" }}
          >
            Fique por dentro das ações e eventos do GAAPO.
          </p>
        </div>

        {carregando ? (
          <div className="flex justify-center py-20 text-white text-lg">
            Carregando eventos...
          </div>
        ) : eventos.length === 0 ? (
          <div className="flex justify-center py-20 text-white text-lg">
            Nenhum evento cadastrado no momento.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {eventos.map((evento) => (
              <CardEvento key={evento.id} evento={evento} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
