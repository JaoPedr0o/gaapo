import Hero from "./_components/Landing Page/Hero";
import Sobre from "./_components/Landing Page/Sobre";
import Contato from "./_components/Landing Page/Contato";
import Carrosel from "./_components/Landing Page/Carrosel";
import Mapa from "./_components/Landing Page/Mapa";



export default function Home() {
  return (
    <div>
      <main>
        <Hero />
        <Sobre />
        <Carrosel />
        <Mapa />
        <Contato />
        
      </main>
    </div>
  );
}
