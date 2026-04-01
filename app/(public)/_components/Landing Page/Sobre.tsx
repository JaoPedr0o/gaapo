import Image from "next/image";
import sobreImg from "../assets/Sobre-img.png";

export default function Sobre() {
  return (
    <section className="bg-[#B569BE] py-16 lg:py-28">
      <div className="container mx-auto px-8 md:px-16 lg:px-20 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Coluna 1: Texto */}
          <div className="flex flex-col order-1 lg:order-1 items-start">
            
            {/* Sobretítulo estilo Badge (Igual à imagem) e Título */}
            <div className="mb-6">
              <div className="inline-block bg-[#59C9DE] rounded-full px-6 py-2 mb-4">
                <span className="text-black font-bold tracking-wide text-sm md:text-base">
                  Nossa História
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
                Sobre a <span className="text-[#FFE077]">GAAPO</span>
              </h2>
            </div>

            {/* Corpo de Texto */}
            <div className="space-y-5 text-white/90 text-base md:text-xl leading-relaxed text-justify mb-8">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard dummy text
                ever since the 1500s, when an unknown printer took a galley of type
                and scrambled it.
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard dummy text
                ever since the 1500s, when an unknown printer took a galley of type
                and scrambled it.
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard dummy text
                ever since the 1500s, when an unknown printer took a galley of type
                and scrambled it.
              </p>
              <p>
                It has survived not only five centuries, but also the leap into 
                electronic typesetting, remaining essentially unchanged.
              </p>
            </div>

            {/* Diferenciais / Tópicos */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {[
                "Tradição e Qualidade",
                "Foco no bem estar animal",
                "Equipe Especializada",
                "Transparência e Responsabilidade",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#59C9DE] flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-[#B569BE]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white text-base font-medium">{item}</span>
                </li>
              ))}
            </ul>
            
          </div>

          {/* Coluna 2: Imagem */}
          <div className="order-2 lg:order-2 relative w-full max-w-[250px] md:max-w-[320px] lg:max-w-[380px] mx-auto mt-6 lg:mt-0">
            {/* Baixo detalhe azul (sombra) */}
            <div className="absolute top-3 left-3 w-full h-full rounded-xl bg-[#59C9DE] opacity-90" />

            {/* Borda azul direita */}
            <div className="absolute inset-y-0 right-0 w-4 bg-[#59C9DE] rounded-r-xl" />

            {/* Container da imagem */}
            <div className="relative aspect-[4/6] rounded-xl overflow-hidden shadow-xl bg-white z-10 group">
              <Image
                src={sobreImg}
                alt="Equipe GAAPO"
                fill
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
                sizes="(max-width: 768px) 100vw, 380px"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}