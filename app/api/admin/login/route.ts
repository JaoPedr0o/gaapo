import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { gerarToken } from "@/lib/jwt";

export async function POST(request: NextRequest) {
  const { usuario, senha } = await request.json();

  if (!usuario || !senha) {
    return NextResponse.json(
      { sucesso: false, mensagem: "Usuário e senha são obrigatórios." },
      { status: 400 }
    );
  }

  const admin = await prisma.administrador.findUnique({ where: { usuario } });

  if (!admin || !(await bcrypt.compare(senha, admin.senhaHash))) {
    return NextResponse.json(
      { sucesso: false, mensagem: "Usuário ou senha inválidos." },
      { status: 401 }
    );
  }

  const token = await gerarToken({ id: admin.id, usuario: admin.usuario });

  return NextResponse.json({ sucesso: true, token });
}
