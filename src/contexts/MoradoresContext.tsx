import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

interface Morador {
	nome: string;
	cpf: string;
	sus: string;
	cep: string;
	numero: string;
	complemento: string;
	dataNasc: Date;
	nomeMae: string;
	sexo: string;
	estadoCivil: string;
	escolaridade: string;
	etnia: string;
	planoSaude: boolean;
	vacinas: string[];
}

interface MoradoresContextType {
	moradores: Morador[];
	adicionarMorador: (novoMorador: Morador) => void;
	editarMorador: (cpfMorador: string, novosDadosMorador: Morador) => void;
	deletarMorador: (cpfMorador: string) => void;
}

const MoradoresContext = createContext<MoradoresContextType | undefined>(
	undefined
);

// Provider do contexto
export const MoradoresProvider = ({ children }: { children: ReactNode }) => {
	const [moradores, setMoradores] = useState<Morador[]>([]);

	const adicionarMorador = (novoMorador: Morador) => {
		setMoradores((prevMoradores) => [...prevMoradores, novoMorador]);
	};

	const editarMorador = (cpfMorador: string, novosDadosMorador: Morador) => {
		setMoradores((prevMoradores) =>
			prevMoradores.map((morador) =>
				morador.cpf === cpfMorador
					? { ...morador, ...novosDadosMorador }
					: morador
			)
		);
	};

	const deletarMorador = (cpfMorador: string) => {
		setMoradores((prevMoradores) =>
			prevMoradores.filter((morador) => morador.cpf !== cpfMorador)
		);
	};

	// Salvar os dados no localStorage
	useEffect(() => {
		localStorage.setItem("moradores", JSON.stringify(moradores));
	}, [moradores]);

	return (
		<MoradoresContext.Provider
			value={{ moradores, adicionarMorador, editarMorador, deletarMorador }}
		>
			{children}
		</MoradoresContext.Provider>
	);
};

// Hook para acessar o contexto
export const useMoradores = () => {
	const context = useContext(MoradoresContext);
	if (!context) {
		throw new Error("useContext deve ser usado dentro de um MoradoresProvider");
	}
	return context;
};

export default MoradoresContext;
