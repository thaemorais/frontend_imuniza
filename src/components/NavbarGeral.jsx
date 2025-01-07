import { Button, Navbar } from "flowbite-react";
import zeGotinha from "../assets/imagens/zeGotinha.jpg";
import { useNavigate } from "react-router-dom";

export default function NavbarGeral() {
	const navigate = useNavigate();

	return (
		<Navbar fluid rounded className="shadow">
			<Navbar.Brand href="https://flowbite-react.com">
				<img src={zeGotinha} alt="" className="h-[80px] rounded-md" />
				<span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
					Imuniza Web
				</span>
			</Navbar.Brand>
			<div className="flex md:order-2">
				<Button onClick={() => navigate("/cadastrarMorador")}>
					Cadastrar morador
				</Button>
				<Navbar.Toggle />
			</div>
			<Navbar.Collapse>
				<Navbar.Link onClick={() => navigate("/home")}>Home</Navbar.Link>
				<Navbar.Link onClick={() => navigate("/sobre")}>
					Sobre o projeto
				</Navbar.Link>
				<Navbar.Link onClick={() => navigate("/docs")}>
					Documentação
				</Navbar.Link>
				<Navbar.Link onClick={() => navigate("/cadastrarVacina")}>
					Cadastrar Vacina
				</Navbar.Link>
			</Navbar.Collapse>
		</Navbar>
	);
}
