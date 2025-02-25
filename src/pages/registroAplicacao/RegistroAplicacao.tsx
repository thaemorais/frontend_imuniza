import PageTitle from "../../components/PageTitle";
import FormInputAplicacoes from "./components/FormInputAplicacoes";
import ListaAplicacoes from "./components/ListaAplicacoes";

export default function RegistroAplicacao() {
	return (
		<section>
			<PageTitle title="REGISTRAR APLICAÇÃO" />
			<FormInputAplicacoes />
			<ListaAplicacoes />
		</section>
	);
}
