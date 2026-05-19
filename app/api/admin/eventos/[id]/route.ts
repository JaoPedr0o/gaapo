import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cloudinaryConfigurado, deletarImagem, uploadImagem } from "@/lib/cloudinary";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;

  const evento = await prisma.evento.findUnique({ where: { id } });

  if (!evento) {
    return NextResponse.json(
      { sucesso: false, mensagem: "Evento não encontrado." },
      { status: 404 }
    );
  }

  return NextResponse.json({ sucesso: true, evento });
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = await params;

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

  const eventoExistente = await prisma.evento.findUnique({ where: { id } });

  if (!eventoExistente) {
    return NextResponse.json(
      { sucesso: false, mensagem: "Evento não encontrado." },
      { status: 404 }
    );
  }

  let imagemUrl = eventoExistente.imagemUrl ?? undefined;

  if (imagemBase64 && cloudinaryConfigurado()) {
    try {
      if (eventoExistente.imagemUrl) {
        await deletarImagem(eventoExistente.imagemUrl).catch(() => {});
      }
      imagemUrl = await uploadImagem(imagemBase64, "eventos");
    } catch (erro) {
      console.error("[Cloudinary] Falha no upload:", erro);
    }
  }

  const evento = await prisma.evento.update({
    where: { id },
    data: { nome, descricao, data, horario, local, imagemUrl, nomeImagem },
  });

  return NextResponse.json({ sucesso: true, evento });
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = await params;

  const evento = await prisma.evento.findUnique({ where: { id } });

  if (!evento) {
    return NextResponse.json(
      { sucesso: false, mensagem: "Evento não encontrado." },
      { status: 404 }
    );
  }

  if (evento.imagemUrl && cloudinaryConfigurado()) {
    await deletarImagem(evento.imagemUrl).catch(() => {});
  }

  await prisma.evento.delete({ where: { id } });

  return NextResponse.json({ sucesso: true, mensagem: "Evento removido com sucesso." });
}
