import { useState } from "react";
import { Label, Select, TextInput, Button } from "flowbite-react";
import { useMoradores } from "../../../contexts/MoradoresContext";
import { useVacinas } from "../../../contexts/VacinasContext";

interface FormData {
	morador: string;
	vacina: string;
	doseAplicada: number;
}

export default function FormInputAplicacoes() {
	const { moradores } = useMoradores();
	const { vacinas } = useVacinas();
	const [formData, setFormData] = useState<FormData>({
		morador: "",
		vacina: "",
		doseAplicada: 1,
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { id, value } = e.target;
		setFormData((prev) => ({ ...prev, [id]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Adicione a lógica para registrar a aplicação aqui
		alert("Aplicação registrada com sucesso!");
		setFormData({
			morador: "",
			vacina: "",
			doseAplicada: 1,
		});
	};

	// Ordenar moradores e vacinas por ordem alfabética
	const sortedMoradores = [...moradores].sort((a, b) =>
		a.nome.localeCompare(b.nome)
	);
	const sortedVacinas = [...vacinas].sort((a, b) =>
		a.nome.localeCompare(b.nome)
	);

	return (
		<form
			className="flex max-w-xl flex-row justify-between items-center gap-4 mx-auto flex-wrap"
			onSubmit={handleSubmit}
		>
			<div className="w-full">
				<div className="mb-2 block">
					<Label htmlFor="morador" value="Morador*" />
				</div>
				<Select
					id="morador"
					required
					value={formData.morador}
					onChange={handleChange}
				>
					<option value="">Selecione um morador</option>
					{sortedMoradores.map((morador) => (
						<option key={morador.cpf} value={morador.cpf}>
							{morador.nome}
						</option>
					))}
				</Select>
			</div>

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
					{sortedVacinas.map((vacina) => (
						<option key={vacina.nome} value={vacina.nome}>
							{vacina.nome}
						</option>
					))}
				</Select>
			</div>

			<div className="w-full">
				<div className="mb-2 block">
					<Label htmlFor="doseAplicada" value="Dose aplicada*" />
				</div>
				<TextInput
					id="doseAplicada"
					name="doseAplicada"
					type="text"
					value={formData.doseAplicada}
					onChange={handleChange}
					shadow
					required
				/>
			</div>
			<Button className="mx-auto" type="submit">
				Registrar Aplicação
			</Button>
		</form>
	);
}
