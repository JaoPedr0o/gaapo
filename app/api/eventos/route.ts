import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const eventos = await prisma.evento.findMany({
    orderBy: { data: "asc" },
    select: {
      id: true,
      nome: true,
      descricao: true,
      data: true,
      horario: true,
      local: true,
      imagemUrl: true,
      nomeImagem: true,
    },
  });

  return NextResponse.json({ sucesso: true, eventos });
}
