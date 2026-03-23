import heroDog from "./assets/CachorrosHero.svg";
import Image from "next/image";

export default function Hero(){
    return(
        <div>


            <section className ="bg-[#FFE077] text-black relative overflow-hidden " >


                <div className="container mx-auto py-20 px-4 md:px-8 lg:px-12 relative">
                    
                    <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

                        <div className="space-y-8 flex flex-col justify-center text-center lg:text-left">
                            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry
                            </h1>
                            <p className="text-base md:text-lg text-gray-700 ">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry
                            </p>
                            <div className="pt-4 py-8 flex items-center justify-center lg:justify-start  gap-4">
                                <a href="#"
                                    className="bg-[#B569BE] hover:bg-[#a85ab0] px-10 py-3 rounded-lg font-bold uppercase text-white inline-flex items-center justify-center transition-colors"
                                >
                                    Contato
                                </a>
                            </div>
                        </div>


                        <div className="hidden lg:flex absolute bottom-0 right-0 w-3/5 max-w-[780px] h-[600px]">
                         <Image
                            src={heroDog}
                            alt="Cachorro Hero"
                            fill
                            className="object-contain object-bottom"
                            priority
                            />
                        </div>

                    </article>

                </div>

            </section>

        </div>
    )

}