import PageTitle from "../../components/PageTitle";
import { JSX } from "react";
import ListaVacinas from "./components/ListaVacinas";
import FormInputFabricantes from "./components/FormInputFabricantes";
import FormInputVacina from "./components/FormInputVacina";
import FormInputVacinaLote from "./components/FormInputVacinaLote";

export default function CadastrarVacina(): JSX.Element {
	return (
		<>
			<section className="max-w-[1280px] px-8 w-full my-8 mx-auto">
				<PageTitle title="TUDO SOBRE VACINAS" />
				<FormInputFabricantes />
				<FormInputVacina />
				<FormInputVacinaLote />
			</section>
			<section className="max-w-[1280px] px-8 w-full my-8 mx-auto">
				<ListaVacinas />
			</section>
		</>
	);
}
