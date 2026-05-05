import Image from "next/image";
import Link from "next/link";
import type { DadosEventoAdmin } from "../../types/evento-admin";

type CardEventoEdicaoProps = {
  evento: DadosEventoAdmin;
};

export default function CardEventoEdicao({ evento }: CardEventoEdicaoProps) {
  return (
    <Link
      href={`/admin/eventos/editar/${evento.id}`}
      className="relative flex min-h-[72px] w-full items-center rounded-[7px] border border-[#52c4d7] bg-white px-[10px] py-[8px] shadow-[1px_2px_3px_rgba(0,0,0,0.14)] transition hover:scale-[1.003] hover:shadow-[2px_3px_5px_rgba(0,0,0,0.18)]"
    >
      <div className="relative h-[43px] w-[62px] shrink-0 overflow-hidden rounded-[4px] bg-[#cfcfcf]">
        {evento.imagemBase64 && (
          <Image
            src={evento.imagemBase64}
            alt={`Imagem do evento ${evento.nome}`}
            fill
            className="object-cover"
          />
        )}
      </div>

      <div className="ml-[12px] flex min-w-0 flex-1 flex-col items-center pr-[42px]">
        <h3 className="text-center text-[14px] font-bold text-[#252525]">
          {evento.nome || "Nome do Evento"}
        </h3>

        <p className="mt-[6px] line-clamp-2 max-w-[330px] text-center text-[9px] font-light leading-[1.25] text-[#9b9b9b]">
          {evento.descricao ||
            "Informações informações informações informações informações informações informações informações informações informações"}
        </p>
      </div>

      <span className="absolute right-[22px] top-1/2 -translate-y-1/2 text-[48px] font-light leading-none text-[#52c4d7]">
        ›
      </span>
    </Link>
  );
}