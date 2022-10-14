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
			<List title="Most Popular">
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
			</List>
		</>
	);
};

export default Home;
