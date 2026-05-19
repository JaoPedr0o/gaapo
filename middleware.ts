import { NextRequest, NextResponse } from "next/server";
import { verificarToken } from "@/lib/jwt";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  const authHeader = request.headers.get("Authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ mensagem: "Não autorizado." }, { status: 401 });
  }

  try {
    await verificarToken(authHeader.slice(7));
    return NextResponse.next();
  } catch {
    return NextResponse.json(
      { mensagem: "Token inválido ou expirado." },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ["/api/admin/:path*"],
};
