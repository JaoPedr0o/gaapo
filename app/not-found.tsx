import Image from "next/image"

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#C8F6FF] font-sans p-4 overflow-hidden">
      
      <div className="absolute top-[5%] left-[35%] opacity-80 animate-float">
        <Image src="/404-nuvem.svg" alt="Nuvem" width={100} height={50} className="w-20 md:w-32" unoptimized />
      </div>
      <div className="absolute top-[15%] right-[30%] animate-float" style={{ animationDelay: '1s' }}>
        <Image src="/404-nuvem.svg" alt="Nuvem" width={120} height={60} className="w-24 md:w-40" unoptimized />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-md">
        <div className="w-[70%] md:w-[400px]">
           <Image
            src="/404.svg"
            alt="404"
            width={400}
            height={200}
            className="w-full h-auto mb-4"
            priority
            unoptimized
          />
        </div>

        <h1 className="text-3xl md:text-6xl font-black text-[#2D2D2D] mb-8 md:mb-12 tracking-tight px-4">
          PÁGINA NÃO ENCONTRADA
        </h1>

        <div className="w-[80%] md:w-[350px] mb-8">
          <Image
            src="/404-animais.svg"
            alt="Animais dormindo"
            width={350}
            height={175}
            className="w-full h-auto"
            priority
            unoptimized
          />
        </div>

        <a
          className="flex h-12 md:h-14 items-center justify-center rounded-full bg-[#1A1A1A] px-10 md:px-16 text-lg md:text-xl font-bold text-white transition-all duration-300 hover:bg-zinc-800 hover:shadow-xl active:scale-95"
          href="/" 
        >
          RETORNAR
        </a>
      </div>

      <div className="absolute bottom-[-20px] left-[-30px] md:bottom-[-40px] md:left-[-50px] z-[5] animate-sway">
        <Image 
          src="/404-arbusto.svg" 
          alt="Arbusto" 
          width={250} 
          height={250} 
          className="w-40 md:w-[320px]" 
          unoptimized 
        />
      </div>

      <div className="absolute bottom-[-20px] right-[-30px] md:bottom-[-50px] md:right-[-60px] z-[5] -scale-x-100 animate-sway" style={{ animationDelay: '0.5s' }}>
        <Image 
          src="/404-arbusto.svg" 
          alt="Arbusto" 
          width={280} 
          height={280} 
          className="w-44 md:w-[350px]" 
          unoptimized 
        />
      </div>

      <div className="hidden md:block absolute bottom-[-30px] left-[40%] opacity-40 animate-sway">
        <Image src="/404-arbusto.svg" alt="Arbusto" width={150} height={150} unoptimized />
      </div>

    </div>
  )
}