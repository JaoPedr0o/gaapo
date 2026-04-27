"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { autenticarAdministrador } from "../services/autenticacao-administrador";
import CampoFormularioLogin from "./CampoFormularioLogin";

export default function FormularioLoginAdministrador() {
  const router = useRouter();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function enviarFormulario(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMensagemErro("");

    if (!usuario.trim() || !senha.trim()) {
      setMensagemErro("Informe o nome de usuário e a senha.");
      return;
    }

    try {
      setCarregando(true);

      const resposta = await autenticarAdministrador({
        usuario,
        senha,
      });

      if (!resposta.sucesso) {
        setMensagemErro(resposta.mensagem ?? "Usuário ou senha inválidos.");
        return;
      }

      if (resposta.token) {
        localStorage.setItem("gaapo_admin_token", resposta.token);
      }

      router.push("/admin/selecao-paginas");
    } catch {
      setMensagemErro("Não foi possível entrar. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center border-[3px] border-[#202020] bg-[#fdfbf5] px-4 py-8">
      <section className="flex h-auto min-h-[490px] w-full max-w-[486px] flex-col items-center rounded-[10px] border border-[#f5b900] bg-white px-[60px] pb-[52px] pt-[16px] shadow-[5px_5px_0_#f5b900] max-sm:px-6">
        <div className="mb-[48px] flex h-[134px] w-[134px] items-center justify-center rounded-full border-[5px] border-[#f5b900] bg-white">
          <Image
            src="/cachorro-admin.svg"
            alt="Logo do cachorro do GAAPO"
            width={94}
            height={94}
            priority
            className="object-contain"
          />
        </div>

        <form
          onSubmit={enviarFormulario}
          className="flex w-full flex-col items-center"
        >
          <div className="flex w-full flex-col gap-[40px]">
            <CampoFormularioLogin
              id="usuario"
              label="Nome de usuário"
              valor={usuario}
              placeholder="Insira seu usuário"
              autoComplete="username"
              onChange={setUsuario}
            />

            <CampoFormularioLogin
              id="senha"
              label="Senha"
              tipo="password"
              valor={senha}
              placeholder="Insira sua senha"
              autoComplete="current-password"
              onChange={setSenha}
            />
          </div>

          {mensagemErro && (
            <p className="mt-4 w-full text-center text-[13px] font-light text-red-600">
              {mensagemErro}
            </p>
          )}

          <button
            type="submit"
            disabled={carregando}
            className="mt-[48px] h-[39px] w-[182px] rounded-[8px] bg-[#f5b900] text-[16px] font-bold uppercase tracking-[0.2px] text-white shadow-[2px_3px_4px_rgba(0,0,0,0.25)] transition hover:bg-[#e5ad00] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </section>
    </main>
  );
}