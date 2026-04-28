import type {
  DadosLoginAdministrador,
  RespostaLoginAdministrador,
} from "../types/login-administrador";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function autenticarAdministrador(
  dados: DadosLoginAdministrador
): Promise<RespostaLoginAdministrador> {
  if (!API_URL) {
    // Mock temporário para desenvolvimento da tela.
    // Quando o backend estiver pronto, basta configurar NEXT_PUBLIC_API_URL no .env.local.
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      sucesso: true,
      mensagem: "Login validado em modo de desenvolvimento.",
      token: "token-temporario-admin",
    };
  }

  const resposta = await fetch(`${API_URL}/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(dados),
  });

  const conteudo = (await resposta.json()) as RespostaLoginAdministrador;

  if (!resposta.ok) {
    return {
      sucesso: false,
      mensagem: conteudo.mensagem ?? "Usuário ou senha inválidos.",
    };
  }

  return conteudo;
}