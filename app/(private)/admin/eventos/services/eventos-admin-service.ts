import type {
  DadosEventoAdmin,
  RespostaEventoAdmin,
  RespostaListagemEventos,
} from "../types/evento-admin";

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

export async function listarEventosAdmin(): Promise<RespostaListagemEventos> {
  const resposta = await fetch(`${API_URL}/admin/eventos`, {
    headers: cabecalhosAdmin(),
  });

  const conteudo = (await resposta.json()) as RespostaListagemEventos;

  if (!resposta.ok) {
    return {
      sucesso: false,
      mensagem: conteudo.mensagem ?? "Não foi possível listar os eventos.",
      eventos: [],
    };
  }

  return conteudo;
}

export async function buscarEventoAdminPorId(
  id: string
): Promise<RespostaEventoAdmin> {
  const resposta = await fetch(`${API_URL}/admin/eventos/${id}`, {
    headers: cabecalhosAdmin(),
  });

  const conteudo = (await resposta.json()) as RespostaEventoAdmin;

  if (!resposta.ok) {
    return {
      sucesso: false,
      mensagem: conteudo.mensagem ?? "Evento não encontrado.",
    };
  }

  return conteudo;
}

export async function cadastrarEventoAdmin(
  dadosEvento: DadosEventoAdmin
): Promise<RespostaEventoAdmin> {
  const resposta = await fetch(`${API_URL}/admin/eventos`, {
    method: "POST",
    headers: cabecalhosAdmin(),
    body: JSON.stringify(dadosEvento),
  });

  const conteudo = (await resposta.json()) as RespostaEventoAdmin;

  if (!resposta.ok) {
    return {
      sucesso: false,
      mensagem: conteudo.mensagem ?? "Não foi possível cadastrar o evento.",
    };
  }

  return conteudo;
}

export async function atualizarEventoAdmin(
  id: string,
  dadosEvento: DadosEventoAdmin
): Promise<RespostaEventoAdmin> {
  const resposta = await fetch(`${API_URL}/admin/eventos/${id}`, {
    method: "PUT",
    headers: cabecalhosAdmin(),
    body: JSON.stringify(dadosEvento),
  });

  const conteudo = (await resposta.json()) as RespostaEventoAdmin;

  if (!resposta.ok) {
    return {
      sucesso: false,
      mensagem: conteudo.mensagem ?? "Não foi possível atualizar o evento.",
    };
  }

  return conteudo;
}

export async function removerEventoAdmin(
  id: string
): Promise<RespostaEventoAdmin> {
  const resposta = await fetch(`${API_URL}/admin/eventos/${id}`, {
    method: "DELETE",
    headers: cabecalhosAdmin(),
  });

  const conteudo = (await resposta.json()) as RespostaEventoAdmin;

  if (!resposta.ok) {
    return {
      sucesso: false,
      mensagem: conteudo.mensagem ?? "Não foi possível remover o evento.",
    };
  }

  return conteudo;
}
