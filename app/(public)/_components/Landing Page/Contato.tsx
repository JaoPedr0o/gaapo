"use client";

import { useState } from "react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function Contato() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleSubmit = () => {
    console.log({ nome, email, descricao });
  };

  return (
    <section
      id="contato"
      className={`bg-[#FFC8D6] relative overflow-hidden 
      py-20 sm:py-24 md:py-28 lg:py-36 xl:py-40
      px-6 sm:px-10 md:px-14 lg:px-20
      flex items-center ${poppins.className}`}
    >
      <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 xl:gap-28">
        
        {/* Esquerda */}
        <div className="w-full lg:max-w-120 text-center lg:text-left">
          <div className="inline-block bg-[#38C9C9] rounded-xl py-4 px-6 sm:px-8 mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-white tracking-tight">
              Tem alguma dúvida?
            </h2>
          </div>

          <p className="text-base sm:text-lg lg:text-[20px] leading-relaxed font-semibold text-black max-w-[500px] mx-auto lg:mx-0">
            Entre em contato com a GAAPO. Nossa equipe está à disposição para
            ajudar e responder suas mensagens.
          </p>
        </div>

        {/* Direita*/}
        <div className="w-full lg:max-w-120 flex flex-col gap-4">
          
          <input
            className="w-full py-3 px-4 sm:px-5 rounded-lg border-[3px] border-[#C88DCF] bg-white text-sm sm:text-base text-[#3a2a2a] outline-none transition-colors focus:border-[#38C9C9]"
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <input
            className="w-full py-3 px-4 sm:px-5 rounded-lg border-[3px] border-[#C88DCF] bg-white text-sm sm:text-base text-[#3a2a2a] outline-none transition-colors focus:border-[#38C9C9]"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <textarea
            className="w-full py-3 px-4 sm:px-5 rounded-lg border-[3px] border-[#C88DCF] bg-white text-sm sm:text-base text-[#3a2a2a] outline-none transition-colors focus:border-[#38C9C9]"
            placeholder="Descrição"
            rows={4}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          <button
                onClick={handleSubmit}
                className="bg-[#B569BE] text-white rounded-xl mt-2 py-3 px-6 text-xs sm:text-sm font-extrabold tracking-[1.6px] uppercase cursor-pointer self-center lg:self-start min-w-[160px] shadow-md transition-all hover:brightness-110 hover:scale-105"
              >
                Contato
          </button>
        </div>
      </div>
    </section>
  );
}
