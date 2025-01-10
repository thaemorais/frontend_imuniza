import { useState } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useVacinas } from "../../../contexts/VacinasContext";

interface FormData {
	nome: string;
	lote: string;
	fabricante: string;
	validade: string;
	tipo: string;
	doses: number;
	intervalo: string;
	indicacao: string[];
	agree: boolean;
}

export function FormInputVacina() {
	const { adicionarVacina } = useVacinas();
	const [formData, setFormData] = useState<FormData>({
		nome: "",
		lote: "",
		fabricante: "",
		validade: "",
		tipo: "",
		doses: 1,
		intervalo: "",
		indicacao: [],
		agree: false,
	});

	// Atualiza os dados do formulário
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value, type, checked } = e.target;

		if (type === "checkbox" && id !== "agree") {
			// Trata múltiplos checkboxes para "indicação"
			setFormData((prev) => ({
				...prev,
				indicacao: checked
					? [...prev.indicacao, id]
					: prev.indicacao.filter((ind) => ind !== id),
			}));
		} else if (type === "checkbox" && id === "agree") {
			// Checkbox de confirmação
			setFormData((prev) => ({ ...prev, [id]: checked }));
		} else {
			setFormData((prev) => ({ ...prev, [id]: value }));
		}
	};

	// Submete o formulário
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.agree) {
			alert("Você precisa confirmar que as informações são verdadeiras.");
			return;
		}

		// Adiciona a vacina ao contexto
		adicionarVacina({
			nome: formData.nome,
			lote: formData.lote,
			fabricante: formData.fabricante,
			validade: formData.validade,
			tipo: formData.tipo,
			doses: Number(formData.doses),
			intervalo: formData.intervalo || undefined,
			indicacao: formData.indicacao,
		});

		// Limpa o formulário
		setFormData({
			nome: "",
			lote: "",
			fabricante: "",
			validade: "",
			tipo: "",
			doses: 1,
			intervalo: "",
			indicacao: [],
			agree: false,
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
					<Label htmlFor="lote" value="Lote*" />
				</div>
				<TextInput
					id="lote"
					type="text"
					placeholder="PF1234CV"
					required
					shadow
					value={formData.lote}
					onChange={handleChange}
				/>
			</div>
			<div className="w-[48%]">
				<div className="mb-2 block">
					<Label htmlFor="fabricante" value="Fabricante*" />
				</div>
				<TextInput
					id="fabricante"
					type="text"
					placeholder="Pfizer"
					required
					shadow
					value={formData.fabricante}
					onChange={handleChange}
				/>
			</div>
			<div className="w-[48%]">
				<div className="mb-2 block">
					<Label htmlFor="validade" value="Validade*" />
				</div>
				<TextInput
					id="validade"
					type="text"
					placeholder="01/06/2025"
					required
					shadow
					value={formData.validade}
					onChange={handleChange}
				/>
			</div>
			<div className="w-full">
				<div className="mb-2 block">
					<Label
						htmlFor="tipo"
						value="Tipo de vacina (ex.: viral, bacteriana, mRNA, etc..)*"
					/>
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

			<div className="flex items-center gap-2">
				<Checkbox id="agree" checked={formData.agree} onChange={handleChange} />
				<Label htmlFor="agree" className="flex">
					Confirmo que as informações descritas acima são verdadeiras.
				</Label>
			</div>
			<Button className="mx-auto" type="submit">
				Cadastrar vacina
			</Button>
		</form>
	);
}
