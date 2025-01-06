import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";

export default function CardLogin() {
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
						required
					/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="password1" value="Sua senha" />
					</div>
					<TextInput id="password1" type="password" required />
				</div>
				<div className="flex items-center gap-2">
					<Checkbox id="remember" />
					<Label htmlFor="remember">Lembre de mim</Label>
				</div>
				<Button type="submit">Entrar</Button>
			</form>
		</Card>
	);
}
