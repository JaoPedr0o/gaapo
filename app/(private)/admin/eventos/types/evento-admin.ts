export type DadosEventoAdmin = {
  id?: string;
  nome: string;
  descricao: string;
  data: string;
  horario: string;
  local: string;
  imagemBase64?: string;
  imagemUrl?: string;
  nomeImagem?: string;
};

export type RespostaEventoAdmin = {
  sucesso: boolean;
  mensagem?: string;
  evento?: DadosEventoAdmin;
};

export type RespostaListagemEventos = {
  sucesso: boolean;
  mensagem?: string;
  eventos: DadosEventoAdmin[];
};