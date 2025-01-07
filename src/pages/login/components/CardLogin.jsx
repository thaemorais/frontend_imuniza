import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { useContext } from "react";
import UserContext from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function CardLogin() {
	const { email, setEmail, senha, setSenha } = useContext(UserContext);
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (email === "teste@teste.com" && senha === "teste123") {
			navigate("/home");
		} else {
			alert("Credenciais inválidas.");
		}
	};

	return (
		<Card className="w-full sm:w-[330px]">
			<form className="flex flex-col gap-4">
				<div>
					<div className="mb-2 block">
						<Label htmlFor="email1" value="Seu email" />
					</div>
					<TextInput
						id="email1"
						type="email"
						placeholder="emaildasilva@gmail.com"
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="password1" value="Sua senha" />
					</div>
					<TextInput
						id="password1"
						type="password"
						required
						onChange={(e) => setSenha(e.target.value)}
					/>
				</div>
				<div className="flex items-center gap-2">
					<Checkbox id="remember" />
					<Label htmlFor="remember">Lembre de mim</Label>
				</div>
				<Button type="submit" onClick={handleSubmit}>
					Entrar
				</Button>
			</form>
		</Card>
	);
}
