import type {
  DadosDoacoesAdmin,
  RespostaDoacoesAdmin,
} from "../types/doacoes-admin";

const CHAVE_LOCAL_STORAGE = "gaapo_doacoes_admin";

const dadosPadraoDoacoes: DadosDoacoesAdmin = {
  chavePix: "sua-chave-pix@exemplo.com",
  numeroContaBancaria: "Banco 000 - Ag. 0000 - Conta 00000-0",
  textoInformativo: "Deseja fazer alguma doação e possuí dúvidas?",
};

function buscarDadosLocais(): DadosDoacoesAdmin {
  if (typeof window === "undefined") {
    return dadosPadraoDoacoes;
  }

  const dadosSalvos = localStorage.getItem(CHAVE_LOCAL_STORAGE);

  if (!dadosSalvos) {
    return dadosPadraoDoacoes;
  }

  try {
    return JSON.parse(dadosSalvos) as DadosDoacoesAdmin;
  } catch {
    return dadosPadraoDoacoes;
  }
}

function salvarDadosLocais(dados: DadosDoacoesAdmin) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(CHAVE_LOCAL_STORAGE, JSON.stringify(dados));
}

export async function buscarDadosDoacoesAdmin(): Promise<RespostaDoacoesAdmin> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  return {
    sucesso: true,
    dados: buscarDadosLocais(),
  };
}

export async function salvarDadosDoacoesAdmin(
  dados: DadosDoacoesAdmin
): Promise<RespostaDoacoesAdmin> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  salvarDadosLocais(dados);

  return {
    sucesso: true,
    mensagem: "Informações de doação salvas com sucesso.",
    dados,
  };
}