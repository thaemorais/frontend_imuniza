import { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { useVacinas } from "../../../contexts/VacinasContext";

interface FormData {
	cnpj: string;
	nome: string;
	cep: string;
	numero: string;
	complemento: string;
}

export default function FormInputFabricantes() {
	const { adicionarFabricante } = useVacinas();
	const [formData, setFormData] = useState<FormData>({
		cnpj: "",
		nome: "",
		cep: "",
		numero: "",
		complemento: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setFormData((prev) => ({ ...prev, [id]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		adicionarFabricante(formData);
		setFormData({
			cnpj: "",
			nome: "",
			cep: "",
			numero: "",
			complemento: "",
		});
		alert("Fabricante cadastrado com sucesso!");
	};

	return (
		<form
			className="mt-20 mb-1 flex max-w-xl flex-row justify-between items-center gap-4 mx-auto flex-wrap"
			onSubmit={handleSubmit}
		>
			<h3 className="text-xl font-semibold w-full">Cadastre fabricantes</h3>
			<div className="w-[48%]">
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
				/>
			</div>
			<div className="w-[48%]">
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
				/>
			</div>
			<div className="w-[48%]">
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
				/>
			</div>
			<div className="w-[48%]">
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
				/>
			</div>
			<div className="w-full">
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
				/>
			</div>
			<Button className="mx-auto" type="submit">
				Cadastrar Fabricante
			</Button>
		</form>
	);
}
