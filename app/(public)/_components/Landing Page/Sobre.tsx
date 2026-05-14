import Image from "next/image";
import sobreImg from "../assets/Sobre.svg";

// Ícones decorativos
import ossoBranco from "../assets/icones_branco/osso-B.svg";
import pataBranca from "../assets/icones_branco/pata-B.svg";
import cachorroB from "../assets/icones_branco/cachorro-B.svg";
import lataB from "../assets/icones_branco/lata-B.svg";
import poteB from "../assets/icones_branco/pote-B.svg";

export default function Sobre() {
  return (
    <section className="relative bg-[#B569BE] py-16 lg:py-28 overflow-hidden">

      {/* Ícones lado ESQUERDO */}
      {/* Osso topo esquerdo */}
      <div className="absolute opacity-40 -rotate-45 pointer-events-none hidden md:block" style={{ left: '24px', top: '48px' }}>
        <Image src={ossoBranco} alt="" aria-hidden width={90} height={90} />
      </div>

      {/* Pata esquerda superior */}
      <div className="absolute opacity-40 pointer-events-none hidden md:block" style={{ left: '4px', top: '240px' }}>
        <Image src={pataBranca} alt="" aria-hidden width={90} height={70} />
      </div>

      {/* Cachorro esquerda */}
      <div className="absolute opacity-40 pointer-events-none hidden md:block" style={{ left: '16px', top: '440px' }}>
        <Image src={cachorroB} alt="" aria-hidden width={90} height={85} />
      </div>

      {/* Lata esquerda inferior */}
      <div className="absolute opacity-40 pointer-events-none hidden md:block" style={{ left: '32px', bottom: '70px' }}>
        <Image src={lataB} alt="" aria-hidden width={90} height={70} />
      </div>

      {/* Pote esquerdo inferior */}
      <div className="absolute opacity-40 pointer-events-none hidden md:block" style={{ left: '32px', bottom: '250px' }}>
        <Image src={poteB} alt="" aria-hidden width={90} height={70} />
      </div>

      {/*Ícones  lado DIREITO */}

      {/* Osso topo direito */}
      <div className="absolute opacity-40 rotate-95 pointer-events-none hidden md:block" style={{ right: '24px', top: '48px' }}>
        <Image src={ossoBranco} alt="" aria-hidden width={90} height={90} />
      </div>

      {/* Pata direita superior */}
      <div className="absolute opacity-40 pointer-events-none hidden md:block" style={{ right: '4px', top: '240px' }}>
        <Image src={pataBranca} alt="" aria-hidden width={90} height={70} style={{ transform: 'scaleX(-1)' }} />
      </div>

      {/* Cachorro direita */}
      <div className="absolute opacity-40 pointer-events-none hidden md:block" style={{ right: '16px', top: '440px' }}>
        <Image src={cachorroB} alt="" aria-hidden width={90} height={85} style={{ transform: 'scaleX(-1)' }} />
      </div>

        {/* Pote esquerdo inferior */}
      <div className="absolute opacity-40 pointer-events-none hidden md:block" style={{ right: '32px', bottom: '250px' }}>
        <Image src={poteB} alt="" aria-hidden width={90} height={70} />
      </div>

      {/* Lata direita inferior */}
      <div className="absolute opacity-40 pointer-events-none hidden md:block" style={{ right: '32px', bottom: '70px' }}>
        <Image src={lataB} alt="" aria-hidden width={90} height={70} />
      </div>
      {/* final*/}

      <div className="container mx-auto px-8 md:px-16 lg:px-20 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          <div className="flex flex-col order-1 lg:order-1 items-start lg:ml-12">
            
            {/* Sobretítulo */}
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

            {/* Diferenciais */}
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

          {/* Imagem */}
          <div className="order-2 lg:order-2 relative w-full max-w-[250px] md:max-w-[320px] lg:max-w-[380px] mx-auto mt-6 lg:mt-0">
            <div className="absolute top-3 left-3 w-full h-full rounded-xl bg-[#59C9DE] opacity-90" />
            <div className="absolute inset-y-0 right-0 w-4 bg-[#59C9DE] rounded-r-xl" />
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