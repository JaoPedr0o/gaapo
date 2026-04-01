"use client";

import Image from "next/image";
import heroDog from "../assets/CachorrosHero.svg";

export default function Hero() {
    return(
        <div>

            <section className="bg-[#FFE077] text-black relative overflow-hidden">

                <div className="container mx-auto py-20 px-4 md:px-8 lg:px-12 relative min-h-[80vh] xl:min-h-0 flex items-center">
                    
                    <article className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-center w-full">

                        <div className="space-y-8 flex flex-col justify-center items-center text-center xl:items-start xl:text-left">
                            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry
                            </h1>

                            <p className="text-base md:text-lg text-gray-700">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry
                            </p>

                            <div className="pt-4 py-8 flex items-center justify-center xl:justify-start gap-4">

                                <button
                                    onClick={() => {
                                        const element = document.getElementById('contato');
                                        if (element) {
                                            element.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }}
                                    className="bg-[#B569BE] hover:bg-[#a85ab0] px-10 py-3 rounded-lg font-bold uppercase text-white inline-flex items-center justify-center transition-colors"
                                >
                                    Contato
                                </button>

                            </div>
                        </div>

                        <div className="hidden xl:flex absolute bottom-0 right-0 w-3/5 max-w-[700px] h-[600px]">
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