import { useMoradores } from "../../../contexts/MoradoresContext";

export default function ListaMoradores() {
	const { moradores } = useMoradores();
	return (
		<div className="mt-4">
			<h3 className="text-xl font-semibold">Moradores Cadastrados</h3>
			{moradores.length > 0 ? (
				<ul className="mt-2">
					{moradores.map((morador, index) => (
						<li key={index} className="border-b py-2">
							<p>
								<strong>Nome:</strong> {morador.nome}
							</p>
							<p>
								<strong>CPF:</strong> {morador.cpf}
							</p>
							<p>
								<strong>Cartão do SUS:</strong> {morador.sus}
							</p>
							<p>
								<strong>Endereço: </strong>Rua tal e tal, {morador.numero},
								Bairro tal e tal, Cidade tal - UF - {morador.cep}
							</p>
							<p>
								<strong>Data de nascimento: </strong>{" "}
								{new Date(morador.dataNasc).toLocaleDateString("pt-BR", {
									timeZone: "UTC",
								})}
							</p>
							<p>
								<strong>Idade: </strong> [calcular idade]
							</p>
							<p>
								<strong>Nome da mãe</strong> {morador.nomeMae}
							</p>
							<p>
								<strong>Sexo</strong> {morador.sexo}
							</p>
							<p>
								<strong>Estado civil: </strong> {morador.estadoCivil}
							</p>
							<p>
								<strong>Escolaridade: </strong> {morador.escolaridade}
							</p>
							<p>
								<strong>Etnia: </strong> {morador.etnia}
							</p>
							<p>
								<strong>Tem plano de saúde? </strong> {morador.planoSaude}
							</p>
							<p>
								<strong>Vacinas tomadas: </strong>{" "}
								{morador.vacinas.length > 0
									? morador.vacinas
									: "Ainda sem vacinas registradas."}
							</p>
						</li>
					))}
				</ul>
			) : (
				<p>Nenhum morador cadastrado ainda.</p>
			)}
		</div>
	);
}
