import PageTitle from "../../components/PageTitle";
import { JSX, useState } from "react";
import ListaVacinas from "./components/ListaVacinas";
import FormInputFabricantes from "./components/FormInputFabricantes";
import FormInputVacina from "./components/FormInputVacina";
import FormInputVacinaLote from "./components/FormInputVacinaLote";
import ListaFabricantes from "./components/ListaFabricantes";
import ListaLotes from "./components/ListaLotes";
import { Fabricante, Vacina, LoteVacina } from "../../contexts/VacinasContext";

export default function CadastrarVacina(): JSX.Element {
	const [fabricanteEmEdicao, setFabricanteEmEdicao] =
		useState<Fabricante | null>(null);
	const [vacinaEmEdicao, setVacinaEmEdicao] = useState<Vacina | null>(null);
	const [loteEmEdicao, setLoteEmEdicao] = useState<LoteVacina | null>(null);

	const handleEditFabricante = (fabricante: Fabricante) => {
		setFabricanteEmEdicao(fabricante);
	};

	const handleDeleteFabricante = (cnpj: string) => {
		setFabricanteEmEdicao(null);
	};

	const handleSaveFabricante = () => {
		setFabricanteEmEdicao(null);
	};

	const handleEditVacina = (vacina: Vacina) => {
		setVacinaEmEdicao(vacina);
	};

	const handleDeleteVacina = (nome: string) => {
		setVacinaEmEdicao(null);
	};

	const handleSaveVacina = () => {
		setVacinaEmEdicao(null);
	};

	const handleEditLote = (lote: LoteVacina) => {
		setLoteEmEdicao(lote);
	};

	const handleDeleteLote = (lote: string) => {
		setLoteEmEdicao(null);
	};

	const handleSaveLote = () => {
		setLoteEmEdicao(null);
	};

	return (
		<section className="mx-auto max-w-[1280px] my-10 px-8 w-full scroll-smooth">
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
					<FormInputFabricantes
						fabricanteEmEdicao={fabricanteEmEdicao}
						onSave={handleSaveFabricante}
					/>
					<ListaFabricantes
						onEdit={handleEditFabricante}
						onDelete={handleDeleteFabricante}
					/>
				</div>
				<hr></hr>
				<div id="vacinas">
					<FormInputVacina
						vacinaEmEdicao={vacinaEmEdicao}
						onSave={handleSaveVacina}
					/>
					<ListaVacinas onEditVacina={handleEditVacina} />
				</div>
				<hr></hr>
				<div id="lotes">
					<FormInputVacinaLote
						loteEmEdicao={loteEmEdicao}
						onSave={handleSaveLote}
					/>
					<ListaLotes onEditLote={handleEditLote} />
				</div>
				<hr></hr>
			</div>
		</section>
	);
}
