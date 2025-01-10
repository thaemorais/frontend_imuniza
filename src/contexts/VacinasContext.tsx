import {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from "react";

// Define o tipo da vacina
interface Vacina {
	nome: string;
	lote: string;
	fabricante: string;
	validade: string;
	tipo: string;
	doses: number;
	intervalo?: string;
	indicacao: string[];
}

// Define o contexto
interface VacinasContextType {
	vacinas: Vacina[];
	adicionarVacina: (novaVacina: Vacina) => void;
}

const VacinasContext = createContext<VacinasContextType | undefined>(undefined);

// Provider do contexto
export const VacinasProvider = ({ children }: { children: ReactNode }) => {
	const [vacinas, setVacinas] = useState<Vacina[]>([]);

	const adicionarVacina = (novaVacina: Vacina) => {
		setVacinas((prevVacinas) => [...prevVacinas, novaVacina]);
	};

	// Salvar os dados no localStorage
	useEffect(() => {
		localStorage.setItem("vacinas", JSON.stringify(vacinas));
	}, [vacinas]);

	return (
		<VacinasContext.Provider value={{ vacinas, adicionarVacina }}>
			{children}
		</VacinasContext.Provider>
	);
};

// Hook para acessar o contexto
export const useVacinas = () => {
	const context = useContext(VacinasContext);
	if (!context) {
		throw new Error("useVacinas deve ser usado dentro de um VacinasProvider");
	}
	return context;
};
