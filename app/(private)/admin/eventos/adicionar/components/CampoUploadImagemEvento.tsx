type CampoUploadImagemEventoProps = {
  nomeImagem?: string;
  onImagemSelecionada: (arquivo: File, imagemBase64: string) => void;
};

const TAMANHO_MAXIMO_MB = 5;
const LARGURA_MAXIMA_IMAGEM = 900;
const ALTURA_MAXIMA_IMAGEM = 900;
const QUALIDADE_IMAGEM = 0.72;

export default function CampoUploadImagemEvento({
  nomeImagem,
  onImagemSelecionada,
}: CampoUploadImagemEventoProps) {
  function redimensionarImagem(arquivo: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const leitor = new FileReader();

      leitor.onload = () => {
        const resultado = leitor.result;

        if (typeof resultado !== "string") {
          reject(new Error("Não foi possível ler a imagem."));
          return;
        }

        const imagem = new Image();

        imagem.onload = () => {
          let largura = imagem.width;
          let altura = imagem.height;

          if (largura > altura && largura > LARGURA_MAXIMA_IMAGEM) {
            altura = Math.round((altura * LARGURA_MAXIMA_IMAGEM) / largura);
            largura = LARGURA_MAXIMA_IMAGEM;
          }

          if (altura > largura && altura > ALTURA_MAXIMA_IMAGEM) {
            largura = Math.round((largura * ALTURA_MAXIMA_IMAGEM) / altura);
            altura = ALTURA_MAXIMA_IMAGEM;
          }

          if (largura === altura && largura > LARGURA_MAXIMA_IMAGEM) {
            largura = LARGURA_MAXIMA_IMAGEM;
            altura = ALTURA_MAXIMA_IMAGEM;
          }

          const canvas = document.createElement("canvas");
          canvas.width = largura;
          canvas.height = altura;

          const contexto = canvas.getContext("2d");

          if (!contexto) {
            reject(new Error("Não foi possível processar a imagem."));
            return;
          }

          contexto.drawImage(imagem, 0, 0, largura, altura);

          const imagemComprimida = canvas.toDataURL(
            "image/jpeg",
            QUALIDADE_IMAGEM
          );

          resolve(imagemComprimida);
        };

        imagem.onerror = () => {
          reject(new Error("Arquivo de imagem inválido."));
        };

        imagem.src = resultado;
      };

      leitor.onerror = () => {
        reject(new Error("Não foi possível carregar a imagem."));
      };

      leitor.readAsDataURL(arquivo);
    });
  }

  async function aoSelecionarImagem(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const arquivo = event.target.files?.[0];

    if (!arquivo) {
      return;
    }

    const tamanhoEmMb = arquivo.size / 1024 / 1024;

    if (tamanhoEmMb > TAMANHO_MAXIMO_MB) {
      alert(`A imagem deve ter no máximo ${TAMANHO_MAXIMO_MB}MB.`);
      event.target.value = "";
      return;
    }

    try {
      const imagemBase64 = await redimensionarImagem(arquivo);
      onImagemSelecionada(arquivo, imagemBase64);
    } catch {
      alert("Não foi possível carregar essa imagem. Tente outra foto.");
      event.target.value = "";
    }
  }

  return (
    <div className="flex w-full flex-col">
      <label
        htmlFor="imagem-evento"
        className="mb-[3px] text-[12px] font-light text-[#252525]"
      >
        Imagem do Evento
      </label>

      <label
        htmlFor="imagem-evento"
        className="flex h-[22px] w-full max-w-[135px] cursor-pointer items-center justify-center rounded-full border border-[#52c4d7] bg-white px-2 text-[10px] font-light text-[#777] shadow-[1px_2px_3px_rgba(0,0,0,0.12)] transition hover:bg-[#eefcff]"
      >
        {nomeImagem ? "Alterar imagem" : ""}
      </label>

      {nomeImagem && (
        <span className="mt-1 max-w-[220px] truncate text-[11px] font-light text-[#555]">
          {nomeImagem}
        </span>
      )}

      <input
        id="imagem-evento"
        name="imagem-evento"
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        onChange={aoSelecionarImagem}
        className="hidden"
      />
    </div>
  );
}