"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { cadastrarPrestacaoContasAdmin } from "../../services/prestacao-contas-admin-service";
import type {
  DadosPrestacaoContasAdmin,
  MovimentacaoPrestacaoContas,
  TipoMovimentacaoPrestacao,
} from "../../types/prestacao-contas-admin";

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

function gerarIdTemporario() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `movimentacao-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

function converterValorParaNumero(valor: string) {
  const valorLimpo = valor.replace(/\./g, "").replace(",", ".");
  const numero = Number(valorLimpo);

  if (Number.isNaN(numero)) {
    return 0;
  }

  return numero;
}

function formatarMoeda(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function criarMovimentacaoVazia(): MovimentacaoPrestacaoContas {
  return {
    id: gerarIdTemporario(),
    tipo: "entrada",
    data: "",
    categoria: "",
    descricao: "",
    valor: "",
  };
}

export default function FormularioAdicionarPrestacaoManual() {
  const router = useRouter();

  const [titulo, setTitulo] = useState("");
  const [mesReferencia, setMesReferencia] = useState("");
  const [anoReferencia, setAnoReferencia] = useState("");
  const [descricao, setDescricao] = useState("");
  const [movimentacoes, setMovimentacoes] = useState<
    MovimentacaoPrestacaoContas[]
  >([criarMovimentacaoVazia()]);
  const [mensagemErro, setMensagemErro] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  const totais = useMemo(() => {
    const totalEntradas = movimentacoes.reduce((total, movimentacao) => {
      if (movimentacao.tipo !== "entrada") {
        return total;
      }

      return total + converterValorParaNumero(movimentacao.valor);
    }, 0);

    const totalSaidas = movimentacoes.reduce((total, movimentacao) => {
      if (movimentacao.tipo !== "saida") {
        return total;
      }

      return total + converterValorParaNumero(movimentacao.valor);
    }, 0);

    return {
      totalEntradas,
      totalSaidas,
      saldoFinal: totalEntradas - totalSaidas,
    };
  }, [movimentacoes]);

  function cancelarCadastro() {
    router.push("/admin/prestacao-de-contas/adicionar");
  }

  function atualizarMovimentacao(
    id: string,
    campo: keyof MovimentacaoPrestacaoContas,
    valor: string
  ) {
    setMovimentacoes((movimentacoesAtuais) =>
      movimentacoesAtuais.map((movimentacao) => {
        if (movimentacao.id === id) {
          return {
            ...movimentacao,
            [campo]: valor,
          };
        }

        return movimentacao;
      })
    );
  }

  function adicionarMovimentacao() {
    setMovimentacoes((movimentacoesAtuais) => [
      ...movimentacoesAtuais,
      criarMovimentacaoVazia(),
    ]);
  }

  function removerMovimentacao(id: string) {
    setMovimentacoes((movimentacoesAtuais) => {
      if (movimentacoesAtuais.length === 1) {
        return movimentacoesAtuais;
      }

      return movimentacoesAtuais.filter((movimentacao) => movimentacao.id !== id);
    });
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
      return "Informe uma descrição/resumo.";
    }

    if (movimentacoes.length === 0) {
      return "Adicione pelo menos uma movimentação.";
    }

    const movimentacaoIncompleta = movimentacoes.some((movimentacao) => {
      return (
        !movimentacao.tipo.trim() ||
        !movimentacao.data.trim() ||
        !movimentacao.categoria.trim() ||
        !movimentacao.descricao.trim() ||
        !movimentacao.valor.trim()
      );
    });

    if (movimentacaoIncompleta) {
      return "Preencha todos os campos das movimentações.";
    }

    const valorInvalido = movimentacoes.some(
      (movimentacao) => converterValorParaNumero(movimentacao.valor) <= 0
    );

    if (valorInvalido) {
      return "Informe valores válidos maiores que zero.";
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

    const dadosPrestacao: DadosPrestacaoContasAdmin = {
      tipoCadastro: "manual",
      titulo,
      mesReferencia,
      anoReferencia,
      descricao,
      valorRecebido: String(totais.totalEntradas),
      valorGasto: String(totais.totalSaidas),
      saldoFinal: String(totais.saldoFinal),
      movimentacoes,
      documentoBase64: "",
      nomeDocumento: "",
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
      <section className="w-full max-w-[1100px] rounded-[10px] bg-white px-[18px] pb-[16px] pt-[16px] shadow-[8px_8px_0_#b75fc1]">
        <form
          onSubmit={enviarFormulario}
          className="flex min-h-[620px] flex-col rounded-[4px] bg-white"
        >
          <div className="mb-[22px] flex items-center gap-3">
            <span className="h-[32px] w-[6px] rounded-full bg-[#b75fc1]" />

            <div>
              <h1 className="text-[16px] font-bold uppercase tracking-[0.4px] text-[#252525]">
                Montar prestação pelo sistema
              </h1>

              <p className="mt-[2px] text-[12px] font-light text-[#777]">
                Cadastre entradas e saídas. O sistema calcula o resumo
                automaticamente.
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

              <div className="rounded-[8px] border border-[#e5b5eb] bg-[#fdf4ff] px-4 py-3">
                <p className="text-[12px] font-light leading-[1.4] text-[#7e3c88]">
                  Dica: use o mês e ano de referência para organizar o histórico
                  dos relatórios.
                </p>
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="descricao"
                className="absolute -top-[10px] left-[13px] bg-white px-2 text-[12px] font-light text-[#252525]"
              >
                Descrição / resumo
              </label>

              <textarea
                id="descricao"
                value={descricao}
                placeholder="Descreva resumidamente a prestação de contas do mês"
                onChange={(event) => setDescricao(event.target.value)}
                className="h-[90px] w-full resize-none rounded-[8px] border border-[#b75fc1] bg-white px-4 py-5 text-[13px] font-light text-[#252525] shadow-[1px_2px_3px_rgba(0,0,0,0.15)] outline-none placeholder:text-[#9d9d9d] focus:border-[#a94fb4] focus:ring-2 focus:ring-[#b75fc1]/30"
              />
            </div>

            <div className="rounded-[10px] border border-[#b75fc1] bg-[#fdf4ff] px-4 py-4">
              <div className="mb-4 flex items-center justify-between gap-3 max-sm:flex-col max-sm:items-start">
                <div>
                  <h2 className="text-[15px] font-bold uppercase text-[#252525]">
                    Movimentações financeiras
                  </h2>

                  <p className="mt-1 text-[12px] font-light text-[#777]">
                    Adicione cada entrada ou saída financeira do mês.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={adicionarMovimentacao}
                  className="h-[34px] rounded-[7px] bg-[#b75fc1] px-4 text-[13px] font-bold uppercase text-white shadow-[1px_2px_3px_rgba(0,0,0,0.20)] transition hover:bg-[#a94fb4] focus:outline-none focus:ring-2 focus:ring-[#b75fc1]/50 max-sm:w-full"
                >
                  + Adicionar linha
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {movimentacoes.map((movimentacao, index) => (
                  <div
                    key={movimentacao.id}
                    className="rounded-[8px] border border-[#e5b5eb] bg-white px-3 py-3 shadow-[1px_2px_3px_rgba(0,0,0,0.08)]"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-[12px] font-bold uppercase text-[#7e3c88]">
                        Linha {index + 1}
                      </span>

                      <button
                        type="button"
                        onClick={() => removerMovimentacao(movimentacao.id)}
                        disabled={movimentacoes.length === 1}
                        className="text-[12px] font-bold uppercase text-[#b75fc1] transition hover:text-[#8f399a] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Remover
                      </button>
                    </div>

                    <div className="grid grid-cols-[130px_150px_180px_1fr_130px] gap-3 max-xl:grid-cols-2 max-sm:grid-cols-1">
                      <div className="relative">
                        <label className="absolute -top-[9px] left-[12px] bg-white px-2 text-[11px] font-light text-[#252525]">
                          Tipo
                        </label>

                        <select
                          value={movimentacao.tipo}
                          onChange={(event) =>
                            atualizarMovimentacao(
                              movimentacao.id,
                              "tipo",
                              event.target.value as TipoMovimentacaoPrestacao
                            )
                          }
                          className="h-[40px] w-full rounded-[8px] border border-[#b75fc1] bg-white px-3 text-[13px] font-light text-[#252525] outline-none focus:border-[#a94fb4] focus:ring-2 focus:ring-[#b75fc1]/30"
                        >
                          <option value="entrada">Entrada</option>
                          <option value="saida">Saída</option>
                        </select>
                      </div>

                      <div className="relative">
                        <label className="absolute -top-[9px] left-[12px] bg-white px-2 text-[11px] font-light text-[#252525]">
                          Data
                        </label>

                        <input
                          type="date"
                          value={movimentacao.data}
                          onChange={(event) =>
                            atualizarMovimentacao(
                              movimentacao.id,
                              "data",
                              event.target.value
                            )
                          }
                          className="h-[40px] w-full rounded-[8px] border border-[#b75fc1] bg-white px-3 text-[13px] font-light text-[#252525] outline-none focus:border-[#a94fb4] focus:ring-2 focus:ring-[#b75fc1]/30"
                        />
                      </div>

                      <div className="relative">
                        <label className="absolute -top-[9px] left-[12px] bg-white px-2 text-[11px] font-light text-[#252525]">
                          Categoria
                        </label>

                        <input
                          type="text"
                          value={movimentacao.categoria}
                          placeholder="Ex: Ração"
                          onChange={(event) =>
                            atualizarMovimentacao(
                              movimentacao.id,
                              "categoria",
                              event.target.value
                            )
                          }
                          className="h-[40px] w-full rounded-[8px] border border-[#b75fc1] bg-white px-3 text-[13px] font-light text-[#252525] outline-none placeholder:text-[#9d9d9d] focus:border-[#a94fb4] focus:ring-2 focus:ring-[#b75fc1]/30"
                        />
                      </div>

                      <div className="relative">
                        <label className="absolute -top-[9px] left-[12px] bg-white px-2 text-[11px] font-light text-[#252525]">
                          Descrição
                        </label>

                        <input
                          type="text"
                          value={movimentacao.descricao}
                          placeholder="Descreva a movimentação"
                          onChange={(event) =>
                            atualizarMovimentacao(
                              movimentacao.id,
                              "descricao",
                              event.target.value
                            )
                          }
                          className="h-[40px] w-full rounded-[8px] border border-[#b75fc1] bg-white px-3 text-[13px] font-light text-[#252525] outline-none placeholder:text-[#9d9d9d] focus:border-[#a94fb4] focus:ring-2 focus:ring-[#b75fc1]/30"
                        />
                      </div>

                      <div className="relative">
                        <label className="absolute -top-[9px] left-[12px] bg-white px-2 text-[11px] font-light text-[#252525]">
                          Valor
                        </label>

                        <input
                          type="text"
                          value={movimentacao.valor}
                          placeholder="0,00"
                          onChange={(event) =>
                            atualizarMovimentacao(
                              movimentacao.id,
                              "valor",
                              event.target.value
                            )
                          }
                          className="h-[40px] w-full rounded-[8px] border border-[#b75fc1] bg-white px-3 text-[13px] font-light text-[#252525] outline-none placeholder:text-[#9d9d9d] focus:border-[#a94fb4] focus:ring-2 focus:ring-[#b75fc1]/30"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              <div className="rounded-[10px] border border-[#e5b5eb] bg-[#fdf4ff] px-4 py-4 text-center">
                <p className="text-[12px] font-light uppercase text-[#777]">
                  Total recebido
                </p>
                <strong className="mt-1 block text-[20px] text-[#252525]">
                  {formatarMoeda(totais.totalEntradas)}
                </strong>
              </div>

              <div className="rounded-[10px] border border-[#e5b5eb] bg-[#fdf4ff] px-4 py-4 text-center">
                <p className="text-[12px] font-light uppercase text-[#777]">
                  Total gasto
                </p>
                <strong className="mt-1 block text-[20px] text-[#252525]">
                  {formatarMoeda(totais.totalSaidas)}
                </strong>
              </div>

              <div className="rounded-[10px] border border-[#b75fc1] bg-white px-4 py-4 text-center">
                <p className="text-[12px] font-light uppercase text-[#777]">
                  Saldo final
                </p>
                <strong className="mt-1 block text-[20px] text-[#b75fc1]">
                  {formatarMoeda(totais.saldoFinal)}
                </strong>
              </div>
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
              className="h-[36px] w-[170px] rounded-[7px] bg-[#b75fc1] text-[15px] font-bold uppercase text-white shadow-[1px_2px_3px_rgba(0,0,0,0.20)] transition hover:bg-[#a94fb4] disabled:cursor-not-allowed disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#b75fc1]/50 max-sm:w-full"
            >
              {carregando ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}