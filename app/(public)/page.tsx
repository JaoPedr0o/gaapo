import Hero from "./_components/Hero";
import Sobre from "./_components/Sobre";
import Contato from "./_components/Contato";

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
