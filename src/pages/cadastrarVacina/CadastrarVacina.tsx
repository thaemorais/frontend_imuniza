import { FormInputVacina } from "./components/FormInputVacina";
import PageTitle from "../../components/PageTitle";
import { JSX } from "react";
import ListaVacinas from "./components/ListaVacinas";

export default function CadastrarVacina(): JSX.Element {
	return (
		<>
			<section className="max-w-[1280px] px-8 w-full my-8 mx-auto">
				<PageTitle title="CADASTRO DE VACINAS" />
				<FormInputVacina />
			</section>
			<section className="max-w-[1280px] px-8 w-full my-8 mx-auto">
				<ListaVacinas />
			</section>
		</>
	);
}
