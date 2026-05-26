import type { ReactNode } from "react";
import MenuLateralAdmin from "./MenuLateralAdmin";

type PaginaAtivaAdmin =
  | "adocao"
  | "doacoes"
  | "prestacao-contas"
  | "eventos";

type LayoutPainelAdminProps = {
  children: ReactNode;
  paginaAtiva: PaginaAtivaAdmin;
};

export default function LayoutPainelAdmin({
  children,
  paginaAtiva,
}: LayoutPainelAdminProps) {
  return (
    <div className="flex min-h-screen   bg-white">
      <MenuLateralAdmin paginaAtiva={paginaAtiva} />

      <main className="min-h-screen flex-1 overflow-hidden pt-[58px] md:pt-0">
        {children}
      </main>
    </div>
  );
}