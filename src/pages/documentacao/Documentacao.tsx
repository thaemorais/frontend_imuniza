import { JSX } from "react";
import PageTitle from "../../components/PageTitle";

export default function Documentacao(): JSX.Element {
	return (
		<>
			<section className="max-w-[1280px] px-8 w-full my-8 mx-auto">
				<PageTitle title="DOCUMENTAÇÃO" />
				<div className="w-full text-center">
					<p>Estamos trabalhando nisso...</p>
				</div>
			</section>
		</>
	);
}
