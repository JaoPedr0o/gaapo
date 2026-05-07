type CabecalhoAdminProps = {
  titulo: string;
  subtitulo: string;
  corTema: string;
};

export default function CabecalhoAdmin({
  titulo,
  subtitulo,
  corTema,
}: CabecalhoAdminProps) {
  return (
    <header className="flex flex-col items-center text-center">
      <span
        className="mb-3 h-[4px] w-[74px] rounded-full"
        style={{ backgroundColor: corTema }}
      />

      <h1 className="text-[24px] font-bold uppercase tracking-[0.8px] text-[#252525] max-md:text-[20px]">
        {titulo}
      </h1>

      <div className="mt-2 flex flex-col items-center">
        <h2 className="text-[18px] font-semibold uppercase tracking-[0.5px] text-[#252525] max-md:text-[16px]">
          {subtitulo}
        </h2>

        <span
          className="mt-2 h-[2px] w-full max-w-[210px] rounded-full"
          style={{ backgroundColor: corTema }}
        />
      </div>
    </header>
  );
}