export type DadosAnimalAdocao = {
  id?: string;
  nome: string;
  descricao: string;
  idade: string;
  sexo: string;
  temperamento: string;
  imagemBase64?: string;
  nomeImagem?: string;
};

export type RespostaCadastroAnimal = {
  sucesso: boolean;
  mensagem?: string;
  animal?: DadosAnimalAdocao;
};

export type RespostaListagemAnimais = {
  sucesso: boolean;
  mensagem?: string;
  animais: DadosAnimalAdocao[];
};

export type RespostaAnimalAdocao = {
  sucesso: boolean;
  mensagem?: string;
  animal?: DadosAnimalAdocao;
};