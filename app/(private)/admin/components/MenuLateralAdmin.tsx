import Image from "next/image";
import Link from "next/link";

type ItemMenuAdmin = {
  titulo: string;
  href: string;
};

type MenuLateralAdminProps = {
  paginaAtiva: "adocao" | "doacoes" | "prestacao-contas" | "eventos";
};

const itensMenu: ItemMenuAdmin[] = [
  {
    titulo: "Página de Adoção",
    href: "/admin/adocao",
  },
  {
    titulo: "Página de Doações",
    href: "/admin/doacoes",
  },
  {
    titulo: "Página de Prestação de Contas",
    href: "/admin/prestacao-de-contas",
  },
  {
    titulo: "Página de Eventos",
    href: "/admin/eventos",
  },
];

export default function MenuLateralAdmin({ paginaAtiva }: MenuLateralAdminProps) {
  function verificarPaginaAtiva(href: string) {
    if (paginaAtiva === "adocao" && href === "/admin/adocao") {
      return true;
    }

    if (paginaAtiva === "doacoes" && href === "/admin/doacoes") {
      return true;
    }

    if (
      paginaAtiva === "prestacao-contas" &&
      href === "/admin/prestacao-de-contas"
    ) {
      return true;
    }

    if (paginaAtiva === "eventos" && href === "/admin/eventos") {
      return true;
    }

    return false;
  }

  return (
    <aside className="relative flex min-h-screen w-[226px] shrink-0 flex-col overflow-hidden border-r border-[#f3bdd0] bg-white px-3 py-8 shadow-[2px_0_4px_rgba(0,0,0,0.10)]">
      <Image
        src="/fundo-menu-admin.svg"
        alt="Fundo decorativo do menu lateral"
        fill
        priority
        className="z-0 object-cover"
      />

      <nav className="relative z-10 mt-[94px] flex flex-col items-center gap-[52px]">
        {itensMenu.map((item) => {
          const ativo = verificarPaginaAtiva(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`w-full text-center text-[18px] font-medium uppercase leading-[1.25] tracking-[0.2px] text-[#2b2b2b] transition hover:text-[#f59ab7] ${
                ativo ? "underline underline-offset-[4px]" : ""
              }`}
            >
              {item.titulo}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}