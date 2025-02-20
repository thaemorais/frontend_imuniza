import { createContext, ReactNode, useContext, useState } from "react";

interface Fabricante {
	cnpj: string;
	nome: string;
	cep: string;
	numero: string;
	complemento: string;
}

interface Vacina {
	nome: string;
	cnpjFabricante: string;
	tipo: string;
	doses: number;
	intervalo: string;
	indicacao: string[];
}

interface LoteVacina {
	vacina: string;
	lote: string;
	validade: string;
}

interface VacinasContextType {
	fabricantes: Fabricante[];
	vacinas: Vacina[];
	lotes: LoteVacina[];
	adicionarFabricante: (fabricante: Fabricante) => void;
	adicionarVacina: (vacina: Vacina) => void;
	adicionarLote: (lote: LoteVacina) => void;
}

const VacinasContext = createContext<VacinasContextType | undefined>(undefined);

export const VacinasProvider = ({ children }: { children: ReactNode }) => {
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

	return (
		<VacinasContext.Provider
			value={{
				fabricantes,
				vacinas,
				lotes,
				adicionarFabricante,
				adicionarVacina,
				adicionarLote,
			}}
		>
			{children}
		</VacinasContext.Provider>
	);
};

export const useVacinas = () => {
	const context = useContext(VacinasContext);
	if (!context) {
		throw new Error("useVacinas deve ser usado dentro de um VacinasProvider");
	}
	return context;
};
