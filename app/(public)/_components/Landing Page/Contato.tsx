"use client";

import ossoRosa from "../assets/icones_rosa/osso-r.svg";
import pataRosa from "../assets/icones_rosa/pata-r.svg";
import GatoR from "../assets/icones_rosa/gato-r.svg";
import lataR from "../assets/icones_rosa/lata-r.svg";
import poteR from "../assets/icones_rosa/pote-r.svg";
import bola from "../assets/icones_rosa/bola-r.svg";
import bola2 from "../assets/icones_rosa/bola2-r.svg";

import { useState } from "react";
import { Poppins } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const decorIconImgClass = "h-auto w-auto";

export default function Contato() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!nome || !email || !descricao) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/contato", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          email,
          descricao,
        }),
      });

      if (response.ok) {
        alert("Mensagem enviada com sucesso!");

        setNome("");
        setEmail("");
        setDescricao("");
      } else {
        alert("Erro ao enviar mensagem.");
      }
    } catch (error) {
      alert("Erro no servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contato"
      className={`bg-[#FFC8D6] relative overflow-hidden 
      py-20 sm:py-24 md:py-28 lg:py-36 xl:py-40
      px-6 sm:px-10 md:px-14 lg:px-20
      flex items-center ${poppins.className}`}
    >
      
      {/* Ícones lado ESQUERDO */}
      {/* Osso topo esquerdo */}
      <div className="absolute opacity-100 -rotate-185 pointer-events-none hidden xl:block" style={{ left: '4px', top: '48px', width: 100, height: 100 }}>
        <Image
          src={ossoRosa}
          alt=""
          aria-hidden
          fill
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Pata esquerda superior */}
      <div className="absolute opacity-100 pointer-events-none hidden xl:block" style={{ left: '34px', top: '240px', width: 100, height: 100 }}>
        <Image
          src={pataRosa}
          alt=""
          aria-hidden
          fill
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Gato esquerda */}
      <div className="absolute opacity-100 pointer-events-none hidden xl:block" style={{ left: '4px', top: '440px', width: 100, height: 100 }}>
        <Image
          src={GatoR}
          alt=""
          aria-hidden
          fill
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Pote esquerdo inferior */}
      <div className="absolute opacity-100 pointer-events-none hidden xl:block" style={{ left: '34px', bottom: '250px', width: 100, height: 100 }}>
        <Image
          src={poteR}
          alt=""
          aria-hidden
          fill
          style={{ objectFit: "contain" }}
        />
      </div>


      {/* Lata esquerda inferior */}
      <div className="absolute opacity-100 pointer-events-none hidden xl:block" style={{ left: '4px', bottom: '70px', width: 100, height: 100 }}>
        <Image
          src={lataR}
          alt=""
          aria-hidden
          fill
          style={{ objectFit: "contain" }}
        />
      </div>

      
      {/*Ícones  lado DIREITO */}

      {/* Osso topo direito */}
      <div className="absolute opacity-100 rotate-95 pointer-events-none hidden xl:block" style={{ right: '4px', top: '48px', width: 100, height: 100 }}>
        <Image
          src={ossoRosa}
          alt=""
          aria-hidden
          fill
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Pata direita superior */}
      <div className="absolute opacity-100 pointer-events-none hidden xl:block" style={{ right: '54px', top: '240px', width: 100, height: 100 }}>
        <Image
          src={pataRosa}
          alt=""
          aria-hidden
          fill
          style={{ objectFit: "contain", transform: "scaleX(-1)" }}
        />
      </div>

      {/* Cachorro direita */}
      <div className="absolute opacity-100 pointer-events-none hidden xl:block" style={{ right: '4px', top: '440px', width: 100, height: 100 }}>
        <Image
          src={GatoR}
          alt=""
          aria-hidden
          fill
          style={{ objectFit: "contain", transform: "scaleX(-1)" }}
        />
      </div>

        {/* Pote direito inferior */}
      <div className="absolute opacity-100 pointer-events-none hidden xl:block" style={{ right: '54px', bottom: '250px', width: 100, height: 100 }}>
        <Image
          src={poteR}
          alt=""
          aria-hidden
          fill
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Lata direita inferior */}
      <div className="absolute opacity-100 pointer-events-none hidden xl:block" style={{ right: '4px', bottom: '70px', width: 100, height: 100 }}>
        <Image
          src={lataR}
          alt=""
          aria-hidden
          fill
          style={{ objectFit: "contain" }}
        />
      </div>



      <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 xl:gap-28">
        
        {/* Esquerda */}
        <div className="w-full lg:max-w-[480px] text-center lg:text-left">
          <div 
            className="inline-block bg-[#38C9C9] rounded-3xl py-4 px-6 sm:px-8 mb-6 sm:mb-8"
            style={{ transform: "rotate(-3deg) skewY(2deg)" }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-white tracking-tight">
              Tem alguma dúvida?
            </h2>
          </div>

          <p className="text-base sm:text-lg lg:text-[20px] leading-relaxed font-semibold text-black max-w-[500px] mx-auto lg:mx-0">
            Entre em contato com a GAAPO. Nossa equipe está à disposição para
            ajudar e responder suas mensagens.
          </p>
        </div>

        {/* Direita */}
        <div className="w-full lg:max-w-[480px] flex flex-col gap-4 relative z-10">

          <input
            className="w-full py-3 px-4 sm:px-5 rounded-lg border-2 border-[#C88DCF] bg-white text-sm sm:text-base text-[#3a2a2a] outline-none transition-colors focus:border-[#38C9C9]"
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <input
            className="w-full py-3 px-4 sm:px-5 rounded-lg border-2 border-[#C88DCF] bg-white text-sm sm:text-base text-[#3a2a2a] outline-none transition-colors focus:border-[#38C9C9]"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <textarea
            className="w-full py-3 px-4 sm:px-5 rounded-lg border-2 border-[#C88DCF] bg-white text-sm sm:text-base text-[#3a2a2a] outline-none transition-colors focus:border-[#38C9C9]"
            placeholder="Descrição"
            rows={4}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#B569BE] text-white rounded-xl mt-2 py-3 px-6 text-xs sm:text-sm font-extrabold tracking-[1.6px] uppercase cursor-pointer self-center lg:self-start min-w-[160px] shadow-md transition-all hover:brightness-110 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Enviando..." : "Contato"}
          </button>
        </div>
      </div>
    </section>
  );
}