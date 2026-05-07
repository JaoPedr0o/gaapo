import type {
    DadosEventoAdmin,
    RespostaEventoAdmin,
    RespostaListagemEventos,
} from "../types/evento-admin";

const CHAVE_LOCAL_STORAGE = "gaapo_eventos_admin";

function gerarIdTemporario() {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
        return crypto.randomUUID();
    }

    return `evento-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

function buscarEventosLocais(): DadosEventoAdmin[] {
    if (typeof window === "undefined") {
        return [];
    }

    const eventosSalvos = localStorage.getItem(CHAVE_LOCAL_STORAGE);

    if (!eventosSalvos) {
        return [];
    }

    try {
        return JSON.parse(eventosSalvos) as DadosEventoAdmin[];
    } catch {
        return [];
    }
}

function salvarEventosLocais(eventos: DadosEventoAdmin[]) {
    if (typeof window === "undefined") {
        return;
    }

    localStorage.setItem(CHAVE_LOCAL_STORAGE, JSON.stringify(eventos));
}

export async function listarEventosAdmin(): Promise<RespostaListagemEventos> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
        sucesso: true,
        eventos: buscarEventosLocais(),
    };
}

export async function buscarEventoAdminPorId(
    id: string
): Promise<RespostaEventoAdmin> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const evento = buscarEventosLocais().find((item) => item.id === id);

    if (!evento) {
        return {
            sucesso: false,
            mensagem: "Evento não encontrado.",
        };
    }

    return {
        sucesso: true,
        evento,
    };
}

export async function cadastrarEventoAdmin(
    dadosEvento: DadosEventoAdmin
): Promise<RespostaEventoAdmin> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const novoEvento: DadosEventoAdmin = {
        ...dadosEvento,
        id: gerarIdTemporario(),
    };

    const eventosAtuais = buscarEventosLocais();
    const eventosAtualizados = [...eventosAtuais, novoEvento];

    salvarEventosLocais(eventosAtualizados);

    return {
        sucesso: true,
        mensagem: "Evento cadastrado localmente.",
        evento: novoEvento,
    };
}

export async function atualizarEventoAdmin(
    id: string,
    dadosEvento: DadosEventoAdmin
): Promise<RespostaEventoAdmin> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const eventosAtuais = buscarEventosLocais();

    const eventosAtualizados = eventosAtuais.map((evento) => {
        if (evento.id === id) {
            return {
                ...dadosEvento,
                id,
            };
        }

        return evento;
    });

    try {
        salvarEventosLocais(eventosAtualizados);

        return {
            sucesso: true,
            mensagem: "Evento atualizado localmente.",
            evento: {
                ...dadosEvento,
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
export async function removerEventoAdmin(
  id: string
): Promise<RespostaEventoAdmin> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const eventosAtuais = buscarEventosLocais();

  const eventoExiste = eventosAtuais.some((evento) => evento.id === id);

  if (!eventoExiste) {
    return {
      sucesso: false,
      mensagem: "Evento não encontrado.",
    };
  }

  const eventosAtualizados = eventosAtuais.filter((evento) => evento.id !== id);

  try {
    salvarEventosLocais(eventosAtualizados);

    return {
      sucesso: true,
      mensagem: "Evento removido com sucesso.",
    };
  } catch {
    return {
      sucesso: false,
      mensagem: "Não foi possível remover o evento.",
    };
  }
}