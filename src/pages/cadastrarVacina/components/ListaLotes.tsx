import { Edit, Trash2 } from "react-feather";
import { LoteVacina, useVacinas } from "../../../contexts/VacinasContext";

interface ListaVacinasProps {
	onEditLote?: (lote: LoteVacina) => void;
}

export default function ListaLotes({ onEditLote }: ListaVacinasProps) {
	const { lotes, removerLote } = useVacinas();

	const handleDeleteLote = (lote: string) => {
		if (window.confirm("Tem certeza que deseja excluir este lote?")) {
			removerLote(lote);
		}
	};

	return (
		<div className="my-8">
			<h3 className="text-xl font-semibold">Lotes Cadastrados</h3>
			{lotes.length > 0 ? (
				<ul className="mt-2 space-y-4">
					{lotes.map((lote) => (
						<li
							key={lote.lote}
							className="border rounded-lg p-4 relative shadow-sm"
						>
							<div className="absolute right-4 top-[50%] translate-y-[-50%] flex flex-col gap-2">
								<button
									onClick={() => onEditLote?.(lote)}
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

							<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
								<p>
									<strong>Vacina:</strong> {lote.vacina}
								</p>
								<p>
									<strong>Número do Lote:</strong> {lote.lote}
								</p>
								<p>
									<strong>Validade:</strong> {lote.validade}
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
