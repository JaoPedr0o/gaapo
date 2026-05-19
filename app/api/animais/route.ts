import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const animais = await prisma.animal.findMany({
    orderBy: { criadoEm: "desc" },
    select: {
      id: true,
      nome: true,
      descricao: true,
      idade: true,
      sexo: true,
      especie: true,
      temperamento: true,
      imagemUrl: true,
      nomeImagem: true,
    },
  });

  return NextResponse.json({ sucesso: true, animais });
}
