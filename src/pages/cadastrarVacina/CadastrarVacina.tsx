import PageTitle from "../../components/PageTitle";
import { JSX } from "react";
import ListaVacinas from "./components/ListaVacinas";
import FormInputFabricantes from "./components/FormInputFabricantes";
import FormInputVacina from "./components/FormInputVacina";
import FormInputVacinaLote from "./components/FormInputVacinaLote";
import ListaFabricantes from "./components/ListaFabricantes";
import ListaLotes from "./components/ListaLotes";

export default function CadastrarVacina(): JSX.Element {
	return (
		<section className="mx-auto max-w-xl my-10 px-8 w-full scroll-smooth">
			<div className="mx-auto flex items-center justify-center gap-8 text-xl ">
				<a
					href="#fabricantes"
					className="border-b-2 border-b-cyan-300 hover:font-bold hover:border-b-[#0E7490] transition-all duration-300 ease-in-out"
				>
					Fabricantes
				</a>
				<a
					href="#vacinas"
					className="border-b-2 border-b-cyan-300 hover:font-bold hover:border-b-[#0E7490] transition-all duration-300 ease-in-out"
				>
					Vacinas
				</a>
				<a
					href="#lotes"
					className="border-b-2 border-b-cyan-300 hover:font-bold hover:border-b-[#0E7490] transition-all duration-300 ease-in-out"
				>
					Lotes
				</a>
			</div>
			<div className="">
				<div id="fabricantes">
					<FormInputFabricantes />
					<ListaFabricantes />
				</div>
				<hr></hr>
				<div id="vacinas">
					<FormInputVacina />
					<ListaVacinas />
				</div>
				<hr></hr>
				<div id="lotes">
					<FormInputVacinaLote />
					<ListaLotes />
				</div>
				<hr></hr>
			</div>
		</section>
	);
}
