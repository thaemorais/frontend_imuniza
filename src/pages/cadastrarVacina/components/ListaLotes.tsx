import { Edit, Trash2 } from "react-feather";
import { LoteVacina, useVacinas } from "../../../contexts/VacinasContext";

interface ListaLotesProps {
	onEdit: (lote: LoteVacina) => void;
}

export default function ListaLotes({ onEdit }: ListaLotesProps) {
	const { lotes, removerLote, vacinas } = useVacinas();

	const getNomeVacina = (nome: string) => {
		const vacina = vacinas.find((vac) => vac.nome === nome);
		return vacina ? vacina.nome : "Desconhecida";
	};

	const handleDeleteLote = (lote: string) => {
		if (window.confirm("Tem certeza que deseja excluir este lote?")) {
			removerLote(lote);
		}
	};

	return (
		<div className="mx-auto my-10">
			<h3 className="text-xl font-semibold">Lotes Cadastrados</h3>
			{lotes.length > 0 ? (
				<ul className="mt-2 flex items-center justify-between flex-wrap gap-4">
					{lotes.map((lote) => (
						<li
							key={lote.lote}
							className="border rounded-lg p-4 relative shadow-sm w-[48%]"
						>
							<div className="absolute right-4 top-[50%] translate-y-[-50%] flex flex-col gap-2">
								<button
									onClick={() => onEdit(lote)}
									className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
									title="Editar lote"
								>
									<Edit size={20} />
								</button>
								<button
									onClick={() => handleDeleteLote(lote.lote)}
									className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
									title="Excluir lote"
								>
									<Trash2 size={20} />
								</button>
							</div>

							<div className="max-w-[92%]">
								<p>
									<strong>Vacina:</strong> {getNomeVacina(lote.vacina)}
								</p>
								<p>
									<strong>Lote:</strong> {lote.lote}
								</p>
								<p>
									<strong>Validade:</strong>{" "}
									{new Date(lote.validade).toLocaleDateString("pt-BR", {
										timeZone: "UTC",
									})}
								</p>
							</div>
						</li>
					))}
				</ul>
			) : (
				<p className="text-gray-500 mt-4">Nenhum lote cadastrado ainda.</p>
			)}
		</div>
	);
}
