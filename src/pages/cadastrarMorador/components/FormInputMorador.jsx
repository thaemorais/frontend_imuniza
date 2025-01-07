import { Button, Checkbox, Label, TextInput } from "flowbite-react";

export function FormInputMorador() {
	return (
		<form className="flex max-w-xl flex-row justify-between items-center gap-4 mx-auto flex-wrap">
			<div className="w-[48%]">
				<div className="mb-2 block">
					<Label htmlFor="nome" value="Nome do Morador*" />
				</div>
				<TextInput id="nome" type="text" placeholder="" required shadow />
			</div>
			<div className="w-[48%]">
				<div className="mb-2 block">
					<Label htmlFor="cartaoSUS" value="Cartão do SUS*" />
				</div>
				<TextInput id="cartaoSUS" type="text" placeholder="" required shadow />
			</div>
			<div className="w-[48%]">
				<div className="mb-2 block">
					<Label htmlFor="cpf" value="CPF*" />
				</div>
				<TextInput id="cpf" type="text" placeholder="Pfizer" required shadow />
			</div>
			{/* <div className="w-[48%]">
				<div className="mb-2 block">
					<Label htmlFor="validade" value="Validade*" />
				</div>
				<TextInput
					id="validade"
					type="text"
					placeholder="01/06/2025"
					required
					shadow
				/>
			</div>
			<div className="w-full">
				<div className="mb-2 block">
					<Label
						htmlFor="tipo"
						value="Tipo de vacina (ex.: viral, bacteriana, mRNA, etc..)*"
					/>
				</div>
				<TextInput id="tipo" type="text" placeholder="mRNA" required shadow />
			</div>
			<div className="w-[48%]">
				<div className="mb-2 block">
					<Label htmlFor="doses" value="Doses necessárias*" />
				</div>
				<TextInput id="doses" type="number" placeholder="2" required shadow />
			</div>
			<div className="w-[48%]">
				<div className="mb-2 block">
					<Label htmlFor="intervalo" value="Intervalo entre as doses" />
				</div>
				<TextInput id="intervalo" type="text" placeholder="21 dias" shadow />
			</div>
			<div className="w-full">
				<div className="mb-2 block">
					<Label htmlFor="indicacao" value="Indicação (público alvo)*" />
				</div>
				<div className="flex flex-row flex-wrap items-center justify-start gap-3 space-y-2">
					{[
						{ id: "gestantes", label: "Gestantes" },
						{ id: "puérperas", label: "Puérperas" },
						{ id: "profissionais-saude", label: "Profissionais de Saúde" },
						{ id: "idosos", label: "Idosos (60+ anos)" },
						{ id: "criancas", label: "Crianças (0-11 anos)" },
						{ id: "adolescentes", label: "Adolescentes (12-17 anos)" },
						{ id: "adultos", label: "Adultos (18-59 anos)" },
						{ id: "comorbidades", label: "Pessoas com Comorbidades" },
						{ id: "imunossuprimidos", label: "Imunossuprimidos" },
						{ id: "indigenas", label: "Indígenas e Quilombolas" },
						{ id: "essenciais", label: "Trabalhadores Essenciais" },
						{ id: "populacao-geral", label: "População Geral" },
					].map((option) => (
						<div key={option.id} className="flex items-center space-x-2">
							<Checkbox id={option.id} type="checkbox" />
							<Label htmlFor={option.id} value={option.label} />
						</div>
					))}
				</div>
			</div>
			<div className="w-full">
				<div className="mb-2 block">
					<Label htmlFor="armazenamento" value="Armazenamento" />
				</div>
				<TextInput
					id="fabricante"
					type="text"
					placeholder="Temperatura: Ultra baixa: -80°C a -60°C (armazenamento prolongado); etc"
					required
					shadow
				/>
			</div>

			<div className="flex items-center gap-2">
				<Checkbox id="agree" />
				<Label htmlFor="agree" className="flex">
					Confirmo que as informações descritas acima são verdadeiras.
				</Label>
			</div> */}
			<Button type="submit" className="mx-auto">
				Cadastrar vacina
			</Button>
		</form>
	);
}
