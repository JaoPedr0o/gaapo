import type {
  DadosPrestacaoContasAdmin,
  RespostaListagemPrestacoesContas,
  RespostaPrestacaoContasAdmin,
} from "../types/prestacao-contas-admin";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function obterToken(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("gaapo_admin_token") ?? "";
}

function cabecalhosAdmin(): Record<string, string> {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${obterToken()}`,
  };
}

export async function listarPrestacoesContasAdmin(): Promise<RespostaListagemPrestacoesContas> {
  const resposta = await fetch(`${API_URL}/admin/prestacoes-contas`, {
    headers: cabecalhosAdmin(),
  });

  const conteudo = (await resposta.json()) as RespostaListagemPrestacoesContas;

  if (!resposta.ok) {
    return {
      sucesso: false,
      mensagem: conteudo.mensagem ?? "Não foi possível listar as prestações de contas.",
      prestacoes: [],
    };
  }

  return conteudo;
}

export async function buscarPrestacaoContasPorId(
  id: string
): Promise<RespostaPrestacaoContasAdmin> {
  const resposta = await fetch(`${API_URL}/admin/prestacoes-contas/${id}`, {
    headers: cabecalhosAdmin(),
  });

  const conteudo = (await resposta.json()) as RespostaPrestacaoContasAdmin;

  if (!resposta.ok) {
    return {
      sucesso: false,
      mensagem: conteudo.mensagem ?? "Prestação de contas não encontrada.",
    };
  }

  return conteudo;
}

export async function cadastrarPrestacaoContasAdmin(
  dadosPrestacao: DadosPrestacaoContasAdmin
): Promise<RespostaPrestacaoContasAdmin> {
  const resposta = await fetch(`${API_URL}/admin/prestacoes-contas`, {
    method: "POST",
    headers: cabecalhosAdmin(),
    body: JSON.stringify(dadosPrestacao),
  });

  const conteudo = (await resposta.json()) as RespostaPrestacaoContasAdmin;

  if (!resposta.ok) {
    return {
      sucesso: false,
      mensagem: conteudo.mensagem ?? "Não foi possível cadastrar a prestação de contas.",
    };
  }

  return conteudo;
}

export async function atualizarPrestacaoContasAdmin(
  id: string,
  dadosPrestacao: DadosPrestacaoContasAdmin
): Promise<RespostaPrestacaoContasAdmin> {
  const resposta = await fetch(`${API_URL}/admin/prestacoes-contas/${id}`, {
    method: "PUT",
    headers: cabecalhosAdmin(),
    body: JSON.stringify(dadosPrestacao),
  });

  const conteudo = (await resposta.json()) as RespostaPrestacaoContasAdmin;

  if (!resposta.ok) {
    return {
      sucesso: false,
      mensagem: conteudo.mensagem ?? "Não foi possível atualizar a prestação de contas.",
    };
  }

  return conteudo;
}

export async function removerPrestacaoContasAdmin(
  id: string
): Promise<RespostaPrestacaoContasAdmin> {
  const resposta = await fetch(`${API_URL}/admin/prestacoes-contas/${id}`, {
    method: "DELETE",
    headers: cabecalhosAdmin(),
  });

  const conteudo = (await resposta.json()) as RespostaPrestacaoContasAdmin;

  if (!resposta.ok) {
    return {
      sucesso: false,
      mensagem: conteudo.mensagem ?? "Não foi possível remover a prestação de contas.",
    };
  }

  return conteudo;
}
