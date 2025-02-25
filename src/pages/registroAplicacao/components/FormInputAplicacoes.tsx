import { useState } from "react";
import { Label, Select, TextInput, Button } from "flowbite-react";
import { useMoradores, Morador } from "../../../contexts/MoradoresContext";
import {
	useVacinas,
	LoteVacina,
	Vacina,
	Fabricante,
} from "../../../contexts/VacinasContext";
import { useAplicacoes } from "../../../contexts/AplicacoesContext";

interface FormData {
	morador: string;
	vacinaLote: string;
	doseAplicada: number;
}

export default function FormInputAplicacoes() {
	const { moradores, editarMorador } = useMoradores();
	const { lotes, vacinas, fabricantes } = useVacinas();
	const { aplicacoes, adicionarAplicacao } = useAplicacoes();
	const [formData, setFormData] = useState<FormData>({
		morador: "",
		vacinaLote: "",
		doseAplicada: 1,
	});
	const [selectedLote, setSelectedLote] = useState<LoteVacina | null>(null);
	const [selectedVacina, setSelectedVacina] = useState<Vacina | null>(null);
	const [selectedFabricante, setSelectedFabricante] =
		useState<Fabricante | null>(null);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { id, value } = e.target;
		setFormData((prev) => ({ ...prev, [id]: value }));

		if (id === "vacinaLote") {
			const lote = lotes.find((lote) => lote.lote === value);
			setSelectedLote(lote || null);
			if (lote) {
				const vacina = vacinas.find((vacina) => vacina.nome === lote.vacina);
				setSelectedVacina(vacina || null);
				if (vacina) {
					const fabricante = fabricantes.find(
						(fab) => fab.cnpj === vacina.cnpjFabricante
					);
					setSelectedFabricante(fabricante || null);
				} else {
					setSelectedFabricante(null);
				}
			} else {
				setSelectedVacina(null);
				setSelectedFabricante(null);
			}
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Verificar se a aplicação já existe
		const aplicacaoExistente = aplicacoes.some(
			(aplicacao) =>
				aplicacao.cpfMorador === formData.morador &&
				aplicacao.loteVacina === formData.vacinaLote &&
				aplicacao.doseAplicada === formData.doseAplicada
		);

		if (aplicacaoExistente) {
			alert("Este morador já recebeu esta dose desta vacina.");
			return;
		}

		// Adicionar a aplicação
		adicionarAplicacao({
			cpfMorador: formData.morador,
			loteVacina: formData.vacinaLote,
			doseAplicada: formData.doseAplicada,
		});

		// Atualizar a lista de vacinas do morador
		const morador = moradores.find((m) => m.cpf === formData.morador);
		if (morador) {
			const vacinaAplicada = `${selectedVacina?.nome} - Lote: ${formData.vacinaLote} - Dose: ${formData.doseAplicada}`;
			const vacinasAtualizadas = [...morador.vacinas, vacinaAplicada];
			editarMorador(formData.morador, {
				...morador,
				vacinas: vacinasAtualizadas,
			});
		}

		alert("Aplicação registrada com sucesso!");
		setFormData({
			morador: "",
			vacinaLote: "",
			doseAplicada: 1,
		});
		setSelectedLote(null);
		setSelectedVacina(null);
		setSelectedFabricante(null);
	};

	// Ordenar moradores e lotes por ordem alfabética
	const sortedMoradores = [...moradores].sort((a, b) =>
		a.nome.localeCompare(b.nome)
	);
	const sortedLotes = [...lotes].sort((a, b) =>
		a.vacina.localeCompare(b.vacina)
	);

	return (
		<form
			className="mt-20 mb-1 grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto"
			onSubmit={handleSubmit}
		>
			<h3 className="text-xl font-semibold w-full md:col-span-3">
				Registrar Aplicação
			</h3>
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
					<Label htmlFor="vacinaLote" value="Vacina/Lote*" />
				</div>
				<Select
					id="vacinaLote"
					required
					value={formData.vacinaLote}
					onChange={handleChange}
				>
					<option value="">Selecione uma vacina/lote</option>
					{sortedLotes.map((lote) => (
						<option key={lote.lote} value={lote.lote}>
							{lote.vacina} - Lote: {lote.lote}
						</option>
					))}
				</Select>
			</div>

			<div className="w-full">
				<div className="mb-2 block">
					<Label htmlFor="doseAplicada" value="Dose aplicada*" />
				</div>
				{selectedVacina && selectedVacina.doses === 1 ? (
					<TextInput
						id="doseAplicada"
						name="doseAplicada"
						type="text"
						value="1"
						disabled
						shadow
						required
					/>
				) : (
					<Select
						id="doseAplicada"
						required
						value={formData.doseAplicada}
						onChange={handleChange}
					>
						<option value="">Selecione a dose</option>
						{selectedVacina &&
							Array.from({ length: selectedVacina.doses }, (_, i) => (
								<option key={i + 1} value={i + 1}>
									{i + 1}ª Dose
								</option>
							))}
					</Select>
				)}
			</div>

			<Button className="mx-auto md:col-span-3" type="submit">
				Registrar Aplicação
			</Button>
		</form>
	);
}
