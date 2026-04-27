export type DadosLoginAdministrador = {
  usuario: string;
  senha: string;
};

export type RespostaLoginAdministrador = {
  sucesso: boolean;
  mensagem?: string;
  token?: string;
};