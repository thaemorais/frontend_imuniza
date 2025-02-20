import { useVacinas } from "../../../contexts/VacinasContext";

export default function ListaVacinas() {
	const { vacinas } = useVacinas();

	return (
		<div className="max-w-xl mx-auto">
			<h2 className="text-xl font-bold mb-4">Vacinas Registradas</h2>
			{vacinas ? (
				<ul className="space-y-4">
					{vacinas.map((vacina, index) => (
						<li key={index} className="border p-4 rounded">
							<p>
								<strong>Nome:</strong> {vacina.nome}
							</p>

							<p>
								<strong>Tipo:</strong> {vacina.tipo}
							</p>
							<p>
								<strong>Doses:</strong> {vacina.doses}
							</p>
							<p>
								<strong>Intervalo:</strong> {vacina.intervalo || "N/A"}
							</p>
							<p>
								<strong>Indicação:</strong> {vacina.indicacao.join(", ")}
							</p>
						</li>
					))}
				</ul>
			) : (
				<p>Ainda sem vacinas registradas</p>
			)}
		</div>
	);
}
