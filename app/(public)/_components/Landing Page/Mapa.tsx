import { MapPin, Clock } from "lucide-react";

export default function Mapa() {
  return (
    <section className="w-full bg-yellow-200 py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center gap-5 mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center leading-tight">
          Onde fica a{" "}
          <span className="text-[#B569BE]">GAAPO?</span>
        </h2>

        <div className="bg-[#B569BE] text-white text-sm sm:text-base font-medium text-center px-6 py-3 rounded-full max-w-xl leading-relaxed">
          Venha nos visitar! Estamos sempre de portas abertas para receber
          pacientes, familiares e voluntários com muito acolhimento.
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12">
        <div className="w-full lg:w-2/5">
          <div className="bg-[#B569BE] border-2 border-white rounded-2xl p-8 lg:p-10 h-full flex flex-col gap-8 shadow-[0_0_0_1px_rgba(255,255,255,0.3)]">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sky-400 flex items-center justify-center">
                <MapPin className="text-white w-5 h-5" />
              </div>
              <div className="text-white">
                <p className="font-bold text-lg mb-1">Endereço</p>
                <p className="text-sm sm:text-base leading-relaxed opacity-90">
                  Endereço a definir...
                </p>
              </div>
            </div>

            <div className="border-t border-white/20" />

            <div className="flex items-start gap-4">
              <div className="shrink-0 w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center">
                <Clock className="text-white w-5 h-5" />
              </div>
              <div className="text-white">
                <p className="font-bold text-lg mb-1">Atendimento</p>
                <p className="text-sm sm:text-base leading-relaxed opacity-90">
                  Segunda à Sexta – 8h às 19h
                  <br />
                  Sábado – 8h às 12h
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-3/5">
          <div className="relative w-full h-72 sm:h-80 lg:h-full min-h-[300px] lg:min-h-[450px]">
            <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-pink-300" />

            {/* Mapa do Google Maps */}

          <div className="relative w-full h-full rounded-2xl overflow-hidden border-[3px] border-white">
            <iframe
                title="Mapa GAAPO – Presidente Olegário"
                src="https://maps.google.com/maps?q=Presidente+Olegario+-+MG&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
            />
        </div>
        
          </div>
        </div>
      </div>
    </section>
  );
}