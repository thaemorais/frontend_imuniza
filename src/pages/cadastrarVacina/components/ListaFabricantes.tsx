import { Edit, Trash2 } from "react-feather";
import { Fabricante, useVacinas } from "../../../contexts/VacinasContext";
import { useEffect, useState } from "react";
import getEnderecoFromCEP from "../../utils/getEnderecoFromCEP";
interface ListaVacinasProps {
	onEditFabricante?: (fabricante: Fabricante) => void;
}

export default function ListaFabricantes({
	onEditFabricante,
}: ListaVacinasProps) {
	const { fabricantes, removerFabricante } = useVacinas();
	const [enderecos, setEnderecos] = useState<{
		[key: string]: {
			rua: string;
			bairro: string;
			cidade: string;
			estado: string;
		};
	}>({});

	useEffect(() => {
		fabricantes.forEach(async (fabricante) => {
			if (fabricante.cep) {
				const endereco = await getEnderecoFromCEP(fabricante.cep);
				if (endereco) {
					setEnderecos((prevEnderecos) => ({
						...prevEnderecos,
						[fabricante.cep]: endereco,
					}));
				}
			}
		});
	}, [fabricantes]);

	const handleDeleteFabricante = (cnpj: string) => {
		if (window.confirm("Tem certeza que deseja excluir este fabricante?")) {
			removerFabricante(cnpj);
		}
	};
	return (
		<div className="my-8">
			<h3 className="text-xl font-semibold">Fabricantes Cadastrados</h3>
			{fabricantes.length > 0 ? (
				<ul className="mt-2 space-y-4">
					{fabricantes.map((fabricante) => (
						<li
							key={fabricante.cnpj}
							className="border rounded-lg p-4 relative shadow-sm"
						>
							<div className="absolute right-4 top-[50%] translate-y-[-50%] flex flex-col gap-2">
								<button
									onClick={() => onEditFabricante?.(fabricante)}
									className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
									title="Editar fabricante"
								>
									<Edit size={20} />
								</button>
								<button
									onClick={() => handleDeleteFabricante(fabricante.cnpj)}
									className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
									title="Excluir fabricante"
								>
									<Trash2 size={20} />
								</button>
							</div>

							<div className="max-w-[92%] grid grid-cols-1 md:grid-cols-2 gap-2">
								<p>
									<strong>Nome:</strong> {fabricante.nome}
								</p>
								<p>
									<strong>CNPJ:</strong> {fabricante.cnpj}
								</p>
								<p>
									<strong>Endereço: </strong>
									{enderecos[fabricante.cep] ? (
										<>
											{enderecos[fabricante.cep].rua}, {fabricante.numero}
											{fabricante.complemento &&
												`, ${fabricante.complemento}`},{" "}
											{enderecos[fabricante.cep].bairro},{" "}
											{enderecos[fabricante.cep].cidade} -{" "}
											{enderecos[fabricante.cep].estado} - {fabricante.cep}
										</>
									) : (
										<span>Endereço não encontrado através do CEP</span>
									)}
								</p>
							</div>
						</li>
					))}
				</ul>
			) : (
				<p className="text-gray-500 mt-4">
					Nenhum fabricante cadastrado ainda.
				</p>
			)}
		</div>
	);
}
