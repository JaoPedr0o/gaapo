import EventoCard from "./EventoCard";
const eventosList = [
  { id: 1, name: "Café", image: "" },
  { id: 2, name: "Almoço", image: "" },
  { id: 3, name: "Janta", image: "" },
];

export default function PaginaEventos() {
  return (
   <main
      className="relative min-h-screen"
      style={{
        backgroundImage: "url('/images/eventosBg.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
      }}
    >
          <div className="z-10">
          
            {/* HEADER */}
            <div className="text-center py-10 px-4 flex flex-col items-center gap-2 ">
              <div>
                <h1 className="bg-[url('/images/eventosHeader.svg')] bg-no-repeat bg-center bg-size-[1000px_200px] text-2xl text-white px-6 py-1">
                  Fique por dentro do que a associação faz e planeja. Sua participação é fundamental para os nossos resgatados!
                </h1>
              </div>
            </div>
    
            {/* GRID */}
            <div className="grid grid-cols-1 gap-6 p-6 px-60">
              {eventosList.map((evento) => (
                <EventoCard key={evento.id} evento={evento} />
              ))}
            </div>
          </div>
        </main>
  );
}
