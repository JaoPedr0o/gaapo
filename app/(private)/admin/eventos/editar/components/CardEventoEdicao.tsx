import Image from "next/image";
import Link from "next/link";
import type { DadosEventoAdmin } from "../../types/evento-admin";

type CardEventoEdicaoProps = {
  evento: DadosEventoAdmin;
};

function formatarData(data?: string) {
  if (!data) {
    return "Não informada";
  }

  const partes = data.split("-");

  if (partes.length !== 3) {
    return data;
  }

  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function formatarHorario(horario?: string) {
  if (!horario) {
    return "Não informado";
  }

  return horario;
}

export default function CardEventoEdicao({ evento }: CardEventoEdicaoProps) {
  return (
    <Link
      href={`/admin/eventos/editar/${evento.id}`}
      className="group relative flex min-h-[96px] w-full items-center rounded-[10px] border border-[#52c4d7] bg-white px-[18px] py-[14px] shadow-[2px_3px_6px_rgba(0,0,0,0.10)] transition hover:-translate-y-[1px] hover:shadow-[3px_5px_12px_rgba(0,0,0,0.14)]"
    >
      <div className="relative h-[64px] w-[74px] shrink-0 overflow-hidden rounded-[6px] bg-[#d8d8d8]">
        {evento.imagemBase64 && (
          <Image
            src={evento.imagemBase64}
            alt={`Imagem do evento ${evento.nome}`}
            fill
            className="object-cover"
          />
        )}
      </div>

      <div className="ml-[16px] flex min-w-0 flex-1 flex-col justify-center pr-[54px]">
        <h3 className="text-[18px] font-semibold leading-[1.1] text-[#252525]">
          {evento.nome || "Nome do evento"}
        </h3>

        <p className="mt-[6px] line-clamp-2 text-[12px] font-light leading-[1.35] text-[#7a7a7a]">
          {evento.descricao || "Sem descrição cadastrada para este evento."}
        </p>

        <div className="mt-[10px] flex flex-wrap gap-[8px]">
          <span className="rounded-full border border-[#b7edf5] bg-[#f2fdff] px-[10px] py-[4px] text-[11px] font-medium text-[#357b88]">
            Data: {formatarData(evento.data)}
          </span>

          <span className="rounded-full border border-[#b7edf5] bg-[#f2fdff] px-[10px] py-[4px] text-[11px] font-medium text-[#357b88]">
            Horário: {formatarHorario(evento.horario)}
          </span>

          <span className="rounded-full border border-[#b7edf5] bg-[#f2fdff] px-[10px] py-[4px] text-[11px] font-medium text-[#357b88]">
            Local: {evento.local || "Não informado"}
          </span>
        </div>
      </div>

      <span className="absolute right-[20px] top-1/2 -translate-y-1/2 text-[48px] font-light leading-none text-[#52c4d7] transition group-hover:translate-x-[2px]">
        ›
      </span>
    </Link>
  );
}