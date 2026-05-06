"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  atualizarEventoAdmin,
  buscarEventoAdminPorId,
  removerEventoAdmin,
} from "../../../services/eventos-admin-service";
import type { DadosEventoAdmin } from "../../../types/evento-admin";
import CampoAreaTextoEvento from "../../../adicionar/components/CampoAreaTextoEvento";
import CampoTextoEvento from "../../../adicionar/components/CampoTextoEvento";
import CampoUploadImagemEvento from "../../../adicionar/components/CampoUploadImagemEvento";

type FormularioEditarEventoProps = {
  idEvento: string;
};

export default function FormularioEditarEvento({
  idEvento,
}: FormularioEditarEventoProps) {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [local, setLocal] = useState("");
  const [imagemBase64, setImagemBase64] = useState("");
  const [nomeImagem, setNomeImagem] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [carregandoEvento, setCarregandoEvento] = useState(true);
  const [modalRemocaoAberta, setModalRemocaoAberta] = useState(false);

  useEffect(() => {
    async function carregarEvento() {
      const resposta = await buscarEventoAdminPorId(idEvento);

      if (!resposta.sucesso || !resposta.evento) {
        setMensagemErro("Evento não encontrado.");
        setCarregandoEvento(false);
        return;
      }

      setNome(resposta.evento.nome);
      setDescricao(resposta.evento.descricao);
      setData(resposta.evento.data);
      setHorario(resposta.evento.horario);
      setLocal(resposta.evento.local);
      setImagemBase64(resposta.evento.imagemBase64 ?? "");
      setNomeImagem(resposta.evento.nomeImagem ?? "");
      setCarregandoEvento(false);
    }

    carregarEvento();
  }, [idEvento]);

  function validarFormulario() {
    if (!nome.trim()) {
      return "Informe o nome do evento.";
    }

    if (!descricao.trim()) {
      return "Informe uma descrição sobre o evento.";
    }

    if (!data.trim()) {
      return "Informe a data do evento.";
    }

    if (!horario.trim()) {
      return "Informe o horário do evento.";
    }

    if (!local.trim()) {
      return "Informe o local do evento.";
    }

    return "";
  }

  function cancelarEdicao() {
    router.push("/admin/eventos/editar");
  }

  async function confirmarRemocaoEvento() {
    setMensagemErro("");
    setMensagemSucesso("");

    try {
      setCarregando(true);

      const resposta = await removerEventoAdmin(idEvento);

      if (!resposta.sucesso) {
        setMensagemErro(resposta.mensagem ?? "Não foi possível remover.");
        return;
      }

      setMensagemSucesso("Evento removido com sucesso.");
      setModalRemocaoAberta(false);

      setTimeout(() => {
        router.push("/admin/eventos/editar");
      }, 500);
    } catch {
      setMensagemErro("Erro ao remover o evento. Tente novamente.");
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

    const dadosEvento: DadosEventoAdmin = {
      id: idEvento,
      nome,
      descricao,
      data,
      horario,
      local,
      imagemBase64,
      nomeImagem,
    };

    try {
      setCarregando(true);

      const resposta = await atualizarEventoAdmin(idEvento, dadosEvento);

      if (!resposta.sucesso) {
        setMensagemErro(resposta.mensagem ?? "Não foi possível atualizar.");
        return;
      }

      setMensagemSucesso("Evento atualizado com sucesso.");

      setTimeout(() => {
        router.push("/admin/eventos/editar");
      }, 600);
    } catch {
      setMensagemErro("Erro ao atualizar o evento. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  if (carregandoEvento) {
    return (
      <main className="flex min-h-screen items-center justify-center  -[#202020] bg-[#d9f5fa] px-4 py-8">
        <div className="rounded-[8px] bg-white px-8 py-6 text-[14px] text-[#252525] shadow-[6px_6px_0_#52c4d7]">
          Carregando evento...
        </div>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center  -[#202020] bg-[#d9f5fa] px-4 py-8">
      <section className="w-full max-w-[820px] rounded-[6px] bg-white px-[16px] pb-[14px] pt-[14px] shadow-[8px_8px_0_#52c4d7] lg:w-[58vw] xl:w-[52vw] 2xl:w-[50vw]">
        <form
          onSubmit={enviarFormulario}
          className="flex min-h-[430px] flex-col rounded-[4px] bg-white"
        >
          <h1 className="mb-[18px] ml-[2px] text-[13px] font-medium uppercase tracking-[0.2px] text-[#252525]">
            Editar - Evento
          </h1>

          <div className="flex flex-col gap-[21px]">
            <CampoTextoEvento
              id="nome"
              label="Nome do evento"
              valor={nome}
              placeholder="Insira aqui o nome do evento"
              onChange={setNome}
            />

            <CampoAreaTextoEvento
              id="descricao"
              label="Sobre o evento"
              valor={descricao}
              placeholder="Insira aqui o texto sobre o evento"
              onChange={setDescricao}
            />

            <div className="flex flex-col gap-[18px]">
              <CampoTextoEvento
                id="data"
                label="Data do evento"
                tipo="date"
                valor={data}
                placeholder="dd/mm/aaaa"
                largura="w-[130px] max-sm:w-full"
                onChange={setData}
              />

              <CampoTextoEvento
                id="horario"
                label="Horário do evento"
                tipo="time"
                valor={horario}
                placeholder="00:00"
                largura="w-[130px] max-sm:w-full"
                onChange={setHorario}
              />
            </div>

            <div className="grid grid-cols-[minmax(260px,350px)_1fr] items-end gap-[110px] max-lg:gap-[60px] max-md:grid-cols-1 max-md:gap-[20px]">
              <CampoTextoEvento
                id="local"
                label="Local do evento"
                valor={local}
                placeholder="Insira aqui o local do evento"
                onChange={setLocal}
              />

              <CampoUploadImagemEvento
                nomeImagem={nomeImagem}
                onImagemSelecionada={(arquivo, imagem) => {
                  setNomeImagem(arquivo.name);
                  setImagemBase64(imagem);
                }}
              />
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
              className="h-[34px] w-[150px] rounded-[7px] border border-[#52c4d7] bg-white text-[15px] font-bold uppercase text-[#52c4d7] shadow-[1px_2px_3px_rgba(0,0,0,0.16)] transition hover:bg-[#eefcff] disabled:cursor-not-allowed disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#52c4d7]/50 max-sm:w-full"
            >
              Remover
            </button>

            <div className="flex justify-end gap-[12px] max-sm:flex-col">
              <button
                type="button"
                onClick={cancelarEdicao}
                className="h-[34px] w-[150px] rounded-[7px] bg-[#52c4d7] text-[15px] font-bold uppercase text-white shadow-[1px_2px_3px_rgba(0,0,0,0.20)] transition hover:bg-[#40b8cc] focus:outline-none focus:ring-2 focus:ring-[#52c4d7]/50 max-sm:w-full"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={carregando}
                className="h-[34px] w-[150px] rounded-[7px] bg-[#52c4d7] text-[15px] font-bold uppercase text-white shadow-[1px_2px_3px_rgba(0,0,0,0.20)] transition hover:bg-[#40b8cc] disabled:cursor-not-allowed disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#52c4d7]/50 max-sm:w-full"
              >
                {carregando ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </form>
      </section>

      {modalRemocaoAberta && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
          <div className="w-full max-w-[410px] rounded-[10px] border border-[#52c4d7] bg-white px-6 py-6 shadow-[4px_5px_10px_rgba(0,0,0,0.25)]">
            <h2 className="text-center text-[20px] font-bold uppercase text-[#252525]">
              Remover evento
            </h2>

            <p className="mt-4 text-center text-[14px] font-light leading-[1.5] text-[#252525]">
              Tem certeza que deseja remover este evento da página de eventos?
            </p>

            <div className="mt-6 flex justify-center gap-3 max-sm:flex-col">
              <button
                type="button"
                onClick={() => setModalRemocaoAberta(false)}
                disabled={carregando}
                className="h-[34px] w-[140px] rounded-[7px] border border-[#52c4d7] bg-white text-[14px] font-bold uppercase text-[#52c4d7] shadow-[1px_2px_3px_rgba(0,0,0,0.14)] transition hover:bg-[#eefcff] disabled:opacity-70 max-sm:w-full"
              >
                Voltar
              </button>

              <button
                type="button"
                onClick={confirmarRemocaoEvento}
                disabled={carregando}
                className="h-[34px] w-[140px] rounded-[7px] bg-[#52c4d7] text-[14px] font-bold uppercase text-white shadow-[1px_2px_3px_rgba(0,0,0,0.20)] transition hover:bg-[#40b8cc] disabled:cursor-not-allowed disabled:opacity-70 max-sm:w-full"
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