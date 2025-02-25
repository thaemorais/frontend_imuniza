import React from "react";
import { Edit, Trash2 } from "react-feather";
import { useVacinas } from "../../../contexts/VacinasContext";
import { Vacina } from "../../../contexts/VacinasContext";

interface ListaVacinasProps {
	onEditVacina: (vacina: Vacina) => void;
}

export default function ListaVacinas({ onEditVacina }: ListaVacinasProps) {
	const { vacinas, removerVacina, fabricantes } = useVacinas();

	const handleDeleteVacina = (nome: string) => {
		if (
			window.confirm(
				"Tem certeza que deseja excluir esta vacina? Os lotes associados a ela também serão excluídos."
			)
		) {
			removerVacina(nome);
		}
	};

	// Função para obter nome do fabricante pelo CNPJ
	const getNomeFabricante = (cnpj: string) => {
		const fabricante = fabricantes.find((fab) => fab.cnpj === cnpj);
		return fabricante ? fabricante.nome : "Desconhecido";
	};

	return (
		<div className="mx-auto my-10">
			<h3 className="text-xl font-semibold">Vacinas Cadastradas</h3>
			{vacinas.length > 0 ? (
				<ul className="mt-2 flex items-center justify-between flex-wrap gap-4">
					{vacinas.map((vacina) => (
						<li
							key={vacina.nome}
							className="border rounded-lg p-4 relative shadow-sm w-[48%]"
						>
							<div className="absolute right-4 top-[50%] translate-y-[-50%] flex flex-col gap-2">
								<button
									onClick={() => onEditVacina(vacina)}
									className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
									title="Editar vacina"
								>
									<Edit size={20} />
								</button>
								<button
									onClick={() => handleDeleteVacina(vacina.nome)}
									className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
									title="Excluir vacina"
								>
									<Trash2 size={20} />
								</button>
							</div>

							<div className="max-w-[92%]">
								<p>
									<strong>Nome:</strong> {vacina.nome}
								</p>
								<p>
									<strong>Fabricante:</strong>{" "}
									{getNomeFabricante(vacina.cnpjFabricante)}
									<span className="text-xs text-gray-500 ml-1">
										({vacina.cnpjFabricante})
									</span>
								</p>
								<p>
									<strong>Tipo:</strong> {vacina.tipo}
								</p>
								<p>
									<strong>Doses:</strong> {vacina.doses}
								</p>
								<p>
									<strong>Intervalo:</strong>{" "}
									{vacina.intervalo ? vacina.intervalo : "Não informado"}
								</p>
								<p className="md:col-span-2">
									<strong>Indicações:</strong> {vacina.indicacao.join(", ")}
								</p>
							</div>
						</li>
					))}
				</ul>
			) : (
				<p className="text-gray-500 mt-4">Nenhuma vacina cadastrada ainda.</p>
			)}
		</div>
	);
}
