import { useState } from "react";
import { Button, Checkbox, Label, TextInput, Select } from "flowbite-react";
import { useVacinas } from "../../../contexts/VacinasContext";

interface FormData {
	nome: string;
	cnpjFabricante: string;
	tipo: string;
	doses: number;
	intervalo: string;
	indicacao: string[];
}

export default function FormInputVacina() {
	const { adicionarVacina, fabricantes } = useVacinas();
	const [formData, setFormData] = useState<FormData>({
		nome: "",
		cnpjFabricante: "",
		tipo: "",
		doses: 1,
		intervalo: "",
		indicacao: [],
	});

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
		} else {
			setFormData((prev) => ({ ...prev, [id]: value }));
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		adicionarVacina(formData);
		setFormData({
			nome: "",
			cnpjFabricante: "",
			tipo: "",
			doses: 1,
			intervalo: "",
			indicacao: [],
		});
		alert("Vacina cadastrada com sucesso!");
	};

	return (
		<form
			className="flex max-w-xl flex-row justify-between items-center gap-4 mx-auto flex-wrap"
			onSubmit={handleSubmit}
		>
			<div className="w-[48%]">
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
				/>
			</div>
			<div className="w-[48%]">
				<div className="mb-2 block">
					<Label htmlFor="cnpjFabricante" value="Fabricante*" />
				</div>
				<Select
					id="cnpjFabricante"
					required
					value={formData.cnpjFabricante}
					onChange={handleChange}
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
				/>
			</div>
			<div className="w-[48%]">
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
				/>
			</div>
			<div className="w-[48%]">
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
				/>
			</div>
			<div className="w-full">
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
							/>
							<Label htmlFor={option.id} value={option.label} />
						</div>
					))}
				</div>
			</div>
			<Button className="mx-auto" type="submit">
				Cadastrar vacina
			</Button>
		</form>
	);
}
