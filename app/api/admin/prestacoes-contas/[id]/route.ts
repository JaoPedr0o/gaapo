import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cloudinaryConfigurado, deletarArquivo, uploadPdf } from "@/lib/cloudinary";

type Params = { params: Promise<{ id: string }> };

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

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;

  const prestacao = await prisma.prestacaoContas.findUnique({
    where: { id },
    include: { movimentacoes: true },
  });

  if (!prestacao) {
    return NextResponse.json(
      { sucesso: false, mensagem: "Prestação de contas não encontrada." },
      { status: 404 }
    );
  }

  return NextResponse.json({ sucesso: true, prestacao: normalizarPrestacao(prestacao) });
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = await params;

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

  const prestacaoExistente = await prisma.prestacaoContas.findUnique({ where: { id } });

  if (!prestacaoExistente) {
    return NextResponse.json(
      { sucesso: false, mensagem: "Prestação de contas não encontrada." },
      { status: 404 }
    );
  }

  let documentoUrl = prestacaoExistente.documentoUrl ?? undefined;

  if (body.documentoBase64 && cloudinaryConfigurado()) {
    try {
      if (prestacaoExistente.documentoUrl) {
        await deletarArquivo(prestacaoExistente.documentoUrl).catch(() => {});
      }
      documentoUrl = await uploadPdf(body.documentoBase64, "documentos");
    } catch (erro) {
      console.error("[Cloudinary] Falha no upload do PDF:", erro);
    }
  }

  const prestacao = await prisma.prestacaoContas.update({
    where: { id },
    data: {
      tipoCadastro: body.tipoCadastro.toUpperCase() as "PDF" | "MANUAL",
      titulo: body.titulo,
      mesReferencia: body.mesReferencia,
      anoReferencia: body.anoReferencia,
      descricao: body.descricao,
      valorRecebido: converterValor(body.valorRecebido),
      valorGasto: converterValor(body.valorGasto),
      saldoFinal: converterValor(body.saldoFinal),
      documentoUrl,
      nomeDocumento: body.nomeDocumento,
      movimentacoes: {
        deleteMany: {},
        create: body.movimentacoes.map((m) => ({
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

  return NextResponse.json({
    sucesso: true,
    mensagem: "Prestação de contas atualizada com sucesso.",
    prestacao: normalizarPrestacao(prestacao),
  });
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = await params;

  const prestacao = await prisma.prestacaoContas.findUnique({ where: { id } });

  if (!prestacao) {
    return NextResponse.json(
      { sucesso: false, mensagem: "Prestação de contas não encontrada." },
      { status: 404 }
    );
  }

  if (prestacao.documentoUrl && cloudinaryConfigurado()) {
    await deletarArquivo(prestacao.documentoUrl).catch(() => {});
  }

  await prisma.prestacaoContas.delete({ where: { id } });

  return NextResponse.json({ sucesso: true, mensagem: "Prestação de contas removida com sucesso." });
}
