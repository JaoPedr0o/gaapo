"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { cadastrarPrestacaoContasAdmin } from "../../services/prestacao-contas-admin-service";
import type { DadosPrestacaoContasAdmin } from "../../types/prestacao-contas-admin";

const meses = [
  { label: "Janeiro", valor: "01" },
  { label: "Fevereiro", valor: "02" },
  { label: "Março", valor: "03" },
  { label: "Abril", valor: "04" },
  { label: "Maio", valor: "05" },
  { label: "Junho", valor: "06" },
  { label: "Julho", valor: "07" },
  { label: "Agosto", valor: "08" },
  { label: "Setembro", valor: "09" },
  { label: "Outubro", valor: "10" },
  { label: "Novembro", valor: "11" },
  { label: "Dezembro", valor: "12" },
];

export default function FormularioAdicionarPrestacaoPdf() {
  const router = useRouter();

  const [titulo, setTitulo] = useState("");
  const [mesReferencia, setMesReferencia] = useState("");
  const [anoReferencia, setAnoReferencia] = useState("");
  const [descricao, setDescricao] = useState("");
  const [documentoBase64, setDocumentoBase64] = useState("");
  const [nomeDocumento, setNomeDocumento] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  function cancelarCadastro() {
    router.push("/admin/prestacao-de-contas/adicionar");
  }

  function validarFormulario() {
    if (!titulo.trim()) {
      return "Informe o título da prestação de contas.";
    }

    if (!mesReferencia.trim()) {
      return "Selecione o mês de referência.";
    }

    if (!anoReferencia.trim()) {
      return "Informe o ano de referência.";
    }

    if (!descricao.trim()) {
      return "Informe uma descrição curta.";
    }

    if (!documentoBase64.trim()) {
      return "Anexe o documento PDF.";
    }

    return "";
  }

  function converterDocumentoParaBase64(arquivo: File) {
    const leitor = new FileReader();

    leitor.onload = () => {
      const resultado = leitor.result;

      if (typeof resultado === "string") {
        setNomeDocumento(arquivo.name);
        setDocumentoBase64(resultado);
      }
    };

    leitor.onerror = () => {
      setMensagemErro("Não foi possível carregar o documento.");
    };

    leitor.readAsDataURL(arquivo);
  }

  function aoSelecionarDocumento(event: React.ChangeEvent<HTMLInputElement>) {
    setMensagemErro("");

    const arquivo = event.target.files?.[0];

    if (!arquivo) {
      return;
    }

    if (arquivo.type !== "application/pdf") {
      setMensagemErro("Anexe apenas arquivos em PDF.");
      event.target.value = "";
      return;
    }

    const tamanhoEmMb = arquivo.size / 1024 / 1024;

    if (tamanhoEmMb > 5) {
      setMensagemErro(
        "O PDF deve ter no máximo 5MB enquanto estivermos salvando localmente."
      );
      event.target.value = "";
      return;
    }

    converterDocumentoParaBase64(arquivo);
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

    const dadosPrestacao: DadosPrestacaoContasAdmin = {
      tipoCadastro: "pdf",
      titulo,
      mesReferencia,
      anoReferencia,
      descricao,
      valorRecebido: "0",
      valorGasto: "0",
      saldoFinal: "0",
      movimentacoes: [],
      documentoBase64,
      nomeDocumento,
      dataCadastro: new Date().toISOString(),
    };

    try {
      setCarregando(true);

      const resposta = await cadastrarPrestacaoContasAdmin(dadosPrestacao);

      if (!resposta.sucesso) {
        setMensagemErro(resposta.mensagem ?? "Não foi possível cadastrar.");
        return;
      }

      setMensagemSucesso("Prestação de contas cadastrada com sucesso.");

      setTimeout(() => {
        router.push("/admin/prestacao-de-contas");
      }, 600);
    } catch {
      setMensagemErro("Erro ao cadastrar a prestação de contas.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center border-[3px] border-[#202020] bg-[#fceefd] fundo-forminhas-admin px-4 py-8">
      <section className="w-full max-w-[900px] rounded-[10px] bg-white px-[18px] pb-[16px] pt-[16px] shadow-[8px_8px_0_#b75fc1] lg:w-[64vw] xl:w-[58vw] 2xl:w-[52vw]">
        <form
          onSubmit={enviarFormulario}
          className="flex min-h-[500px] flex-col rounded-[4px] bg-white"
        >
          <div className="mb-[22px] flex items-center gap-3">
            <span className="h-[32px] w-[6px] rounded-full bg-[#b75fc1]" />

            <div>
              <h1 className="text-[16px] font-bold uppercase tracking-[0.4px] text-[#252525]">
                Anexar PDF - Prestação de Contas
              </h1>

              <p className="mt-[2px] text-[12px] font-light text-[#777]">
                Use esta opção quando o relatório já estiver pronto em PDF.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-[20px]">
            <div className="relative">
              <label
                htmlFor="titulo"
                className="absolute -top-[10px] left-[13px] bg-white px-2 text-[12px] font-light text-[#252525]"
              >
                Título
              </label>

              <input
                id="titulo"
                type="text"
                value={titulo}
                placeholder="Ex: Prestação de contas - Maio/2026"
                onChange={(event) => setTitulo(event.target.value)}
                className="h-[48px] w-full rounded-[8px] border border-[#b75fc1] bg-white px-4 text-[13px] font-light text-[#252525] shadow-[1px_2px_3px_rgba(0,0,0,0.15)] outline-none placeholder:text-[#9d9d9d] focus:border-[#a94fb4] focus:ring-2 focus:ring-[#b75fc1]/30"
              />
            </div>

            <div className="grid grid-cols-[220px_150px_1fr] gap-[18px] max-md:grid-cols-1">
              <div className="relative">
                <label
                  htmlFor="mesReferencia"
                  className="absolute -top-[10px] left-[13px] bg-white px-2 text-[12px] font-light text-[#252525]"
                >
                  Mês de referência
                </label>

                <select
                  id="mesReferencia"
                  value={mesReferencia}
                  onChange={(event) => setMesReferencia(event.target.value)}
                  className="h-[48px] w-full rounded-[8px] border border-[#b75fc1] bg-white px-4 text-[13px] font-light text-[#252525] shadow-[1px_2px_3px_rgba(0,0,0,0.15)] outline-none focus:border-[#a94fb4] focus:ring-2 focus:ring-[#b75fc1]/30"
                >
                  <option value="">Selecione</option>
                  {meses.map((mes) => (
                    <option key={mes.valor} value={mes.valor}>
                      {mes.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <label
                  htmlFor="anoReferencia"
                  className="absolute -top-[10px] left-[13px] bg-white px-2 text-[12px] font-light text-[#252525]"
                >
                  Ano
                </label>

                <input
                  id="anoReferencia"
                  type="number"
                  value={anoReferencia}
                  placeholder="2026"
                  onChange={(event) => setAnoReferencia(event.target.value)}
                  className="h-[48px] w-full rounded-[8px] border border-[#b75fc1] bg-white px-4 text-[13px] font-light text-[#252525] shadow-[1px_2px_3px_rgba(0,0,0,0.15)] outline-none placeholder:text-[#9d9d9d] focus:border-[#a94fb4] focus:ring-2 focus:ring-[#b75fc1]/30"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="documento"
                  className="absolute -top-[10px] left-[13px] bg-white px-2 text-[12px] font-light text-[#252525]"
                >
                  Documento PDF
                </label>

                <label
                  htmlFor="documento"
                  className="flex h-[48px] cursor-pointer items-center rounded-[8px] border border-[#b75fc1] bg-white px-4 text-[13px] font-light text-[#777] shadow-[1px_2px_3px_rgba(0,0,0,0.15)] transition hover:bg-[#fceefd]"
                >
                  <span className="truncate">
                    {nomeDocumento || "Selecionar documento PDF"}
                  </span>
                </label>

                <input
                  id="documento"
                  type="file"
                  accept="application/pdf"
                  onChange={aoSelecionarDocumento}
                  className="hidden"
                />
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="descricao"
                className="absolute -top-[10px] left-[13px] bg-white px-2 text-[12px] font-light text-[#252525]"
              >
                Descrição
              </label>

              <textarea
                id="descricao"
                value={descricao}
                placeholder="Descreva resumidamente o conteúdo deste relatório"
                onChange={(event) => setDescricao(event.target.value)}
                className="h-[120px] w-full resize-none rounded-[8px] border border-[#b75fc1] bg-white px-4 py-5 text-[13px] font-light text-[#252525] shadow-[1px_2px_3px_rgba(0,0,0,0.15)] outline-none placeholder:text-[#9d9d9d] focus:border-[#a94fb4] focus:ring-2 focus:ring-[#b75fc1]/30"
              />
            </div>
          </div>

          {nomeDocumento && (
            <div className="mt-4 rounded-[8px] border border-[#e5b5eb] bg-[#fdf4ff] px-4 py-3 text-[12px] text-[#7e3c88]">
              PDF selecionado: <strong>{nomeDocumento}</strong>
            </div>
          )}

          {(mensagemErro || mensagemSucesso) && (
            <p
              className={`mt-4 text-center text-[13px] font-medium ${
                mensagemErro ? "text-red-600" : "text-green-600"
              }`}
            >
              {mensagemErro || mensagemSucesso}
            </p>
          )}

          <div className="mt-auto flex justify-end gap-[12px] pt-[22px] max-sm:flex-col">
            <button
              type="button"
              onClick={cancelarCadastro}
              className="h-[36px] w-[150px] rounded-[7px] bg-[#b75fc1] text-[15px] font-bold uppercase text-white shadow-[1px_2px_3px_rgba(0,0,0,0.20)] transition hover:bg-[#a94fb4] focus:outline-none focus:ring-2 focus:ring-[#b75fc1]/50 max-sm:w-full"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={carregando}
              className="h-[36px] w-[150px] rounded-[7px] bg-[#b75fc1] text-[15px] font-bold uppercase text-white shadow-[1px_2px_3px_rgba(0,0,0,0.20)] transition hover:bg-[#a94fb4] disabled:cursor-not-allowed disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#b75fc1]/50 max-sm:w-full"
            >
              {carregando ? "Salvando..." : "Adicionar"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}