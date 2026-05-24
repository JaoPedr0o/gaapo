export type TipoCadastroPrestacao = "pdf" | "manual";

export type TipoMovimentacaoPrestacao = "entrada" | "saida";

export type MovimentacaoPrestacaoContas = {
  id: string;
  tipo: TipoMovimentacaoPrestacao;
  data: string;
  categoria: string;
  descricao: string;
  valor: string;
};

export type DadosPrestacaoContasAdmin = {
  id?: string;
  tipoCadastro: TipoCadastroPrestacao;
  titulo: string;
  mesReferencia: string;
  anoReferencia: string;
  descricao: string;
  valorRecebido: string;
  valorGasto: string;
  saldoFinal: string;
  movimentacoes: MovimentacaoPrestacaoContas[];
  documentoBase64?: string;
  documentoUrl?: string;
  nomeDocumento?: string;
  dataCadastro: string;
};

export type RespostaPrestacaoContasAdmin = {
  sucesso: boolean;
  mensagem?: string;
  prestacao?: DadosPrestacaoContasAdmin;
};

export type RespostaListagemPrestacoesContas = {
  sucesso: boolean;
  mensagem?: string;
  prestacoes: DadosPrestacaoContasAdmin[];
};