import { useState } from "react";
import {
	Button,
	Checkbox,
	Label,
	TextInput,
	Select,
	Spinner,
} from "flowbite-react";
import { useVacinas } from "../../../contexts/VacinasContext";

interface FormData {
	nome: string;
	cnpjFabricante: string;
	tipo: string;
	doses: number;
	intervalo: string;
	indicacao: string[];
}

interface FormInputVacinaProps {
	formData: FormData;
	setFormData: React.Dispatch<React.SetStateAction<FormData>>;
	isEditing: boolean;
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
	editingVacina: string | null;
	setEditingVacina: React.Dispatch<React.SetStateAction<string | null>>;
	preencherFormularioParaEdicao: (vacina: FormData) => void;
}

export default function FormInputVacina({
	formData,
	setFormData,
	isEditing,
	setIsEditing,
	editingVacina,
	setEditingVacina,
}: FormInputVacinaProps) {
	const { adicionarVacina, editarVacina, fabricantes, vacinas } = useVacinas();
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { id, value, type } = e.target;

		if (type === "checkbox") {
			const checkboxEvent = e as React.ChangeEvent<HTMLInputElement>;
			setFormData((prev) => ({
				...prev,
				indicacao: checkboxEvent.target.checked
					? [...prev.indicacao, id]
					: prev.indicacao.filter((ind) => ind !== id),
			}));
		} else if (id === "doses") {
			const dosesValue = parseInt(value) || 1;
			setFormData((prev) => ({ ...prev, [id]: dosesValue }));
		} else {
			setFormData((prev) => ({ ...prev, [id]: value }));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		setIsLoading(true);

		try {
			const vacinaExistente = vacinas.some(
				(vacina) =>
					vacina.nome === formData.nome &&
					vacina.cnpjFabricante === formData.cnpjFabricante &&
					!isEditing
			);

			if (vacinaExistente) {
				alert(
					"Já existe uma vacina com este nome cadastrada para o mesmo fabricante. Por favor, insira um nome diferente ou altere o fabricante."
				);
				setIsLoading(false);
				return;
			}

			if (formData.indicacao.length === 0) {
				alert("Selecione pelo menos uma indicação para a vacina.");
				setIsLoading(false);
				return;
			}

			if (isEditing) {
				editarVacina(formData);
				setIsEditing(false);
				setEditingVacina(null);
				alert("Vacina editada com sucesso!");
			} else {
				await adicionarVacina(formData);
				alert("Vacina cadastrada com sucesso!");
			}

			setFormData({
				nome: "",
				cnpjFabricante: "",
				tipo: "",
				doses: 1,
				intervalo: "",
				indicacao: [],
			});
		} catch (error) {
			console.error("Erro ao salvar vacina:", error);
			alert("Erro ao salvar vacina. Tente novamente.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form
			className="mt-20 mb-1 grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto"
			onSubmit={handleSubmit}
		>
			<h3 className="text-xl font-semibold w-full md:col-span-3">
				{isEditing ? "Editar Vacina" : "Cadastre Vacinas"}
			</h3>
			<div className="w-full">
				<div className="mb-2 block">
					<Label htmlFor="nome" value="Nome da vacina*" />
				</div>
				<TextInput
					id="nome"
					type="text"
					placeholder="Pfizer-BioNTech"
					required
					shadow
					value={formData.nome}
					onChange={handleChange}
					disabled={isLoading || isEditing}
				/>
			</div>
			<div className="w-full">
				<div className="mb-2 block">
					<Label htmlFor="cnpjFabricante" value="Fabricante*" />
				</div>
				<Select
					id="cnpjFabricante"
					required
					value={formData.cnpjFabricante}
					onChange={handleChange}
					disabled={isLoading || isEditing}
				>
					<option value="">Selecione um fabricante</option>
					{fabricantes.map((fabricante) => (
						<option key={fabricante.cnpj} value={fabricante.cnpj}>
							{fabricante.nome}
						</option>
					))}
				</Select>
			</div>
			<div className="w-full">
				<div className="mb-2 block">
					<Label htmlFor="tipo" value="Tipo de vacina*" />
				</div>
				<TextInput
					id="tipo"
					type="text"
					placeholder="mRNA"
					required
					shadow
					value={formData.tipo}
					onChange={handleChange}
					disabled={isLoading}
				/>
			</div>
			<div className="w-full">
				<div className="mb-2 block">
					<Label htmlFor="doses" value="Doses necessárias*" />
				</div>
				<TextInput
					id="doses"
					type="number"
					placeholder="2"
					required
					shadow
					value={formData.doses}
					onChange={handleChange}
					disabled={isLoading}
				/>
			</div>
			<div className="w-full">
				<div className="mb-2 block">
					<Label htmlFor="intervalo" value="Intervalo entre as doses" />
				</div>
				<TextInput
					id="intervalo"
					type="text"
					placeholder="21 dias"
					shadow
					value={formData.intervalo}
					onChange={handleChange}
					disabled={isLoading}
				/>
			</div>
			<div className="w-full md:col-span-3">
				<div className="mb-2 block">
					<Label htmlFor="indicacao" value="Indicação (público alvo)*" />
				</div>
				<div className="flex flex-row flex-wrap items-center justify-start gap-3 space-y-2">
					{[
						{ id: "gestantes", label: "Gestantes" },
						{ id: "puérperas", label: "Puérperas" },
						{ id: "profissionais-saude", label: "Profissionais de Saúde" },
						{ id: "idosos", label: "Idosos (60+ anos)" },
						{ id: "criancas", label: "Crianças (0-11 anos)" },
						{ id: "adolescentes", label: "Adolescentes (12-17 anos)" },
						{ id: "adultos", label: "Adultos (18-59 anos)" },
						{ id: "comorbidades", label: "Pessoas com Comorbidades" },
						{ id: "imunossuprimidos", label: "Imunossuprimidos" },
						{ id: "indigenas", label: "Indígenas e Quilombolas" },
						{ id: "essenciais", label: "Trabalhadores Essenciais" },
						{ id: "populacao-geral", label: "População Geral" },
					].map((option) => (
						<div key={option.id} className="flex items-center space-x-2">
							<Checkbox
								id={option.id}
								checked={formData.indicacao.includes(option.id)}
								onChange={handleChange}
								disabled={isLoading}
							/>
							<Label htmlFor={option.id} value={option.label} />
						</div>
					))}
				</div>
			</div>
			<div className="flex items-center justify-center gap-3 md:col-span-3">
				<Button type="submit" disabled={isLoading}>
					{isLoading ? (
						<>
							<Spinner size="sm" className="mr-2" />
							Salvando...
						</>
					) : isEditing ? (
						"Salvar Alterações"
					) : (
						"Cadastrar Vacina"
					)}
				</Button>
				{isEditing && (
					<Button
						type="button"
						color="failure"
						onClick={() => {
							setIsEditing(false);
							setEditingVacina(null);
							setFormData({
								nome: "",
								cnpjFabricante: "",
								tipo: "",
								doses: 1,
								intervalo: "",
								indicacao: [],
							});
						}}
					>
						Cancelar Edição
					</Button>
				)}
			</div>
		</form>
	);
}
