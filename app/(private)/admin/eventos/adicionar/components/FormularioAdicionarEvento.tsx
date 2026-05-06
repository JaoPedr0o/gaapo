"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { cadastrarEventoAdmin } from "../../services/eventos-admin-service";
import type { DadosEventoAdmin } from "../../types/evento-admin";
import CampoAreaTextoEvento from "./CampoAreaTextoEvento";
import CampoTextoEvento from "./CampoTextoEvento";
import CampoUploadImagemEvento from "./CampoUploadImagemEvento";

export default function FormularioAdicionarEvento() {
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

    function limparFormulario() {
        setNome("");
        setDescricao("");
        setData("");
        setHorario("");
        setLocal("");
        setImagemBase64("");
        setNomeImagem("");
    }

    function cancelarCadastro() {
        router.push("/admin/eventos");
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

            const resposta = await cadastrarEventoAdmin(dadosEvento);

            if (!resposta.sucesso) {
                setMensagemErro(resposta.mensagem ?? "Não foi possível cadastrar.");
                return;
            }

            setMensagemSucesso("Evento cadastrado com sucesso.");
            limparFormulario();

            setTimeout(() => {
                router.push("/admin/eventos/editar");
            }, 600);
        } catch {
            setMensagemErro("Erro ao cadastrar o evento. Tente novamente.");
        } finally {
            setCarregando(false);
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center  -[#202020] bg-[#d9f5fa] px-4 py-8">
            <section className="w-full max-w-[820px] rounded-[6px] bg-white px-[16px] pb-[14px] pt-[14px] shadow-[8px_8px_0_#52c4d7] lg:w-[58vw] xl:w-[52vw] 2xl:w-[50vw]">
                <form
                    onSubmit={enviarFormulario}
                    className="flex min-h-[430px] flex-col rounded-[4px] bg-white"
                >
                    <h1 className="mb-[18px] ml-[2px] text-[13px] font-medium uppercase tracking-[0.2px] text-[#252525]">
                        Adicionar - Evento
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

                    <div className="mt-auto flex justify-end gap-[12px] pt-[22px] max-sm:flex-col">
                        <button
                            type="button"
                            onClick={cancelarCadastro}
                            className="h-[34px] w-[150px] rounded-[7px] bg-[#52c4d7] text-[15px] font-bold uppercase text-white shadow-[1px_2px_3px_rgba(0,0,0,0.20)] transition hover:bg-[#40b8cc] focus:outline-none focus:ring-2 focus:ring-[#52c4d7]/50 max-sm:w-full"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={carregando}
                            className="h-[34px] w-[150px] rounded-[7px] bg-[#52c4d7] text-[15px] font-bold uppercase text-white shadow-[1px_2px_3px_rgba(0,0,0,0.20)] transition hover:bg-[#40b8cc] disabled:cursor-not-allowed disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#52c4d7]/50 max-sm:w-full"
                        >
                            {carregando ? "Salvando..." : "Adicionar"}
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
}