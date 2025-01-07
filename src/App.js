import "./App.css";
import Login from "./pages/login/Login";
import UserContext from "./contexts/UserContext";
import { useState } from "react";
import Home from "./pages/home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sobre from "./pages/sobre/Sobre";
import CadastrarVacina from "./pages/cadastrarVacina/CadastrarVacina";

function App() {
	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");

	return (
		<UserContext.Provider value={{ email, setEmail, senha, setSenha }}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/home" element={<Home />} />
					<Route path="/sobre" element={<Sobre />} />
					<Route path="/cadastrarVacina" element={<CadastrarVacina />} />
				</Routes>
			</BrowserRouter>
		</UserContext.Provider>
	);
}

export default App;
