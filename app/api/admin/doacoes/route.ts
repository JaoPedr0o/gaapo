import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const config = await prisma.configuracaoDoacoes.findFirst();

  return NextResponse.json({ sucesso: true, dados: config ?? null });
}

export async function PUT(request: NextRequest) {
  const body = (await request.json()) as {
    chavePix: string;
    numeroContaBancaria: string;
    textoInformativo: string;
  };

  const { chavePix, numeroContaBancaria, textoInformativo } = body;

  if (!chavePix || !numeroContaBancaria || !textoInformativo) {
    return NextResponse.json(
      { sucesso: false, mensagem: "Todos os campos são obrigatórios." },
      { status: 400 }
    );
  }

  const configExistente = await prisma.configuracaoDoacoes.findFirst();

  const dados = configExistente
    ? await prisma.configuracaoDoacoes.update({
        where: { id: configExistente.id },
        data: { chavePix, numeroContaBancaria, textoInformativo },
      })
    : await prisma.configuracaoDoacoes.create({
        data: { chavePix, numeroContaBancaria, textoInformativo },
      });

  return NextResponse.json({
    sucesso: true,
    mensagem: "Configurações de doação salvas com sucesso.",
    dados,
  });
}
