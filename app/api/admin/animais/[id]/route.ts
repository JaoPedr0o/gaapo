import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cloudinaryConfigurado, deletarImagem, uploadImagem } from "@/lib/cloudinary";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;

  const animal = await prisma.animal.findUnique({ where: { id } });

  if (!animal) {
    return NextResponse.json(
      { sucesso: false, mensagem: "Animal não encontrado." },
      { status: 404 }
    );
  }

  return NextResponse.json({ sucesso: true, animal });
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = await params;

  const body = (await request.json()) as {
    nome: string;
    descricao: string;
    idade: string;
    sexo: string;
    especie: string;
    temperamento: string;
    imagemBase64?: string;
    nomeImagem?: string;
  };

  const { nome, descricao, idade, sexo, especie, temperamento, imagemBase64, nomeImagem } = body;

  if (!nome || !descricao || !idade || !sexo || !especie || !temperamento) {
    return NextResponse.json(
      { sucesso: false, mensagem: "Todos os campos obrigatórios devem ser preenchidos." },
      { status: 400 }
    );
  }

  const animalExistente = await prisma.animal.findUnique({ where: { id } });

  if (!animalExistente) {
    return NextResponse.json(
      { sucesso: false, mensagem: "Animal não encontrado." },
      { status: 404 }
    );
  }

  let imagemUrl = animalExistente.imagemUrl ?? undefined;

  if (imagemBase64 && cloudinaryConfigurado()) {
    try {
      if (animalExistente.imagemUrl) {
        await deletarImagem(animalExistente.imagemUrl).catch(() => {});
      }
      imagemUrl = await uploadImagem(imagemBase64, "animais");
    } catch (erro) {
      console.error("[Cloudinary] Falha no upload:", erro);
    }
  }

  const animal = await prisma.animal.update({
    where: { id },
    data: { nome, descricao, idade, sexo, especie, temperamento, imagemUrl, nomeImagem },
  });

  return NextResponse.json({ sucesso: true, animal });
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = await params;

  const animal = await prisma.animal.findUnique({ where: { id } });

  if (!animal) {
    return NextResponse.json(
      { sucesso: false, mensagem: "Animal não encontrado." },
      { status: 404 }
    );
  }

  if (animal.imagemUrl && cloudinaryConfigurado()) {
    await deletarImagem(animal.imagemUrl).catch(() => {});
  }

  await prisma.animal.delete({ where: { id } });

  return NextResponse.json({ sucesso: true, mensagem: "Animal removido com sucesso." });
}
