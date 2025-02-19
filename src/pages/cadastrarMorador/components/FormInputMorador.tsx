import { Button, Label, TextInput } from "flowbite-react";
import { JSX, useState } from "react";
import { useMoradores } from "../../../contexts/MoradoresContext";

interface FormData {
	nome: string;
	cpf: string;
	sus: string;
	cep: string;
	numero: string;
	complemento: string;
	dataNasc: Date;
	nomeMae: string;
	sexo: string;
	estadoCivil: string;
	escolaridade: string;
	etnia: string;
	planoSaude: boolean;
	vacinas: string[];
}

export function FormInputMorador(): JSX.Element {
	const { adicionarMorador } = useMoradores();
	const vacinas = localStorage.getItem("vacinas");
	console.log(vacinas);

	// Estado único com todos os dados do formulário
	const [formData, setFormData] = useState<FormData>({
		nome: "",
		cpf: "",
		sus: "",
		cep: "",
		numero: "",
		complemento: "",
		dataNasc: new Date(),
		nomeMae: "",
		sexo: "",
		estadoCivil: "",
		escolaridade: "",
		etnia: "",
		planoSaude: false,
		vacinas: [],
	});

	// Função para atualizar o valor de um campo no formData
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;

		if (name === "vacinas") {
			setFormData((prevState) => {
				const vacinasSelecionadas = checked
					? [...prevState.vacinas, value]
					: prevState.vacinas.filter((vacina) => vacina !== value);
				return {
					...prevState,
					vacinas: vacinasSelecionadas,
				};
			});
		} else {
			setFormData((prevState) => ({
				...prevState,
				[name]: type === "checkbox" ? checked : value,
			}));
		}
	};

	// Função para enviar o formulário
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Adiciona o novo morador ao contexto
		adicionarMorador({
			nome: formData.nome,
			cpf: formData.cpf,
			sus: formData.sus,
			cep: formData.cep,
			numero: formData.numero,
			complemento: formData.complemento,
			dataNasc: formData.dataNasc,
			nomeMae: formData.nomeMae,
			sexo: formData.sexo,
			estadoCivil: formData.estadoCivil,
			escolaridade: formData.escolaridade,
			etnia: formData.etnia,
			planoSaude: formData.planoSaude,
			vacinas: formData.vacinas,
		});

		// Limpa os campos do formulário após o envio
		setFormData({
			nome: "",
			cpf: "",
			sus: "",
			cep: "",
			numero: "",
			complemento: "",
			dataNasc: new Date(0),
			nomeMae: "",
			sexo: "",
			estadoCivil: "",
			escolaridade: "",
			etnia: "",
			planoSaude: false,
			vacinas: [],
		});
	};

	return (
		<>
			<form
				className="flex max-w-xl flex-row justify-between items-center gap-4 mx-auto flex-wrap"
				onSubmit={handleSubmit}
			>
				<div className="w-full">
					<div className="mb-2 block">
						<Label htmlFor="nome" value="Nome do Morador*" />
					</div>
					<TextInput
						id="nome"
						name="nome"
						type="text"
						value={formData.nome}
						onChange={handleChange}
						required
						shadow
					/>
				</div>

				<div className="w-[48%]">
					<div className="mb-2 block">
						<Label htmlFor="cartaoSUS" value="Cartão do SUS" />
					</div>
					<TextInput
						id="cartaoSUS"
						name="sus"
						type="text"
						value={formData.sus}
						onChange={handleChange}
						shadow
					/>
				</div>

				<div className="w-[48%]">
					<div className="mb-2 block">
						<Label htmlFor="cpf" value="CPF*" />
					</div>
					<TextInput
						id="cpf"
						name="cpf"
						type="text"
						value={formData.cpf}
						onChange={handleChange}
						required
						shadow
					/>
				</div>
				<div className="w-[48%]">
					<div className="mb-2 block">
						<Label htmlFor="cep" value="Cep*" />
					</div>
					<TextInput
						id="cep"
						name="cep"
						type="text"
						value={formData.cep}
						onChange={handleChange}
						required
						shadow
					/>
				</div>
				<div className="w-[48%]">
					<div className="mb-2 block">
						<Label htmlFor="numero" value="Número*" />
					</div>
					<TextInput
						id="numero"
						name="numero"
						type="text"
						value={formData.numero}
						onChange={handleChange}
						required
						shadow
					/>
				</div>
				<div className="w-[48%]">
					<div className="mb-2 block">
						<Label htmlFor="complemento" value="Complemento" />
					</div>
					<TextInput
						id="complemento"
						name="complemento"
						type="text"
						value={formData.complemento}
						onChange={handleChange}
						shadow
					/>
				</div>
				<div className="w-[48%]">
					<div className="mb-2 block">
						<Label htmlFor="dataNasc" value="Data de Nascimento*" />
					</div>
					<TextInput
						id="dataNasc"
						name="dataNasc"
						type="date"
						onChange={handleChange}
						required
						shadow
					/>
				</div>
				<div className="w-[48%]">
					<div className="mb-2 block">
						<Label htmlFor="nomeMae" value="Nome da Mãe*" />
					</div>
					<TextInput
						id="nomeMae"
						name="nomeMae"
						type="text"
						value={formData.nomeMae}
						onChange={handleChange}
						required
						shadow
					/>
				</div>
				<div className="w-[48%]">
					<div className="mb-2 block">
						<Label htmlFor="sexo" value="Sexo*" />
					</div>
					<div className="flex flex-wrap gap-4">
						<div>
							<input
								id="sexo-masculino"
								name="sexo"
								type="radio"
								value="Masculino"
								checked={formData.sexo === "Masculino"}
								onChange={handleChange}
								required
								className="mr-2"
							/>
							<Label htmlFor="sexo-masculino" value="Masculino" />
						</div>
						<div>
							<input
								id="sexo-feminino"
								name="sexo"
								type="radio"
								value="Feminino"
								checked={formData.sexo === "Feminino"}
								onChange={handleChange}
								required
								className="mr-2"
							/>
							<Label htmlFor="sexo-feminino" value="Feminino" />
						</div>
						<div>
							<input
								id="sexo-nb"
								name="sexo"
								type="radio"
								value="NB"
								checked={formData.sexo === "Não Binário"}
								onChange={handleChange}
								required
								className="mr-2"
							/>
							<Label htmlFor="sexo-nb" value="Não Binário" />
						</div>
						<div>
							<input
								id="sexo-na"
								name="sexo"
								type="radio"
								value="NA"
								checked={formData.sexo === "Prefere não dizer"}
								onChange={handleChange}
								required
								className="mr-2"
							/>
							<Label htmlFor="sexo-na" value="Prefere não dizer" />
						</div>
					</div>
				</div>
				<div className="w-[48%]">
					<div className="mb-2 block">
						<Label htmlFor="estadoCivil" value="Estado Civil*" />
					</div>
					<TextInput
						id="estadoCivil"
						name="estadoCivil"
						type="text"
						value={formData.estadoCivil}
						onChange={handleChange}
						required
						shadow
					/>
				</div>
				<div className="w-[48%]">
					<div className="mb-2 block">
						<Label htmlFor="escolaridade" value="Escolaridade*" />
					</div>
					<div className="flex gap-4">
						<div className="flex items-center">
							<input
								type="radio"
								id="fundamental"
								name="escolaridade"
								value="Fundamental"
								checked={formData.escolaridade === "Fundamental"}
								onChange={handleChange}
								className="mr-2"
							/>
							<Label htmlFor="fundamental" value="Fundamental Completo" />
						</div>
						<div className="flex items-center">
							<input
								type="radio"
								id="medio"
								name="escolaridade"
								value="Médio"
								checked={formData.escolaridade === "Médio"}
								onChange={handleChange}
								className="mr-2"
							/>
							<Label htmlFor="medio" value="Médio Completo" />
						</div>
						<div className="flex items-center">
							<input
								type="radio"
								id="superior"
								name="escolaridade"
								value="Superior"
								checked={formData.escolaridade === "Superior"}
								onChange={handleChange}
								className="mr-2"
							/>
							<Label htmlFor="superior" value="Superior Completo" />
						</div>
					</div>
				</div>
				<div className="w-[48%]">
					<div className="mb-2 block">
						<Label htmlFor="etnia" value="Etnia*" />
					</div>
					<div className="flex flex-wrap gap-4">
						<div className="flex items-center">
							<input
								type="radio"
								id="branca"
								name="etnia"
								value="Branca"
								checked={formData.etnia === "Branca"}
								onChange={handleChange}
								className="mr-2"
							/>
							<Label htmlFor="branca" value="Branca" />
						</div>
						<div className="flex items-center">
							<input
								type="radio"
								id="negra"
								name="etnia"
								value="Negra"
								checked={formData.etnia === "Negra"}
								onChange={handleChange}
								className="mr-2"
							/>
							<Label htmlFor="negra" value="Negra" />
						</div>
						<div className="flex items-center">
							<input
								type="radio"
								id="parda"
								name="etnia"
								value="Parda"
								checked={formData.etnia === "Parda"}
								onChange={handleChange}
								className="mr-2"
							/>
							<Label htmlFor="parda" value="Parda" />
						</div>
						<div className="flex items-center">
							<input
								type="radio"
								id="amarela"
								name="etnia"
								value="Amarela"
								checked={formData.etnia === "Amarela"}
								onChange={handleChange}
								className="mr-2"
							/>
							<Label htmlFor="amarela" value="Amarela" />
						</div>
						<div className="flex items-center">
							<input
								type="radio"
								id="indigena"
								name="etnia"
								value="Indígena"
								checked={formData.etnia === "Indígena"}
								onChange={handleChange}
								className="mr-2"
							/>
							<Label htmlFor="indigena" value="Indígena" />
						</div>
					</div>
				</div>
				<div className="w-[48%]">
					<div className="mb-2 block">
						<Label htmlFor="planoSaude" value="Tem plano de saúde?" />
					</div>
					<div className="flex gap-4">
						<div className="flex items-center">
							<input
								type="radio"
								id="sim"
								name="planoSaude"
								value="Sim"
								checked={formData.planoSaude === true}
								onChange={handleChange}
								className="mr-2"
							/>
							<Label htmlFor="sim" value="Sim" />
						</div>
						<div className="flex items-center">
							<input
								type="radio"
								id="nao"
								name="planoSaude"
								value="Não"
								checked={formData.planoSaude === false}
								onChange={handleChange}
								className="mr-2"
							/>
							<Label htmlFor="nao" value="Não" />
						</div>
					</div>
				</div>
				<div className="w-full mt-4">
					<div className="mb-2 block">
						<Label htmlFor="vacinas" value="Vacinas" />
					</div>
					<div className="flex flex-wrap gap-4">
						{/* {vacinas?.map(
							(vacina: string[] | null | undefined, key: number | null) => (
								<div key={vacina.lote}>
									<input
										type="checkbox"
										id={vacina.lote}
										name="vacinas"
										value={vacina.nome}
										checked={formData.vacinas.includes(vacina.nome)}
										onChange={handleChange}
										className="mr-2"
									/>
									<Label htmlFor={vacina} value={vacina} />
								</div>
							)
						)} */}
					</div>
				</div>

				<Button type="submit" className="mx-auto">
					Cadastrar Morador
				</Button>
			</form>
		</>
	);
}
