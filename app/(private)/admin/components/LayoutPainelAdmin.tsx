import MenuLateralAdmin from "./MenuLateralAdmin";

type LayoutPainelAdminProps = {
  children: React.ReactNode;
  paginaAtiva: "adocao" | "doacoes" | "prestacao-contas" | "eventos";
};

export default function LayoutPainelAdmin({
  children,
  paginaAtiva,
}: LayoutPainelAdminProps) {
  return (
    <main className="flex min-h-screen border-[2px] border-[#202020] bg-[#fde5ed]">
      <MenuLateralAdmin paginaAtiva={paginaAtiva} />

      <section className="flex min-h-screen flex-1 flex-col bg-[#fde5ed]">
        {children}
      </section>
    </main>
  );
}