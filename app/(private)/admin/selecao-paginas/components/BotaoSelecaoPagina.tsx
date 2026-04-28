import Link from "next/link";
import type { PaginaAdministrativa } from "../types/pagina-administrativa";

type BotaoSelecaoPaginaProps = {
  pagina: PaginaAdministrativa;
};

export default function BotaoSelecaoPagina({
  pagina,
}: BotaoSelecaoPaginaProps) {
  return (
    <Link
      href={pagina.href}
      className="flex h-[64px] w-full items-center justify-between rounded-[12px] border border-[#f0b400] bg-white px-6 shadow-[2px_3px_4px_rgba(0,0,0,0.16)] transition hover:scale-[1.005] hover:shadow-[3px_4px_6px_rgba(0,0,0,0.18)] focus:outline-none focus:ring-2 focus:ring-[#f0b400]/30"
    >
      <span className="w-full text-center text-[20px] font-medium uppercase tracking-[0.2px] text-[#2f2f2f] max-sm:text-[16px]">
        {pagina.titulo}
      </span>

      <span
        aria-hidden="true"
        className="ml-4 text-[44px] font-light leading-none text-[#f0b400]"
      >
        ›
      </span>
    </Link>
  );
}