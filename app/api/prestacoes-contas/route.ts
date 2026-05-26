import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const prestacoes = await prisma.prestacaoContas.findMany({
    orderBy: { dataCadastro: "desc" },
    include: { movimentacoes: true },
  });

  const normalizadas = prestacoes.map((p) => ({
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
  }));

  return NextResponse.json({ sucesso: true, prestacoes: normalizadas });
}
