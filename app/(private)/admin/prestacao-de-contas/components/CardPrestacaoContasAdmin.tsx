import Link from "next/link";
import type { DadosPrestacaoContasAdmin } from "../types/prestacao-contas-admin";
import { abrirRelatorioPrestacao } from "../utils/gerar-relatorio-prestacao";

type CardPrestacaoContasAdminProps = {
    prestacao: DadosPrestacaoContasAdmin;
};

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

export default function CardPrestacaoContasAdmin({
    prestacao,
}: CardPrestacaoContasAdminProps) {
    const totalRecebido = converterValor(prestacao.valorRecebido);
    const totalGasto = converterValor(prestacao.valorGasto);

    const saldoSalvo = converterValor(prestacao.saldoFinal);
    const saldo =
        prestacao.saldoFinal !== undefined && prestacao.saldoFinal !== ""
            ? saldoSalvo
            : totalRecebido - totalGasto;

    function baixarDocumento(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        if (!prestacao.documentoBase64) {
            alert("Nenhum PDF foi anexado nesta prestação de contas.");
            return;
        }

        const linkDownload = document.createElement("a");

        linkDownload.href = prestacao.documentoBase64;
        linkDownload.download = prestacao.nomeDocumento || "prestacao-contas.pdf";
        document.body.appendChild(linkDownload);
        linkDownload.click();
        document.body.removeChild(linkDownload);
    }
    function gerarRelatorioManual(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        abrirRelatorioPrestacao(prestacao);
    }

    return (
        <Link
            href={`/admin/prestacao-de-contas/editar/${prestacao.id}`}
            className="group relative flex min-h-[118px] w-full items-center rounded-[10px] border border-[#b75fc1] bg-white px-[18px] py-[16px] shadow-[2px_3px_6px_rgba(0,0,0,0.10)] transition hover:-translate-y-[1px] hover:shadow-[3px_5px_12px_rgba(0,0,0,0.14)]"
        >
            <div className="flex h-[70px] w-[76px] shrink-0 items-center justify-center rounded-[8px] bg-[#fceefd] text-[#b75fc1]">
                <span className="text-[18px] font-bold leading-none">PDF</span>
            </div>

            <div className="ml-[16px] flex min-w-0 flex-1 flex-col justify-center pr-[54px]">
                <h3 className="text-[18px] font-semibold leading-[1.1] text-[#252525]">
                    {prestacao.titulo || "Prestação de contas"}
                </h3>

                <p className="mt-[6px] line-clamp-2 text-[12px] font-light leading-[1.35] text-[#7a7a7a]">
                    {prestacao.descricao || "Sem descrição cadastrada."}
                </p>

                <div className="mt-[10px] flex flex-wrap gap-[8px]">
                    <span className="rounded-full border border-[#e5b5eb] bg-[#fdf4ff] px-[10px] py-[4px] text-[11px] font-medium text-[#7e3c88]">
                        Referência: {formatarMes(prestacao.mesReferencia)}/
                        {prestacao.anoReferencia || "Ano não informado"}
                    </span>

                    <span className="rounded-full border border-[#e5b5eb] bg-[#fdf4ff] px-[10px] py-[4px] text-[11px] font-medium text-[#7e3c88]">
                        Tipo: {prestacao.tipoCadastro === "manual" ? "Manual" : "PDF"}
                    </span>

                    <span className="rounded-full border border-[#e5b5eb] bg-[#fdf4ff] px-[10px] py-[4px] text-[11px] font-medium text-[#7e3c88]">
                        Recebido: {formatarMoeda(totalRecebido)}
                    </span>

                    <span className="rounded-full border border-[#e5b5eb] bg-[#fdf4ff] px-[10px] py-[4px] text-[11px] font-medium text-[#7e3c88]">
                        Gasto: {formatarMoeda(totalGasto)}
                    </span>

                    <span className="rounded-full border border-[#e5b5eb] bg-[#fdf4ff] px-[10px] py-[4px] text-[11px] font-medium text-[#7e3c88]">
                        Saldo: {formatarMoeda(saldo)}
                    </span>

                    {prestacao.documentoBase64 && (
                        <button
                            type="button"
                            onClick={baixarDocumento}
                            className="rounded-full border border-[#b75fc1] bg-white px-[10px] py-[4px] text-[11px] font-bold text-[#b75fc1] transition hover:bg-[#fceefd]"
                        >
                            Baixar PDF
                        </button>
                    )}
                    {prestacao.tipoCadastro === "manual" && (
                        <button
                            type="button"
                            onClick={gerarRelatorioManual}
                            className="rounded-full border border-[#b75fc1] bg-white px-[10px] py-[4px] text-[11px] font-bold text-[#b75fc1] transition hover:bg-[#fceefd]"
                        >
                            Gerar relatório
                        </button>
                    )}
                </div>
            </div>

            <span className="absolute right-[20px] top-1/2 -translate-y-1/2 text-[48px] font-light leading-none text-[#b75fc1] transition group-hover:translate-x-[2px]">
                ›
            </span>
        </Link>
    );
}