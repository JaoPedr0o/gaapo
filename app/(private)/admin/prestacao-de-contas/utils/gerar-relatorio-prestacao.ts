import type { DadosPrestacaoContasAdmin } from "../types/prestacao-contas-admin";

function formatarMes(mes?: string) {
  const meses: Record<string, string> = {
    "01": "Janeiro",
    "02": "Fevereiro",
    "03": "Março",
    "04": "Abril",
    "05": "Maio",
    "06": "Junho",
    "07": "Julho",
    "08": "Agosto",
    "09": "Setembro",
    "10": "Outubro",
    "11": "Novembro",
    "12": "Dezembro",
  };

  if (!mes) {
    return "Não informado";
  }

  return meses[mes] ?? mes;
}

function converterValor(valor?: string | number) {
  if (valor === undefined || valor === null || valor === "") {
    return 0;
  }

  if (typeof valor === "number") {
    return valor;
  }

  const numero = Number(valor.replace(/\./g, "").replace(",", "."));

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

function formatarData(data?: string) {
  if (!data) {
    return "Não informada";
  }

  const partes = data.split("-");

  if (partes.length !== 3) {
    return data;
  }

  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function escaparHtml(valor?: string) {
  return String(valor ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function abrirRelatorioPrestacao(prestacao: DadosPrestacaoContasAdmin) {
  const totalRecebido = converterValor(prestacao.valorRecebido);
  const totalGasto = converterValor(prestacao.valorGasto);
  const saldoFinal =
    prestacao.saldoFinal !== undefined && prestacao.saldoFinal !== ""
      ? converterValor(prestacao.saldoFinal)
      : totalRecebido - totalGasto;

  const movimentacoes = Array.isArray(prestacao.movimentacoes)
    ? prestacao.movimentacoes
    : [];

  const linhasMovimentacoes = movimentacoes
    .map((movimentacao) => {
      const tipoFormatado =
        movimentacao.tipo === "entrada" ? "Entrada" : "Saída";

      return `
        <tr>
          <td>${tipoFormatado}</td>
          <td>${formatarData(movimentacao.data)}</td>
          <td>${escaparHtml(movimentacao.categoria)}</td>
          <td>${escaparHtml(movimentacao.descricao)}</td>
          <td class="valor">${formatarMoeda(converterValor(movimentacao.valor))}</td>
        </tr>
      `;
    })
    .join("");

  const janela = window.open("", "_blank", "width=1000,height=800");

  if (!janela) {
    alert("Não foi possível abrir o relatório. Verifique se o pop-up foi bloqueado.");
    return;
  }

  janela.document.write(`
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <title>${escaparHtml(prestacao.titulo)}</title>

        <style>
          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            padding: 32px;
            background: #f8f8f8;
            color: #252525;
            font-family: Arial, sans-serif;
          }

          .pagina {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border: 1px solid #ddd;
            box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
          }

          .topo {
            border-bottom: 4px solid #b75fc1;
            padding-bottom: 18px;
            margin-bottom: 28px;
          }

          .selo {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 999px;
            background: #fceefd;
            color: #7e3c88;
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: 12px;
          }

          h1 {
            margin: 0;
            font-size: 28px;
            text-transform: uppercase;
            letter-spacing: 0.4px;
          }

          .referencia {
            margin-top: 8px;
            color: #666;
            font-size: 14px;
          }

          .descricao {
            margin: 24px 0;
            padding: 18px;
            border-radius: 10px;
            background: #fdf4ff;
            border: 1px solid #e5b5eb;
            color: #444;
            line-height: 1.5;
            font-size: 14px;
          }

          .resumo {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 14px;
            margin-bottom: 28px;
          }

          .card {
            border: 1px solid #e5b5eb;
            border-radius: 10px;
            padding: 16px;
            text-align: center;
            background: #fdf4ff;
          }

          .card strong {
            display: block;
            margin-top: 6px;
            font-size: 20px;
          }

          .card span {
            font-size: 12px;
            text-transform: uppercase;
            color: #666;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 12px;
            font-size: 13px;
          }

          th {
            background: #b75fc1;
            color: white;
            text-align: left;
            padding: 10px;
            font-size: 12px;
            text-transform: uppercase;
          }

          td {
            border-bottom: 1px solid #eee;
            padding: 10px;
            vertical-align: top;
          }

          .valor {
            text-align: right;
            white-space: nowrap;
            font-weight: bold;
          }

          .rodape {
            margin-top: 34px;
            padding-top: 16px;
            border-top: 1px solid #ddd;
            font-size: 12px;
            color: #777;
            text-align: center;
          }

          .acoes {
            max-width: 900px;
            margin: 18px auto 0;
            text-align: center;
          }

          button {
            height: 38px;
            padding: 0 22px;
            border: none;
            border-radius: 8px;
            background: #b75fc1;
            color: white;
            font-weight: bold;
            text-transform: uppercase;
            cursor: pointer;
          }

          @media print {
            body {
              background: white;
              padding: 0;
            }

            .pagina {
              box-shadow: none;
              border: none;
              max-width: none;
            }

            .acoes {
              display: none;
            }
          }
        </style>
      </head>

      <body>
        <div class="pagina">
          <div class="topo">
            <span class="selo">Prestação de Contas</span>
            <h1>${escaparHtml(prestacao.titulo)}</h1>
            <p class="referencia">
              Referência: ${formatarMes(prestacao.mesReferencia)}/${escaparHtml(
                prestacao.anoReferencia
              )}
            </p>
          </div>

          <div class="descricao">
            ${escaparHtml(prestacao.descricao)}
          </div>

          <div class="resumo">
            <div class="card">
              <span>Total recebido</span>
              <strong>${formatarMoeda(totalRecebido)}</strong>
            </div>

            <div class="card">
              <span>Total gasto</span>
              <strong>${formatarMoeda(totalGasto)}</strong>
            </div>

            <div class="card">
              <span>Saldo final</span>
              <strong>${formatarMoeda(saldoFinal)}</strong>
            </div>
          </div>

          <h2>Movimentações financeiras</h2>

          <table>
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Data</th>
                <th>Categoria</th>
                <th>Descrição</th>
                <th>Valor</th>
              </tr>
            </thead>

            <tbody>
              ${
                linhasMovimentacoes ||
                `
                  <tr>
                    <td colspan="5">Nenhuma movimentação cadastrada.</td>
                  </tr>
                `
              }
            </tbody>
          </table>

          <div class="rodape">
            Relatório gerado pelo painel administrativo GAAPO.
          </div>
        </div>

        <div class="acoes">
          <button onclick="window.print()">Imprimir / Salvar como PDF</button>
        </div>
      </body>
    </html>
  `);

  janela.document.close();
}