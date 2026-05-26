import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cloudinaryConfigurado, uploadImagem } from "@/lib/cloudinary";

export async function GET() {
  const animais = await prisma.animal.findMany({
    orderBy: { criadoEm: "desc" },
  });

  return NextResponse.json({ sucesso: true, animais });
}

export async function POST(request: NextRequest) {
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

  let imagemUrl: string | undefined;
  if (imagemBase64 && cloudinaryConfigurado()) {
    try {
      imagemUrl = await uploadImagem(imagemBase64, "animais");
    } catch (erro) {
      console.error("[Cloudinary] Falha no upload:", erro);
    }
  }

  const animal = await prisma.animal.create({
    data: { nome, descricao, idade, sexo, especie, temperamento, imagemUrl, nomeImagem },
  });

  return NextResponse.json({ sucesso: true, animal }, { status: 201 });
}
