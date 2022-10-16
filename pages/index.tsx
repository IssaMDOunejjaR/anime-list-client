import type { NextPage } from "next";
import Head from "next/head";
import Card from "../components/Card/Card";
import List from "../components/List/List";

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Home</title>
			</Head>
			<div className="w-full px-5">
				<List title="New Episodes" url="/animes/new-episodes">
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
				</List>
				<List title="New Animes" url="/animes/new-animes">
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
				</List>
				<List title="Popular" url="/animes/new-animes">
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
				</List>
				<List title="Popular" url="/animes/new-animes">
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
				</List>
			</div>
		</>
	);
};

export default Home;
