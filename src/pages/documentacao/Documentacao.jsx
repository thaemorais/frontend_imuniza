import NavbarGeral from "../../components/NavbarGeral";
import PageTitle from "../../components/PageTitle";

export default function Documentacao() {
	return (
		<>
			<NavbarGeral />
			<section className="max-w-[1280px] px-8 w-full my-8 mx-auto">
				<PageTitle title="DOCUMENTAÇÃO" />
				<div className="w-full text-center">
					<p>Estamos trabalhando nisso...</p>
				</div>
			</section>
		</>
	);
}
