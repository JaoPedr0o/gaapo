// app/(public)/_components/Sobre.tsx

import Image from "next/image";
import sobreImg from "./assets/Sobre-img.png";
import sobreBg from "./assets/Sobre.svg";

export default function Sobre() {
  return (
    <section className="relative overflow-hidden bg-[#B569BE] text-white">

    
      <Image
        src={sobreBg}
        alt=""
        fill
        className="object-cover object-center pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto py-16 px-4 md:px-8 lg:px-12">

        {/* Título */}
        <div className="flex justify-center mb-10">
          <h2 className="bg-[#5ECFCF] text-white font-bold text-xl md:text-2xl px-10 py-3 rounded-full">
            Sobre a GAAPO
          </h2>
        </div>


        {/* Conteúdo: imagem + texto */}
        <div className="flex flex-col md:flex-row gap-8 items-start">

          {/* Imagem */}
          <div className="hidden lg:flex w-full md:w-[280px] lg:w-[350px] flex-shrink-0 mx-auto md:mx-0">
            <div className="relative w-full aspect-[3/4] md:h-[600px] rounded-xl overflow-hidden">
              <Image
                src={sobreImg}
                alt="Sobre a GAAPO"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>



          {/* Texto */}
          <div className="flex-1 min-w-0 max-w-[660px] lg:max-w-[820px] md:ml-8">
            <p className="text-white text-xs md:text-sm lg:text-base xl:text-lg leading-relaxed text-justify">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy text
              ever since the 1500s, when an unknown printer took a galley of type
              and scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with
              the release of Letraset sheets containing Lorem Ipsum passages, and
              more recently with desktop publishing software like Aldus PageMaker
              including versions of Lorem Ipsum.
              
            </p>
            <p className="text-white text-xs md:text-sm lg:text-base xl:text-lg leading-relaxed text-justify">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy text
              ever since the 1500s, when an unknown printer took a galley of type
              and scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with
              the release of Letraset sheets containing Lorem Ipsum passages, and
              more recently with desktop publishing software like Aldus PageMaker
              including versions of Lorem Ipsum.
              
            </p>
             <p className="text-white text-xs md:text-sm lg:text-base xl:text-lg leading-relaxed text-justify">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy text
              ever since the 1500s, when an unknown printer took a galley of type
              and scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with
              the release of Letraset sheets containing Lorem Ipsum passages, and
              more recently with desktop publishing software like Aldus PageMaker
              including versions of Lorem Ipsum.
              
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}