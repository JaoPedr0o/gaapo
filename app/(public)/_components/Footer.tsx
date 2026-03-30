import Image from "next/image";
import logo from "./assets/LogoBranca.svg";
import paw from "./assets/paw.svg";

export default function Footer() {
  return (
    <footer className="relative bg-[#9B5FA8] text-white overflow-hidden">
      
      {/* ONDA */}
      <div className="absolute top-0 left-0 w-full">
        <svg
          viewBox="0 0 1440 120"
          className="w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#E9AEBB"
            d="M0,64 C240,0 480,0 720,40 C960,80 1200,80 1440,40 L1440,0 L0,0 Z"
          />
        </svg>
      </div>

      {/* CONTEÚDO */}
      <div className="relative max-w-[1440px] mx-auto px-6 pt-28 pb-12 flex items-center justify-between">
        
        {/* ESQUERDA */}
        <div>
          <Image src={paw} alt="Patinha" width={90} height={60} />
        </div>

        {/* CENTRO */}
        <div className="flex flex-col items-center gap-4">
          <Image src={logo} alt="Gaapo" width={160} height={50} />

          <nav className="flex gap-6 text-sm font-medium">
            <a href="#">Home</a>
            <a href="#">Adoção</a>
            <a href="#">Doação</a>
            <a href="#">Eventos</a>
            <a href="#">Contas</a>
          </nav>
        </div>

        {/* DIREITA */}
        <div className="flex gap-4">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            f
          </div>
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            i
          </div>
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            w
          </div>
        </div>

      </div>
    </footer>
  );
}