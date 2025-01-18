import { JSX } from "react";
import PageTitle from "../../components/PageTitle";

export default function Home(): JSX.Element {
	return (
		<>
			<section className="max-w-[1280px] px-8 w-full my-8 mx-auto">
				<PageTitle title="HOME" />
				<div className="w-full text-center">
					<p>Estamos trabalhando nisso...</p>
				</div>
			</section>
		</>
	);
}
