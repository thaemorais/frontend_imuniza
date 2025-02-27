import { useState } from "react";
import { Button, Label, Select, TextInput, Spinner } from "flowbite-react";
import { Aplicacao, useAplicacoes } from "../../../contexts/AplicacoesContext";
import { useMoradores } from "../../../contexts/MoradoresContext";
import {
	Fabricante,
	LoteVacina,
	useVacinas,
	Vacina,
} from "../../../contexts/VacinasContext";

export default function FormInputAplicacoes() {
	const { moradores, editarMorador } = useMoradores();
	const { lotes, vacinas, fabricantes } = useVacinas();
	const { aplicacoes, adicionarAplicacao } = useAplicacoes();
	const [formData, setFormData] = useState<Aplicacao>({
		cpfMorador: "",
		loteVacina: "",
		doseAplicada: 1,
	});
	const [selectedLote, setSelectedLote] = useState<LoteVacina | null>(null);
	const [selectedVacina, setSelectedVacina] = useState<Vacina | null>(null);
	const [selectedFabricante, setSelectedFabricante] =
		useState<Fabricante | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { id, value } = e.target;
		setFormData((prev) => ({ ...prev, [id]: value }));

		if (id === "loteVacina") {
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

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const aplicacaoExistente = aplicacoes.some(
				(aplicacao) =>
					aplicacao.cpfMorador === formData.cpfMorador &&
					aplicacao.loteVacina === formData.loteVacina &&
					aplicacao.doseAplicada === formData.doseAplicada
			);

			if (aplicacaoExistente) {
				alert("Este morador já recebeu esta dose desta vacina.");
				setIsLoading(false);
				return;
			}

			adicionarAplicacao(formData);
			alert("Aplicação cadastrada com sucesso!");

			const morador = moradores.find((m) => m.cpf === formData.cpfMorador);
			if (morador) {
				const vacinaAplicada = `${selectedVacina?.nome} - Lote: ${formData.loteVacina} - Dose: ${formData.doseAplicada}`;
				const vacinasAtualizadas = [...morador.vacinas, vacinaAplicada];
				editarMorador(formData.cpfMorador, {
					...morador,
					vacinas: vacinasAtualizadas,
				});
			}

			setFormData({
				cpfMorador: "",
				loteVacina: "",
				doseAplicada: 1,
			});
			setSelectedLote(null);
			setSelectedVacina(null);
			setSelectedFabricante(null);
		} catch (error) {
			console.error("Erro ao salvar aplicação:", error);
			alert("Erro ao salvar aplicação. Tente novamente.");
		} finally {
			setIsLoading(false);
		}
	};

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
					<Label htmlFor="cpfMorador" value="CPF do Morador*" />
				</div>
				<Select
					id="cpfMorador"
					required
					value={formData.cpfMorador}
					onChange={handleChange}
					disabled={isLoading}
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
					<Label htmlFor="loteVacina" value="Vacina/Lote*" />
				</div>
				<Select
					id="loteVacina"
					required
					value={formData.loteVacina}
					onChange={handleChange}
					disabled={isLoading}
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
			<div className="flex items-center justify-center gap-3 md:col-span-3">
				<Button type="submit" disabled={isLoading}>
					{isLoading ? (
						<>
							<Spinner size="sm" className="mr-2" />
							Salvando...
						</>
					) : (
						"Registrar Aplicação"
					)}
				</Button>
			</div>
		</form>
	);
}
