import type {
  DadosPrestacaoContasAdmin,
  RespostaPrestacaoContasAdmin,
} from "../types/prestacao-contas-admin";

const CHAVE_LOCAL_STORAGE = "gaapo_prestacao_contas_admin";

function gerarIdTemporario() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `prestacao-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

function buscarDocumentoLocal(): DadosPrestacaoContasAdmin | null {
  if (typeof window === "undefined") {
    return null;
  }

  const documentoSalvo = localStorage.getItem(CHAVE_LOCAL_STORAGE);

  if (!documentoSalvo) {
    return null;
  }

  try {
    return JSON.parse(documentoSalvo) as DadosPrestacaoContasAdmin;
  } catch {
    return null;
  }
}

function salvarDocumentoLocal(documento: DadosPrestacaoContasAdmin) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(CHAVE_LOCAL_STORAGE, JSON.stringify(documento));
}

export async function buscarPrestacaoContasAdmin(): Promise<RespostaPrestacaoContasAdmin> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const documento = buscarDocumentoLocal();

  return {
    sucesso: true,
    documento: documento ?? undefined,
  };
}

export async function salvarPrestacaoContasAdmin(
  dadosDocumento: DadosPrestacaoContasAdmin
): Promise<RespostaPrestacaoContasAdmin> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const novoDocumento: DadosPrestacaoContasAdmin = {
    ...dadosDocumento,
    id: dadosDocumento.id ?? gerarIdTemporario(),
  };

  salvarDocumentoLocal(novoDocumento);

  return {
    sucesso: true,
    mensagem: "Documento salvo com sucesso.",
    documento: novoDocumento,
  };
}