import NavbarLogin from "../../components/NavbarLogin";
import CardLogin from "./components/CardLogin";

export default function Login() {
	return (
		<>
			<NavbarLogin />
			<section className="max-w-1280 mt-16 flex items-center flex-col justify-center gap-3 p-4">
				<h1 className="text-xl">Bem-vindo(a) ao Imuniza!</h1>
				<h3>Faça seu login</h3>
				<CardLogin />
			</section>
		</>
	);
}
