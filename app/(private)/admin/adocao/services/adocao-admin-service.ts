import type {
  DadosAnimalAdocao,
  RespostaAnimalAdocao,
  RespostaCadastroAnimal,
  RespostaListagemAnimais,
} from "../types/animal-adocao";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CHAVE_LOCAL_STORAGE = "gaapo_animais_adocao";

function buscarAnimaisLocais(): DadosAnimalAdocao[] {
  if (typeof window === "undefined") {
    return [];
  }

  const animaisSalvos = localStorage.getItem(CHAVE_LOCAL_STORAGE);

  if (!animaisSalvos) {
    return [];
  }

  try {
    return JSON.parse(animaisSalvos) as DadosAnimalAdocao[];
  } catch {
    return [];
  }
}

function salvarAnimaisLocais(animais: DadosAnimalAdocao[]) {
  localStorage.setItem(CHAVE_LOCAL_STORAGE, JSON.stringify(animais));
}

export async function listarAnimaisAdocao(): Promise<RespostaListagemAnimais> {
  if (!API_URL) {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      sucesso: true,
      animais: buscarAnimaisLocais(),
    };
  }

  const resposta = await fetch(`${API_URL}/admin/adocao/animais`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
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
  if (!API_URL) {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const animal = buscarAnimaisLocais().find((item) => item.id === id);

    if (!animal) {
      return {
        sucesso: false,
        mensagem: "Animal não encontrado.",
      };
    }

    return {
      sucesso: true,
      animal,
    };
  }

  const resposta = await fetch(`${API_URL}/admin/adocao/animais/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
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
  if (!API_URL) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const novoAnimal: DadosAnimalAdocao = {
      ...dadosAnimal,
      id: crypto.randomUUID(),
    };

    const animaisAtuais = buscarAnimaisLocais();
    const animaisAtualizados = [...animaisAtuais, novoAnimal];

    try {
      salvarAnimaisLocais(animaisAtualizados);

      return {
        sucesso: true,
        mensagem: "Animal cadastrado localmente.",
        animal: novoAnimal,
      };
    } catch {
      return {
        sucesso: false,
        mensagem:
          "A imagem é muito grande para salvar temporariamente no navegador. Tente uma imagem menor.",
      };
    }
  }

  const resposta = await fetch(`${API_URL}/admin/adocao/animais`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
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
  if (!API_URL) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const animaisAtuais = buscarAnimaisLocais();

    const animaisAtualizados = animaisAtuais.map((animal) => {
      if (animal.id === id) {
        return {
          ...dadosAnimal,
          id,
        };
      }

      return animal;
    });

    try {
      salvarAnimaisLocais(animaisAtualizados);

      return {
        sucesso: true,
        mensagem: "Animal atualizado localmente.",
        animal: {
          ...dadosAnimal,
          id,
        },
      };
    } catch {
      return {
        sucesso: false,
        mensagem:
          "A imagem é muito grande para salvar temporariamente no navegador. Tente uma imagem menor.",
      };
    }
  }

  const resposta = await fetch(`${API_URL}/admin/adocao/animais/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
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
  await new Promise((resolve) => setTimeout(resolve, 400));

  const animaisAtuais = buscarAnimaisLocais();

  const animalExiste = animaisAtuais.some((animal) => animal.id === id);

  if (!animalExiste) {
    return {
      sucesso: false,
      mensagem: "Animal não encontrado.",
    };
  }

  const animaisAtualizados = animaisAtuais.filter((animal) => animal.id !== id);

  try {
    salvarAnimaisLocais(animaisAtualizados);

    return {
      sucesso: true,
      mensagem: "Animal removido com sucesso.",
    };
  } catch {
    return {
      sucesso: false,
      mensagem: "Não foi possível remover o animal.",
    };
  }
}