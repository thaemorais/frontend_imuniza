import NavbarGeral from "../../components/NavbarGeral";
import { FormInputVacina } from "./components/FormInputVacina";
import PageTitle from "../../components/PageTitle";

export default function CadastrarVacina() {
	return (
		<>
			<NavbarGeral />
			<section className="max-w-[1280px] px-8 w-full my-8 mx-auto">
				<PageTitle title="CADASTRO DE VACINAS" />
				<FormInputVacina />
			</section>
		</>
	);
}
