import { useState, useEffect } from "react";
import { Button, Label, TextInput, Select, Spinner } from "flowbite-react";
import { LoteVacina, useVacinas } from "../../../contexts/VacinasContext";

interface FormData {
	lote: string;
	vacina: string;
	validade: string;
}

interface FormInputVacinaLoteProps {
	formData: LoteVacina;
	setFormData: React.Dispatch<React.SetStateAction<LoteVacina>>;
	isEditing: boolean;
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
	editingNumeroLote: string | null;
	setEditingNumeroLote: React.Dispatch<React.SetStateAction<string | null>>;
	preencherFormularioParaEdicao: (lote: LoteVacina) => void;
}

export default function FormInputVacinaLote({
	formData,
	setFormData,
	isEditing,
	setIsEditing,
	editingNumeroLote,
	setEditingNumeroLote,
	preencherFormularioParaEdicao,
}: FormInputVacinaLoteProps) {
	const { adicionarLote, editarLote, vacinas } = useVacinas();
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { id, value } = e.target;
		setFormData((prev) => ({ ...prev, [id]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		setIsLoading(true);

		try {
			if (isEditing && editingNumeroLote) {
				editarLote(formData); // Atualiza o lote no contexto
				setIsEditing(false);
				setEditingNumeroLote(null);
				alert("Lote editado com sucesso!");
			} else {
				adicionarLote(formData); // Adiciona um novo lote no contexto
				alert("Lote cadastrado com sucesso!");
			}

			// Limpa o formulário após o envio
			setFormData({ lote: "", vacina: "", validade: "" });
		} catch (error) {
			console.error("Erro ao salvar Lote de Vacina:", error);
			alert("Erro ao salvar Lote de Vacina. Tente novamente.");
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
				{isEditing ? "Editar Lote" : "Cadastrar Lote"}
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
					disabled={isLoading}
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
					disabled={isLoading}
				/>
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
					disabled={isLoading}
				/>
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
						"Cadastrar Fabricante"
					)}
				</Button>
				{isEditing && (
					<Button
						type="button"
						color="failure"
						onClick={() => {
							setIsEditing(false);
							setEditingNumeroLote(null);
							setFormData({ lote: "", vacina: "", validade: "" });
						}}
					>
						Cancelar Edição
					</Button>
				)}
			</div>
		</form>
	);
}
