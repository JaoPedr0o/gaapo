import type {
  DadosPrestacaoContasAdmin,
  RespostaListagemPrestacoesContas,
  RespostaPrestacaoContasAdmin,
} from "../types/prestacao-contas-admin";

const CHAVE_LOCAL_STORAGE = "gaapo_prestacoes_contas_admin";

function gerarIdTemporario() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `prestacao-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

function buscarPrestacoesLocais(): DadosPrestacaoContasAdmin[] {
  if (typeof window === "undefined") {
    return [];
  }

  const dadosSalvos = localStorage.getItem(CHAVE_LOCAL_STORAGE);

  if (!dadosSalvos) {
    return [];
  }

  try {
    return JSON.parse(dadosSalvos) as DadosPrestacaoContasAdmin[];
  } catch {
    return [];
  }
}

function salvarPrestacoesLocais(prestacoes: DadosPrestacaoContasAdmin[]) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(CHAVE_LOCAL_STORAGE, JSON.stringify(prestacoes));
}

export async function listarPrestacoesContasAdmin(): Promise<RespostaListagemPrestacoesContas> {
  await new Promise((resolve) => setTimeout(resolve, 250));

  return {
    sucesso: true,
    prestacoes: buscarPrestacoesLocais(),
  };
}

export async function buscarPrestacaoContasPorId(
  id: string
): Promise<RespostaPrestacaoContasAdmin> {
  await new Promise((resolve) => setTimeout(resolve, 250));

  const prestacao = buscarPrestacoesLocais().find((item) => item.id === id);

  if (!prestacao) {
    return {
      sucesso: false,
      mensagem: "Prestação de contas não encontrada.",
    };
  }

  return {
    sucesso: true,
    prestacao,
  };
}

export async function cadastrarPrestacaoContasAdmin(
  dadosPrestacao: DadosPrestacaoContasAdmin
): Promise<RespostaPrestacaoContasAdmin> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const novaPrestacao: DadosPrestacaoContasAdmin = {
    ...dadosPrestacao,
    id: gerarIdTemporario(),
    dataCadastro: dadosPrestacao.dataCadastro || new Date().toISOString(),
  };

  const prestacoesAtuais = buscarPrestacoesLocais();
  const prestacoesAtualizadas = [...prestacoesAtuais, novaPrestacao];

  try {
    salvarPrestacoesLocais(prestacoesAtualizadas);

    return {
      sucesso: true,
      mensagem: "Prestação de contas cadastrada com sucesso.",
      prestacao: novaPrestacao,
    };
  } catch {
    return {
      sucesso: false,
      mensagem:
        "Não foi possível salvar. O documento pode estar muito grande para armazenamento temporário.",
    };
  }
}

export async function atualizarPrestacaoContasAdmin(
  id: string,
  dadosPrestacao: DadosPrestacaoContasAdmin
): Promise<RespostaPrestacaoContasAdmin> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const prestacoesAtuais = buscarPrestacoesLocais();

  const prestacoesAtualizadas = prestacoesAtuais.map((prestacao) => {
    if (prestacao.id === id) {
      return {
        ...dadosPrestacao,
        id,
      };
    }

    return prestacao;
  });

  try {
    salvarPrestacoesLocais(prestacoesAtualizadas);

    return {
      sucesso: true,
      mensagem: "Prestação de contas atualizada com sucesso.",
      prestacao: {
        ...dadosPrestacao,
        id,
      },
    };
  } catch {
    return {
      sucesso: false,
      mensagem:
        "Não foi possível atualizar. O documento pode estar muito grande para armazenamento temporário.",
    };
  }
}

export async function removerPrestacaoContasAdmin(
  id: string
): Promise<RespostaPrestacaoContasAdmin> {
  await new Promise((resolve) => setTimeout(resolve, 350));

  const prestacoesAtuais = buscarPrestacoesLocais();

  const prestacaoExiste = prestacoesAtuais.some((item) => item.id === id);

  if (!prestacaoExiste) {
    return {
      sucesso: false,
      mensagem: "Prestação de contas não encontrada.",
    };
  }

  const prestacoesAtualizadas = prestacoesAtuais.filter(
    (prestacao) => prestacao.id !== id
  );

  try {
    salvarPrestacoesLocais(prestacoesAtualizadas);

    return {
      sucesso: true,
      mensagem: "Prestação de contas removida com sucesso.",
    };
  } catch {
    return {
      sucesso: false,
      mensagem: "Não foi possível remover a prestação de contas.",
    };
  }
}