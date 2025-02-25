import { useState, useEffect } from "react";
import { Button, Label, TextInput, Spinner } from "flowbite-react";
import { useVacinas } from "../../../contexts/VacinasContext";
import getEnderecoFromCEP from "../../utils/getEnderecoFromCEP";

interface FormData {
	cnpj: string;
	nome: string;
	cep: string;
	numero: string;
	complemento: string;
}

interface FormInputFabricantesProps {
	fabricanteEmEdicao?: FormData | null;
	onSave: () => void;
}

export default function FormInputFabricantes({
	fabricanteEmEdicao,
	onSave,
}: FormInputFabricantesProps) {
	const { adicionarFabricante, editarFabricante } = useVacinas();
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState<FormData>({
		cnpj: "",
		nome: "",
		cep: "",
		numero: "",
		complemento: "",
	});

	useEffect(() => {
		if (fabricanteEmEdicao) {
			setFormData(fabricanteEmEdicao);
		}
	}, [fabricanteEmEdicao]);

	// Mascaras (react-input-mask não tava funcionando)
	const applyMask = (value: string, mask: string) => {
		let i = 0;
		return mask.replace(/#/g, () => value[i++] || "");
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;

		let maskedValue = value;

		if (id === "cnpj") {
			maskedValue = applyMask(value.replace(/\D/g, ""), "##.###.###/####-##");
		}
		if (id === "cep") {
			maskedValue = applyMask(value.replace(/\D/g, ""), "##.###-###");
		}

		// Update formData with the masked value
		setFormData((prevData) => ({
			...prevData,
			[id]: maskedValue,
		}));
	};

	const validaCEP = async (cep: string): Promise<boolean> => {
		try {
			// Remove non-numeric characters for API call
			const cepNumerico = cep.replace(/\D/g, "");
			const endereco = await getEnderecoFromCEP(cepNumerico);
			return !!endereco;
		} catch (error) {
			console.error("Erro ao validar CEP:", error);
			return false;
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Ativa estado de loading
		setIsLoading(true);

		try {
			// Valida o CEP
			const cepValido = await validaCEP(formData.cep);
			if (!cepValido) {
				alert("CEP inválido. Por favor, insira um CEP válido.");
				return; // Interrompe a execução se o CEP for inválido
			}

			if (fabricanteEmEdicao) {
				editarFabricante(formData);
			} else {
				await adicionarFabricante(formData);
			}

			alert("Fabricante salvo com sucesso!");
			onSave();
		} catch (error) {
			console.error("Erro ao salvar fabricante:", error);
			alert("Erro ao salvar fabricante. Tente novamente.");
		} finally {
			// Desativa estado de loading independente do resultado
			setIsLoading(false);
		}
	};

	return (
		<form
			className="mt-20 mb-1 grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto"
			onSubmit={handleSubmit}
		>
			<h3 className="text-xl font-semibold w-full md:col-span-3">
				{fabricanteEmEdicao ? "Editar Fabricante" : "Cadastre Fabricantes"}
			</h3>
			<div className="w-full">
				<div className="mb-2 block">
					<Label htmlFor="cnpj" value="CNPJ*" />
				</div>
				<TextInput
					id="cnpj"
					type="text"
					placeholder="00.000.000/0000-00"
					required
					shadow
					value={formData.cnpj}
					onChange={handleChange}
					disabled={isLoading}
				/>
			</div>
			<div className="w-full">
				<div className="mb-2 block">
					<Label htmlFor="nome" value="Nome do Fabricante*" />
				</div>
				<TextInput
					id="nome"
					type="text"
					placeholder="Fabricante X"
					required
					shadow
					value={formData.nome}
					onChange={handleChange}
					disabled={isLoading}
				/>
			</div>
			<div className="w-full">
				<div className="mb-2 block">
					<Label htmlFor="cep" value="CEP*" />
				</div>
				<TextInput
					id="cep"
					type="text"
					placeholder="00000-000"
					required
					shadow
					value={formData.cep}
					onChange={handleChange}
					disabled={isLoading}
				/>
			</div>
			<div className="w-full">
				<div className="mb-2 block">
					<Label htmlFor="numero" value="Número*" />
				</div>
				<TextInput
					id="numero"
					type="text"
					placeholder="123"
					required
					shadow
					value={formData.numero}
					onChange={handleChange}
					disabled={isLoading}
				/>
			</div>
			<div className="w-full md:col-span-2">
				<div className="mb-2 block">
					<Label htmlFor="complemento" value="Complemento" />
				</div>
				<TextInput
					id="complemento"
					type="text"
					placeholder="Bloco A"
					shadow
					value={formData.complemento}
					onChange={handleChange}
					disabled={isLoading}
				/>
			</div>
			<Button
				className="mx-auto md:col-span-3"
				type="submit"
				disabled={isLoading}
			>
				{isLoading ? (
					<>
						<Spinner size="sm" className="mr-2" />
						Salvando...
					</>
				) : (
					"Salvar Fabricante"
				)}
			</Button>
		</form>
	);
}
