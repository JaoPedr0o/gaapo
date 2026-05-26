import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cloudinaryConfigurado, uploadImagem } from "@/lib/cloudinary";

export async function GET() {
  const eventos = await prisma.evento.findMany({
    orderBy: { data: "asc" },
  });

  return NextResponse.json({ sucesso: true, eventos });
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    nome: string;
    descricao: string;
    data: string;
    horario: string;
    local: string;
    imagemBase64?: string;
    nomeImagem?: string;
  };

  const { nome, descricao, data, horario, local, imagemBase64, nomeImagem } = body;

  if (!nome || !descricao || !data || !horario || !local) {
    return NextResponse.json(
      { sucesso: false, mensagem: "Todos os campos obrigatórios devem ser preenchidos." },
      { status: 400 }
    );
  }

  let imagemUrl: string | undefined;
  if (imagemBase64 && cloudinaryConfigurado()) {
    try {
      imagemUrl = await uploadImagem(imagemBase64, "eventos");
    } catch (erro) {
      console.error("[Cloudinary] Falha no upload:", erro);
    }
  }

  const evento = await prisma.evento.create({
    data: { nome, descricao, data, horario, local, imagemUrl, nomeImagem },
  });

  return NextResponse.json({ sucesso: true, evento }, { status: 201 });
}
