import { useState } from "react";
import { Button, Label, TextInput, Select } from "flowbite-react";
import { useVacinas } from "../../../contexts/VacinasContext";

interface FormData {
	vacina: string;
	lote: string;
	validade: string;
}

export default function FormInputVacinaLote() {
	const { adicionarLote, vacinas } = useVacinas();
	const [formData, setFormData] = useState<FormData>({
		vacina: "",
		lote: "",
		validade: "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { id, value } = e.target;
		setFormData((prev) => ({ ...prev, [id]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const validadeDate = new Date(
			formData.validade.split("/").reverse().join("-")
		);
		const currentDate = new Date();

		if (validadeDate <= currentDate) {
			alert(
				"A vacina está vencida. Por favor, insira uma data de validade posterior à data atual."
			);
			return;
		}

		adicionarLote(formData);
		setFormData({
			vacina: "",
			lote: "",
			validade: "",
		});
		alert("Lote cadastrado com sucesso!");
	};

	return (
		<form
			className="mt-20 mb-1 flex max-w-xl flex-row justify-between items-center gap-4 mx-auto flex-wrap"
			onSubmit={handleSubmit}
		>
			<h3 className="text-xl font-semibold w-full">
				Cadastre lotes de vacinas
			</h3>
			<div className="w-full">
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
					<Label htmlFor="validade" value="Validade*" />
				</div>
				<TextInput
					id="validade"
					type="date"
					placeholder="DD/MM/AAAA"
					required
					shadow
					value={formData.validade}
					onChange={handleChange}
				/>
			</div>
			<Button className="mx-auto" type="submit">
				Cadastrar Lote
			</Button>
		</form>
	);
}
