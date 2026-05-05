"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { cadastrarAnimalAdocao } from "../../services/adocao-admin-service";
import CampoAreaTextoAdocao from "./CampoAreaTextoAdocao";
import CampoSelectAdocao from "./CampoSelectAdocao";
import CampoTextoAdocao from "./CampoTextoAdocao";
import CampoUploadImagemAdocao from "./CampoUploadImagemAdocao";
import type { DadosAnimalAdocao } from "../../types/animal-adocao";

const opcoesSexoAnimal = [
    {
        label: "Macho",
        valor: "macho",
    },
    {
        label: "Fêmea",
        valor: "femea",
    },
];

export default function FormularioAdicionarAdocao() {
    const router = useRouter();

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [idade, setIdade] = useState("");
    const [sexo, setSexo] = useState("");
    const [temperamento, setTemperamento] = useState("");
    const [imagemBase64, setImagemBase64] = useState("");
    const [nomeImagem, setNomeImagem] = useState("");
    const [mensagemErro, setMensagemErro] = useState("");
    const [mensagemSucesso, setMensagemSucesso] = useState("");
    const [carregando, setCarregando] = useState(false);

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

        if (!temperamento.trim()) {
            return "Informe o temperamento do animal.";
        }

        return "";
    }

    function limparFormulario() {
        setNome("");
        setDescricao("");
        setIdade("");
        setSexo("");
        setTemperamento("");
        setImagemBase64("");
        setNomeImagem("");
    }

    function cancelarCadastro() {
        router.push("/admin/adocao");
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
            nome,
            descricao,
            idade,
            sexo,
            temperamento,
            imagemBase64,
            nomeImagem,
        };

        try {
            setCarregando(true);

            const resposta = await cadastrarAnimalAdocao(dadosAnimal);

            if (!resposta.sucesso) {
                setMensagemErro(resposta.mensagem ?? "Não foi possível cadastrar.");
                return;
            }

            setMensagemSucesso("Animal cadastrado com sucesso.");
            limparFormulario();
        } catch {
            setMensagemErro("Erro ao cadastrar o animal. Tente novamente.");
        } finally {
            setCarregando(false);
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center border-[3px] border-[#202020] bg-[#fde5ed] px-4 py-8">
            <section className="w-full max-w-[820px] rounded-[6px] bg-white px-[16px] pb-[14px] pt-[14px] shadow-[8px_8px_0_#f8a2bd] lg:w-[58vw] xl:w-[52vw] 2xl:w-[50vw]">
                <form
                    onSubmit={enviarFormulario}
                    className="flex min-h-[430px] flex-col rounded-[4px] bg-white"
                >
                    <h1 className="mb-[18px] ml-[2px] text-[13px] font-medium uppercase tracking-[0.2px] text-[#252525]">
                        Adicionar - Adoção
                    </h1>

                    <div className="flex flex-col gap-[21px]">
                        <CampoTextoAdocao
                            id="nome"
                            label="Nome do animal"
                            valor={nome}
                            placeholder="Insira aqui o nome do animal"
                            onChange={setNome}
                        />

                        <CampoAreaTextoAdocao
                            id="descricao"
                            label="Sobre o animal"
                            valor={descricao}
                            placeholder="Insira aqui um texto sobre o animal"
                            onChange={setDescricao}
                        />

                        <div className="flex flex-col gap-[18px]">
                            <CampoTextoAdocao
                                id="idade"
                                label="Idade do animal"
                                tipo="number"
                                valor={idade}
                                placeholder=""
                                largura="w-[116px] max-sm:w-full"
                                onChange={setIdade}
                            />

                            <CampoSelectAdocao
                                id="sexo"
                                label="Sexo do animal"
                                valor={sexo}
                                largura="w-[116px] max-sm:w-full"
                                opcoes={opcoesSexoAnimal}
                                onChange={setSexo}
                            />
                        </div>

                        <div className="grid grid-cols-[minmax(260px,350px)_1fr] items-end gap-[110px] max-lg:gap-[60px] max-md:grid-cols-1 max-md:gap-[20px]">
                            <CampoTextoAdocao
                                id="temperamento"
                                label="Temperamento do animal"
                                valor={temperamento}
                                placeholder="Insira aqui o temperamento do animal"
                                onChange={setTemperamento}
                            />

                            <CampoUploadImagemAdocao
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
                            className="h-[34px] w-[150px] rounded-[7px] bg-[#f8a2bd] text-[15px] font-bold uppercase text-white shadow-[1px_2px_3px_rgba(0,0,0,0.20)] transition hover:bg-[#f58dac] focus:outline-none focus:ring-2 focus:ring-[#f8a2bd]/50 max-sm:w-full"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={carregando}
                            className="h-[34px] w-[150px] rounded-[7px] bg-[#f8a2bd] text-[15px] font-bold uppercase text-white shadow-[1px_2px_3px_rgba(0,0,0,0.20)] transition hover:bg-[#f58dac] disabled:cursor-not-allowed disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#f8a2bd]/50 max-sm:w-full"
                        >
                            {carregando ? "Salvando..." : "Adicionar"}
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
}
