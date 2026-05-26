import type { DadosAnimalAdocao } from "@/app/(private)/admin/adocao/types/animal-adocao";
import type { DadosDoacoesAdmin } from "@/app/(private)/admin/doacoes/types/doacoes-admin";
import type { DadosEventoAdmin } from "@/app/(private)/admin/eventos/types/evento-admin";
import type { DadosPrestacaoContasAdmin } from "@/app/(private)/admin/prestacao-de-contas/types/prestacao-contas-admin";
import type { Evento } from "@/app/(public)/eventos/EventoCard";

export function formatarDataBr(data: string): string {
  const partes = data.split("-");
  if (partes.length !== 3) return data;
  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

export function eventoApiParaCard(evento: DadosEventoAdmin): Evento {
  return {
    id: evento.id ?? "",
    titulo: evento.nome,
    descricao: evento.descricao,
    data: formatarDataBr(evento.data),
    horario: evento.horario,
    local: evento.local,
    dataPostagem: formatarDataBr(evento.data),
    image: evento.imagemUrl,
  };
}

export async function listarAnimaisPublicos(): Promise<DadosAnimalAdocao[]> {
  const resposta = await fetch("/api/animais");
  if (!resposta.ok) return [];
  const conteudo = (await resposta.json()) as {
    sucesso: boolean;
    animais: DadosAnimalAdocao[];
  };
  return conteudo.sucesso ? conteudo.animais : [];
}

export async function listarEventosPublicos(): Promise<DadosEventoAdmin[]> {
  const resposta = await fetch("/api/eventos");
  if (!resposta.ok) return [];
  const conteudo = (await resposta.json()) as {
    sucesso: boolean;
    eventos: DadosEventoAdmin[];
  };
  return conteudo.sucesso ? conteudo.eventos : [];
}

export async function obterConfiguracaoDoacoes(): Promise<DadosDoacoesAdmin | null> {
  const resposta = await fetch("/api/doacoes");
  if (!resposta.ok) return null;
  const conteudo = (await resposta.json()) as {
    sucesso: boolean;
    dados: DadosDoacoesAdmin | null;
  };
  return conteudo.sucesso ? conteudo.dados ?? null : null;
}

export async function listarPrestacoesContasPublicas(): Promise<
  DadosPrestacaoContasAdmin[]
> {
  const resposta = await fetch("/api/prestacoes-contas");
  if (!resposta.ok) return [];
  const conteudo = (await resposta.json()) as {
    sucesso: boolean;
    prestacoes: DadosPrestacaoContasAdmin[];
  };
  return conteudo.sucesso ? conteudo.prestacoes : [];
}
