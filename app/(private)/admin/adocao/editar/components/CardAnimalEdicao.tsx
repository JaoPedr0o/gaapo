import Image from "next/image";
import Link from "next/link";
import type { DadosAnimalAdocao } from "../../types/animal-adocao";

type CardAnimalEdicaoProps = {
  animal: DadosAnimalAdocao;
};

function formatarEspecie(especie?: string) {
  if (especie === "cao") return "Cão";
  if (especie === "gato") return "Gato";
  if (especie === "outros") return "Outros";
  return "Não informado";
}

function formatarSexo(sexo?: string) {
  if (sexo === "macho") return "Macho";
  if (sexo === "femea") return "Fêmea";
  return "Não informado";
}

function formatarIdade(idade?: string) {
  if (!idade) return "Não informada";

  if (idade === "1") {
    return "1 ano";
  }

  return `${idade} anos`;
}

export default function CardAnimalEdicao({
  animal,
}: CardAnimalEdicaoProps) {
  return (
    <Link
      href={`/admin/adocao/editar/${animal.id}`}
      className="group relative flex min-h-[96px] w-full items-center rounded-[10px] border border-[#f6a6bd] bg-white px-[18px] py-[14px] shadow-[2px_3px_6px_rgba(0,0,0,0.10)] transition hover:-translate-y-[1px] hover:shadow-[3px_5px_12px_rgba(0,0,0,0.14)]"
    >
      <div className="relative h-[64px] w-[74px] shrink-0 overflow-hidden rounded-[6px] bg-[#d8d8d8]">
        {animal.imagemBase64 && (
          <Image
            src={animal.imagemBase64}
            alt={`Imagem do animal ${animal.nome}`}
            fill
            className="object-cover"
          />
        )}
      </div>

      <div className="ml-[16px] flex min-w-0 flex-1 flex-col justify-center pr-[54px]">
        <h3 className="text-[18px] font-semibold leading-[1.1] text-[#252525]">
          {animal.nome || "Nome do animal"}
        </h3>

        <p className="mt-[6px] line-clamp-2 text-[12px] font-light leading-[1.35] text-[#7a7a7a]">
          {animal.descricao ||
            "Sem descrição cadastrada para este animal."}
        </p>

        <div className="mt-[10px] flex flex-wrap gap-[8px]">
          <span className="rounded-full border border-[#f8cade] bg-[#fff7fa] px-[10px] py-[4px] text-[11px] font-medium text-[#8a5f6c]">
            Espécie: {formatarEspecie(animal.especie)}
          </span>

          <span className="rounded-full border border-[#f8cade] bg-[#fff7fa] px-[10px] py-[4px] text-[11px] font-medium text-[#8a5f6c]">
            Sexo: {formatarSexo(animal.sexo)}
          </span>

          <span className="rounded-full border border-[#f8cade] bg-[#fff7fa] px-[10px] py-[4px] text-[11px] font-medium text-[#8a5f6c]">
            Idade: {formatarIdade(animal.idade)}
          </span>
        </div>
      </div>

      <span className="absolute right-[20px] top-1/2 -translate-y-1/2 text-[48px] font-light leading-none text-[#f4a1bc] transition group-hover:translate-x-[2px]">
        ›
      </span>
    </Link>
  );
}