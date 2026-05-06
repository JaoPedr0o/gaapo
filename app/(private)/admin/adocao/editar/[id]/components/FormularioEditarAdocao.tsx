"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  atualizarAnimalAdocao,
  buscarAnimalAdocaoPorId,
  removerAnimalAdocao,
} from "../../../services/adocao-admin-service";
import CampoAreaTextoAdocao from "../../../adicionar/components/CampoAreaTextoAdocao";
import CampoSelectAdocao from "../../../adicionar/components/CampoSelectAdocao";
import CampoTextoAdocao from "../../../adicionar/components/CampoTextoAdocao";
import CampoUploadImagemAdocao from "../../../adicionar/components/CampoUploadImagemAdocao";
import type { DadosAnimalAdocao } from "../../../types/animal-adocao";

type FormularioEditarAdocaoProps = {
  idAnimal: string;
};

const opcoesSexoAnimal = [
  { label: "Macho", valor: "macho" },
  { label: "Fêmea", valor: "femea" },
];

const opcoesEspecieAnimal = [
  { label: "Cão", valor: "cao" },
  { label: "Gato", valor: "gato" },
  { label: "Outros", valor: "outros" },
];

export default function FormularioEditarAdocao({
  idAnimal,
}: FormularioEditarAdocaoProps) {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [idade, setIdade] = useState("");
  const [sexo, setSexo] = useState("");
  const [especie, setEspecie] = useState("");
  const [temperamento, setTemperamento] = useState("");
  const [imagemBase64, setImagemBase64] = useState("");
  const [nomeImagem, setNomeImagem] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [carregandoAnimal, setCarregandoAnimal] = useState(true);
  const [modalRemocaoAberta, setModalRemocaoAberta] = useState(false);

  useEffect(() => {
    async function carregarAnimal() {
      const resposta = await buscarAnimalAdocaoPorId(idAnimal);

      if (!resposta.sucesso || !resposta.animal) {
        setMensagemErro("Animal não encontrado.");
        setCarregandoAnimal(false);
        return;
      }

      setNome(resposta.animal.nome);
      setDescricao(resposta.animal.descricao);
      setIdade(resposta.animal.idade);
      setSexo(resposta.animal.sexo);
      setEspecie(resposta.animal.especie ?? "");
      setTemperamento(resposta.animal.temperamento);
      setImagemBase64(resposta.animal.imagemBase64 ?? "");
      setNomeImagem(resposta.animal.nomeImagem ?? "");
      setCarregandoAnimal(false);
    }

    carregarAnimal();
  }, [idAnimal]);

  function validarFormulario() {
    if (!nome.trim()) {
      return "Informe o nome do animal.";
    }

    if (!descricao.trim()) {
      return "Informe uma descrição sobre o animal.";
    }

    if (!idade.trim()) {
      return "Informe a idade do animal.";
    }

    if (!sexo.trim()) {
      return "Selecione o sexo do animal.";
    }

    if (!especie.trim()) {
      return "Selecione o tipo do animal.";
    }

    if (!temperamento.trim()) {
      return "Informe o temperamento do animal.";
    }

    return "";
  }

  function cancelarEdicao() {
    router.push("/admin/adocao/editar");
  }

  async function confirmarRemocaoAnimal() {
    setMensagemErro("");
    setMensagemSucesso("");

    try {
      setCarregando(true);

      const resposta = await removerAnimalAdocao(idAnimal);

      if (!resposta.sucesso) {
        setMensagemErro(resposta.mensagem ?? "Não foi possível remover.");
        return;
      }

      setMensagemSucesso("Animal removido com sucesso.");
      setModalRemocaoAberta(false);

      setTimeout(() => {
        router.push("/admin/adocao/editar");
      }, 500);
    } catch {
      setMensagemErro("Erro ao remover o animal. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  async function enviarFormulario(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMensagemErro("");
    setMensagemSucesso("");

    const erro = validarFormulario();

    if (erro) {
      setMensagemErro(erro);
      return;
    }

    const dadosAnimal: DadosAnimalAdocao = {
      id: idAnimal,
      nome,
      descricao,
      idade,
      sexo,
      especie,
      temperamento,
      imagemBase64,
      nomeImagem,
    };

    try {
      setCarregando(true);

      const resposta = await atualizarAnimalAdocao(idAnimal, dadosAnimal);

      if (!resposta.sucesso) {
        setMensagemErro(resposta.mensagem ?? "Não foi possível atualizar.");
        return;
      }

      setMensagemSucesso("Animal atualizado com sucesso.");

      setTimeout(() => {
        router.push("/admin/adocao/editar");
      }, 600);
    } catch {
      setMensagemErro("Erro ao atualizar o animal. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  if (carregandoAnimal) {
    return (
      <main className="flex min-h-screen items-center justify-center border-[3px] border-[#202020] bg-[#fde5ed] px-4 py-8">
        <div className="rounded-[8px] bg-white px-8 py-6 text-[14px] text-[#252525] shadow-[6px_6px_0_#f8a2bd]">
          Carregando animal...
        </div>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center border-[3px] border-[#202020] bg-[#fde5ed] px-4 py-8">
      <section className="w-full max-w-[840px] rounded-[6px] bg-white px-[16px] pb-[14px] pt-[14px] shadow-[8px_8px_0_#f8a2bd] lg:w-[58vw] xl:w-[54vw] 2xl:w-[50vw]">
        <form
          onSubmit={enviarFormulario}
          className="flex min-h-[470px] flex-col rounded-[4px] bg-white"
        >
          <h1 className="mb-[18px] ml-[2px] text-[13px] font-medium uppercase tracking-[0.2px] text-[#252525]">
            Editar - Adoção
          </h1>

          <div className="flex flex-col gap-[20px]">
            <CampoTextoAdocao
              id="nome"
              label="Nome do animal"
              valor={nome}
              placeholder="Edite aqui o nome do animal"
              onChange={setNome}
            />

            <CampoAreaTextoAdocao
              id="descricao"
              label="Sobre o animal"
              valor={descricao}
              placeholder="Edite aqui o texto sobre o animal"
              onChange={setDescricao}
            />

            <div className="grid grid-cols-[140px_1fr] gap-x-[36px] gap-y-[18px] max-md:grid-cols-1">
              <div className="flex flex-col gap-[18px]">
                <CampoTextoAdocao
                  id="idade"
                  label="Idade do animal"
                  tipo="number"
                  valor={idade}
                  placeholder=""
                  largura="w-full"
                  onChange={setIdade}
                />

                <CampoSelectAdocao
                  id="sexo"
                  label="Sexo do animal"
                  valor={sexo}
                  largura="w-full"
                  opcoes={opcoesSexoAnimal}
                  onChange={setSexo}
                />

                <CampoSelectAdocao
                  id="especie"
                  label="Tipo do animal"
                  valor={especie}
                  largura="w-full"
                  opcoes={opcoesEspecieAnimal}
                  onChange={setEspecie}
                />
              </div>

              <div className="flex flex-col justify-end">
                <div className="grid grid-cols-[minmax(260px,320px)_1fr] items-end gap-[80px] max-lg:gap-[40px] max-md:grid-cols-1 max-md:gap-[20px]">
                  <CampoTextoAdocao
                    id="temperamento"
                    label="Temperamento do animal"
                    valor={temperamento}
                    placeholder="Edite aqui o temperamento do animal"
                    onChange={setTemperamento}
                  />

                  <div className="flex items-end">
                    <CampoUploadImagemAdocao
                      nomeImagem={nomeImagem}
                      onImagemSelecionada={(arquivo, imagem) => {
                        setNomeImagem(arquivo.name);
                        setImagemBase64(imagem);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {(mensagemErro || mensagemSucesso) && (
            <p
              className={`mt-4 text-center text-[13px] font-medium ${mensagemErro ? "text-red-600" : "text-green-600"
                }`}
            >
              {mensagemErro || mensagemSucesso}
            </p>
          )}

          <div className="mt-auto flex justify-between gap-[12px] pt-[22px] max-sm:flex-col">
            <button
              type="button"
              onClick={() => setModalRemocaoAberta(true)}
              disabled={carregando}
              className="h-[34px] w-[150px] rounded-[7px] border border-[#f8a2bd] bg-white text-[15px] font-bold uppercase text-[#f8a2bd] shadow-[1px_2px_3px_rgba(0,0,0,0.16)] transition hover:bg-[#fff4f8] disabled:cursor-not-allowed disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#f8a2bd]/50 max-sm:w-full"
            >
              Remover
            </button>

            <div className="flex justify-end gap-[12px] max-sm:flex-col">
              <button
                type="button"
                onClick={cancelarEdicao}
                className="h-[34px] w-[150px] rounded-[7px] bg-[#f8a2bd] text-[15px] font-bold uppercase text-white shadow-[1px_2px_3px_rgba(0,0,0,0.20)] transition hover:bg-[#f58dac] focus:outline-none focus:ring-2 focus:ring-[#f8a2bd]/50 max-sm:w-full"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={carregando}
                className="h-[34px] w-[150px] rounded-[7px] bg-[#f8a2bd] text-[15px] font-bold uppercase text-white shadow-[1px_2px_3px_rgba(0,0,0,0.20)] transition hover:bg-[#f58dac] disabled:cursor-not-allowed disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#f8a2bd]/50 max-sm:w-full"
              >
                {carregando ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </form>
      </section>

      {modalRemocaoAberta && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
          <div className="w-full max-w-[410px] rounded-[10px] border border-[#f8a2bd] bg-white px-6 py-6 shadow-[4px_5px_10px_rgba(0,0,0,0.25)]">
            <h2 className="text-center text-[20px] font-bold uppercase text-[#252525]">
              Remover animal
            </h2>

            <p className="mt-4 text-center text-[14px] font-light leading-[1.5] text-[#252525]">
              Tem certeza que deseja remover este animal da página de adoção?
            </p>

            <div className="mt-6 flex justify-center gap-3 max-sm:flex-col">
              <button
                type="button"
                onClick={() => setModalRemocaoAberta(false)}
                disabled={carregando}
                className="h-[34px] w-[140px] rounded-[7px] border border-[#f8a2bd] bg-white text-[14px] font-bold uppercase text-[#f8a2bd] shadow-[1px_2px_3px_rgba(0,0,0,0.14)] transition hover:bg-[#fff4f8] disabled:opacity-70 max-sm:w-full"
              >
                Voltar
              </button>

              <button
                type="button"
                onClick={confirmarRemocaoAnimal}
                disabled={carregando}
                className="h-[34px] w-[140px] rounded-[7px] bg-[#f8a2bd] text-[14px] font-bold uppercase text-white shadow-[1px_2px_3px_rgba(0,0,0,0.20)] transition hover:bg-[#f58dac] disabled:cursor-not-allowed disabled:opacity-70 max-sm:w-full"
              >
                {carregando ? "Removendo..." : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}