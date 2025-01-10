import { JSX } from "react";
import NavbarGeral from "../../components/NavbarGeral";
import PageTitle from "../../components/PageTitle";

export default function Home(): JSX.Element {
	return (
		<>
			<NavbarGeral />
			<section className="max-w-[1280px] px-8 w-full my-8 mx-auto">
				<PageTitle title="HOME" />
				<div className="w-full text-center">
					<p>Estamos trabalhando nisso...</p>
				</div>
			</section>
		</>
	);
}
