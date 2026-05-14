import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { nome, email, descricao } = body;

    const data = await resend.emails.send({
      from: "Contato Site <onboarding@resend.dev>",
      to: ["bv966968@gmail.com"],
      subject: "Novo contato do site",
      html: `
        <h2>Novo contato recebido</h2>

        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Descrição:</strong> ${descricao}</p>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao enviar email" },
      { status: 500 }
    );
  }
}