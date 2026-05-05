export type DadosDoacoesAdmin = {
  chavePix: string;
  numeroContaBancaria: string;
  textoInformativo: string;
};

export type RespostaDoacoesAdmin = {
  sucesso: boolean;
  mensagem?: string;
  dados?: DadosDoacoesAdmin;
};