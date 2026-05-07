import FormularioEditarPrestacaoContas from "./components/FormularioEditarPrestacaoContas";

type EditarPrestacaoContasPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditarPrestacaoContasPage({
  params,
}: EditarPrestacaoContasPageProps) {
  const { id } = await params;

  return <FormularioEditarPrestacaoContas idPrestacao={id} />;
}