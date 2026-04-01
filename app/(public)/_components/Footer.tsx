import Image from "next/image";
import logo from "./assets/LogoBranca.svg";
import paw from "./assets/paw.svg";
import facebookIcon from "./assets/Facebook.svg";
import whatsappIcon from "./assets/WhatsApp.svg";
import instagramIcon from "./assets/Instagram.svg";

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



          {/* O caminho da onda, preenchido com a cor de fundo do footer */}
          <path
            fill="#F9A8BE"
            d="M0,64 C240,0 480,0 720,40 C960,80 1200,80 1440,40 L1440,0 L0,0 Z"
          />
        </svg>
      </div>



      {/* CONTEÚDO */}
      <div className="relative max-w-[1440px] mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
        
        {/* ESQUERDA */}
        <div className="hidden md:block">
          <Image src={paw} alt="Patinha" width={90} height={60} />
        </div>


        {/* CENTRO */}
        <div className="flex flex-col items-center gap-4 w-full md:w-auto">
          <Image src={logo} alt="Gaapo" width={160} height={50} />

          <nav className="flex flex-wrap justify-center gap-4 text-sm font-medium">
            <a href="#">Home</a>
            <a href="#">Adoção</a>
            <a href="#">Doação</a>
            <a href="#">Eventos</a>
            <a href="#">Contas</a>
          </nav>

          {/* Ícones no mobile — abaixo da nav */}
          <div className="flex gap-4 mt-4 md:hidden">
            <a href="https://www.facebook.com/suaPagina" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/20">
              <Image src={facebookIcon} alt="Facebook" width={28} height={28} />
            </a>
            <a href="https://wa.me/5534999208352" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/20">
              <Image src={whatsappIcon} alt="WhatsApp" width={28} height={28} />
            </a>
            <a href="https://www.instagram.com/gaapo.abrigo/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/20">
              <Image src={instagramIcon} alt="Instagram" width={28} height={28} />
            </a>
          </div>
        </div>

        {/* DIREITA (desktop) */}
        <div className="hidden md:flex gap-4">
          <a href="https://www.facebook.com/suaPagina" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/20">
            <Image src={facebookIcon} alt="Facebook" width={28} height={28} />
          </a>
          <a href="https://wa.me/5534999208352" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/20">
            <Image src={whatsappIcon} alt="WhatsApp" width={28} height={28} />
          </a>
          <a href="https://www.instagram.com/gaapo.abrigo/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/20">
            <Image src={instagramIcon} alt="Instagram" width={28} height={28} />
          </a>
        </div>

      </div>
    </footer>
  );
}