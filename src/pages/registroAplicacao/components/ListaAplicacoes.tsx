import { Trash2 } from "react-feather";
import { useAplicacoes } from "../../../contexts/AplicacoesContext";
import { useMoradores } from "../../../contexts/MoradoresContext";
import { useVacinas } from "../../../contexts/VacinasContext";

export default function ListaAplicacoes() {
	const { aplicacoes, removerAplicacao } = useAplicacoes();
	const { moradores, editarMorador } = useMoradores();
	const { lotes, vacinas } = useVacinas();

	const getMoradorNome = (cpf: string) => {
		const morador = moradores.find((morador) => morador.cpf === cpf);
		return morador ? morador.nome : "Desconhecido";
	};

	const getVacinaNome = (lote: string) => {
		const loteVacina = lotes.find((l) => l.lote === lote);
		if (loteVacina) {
			const vacina = vacinas.find((v) => v.nome === loteVacina.vacina);
			return vacina ? vacina.nome : "Desconhecida";
		}
		return "Desconhecida";
	};

	const handleDeleteAplicacao = (
		cpfMorador: string,
		loteVacina: string,
		doseAplicada: number
	) => {
		if (window.confirm("Tem certeza que deseja excluir esta aplicação?")) {
			removerAplicacao(cpfMorador, loteVacina, doseAplicada);

			const morador = moradores.find((m) => m.cpf === cpfMorador);
			if (morador) {
				const vacinaAplicada = `${getVacinaNome(
					loteVacina
				)} - Lote: ${loteVacina} - Dose: ${doseAplicada}`;
				const vacinasAtualizadas = morador.vacinas.filter(
					(vacina) => vacina !== vacinaAplicada
				);
				editarMorador(cpfMorador, {
					...morador,
					vacinas: vacinasAtualizadas,
				});
			}
		}
	};

	return (
		<div className="my-8">
			<h3 className="text-xl font-semibold">Aplicações Registradas</h3>
			{aplicacoes.length > 0 ? (
				<ul className="mt-2 space-y-4">
					{aplicacoes.map((aplicacao, index) => (
						<li
							key={index}
							className="border rounded-lg p-4 relative shadow-sm"
						>
							<div className="absolute right-4 top-[50%] translate-y-[-50%] flex flex-col gap-2">
								<button
									onClick={() =>
										handleDeleteAplicacao(
											aplicacao.cpfMorador,
											aplicacao.loteVacina,
											aplicacao.doseAplicada
										)
									}
									className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
									title="Excluir aplicação"
								>
									<Trash2 size={20} />
								</button>
							</div>

							<div className="max-w-[92%] grid grid-cols-1 md:grid-cols-2 gap-2">
								<p>
									<strong>Morador:</strong>{" "}
									{getMoradorNome(aplicacao.cpfMorador)}
								</p>
								<p>
									<strong>Vacina:</strong> {getVacinaNome(aplicacao.loteVacina)}
								</p>
								<p>
									<strong>Lote:</strong> {aplicacao.loteVacina}
								</p>
								<p>
									<strong>Dose Aplicada:</strong> {aplicacao.doseAplicada}ª Dose
								</p>
							</div>
						</li>
					))}
				</ul>
			) : (
				<p className="text-gray-500 mt-4">
					Nenhuma aplicação registrada ainda.
				</p>
			)}
		</div>
	);
}
