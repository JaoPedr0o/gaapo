import type {
  DadosDoacoesAdmin,
  RespostaDoacoesAdmin,
} from "../types/doacoes-admin";

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

export async function buscarDadosDoacoesAdmin(): Promise<RespostaDoacoesAdmin> {
  const resposta = await fetch(`${API_URL}/admin/doacoes`, {
    headers: cabecalhosAdmin(),
  });

  const conteudo = (await resposta.json()) as RespostaDoacoesAdmin;

  if (!resposta.ok) {
    return {
      sucesso: false,
      mensagem: conteudo.mensagem ?? "Não foi possível buscar as configurações de doação.",
    };
  }

  return conteudo;
}

export async function salvarDadosDoacoesAdmin(
  dados: DadosDoacoesAdmin
): Promise<RespostaDoacoesAdmin> {
  const resposta = await fetch(`${API_URL}/admin/doacoes`, {
    method: "PUT",
    headers: cabecalhosAdmin(),
    body: JSON.stringify(dados),
  });

  const conteudo = (await resposta.json()) as RespostaDoacoesAdmin;

  if (!resposta.ok) {
    return {
      sucesso: false,
      mensagem: conteudo.mensagem ?? "Não foi possível salvar as configurações de doação.",
    };
  }

  return conteudo;
}
