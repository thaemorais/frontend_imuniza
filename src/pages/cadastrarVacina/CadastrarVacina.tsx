import { useState } from "react";
import PageTitle from "../../components/PageTitle";
import ListaVacinas from "./components/ListaVacinas";
import FormInputFabricantes from "./components/FormInputFabricantes";
import FormInputVacina from "./components/FormInputVacina";
import FormInputVacinaLote from "./components/FormInputVacinaLote";
import ListaFabricantes from "./components/ListaFabricantes";
import ListaLotes from "./components/ListaLotes";

interface Fabricante {
	cnpj: string;
	nome: string;
	cep: string;
	numero: string;
	complemento: string;
}

interface Vacina {
	nome: string;
	cnpjFabricante: string;
	tipo: string;
	doses: number;
	intervalo: string;
	indicacao: string[];
}

interface LoteVacina {
	lote: string;
	vacina: string;
	validade: string;
	quantidade?: number;
	dataRecebimento?: string;
	observacoes?: string;
}

export default function CadastrarVacina() {
	// Estado para formulário de fabricantes
	const [formDataFabricante, setFormDataFabricante] = useState<Fabricante>({
		cnpj: "",
		nome: "",
		cep: "",
		numero: "",
		complemento: "",
	});
	const [isEditingFabricante, setIsEditingFabricante] =
		useState<boolean>(false);
	const [editingCnpjFabricante, setEditingCnpjFabricante] = useState<
		string | null
	>(null);

	// Estado para formulário de vacinas
	const [formDataVacina, setFormDataVacina] = useState<Vacina>({
		nome: "",
		cnpjFabricante: "",
		tipo: "",
		doses: 1,
		intervalo: "",
		indicacao: [],
	});
	const [isEditingVacina, setIsEditingVacina] = useState<boolean>(false);
	const [editingNomeVacina, setEditingNomeVacina] = useState<string | null>(
		null
	);

	// Estado para formulário de lotes
	const [formDataLote, setFormDataLote] = useState<LoteVacina>({
		lote: "",
		vacina: "",
		validade: "",
	});
	const [isEditingLote, setIsEditingLote] = useState<boolean>(false);
	const [editingNumeroLote, setEditingNumeroLote] = useState<string | null>(
		null
	);

	// Handlers para edição de fabricantes
	const preencherFormularioParaEdicaoFabricante = (fabricante: Fabricante) => {
		setFormDataFabricante(fabricante);
		setIsEditingFabricante(true);
		setEditingCnpjFabricante(fabricante.cnpj);
	};

	// Handlers para edição de vacinas
	const preencherFormularioParaEdicaoVacina = (vacina: Vacina) => {
		setFormDataVacina(vacina);
		setIsEditingVacina(true);
		setEditingNomeVacina(vacina.nome);
	};

	// Handlers para edição de lotes
	const preencherFormularioParaEdicaoLote = (lote: LoteVacina) => {
		setFormDataLote(lote);
		setIsEditingLote(true);
		setEditingNumeroLote(lote.lote);
	};

	return (
		<section className="mx-auto max-w-[1280px] my-10 px-8 w-full scroll-smooth">
			<PageTitle title="Cadastro de Vacinas" />
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
						formData={formDataFabricante}
						setFormData={setFormDataFabricante}
						isEditing={isEditingFabricante}
						setIsEditing={setIsEditingFabricante}
						editingCnpj={editingCnpjFabricante}
						setEditingCnpj={setEditingCnpjFabricante}
						preencherFormularioParaEdicao={
							preencherFormularioParaEdicaoFabricante
						}
					/>
					<ListaFabricantes
						onEdit={preencherFormularioParaEdicaoFabricante}
						onDelete={() => {
							setIsEditingFabricante(false);
							setEditingCnpjFabricante(null);
							setFormDataFabricante({
								cnpj: "",
								nome: "",
								cep: "",
								numero: "",
								complemento: "",
							});
						}}
					/>
				</div>
				<hr className="my-8" />
				<div id="vacinas">
					<FormInputVacina
						formData={formDataVacina}
						setFormData={setFormDataVacina}
						isEditing={isEditingVacina}
						setIsEditing={setIsEditingVacina}
						editingVacina={editingNomeVacina}
						setEditingVacina={setEditingNomeVacina}
						preencherFormularioParaEdicao={preencherFormularioParaEdicaoVacina}
					/>
					<ListaVacinas onEdit={preencherFormularioParaEdicaoVacina} />
				</div>
				<hr className="my-8" />
				<div id="lotes">
					<FormInputVacinaLote
						formData={formDataLote}
						setFormData={setFormDataLote}
						isEditing={isEditingLote}
						setIsEditing={setIsEditingLote}
						editingNumeroLote={editingNumeroLote}
						setEditingNumeroLote={setEditingNumeroLote}
						preencherFormularioParaEdicao={preencherFormularioParaEdicaoLote}
					/>
					<ListaLotes onEdit={preencherFormularioParaEdicaoLote} />
				</div>
				<hr className="my-8" />
			</div>
		</section>
	);
}
