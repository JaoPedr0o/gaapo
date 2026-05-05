export type DadosPrestacaoContasAdmin = {
  id?: string;
  titulo: string;
  dataDocumento: string;
  documentoBase64: string;
  nomeDocumento: string;
};

export type RespostaPrestacaoContasAdmin = {
  sucesso: boolean;
  mensagem?: string;
  documento?: DadosPrestacaoContasAdmin;
};