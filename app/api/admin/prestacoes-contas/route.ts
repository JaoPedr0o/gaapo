import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cloudinaryConfigurado, uploadPdf } from "@/lib/cloudinary";

function converterValor(valor: string): number {
  const limpo = valor.replace(/\./g, "").replace(",", ".");
  const numero = Number(limpo);
  return Number.isNaN(numero) ? 0 : numero;
}

function normalizarPrestacao(p: {
  id: string;
  tipoCadastro: string;
  titulo: string;
  mesReferencia: string;
  anoReferencia: string;
  descricao: string;
  valorRecebido: { toString(): string };
  valorGasto: { toString(): string };
  saldoFinal: { toString(): string };
  documentoUrl: string | null;
  nomeDocumento: string | null;
  dataCadastro: Date;
  movimentacoes: {
    id: string;
    tipo: string;
    data: string;
    categoria: string;
    descricao: string;
    valor: { toString(): string };
  }[];
}) {
  return {
    id: p.id,
    tipoCadastro: p.tipoCadastro.toLowerCase(),
    titulo: p.titulo,
    mesReferencia: p.mesReferencia,
    anoReferencia: p.anoReferencia,
    descricao: p.descricao,
    valorRecebido: p.valorRecebido.toString(),
    valorGasto: p.valorGasto.toString(),
    saldoFinal: p.saldoFinal.toString(),
    movimentacoes: p.movimentacoes.map((m) => ({
      id: m.id,
      tipo: m.tipo.toLowerCase(),
      data: m.data,
      categoria: m.categoria,
      descricao: m.descricao,
      valor: m.valor.toString(),
    })),
    documentoUrl: p.documentoUrl ?? undefined,
    nomeDocumento: p.nomeDocumento ?? undefined,
    dataCadastro: p.dataCadastro.toISOString(),
  };
}

export async function GET() {
  const prestacoes = await prisma.prestacaoContas.findMany({
    orderBy: { dataCadastro: "desc" },
    include: { movimentacoes: true },
  });

  return NextResponse.json({
    sucesso: true,
    prestacoes: prestacoes.map(normalizarPrestacao),
  });
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    tipoCadastro: string;
    titulo: string;
    mesReferencia: string;
    anoReferencia: string;
    descricao: string;
    valorRecebido: string;
    valorGasto: string;
    saldoFinal: string;
    movimentacoes: {
      tipo: string;
      data: string;
      categoria: string;
      descricao: string;
      valor: string;
    }[];
    documentoBase64?: string;
    nomeDocumento?: string;
  };

  const {
    tipoCadastro,
    titulo,
    mesReferencia,
    anoReferencia,
    descricao,
    valorRecebido,
    valorGasto,
    saldoFinal,
    movimentacoes,
    documentoBase64,
    nomeDocumento,
  } = body;

  if (!tipoCadastro || !titulo || !mesReferencia || !anoReferencia || !descricao) {
    return NextResponse.json(
      { sucesso: false, mensagem: "Todos os campos obrigatórios devem ser preenchidos." },
      { status: 400 }
    );
  }

  let documentoUrl: string | undefined;
  if (documentoBase64 && cloudinaryConfigurado()) {
    try {
      documentoUrl = await uploadPdf(documentoBase64, "documentos");
    } catch (erro) {
      console.error("[Cloudinary] Falha no upload do PDF:", erro);
    }
  }

  const prestacao = await prisma.prestacaoContas.create({
    data: {
      tipoCadastro: tipoCadastro.toUpperCase() as "PDF" | "MANUAL",
      titulo,
      mesReferencia,
      anoReferencia,
      descricao,
      valorRecebido: converterValor(valorRecebido),
      valorGasto: converterValor(valorGasto),
      saldoFinal: converterValor(saldoFinal),
      documentoUrl,
      nomeDocumento,
      movimentacoes: {
        create: movimentacoes.map((m) => ({
          tipo: m.tipo.toUpperCase() as "ENTRADA" | "SAIDA",
          data: m.data,
          categoria: m.categoria,
          descricao: m.descricao,
          valor: converterValor(m.valor),
        })),
      },
    },
    include: { movimentacoes: true },
  });

  return NextResponse.json(
    { sucesso: true, mensagem: "Prestação de contas cadastrada com sucesso.", prestacao: normalizarPrestacao(prestacao) },
    { status: 201 }
  );
}
