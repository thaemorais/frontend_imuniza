import NavbarGeral from "../../components/NavbarGeral";
import PageTitle from "../../components/PageTitle";
import { FormInputMorador } from "./components/FormInputMorador";

export default function CadastrarVacina() {
	return (
		<>
			<NavbarGeral />
			<section className="max-w-[1280px] px-8 w-full my-8 mx-auto">
				<PageTitle title="CADASTRO DE MORADORES" />
				<FormInputMorador />
			</section>
		</>
	);
}
