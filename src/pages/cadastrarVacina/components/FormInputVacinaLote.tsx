import { useState, useEffect } from "react";
import { Button, Label, TextInput, Select } from "flowbite-react";
import { useVacinas } from "../../../contexts/VacinasContext";

interface FormData {
	lote: string;
	vacina: string;
	validade: string;
}

interface FormInputVacinaLoteProps {
	loteEmEdicao?: FormData | null;
	onSave: () => void;
}

export default function FormInputVacinaLote({
	loteEmEdicao,
	onSave,
}: FormInputVacinaLoteProps) {
	const { adicionarLote, editarLote, vacinas } = useVacinas();
	const [formData, setFormData] = useState<FormData>({
		lote: "",
		vacina: "",
		validade: "",
	});

	useEffect(() => {
		if (loteEmEdicao) {
			setFormData(loteEmEdicao);
		}
	}, [loteEmEdicao]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { id, value } = e.target;
		setFormData((prev) => ({ ...prev, [id]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (loteEmEdicao) {
			editarLote(formData);
		} else {
			adicionarLote(formData);
		}

		alert("Lote salvo com sucesso!");
		onSave();
		setFormData({
			lote: "",
			vacina: "",
			validade: "",
		});
	};

	return (
		<form
			className="mt-20 mb-1 flex max-w-xl flex-row justify-between items-center gap-4 mx-auto flex-wrap"
			onSubmit={handleSubmit}
		>
			<h3 className="text-xl font-semibold w-full">
				{loteEmEdicao ? "Editar Lote" : "Cadastrar Lote"}
			</h3>
			<div className="w-[48%]">
				<div className="mb-2 block">
					<Label htmlFor="lote" value="Número do Lote*" />
				</div>
				<TextInput
					id="lote"
					type="text"
					placeholder="123456"
					required
					shadow
					value={formData.lote}
					onChange={handleChange}
				/>
			</div>
			<div className="w-[48%]">
				<div className="mb-2 block">
					<Label htmlFor="vacina" value="Vacina*" />
				</div>
				<Select
					id="vacina"
					required
					value={formData.vacina}
					onChange={handleChange}
				>
					<option value="">Selecione uma vacina</option>
					{vacinas.map((vacina) => (
						<option key={vacina.nome} value={vacina.nome}>
							{vacina.nome}
						</option>
					))}
				</Select>
			</div>
			<div className="w-full">
				<div className="mb-2 block">
					<Label htmlFor="validade" value="Data de Validade*" />
				</div>
				<TextInput
					id="validade"
					type="date"
					required
					shadow
					value={formData.validade}
					onChange={handleChange}
				/>
			</div>
			<Button className="mx-auto" type="submit">
				{loteEmEdicao ? "Salvar Alterações" : "Cadastrar Lote"}
			</Button>
		</form>
	);
}
