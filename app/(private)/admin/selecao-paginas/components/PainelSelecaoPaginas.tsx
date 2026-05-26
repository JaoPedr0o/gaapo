import Image from "next/image";
import BotaoSelecaoPagina from "./BotaoSelecaoPagina";
import type { PaginaAdministrativa } from "../types/pagina-administrativa";

const paginasAdministrativas: PaginaAdministrativa[] = [
  {
    id: "adocao",
    titulo: "Página de Adoção",
    href: "/admin/adocao",
  },
  {
    id: "doacoes",
    titulo: "Página de Doações",
    href: "/admin/doacoes",
  },
  {
    id: "prestacao-contas",
    titulo: "Página de Prestação de Contas",
    href: "/admin/prestacao-de-contas",
  },
  {
    id: "eventos",
    titulo: "Página de Eventos",
    href: "/admin/eventos",
  },
];

export default function PainelSelecaoPaginas() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden  -[#202020] bg-[#f8f6f0] px-4 py-8">
      <div className="absolute inset-0 z-0">
        <Image
          src="/fundo-selecao-admin.svg"
          alt="Fundo decorativo da seleção de páginas"
          fill
          priority
          className="object-cover"
        />
      </div>

      <section className="relative z-10 flex w-full max-w-[860px] flex-col items-center">
        <h1 className="mb-10 text-center text-[22px] font-medium uppercase tracking-[0.3px] text-[#2f2f2f] underline underline-offset-[6px] max-sm:text-[18px]">
          Seleção de Páginas
        </h1>

        <div className="flex w-full flex-col gap-4">
          {paginasAdministrativas.map((pagina) => (
            <BotaoSelecaoPagina key={pagina.id} pagina={pagina} />
          ))}
        </div>
      </section>
    </main>
  );
}