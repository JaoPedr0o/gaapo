type CampoUploadDocumentoPrestacaoContasProps = {
  nomeDocumento?: string;
  onDocumentoSelecionado: (arquivo: File, documentoBase64: string) => void;
};

export default function CampoUploadDocumentoPrestacaoContas({
  nomeDocumento,
  onDocumentoSelecionado,
}: CampoUploadDocumentoPrestacaoContasProps) {
  function converterDocumentoParaBase64(arquivo: File) {
    const leitor = new FileReader();

    leitor.onload = () => {
      const resultado = leitor.result;

      if (typeof resultado === "string") {
        onDocumentoSelecionado(arquivo, resultado);
      }
    };

    leitor.readAsDataURL(arquivo);
  }

  function aoSelecionarDocumento(event: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = event.target.files?.[0];

    if (!arquivo) {
      return;
    }

    converterDocumentoParaBase64(arquivo);
  }

  return (
    <div className="flex w-full flex-col">
      <label
        htmlFor="documento"
        className="mb-[3px] text-[12px] font-light text-[#252525]"
      >
        Documento
      </label>

      <label
        htmlFor="documento"
        className="flex h-[22px] w-full max-w-[145px] cursor-pointer items-center justify-center rounded-full border border-[#b75fc1] bg-white px-2 text-[10px] font-light text-[#777] shadow-[1px_2px_3px_rgba(0,0,0,0.12)] transition hover:bg-[#fceefd]"
      >
        {nomeDocumento ? "Alterar PDF" : ""}
      </label>

      {nomeDocumento && (
        <span className="mt-1 max-w-[260px] truncate text-[11px] font-light text-[#555]">
          {nomeDocumento}
        </span>
      )}

      <input
        id="documento"
        name="documento"
        type="file"
        accept="application/pdf"
        onChange={aoSelecionarDocumento}
        className="hidden"
      />
    </div>
  );
}