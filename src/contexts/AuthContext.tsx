import React, { createContext, useContext, useState, ReactNode } from "react";

// Define os tipos para o contexto
interface User {
	email: string;
}

interface AuthContextData {
	user: User | null;
	login: (email: string, password: string) => boolean;
	logout: () => void;
}

// Cria o contexto com o tipo apropriado ou `undefined` para evitar uso fora do provider
const AuthContext = createContext<AuthContextData | undefined>(undefined);

// Define os tipos das props do provider
interface AuthProviderProps {
	children: ReactNode; // ReactNode é o tipo para o conteúdo JSX
}

// Provider para envolver a aplicação
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null); // Estado do usuário autenticado

	// Função de login
	const login = (email: string, password: string): boolean => {
		// Validação simples de email e senha
		if (email === "teste@teste.com" && password === "teste123") {
			setUser({ email }); // Define o usuário autenticado
			return true; // Login bem-sucedido
		}
		return false; // Falha no login
	};

	// Função de logout
	const logout = (): void => setUser(null);

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

// Hook para usar o contexto
export const useAuth = (): AuthContextData => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth deve ser usado dentro de um AuthProvider");
	}
	return context;
};
