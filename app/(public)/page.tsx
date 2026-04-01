import Hero from "./_components/Landing Page/Hero";
import Sobre from "./_components/Landing Page/Sobre";
import Contato from "./_components/Landing Page/Contato";

export default function Home() {
  return (
    <div>
      <main>
        <Hero />
        <Sobre />
        <Contato />
      </main>
    </div>
  );
}
