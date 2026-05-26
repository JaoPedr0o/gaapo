import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function gerarToken(payload: { id: string; usuario: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(process.env.JWT_EXPIRES_IN ?? "7d")
    .sign(secret);
}

export async function verificarToken(token: string) {
  const { payload } = await jwtVerify(token, secret);
  return payload as { id: string; usuario: string };
}
