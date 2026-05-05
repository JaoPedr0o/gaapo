"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import CampoTextoPrestacaoContas from "./CampoTextoPrestacaoContas";
import CampoUploadDocumentoPrestacaoContas from "./CampoUploadDocumentoPrestacaoContas";
import { salvarPrestacaoContasAdmin } from "../../services/prestacao-contas-admin-service";
import type { DadosPrestacaoContasAdmin } from "../../types/prestacao-contas-admin";

export default function FormularioAdicionarPrestacaoContas() {
    const router = useRouter();

    const [titulo, setTitulo] = useState("");
    const [dataDocumento, setDataDocumento] = useState("");
    const [documentoBase64, setDocumentoBase64] = useState("");
    const [nomeDocumento, setNomeDocumento] = useState("");
    const [mensagemErro, setMensagemErro] = useState("");
    const [mensagemSucesso, setMensagemSucesso] = useState("");
    const [carregando, setCarregando] = useState(false);

    function validarFormulario() {
        if (!titulo.trim()) {
            return "Informe o título do documento.";
        }

        if (!dataDocumento.trim()) {
            return "Informe a data do documento.";
        }

        if (!documentoBase64.trim()) {
            return "Anexe um documento PDF.";
        }

        return "";
    }

    function cancelarCadastro() {
        router.push("/admin/prestacao-de-contas");
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

        const dadosDocumento: DadosPrestacaoContasAdmin = {
            titulo,
            dataDocumento,
            documentoBase64,
            nomeDocumento,
        };

        try {
            setCarregando(true);

            const resposta = await salvarPrestacaoContasAdmin(dadosDocumento);

            if (!resposta.sucesso) {
                setMensagemErro(resposta.mensagem ?? "Não foi possível salvar.");
                return;
            }

            setMensagemSucesso("Relatório salvo com sucesso.");

            setTimeout(() => {
                router.push("/admin/prestacao-de-contas");
            }, 600);
        } catch {
            setMensagemErro("Erro ao salvar o relatório. Tente novamente.");
        } finally {
            setCarregando(false);
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center border-[3px] border-[#202020] bg-[#fceefd] px-4 py-8">
            <section className="w-full max-w-[860px] rounded-[6px] bg-white px-[16px] pb-[14px] pt-[14px] shadow-[8px_8px_0_#b75fc1] lg:w-[58vw] xl:w-[52vw] 2xl:w-[50vw]">
                <form
                    onSubmit={enviarFormulario}
                    className="flex min-h-[270px] flex-col rounded-[4px] bg-white"
                >
                    <h1 className="mb-[18px] ml-[2px] text-[13px] font-medium uppercase tracking-[0.2px] text-[#252525]">
                        Adicionar - Prestação de Contas
                    </h1>

                    <div className="flex flex-col gap-[20px]">
                        <CampoTextoPrestacaoContas
                            id="titulo"
                            label="Título"
                            valor={titulo}
                            placeholder="Insira aqui o título do documento"
                            onChange={setTitulo}
                        />

                        <CampoTextoPrestacaoContas
                            id="dataDocumento"
                            label="Data do documento"
                            tipo="date"
                            valor={dataDocumento}
                            placeholder="dd/mm/aaaa"
                            largura="w-[180px] max-sm:w-full"
                            onChange={setDataDocumento}
                        />

                        <CampoUploadDocumentoPrestacaoContas
                            nomeDocumento={nomeDocumento}
                            onDocumentoSelecionado={(arquivo, documento) => {
                                setNomeDocumento(arquivo.name);
                                setDocumentoBase64(documento);
                            }}
                        />
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
                            className="h-[34px] w-[150px] rounded-[7px] bg-[#b75fc1] text-[15px] font-bold uppercase text-white shadow-[1px_2px_3px_rgba(0,0,0,0.20)] transition hover:bg-[#a94fb4] focus:outline-none focus:ring-2 focus:ring-[#b75fc1]/50 max-sm:w-full"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={carregando}
                            className="h-[34px] w-[150px] rounded-[7px] bg-[#b75fc1] text-[15px] font-bold uppercase text-white shadow-[1px_2px_3px_rgba(0,0,0,0.20)] transition hover:bg-[#a94fb4] disabled:cursor-not-allowed disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#b75fc1]/50 max-sm:w-full"
                        >
                            {carregando ? "Salvando..." : "Adicionar"}
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
}