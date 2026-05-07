import FormularioEditarEvento from "./components/FormularioEditarEvento";

type EditarEventoPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditarEventoPage({
  params,
}: EditarEventoPageProps) {
  const { id } = await params;

  return <FormularioEditarEvento idEvento={id} />;
}