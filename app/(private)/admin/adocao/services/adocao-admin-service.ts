import type {
  DadosAnimalAdocao,
  RespostaAnimalAdocao,
  RespostaCadastroAnimal,
  RespostaListagemAnimais,
} from "../types/animal-adocao";

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

export async function listarAnimaisAdocao(): Promise<RespostaListagemAnimais> {
  const resposta = await fetch(`${API_URL}/admin/animais`, {
    headers: cabecalhosAdmin(),
  });

  const conteudo = (await resposta.json()) as RespostaListagemAnimais;

  if (!resposta.ok) {
    return {
      sucesso: false,
      mensagem: conteudo.mensagem ?? "Não foi possível listar os animais.",
      animais: [],
    };
  }

  return conteudo;
}

export async function buscarAnimalAdocaoPorId(
  id: string
): Promise<RespostaAnimalAdocao> {
  const resposta = await fetch(`${API_URL}/admin/animais/${id}`, {
    headers: cabecalhosAdmin(),
  });

  const conteudo = (await resposta.json()) as RespostaAnimalAdocao;

  if (!resposta.ok) {
    return {
      sucesso: false,
      mensagem: conteudo.mensagem ?? "Animal não encontrado.",
    };
  }

  return conteudo;
}

export async function cadastrarAnimalAdocao(
  dadosAnimal: DadosAnimalAdocao
): Promise<RespostaCadastroAnimal> {
  const resposta = await fetch(`${API_URL}/admin/animais`, {
    method: "POST",
    headers: cabecalhosAdmin(),
    body: JSON.stringify(dadosAnimal),
  });

  const conteudo = (await resposta.json()) as RespostaCadastroAnimal;

  if (!resposta.ok) {
    return {
      sucesso: false,
      mensagem: conteudo.mensagem ?? "Não foi possível cadastrar o animal.",
    };
  }

  return conteudo;
}

export async function atualizarAnimalAdocao(
  id: string,
  dadosAnimal: DadosAnimalAdocao
): Promise<RespostaCadastroAnimal> {
  const resposta = await fetch(`${API_URL}/admin/animais/${id}`, {
    method: "PUT",
    headers: cabecalhosAdmin(),
    body: JSON.stringify(dadosAnimal),
  });

  const conteudo = (await resposta.json()) as RespostaCadastroAnimal;

  if (!resposta.ok) {
    return {
      sucesso: false,
      mensagem: conteudo.mensagem ?? "Não foi possível atualizar o animal.",
    };
  }

  return conteudo;
}

export async function removerAnimalAdocao(
  id: string
): Promise<RespostaCadastroAnimal> {
  const resposta = await fetch(`${API_URL}/admin/animais/${id}`, {
    method: "DELETE",
    headers: cabecalhosAdmin(),
  });

  const conteudo = (await resposta.json()) as RespostaCadastroAnimal;

  if (!resposta.ok) {
    return {
      sucesso: false,
      mensagem: conteudo.mensagem ?? "Não foi possível remover o animal.",
    };
  }

  return conteudo;
}
