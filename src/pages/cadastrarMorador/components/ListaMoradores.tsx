import { useEffect, useState } from "react";
import { useMoradores } from "../../../contexts/MoradoresContext";
import getEnderecoFromCEP from "./../../utils/getEnderecoFromCEP";

export default function ListaMoradores() {
	const { moradores } = useMoradores();
	const [enderecos, setEnderecos] = useState<{
		[key: string]: {
			rua: string;
			bairro: string;
			cidade: string;
			estado: string;
		};
	}>({});

	useEffect(() => {
		// Itera sobre os moradores e busca o endereço de cada um
		moradores.forEach(async (morador) => {
			if (morador.cep) {
				const endereco = await getEnderecoFromCEP(morador.cep);
				if (endereco) {
					setEnderecos((prevEnderecos) => ({
						...prevEnderecos,
						[morador.cep]: endereco,
					}));
				}
			}
		});
	}, [moradores]);

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
								<strong>Endereço: </strong>
								{/* Verifica se o endereço está carregado */}
								{enderecos[morador.cep] ? (
									<>
										{enderecos[morador.cep].rua}, {morador.numero},{" "}
										{enderecos[morador.cep].bairro},{" "}
										{enderecos[morador.cep].cidade} -{" "}
										{enderecos[morador.cep].estado} - {morador.cep}
									</>
								) : (
									<span>Carregando...</span>
								)}
							</p>
							<p>
								<strong>Data de nascimento: </strong>
								{new Date(morador.dataNasc).toLocaleDateString("pt-BR", {
									timeZone: "UTC",
								})}
							</p>
							<p>
								<strong>Idade: </strong> [calcular idade]
							</p>
							<p>
								<strong>Nome da mãe: </strong> {morador.nomeMae}
							</p>
							<p>
								<strong>Sexo: </strong> {morador.sexo}
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
								<strong>Tem plano de saúde? </strong>{" "}
								{morador.planoSaude ? "Sim" : "Não"}
							</p>
							<p>
								<strong>Vacinas tomadas: </strong>
								{morador.vacinas.length > 0
									? morador.vacinas.join(", ")
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
