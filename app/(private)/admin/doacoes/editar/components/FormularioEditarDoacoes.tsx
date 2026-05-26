"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  buscarDadosDoacoesAdmin,
  salvarDadosDoacoesAdmin,
} from "../../services/doacoes-admin-service";

export default function FormularioEditarDoacoes() {
  const router = useRouter();

  const [chavePix, setChavePix] = useState("");
  const [numeroContaBancaria, setNumeroContaBancaria] = useState("");
  const [textoInformativo, setTextoInformativo] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [carregandoDados, setCarregandoDados] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      const resposta = await buscarDadosDoacoesAdmin();

      if (resposta.sucesso && resposta.dados) {
        setChavePix(resposta.dados.chavePix);
        setNumeroContaBancaria(resposta.dados.numeroContaBancaria);
        setTextoInformativo(resposta.dados.textoInformativo);
      }

      setCarregandoDados(false);
    }

    carregarDados();
  }, []);

  function cancelarEdicao() {
    router.push("/admin/doacoes");
  }

  function validarFormulario() {
    if (!chavePix.trim()) {
      return "Informe a chave PIX.";
    }

    if (!numeroContaBancaria.trim()) {
      return "Informe o número da conta bancária.";
    }

    if (!textoInformativo.trim()) {
      return "Informe o texto da seção.";
    }

    return "";
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

    try {
      setCarregando(true);

      const resposta = await salvarDadosDoacoesAdmin({
        chavePix,
        numeroContaBancaria,
        textoInformativo,
      });

      if (!resposta.sucesso) {
        setMensagemErro(
          resposta.mensagem ?? "Não foi possível salvar as informações."
        );
        return;
      }

      setMensagemSucesso("Informações salvas com sucesso.");

      setTimeout(() => {
        router.push("/admin/doacoes");
      }, 500);
    } catch {
      setMensagemErro("Erro ao salvar as informações. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  if (carregandoDados) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fff5cf] fundo-forminhas-admin px-4 py-8">
        <div className="rounded-[8px] bg-white px-8 py-6 text-[14px] text-[#252525] shadow-[6px_6px_0_#f5bd00]">
          Carregando informações...
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fff5cf] fundo-forminhas-admin px-4 py-8">
      <section className="w-full max-w-[920px] rounded-[6px] bg-white px-[14px] pb-[14px] pt-[14px] shadow-[8px_8px_0_#f5bd00] lg:w-[62vw] xl:w-[56vw] 2xl:w-[52vw]">
        <form
          onSubmit={enviarFormulario}
          className="flex min-h-[360px] flex-col rounded-[4px] bg-white"
        >
          <h1 className="mb-[18px] ml-[2px] text-[13px] font-medium uppercase tracking-[0.2px] text-[#252525]">
            Editar Informações - Doação
          </h1>

          <div className="flex flex-col gap-[18px]">
            <div className="relative w-full">
              <label
                htmlFor="chavePix"
                className="absolute -top-[10px] left-[13px] bg-white px-2 text-[12px] font-light text-[#252525]"
              >
                Chave PIX
              </label>

              <input
                id="chavePix"
                name="chavePix"
                type="text"
                value={chavePix}
                placeholder="Insira aqui a Chave PIX"
                onChange={(event) => setChavePix(event.target.value)}
                className="h-[48px] w-full rounded-[8px] border border-[#f5bd00] bg-white px-4 text-[13px] font-light text-[#252525] shadow-[1px_2px_3px_rgba(0,0,0,0.15)] outline-none placeholder:text-[#9d9d9d] focus:border-[#e5b000] focus:ring-2 focus:ring-[#f5bd00]/30"
              />
            </div>

            <div className="relative w-full">
              <label
                htmlFor="numeroContaBancaria"
                className="absolute -top-[10px] left-[13px] bg-white px-2 text-[12px] font-light text-[#252525]"
              >
                Número Conta Bancária
              </label>

              <input
                id="numeroContaBancaria"
                name="numeroContaBancaria"
                type="text"
                value={numeroContaBancaria}
                placeholder="Insira aqui o número da Conta Bancária"
                onChange={(event) => setNumeroContaBancaria(event.target.value)}
                className="h-[48px] w-full rounded-[8px] border border-[#f5bd00] bg-white px-4 text-[13px] font-light text-[#252525] shadow-[1px_2px_3px_rgba(0,0,0,0.15)] outline-none placeholder:text-[#9d9d9d] focus:border-[#e5b000] focus:ring-2 focus:ring-[#f5bd00]/30"
              />
            </div>

            <div className="relative w-full">
              <label
                htmlFor="textoInformativo"
                className="absolute -top-[10px] left-[13px] bg-white px-2 text-[12px] font-light text-[#252525]"
              >
                Alterar texto
              </label>

              <input
                id="textoInformativo"
                name="textoInformativo"
                type="text"
                value={textoInformativo}
                placeholder="Insira aqui o texto"
                onChange={(event) => setTextoInformativo(event.target.value)}
                className="h-[48px] w-full rounded-[8px] border border-[#f5bd00] bg-white px-4 text-[13px] font-light text-[#252525] shadow-[1px_2px_3px_rgba(0,0,0,0.15)] outline-none placeholder:text-[#9d9d9d] focus:border-[#e5b000] focus:ring-2 focus:ring-[#f5bd00]/30"
              />
            </div>
          </div>

          {(mensagemErro || mensagemSucesso) && (
            <p
              className={`mt-4 text-center text-[13px] font-medium ${
                mensagemErro ? "text-red-600" : "text-green-600"
              }`}
            >
              {mensagemErro || mensagemSucesso}
            </p>
          )}

          <div className="mt-auto flex justify-end gap-[10px] pt-[24px] max-sm:flex-col">
            <button
              type="button"
              onClick={cancelarEdicao}
              className="h-[38px] w-[150px] rounded-[7px] bg-[#f5bd00] text-[15px] font-bold uppercase text-white shadow-[1px_2px_3px_rgba(0,0,0,0.20)] transition hover:bg-[#e5b000] focus:outline-none focus:ring-2 focus:ring-[#f5bd00]/50 max-sm:w-full"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={carregando}
              className="h-[38px] w-[150px] rounded-[7px] bg-[#f5bd00] text-[15px] font-bold uppercase text-white shadow-[1px_2px_3px_rgba(0,0,0,0.20)] transition hover:bg-[#e5b000] disabled:cursor-not-allowed disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#f5bd00]/50 max-sm:w-full"
            >
              {carregando ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}