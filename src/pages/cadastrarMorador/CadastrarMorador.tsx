import { JSX } from "react";
import PageTitle from "../../components/PageTitle";
import { FormInputMorador } from "./components/FormInputMorador";
import ListaMoradores from "./components/ListaMoradores";

export default function CadastrarVacina(): JSX.Element {
	return (
		<>
			<section className="max-w-[1280px] px-8 w-full my-8 mx-auto">
				<PageTitle title="CADASTRO DE MORADORES" />
				<FormInputMorador />
				<ListaMoradores />
			</section>
		</>
	);
}
