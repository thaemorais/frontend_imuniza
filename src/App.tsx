import "./App.css";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"; // Importando Navigate para redirecionamento
import Sobre from "./pages/sobre/Sobre";
import CadastrarVacina from "./pages/cadastrarVacina/CadastrarVacina";
import CadastrarMorador from "./pages/cadastrarMorador/CadastrarMorador";
import Documentacao from "./pages/documentacao/Documentacao";
import { useAuth } from "./contexts/AuthContext";

function App() {
	const { login } = useAuth(); // Obtendo o usuário do contexto de autenticação

	return (
		<BrowserRouter>
			<Routes>
				{/* Rota de Login, acessível se o usuário não estiver logado */}
				{!login ? (
					<Route path="/" element={<Login />} />
				) : (
					// Rotas protegidas, acessíveis apenas se o usuário estiver logado
					<>
						<Route path="/" element={<Login />} />
						<Route path="/home" element={<Home />} />
						<Route path="/sobre" element={<Sobre />} />
						<Route path="/cadastrarVacina" element={<CadastrarVacina />} />
						<Route path="/cadastrarMorador" element={<CadastrarMorador />} />
						<Route path="/docs" element={<Documentacao />} />
					</>
				)}

				{/* Rota de redirecionamento para login se o usuário não estiver autenticado */}
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
