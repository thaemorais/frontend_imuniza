import { createContext, ReactNode, useContext, useState } from "react";

export interface Fabricante {
	cnpj: string;
	nome: string;
	cep: string;
	numero: string;
	complemento: string;
}

export interface Vacina {
	nome: string;
	cnpjFabricante: string;
	tipo: string;
	doses: number;
	intervalo: string;
	indicacao: string[];
}

export interface LoteVacina {
	vacina: string;
	lote: string;
	validade: string;
}

export interface VacinasContextType {
	fabricantes: Fabricante[];
	vacinas: Vacina[];
	lotes: LoteVacina[];
	adicionarFabricante: (fabricante: Fabricante) => void;
	adicionarVacina: (vacina: Vacina) => void;
	adicionarLote: (lote: LoteVacina) => void;
	removerFabricante: (cnpj: string) => void;
	removerVacina: (nome: string) => void;
	removerLote: (lote: string) => void;
	editarFabricante: (fabricante: Fabricante) => void;
	editarVacina: (vacina: Vacina) => void;
	editarLote: (lote: LoteVacina) => void;
}

const VacinasContext = createContext<VacinasContextType | undefined>(undefined);

interface VacinasProviderProps {
	children: ReactNode;
}

export const VacinasProvider: React.FC<VacinasProviderProps> = ({
	children,
}) => {
	const [fabricantes, setFabricantes] = useState<Fabricante[]>([]);
	const [vacinas, setVacinas] = useState<Vacina[]>([]);
	const [lotes, setLotes] = useState<LoteVacina[]>([]);

	const adicionarFabricante = (fabricante: Fabricante) => {
		setFabricantes((prev) => [...prev, fabricante]);
	};

	const adicionarVacina = (vacina: Vacina) => {
		setVacinas((prev) => [...prev, vacina]);
	};

	const adicionarLote = (lote: LoteVacina) => {
		setLotes((prev) => [...prev, lote]);
	};

	const removerFabricante = (cnpj: string) => {
		setFabricantes((prev) => prev.filter((fab) => fab.cnpj !== cnpj));
	};

	const removerVacina = (nome: string) => {
		setVacinas((prev) => prev.filter((vac) => vac.nome !== nome));
	};

	const removerLote = (lote: string) => {
		setLotes((prev) => prev.filter((l) => l.lote !== lote));
	};

	const editarFabricante = (fabricante: Fabricante) => {
		setFabricantes((prev) =>
			prev.map((fab) => (fab.cnpj === fabricante.cnpj ? fabricante : fab))
		);
	};

	const editarVacina = (vacina: Vacina) => {
		setVacinas((prev) =>
			prev.map((vac) => (vac.nome === vacina.nome ? vacina : vac))
		);
	};

	const editarLote = (lote: LoteVacina) => {
		setLotes((prev) => prev.map((l) => (l.lote === lote.lote ? lote : l)));
	};

	return (
		<VacinasContext.Provider
			value={{
				fabricantes,
				vacinas,
				lotes,
				adicionarFabricante,
				adicionarVacina,
				adicionarLote,
				removerFabricante,
				removerVacina,
				removerLote,
				editarFabricante,
				editarVacina,
				editarLote,
			}}
		>
			{children}
		</VacinasContext.Provider>
	);
};

export const useVacinas = (): VacinasContextType => {
	const context = useContext(VacinasContext);
	if (!context) {
		throw new Error("useVacinas deve ser usado dentro de um VacinasProvider");
	}
	return context;
};
