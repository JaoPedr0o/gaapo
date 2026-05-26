import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const config = await prisma.configuracaoDoacoes.findFirst();

  return NextResponse.json({ sucesso: true, dados: config ?? null });
}
