import { Button, Navbar } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import zeGotinha from "../assets/imagens/zeGotinha.jpg";

export default function NavbarGeral() {
	const navigate = useNavigate();
	const { logout } = useAuth();

	const handleLogout = () => {
		const userConfirmed = window.confirm("Você tem certeza que deseja sair?");
		if (userConfirmed) {
			logout();
			navigate("/");
		}
	};

	return (
		<Navbar fluid rounded className="shadow py-0">
			<Navbar.Brand href="https://flowbite-react.com">
				<img src={zeGotinha} alt="" className="h-[80px] rounded-md" />
			</Navbar.Brand>
			<div className="flex md:order-2">
				<Button onClick={handleLogout}>Sair</Button>
				<Navbar.Toggle />
			</div>
			<Navbar.Collapse>
				<Navbar.Link
					className="cursor-pointer"
					onClick={() => navigate("/home")}
				>
					Home
				</Navbar.Link>
				<Navbar.Link
					className="cursor-pointer"
					onClick={() => navigate("/sobre")}
				>
					Sobre o projeto
				</Navbar.Link>
				<Navbar.Link
					className="cursor-pointer"
					onClick={() => navigate("/docs")}
				>
					Documentação
				</Navbar.Link>
				<Navbar.Link
					className="cursor-pointer"
					onClick={() => navigate("/cadastrarMorador")}
				>
					Cadastrar Morador
				</Navbar.Link>
				<Navbar.Link
					className="cursor-pointer"
					onClick={() => navigate("/cadastrarVacina")}
				>
					Cadastrar Vacina
				</Navbar.Link>
			</Navbar.Collapse>
		</Navbar>
	);
}