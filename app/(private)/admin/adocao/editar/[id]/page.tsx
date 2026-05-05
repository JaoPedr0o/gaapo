import FormularioEditarAdocao from "./components/FormularioEditarAdocao";

type EditarAnimalAdocaoPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditarAnimalAdocaoPage({
  params,
}: EditarAnimalAdocaoPageProps) {
  const { id } = await params;

  return <FormularioEditarAdocao idAnimal={id} />;
}