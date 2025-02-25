import { createContext, ReactNode, useContext, useState } from "react";

export interface Aplicacao {
	cpfMorador: string;
	loteVacina: string;
	doseAplicada: number;
}

export interface AplicacoesContextType {
	aplicacoes: Aplicacao[];
	adicionarAplicacao: (aplicacao: Aplicacao) => void;
	removerAplicacao: (
		cpfMorador: string,
		loteVacina: string,
		doseAplicada: number
	) => void;
	editarAplicacao: (aplicacao: Aplicacao) => void;
}

const AplicacoesContext = createContext<AplicacoesContextType | undefined>(
	undefined
);

interface AplicacoesProviderProps {
	children: ReactNode;
}

export const AplicacoesProvider: React.FC<AplicacoesProviderProps> = ({
	children,
}) => {
	const [aplicacoes, setAplicacoes] = useState<Aplicacao[]>([]);

	const adicionarAplicacao = (aplicacao: Aplicacao) => {
		setAplicacoes((prev) => [...prev, aplicacao]);
	};

	const removerAplicacao = (
		cpfMorador: string,
		loteVacina: string,
		doseAplicada: number
	) => {
		setAplicacoes((prev) =>
			prev.filter(
				(aplicacao) =>
					!(
						aplicacao.cpfMorador === cpfMorador &&
						aplicacao.loteVacina === loteVacina &&
						aplicacao.doseAplicada === doseAplicada
					)
			)
		);
	};

	const editarAplicacao = (aplicacao: Aplicacao) => {
		setAplicacoes((prev) =>
			prev.map((ap) =>
				ap.cpfMorador === aplicacao.cpfMorador &&
				ap.loteVacina === aplicacao.loteVacina &&
				ap.doseAplicada === aplicacao.doseAplicada
					? aplicacao
					: ap
			)
		);
	};

	return (
		<AplicacoesContext.Provider
			value={{
				aplicacoes,
				adicionarAplicacao,
				removerAplicacao,
				editarAplicacao,
			}}
		>
			{children}
		</AplicacoesContext.Provider>
	);
};

export const useAplicacoes = (): AplicacoesContextType => {
	const context = useContext(AplicacoesContext);
	if (!context) {
		throw new Error(
			"useAplicacoes deve ser usado dentro de um AplicacoesProvider"
		);
	}
	return context;
};
